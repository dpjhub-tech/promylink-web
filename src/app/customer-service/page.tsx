"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Clock, Phone, ShieldCheck, RefreshCcw, HelpCircle, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { SupportChatSection } from "@/components/settings/support-chat-section";

const FAQS = [
  {
    question: "How do I create a post on Promylink?",
    answer: "Tap the \"+\" button at the bottom of the app or click \"Create Post\" on desktop. Choose between a Banner Link (paid) or Short Video (free), fill in the details, and submit for review.",
  },
  {
    question: "Why is my post not approved yet?",
    answer: "All posts go through a manual review by our team to ensure quality and authenticity. This typically takes up to 24 hours. You will be notified once your post is approved or if any changes are needed.",
  },
  {
    question: "How do I get a refund?",
    answer: "Refund requests must be submitted within 7 days of payment. Email billing@promylink.com with your order details. Refer to our Refund Policy for full terms.",
  },
  {
    question: "What is KYC and why is it required?",
    answer: "KYC (Know Your Customer) is an identity verification step required for posters to ensure a safe and trusted platform. Upload a valid government ID from your Account Settings.",
  },
  {
    question: "How do I report a fraudulent or misleading post?",
    answer: "Tap the flag icon on any post to report it, or email report@promylink.com with the post URL and a description of the issue. We respond within 24 hours.",
  },
  {
    question: "How do I delete my account?",
    answer: "Go to Account Settings → scroll to the bottom → select \"Delete Account\". This action is permanent. If you need help, contact privacy@promylink.com.",
  },
];

const SUPPORT_CHANNELS = [
  {
    icon: Mail,
    title: "Email Support",
    description: "General inquiries and account help",
    contact: "hello@promylink.com",
    href: "mailto:hello@promylink.com",
    badge: "Within 24 hrs",
  },
  {
    icon: ShieldCheck,
    title: "Poster Support",
    description: "Post approval, KYC, and billing",
    contact: "poster-support@promylink.com",
    href: "mailto:poster-support@promylink.com",
    badge: "Within 24 hrs",
  },
  {
    icon: RefreshCcw,
    title: "Billing & Refunds",
    description: "Payment issues and refund requests",
    contact: "billing@promylink.com",
    href: "mailto:billing@promylink.com",
    badge: "Within 48 hrs",
  },
  {
    icon: FileText,
    title: "Privacy & Legal",
    description: "Data requests and legal inquiries",
    contact: "privacy@promylink.com",
    href: "mailto:privacy@promylink.com",
    badge: "Within 72 hrs",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-sm hover:bg-secondary/40 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{question}</span>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 ml-2" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-muted-foreground border-t border-border pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">

        <section className="py-14 bg-secondary/30 text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <Badge variant="secondary" className="mb-4">
              <MessageCircle className="h-3 w-3 mr-1" /> Customer Service
            </Badge>
            <h1 className="text-4xl font-bold mb-3">How can we help you?</h1>
            <p className="text-muted-foreground">
              Browse FAQs below or reach out to our support team. We&apos;re here to help you get the most out of Promylink.
            </p>
          </div>
        </section>

        <div className="bg-primary/10 border-y border-primary/20 py-3">
          <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-sm text-primary font-medium">
            <Clock className="h-4 w-4" />
            Our team typically responds within 24 hours, Monday – Saturday, 9 AM – 6 PM IST
          </div>
        </div>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUPPORT_CHANNELS.map((ch) => (
                <a
                  key={ch.title}
                  href={ch.href}
                  className="glass-card p-5 flex gap-4 items-start hover:border-primary/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ch.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-sm">{ch.title}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{ch.badge}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{ch.description}</p>
                    <p className="text-xs text-primary truncate">{ch.contact}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 glass-card p-5 flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Report Fraud or Abuse</p>
                  <p className="text-xs text-muted-foreground">Suspicious posts, scams, or security issues</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0" asChild>
                <a href="mailto:report@promylink.com">report@promylink.com</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="flex flex-col gap-3">
              {FAQS.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Support Chat</h2>
            </div>
            <SupportChatSection />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
