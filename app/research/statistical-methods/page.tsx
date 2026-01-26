"use client"

import Link from "next/link"
import { FileText, ChevronRight, Activity, BarChart2, Sigma, Brain, Target, Building, GitBranch, TrendingUp, CheckCircle2, Code, FileSpreadsheet, Calculator, ArrowLeft } from "lucide-react"
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

// Categorized projects data with detailed case study content
const projectsData = [
    {
        title: "Heart Failure Prediction (Logistic Regression)",
        shortDescription: "Modeled mortality risk in 299 heart failure patients using standardized clinical variables.",
        fullDescription: "A comprehensive analysis of 299 patients with heart failure to predict mortality ('Death Event') using 12 clinical features. The study employs Logistic Regression with standardized predictors to identify significant risk factors. Key findings revealed that Serum Creatinine and Ejection Fraction were the strongest predictors of mortality, while 'Time' (follow-up period) showed a strong negative correlation with death events.",
        tags: ["Logistic Regression", "AUC: 0.897", "Healthcare"],
        icon: Activity,
        category: "Classification & Machine Learning",
        methodology: [
            "Standardized 12 clinical features (e.g., Ejection Fraction, Serum Creatinine) to ensure comparable coefficient magnitudes.",
            "modeled 'Death Event' using a Generalized Linear Model (GLM) with binomial family.",
            "Evaluated model performance using Confusion Matrix, ROC-AUC, and F-measure.",
            "Tested assumptions: Linearity in logit, Homoscedasticity of residuals, and Multicollinearity (VIF < 1.4 for all predictors)."
        ],
        outcomes: [
            "Achieved 85.6% overall accuracy with an AUC of 0.897.",
            "Identified 'Time', 'Ejection Fraction', 'Serum Creatinine', and 'Age' as statistically significant predictors (p < .001).",
            "Found 'Time' increase by 1 SD decreases odds of death by ~80.4% (Odds Ratio: 0.196).",
            "Serum Creatinine was finding to be a strong positive predictor (Odds Ratio: 1.987)."
        ],
        theory: "Logistic regression models the log-odds (logit) of a binary outcome as a linear combination of predictor variables. Coefficients represent the change in log-odds for a one-unit increase in the predictor.",
        math: "ln(p / (1-p)) = β₀ + β₁x₁ + ... + βₖxₖ",
        codeTitle: "logistic_fit.R",
        code: `logistic_model <- glm(DEATH_EVENT ~ ., family = "binomial", data = heart_data)

# Significant Predictors identified
summary(logistic_model)
# Coefficients:
# Standardized Time: -1.631 (p < .001)
# Standardized Ejection Fraction: -0.904 (p < .001)
# Standardized Serum Creatinine: 0.687 (p < .001)

# Model Performance
probs <- predict(logistic_model, type = "response")
preds <- ifelse(probs > 0.5, 1, 0)
mean(preds == heart_data$DEATH_EVENT) # 0.856 Accuracy`
    },
    {
        title: "Real Estate Valuation (Linear Regression)",
        shortDescription: "Predicting house prices/unit area in New Taipei City using age, location, and convenience metrics.",
        fullDescription: "This study aims to predict real estate valuation (price per unit area) based on historical market data from Sindian Dist., New Taipei City. Utilizing Simple and Multiple Linear Regression, the analysis compares the predictive power of variables like 'House Age', 'Distance to MRT', and 'Number of Convenience Stores'.",
        tags: ["Linear Regression", "MSE Analysis", "R-Squared"],
        icon: Building,
        category: "Regression Analysis",
        methodology: [
            "Split 414 observations into Training (200) and Test sets for robust validation.",
            "Fitted Simple Linear Regressions for individual predictors (Age, Distance to MRT, Convenience Stores).",
            "Developed a Multiple Linear Regression model combining all predictors.",
            "Compared models using Training MSE, Test MSE, and R-squared values."
        ],
        outcomes: [
            "Found 'House Age' has a negative coefficient (-0.338), meaning older houses are cheaper.",
            "Multiple Regression achieved an R-squared of 0.7827, significantly outperforming single-variable models.",
            "Lowest Test MSE (2535.26) achieved with the comprehensive 3-variable model.",
            "Kitchen Quality ('kit_qual') found to be the single most useful categorical predictor."
        ],
        theory: "Multiple Linear Regression minimizes the Residual Sum of Squares (RSS) to estimate variable coefficients. It assumes linearity, independence, homoscedasticity, and normality of errors.",
        math: "Y = β₀ + β₁X₁ + ... + βₙXₙ + ε",
        codeTitle: "valuation_model.R",
        code: `# Fitting Multiple Linear Regression
fit_all <- lm(Y ~ X2 + X3 + X4, data = valuation_train)

# Interpret Coefficient for House Age (X2)
# Estimate: -0.338
# Interpretation: For every 1 year increase in age, price/ping decreases by ~3,384 TWD.

# MSE Calculation
train_pred <- predict(fit_all, newdata = valuation_train)
test_pred <- predict(fit_all, newdata = valuation_test)
train_mse <- mean((valuation_train$Y - train_pred)^2) # 1309.5
test_mse <- mean((valuation_test$Y - test_pred)^2)   # 2535.2`
    },
    {
        title: "Classification Trees & Pruning",
        shortDescription: "Decision Tree analysis for classifying 'Expensive' vs 'Cheap' properties with cost-complexity pruning.",
        fullDescription: "An application of Decision Trees to classify properties as 'Expensive' or 'Cheap' based on median sale price. The study explores tree growing, cross-validation for optimal tree size, and cost-complexity pruning to prevent overfitting.",
        tags: ["Decision Trees", "Pruning", "Classification"],
        icon: GitBranch,
        category: "Classification & Machine Learning",
        methodology: [
            "Defined binary target 'Expensive' (Price > Median) vs 'Cheap'.",
            "Grew deep classification trees using 'tree' package.",
            "Applied Cost Complexity Pruning with 10-fold Cross-Validation to find optimal tree size.",
            "Compared Decision Tree performance against LDA and QDA models."
        ],
        outcomes: [
            "Optimal pruned tree found to use a single split on 'Overall Quality' (oa_qual > 6.5).",
            "Pruned tree achieved Test MSE of ~2040.",
            "QDA Model outperformed LDA and Tree models with the lowest Test Error (0.177).",
            "Demonstrated that simpler models (pruned trees) often generalize better than complex ones."
        ],
        theory: "Decision Trees recursively partition the feature space to minimize node impurity (Gini Index or Entropy). Pruning introduces a penalty for tree complexity (size) to trade off bias and variance.",
        math: "minimize: Σ (yᵢ - ŷ)² + α|T|",
        codeTitle: "tree_pruning.R",
        code: `# Cross-Validation for Optimal Tree Size
cv_tree <- cv.tree(tree_fit, FUN = prune.misclass)
best_size <- cv_tree$size[which.min(cv_tree$dev)]

# Pruning the Tree
pruned_model <- prune.misclass(tree_fit, best = best_size)

# Compare with QDA
qda_fit <- qda(expensive ~ ., data = train_data)
qda_pred <- predict(qda_fit, test_data)$class
mean(qda_pred != test_data$expensive) # 0.177 Error`
    },
    {
        title: "Regularization: Ridge vs Lasso",
        shortDescription: "Comparative study of shrinkage methods to handle multicollinearity and perform feature selection.",
        fullDescription: "This study compares Ridge Regression (L2 penalty) and Lasso Regression (L1 penalty) on the housing dataset. It demonstrates how regularization techniques can effectively handle multicollinearity and perform automatic variable selection compared to standard OLS.",
        tags: ["Ridge", "Lasso", "Regularization"],
        icon: Sigma,
        category: "Regression Analysis",
        methodology: [
            "Standardized predictors to ensure fair penalty application.",
            "Fitted Ridge models across a range of lambda (λ) values.",
            "Fitted Lasso models to visualize coefficient shrinkage and variable selection.",
            "Used Cross-Validation to select optimal λ that minimizes MSE."
        ],
        outcomes: [
            "Lasso successfully shrunk less important coefficients exactly to zero (Feature Selection).",
            "Ridge Regression maintained all variables but reduced their magnitude to control variance.",
            "Demonstrated the Bias-Variance tradeoff: increasing λ increases bias but decreases variance.",
            "Both methods improved prediction stability compared to unregularized OLS in high dimensions."
        ],
        theory: "Regularization adds a penalty term to the loss function. Ridge uses L2 norm (squared magnitude) shrinking coefficients. Lasso uses L1 norm (absolute value) capable of shrinking coefficients to zero.",
        math: "Lasso: RSS + λΣ|βⱼ|  vs  Ridge: RSS + λΣβⱼ²",
        codeTitle: "regularization.R",
        code: `# Glmnet for Ridge (alpha=0) and Lasso (alpha=1)
grid <- 10^seq(10, -2, length=100)

# Ridge Regression
ridge_mod <- glmnet(x, y, alpha=0, lambda=grid)
cv_ridge <- cv.glmnet(x, y, alpha=0)
best_lambda_ridge <- cv_ridge$lambda.min

# Lasso Regression
lasso_mod <- glmnet(x, y, alpha=1, lambda=grid)
plot(lasso_mod) # Visualizing coefficient paths`
    },
    {
        title: "Descriptive Statistics & Sampling",
        shortDescription: "Exploratory analysis of variance, distributions, and Central Limit Theorem demonstrations.",
        fullDescription: "A foundational statistical analysis focusing on descriptive measures, visualizations, and sampling distributions. The study involves calculating variances, plotting histograms with custom binning, and generating random normal distributions to verify theoretical properties.",
        tags: ["Descriptive Stats", "Sampling", "Distributions"],
        icon: FileSpreadsheet,
        category: "Foundational Statistics",
        methodology: [
            "Calculated Population vs Sample Variance (n vs n-1 denominator).",
            "Generated histograms with controlled bin sizes to analyze distribution shape.",
            "Simulated random sampling from Standard Normal Distribution (rnorm).",
            "Verified Central Limit Theorem via matrix sampling."
        ],
        outcomes: [
            "Demonstrated the difference between biased (Population) and unbiased (Sample) variance estimators (0.3 vs 0.375).",
            "Visualized 'Living Area' distribution using 15-bin histograms.",
            "Generated 90 random data points (matrix 9x10) to test matrix indexing and sampling properties.",
            "Confirmed properties of the Normal Distribution (Mean=0, SD=1) through simulation."
        ],
        theory: "The sample variance uses (n-1) in the denominator to be an unbiased estimator of the population variance. The Central Limit Theorem states that the distribution of sample means approaches normality as n increases.",
        math: "s² = Σ(xᵢ - x̄)² / (n - 1)",
        codeTitle: "stats_basics.R",
        code: `# Population vs Sample Variance
pop_var <- sum((x - mean(x))^2) / length(x) # 0.3
samp_var <- var(x)                      # 0.375

# Histogram with 15 bins
hist(sahp$liv_area, breaks = 15, main = "Living Area Distribution")

# Random Normal Simulation
set.seed(1)
matrix_data <- matrix(rnorm(90), nrow = 9, ncol = 10)`
    }
]

