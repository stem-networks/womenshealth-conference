// app/api/enquiry/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const { enquiryname, enquiryemail } = data;

        const cid = process.env.CID || '';

        const formData = new FormData();
        formData.append('website_form', btoa('contact_query'));
        formData.append('cid', btoa(cid));
        formData.append('first_name', enquiryname);
        formData.append('last_name', btoa(''));
        formData.append('email', enquiryemail);
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

