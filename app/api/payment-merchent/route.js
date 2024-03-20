import { NextResponse } from "next/server";
import axios from "@/services/axios";

export async function GET(req) {
    try {
        const { data: { liveBankList } } = await axios.get("https://enachuat.npci.org.in:8086/apiservices_new/getLiveBankDtls")

        return NextResponse.json({
            Net: liveBankList.filter((d) => d.netbankFlag === 'Active').map((d) => {
                return ({
                    name: d.bankName,
                    value: d.bankId
                })
            }),
            Debit: liveBankList.filter((d) => d.debitcardFlag === 'Active').map((d) => {
                return ({
                    name: d.bankName,
                    value: d.bankId
                })
            })
        })
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}