// Group projects by category
const categories = [
    {
        title: "Regression Analysis",
        description: "Modeling relationships between dependent and independent variables.",
        icon: TrendingUp,
        projects: projectsData.filter(p => p.category === "Regression Analysis")
    },
    {
        title: "Classification & Machine Learning",
        description: "Algorithms for categorizing data into discrete classes.",
        icon: Brain,
        projects: projectsData.filter(p => p.category === "Classification & Machine Learning")
    },
    {
        title: "Foundational Statistics",
        description: "Core concepts establishing the mathematical basis for analysis.",
        icon: Sigma,
        projects: projectsData.filter(p => p.category === "Foundational Statistics")
    }
];

export default function StatisticalMethodsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-32 pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Header */}
                    <div className="mb-16">
                        <Link
                            href="/#research"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Research
                        </Link>

                        <div className="space-y-4">
                            <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                                Technical Library
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                                Statistical Methods & Analysis
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
                                A curated collection of technical case studies demonstrating proficiency in fundamental
                                and advanced statistical algorithms, regression modeling, and machine learning techniques.
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
                                                            View Case Study <ChevronRight className="ml-1 h-3 w-3" />
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
                                                                <span className="text-sm font-medium text-muted-foreground">{project.tags[0]}</span>
                                                            </div>
                                                            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                                                            <DialogDescription className="text-base pt-2">
                                                                {project.fullDescription}
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <div className="space-y-6">
                                                            <div>
                                                                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                                                    <Calculator className="h-4 w-4" /> Methodology
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
                                                                    <CheckCircle2 className="h-4 w-4" /> Key Outcomes
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

                                                            {project.theory && (
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-4">
                                                                        <Brain className="h-4 w-4" />
                                                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Theoretical Framework</h3>
                                                                    </div>
                                                                    <div className="space-y-4">
                                                                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal break-words">
                                                                            {project.theory}
                                                                        </p>
                                                                        {project.math && (
                                                                            <div className="bg-secondary/30 p-4 rounded-lg font-mono text-sm text-muted-foreground text-center border border-border/50 break-all whitespace-normal">
                                                                                {project.math}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {project.code && (
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-4 mt-8">
                                                                        <Code className="h-4 w-4" />
                                                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Example Code</h3>
                                                                    </div>
                                                                    <CodeWindow
                                                                        title={project.codeTitle || "analysis.R"}
                                                                        code={project.code}
                                                                        language="r"
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
