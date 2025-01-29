"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ImageModal } from "@/components/modal/ImageModal"

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("medium")
  const [images, setImages] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState(null)

  const handleGenerate = async () => {

    if (!prompt.trim()) {
      toast.error("Please enter a valid prompt")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/images/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, size }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.error || "Failed to generate images")
        return
      }

      const data = await response.json()
      setImages((prevImages) => [...prevImages, data])
      toast.success("Images generated successfully")
    } catch (err) {
      console.error(err)
      toast.error("An error occurred while generating the images")
    } finally {
      setLoading(false)
    }
  }

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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="size">
                Select Image Size
              </label>
              <Select value={size} onValueChange={setSize} >
                <SelectTrigger >
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (256x256)</SelectItem>
                  <SelectItem value="medium" >Medium (512x512)</SelectItem>
                  <SelectItem value="large" >Large (1024x1024)</SelectItem>
                </SelectContent>
              </Select>
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
          
            
          {images.length > 0 && (
        <div className="aspect-square rounded-xl glass flex items-center justify-center group hover:border-purple-500/50 transition-colors">
          {images.map((image, index) => (
            <ImageModal key={index} image={image} index={index} />
          ))}
        </div>
      )}
            <p className="text-muted-foreground group-hover:scale-105 transition-transform">
              Your generated image will appear here
            </p>
        </Card>
      </div>
    </div>
  );
}