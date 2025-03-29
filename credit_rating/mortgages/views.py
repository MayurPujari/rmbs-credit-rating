from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Mortgage
from .serializers import MortgageSerializer
from .credit_rating import calculate_risk_score, get_credit_rating

class MortgageListCreate(APIView):
    def get(self, request):
        mortgages = Mortgage.objects.all()
        serializer = MortgageSerializer(mortgages, many=True)
        return Response(serializer.data)

    def post(self, request):
        is_many = isinstance(request.data, list)
        serializer = MortgageSerializer(data=request.data, many=is_many)

        if serializer.is_valid():
            validated_data = serializer.validated_data if is_many else [serializer.validated_data]
            avg_credit_score = sum(m['credit_score'] for m in validated_data) / len(validated_data)
            total_risk_score = sum(calculate_risk_score(m, avg_credit_score) for m in validated_data)
            rating = get_credit_rating(total_risk_score)
            serializer.save()
            return Response({'rating': rating}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
