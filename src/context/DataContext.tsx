import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { loadSiteDataAsync, saveSiteData, resetSiteData, getDefaultData, saveSiteDataAsync, type SiteData } from "../utils/storage";

interface DataContextType {
  data: SiteData;
  hasChanges: boolean;
  updateData: (updates: Partial<SiteData>) => void;
  updateProfile: (updates: Partial<SiteData["profile"]>) => void;
  updateSections: (updates: Partial<SiteData["sections"]>) => void;
  updateCustomSections: (sections: SiteData["customSections"]) => void;
  updateAbout: (updates: Partial<SiteData["about"]>) => void;
  resetData: () => void;
  saveToCloud: () => Promise<boolean>;
  loading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(getDefaultData());
  const [loading, setLoading] = useState(true);
  const [cloudSnapshot, setCloudSnapshot] = useState<SiteData | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    loadSiteDataAsync().then((loaded) => {
      setData(loaded);
      setCloudSnapshot(JSON.parse(JSON.stringify(loaded)));
      setLoading(false);
      initialized.current = true;
    }).catch(() => {
      const defaults = getDefaultData();
      setData(defaults);
      setCloudSnapshot(JSON.parse(JSON.stringify(defaults)));
      setLoading(false);
      initialized.current = true;
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      saveSiteData(data);
    }
  }, [data, loading]);

  const hasChanges = cloudSnapshot ? !deepEqual(data, cloudSnapshot) : false;

  const updateData = (updates: Partial<SiteData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateProfile = (updates: Partial<SiteData["profile"]>) => {
    setData((prev) => ({ ...prev, profile: { ...prev.profile, ...updates } }));
  };

  const updateSections = (updates: Partial<SiteData["sections"]>) => {
    setData((prev) => ({ ...prev, sections: { ...prev.sections, ...updates } }));
  };

  const updateAbout = (updates: Partial<SiteData["about"]>) => {
    setData((prev) => ({ ...prev, about: { ...prev.about, ...updates } }));
  };

  const updateCustomSections = (sections: SiteData["customSections"]) => {
    setData((prev) => ({ ...prev, customSections: sections }));
  };

  const resetData = () => {
    resetSiteData();
    const defaults = getDefaultData();
    setData(defaults);
    setCloudSnapshot(JSON.parse(JSON.stringify(defaults)));
  };

  const saveToCloud = useCallback(async () => {
    const ok = await saveSiteDataAsync(data);
    if (ok) setCloudSnapshot(JSON.parse(JSON.stringify(data)));
    return ok;
  }, [data]);

  return (
    <DataContext.Provider
      value={{ data, hasChanges, updateData, updateProfile, updateSections, updateCustomSections, updateAbout, resetData, saveToCloud, loading }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
}
