"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  return (
    <section className="bg-background">
      <div className="container py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Get in Touch</p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-foreground md:text-3xl">Contact Us</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Have questions about our products? Need a custom quote? Reach out and our team will respond promptly.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-10 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <article className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Phone</h2>
                <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary">
                  +1 (234) 567-890
                </a>
              </div>
            </article>
            <article className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Email</h2>
                <a href="mailto:info@medequip.com" className="text-sm text-muted-foreground hover:text-primary">
                  info@medequip.com
                </a>
              </div>
            </article>
            <article className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Address</h2>
                <p className="text-sm text-muted-foreground">
                  123 Medical Drive, Suite 100
                  <br />
                  Healthcare City, HC 12345
                </p>
              </div>
            </article>
            <article className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <MessageCircle className="text-accent" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">WhatsApp</h2>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent"
                >
                  Chat with us
                </a>
              </div>
            </article>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              toast.success("Message Sent", {
                description: "We'll get back to you within 24 hours.",
              });
              setForm({ name: "", email: "", phone: "", message: "" });
            }}
            className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-card md:col-span-3"
          >
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  placeholder="+1 (234) 567-890"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                required
                rows={4}
                placeholder="Tell us about your equipment needs..."
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
