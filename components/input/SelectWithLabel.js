import React from 'react'

const classNameDefault = [
    "col-md-12 col-12 mt-3", "", "form-control"
]

const SelectWithLabel = (props) => {
    const { feild, state = {}, onChangeHandler = () => { }, className = classNameDefault } = props
    const { options = [], name = "", id = "", label = "", isRequired = false, isDisabled = false, isHidden = false, isReadOnly = false } = feild
    return (
        <div className={className[0]}>
            <label
                htmlFor={id || name}
                className={className[1]}>{label}
                {isRequired && <span />}</label>

            <select
                id={id || name}
                name={name}
                className={className[2]}
                value={state?.[name]}

                onChange={onChangeHandler}
                disabled={isDisabled}
                hidden={isHidden}
                readOnly={isReadOnly}
                required={isRequired}
            >
                <option value="" hidden>-</option>
                {options.map((o) => (
                    <option value={o.value} key={`option__${name}__${o.value}`}>{o.name}</option>
                ))}
            </select>
        </div>)
}

export default SelectWithLabel