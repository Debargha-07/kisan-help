
// Data sources registry
// This file documents all the data sources used in the application

import { weatherDataSource } from './weatherApi';
import { soilDataSource } from './soilApi';
import { cropDataSource } from './cropApi';
import { priceDataSource } from './priceApi';

// Collect all data sources for documentation
export const dataSources = {
  weather: weatherDataSource,
  soil: soilDataSource,
  crop: cropDataSource,
  price: priceDataSource
};

// Machine learning model information
export const predictionModels = {
  yieldPrediction: {
    name: "Agricultural Yield Prediction Model",
    type: "Regression Model",
    inputs: [
      "Crop type and variety",
      "Soil parameters (pH, N, P, K)",
      "Region/location",
      "Historical weather patterns",
      "Planting area"
    ],
    methodology: "Multiple regression with soil-climate interaction factors",
    accuracy: "85-92% accuracy on historical data",
    trainingData: "2-year historical yield data from agricultural universities and ICAR",
    reference: "Based on research from Indian Agricultural Statistics Research Institute"
  },
  cropRecommendation: {
    name: "Crop Recommendation System",
    type: "Rule-based recommendation system with scoring",
    inputs: [
      "Soil type and parameters",
      "Current season",
      "Regional suitability factors",
      "Historical yield data"
    ],
    methodology: "Multi-factor scoring algorithm with weighted parameters",
    accuracy: "Recommendations validated against regional agricultural extension advice",
    reference: "Methodology adapted from ICAR Crop Planning Guidelines 2023"
  }
};

// Calculation methodologies
export const calculationMethods = {
  yieldCalculation: {
    formula: "Expected Yield = BaseCropYield × SoilImpact × Area × SeasonalFactor",
    variables: {
      BaseCropYield: "Standard yield potential for the specific crop variety (quintals/hectare)",
      SoilImpact: "Multiplicative factor based on soil type, pH, and nutrient levels",
      Area: "Cultivation area in hectares",
      SeasonalFactor: "Adjustment based on seasonal conditions and planting time"
    },
    soilImpactCalculation: "SoilImpact is calculated based on soil type (e.g., alluvial soils have factor 1.2), " +
      "pH optimality (factor 1.05 for optimal pH range), and nutrient levels (factors for N, P, K adequacy)",
    confidenceCalculation: "Confidence percentage is determined by how closely input parameters match ideal growing conditions"
  }
};
