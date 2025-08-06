// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();

//         const { name, email, category } = body;

//         const response = await fetch(`${process.env.API_URL}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 module_name: 'enquiry_form',
//                 keys: {
//                     data: [{
//                         name,
//                         email,
//                         category,
//                     }],
//                 },
//                 cid: process.env.CID,
//             }),
//         });

//         if (!response.ok) {
//             return NextResponse.json({ error: 'API request failed' }, { status: 500 });
//         }

//         return NextResponse.json({ message: 'Form submitted successfully' });
//     } catch (error) {
//         console.error('Server error:', error);
//         return NextResponse.json({ error: 'Server error' }, { status: 500 });
//     }
// }

// // app/api/enquiry/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const { name, email } = data;

        const cid = process.env.CID || '';

        const formData = new FormData();
        formData.append('website_form', btoa('contact_query'));
        formData.append('cid', btoa(cid));
        formData.append('first_name', name);
        formData.append('last_name', btoa(''));
        formData.append('email', email);
        formData.append('message', btoa(''));
        formData.append('country', btoa(''));
        formData.append('phone', btoa(''));

        // const addonInfo = {
        //     interested_in: atob(interested_in), // Optional: decode before stringify
        // };
        // formData.append('additional_info', btoa(JSON.stringify(addonInfo)));
        // formData.append('additional_info', btoa(JSON.stringify({
        //   interested_in: atob(interested_in),
        // })));


        const apiRes = await fetch(`${process.env.CMS_URL}`, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: '*/*',
            },
        });

        if (apiRes.ok) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Failed to submit form' }, { status: 500 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

