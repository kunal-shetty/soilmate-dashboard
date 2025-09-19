"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightCircle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

interface News {
  title: string;
  description: string;
  url: string;
  top?: boolean;
}

const newsList: News[] = [
  {
    title: "2-year extension granted for modern orange processing centres in Vidarbha",
    description:
      "The Maharashtra cabinet has approved a two-year extension for the scheme to establish modern orange processing centres at five key locations in Vidarbha.",
    url: "https://timesofindia.indiatimes.com/city/nagpur/2-year-extension-granted-for-modern-orange-processing-centres-in-vidarbha/articleshow/123928870.cms",
    top: true,
  },
  {
    title: "Pulse production in AP posts negative growth amid changing agricultural trends",
    description:
      "Andhra Pradesh has experienced a significant decline in pulse production, with a negative annual growth rate of -1.94% since 2004-05.",
    url: "https://timesofindia.indiatimes.com/city/vijayawada/pulse-production-in-ap-posts-negative-growth-amid-changing-agricultural-trends/articleshow/123928158.cms",
  },
  {
    title: "Rain damages crops spread over 41 lakh acres in 29 Maharashtra districts this monsoon",
    description:
      "Heavy monsoon rains have caused significant crop damage across 41 lakh acres in 29 districts of Maharashtra.",
    url: "https://timesofindia.indiatimes.com/city/pune/rain-damages-crops-spread-over-41-lakh-acres-in-29-maharashtra-districts-this-monsoon-minister-promises-assistance-for-farmers/articleshow/123930095.cms",
  },
];

export default function AgricultureNewsPage() {

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Badge className="mb-2 bg-green-100 text-green-700 border-green-300">
          Agriculture News
        </Badge>
        <h1 className="text-3xl font-bold mb-2">Latest Updates from Farms</h1>
        <p className="text-muted-foreground mb-6">
          Stay informed with the most important agricultural news.
        </p>
      </div>
    <div className="container mx-auto">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsList.map((news, index) => (
          <Card key={index} className="border border-gray-200 hover:border-green-900 hover:scale-105 transition-all  duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{news.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{news.description}</p>
            </CardContent>
            <div className="p-4 pt-0">
              <a
                href={news.url}>
                <Button className="flex items-center hover:text-green-800 font-medium">
                Read More <ArrowRightCircle className="ml-2" /> </Button> 
                </a>
                
                </div>
            </Card>
        ))}
      </div>


    </div>
     
    </div>
  );
}
