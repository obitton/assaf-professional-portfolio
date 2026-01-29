import { Mail, Linkedin, MapPin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "assaf.bitton@baruchmail.cuny.edu",
    href: "mailto:assaf.bitton@baruchmail.cuny.edu",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/assafbitton",
    href: "https://linkedin.com/in/assafbitton",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "New York, NY",
    href: null,
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-widest uppercase text-primary">Contact</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                {"Let's discuss opportunities"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {"I'm actively seeking quantitative finance and risk analytics internship opportunities. "}
                {"I'd love to connect and discuss how my skills in statistical modeling and data analysis "}
                can contribute to your team.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="mailto:assaf.bitton@baruchmail.cuny.edu">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </a>
              </Button>
              <Button variant="outline" asChild className="border-border text-foreground hover:bg-secondary bg-transparent">
                <a href="/Assaf_Bitton_Resume.pdf" download="Assaf Bitton Resume.pdf">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Right side - Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="bg-card border border-border rounded-lg p-6 flex items-center gap-4 hover:border-primary/50 transition-colors"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Assaf Bitton. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/assafbitton"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:assaf.bitton@baruchmail.cuny.edu"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
