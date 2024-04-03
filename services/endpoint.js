export const api = {
    requestOTP: () => `/eNach/sendOtp`,
    validateOTP: () => `/eNach/otpVerification`,

    communicateEnachPayment: () => `/customer/enachPayment`,
    enachPaymentStatus: (msgID) => `/customer/enachPaymentStatus/${msgID}`,
    
    enachmandateType: () => `/customer/mandateType`,
    getLiveBankDtlsType: () => `https://enachuat.npci.org.in:8086/apiservices_new/getLiveBankDtls`,
    paymentmerchentType: () => `/api/payment-merchent`
    


}