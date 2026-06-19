from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

app = FastAPI(title="Fineiro - Prediction Service")

class ExpenseItem(BaseModel):
    amount: float
    category: str = "Other"
    date: str

class PredictionRequest(BaseModel):
    expenses: List[ExpenseItem]

@app.post("/predict")
async def predict_next_month(request: PredictionRequest):
    data = request.expenses
    if not data or len(data) == 0:
        return {"prediction_total": 0, "breakdown": [], "message": "No expense data available for prediction."}

    # Convert to DataFrame
    df = pd.DataFrame([{"amount": d.amount, "category": getattr(d, 'category', 'Other'), "date": d.date} for d in data])
    df['date'] = pd.to_datetime(df['date'])
    
    # Extract year_month
    df['year_month'] = df['date'].dt.to_period('M')
    
    # We will predict per category
    categories = df['category'].unique()
    breakdown = []
    total_prediction = 0
    
    for cat in categories:
        cat_df = df[df['category'] == cat]
        monthly_totals = cat_df.groupby('year_month')['amount'].sum().reset_index()
        
        if len(monthly_totals) < 2:
            # Not enough data for regression trend, fallback to average
            pred_amount = float(monthly_totals['amount'].mean())
        else:
            # Linear Regression
            monthly_totals['time_index'] = np.arange(len(monthly_totals))
            X = monthly_totals[['time_index']].values
            y = monthly_totals['amount'].values
            
            model = LinearRegression()
            model.fit(X, y)
            
            next_index = [[len(monthly_totals)]]
            pred_amount = model.predict(next_index)[0]
        
        # Ensure prediction is non-negative
        pred_amount = max(0, float(pred_amount))
        total_prediction += pred_amount
        breakdown.append({
            "category": cat,
            "predicted_amount": pred_amount
        })

    return {
        "prediction_total": total_prediction,
        "breakdown": breakdown,
        "history_months_used": len(df['year_month'].unique()),
        "message": "Category-based prediction generated successfully."
    }

