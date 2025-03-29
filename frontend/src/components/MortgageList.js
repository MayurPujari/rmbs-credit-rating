import React, { useEffect, useState } from 'react';
import API from '../services/api';

const MortgageList = () => {
  const [mortgages, setMortgages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/api/mortgages/')
      .then((res) => {
        setMortgages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading mortgages...</p>;

  return (
    <div>
      <h2>Mortgage Records</h2>
      {mortgages.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Credit Score</th>
              <th>Loan Amount</th>
              <th>Property Value</th>
              <th>Loan Type</th>
              <th>Property Type</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {mortgages.map((mortgage) => (
              <tr key={mortgage.id}>
                <td>{mortgage.id}</td>
                <td>{mortgage.credit_score}</td>
                <td>{mortgage.loan_amount}</td>
                <td>{mortgage.property_value}</td>
                <td>{mortgage.loan_type}</td>
                <td>{mortgage.property_type}</td>
                <td>{new Date(mortgage.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MortgageList;
