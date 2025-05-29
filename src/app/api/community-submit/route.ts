import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, category } = body;

        const response = await fetch(`${process.env.API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                module_name: 'enquiry_form',
                keys: {
                    data: [{
                        name,
                        email,
                        category,
                    }],
                },
                cid: process.env.CID,
            }),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'API request failed' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
