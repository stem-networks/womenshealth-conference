// context/AppDataContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import { GeneralData, PagesData } from "@/types";

interface AppDataContextType {
  general: GeneralData;
  pages: PagesData;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({
  general,
  pages,
  children,
}: {
  general: GeneralData;
  pages: PagesData;
  children: React.ReactNode;
}) => {
  return (
    <AppDataContext.Provider value={{ general, pages }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
};
