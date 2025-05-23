'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchData } from '@/lib/api';
import { ApiData, NavItem } from '@/types';

interface NavContextType {
  navItems: NavItem[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const NavContext = createContext<NavContextType>({
  navItems: [],
  isLoading: false,
  error: null,
  refresh: async () => {}
});

interface NavProviderProps {
  children: ReactNode;
  initialData?: ApiData | null;
}

export const NavProvider = ({ children, initialData }: NavProviderProps) => {
  const [state, setState] = useState<Omit<NavContextType, 'refresh'> & { 
    navItems: NavItem[] 
  }>({
    navItems: initialData?.display_features || [],
    isLoading: !initialData,
    error: null
  });

  const refresh = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchData();
      setState({
        navItems: data?.display_features || [],
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState({
        navItems: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch navigation'
      });
    }
  };

  useEffect(() => {
    if (!initialData) {
      refresh();
    }
  }, [initialData]);

  return (
    <NavContext.Provider value={{ ...state, refresh }}>
      {children}
    </NavContext.Provider>
  );
};