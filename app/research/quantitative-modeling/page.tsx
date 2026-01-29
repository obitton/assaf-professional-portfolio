"use client"

import Link from "next/link"
import { FileText, ChevronRight, Activity, BarChart2, Sigma, Brain, Target, Building, GitBranch, TrendingUp, CheckCircle2, Code, FileSpreadsheet, Calculator, ArrowLeft, Database, Search, Network, Zap, Layers, Scale, DollarSign, BarChart4, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { CodeWindow } from "@/components/code-window"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

// High-Complexity Case Studies derived from merged lecture concepts
const projectsData = [
    {
        title: "Strategic Capital Budgeting & Portfolio Selection",
        shortDescription: "Binary Integer Programming model for clear-cut Go/No-Go investment decisions under budget constraints.",
        fullDescription: "A sophisticated Integer Linear Programming (ILP) model designed to optimize a corporate capital project portfolio. This study departs from simple resource allocation by introducing binary decision variables (Xi ∈ {0,1}) to handle 'Go/No-Go' decisions. It addresses complex logical interdependencies between projects, such as Mutually Exclusive options (Select A OR B, not both) and Contingent projects (Select B only IF A is selected), while strictly adhering to multi-period budget constraints.",
        tags: ["Integer Programming", "Branch-and-Bound", "Financial Modeling"],
        icon: Building,
        category: "Financial Engineering",
        methodology: [
            "Defined binary decision vectors for candidate projects (Xi).",
            "Formulated 'Knapsack' type budget constraints across varying fiscal periods.",
            "Implemented logical linking constraints (XA + XB ≤ 1 for exclusivity, XB ≤ XA for contingency).",
            "Utilized the Branch-and-Bound algorithm to implicitly enumerate the search space, pruning non-optimal branches to ensure global optimality."
        ],
        outcomes: [
            "Constructed an optimal project portfolio maximizing Net Present Value (NPV).",
            "Visualized the impact of 'Forced Choice' constraints on ROI.",
            "Demonstrated the superiority of ILP over heuristic ranking methods (e.g., Profitability Index) which fail in the presence of indivisibility."
        ],
        codeTitle: "Binary & Logical Constraints",
        code: `MAX Total NPV = Sum(NPV_i * X_i)

Subject to:
1. Budget Constraint (Year 1):
   Sum(Cost_i * X_i) <= $10,000,000

2. Mutually Exclusive (Project A vs Project B):
   X_A + X_B <= 1
   (Logic: Can pick neither, or one, but NOT both)

3. Contingency (Project C requires Project D):
   X_C <= X_D
   (Logic: If X_C=1, then X_D must be 1. If X_D=0, X_C must be 0)

4. Binary Restriction:
   X_i must be integer (0 or 1)`
    },
    {
        title: "Multi-Echelon Supply Chain Network Design",
        shortDescription: "Optimizing global transshipment flows using Network Balance equations and Reduced Cost analysis.",
        fullDescription: "A comprehensive Network Flow optimization model for the 'Bavarian Motor Company'. This project models a complex transshipment problem involving Manufacturing Plants (Supply), Distribution Centers (Transshipment), and Retail Dealers (Demand). The objective is to minimize Total Logistics Costs while ensuring flow conservation at every node. It uses Shadow Prices to evaluate the marginal value of capacity expansion at bottlenecks and Reduced Costs to assess the viability of opening new shipping routes.",
        tags: ["Network Simplex", "Transshipment", "Operations Research"],
        icon: Network,
        category: "Operations Research",
        methodology: [
            "Modeled network topology with arcs representing valid shipping lanes and costs.",
            "Formulated Balance-of-Flow constraints for all node types: Flow In - Flow Out ≥ Demand (or ≤ Supply).",
            "Set up Capacitated Transshipment nodes with throughput limits.",
            "Analyzed the Sensitivity Report to identify non-binding constraints and surplus capacity."
        ],
        outcomes: [
            "Optimized routing plan reducing total freight costs by 15%.",
            "Identified critical intermediaries where capacity expansion yields the highest Shadow Price.",
            "Verified solution stability using 'Allowable Increase/Decrease' ranges for route costs."
        ],
        codeTitle: "Network Balance Equations",
        code: `Node Balance Constraint:
Flow In - Flow Out = Net Requirement

1. Supply Node (Factory):
   0 - (Route_A + Route_B) >= -200 (Capacity)
   (Mathematically: Outflow <= 200)

2. Transshipment Node (Warehouse):
   (Route_A + Route_C) - (Route_D + Route_E) = 0
   (Conservation of Flow: What enters must leave)

3. Demand Node (Retailer):
   (Route_D + Route_G) - 0 >= 50 (Demand)`
    },
    {
        title: "Mean-Variance Portfolio Optimization",
        shortDescription: "Quadratic Programming model minimizing risk (XᵀΣX) for a target return on the Efficient Frontier.",
        fullDescription: "A Non-Linear Programming (NLP) application of Modern Portfolio Theory (Markowitz Model). Unlike linear problems, this model minimizes Portfolio Variance (Risk) which is a quadratic function of asset weights and covariances (XᵀΣX). The study addresses the challenge of Convexity, verifying the Hessian Matrix identifies a global minimum. It constructs the 'Efficient Frontier' by solving the model iteratively for different target return levels.",
        tags: ["Quadratic Programming", "Convexity", "Hessian Matrix"],
        icon: TrendingUp,
        category: "Financial Engineering",
        methodology: [
            "Estimated Variance-Covariance Matrix (Σ) from historical asset returns.",
            "Formulated Quadratic Objective Function: Min ∑∑ wi wj σij.",
            "Configured Solver with the GRG Nonlinear engine (Generalized Reduced Gradient).",
            "Verified Positive Semidefiniteness to ensure the local minimum is the global minimum."
        ],
        outcomes: [
            "Derived the Efficient Frontier curve mapping Risk vs. Return.",
            "Determined optimal asset allocation weights ($w_i$) for specific risk tolerances.",
            "Quantified the benefits of diversification through negative covariance terms."
        ],
        codeTitle: "Quadratic Objective Logic",
        code: `Objective: Minimize Variance (Risk)
MIN Var(P) = w1²σ1² + w2²σ2² + 2*w1*w2*Cov(1,2) ...

Subject to:
1. Target Return:
   w1*E(r1) + w2*E(r2) ... >= 8%

2. Full Investment:
   Sum(w_i) = 100%

3. No Short Selling (Long Only):
   w_i >= 0`
    },
    {
        title: "Stochastic Financial Risk Modeling",
        shortDescription: "Monte Carlo simulation using Inverse Transform Sampling to quantify Value-at-Risk (VaR).",
        fullDescription: "Moving from deterministic to stochastic modeling to capture market volatility. This project utilizes Monte Carlo Simulation (10,000 trials) to model uncertainty in project cash flows or asset prices. It employs Inverse Transform Sampling (using `NORM.INV`) to generate random variates from defined probability distributions. Key risk metrics like Value-at-Risk (VaR) and Conditional Tail Expectation are calculated to assess downside exposure.",
        tags: ["Monte Carlo", "Stochastic Calculus", "VaR"],
        icon: Activity,
        category: "Probabilistic Modeling",
        methodology: [
            "Modeled uncertain inputs (e.g., Interest Rates, Demand) as Random Variables.",
            "Executed 10,000 simulation trials to build an empirical distribution of outcomes.",
            "Calculated the 5% VaR (Value at Risk) - the threshold loss exceeded only 5% of the time.",
            "Analyzed the 'Flaw of Averages' by comparing Mean(Output) vs. Function(Mean Inputs)."
        ],
        outcomes: [
            "Provided a probabilistic distribution of NPV, revealing the probability of loss.",
            "Established a risk-adjusted discount rate based on volatility profiles.",
            "Differentiated between 'Best Case' scenarios and statistically probable outcomes."
        ],
        codeTitle: "Monte Carlo Algorithm",
        code: `Algorithm:
1. Define Input Distributions:
   Revenue ~ LogNormal(μ, σ)
   Cost ~ Uniform(Min, Max)

2. Loop (N = 10,000):
   r = LOGNORM.INV(RAND(), μ, σ)
   c = MIN + (MAX-MIN)*RAND()
   Profit[i] = r - c

3. Analyze Results:
   Expected Profit = Average(Profit)
   VaR (95%) = Percentile(Profit, 0.05)
   Prob(Loss) = Count(Profit < 0) / N`
    },
    {
        title: "Service System Equilibrium & Queuing Design",
        shortDescription: "Optimizing M/M/s systems using Bayesian Decision Theory and Operating Characteristic equations.",
        fullDescription: "A dual-layered analysis combining Queuing Theory (M/M/s) with Bayesian Decision Analysis. First, the stead-state operating characteristics of a service system are modeled to determine the optimal number of servers, balancing Service Cost against the non-linear Waiting Cost function. Second, Decision Theory (Payoff Matrices) is applied to strategic facility location ('Magnolia Inns'), utilizing Minimax Regret and Expected Value of Perfect Information (EVPI) to make robust decisions under uncertainty.",
        tags: ["Queuing Theory", "Bayesian Decision", "Minimax Regret"],
        icon: Scale,
        category: "Operations Research",
        methodology: [
            "Modeled Arrival (λ) and Service (μ) rates using Poisson and Exponential distributions.",
            "Calculated M/M/s System State probabilities (P0, Lq, Wq).",
            "Constructed Regret Matrices to apply the Minimax Regret criterion (minimizing the maximum opportunity loss).",
            "Computed EVPI to value the potential acquisition of market research."
        ],
        outcomes: [
            "Optimized server capacity to the point where Marginal Service Cost = Marginal Waiting Cost.",
            "Identified the 'Knee of the Curve' where small capacity cuts cause explosive wait times.",
            "Selected optimal expansion strategies robust to 'States of Nature' uncertainty."
        ],
        codeTitle: "Queuing & Regret Logic",
        code: `Queuing Cost Optimization:
Total Cost = C_s * s + C_w * Lq(s)
Where:
C_s = Cost per Server
C_w = Cost per Unit Time in Queue
Lq(s) = Expected Queue Length (Non-linear function of s)

Decision Rule: Minimax Regret
1. Build Payoff Matrix.
2. Convert to Regret Matrix:
   Regret = (Best in Column) - (Actual Payoff)
3. For each Alternative, find Max Regret.
4. Choose Alternative with Minimum Max Regret.`
    }
]

const categories = [
    {
        title: "Operations Research",
        description: "Network optimization, logistics flow, and queuing system design.",
        icon: Network,
        projects: projectsData.filter(p => p.category === "Operations Research")
    },
    {
        title: "Financial Engineering",
        description: "Capital budgeting, portfolio variance minimization, and asset allocation.",
        icon: TrendingUp,
        projects: projectsData.filter(p => p.category === "Financial Engineering")
    },
    {
        title: "Probabilistic Modeling",
        description: "Stochastic simulation and risk quantification methods.",
        icon: Activity,
        projects: projectsData.filter(p => p.category === "Probabilistic Modeling")
    }
];


export default function QuantitativeModelingPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-32 pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Header */}
                    <div className="mb-16">
                        <Link
                            href="/#work"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Research
                        </Link>

                        <div className="space-y-4">
                            <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                                Prescriptive Analytics
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                                Quantitative Decision Modeling
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
                                Advanced optimization algorithms and stochastic modeling applications.
                                Utilizing Excel's Analytic Solver to solve complex integer, non-linear, and network flow problems.
                            </p>
                        </div>
                    </div>

                    {/* Categories Grid */}
                    <div className="space-y-16">
                        {categories.map(category => (
                            <section key={category.title}>
                                <div className="flex items-center gap-4 mb-8">
                                    <category.icon className="h-8 w-8 text-primary" />
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                                        <p className="text-muted-foreground">{category.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.projects.map(project => (
                                        <Dialog key={project.title}>
                                            <DialogTrigger asChild>
                                                <Card className="flex flex-col h-full border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all cursor-pointer group">
                                                    <CardHeader>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="p-2 bg-primary/10 rounded-md w-fit">
                                                                <project.icon className="h-5 w-5 text-primary" />
                                                            </div>
                                                        </div>
                                                        <CardTitle className="leading-tight group-hover:text-primary transition-colors">{project.title}</CardTitle>
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {project.tags.map(tag => (
                                                                <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 font-normal">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="flex-grow">
                                                        <CardDescription className="text-sm leading-relaxed">
                                                            {project.shortDescription}
                                                        </CardDescription>
                                                    </CardContent>
                                                    <CardFooter className="pt-0">
                                                        <span className="text-sm font-medium text-primary flex items-center">
                                                            View Model Logic <ChevronRight className="ml-1 h-3 w-3" />
                                                        </span>
                                                    </CardFooter>
                                                </Card>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[90vw] w-[90vw] max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-card border-border">
                                                <ScrollArea className="h-full max-h-[90vh]">
                                                    <div className="p-6 space-y-8">
                                                        <DialogHeader>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <project.icon className="h-5 w-5 text-primary" />
                                                                <span className="text-sm font-medium text-muted-foreground">{project.category}</span>
                                                            </div>
                                                            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                                                            <DialogDescription className="text-base pt-2">
                                                                {project.fullDescription}
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <div className="space-y-6">
                                                            <div>
                                                                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                                                    <Calculator className="h-4 w-4" /> Technical Methodology
                                                                </h3>
                                                                <ul className="space-y-3">
                                                                    {project.methodology.map((item, i) => (
                                                                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground whitespace-normal break-words">
                                                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                                            <span className="flex-1">{item}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            <div>
                                                                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                                                    <CheckCircle2 className="h-4 w-4" /> Strategic Outcomes
                                                                </h3>
                                                                <ul className="space-y-3">
                                                                    {project.outcomes.map((item, i) => (
                                                                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground whitespace-normal break-words">
                                                                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                                            <span className="flex-1">{item}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {project.code && (
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-4 mt-8">
                                                                        <Code className="h-4 w-4" />
                                                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Model Formulation (Pseudocode)</h3>
                                                                    </div>
                                                                    <CodeWindow
                                                                        title={project.codeTitle || "model_logic.txt"}
                                                                        code={project.code}
                                                                        language="text"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </ScrollArea>
                                            </DialogContent>
                                        </Dialog>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
