export const api = {
    requestOTP: () => `/sendOtp`,
    validateOTP: () => `/otpVerification`,

    communicateEnachPayment: () => `/enachPayment`,
    enachPaymentStatus: (msgID) => `/enachPaymentStatus/${msgID}`,
    
    enachmandateType: () => `/mandateType`,
    getLiveBankDtlsType: () => `https://enachuat.npci.org.in:8086/apiservices_new/getLiveBankDtls`,
    paymentmerchentType: () => `/api/payment-merchent`
    


}