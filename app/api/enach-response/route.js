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

        const { MsgId, Status = "Something went wrong!", Errors = {}, RefId="" } = parsedObject;


        let errorObject = []
        let errorObj2 = []


        for (const error of Errors) {
            errorObject.push("reason=" + error.Error_Message)
            errorObj2.push(error.Error_Message)
        }

        const errorString = errorObj2.join(", ") || ""
        
        const { data: { applicationNo = "" , mandateType="", amount=""} } = await axios.put(api.enachPaymentStatus(MsgId), { transactionStatus: Status, errorMessage : errorString,  refrenceId:RefId});
        const transactionQuery = `applicationNo=${applicationNo}&MsgId=${MsgId}&mandateType=${mandateType}&amount=${amount}`

        if (Status === 'Failed') {
            
            const errorObjectString = errorObject.join("&")

            return new Response(null, {
                status: 302,
                headers: {
                    "Location": `https://enach2.shubham.co:3000/client/failed?${errorObjectString}&${transactionQuery}`
                }
            });
        } else {
            return new Response(null, {
                status: 302,
                headers: {
                    "Location": `https://enach2.shubham.co:3000/client/success?${transactionQuery}`
                }
            });
        }

    } catch (error) {
        console.error('Error processing form data:', error);
        return NextResponse.json({ error: error })
    }
}
