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

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/client/success?${formObjectString}`)
    } catch (error) {
        console.error('Error processing form data:', error);
        return NextResponse.json({ error: error })
    }
}