"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useLogicHooks from '@/hooks/useLogicHooks';
import InputWithLabel from '@/components/input/InputWithLabel';

const formInput = [
    { isRequired: true, type: 'text', id: 'ApplicationNumber', label: 'Application Number', name: 'applicationNumber' },
    { isRequired: true, type: 'password', id: 'ConfirmApplicationNumber', label: 'Confirm Application Number', name: 'confirmApplicationNumber' },
];
const OTPFormInput = [
    { type: 'text', id: 'otp', label: 'One Time Password (OTP)', name: 'otpCode', isRequired: true },
];

const ClientAuthPage = () => {
    const router = useRouter();
    const { userDetailState, conditionRender, userDetailChangeHandler, requestOTPHandler, validateOTPHandler } = useLogicHooks();

    const [isOTPRequested, setIsOTPRequested] = useState(false);
    const [timer, setTimer] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let interval;
        if (isOTPRequested && timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        }
        if (timer === 0) clearInterval(interval);
        return () => clearInterval(interval);
    }, [isOTPRequested, timer]);

    const handleRequestOTP = (e) => {
        e.preventDefault();
        const isValid = validateInputs();

        if (isValid) {
            requestOTPHandler(e);
            setIsOTPRequested(true);
            setTimer(600); // 10 minutes in seconds
        }
    };

    const validateInputs = () => {
        const newErrors = {};
        formInput.forEach((input) => {
            const value = userDetailState[input.name];
            if (/\s/.test(value)) {
                newErrors[input.name] = "This field cannot contain spaces.";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;

    return (
        <>
            <div className='container'>
                <div className='mt-5'>
                    <div className='heading'>
                        <h2 className='mb-1'>E-Nach Registration</h2>
                        <p className='mb-3'>Create or modify mandate for future payment.</p>
                        {isOTPRequested && timer > 0 && <h3 className='timer'>Time remaining: {formatTime(timer)}</h3>}
                    </div>
                    <form className="row" onSubmit={handleRequestOTP}>
                        {formInput.map((d) => (
                            <div key={`form_input__${d.name}`} className="col-12 mt-3">
                                <InputWithLabel
                                    feild={{ ...d, isDisabled: conditionRender.showOTPSection }}
                                    state={userDetailState}
                                    onChangeHandler={userDetailChangeHandler}
                                    className={["form-control"]}
                                />
                                {errors[d.name] && <p className="text-danger">{errors[d.name]}</p>}
                            </div>
                        ))}

                        {!conditionRender.showOTPSection && (
                            <div className='mt-4'>
                                <button className='btn btn-primary' type='submit' disabled={isOTPRequested && timer > 0}>
                                    Request OTP
                                </button>
                            </div>
                        )}
                    </form>

                    {conditionRender.showOTPSection && (
                        <form className="row mt-2" onSubmit={validateOTPHandler}>
                            {OTPFormInput.map((d) => (
                                <div key={`form_input__${d.name}`} className="col-12 mt-3">
                                    <InputWithLabel
                                        feild={d}
                                        state={userDetailState}
                                        onChangeHandler={userDetailChangeHandler}
                                        className={["form-control"]}
                                    />
                                </div>
                            ))}

                            <div className="col-12 mt-3">
                                <p className='info'>
                                    By clicking Submit, you agree to the <a href="https://shubham.co/terms-and-conditions.php" target="_blank">Terms and Conditions</a> &amp; <a href="https://shubham.co/privacy-policy.php" target="_blank">Privacy Policy</a> of Shubham Housing Development Finance Company Ltd.
                                </p>
                            </div>

                            <div className='mt-2'>
                                <button className='btn btn-primary' type="submit">Submit</button>
                                <button className='btn btn-secondary gapinbutton' type='button' onClick={handleRequestOTP} disabled={timer > 0}>
                                    Resend OTP
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default ClientAuthPage;
