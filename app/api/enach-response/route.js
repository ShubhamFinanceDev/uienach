import { NextResponse } from "next/server";
import axios from "@/services/axios";
import { api } from "@/services/endpoint";


export async function POST(req) {
    try {
        const formData = await req.formData();
        let formObject = {};
        for (const [key, value] of formData.entries()) {
            formObject[key] = value;
        }

        // Java API call
        const jsonString = formObject.MandateRespDoc.replace(/'/g, '"');
        const parsedObject = JSON.parse(jsonString);

        const { MsgId, Status = "Something went wrong!", Errors = {} } = parsedObject;
        const { data } = await axios.put(api.enachPaymentStatus(MsgId), { transactionStatus: Status });

        let loanNo = data.loanNo;
        const msgID = parsedObject.MsgId;
        
        if (Status === 'Failed') {
            let errorObject = []
            for (const error of Errors) {
                errorObject.push("reason=" + error.Error_Message)
            }
            const errorObjectString = errorObject.join("&")

            return new Response(null, {
                status: 302,
                headers: {
                    "Location": `http://144.24.96.140/client/failed?${errorObjectString}`
                }
            });
        } else {
            let successUrl = `http://144.24.96.140/client/success`;
            if (loanNo) {
                successUrl += `?loanNo=${loanNo}&${msgID}`;
                
            }

            return new Response(null, {
                status: 302,
                headers: {
                    "Location": successUrl
                }
            });
        }

    } catch (error) {
        console.error('Error processing form data:', error);
        return NextResponse.json({ error: error })
    }
}
