"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus, Mail, Lock, User, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
      const { data } = await axios.post("/api/auth/signup", { email, password });
      localStorage.setItem("token", data.token); // Save token
      toast.success("Signup successful!");
      router.push("/dashboard");

      setLoading(false);
    } catch (error) {
      const errorMessage = responseErrorHandler(error);
      toast.error(errorMessage);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <Card className="glass w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 glass">
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-float">
            Create Account
          </h1>
          <p className="text-muted-foreground mt-2">
            Join us and start creating amazing AI images
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Full Name"
                required
                className="pl-10 glass glass-hover"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 glass glass-hover"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                required
                className="pl-10 glass glass-hover"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link
            href="/auth/login"
            className="text-purple-500 hover:text-purple-600 font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}