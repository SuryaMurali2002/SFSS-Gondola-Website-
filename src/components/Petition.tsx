import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import sfssLogo from "@/assets/sfss-logo.png";

const petitionSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  studentId: z.string().trim().max(50, "Student ID must be less than 50 characters").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to how your data will be used." }),
  }),
});

export const Petition = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = petitionSchema.parse(formData);

      // Insert into database
      const { data, error } = await supabase
        .from('petition_signatures')
        .insert({
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          email: validatedData.email,
          student_id: validatedData.studentId || null,
        });

      if (error) {
        console.error("Petition submission error:", error);
        
        // Handle duplicate email (unique constraint violation)
        if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
          toast({
            title: "Already Signed",
            description: "This email has already been used to sign the petition.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return; // Exit early, don't throw
        }
        
        // Handle permission/RLS errors
        if (error.code === '42501' || error.message?.includes('permission') || error.message?.includes('policy')) {
          toast({
            title: "Permission Error",
            description: `Unable to submit signature. Error: ${error.message}`,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        
        // For any other error, show the actual error message
        toast({
          title: "Submission Error",
          description: `Error: ${error.message || 'Unknown error'}. Code: ${error.code || 'N/A'}`,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      } else {
        toast({
          title: "Thank You!",
          description: `Thank you ${validatedData.firstName} for signing the petition! Your voice matters.`,
        });
        setFormData({ firstName: "", lastName: "", email: "", studentId: "", consent: false });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        // Show more detailed error message
        let errorMessage = "Failed to sign petition. Please try again.";
        
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="petition" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <FileText className="w-5 h-5" />
            <span className="font-semibold">Official Petition</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sign the Petition for SFU Gondola
          </h2>
          <p className="text-lg text-muted-foreground">
            Add your voice to the movement. This petition will be submitted to the City of Burnaby 
            and BC Provincial Government to demonstrate community support for sustainable campus transit.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-2 shadow-xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <img 
                src={sfssLogo} 
                alt="Simon Fraser Student Society" 
                className="h-10 w-auto"
              />
            </div>
            <CardTitle className="text-2xl text-center">Sign the Petition</CardTitle>
            <CardDescription className="text-center text-base">
              Your signature demonstrates public support for improved accessibility to SFU
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSign} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-base font-semibold">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-12"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-base font-semibold">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-12"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-base font-semibold">
                  SFU Student ID (Optional)
                </Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Student ID if applicable"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="h-12"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4 text-left">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The Simon Fraser Student Society will use your name, email, and (if provided) student ID to validate your
                  signature and include it in advocacy materials shared with the City of Burnaby, TransLink, and the BC
                  Government. Data is stored securely in Canada and retained until the campaign concludes.
                </p>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent: Boolean(checked) })}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="consent" className="text-sm text-left leading-tight">
                    I consent to the Simon Fraser Student Society storing my information for the purposes described above
                    and sharing my signature with the listed public bodies.
                  </Label>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing..." : "Sign the Petition"}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center pt-2">
                By signing, you support the development of a gondola transit system connecting 
                SFU Burnaby campus to Production Way-University SkyTrain station.
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 max-w-2xl mx-auto bg-secondary/10 border border-secondary/20 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-center">Petition Submission</h3>
          <p className="text-sm text-muted-foreground text-center">
            This petition will be formally submitted to the City of Burnaby, BC Provincial Government, 
            and TransLink to advocate for sustainable, accessible transit infrastructure for Simon Fraser University.
          </p>
        </div>
      </div>
    </section>
  );
};
