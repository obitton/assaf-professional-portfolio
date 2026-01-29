"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, BarChart2, TrendingUp, Target, Trophy, Users, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { PdfViewer } from "@/components/pdf-viewer"
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
  Cell,
} from "recharts"

// Data visualizations based on the research (Synthetic data matching findings)
const winsVsRuns = [
  { runs: 600, wins: 65, trend: 68 },
  { runs: 650, wins: 70, trend: 72 },
  { runs: 700, wins: 78, trend: 79 },
  { runs: 750, wins: 85, trend: 86 },
  { runs: 800, wins: 92, trend: 93 },
  { runs: 850, wins: 98, trend: 100 },
  { runs: 900, wins: 103, trend: 105 },
]

const historicalTrends = [
  { year: 1990, avgRuns: 698, avgHR: 128, avgE: 120 },
  { year: 1995, avgRuns: 725, avgHR: 146, avgE: 110 },
  { year: 2000, avgRuns: 789, avgHR: 182, avgE: 105 },
  { year: 2005, avgRuns: 752, avgHR: 168, avgE: 98 },
  { year: 2010, avgRuns: 711, avgHR: 152, avgE: 92 },
  { year: 2015, avgRuns: 689, avgHR: 162, avgE: 85 },
  { year: 2020, avgRuns: 620, avgHR: 140, avgE: 75 }, // Pandemic dip
  { year: 2023, avgRuns: 712, avgHR: 186, avgE: 80 },
]

const franchiseComparison = [
  { team: "NYY", winPct: 0.57, title: "Yankees" },
  { team: "ATL", winPct: 0.56, title: "Braves" },
  { team: "BOS", winPct: 0.53, title: "Red Sox" },
  { team: "CHC", winPct: 0.49, title: "Cubs" },
  { team: "LAD", winPct: 0.55, title: "Dodgers" },
]

// Coefficients from the PDF
const regressionCoefficients = [
  { metric: "Runs Scored (R)", coefficient: 0.1076, impact: "Positive" },
  { metric: "Walks Allowed (BB)", coefficient: 0.1189, impact: "Positive" },
  { metric: "Errors (E)", coefficient: 0.069, impact: "Positive" },
  { metric: "Stolen Bases (SB)", coefficient: 0.023, impact: "Positive" },
  { metric: "Runs Allowed (RA)", coefficient: -0.0499, impact: "Negative" },
  { metric: "Home Runs (HR)", coefficient: -0.0315, impact: "Negative" },
  { metric: "Triples (X3B)", coefficient: -0.1244, impact: "Negative" },
]

