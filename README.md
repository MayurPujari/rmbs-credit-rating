# rmbs-credit-rating
Calculate the credit rating of a Residential Mortgage-Backed Security.



# RMBS Credit Rating System

This web application designed to calculate the credit rating of a Residential Mortgage-Backed Security(RMBS). It evaluates mortgage data and generates a credit rating based on the calculated risk.

---

# Tech Stack

- Frontend: ReactJS (Bootstrap & basic CSS)
- Backend: Django REST Framework
- Database: MySQL

---

# Features

- Submit individual mortgage data
- Calculates a risk score for each mortgage
- Aggregates scores and returns RMBS credit rating:
  - 'AAA': Highly secure (score ≤ 2)
  - 'BBB': Medium risk (score 3-5)
  - 'C': Highly speculative or distressed (score > 5)

---

# Setup Instructions

# Backend (Django)


# Create and activate virtual environment
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Navigate to credit_rating directory
cd credit_rating

# Migrate and run server
python manage.py migrate
python manage.py runserver

### Frontend (React)


# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start

---

# Key Technical Decisions

- Django REST Framework was chosen for its robust and modular structure.
- React provides a responsive and fast user experience.
- CORS configured to allow smooth interaction between frontend and backend.

---

# Notes

- The form is designed to accept and process multiple mortgage records.
- Uses Bootstrap for styling and responsiveness.

# Sample Test Data

You can use the following test data to evaluate the mortgage rating system.

# Single Mortgage Entry

json
{
  "credit_score": 750,
  "loan_amount": 300000,
  "property_value": 350000,
  "annual_income": 90000,
  "debt_amount": 15000,
  "loan_type": "fixed",
  "property_type": "single_family"
}


# Multiple Mortgage Entries
json
[
  {
    "credit_score": 720,
    "loan_amount": 250000,
    "property_value": 300000,
    "annual_income": 80000,
    "debt_amount": 10000,
    "loan_type": "fixed",
    "property_type": "single_family"
  },
  {
    "credit_score": 580,
    "loan_amount": 500000,
    "property_value": 600000,
    "annual_income": 95000,
    "debt_amount": 20000,
    "loan_type": "adjustable",
    "property_type": "condo"
  }
]
