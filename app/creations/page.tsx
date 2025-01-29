"use client";

import { Card } from "@/components/ui/card";
import { Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

const mockImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1699894195037-9b3d8a39f8f9",
    prompt: "A serene mountain landscape at sunset",
    date: "2024-03-20",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1699894195038-9b3d8a39f8f8",
    prompt: "Abstract digital art with vibrant colors",
    date: "2024-03-19",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1699894195038-9b3d8a39f8f8",
    prompt: "Abstract digital art with vibrant colors",
    date: "2024-03-19",
  },
];

export default function Creations() {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get("/api/images");
        console.log(data);
        setImages(data); // Expect backend to return user images
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto p-8 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-float">
          My Creations
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          View and manage your AI-generated images
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {
          loading ? (
            <p></p>) : images.map((item, i) => (
              <Card key={item.id} className="glass overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={`Generated ${i}`}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 glass opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <p className="font-medium mb-1 line-clamp-2 group-hover:text-purple-500 transition-colors">
                    {item.prompt}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    {item.date}
                  </p>
                </div>
              </Card>
            ))
        }
      </div>
    </div>
  );
}