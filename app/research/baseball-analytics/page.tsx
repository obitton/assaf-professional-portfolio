"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, BarChart2, TrendingUp, Target, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Legend,
  Area,
  AreaChart,
} from "recharts"

// Data visualizations based on the research
const winsVsRuns = [
  { runs: 600, wins: 65 },
  { runs: 650, wins: 70 },
  { runs: 700, wins: 76 },
  { runs: 750, wins: 82 },
  { runs: 800, wins: 88 },
  { runs: 850, wins: 93 },
  { runs: 900, wins: 98 },
]

const historicalTrends = [
  { year: 1990, avgRuns: 698, avgHR: 128, avgSO: 952 },
  { year: 1995, avgRuns: 725, avgHR: 146, avgSO: 1012 },
  { year: 2000, avgRuns: 789, avgHR: 182, avgSO: 1089 },
  { year: 2005, avgRuns: 752, avgHR: 168, avgSO: 1056 },
  { year: 2010, avgRuns: 711, avgHR: 152, avgSO: 1145 },
  { year: 2015, avgRuns: 689, avgHR: 162, avgSO: 1278 },
  { year: 2020, avgRuns: 698, avgHR: 178, avgSO: 1402 },
  { year: 2023, avgRuns: 712, avgHR: 186, avgSO: 1468 },
]

const franchiseComparison = [
  { team: "NYY", wins: 2486, playoffs: 22, title: "Yankees" },
  { team: "LAD", wins: 2398, playoffs: 20, title: "Dodgers" },
  { team: "ATL", wins: 2312, playoffs: 18, title: "Braves" },
  { team: "STL", wins: 2278, playoffs: 16, title: "Cardinals" },
  { team: "BOS", wins: 2245, playoffs: 14, title: "Red Sox" },
  { team: "HOU", wins: 2156, playoffs: 12, title: "Astros" },
]

const offenseDefenseCorrelation = [
  { team: "Team A", offense: 820, defense: 680, wins: 95 },
  { team: "Team B", offense: 750, defense: 720, wins: 88 },
  { team: "Team C", offense: 780, defense: 750, wins: 85 },
  { team: "Team D", offense: 700, defense: 650, wins: 78 },
  { team: "Team E", offense: 680, defense: 700, wins: 75 },
  { team: "Team F", offense: 720, defense: 780, wins: 82 },
  { team: "Team G", offense: 650, defense: 620, wins: 68 },
  { team: "Team H", offense: 760, defense: 700, wins: 86 },
]

const regressionCoefficients = [
  { metric: "Runs Scored", coefficient: 0.102, impact: "Positive" },
  { metric: "Runs Allowed", coefficient: -0.098, impact: "Negative" },
  { metric: "Home Runs", coefficient: 0.034, impact: "Positive" },
  { metric: "Strikeouts (P)", coefficient: 0.018, impact: "Positive" },
  { metric: "Errors", coefficient: -0.045, impact: "Negative" },
  { metric: "Walks Allowed", coefficient: -0.022, impact: "Negative" },
]

