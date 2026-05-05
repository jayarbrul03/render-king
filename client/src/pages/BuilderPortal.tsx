import SEO from "@/components/SEO";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const serviceOptions = [
  "Acrylic Render",
  "Texture Coating",
  "Hebel Supply & Install",
  "EPS Cladding System",
  "Specialty Finishes",
  "Not Sure — Quote All",
];

export default function BuilderPortal() {
  const [form, setForm] = useState({
    contactName: "",
    companyName: "",
    phone: "",
    email: "",
    projectAddress: "",
    services: [] as string[],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState("");

  const submitMutation = trpc.project.submit.useMutation({
    onSuccess: (data) => {
      setSubmissionRef(data.reference);
      setSubmitted(true);
    },
    onError: () => {
      toast.error("Submission failed. Please call us directly on 0468 041 477.");
    },
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleService = (s: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  };

  const canSubmit =
    form.contactName &&
    form.phone &&
    form.email &&
    form.projectAddress &&
    form.services.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    submitMutation.mutate({
      companyName: form.companyName || form.contactName,
      contactName: form.contactName,
      phone: form.phone,
      email: form.email,
      projectAddress: form.projectAddress,
      suburb: form.projectAddress,
      services: form.services,
      notes: form.notes || undefined,
      fileNames: [],
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="container max-w-2xl text-center py-24">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-[#c9a84c]/15 flex items-center justify-center border border-[#c9a84c]/30">
                <CheckCircle size={40} className="rk-gold" />
              </div>
            </div>
            <p className="rk-section-label mb-4">Project Received</p>
            <h1
              className="text-white font-black uppercase mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.03em" }}
            >
              WE'LL BE IN TOUCH.
            </h1>
            <div className="rk-divider mx-auto mb-8" />
            <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
              Your project enquiry has been sent directly to the Render King estimating team. Expect a response within 1 business day.
            </p>
            {submissionRef && (
              <p className="text-white/35 text-xs mb-10 font-mono">Ref: {submissionRef}</p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="rk-btn-gold">Back to Home</Link>
              <a href="tel:0468041477" className="rk-btn-outline flex items-center gap-2">
                <Phone size={14} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SEO
        title="Submit a Project | Builder Portal — Render King"
        description="Volume builders: submit your project details for a fast render and cladding quote. Render King responds within 1 business day across Brisbane, Ipswich and Gold Coast."
        canonical="https://renderking.au/submit-project"
      />
      <Navigation />

      {/* ── HEADER ── */}
      <section className="pt-32 pb-10 bg-[#0a0a0a] border-b border-white/8">
        <div className="container max-w-3xl" style={{ paddingTop: '70px' }}>
          <p className="rk-section-label mb-2">Builder Portal</p>
          <h1
            className="text-white font-black uppercase mb-3"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.03em", lineHeight: 1.05 }}
          >
            SUBMIT YOUR <span className="rk-gold">PROJECT.</span>
          </h1>
          <p className="text-white/45 text-sm max-w-lg leading-relaxed" style={{ fontWeight: 300 }}>
            Fill in the details below. We'll handle the rest and get back to you within 1 business day.
          </p>
        </div>
      </section>

      {/* ── SINGLE FORM ── */}
      <div className="container max-w-3xl py-12 pb-24">
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl p-8 md:p-12 space-y-8">

          {/* Contact details */}
          <div>
            <h2 className="text-[#0f0f0f] font-black uppercase text-sm tracking-widest mb-6" style={{ letterSpacing: "0.14em" }}>
              Your Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#0f0f0f] text-xs font-bold uppercase tracking-widest mb-2" style={{ letterSpacing: "0.12em" }}>
                  Name <span className="text-[#c9a84c]">*</span>
                </label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => update("contactName", e.target.value)}
                  placeholder="e.g. John Smith"
                  className="w-full border border-gray-200 px-4 py-3 text-[#0f0f0f] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[#0f0f0f] text-xs font-bold uppercase tracking-widest mb-2" style={{ letterSpacing: "0.12em" }}>
                  Company
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  placeholder="e.g. Ausbuild"
                  className="w-full border border-gray-200 px-4 py-3 text-[#0f0f0f] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#0f0f0f] text-xs font-bold uppercase tracking-widest mb-2" style={{ letterSpacing: "0.12em" }}>
                  Phone <span className="text-[#c9a84c]">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="e.g. 0412 345 678"
                  className="w-full border border-gray-200 px-4 py-3 text-[#0f0f0f] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[#0f0f0f] text-xs font-bold uppercase tracking-widest mb-2" style={{ letterSpacing: "0.12em" }}>
                  Email <span className="text-[#c9a84c]">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="e.g. john@builder.com.au"
                  className="w-full border border-gray-200 px-4 py-3 text-[#0f0f0f] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Project location */}
          <div>
            <h2 className="text-[#0f0f0f] font-black uppercase text-sm tracking-widest mb-6" style={{ letterSpacing: "0.14em" }}>
              Project Location
            </h2>
            <div>
              <label className="block text-[#0f0f0f] text-xs font-bold uppercase tracking-widest mb-2" style={{ letterSpacing: "0.12em" }}>
                Site Address or Area <span className="text-[#c9a84c]">*</span>
              </label>
              <input
                type="text"
                value={form.projectAddress}
                onChange={(e) => update("projectAddress", e.target.value)}
                placeholder="e.g. 12 Builder St, Coomera  —  or just  Gold Coast"
                className="w-full border border-gray-200 px-4 py-3 text-[#0f0f0f] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                required
              />
              <p className="text-gray-400 text-xs mt-2" style={{ fontWeight: 300 }}>
                A full address or just the suburb / area is fine — we confirm the details when we call.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Services */}
          <div>
            <h2 className="text-[#0f0f0f] font-black uppercase text-sm tracking-widest mb-2" style={{ letterSpacing: "0.14em" }}>
              What Do You Need? <span className="text-[#c9a84c]">*</span>
            </h2>
            <p className="text-gray-400 text-xs mb-5" style={{ fontWeight: 300 }}>Select all that apply — not sure? Just pick "Quote All".</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {serviceOptions.map((s) => {
                const selected = form.services.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border transition-all text-left ${
                      selected
                        ? "bg-[#c9a84c] border-[#c9a84c] text-[#0f0f0f]"
                        : "bg-white border-gray-200 text-gray-500 hover:border-[#c9a84c]/50"
                    }`}
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {selected && <span className="mr-1.5">✓</span>}
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Optional notes */}
          <div>
            <label className="block text-[#0f0f0f] text-xs font-bold uppercase tracking-widest mb-2" style={{ letterSpacing: "0.12em" }}>
              Anything Else? <span className="text-gray-300 font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Lot count, stage number, timeline, special requirements..."
              rows={3}
              className="w-full border border-gray-200 px-4 py-3 text-[#0f0f0f] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit || submitMutation.isPending}
            className="w-full py-5 text-sm font-black uppercase tracking-widest transition-all"
            style={{
              letterSpacing: "0.18em",
              background: canSubmit ? "#c9a84c" : "#e5e5e5",
              color: canSubmit ? "#0f0f0f" : "#aaa",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            {submitMutation.isPending ? "Sending..." : "Submit Project →"}
          </button>

          <p className="text-center text-gray-400 text-xs" style={{ fontWeight: 300 }}>
            We respond within 1 business day. Or call us now on{" "}
            <a href="tel:0468041477" className="text-[#c9a84c] font-semibold">0468 041 477</a>.
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
