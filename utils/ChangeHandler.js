const changeHandlerHelper = (e, state, setState, customCase = () => {}) => {

    let { name, value, checked, type, } = e.target;
    if (type == "number") {
        value *= 1
    }
    const prevState = { ...state }
    prevState[name] = value
    customCase(prevState, e.target)
    setState(prevState)
}

module.exports = { changeHandlerHelper }