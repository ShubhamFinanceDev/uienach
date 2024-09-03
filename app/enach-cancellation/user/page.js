"use client"

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InputWithLabel from "@/components/input/InputWithLabel";
import ModelHOC from "@/hooks/modelHoc";
import UseLogicHooks from "@/hooks/useLogicHooks";

const UserDetailsPage = (props) => {
  const { applicationDetails = {}, loansDetails = [] } = useSelector((state) => state.enacCancelationSlice);
  const filteredLoans = loansDetails.filter((d) => d.status === "X" || d.status === "C" || d.status === "A");
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
          label: "customerName",
        }}
        state={applicationDetails}
        isDisabled
      />

      <InputWithLabel
        feild={{
          name: "applicationNo",
          label: "applicationNo",
        }}
        state={applicationDetails}
        isDisabled
      />

      <InputWithLabel
        feild={{
          name: "mobileNo",
          label: "mobileNo",
        }}
        state={applicationDetails}
        isDisabled
      />

      <div className="mt-4"></div>
      {filteredLoans.length > 0 && (
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
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={d.status === "A"}
                    onClick={() => props.openModel({
                      key: "STATUS_MODEL",
                      size: "xl",
                      applicationNo: applicationDetails.applicationNo,
                      loanNo: d.loanNo,
                    })}
                  >
                    Mandate Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ModelHOC(UserDetailsPage)
