import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Tractor, Leaf, CoinsIcon } from "lucide-react";

const schemes = [
  {
    title: "PM-KISAN",
    description: "Direct income support of ₹6,000 per year to eligible farmer families in three installments.",
    benefits: "Financial assistance for farming needs",
    eligibility: "Small and marginal farmers with less than 2 hectares of land",
    link: "https://pmkisan.gov.in/",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80",
    icon: Tractor
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Comprehensive crop insurance coverage from pre-sowing to post-harvest losses.",
    benefits: "Protection against crop loss due to natural calamities",
    eligibility: "All farmers growing notified crops",
    link: "https://pmfby.gov.in/",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    icon: Leaf
  },
  {
    title: "Kisan Credit Card (KCC)",
    description: "Easy access to credit for farming needs with flexible repayment options.",
    benefits: "Low-interest loans for agriculture expenses",
    eligibility: "All farmers, including small farmers and sharecroppers",
    link: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=800&q=80",
    icon: CoinsIcon
  }
];

const Schemes = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-agri-primary mb-6">सरकारी किसान योजनाएँ (Government Farmer Schemes)</h1>
        <p className="text-gray-600 mb-8 text-lg">
          आपके लिए उपलब्ध महत्वपूर्ण सरकारी योजनाएँ। नीचे दी गई जानकारी पढ़ें और लाभ उठाएँ।
          <br />
          (Important government schemes available for you. Read the information below and benefit.)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={scheme.image} 
                  alt={scheme.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <scheme.icon className="h-5 w-5 text-agri-primary" />
                  {scheme.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{scheme.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-agri-primary mb-1">लाभ (Benefits):</h4>
                    <p className="text-gray-600">{scheme.benefits}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-agri-primary mb-1">पात्रता (Eligibility):</h4>
                    <p className="text-gray-600">{scheme.eligibility}</p>
                  </div>

                  <Button 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => window.open(scheme.link, '_blank')}
                  >
                    अधिक जानकारी (More Information)
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Schemes;
