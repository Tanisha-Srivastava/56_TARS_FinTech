# 56_TARS_FinTech

Problem Statement-
Traditional risk assessment models in insurance often fail to meet the dynamic needs of peer-to-peer (P2P) platforms.These models are static, unable to integrate real-time data, community insights, or behavioral patterns, leading to inefficiencies in pricing and coverage allocation. This lack of flexibility also restricts accessibility for underrepresented groups who don't fit traditional risk profiles. Additionally, such systems struggle with scalability, which hinders their ability to support a growing user base in decentralized models. The inability to adjust risk assessments in real time can result in unfair pricing, inaccurate risk profiles, and poor fund management, reducing trust and overall system effectiveness.


cleaned_dataset_with_diseases - csv file of our dataset with all relevant columns
normalised_data - dataset with entries after normalisation
rfhack.py - model that uses Random Forest Regression to train data

hack - includes Random Forest Regression model and a HTML form to input (normalised) data. You could cross-verify our predicted risk score with any entry in the normalised dataset.

project - includes interactive website that demonstrates creating of profile, entering data, creating community, joining community, claim amount - and also displays the active claims and approval rate (currently static)


please visit: https://celebrated-monstera-babc3f.netlify.app/
