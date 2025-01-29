"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // Add your image generation logic here
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="container mx-auto p-8 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="mb-12 text-center relative">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-float">
          Create AI Image
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Transform your ideas into stunning visuals using AI
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 relative">
        <Card className="glass p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            Image Settings
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Prompt
              </label>
              <Textarea
                placeholder="A serene landscape with mountains..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-32 glass glass-hover resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Style
              </label>
              <Input 
                placeholder="Realistic, Abstract, etc." 
                className="glass glass-hover"
              />
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
              onClick={handleGenerate}
              disabled={loading}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {loading ? "Generating..." : "Generate Image"}
            </Button>
          </div>
        </Card>

        <Card className="glass p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-6">Preview</h2>
          <div className="aspect-square rounded-xl glass flex items-center justify-center group hover:border-purple-500/50 transition-colors">
            <p className="text-muted-foreground group-hover:scale-105 transition-transform">
              Your generated image will appear here
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}