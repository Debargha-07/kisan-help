
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Upload, Smartphone, Leaf, BarChart3, Award, Check, Info, AlertTriangle, HelpCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample quality assessment data
const qualityData = {
  wheat: {
    image: "https://source.unsplash.com/random/800x600/?wheat",
    grade: "A",
    score: 87,
    parameters: [
      { name: "Moisture Content", value: "12.5%", status: "optimal", range: "11-14%" },
      { name: "Protein Content", value: "13.2%", status: "optimal", range: "12-14%" },
      { name: "Foreign Material", value: "1.2%", status: "acceptable", range: "<2%" },
      { name: "Damaged Kernels", value: "0.8%", status: "optimal", range: "<1%" },
      { name: "Test Weight", value: "78 kg/hl", status: "optimal", range: "76-80 kg/hl" },
    ],
    market_value: "₹2,250 - ₹2,300 per quintal",
    recommendations: [
      "Store in a cool, dry place with humidity below 60%",
      "Ideal for flour processing and premium bread making",
      "Consider direct selling to flour mills for best prices"
    ]
  }
};

const Quality = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-agri-dark mb-2">Quality Assessment</h1>
            <p className="text-gray-600">
              Get standardized grading for your produce to fetch better prices in the market
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-agri-primary hover:bg-agri-dark">
              <Camera className="mr-2 h-4 w-4" /> Scan New Produce
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Submit Sample</CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="space-y-6">
                  <div className="bg-agri-light rounded-lg p-6 flex flex-col items-center justify-center border-2 border-dashed border-agri-primary/30">
                    <Upload className="h-12 w-12 text-agri-primary mb-4" />
                    <h3 className="font-medium text-lg mb-2">Upload Image</h3>
                    <p className="text-sm text-gray-600 text-center mb-4">
                      Take a clear, well-lit photo of your crop sample or upload existing images
                    </p>
                    <div className="flex gap-2">
                      <Button className="bg-agri-primary hover:bg-agri-dark">
                        Upload Photo
                      </Button>
                      <Button variant="outline" className="border-agri-primary text-agri-primary">
                        <Camera className="mr-2 h-4 w-4" /> Take Photo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Use Our Mobile App</h4>
                        <p className="text-sm text-gray-600">
                          For more accurate analysis, download our mobile app for real-time scanning
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Professional Assessment</h4>
                        <p className="text-sm text-gray-600">
                          For certification, visit one of our partnered quality assessment centers
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-agri-light rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-agri-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Historical Analysis</h4>
                        <p className="text-sm text-gray-600">
                          Track quality trends over time to improve your farming practices
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Quality Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <Tabs defaultValue="current">
                  <TabsList className="bg-agri-light">
                    <TabsTrigger value="current" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      Current Sample
                    </TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      Previous Samples
                    </TabsTrigger>
                    <TabsTrigger value="standards" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      Quality Standards
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="current" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="bg-white rounded-lg border overflow-hidden mb-4">
                          <img 
                            src={qualityData.wheat.image}
                            alt="Wheat Sample"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        
                        <div className="bg-agri-light rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">Sample Details</h3>
                            <Badge className="bg-agri-primary">Wheat</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Variety:</span>
                              <span className="font-medium">HD 2967</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sample Date:</span>
                              <span className="font-medium">April 12, 2024</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Location:</span>
                              <span className="font-medium">Ludhiana, Punjab</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Assessment Method:</span>
                              <span className="font-medium">AI Image Analysis</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold mb-3">Market Value Estimate</h3>
                          <div className="text-2xl font-bold text-agri-primary mb-2">
                            {qualityData.wheat.market_value}
                          </div>
                          <p className="text-xs text-gray-600 mb-3">
                            Based on current market rates for Grade {qualityData.wheat.grade} wheat in your region
                          </p>
                          <Button className="w-full bg-agri-primary hover:bg-agri-dark">
                            Find Buyers for this Quality
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">Overall Quality</h3>
                            <p className="text-sm text-gray-600">Based on standard grading parameters</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-5xl font-bold text-agri-primary">{qualityData.wheat.grade}</div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">Grade</span>
                              <div className="flex gap-0.5">
                                {['A', 'B', 'C', 'D'].map((grade) => (
                                  <span 
                                    key={grade}
                                    className={`w-6 h-1 rounded-full ${grade === qualityData.wheat.grade ? 'bg-agri-primary' : 'bg-gray-200'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Quality Score</span>
                            <span className="font-bold">{qualityData.wheat.score}/100</span>
                          </div>
                          <Progress value={qualityData.wheat.score} className="h-2" />
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>Poor</span>
                            <span>Average</span>
                            <span>Excellent</span>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg border">
                          <div className="p-3 border-b bg-gray-50">
                            <h3 className="font-semibold">Quality Parameters</h3>
                          </div>
                          <div className="divide-y">
                            {qualityData.wheat.parameters.map((param, index) => (
                              <div key={index} className="p-3 flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{param.name}</div>
                                  <div className="text-sm text-gray-500">Acceptable Range: {param.range}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={
                                    param.status === "optimal" 
                                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                                      : param.status === "acceptable"
                                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                      : "bg-red-100 text-red-700 hover:bg-red-100"
                                  }>
                                    {param.value}
                                  </Badge>
                                  {param.status === "optimal" && (
                                    <Check className="h-5 w-5 text-green-500" />
                                  )}
                                  {param.status === "acceptable" && (
                                    <Info className="h-5 w-5 text-yellow-500" />
                                  )}
                                  {param.status === "poor" && (
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-agri-light rounded-lg p-4">
                          <h3 className="font-semibold mb-3 flex items-center">
                            <Award className="h-5 w-5 mr-2 text-agri-primary" />
                            Recommendations
                          </h3>
                          <ul className="space-y-2">
                            {qualityData.wheat.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-agri-primary flex-shrink-0 mt-0.5" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Want to improve your crop quality?</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Our agricultural experts can provide personalized advice based on your quality assessment results.
                        </p>
                        <Button variant="link" className="text-blue-600 px-0 h-auto mt-1">
                          Request Expert Guidance
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                      <BarChart3 className="h-16 w-16 text-agri-primary mb-4" />
                      <h3 className="text-xl font-bold mb-2">No Historical Data Yet</h3>
                      <p className="text-gray-600 max-w-md mb-6">
                        Start submitting samples regularly to build your quality history 
                        and track improvements over time.
                      </p>
                      <Button className="bg-agri-primary hover:bg-agri-dark">
                        Submit First Sample
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="standards">
                    <div className="space-y-6 py-4">
                      <div className="bg-white rounded-lg border overflow-hidden">
                        <div className="p-4 bg-agri-light">
                          <h3 className="font-semibold">Wheat Quality Standards</h3>
                        </div>
                        <div className="p-4">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 font-medium">Parameter</th>
                                <th className="text-center py-2 font-medium">Grade A</th>
                                <th className="text-center py-2 font-medium">Grade B</th>
                                <th className="text-center py-2 font-medium">Grade C</th>
                                <th className="text-center py-2 font-medium">Grade D</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              <tr>
                                <td className="py-2">Moisture Content</td>
                                <td className="text-center py-2">11-14%</td>
                                <td className="text-center py-2">14-16%</td>
                                <td className="text-center py-2">16-18%</td>
                                <td className="text-center py-2">{">18%"}</td>
                              </tr>
                              <tr>
                                <td className="py-2">Protein Content</td>
                                <td className="text-center py-2">12-14%</td>
                                <td className="text-center py-2">11-12%</td>
                                <td className="text-center py-2">10-11%</td>
                                <td className="text-center py-2">{"<10%"}</td>
                              </tr>
                              <tr>
                                <td className="py-2">Foreign Material</td>
                                <td className="text-center py-2">{"<1%"}</td>
                                <td className="text-center py-2">1-2%</td>
                                <td className="text-center py-2">2-4%</td>
                                <td className="text-center py-2">{">4%"}</td>
                              </tr>
                              <tr>
                                <td className="py-2">Damaged Kernels</td>
                                <td className="text-center py-2">{"<1%"}</td>
                                <td className="text-center py-2">1-2%</td>
                                <td className="text-center py-2">2-4%</td>
                                <td className="text-center py-2">{">4%"}</td>
                              </tr>
                              <tr>
                                <td className="py-2">Test Weight</td>
                                <td className="text-center py-2">76-80 kg/hl</td>
                                <td className="text-center py-2">74-76 kg/hl</td>
                                <td className="text-center py-2">72-74 kg/hl</td>
                                <td className="text-center py-2">{"<72 kg/hl"}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <Info className="h-5 w-5 mr-2 text-blue-500" />
                          Understanding Quality Standards
                        </h3>
                        <p className="text-sm text-gray-600">
                          Quality standards vary by crop type and sometimes by region or buyer requirements. 
                          The standards shown here are general guidelines based on common industry practices.
                          For official certification, visit a government-approved testing center or contact 
                          the Food Corporation of India (FCI).
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button className="bg-agri-primary hover:bg-agri-dark">
                          Download Standards PDF
                        </Button>
                        <Button variant="outline" className="border-agri-primary text-agri-primary">
                          Find Testing Centers
                        </Button>
                        <Button variant="outline" className="border-agri-primary text-agri-primary">
                          View All Crop Standards
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">Quality Training</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Learn how to improve the quality of your produce with our expert-led training modules.
                </p>
                <div className="space-y-2">
                  {[
                    "Post-Harvest Handling Techniques",
                    "Storage Best Practices",
                    "Understanding Crop Quality Parameters",
                    "Pest and Disease Management for Quality"
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between bg-agri-light p-3 rounded-lg">
                      <span className="font-medium">{topic}</span>
                      <ChevronRight className="h-4 w-4 text-agri-primary" />
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-agri-primary text-agri-primary">
                  View All Training Modules
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">Quality Certification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Get official quality certification for your produce to access premium markets and buyers.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Submit Sample</h4>
                      <p className="text-sm text-gray-500">Send physical samples to our certified labs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Lab Testing</h4>
                      <p className="text-sm text-gray-500">Comprehensive analysis of all parameters</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Receive Certificate</h4>
                      <p className="text-sm text-gray-500">Digital and physical certification documents</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-agri-primary hover:bg-agri-dark">
                  Apply for Certification
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">Quality Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Access guides, tools, and resources to help improve and maintain produce quality.
                </p>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium">Quality Assessment Guide</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Comprehensive guide on quality parameters for different crops
                    </p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">PDF Guide</Badge>
                  </div>
                  <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium">Storage Calculator</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Calculate optimal storage conditions for different crops
                    </p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">Online Tool</Badge>
                  </div>
                  <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium">Quality Improvement Tips</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Practical advice on improving crop quality from experts
                    </p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">Video Series</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-agri-primary text-agri-primary">
                  Explore All Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Quality;
