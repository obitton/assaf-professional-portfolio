import { GraduationCap, Award, Code, BarChart3 } from "lucide-react"

const skills = [
  { category: "Programming & Software", items: ["Python", "R", "Analytic Solver", "Excel (Advanced)"] },
  { category: "Statistical Methods", items: ["Logistic Regression", "Decision Trees", "K-Nearest Neighbors (KNN)", "Integer Programming", "Monte Carlo Simulation", "Network Optimization", "Regularization (Lasso/Ridge)"] },
  { category: "Domain Expertise", items: ["Predictive Modeling", "Quantitative Research", "Financial Engineering", "Operations Research"] },
]

const highlights = [
  {
    icon: GraduationCap,
    title: "Baruch College",
    subtitle: "Zicklin School of Business",
    description: "BBA in Statistics and Quantitative Modeling with minors in Mathematics and Economics"
  },
  {
    icon: Award,
    title: "Dean's Honors List",
    subtitle: "Academic Excellence",
    description: "Maintaining a 3.94 GPA while pursuing rigorous quantitative coursework and working full-time as a real-estate field inspector"
  },
  {
    icon: BarChart3,
    title: "Research Focus",
    subtitle: "Predictive Analytics",
    description: "Leveraging predictive and descriptive statistical research to explore risk and financial analytics"
  },
  {
    icon: Code,
    title: "Technical Skills",
    subtitle: "Data Science",
    description: "Proficient in Python, R, and statistical modeling techniques"
  },
]

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-4 mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-primary">About</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Background & Expertise</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Bio */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a quantitative finance student with a passion for applying statistical methods
              to solve complex problems in finance and healthcare. My academic journey at Baruch College
              has equipped me with a strong foundation in statistical theory and practical data analysis skills.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My research spans predictive modeling for cardiovascular mortality and advanced sports analytics,
              demonstrating my ability to translate complex datasets into actionable insights. I am particularly
              interested in risk analytics and developing quantitative strategies for financial decision-making.
            </p>

            {/* Skills */}
            <div className="pt-8 space-y-6">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h3 className="text-sm font-semibold text-foreground mb-3">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-full text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="bg-card border border-border rounded-lg p-6 space-y-3 hover:border-primary/50 transition-colors"
              >
                <highlight.icon className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">{highlight.title}</h3>
                  <p className="text-xs text-primary">{highlight.subtitle}</p>
                </div>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
