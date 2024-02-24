const changeHandlerHelper = (e, state, setState) => {

    let { name, value, checked, type } = e.target;
    if (type == "number") {
        value *= 1
    }
    const prevState = { ...state }
    prevState[name] = value
    setState(prevState)
}

module.exports = { changeHandlerHelper }