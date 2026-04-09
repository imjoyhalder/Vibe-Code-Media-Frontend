

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
// Switched to Phosphor as per your components.json
import { Lightning, CircleNotch } from "@phosphor-icons/react"; 
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth/auth.service";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { login, isLoggedIn, isLoading } = useAuth(); // Ensure this is implemented in your context
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, isLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched", // Validates as the user types/leaves field
  });

  async function onSubmit(values: RegisterValues) {
    setIsSubmitting(true);
    try {
      const response = await authService.register(values);
      // console.log("Register response:", response);

      if (response.error) {
        toast.error(response.error || "Registration failed. Please try again.");
        return;
      }

      const token = response.data?.token;
      const user = response.data?.user;

      if (!token || !user) {
        toast.error("Unexpected response from server. Please try again.");
        return;
      }

      login(token, user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    /* Responsive Wrapper: Full height on mobile, centered on all screens */
    <div className="flex min-h-svh items-center justify-center  bg-muted/30 px-4 py-4 sm:px-6 lg:px-8">
      {/* Card width: 100% on small mobile, max-md on larger screens */}
      <Card className="w-full max-w-100 border-none shadow-xl sm:border sm:border-border">
        <CardHeader className="space-y-2 text-center">
          <div className="mb-2 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3 ring-8 ring-primary/5">
              <Lightning weight="fill" className="size-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
            Create an account
          </CardTitle>
          {/* <CardDescription className="text-balance text-sm sm:text-base">
            Enter your details below to join the VibeCode community
          </CardDescription> */}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            
            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                className={`h-11 ${errors.name ? "border-destructive ring-destructive/20 focus-visible:ring-destructive" : ""}`}
              />
              {errors.name && (
                <p className="text-[0.8rem] font-medium text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                placeholder="name@example.com"
                {...register("email")}
                className={`h-11 ${errors.email ? "border-destructive ring-destructive/20 focus-visible:ring-destructive" : ""}`}
              />
              {errors.email && (
                <p className="text-[0.8rem] font-medium text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`h-11 ${errors.password ? "border-destructive ring-destructive/20 focus-visible:ring-destructive" : ""}`}
              />
              {errors.password && (
                <p className="text-[0.8rem] font-medium text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="mt-2 h-11 w-full text-base font-semibold transition-all active:scale-[0.98]" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CircleNotch className="mr-2 size-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t pt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Already have an account?</span>
            <Link 
              href="/login" 
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Login here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}