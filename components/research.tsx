"use client"

import { useState } from "react"
import { FileText, ExternalLink, ChevronRight, Activity, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const researchPapers = [
  {
    id: "heart-failure",
    title: "Predictive Modeling for Cardiovascular Mortality",
    subtitle: "Logistic Regression Analysis of Clinical Features",
    icon: Activity,
    description: "Developed a logistic regression model to predict cardiovascular mortality using 12 clinical features from 299 patients. The model achieved 85.6% accuracy with an AUC of 0.897.",
    keyFindings: [
      "Serum creatinine and ejection fraction identified as strongest predictors",
      "Model achieved 85.6% accuracy on test data",
      "AUC of 0.897 indicates excellent discriminatory ability",
      "Analysis of 299 patients with heart failure conditions"
    ],
    methodology: "Logistic Regression, Feature Selection, ROC Analysis",
    pdfPath: "/papers/heart-failure-mortality.pdf",
    tags: ["Healthcare Analytics", "Logistic Regression", "Predictive Modeling"]
  },
  {
    id: "baseball-analytics",
    title: "Baseball Team Performance Analysis",
    subtitle: "Statistical Analysis of Offensive and Defensive Metrics",
    icon: BarChart2,
    description: "Comprehensive analysis using the Lahman database examining how offensive and defensive metrics impact team wins. Included franchise comparisons and trend analysis from 1990-2023.",
    keyFindings: [
      "Strong correlation between runs scored and season wins",
      "Defensive metrics show significant impact on playoff appearances",
      "Historical trend analysis reveals evolution of game strategies",
      "Franchise comparison across multiple performance indicators"
    ],
    methodology: "Multiple Regression, Time Series Analysis, Data Visualization",
    pdfPath: "/papers/baseball-analytics.pdf",
    tags: ["Sports Analytics", "Regression Analysis", "Time Series"]
  }
]

export function Research() {
  const [selectedPaper, setSelectedPaper] = useState<typeof researchPapers[0] | null>(null)

  return (
    <section id="research" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-4 mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-primary">Research</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Selected Publications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Research exploring predictive modeling, statistical analysis, and data-driven insights 
            across healthcare and sports domains.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {researchPapers.map((paper) => (
            <Dialog key={paper.id}>
              <DialogTrigger asChild>
                <article
                  className="bg-card border border-border rounded-lg p-8 cursor-pointer hover:border-primary/50 transition-all group"
                  onClick={() => setSelectedPaper(paper)}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <paper.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{paper.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {paper.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium bg-secondary rounded-full text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-sm text-primary font-medium">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </DialogTrigger>
              
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-foreground pr-8">
                    {paper.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 mt-4">
                  <p className="text-muted-foreground">{paper.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Methodology</h4>
                    <p className="text-sm text-muted-foreground">{paper.methodology}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Findings</h4>
                    <ul className="space-y-2">
                      {paper.keyFindings.map((finding, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium bg-secondary rounded-full text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <a href={paper.pdfPath} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" />
                        View Full Paper
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="border-border text-foreground hover:bg-secondary bg-transparent">
                      <a href={`#${paper.id}-visualization`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Interactive Data
                      </a>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
