'use client';

import { createContext, useContext, ReactNode } from 'react';
import { GeneralData, PagesData, NavItem, SocialLinks } from '@/types';

interface AppDataContextType {
  general: GeneralData;
  pages: PagesData;
  navItems: NavItem[];
  socialLinks: SocialLinks;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ 
  children,
  general,
  pages,
  navItems,
  socialLinks
}: { 
  children: ReactNode;
  general: GeneralData;
  pages: PagesData;
  navItems: NavItem[];
  socialLinks: SocialLinks;
}) {
  return (
    <AppDataContext.Provider value={{ general, pages, navItems, socialLinks }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}