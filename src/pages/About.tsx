import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Book, Briefcase, GraduationCap, Heart, Lightbulb, User } from "lucide-react";

const teamMembers = [
  {
    name: "Srija Chinthakunta",
    education: "Bachelor of Engineering in Computer Science and Engineering (AI/ML)",
    college: "Vasavi College of Engineering",
    interests: "Artificial Intelligence (AI), Machine Learning (ML) and Data Analysis",
    background: "Developer specializing in web technologies with expertise in Python, JavaScript,React,tailwind and HTML/CSS.",
  },
  {
    name: "Tanishka Kora",
    education: "Bachelor of Engineering in Computer Science and Engineering (AI/ML)",
    college: "Vasavi College of Engineering",
    interests: "Artificial Intelligence, Data preprocessing and Machine Learning (ML)",
    background: "Developer of AI models for predictive analytics in agriculture and specialized in Python,Java.",
  },
  {
    name: "Gowri Shankar Bingi",
    education: "Bachelor of Engineering in Computer Science and Engineering (AI/ML)",
    college: "Vasavi College of Engineering",
    interests: "Artificial Intelligence (AI), data analysis and smart farming technologies",
    background: "Expert in  data analytics, focused on Python,Problem Solving.",
  },
  
];


export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <section className="max-w-4xl mx-auto text-center mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We are dedicated to advancing research and technological solutions 
            in the field of crop health management. Our goal is to harness the power of machine learning 
            and data analysis to help farmers diagnose crop diseases effectively and provide actionable 
            solutions for treatment and prevention.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">{member.education}</p>
                      <p className="text-gray-600">{member.college}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-primary mt-1" />
                    <p className="text-gray-600">{member.interests}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-primary mt-1" />
                    <p className="text-gray-600">{member.background}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-primary">
            <Heart className="w-5 h-5" />
            <p className="text-lg">
              Designed and Developed by Hackaholics
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}