import { NextResponse } from "next/server";
import axios from "@/services/axios";

export async function GET(req) {
    try {
        const {data} = await axios.get("https://enachuat.npci.org.in:8086/apiservices_new/getLiveBankDtls")
        return NextResponse.json({ data : data?.liveBankList })
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}

