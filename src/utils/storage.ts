import { loadFromCloud, saveToCloud } from "./cloudSync";

const STORAGE_KEY = "krul_site_data";
const ENCRYPTION_KEY = "krul_secret_key_2024";

function simpleEncrypt(text: string): string {
  const encoded = btoa(unescape(encodeURIComponent(text)));
  let result = "";
  for (let i = 0; i < encoded.length; i++) {
    result += String.fromCharCode(encoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
  }
  return btoa(result);
}

function simpleDecrypt(encoded: string): string {
  try {
    const decoded = atob(encoded);
    let result = "";
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return decodeURIComponent(escape(atob(result)));
  } catch {
    return "";
  }
}

export interface SiteData {
  profile: {
    name: string;
    nickname: string;
    birthday: string;
    pronouns: string;
    discordId: string;
    avatarUrl: string;
  };
  sections: {
    likes: { label: string; items: string[] };
    besties: { label: string; items: string[] };
    anime: { label: string; items: string[] };
    food: { label: string; items: string[] };
    artists: { label: string; items: string[] };
    athletes: { label: string; items: string[] };
  };
  customSections: {
    id: string;
    label: string;
    items: string[];
  }[];
  about: {
    bio: string;
    funFact: string;
  };
  customization: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      textPrimary: string;
      textSecondary: string;
    };
    display: {
      showAvatar: boolean;
      avatarSize: number;
      showPronouns: boolean;
      showBirthday: boolean;
      showSections: {
        likes: boolean;
        besties: boolean;
        anime: boolean;
        food: boolean;
        artists: boolean;
        athletes: boolean;
      };
    };
    layout: {
      pageStyle: string;
      sectionColumns: string;
      sectionSpacing: number;
      cardStyle: string;
      cardBorderRadius: number;
      cardBorder: boolean;
      cardShadow: boolean;
      cardBackground: string;
      contentMaxWidth: string;
    };
    navbar: {
      showAvatar: boolean;
      showName: boolean;
      showAdmin: boolean;
      buttonPosition: string;
      borderRadius: number;
      blur: number;
      shadow: boolean;
      padding: number;
      bgOpacity: number;
      mobileStyle: string;
    };
    animations: {
      enabled: boolean;
      type: string;
      pageTransition: string;
      loadingAnimation: boolean;
      hoverEffects: boolean;
      loadingScreen: {
        style: string;
        title: string;
        subtitle: string;
        showTitle: boolean;
        showSubtitle: boolean;
        speed: number;
        color: string;
        size: number;
      };
    };
  };
}

import defaultData from "../data/defaults.json";

export function getDefaultData(): SiteData {
  return defaultData as SiteData;
}

function migrateSections(data: any): SiteData {
  const defaults = getDefaultData();
  if (data.sections && typeof data.sections.likes === "object" && data.sections.likes.items) {
    return data as SiteData;
  }
  const migrated = { ...data };
  migrated.sections = { ...defaults.sections };
  for (const key of Object.keys(defaults.sections) as (keyof typeof defaults.sections)[]) {
    const stored = data.sections?.[key];
    if (Array.isArray(stored)) {
      migrated.sections[key] = { label: defaults.sections[key].label, items: stored };
    } else {
      migrated.sections[key] = defaults.sections[key];
    }
  }
  return migrated as SiteData;
}

function deepMergeDefaults<T>(stored: Partial<T>, defaults: T): T {
  const result = { ...defaults } as any;
  for (const key in stored) {
    if (stored[key] !== null && typeof stored[key] === "object" && !Array.isArray(stored[key]) && defaults[key as keyof T] && typeof defaults[key as keyof T] === "object") {
      result[key] = deepMergeDefaults(stored[key] as any, defaults[key as keyof T]);
    } else {
      result[key] = stored[key];
    }
  }
  return result as T;
}

let cloudCache: SiteData | null = null;
let cloudFetchPromise: Promise<SiteData | null> | null = null;

export async function loadSiteDataAsync(): Promise<SiteData> {
  if (cloudCache) return cloudCache;

  if (!cloudFetchPromise) {
    cloudFetchPromise = loadFromCloud().catch(() => null);
  }

  const cloudData = await cloudFetchPromise;

  if (cloudData) {
    const merged = deepMergeDefaults(cloudData, getDefaultData());
    cloudCache = migrateSections(merged);
    localStorage.setItem(STORAGE_KEY, simpleEncrypt(JSON.stringify(cloudData)));
    return cloudCache;
  }

  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (encrypted) {
      const decrypted = simpleDecrypt(encrypted);
      const parsed = JSON.parse(decrypted);
      cloudCache = migrateSections(deepMergeDefaults(parsed, getDefaultData()));
      return cloudCache;
    }
  } catch {
  }

  cloudCache = getDefaultData();
  return cloudCache;
}

export function loadSiteData(): SiteData {
  if (cloudCache) return cloudCache;

  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) return getDefaultData();
    const decrypted = simpleDecrypt(encrypted);
    const parsed = JSON.parse(decrypted);
    return deepMergeDefaults(parsed, getDefaultData());
  } catch {
    return getDefaultData();
  }
}

export async function saveSiteDataAsync(data: SiteData): Promise<boolean> {
  cloudCache = data;
  const encrypted = simpleEncrypt(JSON.stringify(data));
  localStorage.setItem(STORAGE_KEY, encrypted);
  return saveToCloud(data);
}

export function saveSiteData(data: SiteData): void {
  cloudCache = data;
  const encrypted = simpleEncrypt(JSON.stringify(data));
  localStorage.setItem(STORAGE_KEY, encrypted);
  saveToCloud(data);
}

export function resetSiteData(): void {
  cloudCache = null;
  cloudFetchPromise = null;
  localStorage.removeItem(STORAGE_KEY);
}
