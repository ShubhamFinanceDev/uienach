const ErrorHandler = (error) => {
    alert(error.message)
    // snackbar(error?.response?.data?.msg || error?.message, "error")

}

module.exports = { ErrorHandler }