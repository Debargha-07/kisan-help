
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Tractor, Leaf, CoinsIcon } from "lucide-react";

const schemes = [
  {
    title: "পিএম-কিসান",
    description: "যোগ্য কৃষক পরিবারকে তিনটি কিস্তিতে বছরে ৬,০০০ টাকা সরাসরি আয় সহায়তা।",
    benefits: "কৃষি চাহিদার জন্য আর্থিক সহায়তা",
    eligibility: "২ হেক্টরের কম জমি সহ ছোট ও প্রান্তিক কৃষক",
    link: "https://pmkisan.gov.in/",
    image: "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg",
    icon: Tractor
  },
  {
    title: "প্রধানমন্ত্রী ফসল বীমা যোজনা (পিএমএফবিওয়াই)",
    description: "প্রি-সোয়িং থেকে পোস্ট-হারভেস্ট ক্ষতি পর্যন্ত ব্যাপক ফসল বীমা কভারেজ।",
    benefits: "প্রাকৃতিক দুর্যোগের কারণে ফসল ক্ষতির বিরুদ্ধে সুরক্ষা",
    eligibility: "বিজ্ঞপ্তিযুক্ত ফসল উৎপাদনকারী সমস্ত কৃষক",
    link: "https://pmfby.gov.in/",
    image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg",
    icon: Leaf
  },
  {
    title: "কিসান ক্রেডিট কার্ড (কেসিসি)",
    description: "নমনীয় পরিশোধের বিকল্প সহ কৃষি চাহিদার জন্য সহজ ঋণ প্রাপ্তি।",
    benefits: "কৃষি খরচের জন্য কম সুদের ঋণ",
    eligibility: "ছোট কৃষক এবং ভাগচাষী সহ সমস্ত কৃষক",
    link: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc",
    image: "https://images.pexels.com/photos/753267/pexels-photo-753267.jpeg",
    icon: CoinsIcon
  }
];

const Schemes = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-agri-primary mb-6">সরকারি কৃষক প্রকল্প</h1>
        <p className="text-gray-600 mb-8 text-lg">
          আপনার জন্য উপলব্ধ গুরুত্বপূর্ণ সরকারি প্রকল্প। নীচের তথ্য পড়ুন এবং উপকৃত হোন।
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
                    <h4 className="font-semibold text-agri-primary mb-1">সুবিধা:</h4>
                    <p className="text-gray-600">{scheme.benefits}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-agri-primary mb-1">যোগ্যতা:</h4>
                    <p className="text-gray-600">{scheme.eligibility}</p>
                  </div>

                  <Button 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => window.open(scheme.link, '_blank')}
                  >
                    আরও তথ্য
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
