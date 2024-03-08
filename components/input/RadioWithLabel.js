import React from 'react';

const classNameDefault = [
    "row mt-3", "col-md-6 col-12", "col-md-6 col-12"
];

const RadioWithLabel = (props) => {
    const { feild, state = {}, onChangeHandler = () => { }, className = classNameDefault } = props;
    const { name = "", id = "", label = "", options = [], isRequired = false, isDisabled = false, isHidden = false, isReadOnly = false } = feild;

    return (
        <div className={className[0]}>
            <div className={className[1]}>
                <label htmlFor={id || name}>{label}{isRequired && <span></span>}:</label>
            </div>
            <div className={className[2]}>
                {options.map((option, index) => (
                    <div key={index} className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id={`${id || name}_${index}`}
                            name={name}
                            value={option.value}
                            checked={state[name] === option.value}
                            onChange={onChangeHandler}
                            disabled={isDisabled}
                            hidden={isHidden}
                            readOnly={isReadOnly}
                            required={isRequired}
                        />
                        <label className="form-check-label" htmlFor={`${id || name}_${index}`}>{option.label}</label>
                        <span>{option.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioWithLabel;
