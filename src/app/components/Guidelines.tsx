
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
        <div dangerouslySetInnerHTML={{ __html: guidelinesContent }} />
      ) : (
        <p className="auto-container mt-4 mb-5">No guidelines available at the moment.</p>
      )}
    </div>
  )
}

export default Guidelines;

