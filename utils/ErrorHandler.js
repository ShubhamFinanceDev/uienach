const ErrorHandler = (error) => {
    console.error(error)
    // snackbar(error?.response?.data?.msg || error?.message, "error")

}

module.exports = { ErrorHandler }