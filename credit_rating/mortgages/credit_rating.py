def calculate_risk_score(mortgage, avg_credit_score):
    risk = 0

    # Loan-to-Value (LTV)
    ltv = mortgage['loan_amount'] / mortgage['property_value']
    if ltv > 0.9:
        risk += 2
    elif ltv > 0.8:
        risk += 1

    # Debt-to-Income (DTI)
    dti = mortgage['debt_amount'] / mortgage['annual_income']
    if dti > 0.5:
        risk += 2
    elif dti > 0.4:
        risk += 1

    # Credit Score
    cs = mortgage['credit_score']
    if cs >= 700:
        risk -= 1
    elif cs < 650:
        risk += 1

    # Loan Type
    if mortgage['loan_type'] == 'fixed':
        risk -= 1
    else:
        risk += 1

    # Property Type
    if mortgage['property_type'] == 'condo':
        risk += 1

    # Adjust based on average credit score
    if avg_credit_score >= 700:
        risk -= 1
    elif avg_credit_score < 650:
        risk += 1

    return max(risk, 0)


def get_credit_rating(total_score):
    if total_score <= 2:
        return 'AAA'
    elif total_score <= 5:
        return 'BBB'
    return 'C'
