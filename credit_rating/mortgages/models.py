from django.db import models

class Mortgage(models.Model):
    LOAN_TYPE_CHOICES = [
        ('fixed', 'Fixed'),
        ('adjustable', 'Adjustable')
    ]
    PROPERTY_TYPE_CHOICES = [
        ('single_family', 'Single Family'),
        ('condo', 'Condo')
    ]

    credit_score = models.IntegerField(null=False)
    loan_amount = models.FloatField(null=False)
    property_value = models.FloatField(null=False)
    annual_income = models.FloatField(null=False)
    debt_amount = models.FloatField(null=False)
    loan_type = models.CharField(max_length=10, choices=LOAN_TYPE_CHOICES, null=False)
    property_type = models.CharField(max_length=15, choices=PROPERTY_TYPE_CHOICES, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mortgage #{self.id} - Score {self.credit_score}"
