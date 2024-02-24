import React from 'react'

const classNameDefault = [
    "col-md-6 col-12 mt-3", "", "form-control"
]

const InputWithLabel = (props) => {
    const { feild, state = {}, onChangeHandler = () => { }, className = classNameDefault } = props
    const { type = "text", name = "", id = "", label = "", isRequired = false, isDisabled = false, isHidden = false } = feild
    return (
        <div className={className[0]}>
            <label
                htmlFor={id || name}
                className={className[1]}>{label}
                {isRequired && <span />}</label>
            <input
                type={type}
                id={id || name} name={name}
                className={className[2]}
                value={state?.[name]}
                onChange={onChangeHandler}
                disabled={isDisabled}
                hidden={isHidden}
            />
        </div>)
}

export default InputWithLabel