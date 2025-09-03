// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//     try {
//         const data = await req.json();
//         const { name, email, phone, query } = data.formData;

//         const cid = process.env.CID || '';

//         const formData = new FormData();
//         formData.append('website_form', btoa('sponsors_exhibitor'));
//         formData.append('cid', btoa(cid));
//         formData.append('first_name', name);
//         formData.append('last_name', btoa(''));
//         formData.append('email', email);
//         formData.append('message', query);
//         formData.append('country', btoa(''));
//         formData.append('phone', phone);

//         const apiRes = await fetch(`${process.env.CMS_URL}`, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 Accept: '*/*',
//             },
//         });

//         if (apiRes.ok) {
//             return NextResponse.json({ success: true });
//         } else {
//             return NextResponse.json({ success: false, error: 'Failed to submit form' }, { status: 500 });
//         }
//     } catch (error) {
//         console.error('API Error:', error);
//         return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
//     }
// }

//app/api/sponsor-exhibitor.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, email, phone, query } = data;

        const cid = process.env.CID || '';

        const formData = new FormData();
        formData.append('website_form', btoa('sponsors_exhibitor'));
        formData.append('cid', btoa(cid));
        formData.append('first_name', name);
        formData.append('last_name', btoa(''));
        formData.append('email', email);
        formData.append('message', query);
        formData.append('country', btoa(''));
        formData.append('phone', phone);

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



