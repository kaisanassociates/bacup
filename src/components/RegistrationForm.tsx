import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  contactNumber: z.string().min(10, "Enter a valid contact number").max(20),
  email: z.string().email("Enter a valid email address").max(255),
  linkedinProfile: z.string().max(500).optional(),
  designation: z.string().min(2, "Designation is required").max(100),
  business: z.string().min(2, "Business/Organization is required").max(200),
  sectors: z.array(z.string()).min(1, "Select at least one sector"),
  otherSector: z.string().max(100).optional(),
  experience: z.string().min(1, "Experience is required").max(50),
  achievements: z.string().max(1000).optional(),
  futurePlan: z.string().min(10, "Please share your 5-year plan").max(1000),
});

type FormData = z.infer<typeof formSchema>;

const sectors = [
  "Education",
  "Real Estate",
  "Technology / IT",
  "Healthcare",
  "Trading",
  "Retail / E-commerce",
  "Manufacturing",
  "Food & Hospitality",
  "Finance / Investment",
  "Consulting / Services",
  "Media / Marketing",
  "Others",
];

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationForm = ({ isOpen, onClose }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", { ...data, sectors: selectedSectors });
    
    toast.success("Registration Successful!", {
      description: "We'll contact you shortly with workshop details.",
    });
    
    setIsSubmitting(false);
    reset();
    setSelectedSectors([]);
    onClose();
  };

  const handleSectorToggle = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-background rounded-3xl shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gradient-to-r from-primary to-accent border-b border-border/50 backdrop-blur-xl">
          <div>
            <h2 className="text-3xl font-bold text-white">Register for Influencia</h2>
            <p className="text-sm text-white/90 mt-1">Edition 2 - Transform Your Life</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  {...register("contactNumber")}
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
                {errors.contactNumber && (
                  <p className="text-sm text-destructive">{errors.contactNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your.email@example.com"
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinProfile">LinkedIn / Website</Label>
                <Input
                  id="linkedinProfile"
                  {...register("linkedinProfile")}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">2</div>
              Professional Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  {...register("designation")}
                  placeholder="e.g., CEO, Manager, Entrepreneur"
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
                {errors.designation && (
                  <p className="text-sm text-destructive">{errors.designation.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Business / Organization *</Label>
                <Input
                  id="business"
                  {...register("business")}
                  placeholder="Your company or organization name"
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
                {errors.business && (
                  <p className="text-sm text-destructive">{errors.business.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  {...register("experience")}
                  placeholder="e.g., 5 years"
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
                {errors.experience && (
                  <p className="text-sm text-destructive">{errors.experience.message}</p>
                )}
              </div>
            </div>

            {/* Sectors */}
            <div className="space-y-3">
              <Label>Sector / Industry *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sectors.map((sector) => (
                  <div
                    key={sector}
                    className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedSectors.includes(sector)
                        ? "bg-primary/10 border-primary"
                        : "bg-white/50 dark:bg-white/5 border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleSectorToggle(sector)}
                  >
                    <Checkbox
                      checked={selectedSectors.includes(sector)}
                      onCheckedChange={() => handleSectorToggle(sector)}
                    />
                    <label className="text-sm font-medium cursor-pointer flex-1">
                      {sector}
                    </label>
                  </div>
                ))}
              </div>
              {selectedSectors.includes("Others") && (
                <Input
                  {...register("otherSector")}
                  placeholder="Please specify your sector"
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">3</div>
              Additional Information
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="achievements">Key Achievements / Milestones</Label>
                <Textarea
                  id="achievements"
                  {...register("achievements")}
                  placeholder="Share your notable achievements and milestones..."
                  rows={4}
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="futurePlan">Future Plan for Next 5 Years *</Label>
                <Textarea
                  id="futurePlan"
                  {...register("futurePlan")}
                  placeholder="Describe your vision and goals for the next 5 years..."
                  rows={4}
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary resize-none"
                />
                {errors.futurePlan && (
                  <p className="text-sm text-destructive">{errors.futurePlan.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Complete Registration
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
