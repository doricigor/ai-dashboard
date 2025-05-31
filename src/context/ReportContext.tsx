import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import type { Report } from "../types";
import storage from "../services/LocalStorageService";

interface ReportContextType {
  reports: Report[];
  deleteReport: (id: string) => void;
  reorderReports: (newOrder: Report[]) => void;
  addReport: (title: string, content: string, aiUsedAt?: string) => void;
  clearReports: () => void;
  updateReport: (
    id: string,
    title: string,
    content: string,
    aiUsedAt?: string
  ) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "reports";

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = storage.getParsedItem<Report[]>(LOCAL_STORAGE_KEY);
    if (stored && Array.isArray(stored)) {
      setReports(stored);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      storage.setItem(LOCAL_STORAGE_KEY, reports);
    }
  }, [reports, initialized]);

  const addReport = (title: string, content: string, aiUsedAt?: string) => {
    const newReport: Report = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(aiUsedAt && { aiUsedAt }),
    };
    setReports((prev) => [newReport, ...prev]);
  };

  const updateReport = (
    id: string,
    updatedTitle: string,
    updatedContent: string,
    aiUsedAt?: string
  ) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id
          ? {
              ...report,
              title: updatedTitle,
              content: updatedContent,
              updatedAt: new Date().toISOString(),
              ...(aiUsedAt && { aiUsedAt }),
            }
          : report
      )
    );
  };

  const deleteReport = (id: string) => {
    setReports((prevReports) =>
      prevReports.filter((report) => report.id !== id)
    );
  };

  const reorderReports = (newOrder: Report[]) => {
    setReports(newOrder);
  };

  const clearReports = () => {
    setReports([]);
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        addReport,
        updateReport,
        deleteReport,
        reorderReports,
        clearReports,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReportContext must be used within a ReportProvider");
  }
  return context;
};
