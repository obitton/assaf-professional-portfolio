"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, FileText, Download, Activity, FileSpreadsheet, ExternalLink } from "lucide-react"

export default function HeartFailureResearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/#work"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>

            <div className="space-y-4">
              <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                Research Paper
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Predictive Modeling for Cardiovascular Mortality
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
                A comprehensive statistical analysis predicting mortality risk in heart failure patients.
                This project utilizes logistic regression and other statistical methods to identify key clinical predictors of mortality.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Healthcare Analytics", "Logistic Regression", "R", "JASP", "Survival Analysis"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left and Center Columns */}
            <div className="lg:col-span-2 space-y-12">

              {/* Abstract / Overview */}
              <section className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" />
                  Project Overview
                </h2>
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground">
                  <p>
                    Heart failure is a major public health concern with high mortality rates. In this research, I developed
                    a predictive model to estimate mortality risk based on clinical features such as age, ejection fraction,
                    serum creatinine, and other biomarkers.
                  </p>
                  <p>
                    Using a dataset of heart failure patients, I applied logistic regression to analyze the relationship between
                    these variables and the likelihood of death. My model achieved 85.6% accuracy, demonstrating the potential
                    of machine learning in clinical decision support.
                  </p>
                </div>
              </section>

              {/* Statistical Analysis Results (JASP Integration) */}
              <section className="bg-card border border-border rounded-xl p-8 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    Statistical Analysis
                  </h2>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/data/heart-failure/statistical-report.html" target="_blank" rel="noopener noreferrer">
                      Open Full Report <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="aspect-[3/4] w-full bg-white rounded-lg border border-border overflow-hidden">
                  <iframe
                    src="/data/heart-failure/statistical-report.html"
                    className="w-full h-full border-0"
                    title="JASP Statistical Report"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Live interactive preview of the JASP statistical report output.
                </p>
              </section>

            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">

              {/* Downloads Card */}
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">Resources</h3>

                <div className="space-y-4">
                  <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <a href="/research/heart-failure-mortality-risk.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download Research PDF
                    </a>
                  </Button>

                  <div className="h-px bg-border my-4" />

                  <p className="text-sm font-medium text-foreground mb-2">Data Files</p>

                  <Button variant="outline" className="w-full justify-start border-border text-foreground bg-transparent" asChild>
                    <a href="/data/heart-failure/original-data.csv" download>
                      <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                      Original Dataset (.csv)
                    </a>
                  </Button>

                  <Button variant="outline" className="w-full justify-start border-border text-foreground bg-transparent" asChild>
                    <a href="/data/heart-failure/standardized-data.csv" download>
                      <FileSpreadsheet className="mr-2 h-4 w-4 text-blue-600" />
                      Standardized Data (.csv)
                    </a>
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-secondary/50 border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-muted-foreground">Accuracy</dt>
                    <dd className="text-2xl font-bold text-foreground">85.6%</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">AUC Score</dt>
                    <dd className="text-2xl font-bold text-foreground">0.897</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Sample Size</dt>
                    <dd className="text-2xl font-bold text-foreground">299 Patients</dd>
                  </div>
                </dl>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
