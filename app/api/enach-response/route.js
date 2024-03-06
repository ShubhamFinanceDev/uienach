import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const formObject = {};
        let formObjectString = []

        for (const [key, value] of formData.entries()) {
            formObject[key] = value;
            formObjectString.push(key + "=" + value)
        }
        formObjectString = formObjectString.join("&")
        // java api call

        return new Response(null, {
            status: 302,
            headers: {
                "Location": `http://144.24.96.140/client/success?${formObjectString}`
            }
        });

    } catch (error) {
        console.error('Error processing form data:', error);
        return NextResponse.json({ error: error })
    }
}