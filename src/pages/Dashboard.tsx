
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CareerPathPredictor from "@/components/dashboard/CareerPathPredictor";
import ConnectionRecommender from "@/components/dashboard/ConnectionRecommender";
import ResumeBuilder from "@/components/dashboard/ResumeBuilder";
import SkillGapAnalyzer from "@/components/dashboard/SkillGapAnalyzer";
import ProgressDashboard from "@/components/dashboard/ProgressDashboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("career-path");

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Career Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track your career progress and get AI-powered recommendations
          </p>
        </div>
        
        <Tabs defaultValue="career-path" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="career-path">Career Path</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="skill-gap">Skills</TabsTrigger>
            <TabsTrigger value="progress">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="career-path">
            <Card>
              <CardHeader>
                <CardTitle>Career Path Predictor</CardTitle>
                <CardDescription>
                  Get a personalized 5-year career roadmap based on your profile and current job trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CareerPathPredictor />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="connections">
            <Card>
              <CardHeader>
                <CardTitle>Smart Connection Recommender</CardTitle>
                <CardDescription>
                  Discover high-value professional connections based on your career goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ConnectionRecommender />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Resume Builder</CardTitle>
                <CardDescription>
                  Automatically tailor your resume for specific job opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResumeBuilder />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skill-gap">
            <Card>
              <CardHeader>
                <CardTitle>Skill Gap Analyzer</CardTitle>
                <CardDescription>
                  Identify and bridge skill gaps with personalized learning recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillGapAnalyzer />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Career Progress Analytics</CardTitle>
                <CardDescription>
                  Visualize your career progress and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressDashboard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
