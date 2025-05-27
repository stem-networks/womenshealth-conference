// 'use client';

// import React from 'react'
// import Head from 'next/head'
// import Guidelines from '../components/Guidelines'
// import { useAppData } from '@/context/AppDataContext'

// const page = ({ guidelinesContent }) => {

//     const { pages } = useAppData();

//     // Using the correct key: 'index'
//     const guidelinePage = pages?.guidlines?.[0];

//     console.log("pages page", guidelinePage?.title);
//     return (
//         <div>
//             <Head>
//                 <title>{guidelinePage?.title || ''}</title>
//                 <meta name="description" content={guidelinePage?.content || ''} />
//                 <meta name="keywords" content={guidelinePage?.meta_keywords || ''} />
//                 {/* <link rel="canonical" href={canonicalUrl ? canonicalUrl : ""} />  */}
//             </Head>
//             <Guidelines guidelinesContent={guidelinesContent} />
//         </div>
//     )
// }

// export default page

'use client'

import React from 'react'
import Guidelines from '../components/Guidelines'
import { useAppData } from '../../context/AppDataContext'
import Head from 'next/head'

const GuidelinesPage = () => {
    const { pages, commonContent } = useAppData();

    // Fix typo if needed
    const guidelinePage = pages?.guidlines?.[0]; // <-- 'guidelines' not 'guidlines'

    const guidelinesContent = commonContent?.guidelines?.content || '';

    return (
        <>
            {/* Use Next.js <Head> component */}
            <Head>
                <title>{guidelinePage?.title || 'Guidelines'}</title>
                <meta name="description" content={guidelinePage?.content || ''} />
                <meta name="keywords" content={guidelinePage?.meta_keywords || ''} />
            </Head>

            <Guidelines guidelinesContent={guidelinesContent} />
        </>
    );
}

export default GuidelinesPage;
