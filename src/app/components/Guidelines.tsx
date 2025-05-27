// "use client"

// import React from 'react'
// import { useAppData } from '@/context/AppDataContext';
// import Link from 'next/link';

// const Guidelines = () => {
//   const { commonContent } = useAppData();
//   const guidelinesContent = commonContent?.guidelines?.content || '';


//   return (
//     <div>
//       <div className="brand_wrap">
//         <div className="auto-container">
//           <div className="row">
//             <div className="col-md-12">
//               <Link href="/" title='Navigate to Homepage'>Home</Link> <i className="fa fa-angle-right"></i>
//               <span>Guidelines</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {guidelinesContent ? (
//         <div dangerouslySetInnerHTML={{ __html: guidelinesContent }} />
//       ) : (
//         <p>No guidelines available at the moment.</p>
//       )}
//     </div>
//   )
// }

// export default Guidelines;

"use client"

import React from 'react'
import Link from 'next/link'

interface GuidelinesProps {
  guidelinesContent: string;
}

const Guidelines: React.FC<GuidelinesProps> = ({ guidelinesContent }) => {
  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="brand_wrap">
        <div className="auto-container">
          <div className="row">
            <div className="col-md-12">
              <Link href="/" title="Navigate to Homepage">Home</Link> <i className="fa fa-angle-right"></i>
              <span>Guidelines</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {guidelinesContent ? (
        <div className="auto-container mt-4 mb-5" dangerouslySetInnerHTML={{ __html: guidelinesContent }} />
      ) : (
        <p className="auto-container mt-4 mb-5">No guidelines available at the moment.</p>
      )}
    </div>
  )
}

export default Guidelines;

