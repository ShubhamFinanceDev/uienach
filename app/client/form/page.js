"use client"

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const UAT_URL = 'https://emandateut.hdfcbank.com/Emandate.aspx'
const Production_URL = 'https://emandate.hdfcbank.com/Emandate.aspx'

const Form = () => {
    const formDataFromRedux = useSelector(state => state.enachSlice);

    const [data, setData] = useState(formDataFromRedux);

    useEffect(() => {
        const form = document.getElementById("PostForm");
        form.action = UAT_URL;
        form.method = "POST";
        form.submit();
    }, []);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div>
            <form id="PostForm" name="PostForm">
                <fieldset>
                    {Object.entries(data).map(([key, val]) => (
                        <div key={key}>
                            <input
                                type="hidden"
                                id={key}
                                name={key}
                                value={val}
                                onChange={changeHandler}
                            />
                        </div>
                    ))}
                </fieldset>
            </form>
        </div>
    );
};

export default Form;