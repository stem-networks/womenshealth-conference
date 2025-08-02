// context/AppDataContext.tsx

// 'use client';

// import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
// import { 
//   GeneralData, 
//   PagesData, 
//   NavItem, 
//   SocialLinks, 
//   RegistrationInfo,
//   IndexPageData,
//   CommonContent
// } from '@/types';

// interface AppDataContextType {
//   general: GeneralData;
//   pages: PagesData;
//   navItems: NavItem[];
//   socialLinks: SocialLinks;
//   registrationInfo: RegistrationInfo | null;
//   indexPageData: IndexPageData | null;
//   commonContent: CommonContent | null;
//   fetchRegistrationInfo: () => Promise<void>;
//   fetchIndexPageData: () => Promise<void>;
//   fetchCommonContent: () => Promise<void>;
//   loading: boolean;
//   error: string | null;
// }

// const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// export function AppDataProvider({ 
//   children,
//   general,
//   pages,
//   navItems,
//   socialLinks
// }: { 
//   children: ReactNode;
//   general: GeneralData;
//   pages: PagesData;
//   navItems: NavItem[];
//   socialLinks: SocialLinks;
// }) {
//   const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo | null>(null);
//   const [indexPageData, setIndexPageData] = useState<IndexPageData | null>(null);
//   const [commonContent, setCommonContent] = useState<CommonContent | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch all initial data when component mounts
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       await Promise.all([
//         fetchRegistrationInfo(),
//         fetchIndexPageData(),
//         fetchCommonContent()
//       ]);
//     };
    
//     fetchInitialData();
//   }, []);

//   const fetchRegistrationInfo = async () => {
//     if (loading) return;
    
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/reg-page-data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: RegistrationInfo = await response.json();
//       setRegistrationInfo(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch registration info');
//       console.error('Error fetching registration info:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchIndexPageData = async () => {
//     if (loading) return;
    
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/index-page', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: IndexPageData = await response.json();
//       setIndexPageData(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch index page data');
//       console.error('Error fetching index page data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCommonContent = async () => {
//     if (loading) return;
    
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/common-content', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: CommonContent = await response.json();
//       setCommonContent(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch common content');
//       console.error('Error fetching common content:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AppDataContext.Provider 
//       value={{ 
//         general, 
//         pages, 
//         navItems, 
//         socialLinks,
//         registrationInfo,
//         indexPageData,
//         commonContent,
//         fetchRegistrationInfo,
//         fetchIndexPageData,
//         fetchCommonContent,
//         loading,
//         error
//       }}
//     >
//       {children}
//     </AppDataContext.Provider>
//   );
// }

// export function useAppData() {
//   const context = useContext(AppDataContext);
//   if (!context) {
//     throw new Error('useAppData must be used within an AppDataProvider');
//   }
//   return context;
// }