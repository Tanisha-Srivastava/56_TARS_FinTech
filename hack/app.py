from flask import Flask, request, render_template
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Load the dataset and train the model
data = pd.read_csv("C:\\Users\\surya\\Downloads\\normalised_data.csv")

input_columns = [
    "Age", "Occupation", "Pre_existing_Conditions", "Smoking_Status",
    "BMI", "effective_fam_history", "Claim_History", "Income_LPA"
]
output_column = "risk_score"

X = data[input_columns]
y = data[output_column]

# Split and train the model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Flask app setup
app = Flask(__name__)

# Route to render the HTML form
@app.route("/")
def home():
    return render_template("form.html")

# Route to handle form submission and make predictions
@app.route("/predict", methods=["POST"])
def predict():
    # Retrieve form data
    user_input = {
        "Age": float(request.form["Age"]),
        "Occupation": int(request.form["Occupation"]),
        "Pre_existing_Conditions": int(request.form["Pre_existing_Conditions"]),
        "Smoking_Status": int(request.form["Smoking_Status"]),
        "BMI": float(request.form["BMI"]),
        "effective_fam_history": int(request.form["effective_fam_history"]),
        "Claim_History": int(request.form["Claim_History"]),
        "Income_LPA": float(request.form["Income_LPA"]),
    }

    # Convert input data to DataFrame
    input_df = pd.DataFrame([user_input])

    # Predict using the model
    prediction = model.predict(input_df)

    # Return the result
    return f"<h2>Predicted Risk Score: {prediction[0]}</h2>"

if __name__ == "__main__":
    app.run(debug=True)
