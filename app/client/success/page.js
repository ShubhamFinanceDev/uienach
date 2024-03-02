
"use client"

import React, { useState } from "react";
import { useSelector } from "react-redux";

const Success = () => {
    const formDataFromRedux = useSelector(state => state.enachSlice);

    const [data, setData] = useState(formDataFromRedux);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById("PostForm");
        form.action = "https://emandateut.hdfcbank.com/Emandate.aspx";
        form.method = "POST";
        form.submit();
    };

    return (
        <div>
            <form id="PostForm" name="PostForm">
                <fieldset>
                    {Object.entries(data).map(([key, val]) => (
                        <div key={key}>
                            <label htmlFor={key}>{key}:    </label>
                            <input
                                type="text"
                                id={key}
                                name={key}
                                value={val}
                                onChange={changeHandler}
                            />
                        </div>
                    ))}
                </fieldset>
            </form>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Success;