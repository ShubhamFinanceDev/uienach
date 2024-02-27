import React from 'react'

const classNameDefault = [
    "row mt-3", "col-md-6 col-12", "col-md-6 col-12"
]

const InputWithLabel = (props) => {
    const { feild, state = {}, onChangeHandler = () => { }, className = classNameDefault } = props
    const { type = "text", name = "", id = "", label = "", isRequired = false, isDisabled = false, isHidden = false, isReadOnly = false } = feild
    return (
        <div className={className[0]}>
            <div className={className[1]}>
                <label
                    htmlFor={id || name}>{label}
                    {isRequired && <span />} :</label>
            </div>
            <div className={className[2]}>
                <input
                    type={type}
                    className='form-control'
                    id={id || name} name={name}
                    value={state?.[name]}
                    onChange={onChangeHandler}
                    disabled={isDisabled}
                    hidden={isHidden}
                    readOnly={isReadOnly}
                    required={isRequired}
                />
            </div>
        </div>)
}

export default InputWithLabel