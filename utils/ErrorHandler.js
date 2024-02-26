const ErrorHandler = (error) => {
    console.error(error)
    if (error?.message) {
        alert(error.message)
    }
    // snackbar(error?.response?.data?.msg || error?.message, "error")

}

module.exports = { ErrorHandler }