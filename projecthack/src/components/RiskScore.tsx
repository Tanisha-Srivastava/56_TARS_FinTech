import React from 'react';
import { UserProfile } from '../types';
import { AlertTriangle, TrendingUp, Activity, Heart } from 'lucide-react';

interface Props {
  profile: UserProfile;
}

export const RiskScore: React.FC<Props> = ({ profile }) => {
  const calculateRiskScore = (profile: UserProfile): number => {
    let score = 50; // Base score

    // Age factor (higher risk for older age)
    if (profile.age > 60) score += 15;
    else if (profile.age > 50) score += 10;
    else if (profile.age > 40) score += 5;
    
    // Smoking factor
    if (profile.smoking === 'regular_smoker') score += 15;
    else if (profile.smoking === 'moderate_smoker') score += 8;
    
    // BMI factor (risks for both under and overweight)
    if (profile.bmi < 18.5 || profile.bmi > 30) score += 10;
    else if (profile.bmi < 20 || profile.bmi > 25) score += 5;
    
    // Family history factor
    score += profile.familyHistory.length * 5;
    
    // Pre-existing disease
    if (profile.disease) score += 10;
    
    // Claims history
    score += profile.claims * 10;
    
    // Income factor (higher income reduces risk)
    score -= Math.min(20, Math.floor(profile.income / 10));

    // Policy type factor
    if (profile.policyType === 'family') score -= 5;
    else if (profile.policyType === 'corporate') score -= 10;

    return Math.min(100, Math.max(0, score));
  };

  const score = calculateRiskScore(profile);
  
  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-600' };
    if (score < 60) return { level: 'Moderate Risk', color: 'text-yellow-600', bgColor: 'bg-yellow-600' };
    return { level: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-600' };
  };

  const { level, color, bgColor } = getRiskLevel(score);

  const getRecommendations = (score: number) => {
    const recommendations = [];
    if (profile.smoking !== 'non_smoker') {
      recommendations.push('Consider reducing or quitting smoking');
    }
    if (profile.bmi > 25 || profile.bmi < 18.5) {
      recommendations.push('Work on maintaining a healthy BMI');
    }
    if (profile.familyHistory.length > 0) {
      recommendations.push('Regular health check-ups recommended');
    }
    if (score > 60) {
      recommendations.push('Consider additional coverage options');
    }
    return recommendations;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Risk Assessment</h2>
          <AlertTriangle className={color} size={24} />
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Risk Score:</span>
            <span className={`text-3xl font-bold ${color}`}>{score}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${bgColor}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Risk Level:</span>
            <span className={`font-semibold ${color}`}>{level}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Risk Factors Analysis</h2>
          <Activity className="text-blue-600" size={24} />
        </div>
        
        <div className="space-y-4">
          {getRecommendations(score).map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Heart className="text-red-500 flex-shrink-0 mt-1" size={16} />
              <p className="text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Premium Impact</h3>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-sm text-gray-600">
            Your risk score may affect your premium by approximately{' '}
            <span className="font-semibold">{Math.round(score / 2)}%</span> compared to the base rate.
          </p>
        </div>
      </div>
    </div>
  );
};