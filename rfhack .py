# Import necessary libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Load the dataset from a CSV file
# Replace 'C:\\Users\\surya\\Downloads\\normalised_data.csv' with the actual path to your dataset
data = pd.read_csv("normalised_data.csv")

# Display the first few rows of the dataset to confirm structure
print("Dataset preview:")
print(data.head())

# Features (X) and Target (y)
input_columns = [
    "Age", "Occupation", "Pre_existing_Conditions", "Smoking_Status", 
    "BMI", "effective_fam_history", "Claim_History", "Income_LPA"
]
output_column = "risk_score"

# Extract input features and target variable
X = data[input_columns]
y = data[output_column]

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the Random Forest Regressor
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Print evaluation metrics
print("\nModel Performance:")
print("Mean Squared Error (MSE):", mse)
print("R-squared (R2):", r2)

# Function to take inputs and make predictions
def predict_risk_score():
    # Prompt the user for inputs
    print("\nEnter the following details to predict the risk score:")
    Age = float(input("Age: "))
    Occupation = int(input("Occupation (numeric value): "))
    Pre_existing_Conditions = int(input("Pre-existing Conditions (0 = No, 1 = Yes): "))
    Smoking_Status = int(input("Smoking Status (0 = Non-smoker, 1 = Smoker): "))
    BMI = float(input("BMI: "))
    effective_fam_history = int(input("Effective Family History (0 = No, 1 = Yes): "))
    Claim_History = int(input("Claim History (numeric value): "))
    Income_LPA = float(input("Income in LPA (numeric value): "))
    
    # Create an input array for the model
    input_data = pd.DataFrame([{
        "Age": Age,
        "Occupation": Occupation,
        "Pre_existing_Conditions": Pre_existing_Conditions,
        "Smoking_Status": Smoking_Status,
        "BMI": BMI,
        "effective_fam_history": effective_fam_history,
        "Claim_History": Claim_History,
        "Income_LPA": Income_LPA
    }])
    
    # Make a prediction
    risk_score_prediction = model.predict(input_data)
    
    # Output the prediction
    print("\nPredicted Risk Score:", risk_score_prediction[0])

# Call the function to test
predict_risk_score()
