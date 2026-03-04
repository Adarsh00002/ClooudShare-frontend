export const features = [
  {
    iconName: "CloudUpload",
    iconColor: "text-blue-500",
    title: "Simple Sharing",
    description: "Share files with anyone using secure links that you control.",
  },
  {
    iconName: "CreditCard",
    iconColor: "text-orange-500",
    title: "Flexible Credits",
    description: "Pay only for what you use with our credit-based system.",
  },
  {
    iconName: "FileText",
    iconColor: "text-red-500",
    title: "File Management",
    description: "Organize, preview, and manage your files from any device.",
  },
  {
    iconName: "Clock",
    iconColor: "text-indigo-500",
    title: "Transaction History",
    description: "Track all your uploads, downloads, and file-sharing activity.",
  },
  {
    iconName: "Share2",
    iconColor: "text-green-500",
    title: "Easy Collaboration",
    description: "Share files instantly and collaborate in real-time.",
  },
  {
    iconName: "Shield",
    iconColor: "text-purple-500",
    title: "Strong Security",
    description: "Your files are encrypted and securely stored at all times.",
  },
  {
    iconName: "Wallet",
    iconColor: "text-yellow-500",
    title: "Manage Credits",
    description: "Stay on top of your balance and credit usage.",
  },
  {
    iconName: "ArrowUpCircle",
    iconColor: "text-pink-500",
    title: "Fast Uploads",
    description: "Experience lightning-fast uploads with optimized servers.",
  },
  {
    iconName: "Download",
    iconColor: "text-teal-500",
    title: "Quick Downloads",
    description: "Download your shared files without any delays.",
  }
];

export const pricingPlans = [
  {
    name: "Basic",
    price: "0",
    features: ["1 GB Storage", "Basic File Sharing","for starting begineers"],
    cta: "Get Started",
    highlighted: false,
    description:"Perfect for getting started",
  },
  {
    name: "Pro",
    price: "500",
    features: ["100 GB Storage", "Advanced Sharing Options", "Analytics"],
    cta: "Upgrade Now",
    highlighted: true,
     description:"For individuals with larger needs",
  },
  {
    name: "Ultimate",
    price: "2500",
    features: ["1 TB Storage", "Team Access", "Priority Support"],
    cta: "Go Ultimate",
    highlighted: false,
     description:"For teams and business",
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "CreativeMinds Inc.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote:
      "CloudShare has transformed how our team collaborates on creative assets. The secure sharing and ease of use is unmatched!",
    rating: 3,
  },
  {
    name: "Michael Chen",
    role: "Freelance Designer",
    company: "Self-employed",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    quote:
      "As a freelancer, I need to share large design files with clients securely. CloudShare's simplicity and speed are perfect for my workflow.",
    rating: 2,
  },
  {
    name: "Priya Sharma",
    role: "Project Manager",
    company: "TechSolutions Ltd.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "Managing project files across multiple teams used to be a nightmare until we found CloudShare. Now everything is organized and secure.",
    rating: 4,
  },
];

import { LayoutDashboard, Upload, Files, CreditCard, Receipt } from "lucide-react";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    id: "03",
    label: "My Files",
    icon: Files,
    path: "/myfiles",
  },
  {
    id: "04",
    label: "Subscription",
    icon: CreditCard,
    path: "/subscription",
  },
  {
    id: "05",
    label: "Transactions",
    icon: Receipt,
    path: "/transactions",
  },
];

