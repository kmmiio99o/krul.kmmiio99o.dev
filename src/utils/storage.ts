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
  const merged = { ...data };
  merged.sections = { ...defaults.sections };
  for (const key of Object.keys(defaults.sections) as (keyof typeof defaults.sections)[]) {
    const stored = data.sections?.[key];
    if (Array.isArray(stored)) {
      merged.sections[key] = { label: defaults.sections[key].label, items: stored };
    } else {
      merged.sections[key] = defaults.sections[key];
    }
  }
  return merged as SiteData;
}

function fillMissingDefaults(stored: any, defaults: any): any {
  if (stored === null || stored === undefined) return defaults;
  if (Array.isArray(defaults)) return Array.isArray(stored) ? stored : defaults;
  if (typeof stored !== "object" || typeof defaults !== "object") return stored;

  const result = { ...stored };

  for (const key of Object.keys(defaults)) {
    if (!(key in result)) {
      result[key] = defaults[key];
    } else if (result[key] !== null && typeof result[key] === "object" && typeof defaults[key] === "object" && !Array.isArray(defaults[key])) {
      result[key] = fillMissingDefaults(result[key], defaults[key]);
    }
  }

  return result;
}

let cachedData: SiteData | null = null;

export async function loadSiteDataAsync(): Promise<SiteData> {
  if (cachedData) return cachedData;

  // 1. Try cloud first
  try {
    const cloudData = await loadFromCloud();
    if (cloudData && typeof cloudData === "object" && Object.keys(cloudData).length > 0) {
      const merged = fillMissingDefaults(cloudData, getDefaultData());
      cachedData = migrateSections(merged);
      localStorage.setItem(STORAGE_KEY, simpleEncrypt(JSON.stringify(cloudData)));
      return cachedData;
    }
  } catch {
  }

  // 2. Fallback to localStorage
  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (encrypted) {
      const decrypted = simpleDecrypt(encrypted);
      const parsed = JSON.parse(decrypted);
      if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
        cachedData = migrateSections(fillMissingDefaults(parsed, getDefaultData()));
        return cachedData;
      }
    }
  } catch {
  }

  // 3. Nothing valid found, use defaults
  cachedData = getDefaultData();
  return cachedData;
}

export function loadSiteData(): SiteData {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) return getDefaultData();
    const decrypted = simpleDecrypt(encrypted);
    const parsed = JSON.parse(decrypted);
    if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
      return fillMissingDefaults(parsed, getDefaultData());
    }
    return getDefaultData();
  } catch {
    return getDefaultData();
  }
}

export async function saveSiteDataAsync(data: SiteData): Promise<boolean> {
  cachedData = data;
  const encrypted = simpleEncrypt(JSON.stringify(data));
  localStorage.setItem(STORAGE_KEY, encrypted);
  return saveToCloud(data);
}

export function saveSiteData(data: SiteData): void {
  cachedData = data;
  const encrypted = simpleEncrypt(JSON.stringify(data));
  localStorage.setItem(STORAGE_KEY, encrypted);
  saveToCloud(data);
}

export function resetSiteData(): void {
  cachedData = null;
  localStorage.removeItem(STORAGE_KEY);
}
