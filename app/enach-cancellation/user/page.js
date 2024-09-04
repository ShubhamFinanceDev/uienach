"use client"

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InputWithLabel from "@/components/input/InputWithLabel";
import UseLogicHooks from "@/hooks/useLogicHooks";

const UserDetailsPage = () => {
  const { applicationDetails = {}, loansDetails = [] } = useSelector((state) => state.enacCancelationSlice);
  const filteredLoans = loansDetails.filter((d) => d.status === "X" || d.status === "C" || d.status === "A");
  const { selectedLoan,handleRadioChange, loanStatusSubmitHandler} =  UseLogicHooks()
  const { retrieveData } = UseLogicHooks()

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="container">
      <div className="heading mt-5">
        <h2 className="mb-1">E-Nach Cancelation</h2>
        <p className="mb-3">Create or modify mandate for future payment.</p>
      </div>
      <InputWithLabel
        feild={{
          name: "customerName",
          label: "Customer Name",
        }}
        state={applicationDetails}
        isDisabled
      />

      <InputWithLabel
        feild={{
          name: "applicationNo",
          label: "Application No",
        }}
        state={applicationDetails}
        isDisabled
      />

      <InputWithLabel
        feild={{
          name: "mobileNo",
          label: "Mobile No",
        }}
        state={applicationDetails}
        isDisabled
      />

      <div className="mt-4"></div>
      <form onSubmit={loanStatusSubmitHandler}>
          <table className="table">
            <thead>
              <tr>
                <th>Loan No</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((d, idx) => (
                <tr key={`loan_detail_${idx}`}>
                  <td>{d.loanNo}</td>
                  <td>{d.status_text}</td>
                  <td>
                    <input
                      type="radio"
                      name="loanSelection"
                      value={d.loanNo}
                      disabled={d.status === "A"|| d.currentStatus === true}
                      onChange={() => handleRadioChange(d)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedLoan && (
            <div className="mt-2 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          )}
        </form>
    </div>
  );
};

export default (UserDetailsPage)
