import React, { useState } from "react";
import api from "./api";
// import axios from "axios";

const MortgageForm = () => {
  const [formData, setFormData] = useState({
    credit_score: "",
    loan_amount: "",
    property_value: "",
    annual_income: "",
    debt_amount: "",
    loan_type: "fixed",
    property_type: "single_family",
  });

  const [rating, setRating] = useState(""); // Store the rating result
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRating("");
    setError("");

    // try {
    //   const response = await axios.post("http://127.0.0.1:8000/mortgages/", [formData]); // notice the array around formData
    //   setRating(response.data.rating); //  Save rating to state
    // } catch (err) {
    //   setError("Something went wrong while submitting the form.");
    //   console.error("Error submitting form:", err);
    // }

    try {
      const response = await api.post("/mortgages/", [formData]);
      setRating(response.data.rating);
    } catch (err) {
      setError("Something went wrong while submitting the form.");
      console.error("Error submitting form:", err);
    }
  };

  const getBadgeColor = (rating) => {
    switch (rating) {
      case "AAA":
        return "bg-success";
      case "BBB":
        return "bg-warning text-dark";
      case "C":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">RMBS Credit Rating Form</h2>

      <form onSubmit={handleSubmit} className="border p-4 shadow rounded bg-light">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Credit Score</label>
            <input
              type="number"
              className="form-control"
              name="credit_score"
              placeholder="Enter credit score"
              value={formData.credit_score}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Loan Amount</label>
            <input
              type="number"
              className="form-control"
              name="loan_amount"
              placeholder="Enter loan amount"
              value={formData.loan_amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Property Value</label>
            <input
              type="number"
              className="form-control"
              name="property_value"
              placeholder="Enter property value"
              value={formData.property_value}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Annual Income</label>
            <input
              type="number"
              className="form-control"
              name="annual_income"
              placeholder="Enter annual income"
              value={formData.annual_income}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Debt Amount</label>
            <input
              type="number"
              className="form-control"
              name="debt_amount"
              placeholder="Enter debt amount"
              value={formData.debt_amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Loan Type</label>
            <select
              className="form-select"
              name="loan_type"
              value={formData.loan_type}
              onChange={handleChange}
            >
              <option value="fixed">Fixed</option>
              <option value="adjustable">Adjustable</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Property Type</label>
            <select
              className="form-select"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
            >
              <option value="single_family">Single Family</option>
              <option value="condo">Condo</option>
            </select>
          </div>
        </div>

        <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary">
            Submit for Rating
          </button>
        </div>
      </form>

      {rating && (
            <div className="mt-4 rating-box fade-in">
                <h4>
                Credit Rating:{" "}
                <span className={`badge ${getBadgeColor(rating)} fs-5`}>{rating}</span>
                </h4>
                <div className="mt-3">
                <h5>Rating Criteria:</h5>
                <ul>
                    <li><strong>AAA</strong> (Highly secure) → Total Score ≤ <strong>2</strong></li>
                    <li><strong>BBB</strong> (Medium risk) → Total Score between <strong>3</strong> and <strong>5</strong></li>
                    <li><strong>C</strong> (High risk) → Total Score > <strong>5</strong></li>
                </ul>
                </div>
            </div>
        )}

      {error && (
        <div className="alert alert-danger text-center mt-4">
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
};

export default MortgageForm;
