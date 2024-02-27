import React from 'react'

const classNameDefault = [
    "row mt-3", "col-md-6 col-12", "col-md-6 col-12"
]

const SelectWithLabel = (props) => {
    const { feild, state = {}, onChangeHandler = () => { }, className = classNameDefault } = props
    const { options = [], name = "", id = "", label = "", isRequired = false, isDisabled = false, isHidden = false, isReadOnly = false } = feild
    return (
        <div className={className[0]}>
            <div
                className={className[1]}
            >
                <label
                    htmlFor={id || name}
                >{label}
                    {isRequired && <span />}</label>
            </div>

            <div
                className={className[2]}
            >
                <select
                    id={id || name}
                    name={name}
                    className={'form-control'}
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
            </div>

        </div>)
}

export default SelectWithLabel