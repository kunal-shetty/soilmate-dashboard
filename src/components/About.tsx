"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info, Users, Rocket, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>

      {/* Who We Are */}
      <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Users className="h-5 w-5 text-blue-600" />
            Who We Are
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            We are a team of innovators passionate about building technology that
            makes everyday life easier, smarter, and more secure. Our solutions
            combine simplicity with powerful features to deliver a seamless
            experience for our users.
          </p>
        </CardContent>
      </Card>

      {/* Mission */}
      <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Rocket className="h-5 w-5 text-green-600" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to empower individuals and businesses by providing
            tools that enhance productivity, improve connectivity, and ensure
            reliability. We strive to bridge the gap between cutting-edge
            technology and user-friendly design.
          </p>
        </CardContent>
      </Card>

      {/* Values */}
      <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Shield className="h-5 w-5 text-purple-600" />
            Our Values
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>💡 Innovation: Continuously pushing boundaries of technology.</li>
            <li>🤝 Integrity: Transparent, honest, and trustworthy.</li>
            <li>🚀 Growth: Committed to learning and improving daily.</li>
            <li>🌍 Impact: Building solutions that matter globally.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Info className="h-5 w-5 text-orange-600" />
            More About Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            From research and development to real-world applications, we are
            constantly adapting and growing. Our dedicated team ensures that each
            feature we create serves a meaningful purpose and improves user
            experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
