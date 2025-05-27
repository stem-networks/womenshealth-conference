// app/call-for-abstract-submission/page.tsx or pages/call-for-abstract-submission.tsx

import React from 'react';
import AbstractSubmission from '../components/AbstractSubmission'; // adjust path if needed

const SubmitAbstractPage = () => {
    return (
        <div>
            {/* You can use next/head if you're in a "pages" folder structure */}
            {/* <Head>
                <title>Call for Abstract Submission</title>
                <meta name="description" content="Submit your abstract for the conference." />
                <meta name="keywords" content="abstract, conference, call for papers" />
                <link rel="canonical" href="/call-for-abstract-submission" />
            </Head> */}
            <AbstractSubmission />
        </div>
    );
};

export default SubmitAbstractPage;
