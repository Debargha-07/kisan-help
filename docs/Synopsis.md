
# Project Synopsis: AgriForecast Platform

## Introduction
AgriForecast is a comprehensive web-based platform for predicting crop yield and providing agricultural intelligence using real-world APIs and credible datasets. It addresses the needs of Indian farmers and stakeholders by leveraging up-to-date weather, soil, crop, and market price data.

## Objectives
- Integrate reliable external APIs (OpenWeatherMap, SoilGrids, AGMARKNET).
- Use Supabase for seamless storage and retrieval of historical crop/soil/price datasets.
- Provide yield prediction, crop recommendations, and decision-support tools with accuracy >85%.

## Data Collection
- **Weather:** Real-time from OpenWeatherMap API.
- **Soil:** SoilGrids API or alternatively government open soil datasets.
- **Crop:** Sourced from Indian Council of Agricultural Research and stored in Supabase.
- **Market Prices:** Collected from AGMARKNET and maintained in Supabase (scraped and synced).

**All training data references:**  
- [OpenWeatherMap](https://openweathermap.org/)
- [SoilGrids](https://soilgrids.org/)
- [AGMARKNET](https://agmarknet.gov.in/)
- [ICAR - Crop Data](https://icar.org.in/)
- [Kaggle Datasets](https://kaggle.com/)

## Model & Methodology
- **Yield Prediction Model:** Multiple regression based; equation:  
  `Yield = BaseCropYield × SoilImpact × Area × SeasonalFactor`
  - *SoilImpact* computed from parameters (type, pH, N, P, K)
  - *Area* from user input
  - *SeasonalFactor* from region/timeline

- **Workflow:**  
  User provides region, crop, soil, area ⇒ APIs are queried & data aggregated ⇒ Model predicts yield and confidence.

## Error Handling & Security
- All API errors are handled with user-friendly fallbacks.
- Sensitive API calls routed through backend (Supabase Edge Functions if required).
- Data integrity via up-to-date datasets, periodic syncs, and backend jobs.

## Achievements
- Full stack migration to JavaScript (removal of TypeScript for ease of maintenance).
- No mock or demo data; uses real, up-to-date, and referenced sources.
- Documentation, clean code, and workflow visualization included.
