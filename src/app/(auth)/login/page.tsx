"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { SignIn, CircleNotch } from "@phosphor-icons/react"; 
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth/auth.service";

// 1. Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoggedIn, isLoading } = useAuth();
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
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  // 2. Handle Login Submission
  async function onSubmit(values: LoginValues) {
    setIsSubmitting(true);
    try {
      const response = await authService.login(values);
      console.log("Login Response:", response);
      
      if(response.error){
        toast.error(response.error || "Login failed. Please try again.");
        return;
      }
      if (response?.data?.token) {
        // Use your context's login method to store the token/user
        login(response.data.token, response.data.user);
        toast.success("Welcome back!");
        router.push("/dashboard"); 
      }
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || "Invalid email or password.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    /* Identical Responsive Wrapper to your Register Page */
    <div className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-4 sm:px-6 lg:px-8">
      
      <Card className="w-full max-w-100 border-none shadow-xl sm:border sm:border-border">
        <CardHeader className="space-y-2 text-center">
          <div className="mb-2 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3 ring-8 ring-primary/5">
              <SignIn weight="fill" className="size-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back
          </CardTitle>
          <CardDescription className="text-balance text-sm sm:text-base text-muted-foreground">
            Enter your details to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs font-medium text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
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
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t pt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>New to VibeCode?</span>
            <Link 
              href="/register" 
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Create account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}