export default function BaseballAnalyticsPage() {
  const tooltipStyle = {
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
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
                Analyzing Team Performance and Winning Trends in Baseball
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
                A comprehensive statistical analysis of MLB data (1990-2023) using multiple linear regression
                to identify the most significant offensive and defensive predictors of team success.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Multiple Regression", "R (ggplot2)", "Welch's t-test", "Lahman Database", "Sports Analytics"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Offensive R²</p>
                </div>
                <p className="text-4xl font-bold text-foreground">0.59</p>
                <p className="text-sm text-muted-foreground">Model Fit</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Runs Coeff</p>
                </div>
                <p className="text-4xl font-bold text-foreground">+0.108</p>
                <p className="text-sm text-muted-foreground">Wins per Run</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Teams Analyzed</p>
                </div>
                <p className="text-4xl font-bold text-foreground">30</p>
                <p className="text-sm text-muted-foreground">1990-2023</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Top Finding</p>
                </div>
                <p className="text-2xl font-bold text-foreground">Offense</p>
                <p className="text-sm text-muted-foreground">Outperforms Defense</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - Left and Center Columns */}
              <div className="lg:col-span-2 space-y-8">
                <Tabs defaultValue="regression" className="space-y-6">
                  <TabsList className="bg-card border border-border">
                    <TabsTrigger value="regression" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Regression Findings
                    </TabsTrigger>
                    <TabsTrigger value="correlation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Runs vs Wins
                    </TabsTrigger>
                    <TabsTrigger value="trends" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Historical Trends
                    </TabsTrigger>
                    <TabsTrigger value="franchise" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Franchise Stats
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="regression">
                    <div className="grid gap-6">
                      <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Regression Coefficients</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Horizontal bar chart displaying the coefficient values for significant predictors.
                          Note the surprising negative correlation for Home Runs and Triples.
                        </p>
                        <ResponsiveContainer width="100%" height={350}>
                          <BarChart data={regressionCoefficients} layout="vertical" margin={{ left: 120, right: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis
                              type="number"
                              tick={{ fill: "var(--muted-foreground)" }}
                              domain={[-0.15, 0.15]}
                            />
                            <YAxis
                              type="category"
                              dataKey="metric"
                              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                              width={110}
                            />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Bar dataKey="coefficient" radius={[0, 4, 4, 0]}>
                              {regressionCoefficients.map((entry, index) => (
                                <Cell
                                  key={index}
                                  fill={entry.impact === "Positive" ? "var(--chart-1)" : "var(--chart-5)"}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Key Interpretations</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          <li className="flex gap-2">
                            <span className="font-bold text-foreground">Runs Scored (0.1076):</span>
                            Strongest predictor. For every additional run scored, expected wins increase by ~0.11.
                          </li>
                          <li className="flex gap-2">
                            <span className="font-bold text-foreground">Walks Allowed (0.1189):</span>
                            Found to be positively correlated, suggesting a strategic component to walks in defensive schemes.
                          </li>
                          <li className="flex gap-2">
                            <span className="font-bold text-foreground">Home Runs (-0.0315):</span>
                            Unexpected negative coefficient suggests relying solely on power hitting (without base runners) may yield diminishing returns compared to balanced offense.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="correlation">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Runs Scored vs Wins</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        A strong positive linear relationship exists (p &#60; 2e-16). Runs Scored remains the single most dominant metric for predicting team success.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis
                            type="number"
                            dataKey="runs"
                            name="Runs Scored"
                            tick={{ fill: "var(--muted-foreground)" }}
                            label={{ value: "Runs Scored", position: "bottom", fill: "var(--muted-foreground)" }}
                          />
                          <YAxis
                            type="number"
                            dataKey="wins"
                            name="Wins"
                            tick={{ fill: "var(--muted-foreground)" }}
                            label={{ value: "Wins", angle: -90, position: "insideLeft", fill: "var(--muted-foreground)" }}
                          />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Scatter data={winsVsRuns} fill="var(--primary)" name="Team Seasons" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="trends">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Long-term Trends (1990-2023)</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Fielding analysis shows a steady decline in Errors (E) over time, while offensive metrics fluctuate.
                        Note the significant dip in 2020 due to the pandemic-shortened season.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={historicalTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="year" tick={{ fill: "var(--muted-foreground)" }} />
                          <YAxis tick={{ fill: "var(--muted-foreground)" }} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Legend />
                          <Line type="monotone" dataKey="avgRuns" name="Avg Runs" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="avgE" name="Avg Errors" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="franchise">
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Franchise Win Percentage (Mean)</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Welch’s t-tests confirmed NYY (0.57) significantly outperformed BOS (0.53) and CHC (0.49) over the 1990-2023 period.
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={franchiseComparison} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="team" tick={{ fill: "var(--muted-foreground)" }} />
                          <YAxis tick={{ fill: "var(--muted-foreground)" }} domain={[0.4, 0.6]} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Bar dataKey="winPct" name="Mean Win %" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* PDF Viewer Section */}
                <PdfViewer
                  title="Research Paper"
                  url="/research/baseball-team-performance.pdf"
                />
              </div>

              {/* Sidebar - Right Column */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Paper Details</h3>
                  <div className="space-y-4">
                    <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <a href="/research/baseball-team-performance.pdf" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                    <div className="h-px bg-border my-4" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Author</p>
                      <p className="text-sm text-muted-foreground">Assaf Bitton</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Methodology</p>
                      <p className="text-sm text-muted-foreground">Multiple Linear Regression, LOESS Smoothing, Welch's t-test</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Dataset</p>
                      <p className="text-sm text-muted-foreground">Lahman "Teams" Database</p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Regression Stats</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-muted-foreground">Offensive R²</dt>
                      <dd className="text-2xl font-bold text-foreground">0.591</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Defensive R²</dt>
                      <dd className="text-2xl font-bold text-foreground">0.539</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Key Predictors (p &lt; 0.05)</dt>
                      <dd className="text-sm text-foreground mt-1">Runs, Walks, Errors, Stolen Bases</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
