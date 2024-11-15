export const api = {
    requestOTP: () => `/eNach/sendOtp`,
    validateOTP: () => `/eNach/otpVerification`,
    validateOTPENachCancellation: () => `/cancellation/otpVerification`,
    cancellationStatus: () => `/cancellation/cancellation-status`,

    communicateEnachPayment: () => `/customer/enachPayment`,
    enachPaymentStatus: (msgID) => `/eNach/enachPaymentStatus/${msgID}`,
    
    enachmandateType: () => `/customer/mandateType`,
    getLiveBankDtlsType: () => `https://enachuat.npci.org.in:8086/apiservices_new/getLiveBankDtls`,
    paymentmerchentType: () => `/api/payment-merchent`
    


}