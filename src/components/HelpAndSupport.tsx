"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Mail,
  MessageSquare,
  AlertCircle,
  LifeBuoy,
  BookOpen,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface HelpAndSupportProps {
  handleEmailSupport: () => void;
  handleLiveChat: () => void;
  handleReportProblem: () => void;
}

export const HelpAndSupport = ({
  handleEmailSupport,
  handleLiveChat,
  handleReportProblem,
}: HelpAndSupportProps) => {
  return (
    <div className="container mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <LifeBuoy className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We’re here to help you get the most out of Soilmate. Browse FAQs, explore resources,
          or contact our team directly.
        </p>
      </div>

      {/* FAQ Section */}
      <Card className="shadow-card hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>How do I add a new soil sensor?</AccordionTrigger>
              <AccordionContent>
                Go to the <b>Dashboard</b>, click <b>“Add Sensor”</b>, and enter the
                sensor ID along with its location. You can also assign it to a farm plot
                for easier tracking.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2">
              <AccordionTrigger>Why is my camera feed not loading?</AccordionTrigger>
              <AccordionContent>
                Ensure your IP camera is connected to the same network as your device.
                If it still doesn’t work, try restarting the app, re-entering the camera IP address,
                or checking your firewall settings.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3">
              <AccordionTrigger>How can I upgrade my subscription?</AccordionTrigger>
              <AccordionContent>
                Head over to the <b>Subscription</b> page and select your preferred
                plan. Payment options include credit card, UPI, and PayPal. Once upgraded,
                your features will unlock instantly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4">
              <AccordionTrigger>Can I export my soil data?</AccordionTrigger>
              <AccordionContent>
                Yes! Visit the <b>Trends</b> page and click the{" "}
                <b>“Download Report”</b> button. Data can be exported as CSV or PDF for
                easy sharing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-5">
              <AccordionTrigger>Does Soilmate have a mobile app?</AccordionTrigger>
              <AccordionContent>
                Yes, our mobile app is available on both <b>iOS</b> and <b>Android</b>.
                You can monitor sensors, view alerts, and even receive push notifications.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-6">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We use <b>end-to-end encryption</b> and follow industry best practices.
                Your farm and soil data is stored securely and never shared without your consent.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Quick Resources */}
      <Card className="shadow-card hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600" /> Quick Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              <a href="https://docs.soilmate.com" className="text-blue-600 hover:underline">
                Documentation
              </a>{" "}
              – step-by-step setup and troubleshooting.
            </li>
            <li>
              <a href="https://youtube.com/soilmate" className="text-blue-600 hover:underline">
                Video Tutorials
              </a>{" "}
              – quick guides and walkthroughs.
            </li>
            <li>
              <a href="https://community.soilmate.com" className="text-blue-600 hover:underline">
                Community Forum
              </a>{" "}
              – ask questions and share tips with other farmers.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Email Support */}
        <Card className="shadow-card transition-smooth hover:shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" /> Email Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Have a question that’s not urgent? Email us and we’ll respond within{" "}
              <b>24 hours</b>.
            </p>
            <Button className="w-full" onClick={handleEmailSupport}>
              Send Email
            </Button>
          </CardContent>
        </Card>

        {/* Live Chat */}
        <Card className="shadow-card transition-smooth hover:shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" /> Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Need real-time assistance? Chat with a Soilmate specialist during{" "}
              <b>business hours (9 AM – 6 PM IST)</b>.
            </p>
            <Button
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={handleLiveChat}
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Report Issue */}
      <Card className="shadow-card transition-smooth hover:shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" /> Report an Issue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Found a bug or technical problem? Report it so we can fix it quickly. Our
            engineers review reports daily.
          </p>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleReportProblem}
          >
            Report Problem
          </Button>
        </CardContent>
      </Card>

      {/* Office Hours */}
      <Card className="shadow-card hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" /> Support Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <p>
            <b>Email:</b> 24/7 (responses within 24 hours).
          </p>
          <p>
            <b>Live Chat:</b> Monday – Friday, 9 AM – 6 PM IST.
          </p>
          <p>
            <b>Emergency Issues:</b> Priority handling for subscription users.
          </p>
        </CardContent>
      </Card>

      {/* Data Security Note */}
      <Card className="shadow-card hover:shadow-glow transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-teal-600" /> Data Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          We take your data seriously. All sensor readings, reports, and personal
          information are encrypted and stored securely. You are always in control of
          your data, and you can request deletion at any time.
        </CardContent>
      </Card>
    </div>
  );
};
