import { Mountain, Users, Leaf, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Reduce commute times by up to 45 minutes daily for thousands of students"
  },
  {
    icon: Leaf,
    title: "Go Green",
    description: "Lower carbon emissions with sustainable transit connecting campus to the city"
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Provide barrier-free access to campus for all students and community members"
  },
  {
    icon: Mountain,
    title: "Scenic Journey",
    description: "Experience breathtaking mountain views while traveling to and from campus"
  }
];

export const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Vision
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The SFU Gondola Project aims to create a state-of-the-art aerial transit system 
            connecting Simon Fraser University's Burnaby Mountain campus to the city below. 
            This transformative infrastructure will revolutionize how students, faculty, and 
            visitors access our beautiful campus while promoting sustainability and accessibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6 text-center space-y-4">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                  index % 2 === 0 ? 'bg-primary' : 'bg-secondary'
                }`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};