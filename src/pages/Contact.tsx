import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent("Contact Form Submission");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Location: ${formData.location}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    
    // Open default mail client
    window.location.href = `mailto:siri240807@gmail.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Form Submitted",
      description: "Your message has been sent successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[150px]"
                required
              />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}