export default function BaseballAnalyticsPage() {
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
                Baseball Team Performance Analysis
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
                A comprehensive statistical analysis using the Lahman database to examine how offensive and defensive 
                metrics impact team wins, with franchise comparisons and historical trend analysis from 1990-2023.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {["Sports Analytics", "Multiple Regression", "Time Series", "R", "Lahman Database"].map((tag) => (
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
                src="/papers/baseball-analytics.pdf"
                className="w-full h-[800px]"
                title="Baseball Analytics Research Paper"
              />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Years Analyzed</p>
                  </div>
                  <p className="text-4xl font-bold text-foreground">34</p>
                  <p className="text-sm text-muted-foreground">1990-2023</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Teams Compared</p>
                  </div>
                  <p className="text-4xl font-bold text-foreground">30</p>
                  <p className="text-sm text-muted-foreground">MLB Franchises</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">R-Squared</p>
                  </div>
                  <p className="text-4xl font-bold text-foreground">0.87</p>
                  <p className="text-sm text-muted-foreground">Model Fit</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Key Finding</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">+10 Runs</p>
                  <p className="text-sm text-muted-foreground">= +1 Win</p>
                </div>
              </div>

              <Tabs defaultValue="correlation" className="space-y-6">
                <TabsList className="bg-card border border-border">
                  <TabsTrigger value="correlation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Runs vs Wins
                  </TabsTrigger>
                  <TabsTrigger value="trends" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Historical Trends
                  </TabsTrigger>
                  <TabsTrigger value="franchise" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Franchise Comparison
                  </TabsTrigger>
                  <TabsTrigger value="regression" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Regression Analysis
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="correlation">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Runs Scored vs Season Wins</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        A strong positive correlation exists between runs scored and season wins. 
                        Teams scoring 800+ runs consistently achieve winning records.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            type="number" 
                            dataKey="runs" 
                            name="Runs Scored"
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            label={{ value: "Runs Scored", position: "bottom", fill: "hsl(var(--muted-foreground))" }}
                          />
                          <YAxis 
                            type="number" 
                            dataKey="wins" 
                            name="Wins"
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            label={{ value: "Wins", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
                          />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Scatter data={winsVsRuns} fill="hsl(var(--primary))" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Offense vs Defense Impact</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Teams with balanced offensive and defensive performance achieve the most wins.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={offenseDefenseCorrelation.slice(0, 6)} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="team" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Legend />
                          <Bar dataKey="offense" name="Runs Scored" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="defense" name="Runs Allowed" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trends">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Offensive Evolution (1990-2023)</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        The game has evolved significantly: strikeouts have increased dramatically while 
                        home runs and runs scored have fluctuated.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={historicalTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Legend />
                          <Line type="monotone" dataKey="avgRuns" name="Avg Runs" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                          <Line type="monotone" dataKey="avgHR" name="Avg HR" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Strikeout Trend</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Strikeouts have increased by over 50% since 1990, reflecting changes in pitching 
                        strategy and hitting approach.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={historicalTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Area 
                            type="monotone" 
                            dataKey="avgSO" 
                            name="Avg Strikeouts" 
                            stroke="hsl(var(--primary))" 
                            fill="hsl(var(--primary))"
                            fillOpacity={0.2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="franchise">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Top Franchises (1990-2023)</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Comparing total wins and playoff appearances across the most successful MLB franchises.
                    </p>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={franchiseComparison} layout="vertical" margin={{ left: 80, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis 
                          type="category" 
                          dataKey="title" 
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Legend />
                        <Bar dataKey="wins" name="Total Wins" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                      {franchiseComparison.map((team) => (
                        <div key={team.team} className="text-center p-4 bg-secondary/50 rounded-lg">
                          <p className="text-lg font-bold text-foreground">{team.team}</p>
                          <p className="text-2xl font-bold text-primary">{team.playoffs}</p>
                          <p className="text-xs text-muted-foreground">Playoff Apps</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="regression">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Regression Coefficients</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Multiple regression analysis reveals the relative impact of each metric on season wins.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={regressionCoefficients} layout="vertical" margin={{ left: 100, right: 30 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            type="number" 
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            domain={[-0.12, 0.12]}
                          />
                          <YAxis 
                            type="category" 
                            dataKey="metric" 
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Bar dataKey="coefficient" radius={[0, 4, 4, 0]}>
                            {regressionCoefficients.map((entry, index) => (
                              <Bar 
                                key={index} 
                                fill={entry.coefficient > 0 ? "hsl(var(--chart-4))" : "hsl(var(--chart-5))"} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Key Regression Findings</h3>
                      <div className="space-y-4">
                        {regressionCoefficients.map((item) => (
                          <div key={item.metric} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                            <div>
                              <p className="font-medium text-foreground">{item.metric}</p>
                              <p className={`text-sm ${item.impact === "Positive" ? "text-green-500" : "text-red-500"}`}>
                                {item.impact} Impact
                              </p>
                            </div>
                            <p className={`text-xl font-bold ${item.coefficient > 0 ? "text-green-500" : "text-red-500"}`}>
                              {item.coefficient > 0 ? "+" : ""}{item.coefficient}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Methodology Section */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Methodology</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Data Source</h4>
                    <p className="text-sm text-muted-foreground">
                      Lahman Baseball Database containing comprehensive MLB statistics from 1871 to present, 
                      filtered to 1990-2023 for this analysis.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Statistical Methods</h4>
                    <p className="text-sm text-muted-foreground">
                      Multiple linear regression, correlation analysis, time series decomposition, 
                      and comparative franchise analysis using R statistical software.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Key Insight</h4>
                    <p className="text-sm text-muted-foreground">
                      Run differential (runs scored minus runs allowed) is the strongest predictor of wins, 
                      with approximately 10 runs equating to 1 additional win.
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
