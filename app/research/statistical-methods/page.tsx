"use client"

import Link from "next/link"
import { FileText, ChevronRight, Activity, BarChart2, Sigma, Brain, Target, Building, GitBranch, TrendingUp, CheckCircle2, Code, FileSpreadsheet, Calculator, ArrowLeft, Database, Search } from "lucide-react"
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

// Categorized projects data based on the 7 provided R Markdown files
const projectsData = [
    {
        title: "Variable Selection & Regularization",
        shortDescription: "High-dimensional regression using Lasso, Ridge, and Best Subset Selection.",
        fullDescription: "Addressing the 'Curse of Dimensionality' in a dataset with 20 predictors and 300 observations. This study applies shrinkage methods (Ridge, Lasso) and subset selection algorithms (Best Subset, Stepwise) to identify sparse signals and prevent overfitting in high-dimensional space.",
        tags: ["Lasso", "Ridge", "Best Subset", "BIC"],
        icon: Search,
        category: "Model Selection & Validation",
        methodology: [
            "Comparisons of Best Subset Selection (BIC) vs Forward/Backward Stepwise.",
            "Implemented Ridge Regression (L2 penalty) to handle multicollinearity.",
            "Implemented Lasso Regression (L1 penalty) for automatic feature selection.",
            "Verified true signals against known generated coefficients (simulation study)."
        ],
        outcomes: [
            "Best Subset (BIC) correctly identified 9 true predictors and excluded noise.",
            "Lasso successfully zeroed out most noise variables compared to Ridge.",
            "Forward Stepwise (Adj R2) tended to include more noise variables than BIC.",
            "Proven that Ridge coefficients shrink but never reach zero, while Lasso performs variable selection."
        ],
        codeTitle: "regularization_analysis.R",
        code: `library(tidyverse)
n <- 300
p <- 20
set.seed(111)
x <- matrix(rnorm(n*p), n, p)
beta <- rep(0, p)
beta[seq(1, 19, 2)] = seq(from = 0.1, to = 1, by = 0.1)
y <- x %*% beta + rnorm(n)
dat <- data.frame(x = x, y = y)
colnames(dat) <- c(paste0("x", 1:p), "y")
tr_dat <- dat[1:(n/2), ]
te_dat <- dat[-(1:(n/2)), ]

library(leaps)
# Define a 'predict' method for 'regsubsets' objects
predict.regsubsets <- function(object, newdata, id) {
  form <- as.formula(object$call[[2]])
  mat <- model.matrix(form, newdata)
  coefs <- coef(object, id = id)
  vars <- names(coefs)
  mat[, vars] %*% coefs
}

###################################
# a. Best Subset Selection with BIC
###################################
best_subset <- regsubsets(y ~ ., 
                          data = tr_dat, 
                          nvmax = 20)
best_subset_sum <- summary(best_subset)

best_id <- which.min(best_subset_sum$bic)

best_coef <- coef(best_subset, best_id)

# Best Subset Selection (BIC) Coefficients
best_coef
pred_bic <- predict(best_subset, 
                    newdata = te_dat, 
                    id = best_id)
# Compute test errors
mse_bic <- mean((te_dat$y - pred_bic)^2)
mse_bic

########################################
# b. Forward Stepwise Selection with R^2
########################################
forward_fit <- regsubsets(y ~ .,
                          data = tr_dat,
                          method = "forward",
                          nvmax = 20)
forward_sum <- summary(forward_fit)

best_id_adjr2 <- which.max(forward_sum$adjr2)

forward_coef <- coef(forward_fit, best_id_adjr2)

# Forward Stepwise (Adj R^2) Coefficients
forward_coef
pred_forward <- predict(forward_fit, 
                    newdata = te_dat, 
                    id = best_id_adjr2)

# Compute test errors
mse_forward <- mean((te_dat$y - pred_forward)^2)
mse_forward

########################################
# c. Backward Stepwise Selection with Cp
########################################
backward_fit <- regsubsets(y ~ .,
                          data = tr_dat,
                          method = "backward",
                          nvmax = 20)
backward_sum <- summary(backward_fit)

best_id_cp <- which.min(backward_sum$cp)

backward_coef <- coef(backward_fit, best_id_cp)

# Backward Stepwise (Cp) Coefficients
backward_coef
pred_backward <- predict(backward_fit, 
                    newdata = te_dat, 
                    id = best_id_cp)
# Compute test errors
mse_backward <- mean((te_dat$y - pred_backward)^2)
mse_backward

######################################
# d. Ridge Regression with 10-fold CV
######################################
library(glmnet)
set.seed(0)

x_tr <- model.matrix(y ~ .,
                     data = tr_dat)[, -1]
x_te <- model.matrix(y ~ .,
                     data = te_dat)[, -1]
y_tr <- tr_dat$y
y_te <- te_dat$y

cv_fit_ridge <- cv.glmnet(x_tr,
                          y_tr,
                          alpha = 0)
ridge_coef <- coef(cv_fit_ridge)

# Ridge Regression Coefficients
ridge_coef
pred_ridge <- predict(cv_fit_ridge, 
                      newx = x_te)
# Compute test errors 
mse_ridge <- mean((te_dat$y - pred_ridge)^2)
mse_ridge

################################
# e. Lasso with with 10-fold CV
################################
set.seed(0)
cv_fit_lasso <- cv.glmnet(x_tr,
                          y_tr,
                          alpha = 1)

lasso_coef <- coef(cv_fit_lasso)

# Lasso Coefficients
lasso_coef
pred_lasso <- predict(cv_fit_lasso, 
                      newx = x_te)

# Compute test errors
mse_lasso <- mean((te_dat$y - pred_lasso)^2)
mse_lasso`
    },
    {
        title: "Tree-Based Methods (Decision Trees)",
        shortDescription: "Growing and pruning Classification and Regression Trees (CART).",
        fullDescription: "A study on Tree-based methods using Cost-Complexity Pruning to find optimal tree size. The analysis involves growing deep trees for both regression (Price) and classification (Type), then using Cross-Validation to prune them back to the most generalizable structure.",
        tags: ["Decision Trees", "Pruning", "Cost-Complexity"],
        icon: GitBranch,
        category: "Classification & Machine Learning",
        methodology: [
            "Grew deep regression trees using `tree.control`.",
            "Applied Cost Complexity Pruning optimization via `cv.tree`.",
            "Visualized relationship between Tree Size and Deviance (CV Error).",
            "Interpreted final tree splits (e.g., Overall Quality > 6.5)."
        ],
        outcomes: [
            "Pruning identified a single-split tree as optimal, avoiding overfitting.",
            "Overall Quality (oa_qual) identified as the most dominant feature.",
            "Demonstrated that simpler trees often generalize better than complex deep trees.",
            "Visualized final decision boundaries for interpretability."
        ],
        codeTitle: "tree_based_methods.R",
        code: `library(r02pro)
library(tidyverse)
library(MASS)
my_ahp <- ahp %>%
  dplyr::select(gar_car, liv_area, oa_qual, sale_price) %>%
  na.omit() %>%
  mutate(type = factor(ifelse(sale_price > median(sale_price), "Expensive", "Cheap")))
tr_ind <- 1:(nrow(my_ahp)/20)
my_ahp_train <- my_ahp[tr_ind, ]
my_ahp_test <- my_ahp[-tr_ind, ]

# Q1: Regression Tree
library(tree)
n <- nrow(my_ahp_train)
my_control <- tree.control(nobs = n, minsize = 2, mindev = 0)
tree_fit <- tree(sale_price ~ gar_car + liv_area + oa_qual,
                 control = my_control,
                 data = my_ahp_train)

# (a) Plot CV error vs Tree size
set.seed(0)
cv_sal_tree <- cv.tree(tree_fit)

best_size <- with(cv_sal_tree, min(size[dev == min(dev)]))

ggplot(data.frame(size = cv_sal_tree$size,
                  mse = cv_sal_tree$dev/n),
       mapping = aes(x = size, y = mse)) +
  geom_point(size = 2) +
  geom_line() +
  geom_vline(xintercept = best_size, col = "red")

# (b) Prune Tree
sal_tree_final <- prune.tree(tree_fit, best = best_size)

plot(sal_tree_final)
text(sal_tree_final)

# (c) Training and Test MSE
pred_tr <- predict(sal_tree_final,
                    newdata = my_ahp_train)
pred_te <- predict(sal_tree_final,
                   newdata = my_ahp_test)

mse_tr <- mean((pred_tr - my_ahp_train$sale_price)^2)
mse_te <- mean((pred_te - my_ahp_test$sale_price)^2)

mse_tr
mse_te

# Q2: Classification Tree
sal_tree <- tree(type ~ gar_car + 
                   liv_area + 
                   oa_qual,
                 data = my_ahp_train)

set.seed(0)
cv_sal_tree <- cv.tree(sal_tree,
                       method = "misclass")

best_size <- with(cv_sal_tree,
                  min(size[dev == min(dev)]))

sal_tree_final <- prune.tree(sal_tree,
                             best = best_size,
                             method = "misclass")

plot(sal_tree_final)
text(sal_tree_final)`
    },
    {
        title: "Classification Boundaries & ROC Analysis",
        shortDescription: "Benchmarking LDA, QDA, Logistic Regression, and Standardized KNN via ROC/AUC.",
        fullDescription: "A comprehensive comparison of linear and non-linear classification boundaries. This project visualizes ROC curves and calculates AUC (Area Under Curve) to benchmark Logistic Regression against Discriminant Analysis (LDA/QDA) and Distance-based methods (KNN), explicitly testing the impact of feature standardization.",
        tags: ["ROC / AUC", "LDA vs QDA", "Standardization"],
        icon: Activity,
        category: "Classification & Machine Learning",
        methodology: [
            "Fitted Logistic, LDA, QDA, and KNN (K=39) models.",
            "Standardized predictors using `caret::preProcess` to normalize scales for KNN.",
            "Generated ROC Curves to visualize True Positive vs False Positive rates.",
            "Calculated AUC scores to rank model performance."
        ],
        outcomes: [
            "LDA achieving highest AUC (~0.912), suggesting linear decision boundaries fit the data well.",
            "Effect of Standardization: Scaled KNN outperformed raw KNN significantly.",
            "QDA (0.903) did not outperform linear methods, indicating lack of high-variance non-linear decision boundaries.",
            "All methods achieved high predictive power (AUC > 0.90)."
        ],
        codeTitle: "classification_roc_auc.R",
        code: `library(r02pro)
library(tidyverse)
library(MASS)
library(caret)
library(pROC)

my_sahp <- sahp %>% 
  na.omit() %>%
  mutate(expensive = sale_price > median(sale_price)) %>%
  mutate(expensive = as.factor(expensive)) %>%
  dplyr::select(gar_car, liv_area, oa_qual, expensive) 

# Q1: Fit 4 models and visualizing ROC
# Logistic Regression
log_f <- glm(expensive ~., 
             data = my_sahp, 
             family = "binomial")
log_p <- predict (log_f, 
                  type="response")
# LDA
lda_f <- lda(expensive ~., 
             data = my_sahp)
lda_p <- predict(lda_f)$posterior[,2]
# QDA
qda_f <- qda(expensive~., 
             data = my_sahp)
qda_p <- predict(qda_f)$posterior[,2]
# Standardized KNN (K=39)
fit_std <- preProcess(my_sahp, method = "scale")
my_sahp_std<-predict(fit_std,newdata=my_sahp)

knn_f <-knn3(expensive~., 
             data=my_sahp_std, 
             k=39)
knn_p <- predict(knn_f, newdata=my_sahp_std, type="prob")[,2]

# Visualize ROC curves and add AUC to the legend
log_roc <- roc(my_sahp$expensive, log_p)
log_auc <- auc(log_roc)

lda_roc <- roc(my_sahp$expensive, lda_p)
lda_auc <- auc(lda_roc)

qda_roc <- roc(my_sahp$expensive, qda_p)
qda_auc <- auc(qda_roc)

knn_roc <- roc(my_sahp$expensive, knn_p)
knn_auc <- auc(knn_roc)

models_roc <- list(Logistic = log_roc,
                   LDA = lda_roc,
                   QDA = qda_roc,
                   kNN = knn_roc)
methods_auc <- paste(c("Logistic",
                       "LDA","QDA","KNN"),
        "AUC =",
        round(c(log_auc, lda_auc, qda_auc, knn_auc), 4))
ggroc(models_roc, linewidth = 1, alpha = 0.5)+
  scale_color_discrete(labels = methods_auc)+
  ggtitle(paste("ROC using logistic, LDA, QDA, and KNN"))

# Q2: Validation Set Approach
n <- nrow(my_sahp)
set.seed(1)
tr_ind <- sample(n, round(n/2))
sahp_tr <- my_sahp[tr_ind,]
sahp_val <- my_sahp[-tr_ind,]

# Logistic
c_labels <- levels(my_sahp$expensive)
log_fit <- glm(expensive~., data = sahp_tr, family = binomial)
log_prob <- predict(log_fit, newdata = sahp_val, type = "response")
log_pred <- ifelse(log_prob > 0.5, c_labels[2], c_labels[1])

# LDA
lda_fit <- lda(expensive~., data = sahp_tr)
lda_pred <- predict(lda_fit, newdata = sahp_val)$class

# QDA
qda_fit <- qda(expensive~., data = sahp_tr)
qda_pred <- predict(qda_fit, newdata = sahp_val)$class

# KNN (K=39)
knn_fit <- knn3(expensive~., data = sahp_tr, k = 39)
knn_pred <- predict(knn_fit, newdata = sahp_val, type = "class")

# KNN (Standardized, K=39)
fit_std <- preProcess(sahp_tr, method = "scale")
sahp_tr_std <- predict(fit_std, newdata = sahp_tr)
sahp_val_std <- predict(fit_std, newdata = sahp_val)

knn_std_fit <- knn3(expensive~., data = sahp_tr_std, k = 39)
knn_std_pred <- predict(knn_std_fit, 
                        newdata = sahp_val_std, 
                        type = "class")

# Validation errors
cv_error_seq <- c(
  Logistic = mean(log_pred != sahp_val$expensive),
  LDA = mean(lda_pred != sahp_val$expensive),
  QDA = mean(qda_pred != sahp_val$expensive),
  KNN = mean(knn_pred != sahp_val$expensive),
  KNN_std = mean(knn_std_pred != sahp_val$expensive)
)
cv_error_seq
names(which.min(cv_error_seq))`
    },
    {
        title: "Logistic Regression & Cross-Validation",
        shortDescription: "Robust error estimation using LOOCV, k-Fold, and Validation Set approaches.",
        fullDescription: "This study focuses on classification ('Expensive' vs 'Cheap') and rigorous model evaluation. It implements and compares three Cross-Validation techniques: Validation Set Approach, Leave-One-Out Cross-Validation (LOOCV), and k-Fold Cross-Validation, to determine the most reliable test error estimate for Logistic Regression, LDA, QDA, and KNN.",
        tags: ["Cross-Validation", "Logistic Regression", "LOOCV"],
        icon: Target,
        category: "Model Selection & Validation",
        methodology: [
            "Split data into Training/Validation sets to compute baseline error.",
            "Implemented LOOCV loop to train n models (n=observation count) for unbiased error estimation.",
            "Performed 5-Fold Cross-Validation for computational efficiency.",
            "Compared stability of error estimates across different validation concepts."
        ],
        outcomes: [
            "Logistic Regression and LDA tied for lowest LOOCV error (~17.9%).",
            "QDA performed best in 5-Fold Cross-Validation (Error: 0.185).",
            "Demonstrated that 'Standardized' KNN significantly outperforms raw KNN.",
            "LOOCV found to provide the most unbiased estimate of test error but at high computational cost."
        ],
        codeTitle: "cross_validation_loo_kfold.R",
        code: `library(r02pro)    
library(tidyverse)
library(MASS)
library(caret)

my_sahp <- sahp %>% 
  na.omit() %>%
  mutate(expensive = sale_price > median(sale_price)) %>%
  dplyr::select(gar_car, liv_area, oa_qual, expensive) 
my_sahp_train <- my_sahp[1:100, ]
my_sahp_test <- my_sahp[-(1:100), ]

# Preparing data
my_sahp_train$expensive <- as.factor(my_sahp_train$expensive)
my_sahp_test$expensive <- as.factor(my_sahp_test$expensive)
class_labels <- levels(my_sahp_train$expensive)
c0 <- class_labels[1]
c1 <- class_labels[2]

# Q1.a: Individual Logistic Regressions
# Garage
glm_expensive_gar <- glm(expensive ~ gar_car, data = my_sahp_train, family = "binomial")
pred_gar_te <- predict(glm_expensive_gar, newdata = my_sahp_test, type = "response")
pred_gar_test_label <- ifelse(pred_gar_te > 0.5, c1, c0)
gar_te_error <- mean(pred_gar_test_label != my_sahp_test$expensive)

# Living Area
glm_expensive_liv <- glm(expensive ~ liv_area, data = my_sahp_train, family = "binomial")
pred_liv_te <- predict(glm_expensive_liv, newdata = my_sahp_test, type = "response")
pred_liv_test_label <- ifelse(pred_liv_te > 0.5, c1, c0)
liv_te_error <- mean(pred_liv_test_label != my_sahp_test$expensive)

# Overall Quality
glm_expensive_oa <- glm(expensive ~ oa_qual, data = my_sahp_train, family = "binomial")
pred_oa_te <- predict(glm_expensive_oa, newdata = my_sahp_test, type = "response")
pred_oa_test_label <- ifelse(pred_oa_te > 0.5, c1, c0)
oa_te_error <- mean(pred_oa_test_label != my_sahp_test$expensive)

# Dataframe of errors
data.frame(Variables = c("gar_car", "liv_area", "oa_qual"),
           Test_error = c(gar_te_error, liv_te_error, oa_te_error))

# Q1.b: All Variables Logistic Regression
glm_expensive_all <- glm(expensive ~ gar_car + liv_area + oa_qual, data = my_sahp_train, family = "binomial")
pred_all_te <- predict(glm_expensive_all, newdata = my_sahp_test, type = "response")
pred_all_test_label <- ifelse(pred_all_te > 0.5, c1, c0)
all_te_error <- mean(pred_all_test_label != my_sahp_test$expensive)

# Q2: LDA & QDA
# LDA
lda_expensive_all <- lda(expensive ~ gar_car + liv_area + oa_qual, data = my_sahp_train)
lda_pred_test <- predict(lda_expensive_all, newdata = my_sahp_test)
lda_te_error <- mean(lda_pred_test$class != my_sahp_test$expensive)

# QDA
qda_expensive_all <- qda(expensive ~ gar_car + liv_area + oa_qual, data = my_sahp_train)
qda_test_label <- predict(qda_expensive_all, newdata = my_sahp_test)$class
qda_te_error <- mean(qda_test_label != my_sahp_test$expensive)

# Q2b: LOOCV approach
log_seq <- factor(levels = class_labels)
lda_seq <- factor(levels = class_labels)
qda_seq <- factor(levels = class_labels)
knn_seq <- factor(levels = class_labels)
knnstd_seq <- factor(levels = class_labels)

n <- nrow(my_sahp)
for (j in 1:n){
  sahp_tr <- my_sahp[-j,]
  sahp_te <- my_sahp[j,]
  
  # Logistic
  log_fit <- glm(expensive~., data = sahp_tr, family = "binomial")
  log_prob <- predict(log_fit, newdata = sahp_te, type = "response")
  log_seq[j] <- ifelse(log_prob>0.5,c1,c0)

  # LDA
  lda_fit <- lda(expensive~., data = sahp_tr)
  lda_seq[j] <- predict(lda_fit, sahp_te)$class

  # QDA
  qda_fit <- qda(expensive~., data = sahp_tr)
  qda_seq[j] <- predict(qda_fit, sahp_te)$class

  # KNN (K=39)
  knn_fit <- knn3(expensive~., data = sahp_tr, k=39)
  knn_seq[j] <- predict(knn_fit, sahp_te, type="class")

  # Standardized KNN
  fit_std <- preProcess(sahp_tr, method = "scale")
  sahp_tr_std <- predict(fit_std, sahp_tr)
  sahp_te_std <- predict(fit_std, sahp_te)
  knnstd_fit <- knn3(expensive ~., data = sahp_tr_std, k=39)
  knnstd_seq[j] <- predict(knnstd_fit, sahp_te_std, type="class")
}

# LOOCV errors
cv_err_loocv <- c(
  logistic = mean(log_seq != my_sahp$expensive),
  LDA = mean(lda_seq != my_sahp$expensive),
  QDA = mean(qda_seq != my_sahp$expensive),
  KNN = mean(knn_seq != my_sahp$expensive),
  KNN_std = mean(knnstd_seq != my_sahp$expensive)
)
cv_err_loocv

# Q2c: 5-Fold CV
log_seq_fold <- factor(levels = class_labels)
lda_seq_fold <- factor(levels = class_labels)
qda_seq_fold <- factor(levels = class_labels)
knn_seq_fold <- factor(levels = class_labels)
knnstd_seq_fold <- factor(levels = class_labels)

K <- 5
set.seed(1)
fold_ind <- sample(rep_len(1:K, n))

for(k in 1:K){
  sahp_tr <- my_sahp[fold_ind != k,]
  sahp_te <- my_sahp[fold_ind == k,]
  
  # Logistic
  log_fit <- glm(expensive ~., data = sahp_tr, family=binomial)
  log_prob <- predict(log_fit, newdata=sahp_te, type="response")
  log_seq_fold[fold_ind==k] <-ifelse(log_prob>0.5,c1,c0)

  # LDA
  lda_fit <- lda(expensive~., data = sahp_tr)
  lda_seq_fold[fold_ind == k] <- predict(lda_fit, sahp_te)$class

  # QDA
  qda_fit <- qda(expensive~., data = sahp_tr)
  qda_seq_fold[fold_ind==k] <- predict(qda_fit, sahp_te)$class

  # KNN 
  knn_fit <- knn3(expensive~., data = sahp_tr, k=39)
  knn_seq_fold[fold_ind==k] <- predict(knn_fit,sahp_te,type="class")

  # Standardized KNN
  fit_std <- preProcess(sahp_tr, method="scale")
  sahp_tr_std <- predict(fit_std, sahp_tr)
  sahp_te_std <- predict(fit_std, sahp_te)
  knnstd_fit <- knn3(expensive~., data = sahp_tr_std,k=39)
  knnstd_seq_fold[fold_ind==k] <- predict(knnstd_fit, sahp_te_std, type="class")
}

cv_err_fold <- c(
  Logistic = mean(log_seq_fold != my_sahp$expensive),
  LDA = mean(lda_seq_fold != my_sahp$expensive),
  QDA = mean(qda_seq_fold != my_sahp$expensive),
  KNN = mean(knn_seq_fold != my_sahp$expensive),
  KNN_std = mean(knnstd_seq_fold != my_sahp$expensive)
)
cv_err_fold`
    },
    {
        title: "Taipei Real Estate Valuation (Comprehensive)",
        shortDescription: "A comprehensive end-to-end analysis comparing Parametric vs Non-Parametric methods.",
        fullDescription: "An integrated final analysis of the Taipei Real Estate dataset. This study pits Multiple Linear Regression against optimized KNN models to predict property values per unit area ('Ping'). It involves rigorous interpretation of coefficients, geospatial analysis, and model optimization.",
        tags: ["Multiple Regression", "KNN Optimization", "Real Estate"],
        icon: Building,
        category: "Regression Analysis",
        methodology: [
            "Geospatial check of observations (Latitude/Longitude).",
            "Fitted Multiple Linear Model (Age + MRT Distance + Convenience Stores).",
            "Optimized KNN Regression (K=1 to 20) against Linear baseline.",
            "Interpreted coefficients in real-currency terms (New Taiwan Dollar)."
        ],
        outcomes: [
            "Distance to MRT (X3) found to be the strongest single predictor.",
            "KNN (K=2) achieved a lower Test MSE (81.09) than Linear Regression (100.02).",
            "Quantified value of convenience: +$12,502 per nearby store.",
            "Quantified depreciation: -$3,064 per year of house age."
        ],
        codeTitle: "comprehensive_valuation.R",
        code: `# Load dataset and split
valuation <- read.csv("C:/Users/Lizi/Downloads/valuation.csv")
valuation_train <- valuation[1:200, ]
valuation_test <- valuation[-(1:200), ]

# Q1.b: Simple Linear Regression (House Age)
Y_X2 <- lm(Y~X2, data = valuation_train)
summary(Y_X2)
# MSE
train_pred <- predict(Y_X2, newdata = valuation_train)
train_mse_X2 <- mean((valuation_train$Y - train_pred)^2)
test_pred <- predict(Y_X2, newdata = valuation_test)
test_mse_X2 <- mean((valuation_test$Y - test_pred)^2)

# Q1.c: Compare X2, X3, X4
Y_X3 <- lm(Y~X3, data = valuation_train)
test_pred_X3 <- predict(Y_X3, newdata = valuation_test)
test_mse_X3 <- mean((valuation_test$Y - test_pred_X3)^2)

Y_X4 <- lm(Y~X4, data = valuation_train)
test_pred_X4 <- predict(Y_X4, newdata = valuation_test)
test_mse_X4 <- mean((valuation_test$Y - test_pred_X4)^2)

# Q1.d: Multiple Linear Regression
Y_X2X3X4 <- lm(Y~X2+X3+X4, data = valuation_train)
summary(Y_X2X3X4)
# MSE
train_pred <- predict(Y_X2X3X4, newdata = valuation_train)
train_mse_X2X3X4 <- mean((valuation_train$Y - train_pred)^2)
test_pred <- predict(Y_X2X3X4, newdata = valuation_test)
test_mse_X2X3X4 <- mean((valuation_test$Y - test_pred)^2)

# Q1.e: KNN Optimization
library(caret)
k_seq <- 1:20
mse_seq_tr <- mse_seq_te <- NULL

for (i in seq_along(k_seq)) {
  fit <- knnreg(
    Y~X2+X3+X4,
    data = valuation_train,
    k = k_seq[i]
  )
  #Training MSE
  train_pred <- predict(fit, newdata = valuation_train)
  mse_seq_tr[i] <- mean((valuation_train$Y - train_pred)^2)
                        
  #Test MSE
  test_pred <- predict(fit, newdata = valuation_test)
  mse_seq_te[i] <- mean((valuation_test$Y - test_pred)^2)
}

library(ggplot2)
mse_stacked <- rbind(
  data.frame(k = k_seq, mse = mse_seq_tr, type = "train"),
  data.frame(k = k_seq, mse = mse_seq_te, type = "test")
)

ggplot(mse_stacked, aes(x = k, y = mse, color = type)) +
  geom_line(linewidth = 1) +
  geom_point()

min_test_mse <- min(mse_seq_te)
best_k <-k_seq[which.min(mse_seq_te)] # Best K = 2

# Q2: Iris Species Classification (Logistic, LDA, QDA)
data(iris)
iris <- droplevels(iris[which(iris$Species != "setosa"), ]) # remove setosa
set.seed(1)
iris[, 1:4] <- iris[, 1:4] + rnorm(400) # add some noise
iris_train <- iris[c(1:30, 51:80),]
iris_test <- iris[c(31:50, 81:100),]

# Logistic
log_fit <- glm(Species ~ Sepal.Length + Sepal.Width + Petal.Length + Petal.Width,
  data = iris_train, family = "binomial")
log_test_prob <- predict(log_fit, newdata = iris_test, type = "response")
class_labels <- levels(iris_train$Species)
log_test_label <- ifelse(log_test_prob > 0.5, class_labels[2], class_labels[1])
log_test_error <- mean(log_test_label != iris_test$Species)

# LDA
library(MASS)
lda_fit <- lda(Species ~ Sepal.Length + Sepal.Width + Petal.Length + Petal.Width, data = iris_train)
lda_test_pred <- predict(lda_fit, newdata = iris_test)
lda_test_error <- mean(lda_test_pred$class != iris_test$Species)

# QDA
qda_fit <- qda(Species ~ Sepal.Length + Sepal.Width + Petal.Length + Petal.Width, data = iris_train)
qda_test_pred <- predict(qda_fit, newdata = iris_test)
qda_test_error <- mean(qda_test_pred$class != iris_test$Species)`
    },
    {
        title: "Linear Regression & KNN Analysis",
        shortDescription: "Improving housing price predictions using Multiple Linear Regression and KNN.",
        fullDescription: "A comparative study predicting housing prices ('sale_price') using simple usage of Linear Regression versus K-Nearest Neighbors (KNN). The analysis progresses from single-variable models to multiple regression, and finally to non-parametric KNN, evaluating performance via Training vs. Test MSE.",
        tags: ["Linear Regression", "KNN", "MSE Analysis"],
        icon: TrendingUp,
        category: "Regression Analysis",
        methodology: [
            "Fitted Simple Linear Regressions for individual predictors (Garage, Living Area, Kitchen Quality).",
            "Developed Multiple Linear Regression model combined all predictors.",
            "Implemented KNN Regression, optimizing 'K' from 1 to 50.",
            "Compared Training MSE vs. Test MSE to identify overfitting/underfitting."
        ],
        outcomes: [
            "Multiple Regression (R² = 0.78) significantly outperformed single-variable models.",
            "Found 'Kitchen Quality' to be the strongest individual predictor (R² = 0.60).",
            "KNN (K=9) achieved separate optimal balance, though Linear Regression generalized better for this specific dataset.",
            "Highlighted the trade-off: predictors fitting training data well don't always generalize to test data."
        ],
        codeTitle: "linear_regression_knn.R",
        code: `library(r02pro)     #INSTALL IF NECESSARY
library(tidyverse)  #INSTALL IF NECESSARY
my_sahp <- sahp %>% 
  na.omit() %>%
  dplyr::select(gar_car, liv_area, kit_qual, sale_price)
my_sahp_train <- my_sahp[1:100, ]
my_sahp_test <- my_sahp[-(1:100), ]

# Q1.a: Simple Linear Regression on each variable
# Garage
fit_sale_price_gar_car <- lm(sale_price~gar_car, data= my_sahp_train)
summary(fit_sale_price_gar_car)

# Living Area
fit_sale_price_liv_area <- lm(sale_price~liv_area, data= my_sahp_train)
summary(fit_sale_price_liv_area)

# Kitchen Quality
my_sahp_train$kit_qual <- factor(my_sahp_train$kit_qual, levels=c("Fair", "Average", "Good", "Excellent"))
fit_sale_price_kit_qual <- lm(sale_price~kit_qual, data= my_sahp_train)
summary(fit_sale_price_kit_qual)

# Q1.b: MSE (Train & Test) for each
# Garage
pred_gar_car_train <- predict(fit_sale_price_gar_car, newdata = my_sahp_train)
pred_gar_car_test <- predict(fit_sale_price_gar_car, newdata = my_sahp_test)
mse_gar_car_train <- mean((pred_gar_car_train - my_sahp_train$sale_price)^2)
mse_gar_car_test <- mean((pred_gar_car_test - my_sahp_test$sale_price)^2)

# Living Area
pred_liv_area_train <- predict(fit_sale_price_liv_area, newdata = my_sahp_train)
pred_liv_area_test <- predict(fit_sale_price_liv_area, newdata = my_sahp_test)
mse_liv_area_tain <- mean((pred_liv_area_train - my_sahp_train$sale_price)^2)
mse_live_area_test <- mean((pred_liv_area_test - my_sahp_test$sale_price)^2)

# Kitchen Quality
pred_kit_qual_train <- predict(fit_sale_price_kit_qual, newdata = my_sahp_train)
pred_kit_qual_test <- predict(fit_sale_price_kit_qual, newdat = my_sahp_test)
mse_kit_qual_train <- mean((pred_kit_qual_train - my_sahp_train$sale_price)^2)
mse_kit_qual_test <- mean((pred_kit_qual_test - my_sahp_test$sale_price)^2)

# Q2: Multiple Linear Regression (All Variables)
fit_sale_price_GLK <- lm(sale_price ~ gar_car + liv_area + kit_qual, data = my_sahp_train)
summary(fit_sale_price_GLK)
# MSE
pred_GLK_train <- predict(fit_sale_price_GLK, newdata = my_sahp_train)
pred_GLK_test <- predict(fit_sale_price_GLK, newdata = my_sahp_test)
mse_GLK_train <- mean((pred_GLK_train - my_sahp_train$sale_price)^2)
mse_GLK_test <- mean((pred_GLK_test - my_sahp_test$sale_price)^2)

# Q3: KNN Regression (K = 1 to 50)
library(caret)
library(ggplot2)

k_seq <- 1:50
mse_seq_tr <- mse_seq_te <- NULL

for (i in seq_along(k_seq)) {
  fit <- knnreg(
    sale_price ~ gar_car + liv_area + kit_qual, 
    data = my_sahp_train,
    k = k_seq[i]
  )
  
  y_hat_tr <- predict(fit, newdata = my_sahp_train)
  mse_seq_tr[i] <- mean((my_sahp_train$sale_price - y_hat_tr)^2)

  y_hat_te <- predict(fit, newdata = my_sahp_test)
  mse_seq_te[i] <- mean((my_sahp_test$sale_price - y_hat_te)^2)
}

mse_stacked <- rbind(
  data.frame(K = k_seq, MSE = mse_seq_tr, Type = "Train"),
  data.frame(K = k_seq, MSE = mse_seq_te, Type = "Test")
)

ggplot(mse_stacked, mapping = aes(x = K, y = MSE, color = Type)) +
  geom_point() +
  geom_line(linewidth = 1)

which.min(mse_seq_te) # 9`
    },
    {
        title: "Descriptive Statistics & Normal Distribution",
        shortDescription: "Foundational analysis of variance, histograms, and standard normal simulations.",
        fullDescription: "An exploratory analysis of the 'sahp' dataset focusing on fundamental statistical properties. This study differentiates between population and sample variance, visualizes distributions via histograms with custom binning, and verifies properties of the Standard Normal Distribution through matrix simulation.",
        tags: ["Descriptive Stats", "Simulation", "Matrix Operations"],
        icon: FileSpreadsheet,
        category: "Foundational Statistics",
        methodology: [
            "Calculated and compared Population Variance vs. Sample Variance (n vs n-1 denominator).",
            "Generated histograms of 'living area' with controlled bin sizes to analyze distribution limits.",
            "Simulated a 9x10 matrix of random observations from a Standard Normal Distribution.",
            "Verified matrix indexing and distribution properties."
        ],
        outcomes: [
            "Demonstrated the bias correction in sample variance (0.3 vs 0.375).",
            "Confirmed distribution normality through random generation (Mean ~ 0, SD ~ 1).",
            "Validated data structure dimensions (165 observations, 12 variables)."
        ],
        codeTitle: "descriptive_stats.R",
        code: `library(r02pro)
data("sahp")

# Q1: Basic Dimensions & Indexing
dim(sahp)
sahp[79, "oa_qual"] # Value: 3 (Fair)

# Q2: Variance Calculation
# Last 5 observations of 'bathroom'
sahp[161:165, "bathroom"] 
# Manual Population Variance
mean <- (3 + 1.5 + 2.0 + 1.5 + 2.0)/5
variance <- ((3 - mean)^2 + (1.5 - mean)^2 + (2.0 - mean)^2 + (1.5 - mean)^2 + (2.0 - mean)^2)/5
variance # 0.3
# Sample Variance (using var function)
bathroom_sample_var <- sahp[161:165, "bathroom"]
var(bathroom_sample_var) # 0.375 (n-1 denominator)

# Q3: Histogram
attach(sahp)
liv_area_hist <- hist(liv_area, breaks=15)

# Q4: Random Normal Matrix
set.seed(1)
x <- rnorm(90)
x_mat <- matrix(x, 9, 10, T)
x_mat[7,8]
x[68]`
    }
]

// Group projects by category
const categories = [
    {
        title: "Model Selection & Validation",
        description: "Advanced techniques for feature selection and robust error estimation.",
        icon: Target,
        projects: projectsData.filter(p => p.category === "Model Selection & Validation")
    },
    {
        title: "Classification & Machine Learning",
        description: "Categorizing data (e.g., Expensive vs Cheap) using probabilistic and tree-based models.",
        icon: Brain,
        projects: projectsData.filter(p => p.category === "Classification & Machine Learning")
    },
    {
        title: "Regression Analysis",
        description: "Predicting continuous outcomes (e.g., Prices) using Linear and Non-Linear methods.",
        icon: TrendingUp,
        projects: projectsData.filter(p => p.category === "Regression Analysis")
    },
    {
        title: "Foundational Statistics",
        description: "Core statistical concepts and simulations.",
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
                            href="/#work"
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
                                and advanced statistical algorithms, regression modeling, and machine learning techniques using R.
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

                                                            {project.code && (
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-4 mt-8">
                                                                        <Code className="h-4 w-4" />
                                                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Analysis Code (R)</h3>
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
