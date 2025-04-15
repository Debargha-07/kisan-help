
import { 
  BadgeDollarSign, 
  Warehouse, 
  BarChart3, 
  Map, 
  Leaf, 
  Factory
} from "lucide-react";

const features = [
  {
    title: "Direct Marketplace",
    description: "Connect directly with processors to sell your produce at better prices without middlemen.",
    icon: BadgeDollarSign,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Harvest Forecasting",
    description: "AI-powered predictions help you plan your harvest and find the best time to sell.",
    icon: BarChart3,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Processing Facility Locator",
    description: "Find the nearest processing facilities with real-time capacity information.",
    icon: Factory,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Quality Assessment",
    description: "Get standardized quality grading through simple photo uploads and AI analysis.",
    icon: Leaf,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Storage Solutions",
    description: "Discover available storage facilities to preserve your harvest quality.",
    icon: Warehouse,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Regional Price Trends",
    description: "Access historical and predicted market prices to make informed decisions.",
    icon: Map,
    color: "bg-indigo-100 text-indigo-600",
  },
];

const FeatureSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-agri-dark mb-4">
            Comprehensive Solutions for Post-Harvest Management
          </h2>
          <p className="text-gray-600">
            Our platform addresses the critical challenges faced by farmers in managing and 
            processing their agricultural produce, providing integrated tools to maximize value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
