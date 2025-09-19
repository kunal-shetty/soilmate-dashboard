"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Leaf, ShieldCheck, Zap } from "lucide-react";

interface Plan {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    title: "Free",
    price: "₹0 / month",
    description: "Basic soil detection features for personal use.",
    features: ["1 Soil Sensor", "Basic Fertility Reports", "Email Support"],
  },
  {
    title: "Pro",
    price: "₹699 / month",
    description: "Advanced features for small farms & agri-enthusiasts.",
    features: [
      "Up to 5 Soil Sensors",
      "Fertility & Moisture Analysis",
      "Camera Surveillance Integration",
      "Priority Support",
    ],
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "Scalable solution for enterprises & research projects.",
    features: [
      "Unlimited Sensors",
      "AI-driven Soil Predictions",
      "Full Security & Surveillance",
      "Dedicated Account Manager",
    ],
  },
];

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Badge
          variant="secondary"
          className="mb-2 bg-green-100 text-green-700 border-green-300"
        >
          Soilmate Plans
        </Badge>
        <h1 className="text-3xl font-bold mb-2">Choose Your Subscription</h1>
        <p className="text-muted-foreground mb-6">
          Pick the plan that fits your needs and scale as you grow.
        </p>

        {/* Subscription expiry notice */}
        <div className="inline-block bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg px-4 py-2 text-sm font-medium">
          Your subscription expires in <span className="font-semibold">11 days</span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden transition-smooth shadow-card hover:shadow-glow ${
              plan.popular ? "border-green-400 ring-2 ring-green-300" : ""
            }`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
                {plan.title === "Free" && (
                  <Leaf className="h-5 w-5 text-green-600" />
                )}
                {plan.title === "Pro" && (
                  <Zap className="h-5 w-5 text-yellow-500" />
                )}
                {plan.title === "Enterprise" && (
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                )}
                {plan.title}
              </CardTitle>
              <p className="mt-2 text-2xl font-bold">{plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>

            <CardContent className="flex flex-col items-center">
              <ul className="mb-6 space-y-2 w-full">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                {plan.title === "Enterprise" ? "Contact Sales" : "Subscribe"}
              </Button>
            </CardContent>

            {plan.popular && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500 text-white">Most Popular</Badge>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
