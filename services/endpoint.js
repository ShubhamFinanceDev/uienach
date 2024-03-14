export const api = {
    requestOTP: () => `/sendOtp`,
    validateOTP: () => `/otpVerification`,

    communicateEnachPayment: () => `/enachPayment`,
    enachPaymentStatus: (msgID) => `/enachPaymentStatus/${msgID}`,
    
    enachmandateType: () => `/mandateType`


}