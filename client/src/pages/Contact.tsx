import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const body = `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:info@renderking.com.au?subject=Website Enquiry — ${form.company || form.name}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      toast.success("Your email client has been opened. Please send the email to complete your enquiry.");
      setSending(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="pt-32 pb-16 bg-[#0a0a0a] border-b border-white/8">
        <div className="container">
          <p className="rk-section-label mb-3">Get In Touch</p>
          <h1 className="text-white font-black uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}>
            CONTACT<br /><span className="rk-gold">RENDER KING.</span>
          </h1>
          <div className="rk-divider mt-4" />
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <p className="rk-section-label mb-6">Send Us a Message</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="rk-section-label block mb-2">Your Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Smith"
                      className="w-full bg-[#141414] border border-white/10 text-white/80 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-white/20"
                      style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }} />
                  </div>
                  <div>
                    <label className="rk-section-label block mb-2">Company</label>
                    <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Builder / Company Name"
                      className="w-full bg-[#141414] border border-white/10 text-white/80 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-white/20"
                      style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }} />
                  </div>
                  <div>
                    <label className="rk-section-label block mb-2">Phone</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0400 000 000"
                      className="w-full bg-[#141414] border border-white/10 text-white/80 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-white/20"
                      style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }} />
                  </div>
                  <div>
                    <label className="rk-section-label block mb-2">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@builder.com.au"
                      className="w-full bg-[#141414] border border-white/10 text-white/80 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-white/20"
                      style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }} />
                  </div>
                </div>
                <div>
                  <label className="rk-section-label block mb-2">Message</label>
                  <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project or enquiry..."
                    rows={5}
                    className="w-full bg-[#141414] border border-white/10 text-white/80 text-sm p-4 focus:outline-none focus:border-[#c9a84c] transition-colors resize-none placeholder:text-white/20"
                    style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }} />
                </div>
                <button type="submit" disabled={sending} className="rk-btn-gold w-full text-center disabled:opacity-50">
                  {sending ? "Opening Email Client..." : "Send Enquiry →"}
                </button>
              </form>
              <div className="mt-6 rk-card">
                <p className="text-white/40 text-xs" style={{ fontWeight: 300 }}>
                  For project quotes with file uploads, use our{" "}
                  <Link href="/submit-project" className="rk-gold hover:underline">Builder Portal</Link> — it's faster and allows you to attach plans and specs directly.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rk-card">
                <p className="rk-section-label mb-6">Contact Details</p>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <Phone size={16} className="rk-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>Phone</p>
                      <a href="tel:0731234567" className="text-white/70 hover:text-white text-sm transition-colors" style={{ fontWeight: 300 }}>(07) 3123 4567</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail size={16} className="rk-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>Email</p>
                      <a href="mailto:info@renderking.com.au" className="text-white/70 hover:text-white text-sm transition-colors" style={{ fontWeight: 300 }}>info@renderking.com.au</a>
                      <br />
                      <a href="mailto:estimating@renderking.com.au" className="text-white/50 hover:text-white text-xs transition-colors" style={{ fontWeight: 300 }}>estimating@renderking.com.au</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin size={16} className="rk-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>Service Area</p>
                      <p className="text-white/70 text-sm" style={{ fontWeight: 300 }}>Greater Brisbane (primary)<br />Morayfield to Ipswich<br />Gold Coast<br />Expanding across Queensland</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock size={16} className="rk-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>Response Time</p>
                      <p className="text-white/70 text-sm" style={{ fontWeight: 300 }}>Within 1 business day</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rk-card">
                <p className="rk-section-label mb-3">Submit a Project</p>
                <p className="text-white/50 text-xs leading-relaxed mb-4" style={{ fontWeight: 300 }}>Builders — use our portal to upload plans, specs, and photos for a faster quote turnaround.</p>
                <Link href="/submit-project" className="rk-btn-gold w-full text-center block text-xs">Builder Portal →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
