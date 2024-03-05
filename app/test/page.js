import React from 'react'

const page = () => {
    return (
        <div>
            <form id="PostToMerchant" name="PostToMerchant"
                action="/api/enach-response"
                method="POST"
                enctype="multipart/form-data"
            >
                <input className='form-control' type="text" ID="CheckSumVal" name="CheckSumVal" value="aeea600b85da7bd2e700387b365895fdb51bc6ca463095addbacdff52109b03c" />
                <input className='form-control' type="text" ID="MandateRespDoc" name="MandateRespDoc" value="{'Status':'Failed','MsgId':'29072019dev010','RefId':'0000002272','Errors':[{'Error_Code':'AP23','Error_Message':'Rejected as per customer confirmation'}],'Filler1':'Filler1','Filler2':'Filler2','Filler3':'Filler3','Filler4':'Filler4','Filler5':'Filler5','Filler6':'Filler6','Filler7':'Filler7','Filler8':'Filler8','Filler9':'Filler9','Filler10':'Filler10'}" />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default page