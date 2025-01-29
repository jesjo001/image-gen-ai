"use client";

import { Home, Image, Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Create", href: "/", icon: Home },
    { name: "My Creations", href: "/creations", icon: Image },
  ];

  return (
    <div
      className={cn(
        "glass border-r transition-all duration-300 relative z-10",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Generator
            </h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="glass-hover"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-4 py-4">
        <nav className="space-y-2 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-all glass-hover",
                pathname === item.href ? "bg-primary/10 text-primary" : "",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute bottom-4 px-4">
        <ThemeToggle />
      </div>
    </div>
  );
}