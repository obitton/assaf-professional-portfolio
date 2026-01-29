"use client"

import Link from "next/link"
import { Activity, BarChart2, Database, ChevronRight, FileText, Sigma, Target } from "lucide-react"

const projects = [
  {
    id: "quantitative-modeling",
    title: "Quantitative Decision Modeling",
    description: "Advanced optimization and decision analysis case studies using Linear, Integer, and Non-Linear Programming with Excel's Analytic Solver.",
    icon: Target,
    href: "/research/quantitative-modeling",
    tags: ["Prescriptive Analytics", "Optimization", "Excel Solver"],
    type: "research" as const,
  },
  {
    id: "statistical-methods",
    title: "Statistical Methods & Analysis",
    description: "A comprehensive technical library of 7 case studies covering core and advanced statistical algorithms, from Regression to Machine Learning theory.",
    icon: Sigma,
    href: "/research/statistical-methods",
    tags: ["Technical Library", "Machine Learning", "Statistical Theory"],
    type: "research" as const,
  },
  {
    id: "heart-failure",
    title: "Predictive Modeling for Cardiovascular Mortality",
    description: "Logistic regression model predicting cardiovascular mortality using 12 clinical features. Achieved 85.6% accuracy with AUC of 0.897.",
    icon: Activity,
    href: "/research/heart-failure",
    tags: ["Healthcare Analytics", "Logistic Regression", "R"],
    type: "research" as const,
  },
  {
    id: "baseball-analytics",
    title: "Baseball Team Performance Analysis",
    description: "Statistical analysis examining how offensive and defensive metrics impact team wins, with franchise comparisons and trend analysis from 1990-2023.",
    icon: BarChart2,
    href: "/research/baseball-analytics",
    tags: ["Sports Analytics", "Regression Analysis", "R"],
    type: "research" as const,
  },
  {
    id: "sports-analytics",
    title: "International Sports Rankings Analyzer",
    description: "Interactive dashboard comparing sports rankings across six countries with CRUD operations, multiple chart types, and Wikipedia API integration for sport information lookup.",
    icon: Database,
    href: "/projects/sports-analytics",
    tags: ["Python", "Data Visualization", "API Integration", "CRUD"],
    type: "project" as const,
  },
]

export function ProjectCards() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-4 mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-primary">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Projects & Research</h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            A collection of data science projects and statistical research exploring predictive modeling,
            analytics, and interactive data visualization.
          </p>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="group block"
            >
              <article className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-primary/10 rounded-xl w-fit">
                      <project.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${project.type === "project"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                        }`}>
                        {project.type === "project" ? "Interactive Project" : "Research Paper"}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3 text-balance">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 text-pretty">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-sm text-primary font-medium">
                      {project.type === "project" ? "Explore Interactive Tool" : "View Research"}
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center justify-center w-12">
                    <FileText className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
