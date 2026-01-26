"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, BarChart2, Activity, Heart, Droplets, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts"

// Key findings data for visualization
const featureImportance = [
  { feature: "Serum Creatinine", importance: 0.42, description: "Kidney function marker" },
  { feature: "Ejection Fraction", importance: 0.38, description: "Heart pumping efficiency" },
  { feature: "Age", importance: 0.15, description: "Patient age in years" },
  { feature: "Serum Sodium", importance: 0.12, description: "Blood sodium levels" },
  { feature: "Blood Pressure", importance: 0.10, description: "High blood pressure indicator" },
  { feature: "Platelets", importance: 0.08, description: "Blood clotting cells" },
]

const modelPerformance = [
  { name: "Accuracy", value: 85.6, fill: "hsl(var(--chart-1))" },
  { name: "Sensitivity", value: 82.3, fill: "hsl(var(--chart-2))" },
  { name: "Specificity", value: 88.1, fill: "hsl(var(--chart-3))" },
]

const aucData = [
  { name: "AUC", value: 89.7, fill: "hsl(var(--primary))" },
]

const patientOutcomes = [
  { name: "Survived", value: 203, color: "hsl(var(--chart-4))" },
  { name: "Deceased", value: 96, color: "hsl(var(--chart-5))" },
]

const ageDistribution = [
  { range: "40-50", survived: 35, deceased: 8 },
  { range: "51-60", survived: 52, deceased: 18 },
  { range: "61-70", survived: 68, deceased: 32 },
  { range: "71-80", survived: 38, deceased: 28 },
  { range: "81+", survived: 10, deceased: 10 },
]

export default function HeartFailurePage() {
  const [viewMode, setViewMode] = useState<"pdf" | "interactive">("interactive")

  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    color: "hsl(var(--foreground))",
    borderRadius: "8px",
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/#work" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
            
            <div className="space-y-4">
              <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                Research Paper
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Predictive Modeling for Cardiovascular Mortality
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
                A logistic regression analysis identifying key clinical features that predict mortality risk in heart failure patients, 
                achieving 85.6% accuracy with an AUC of 0.897.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {["Healthcare Analytics", "Logistic Regression", "ROC Analysis", "R", "Feature Selection"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-4 mb-8">
            <Button
              variant={viewMode === "interactive" ? "default" : "outline"}
              onClick={() => setViewMode("interactive")}
              className={viewMode === "interactive" ? "bg-primary text-primary-foreground" : "border-border text-foreground bg-transparent"}
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Interactive Visualization
            </Button>
            <Button
              variant={viewMode === "pdf" ? "default" : "outline"}
              onClick={() => setViewMode("pdf")}
              className={viewMode === "pdf" ? "bg-primary text-primary-foreground" : "border-border text-foreground bg-transparent"}
            >
              <FileText className="h-4 w-4 mr-2" />
              View PDF
            </Button>
          </div>

          {viewMode === "pdf" ? (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <iframe
                src="/papers/heart-failure-mortality.pdf"
                className="w-full h-[800px]"
                title="Heart Failure Mortality Research Paper"
              />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Model Accuracy</p>
                  </div>
                  <p className="text-4xl font-bold text-foreground">85.6%</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">AUC Score</p>
                  </div>
                  <p className="text-4xl font-bold text-foreground">0.897</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Patients Analyzed</p>
                  </div>
                  <p className="text-4xl font-bold text-foreground">299</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Clinical Features</p>
                  </div>
                  <p className="text-4xl font-bold text-foreground">12</p>
                </div>
              </div>

              <Tabs defaultValue="importance" className="space-y-6">
                <TabsList className="bg-card border border-border">
                  <TabsTrigger value="importance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Feature Importance
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Model Performance
                  </TabsTrigger>
                  <TabsTrigger value="outcomes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Patient Outcomes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="importance">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Feature Importance in Mortality Prediction</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Serum creatinine and ejection fraction emerged as the strongest predictors of cardiovascular mortality.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={featureImportance} layout="vertical" margin={{ left: 20, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis 
                            type="category" 
                            dataKey="feature" 
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                            width={120}
                          />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Bar dataKey="importance" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Key Predictors Explained</h3>
                      <div className="space-y-4">
                        {featureImportance.slice(0, 4).map((item, index) => (
                          <div key={item.feature} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{item.feature}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                              <p className="text-sm text-primary mt-1">Importance: {(item.importance * 100).toFixed(0)}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Model Performance Metrics</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        The logistic regression model achieved excellent performance across all key metrics.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={modelPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {modelPerformance.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">ROC-AUC Performance</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        An AUC of 0.897 indicates excellent discriminatory ability between survival outcomes.
                      </p>
                      <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={250}>
                          <RadialBarChart 
                            cx="50%" 
                            cy="50%" 
                            innerRadius="60%" 
                            outerRadius="90%" 
                            data={aucData}
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar
                              dataKey="value"
                              cornerRadius={10}
                              fill="hsl(var(--primary))"
                              background={{ fill: "hsl(var(--secondary))" }}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center -mt-16">
                        <p className="text-5xl font-bold text-primary">0.897</p>
                        <p className="text-sm text-muted-foreground mt-1">Area Under Curve</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="outcomes">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Patient Outcome Distribution</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Of 299 patients analyzed, 203 survived while 96 experienced mortality events.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={patientOutcomes}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {patientOutcomes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Outcomes by Age Group</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Mortality risk increases significantly with patient age, particularly after 60 years.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={ageDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="range" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Legend />
                          <Bar dataKey="survived" name="Survived" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="deceased" name="Deceased" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Methodology Section */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Methodology</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Data Collection</h4>
                    <p className="text-sm text-muted-foreground">
                      Clinical records from 299 heart failure patients with 12 features including age, 
                      ejection fraction, serum creatinine, and other vital indicators.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Analysis Approach</h4>
                    <p className="text-sm text-muted-foreground">
                      Logistic regression with feature selection, cross-validation, and ROC curve analysis 
                      to identify optimal predictors and validate model performance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Key Insight</h4>
                    <p className="text-sm text-muted-foreground">
                      Serum creatinine and ejection fraction alone can predict mortality risk with high accuracy, 
                      enabling simpler clinical decision-making tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
