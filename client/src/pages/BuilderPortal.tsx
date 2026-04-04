/*
 * RENDER KING — Builder Portal / Submit Project
 * CONVERSION-FIRST DESIGN RULES:
 * 1. Every step scannable in under 3 seconds
 * 2. Inputs are ALWAYS high contrast — dark text on light background
 * 3. Next action is ALWAYS unmissable — gold, full-width, dominant
 * 4. Step progress is visually dominant — builder always knows where they are
 * 5. Labels are large and clear — never competing with background
 * 6. If it doesn't enhance connection or retention → it gets removed
 */
import { useState, useRef } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Upload, CheckCircle, AlertCircle, X, FileText, ChevronRight, Phone } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const STEPS = [
  { id: 1, label: "Your Details", sub: "Who are we quoting?" },
  { id: 2, label: "Project Info", sub: "Tell us about the job" },
  { id: 3, label: "Upload Files", sub: "Plans, specs, photos" },
  { id: 4, label: "Review", sub: "Confirm and submit" },
];

type FormData = {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  builderType: string;
  projectAddress: string;
  suburb: string;
  projectType: string;
  services: string[];
  wallArea: string;
  startDate: string;
  notes: string;
  files: File[];
};

const initialForm: FormData = {
  companyName: "",
  contactName: "",
  phone: "",
  email: "",
  builderType: "",
  projectAddress: "",
  suburb: "",
  projectType: "",
  services: [],
  wallArea: "",
  startDate: "",
  notes: "",
  files: [],
};

const serviceOptions = [
  "Acrylic Render",
  "Texture Coating",
  "Hebel Supply & Install",
  "EPS Cladding System",
  "Specialty Finishes",
  "External Microcement",
  "Not Sure — Quote All",
];

const projectTypes = [
  "New Residential Build",
  "Renovation / Reclad",
  "Volume Estate",
  "Duplex / Townhouse",
  "Low-Rise Commercial",
  "Other",
];

const builderTypes = [
  "Volume Builder",
  "Custom Builder",
  "Owner Builder",
  "Developer",
  "Architect / Designer",
  "Other",
];

export default function BuilderPortal() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitMutation = trpc.project.submit.useMutation({
    onSuccess: (data) => {
      setSubmissionRef(data.reference);
      setSubmitted(true);
    },
    onError: (error) => {
      toast.error("Submission failed. Please call us directly on 0468 041 477.");
      console.error("Submission error:", error);
    },
  });

  const update = (field: keyof FormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleService = (s: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter((f) => f.size < 20 * 1024 * 1024);
    setForm((prev) => ({ ...prev, files: [...prev.files, ...newFiles] }));
  };

  const removeFile = (index: number) => {
    setForm((prev) => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
  };

  const canProceed = () => {
    if (step === 1) return form.companyName && form.contactName && form.phone && form.email;
    if (step === 2) return form.projectAddress && form.suburb && form.services.length > 0;
    return true;
  };

  const handleSubmit = () => {
    submitMutation.mutate({
      companyName: form.companyName,
      contactName: form.contactName,
      phone: form.phone,
      email: form.email,
      builderType: form.builderType || undefined,
      projectAddress: form.projectAddress,
      suburb: form.suburb,
      projectType: form.projectType || undefined,
      services: form.services,
      wallArea: form.wallArea || undefined,
      startDate: form.startDate || undefined,
      notes: form.notes || undefined,
      fileNames: form.files.map((f) => f.name),
    });
  };

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center pt-20">
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
              PROJECT LODGED.<br />
              <span className="rk-gold">WE'LL BE IN TOUCH.</span>
            </h1>
            <div className="rk-divider mx-auto mb-8" />
            <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
              Your project for <strong className="text-white">{form.suburb}</strong> has been sent directly to the Render King estimating team. Expect a response within 1 business day.
            </p>
            {submissionRef && (
              <p className="text-white/35 text-xs mb-10 font-mono">
                Ref: {submissionRef}
              </p>
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
      <Navigation />

      {/* ── DARK HEADER ── */}
      <section className="pb-10 bg-[#0a0a0a] border-b border-white/8" style={{ paddingTop: '70px' }}>
        <div className="container max-w-3xl">
          <p className="rk-section-label mb-2">Builder Portal</p>
          <h1
            className="text-white font-black uppercase mb-3"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.03em", lineHeight: 1.05 }}
          >
            SUBMIT YOUR <span className="rk-gold">PROJECT.</span>
          </h1>
          <p className="text-white/45 text-sm max-w-lg leading-relaxed" style={{ fontWeight: 300 }}>
            Upload plans, specs, or photos. Our estimating team responds within 1 business day.
          </p>
        </div>
      </section>

      {/* ── STICKY STEP PROGRESS ── */}
      <div className="sticky top-0 z-40 bg-[#111] border-b border-white/8 shadow-xl">
        <div className="container max-w-3xl">
          {/* Step tabs */}
          <div className="flex">
            {STEPS.map((s) => {
              const isActive = step === s.id;
              const isDone = step > s.id;
              return (
                <div
                  key={s.id}
                  className={`flex-1 py-3 flex flex-col items-center justify-center gap-0.5 border-b-2 transition-all ${
                    isActive
                      ? "border-[#c9a84c]"
                      : isDone
                      ? "border-[#c9a84c]/50"
                      : "border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-5 h-5 flex items-center justify-center text-xs font-black transition-all ${
                        isDone
                          ? "bg-[#c9a84c]/25 text-[#c9a84c]"
                          : isActive
                          ? "bg-[#c9a84c] text-[#0f0f0f]"
                          : "bg-white/8 text-white/25"
                      }`}
                    >
                      {isDone ? "✓" : s.id}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase hidden sm:inline transition-all`}
                      style={{
                        letterSpacing: "0.1em",
                        color: isActive ? "#c9a84c" : isDone ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <span
                    className="text-xs hidden md:block"
                    style={{ color: "rgba(255,255,255,0.2)", fontWeight: 300, fontSize: "0.65rem" }}
                  >
                    {s.sub}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Progress bar */}
          <div className="h-0.5 bg-white/5">
            <div
              className="h-full bg-[#c9a84c] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── FORM BODY — WHITE CARD ON DARK BG ── */}
      <div className="container max-w-3xl py-10 pb-20">

        {/* ── STEP 1: YOUR DETAILS ── */}
        {step === 1 && (
          <div className="bg-white rounded-none shadow-2xl overflow-hidden">
            {/* Card header */}
            <div className="bg-[#0f0f0f] px-8 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-[#c9a84c] flex items-center justify-center text-[#0f0f0f] text-xs font-black">1</span>
                <div>
                  <h2 className="text-white font-black uppercase text-lg" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.06em" }}>
                    YOUR DETAILS
                  </h2>
                  <p className="text-white/40 text-xs" style={{ fontWeight: 300 }}>Who are we quoting?</p>
                </div>
              </div>
            </div>
            {/* Card body — white background, dark inputs */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <LightField label="Company / Builder Name *" value={form.companyName} onChange={(v) => update("companyName", v)} placeholder="e.g. Ausbuild Pty Ltd" />
                <LightField label="Your Name *" value={form.contactName} onChange={(v) => update("contactName", v)} placeholder="e.g. John Smith" />
                <LightField label="Phone Number *" value={form.phone} onChange={(v) => update("phone", v)} placeholder="0400 000 000" type="tel" />
                <LightField label="Email Address *" value={form.email} onChange={(v) => update("email", v)} placeholder="john@builder.com.au" type="email" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3" style={{ letterSpacing: "0.12em" }}>
                  Builder Type <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {builderTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => update("builderType", t)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                        form.builderType === t
                          ? "border-[#c9a84c] bg-[#c9a84c] text-[#0f0f0f]"
                          : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 bg-white"
                      }`}
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceed()}
                  className="w-full py-4 bg-[#c9a84c] text-[#0f0f0f] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#b8963d] transition-colors"
                  style={{ letterSpacing: "0.14em" }}
                >
                  Continue to Project Details <ChevronRight size={16} />
                </button>
                {!canProceed() && (
                  <p className="text-center text-xs text-gray-400 mt-2">Fill in Company, Name, Phone and Email to continue</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: PROJECT INFO ── */}
        {step === 2 && (
          <div className="bg-white rounded-none shadow-2xl overflow-hidden">
            <div className="bg-[#0f0f0f] px-8 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-[#c9a84c] flex items-center justify-center text-[#0f0f0f] text-xs font-black">2</span>
                <div>
                  <h2 className="text-white font-black uppercase text-lg" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.06em" }}>
                    PROJECT DETAILS
                  </h2>
                  <p className="text-white/40 text-xs" style={{ fontWeight: 300 }}>Tell us about the job</p>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <LightField label="Project Address *" value={form.projectAddress} onChange={(v) => update("projectAddress", v)} placeholder="123 Example Street" />
                </div>
                <LightField label="Suburb *" value={form.suburb} onChange={(v) => update("suburb", v)} placeholder="e.g. Coomera" />
                <LightField
                  label="Estimated Wall Area (m²)"
                  value={form.wallArea}
                  onChange={(v) => update("wallArea", v)}
                  placeholder="e.g. 450"
                  type="number"
                  hint="Approximate is fine — we confirm on site"
                />
                <LightField label="Preferred Start Date" value={form.startDate} onChange={(v) => update("startDate", v)} placeholder="" type="date" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3" style={{ letterSpacing: "0.12em" }}>
                  Project Type <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => update("projectType", t)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                        form.projectType === t
                          ? "border-[#c9a84c] bg-[#c9a84c] text-[#0f0f0f]"
                          : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 bg-white"
                      }`}
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1" style={{ letterSpacing: "0.12em" }}>
                  Services Required *
                </label>
                <p className="text-xs text-gray-400 mb-3" style={{ fontWeight: 300 }}>Select all that apply</p>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleService(s)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                        form.services.includes(s)
                          ? "border-[#c9a84c] bg-[#c9a84c] text-[#0f0f0f]"
                          : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 bg-white"
                      }`}
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {form.services.length === 0 && (
                  <p className="text-xs text-red-400 mt-2">Select at least one service to continue</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2" style={{ letterSpacing: "0.12em" }}>
                  Additional Notes <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Specific requirements, access notes, colour preferences, or questions for our estimator..."
                  rows={4}
                  className="w-full bg-gray-50 border-2 border-gray-200 text-gray-800 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors resize-none placeholder:text-gray-400"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 border-2 border-gray-200 text-gray-500 font-bold uppercase text-xs tracking-widest hover:border-gray-400 hover:text-gray-700 transition-colors"
                  style={{ letterSpacing: "0.12em" }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceed()}
                  className="flex-1 py-4 bg-[#c9a84c] text-[#0f0f0f] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#b8963d] transition-colors"
                  style={{ letterSpacing: "0.14em" }}
                >
                  Continue to Upload Files <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: UPLOAD FILES ── */}
        {step === 3 && (
          <div className="bg-white rounded-none shadow-2xl overflow-hidden">
            <div className="bg-[#0f0f0f] px-8 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-[#c9a84c] flex items-center justify-center text-[#0f0f0f] text-xs font-black">3</span>
                <div>
                  <h2 className="text-white font-black uppercase text-lg" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.06em" }}>
                    UPLOAD FILES
                  </h2>
                  <p className="text-white/40 text-xs" style={{ fontWeight: 300 }}>Plans, specs, photos — optional but helpful</p>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-[#c9a84c] bg-[#c9a84c]/5"
                    : "border-gray-200 hover:border-gray-400 bg-gray-50"
                }`}
              >
                <Upload size={36} className={`mx-auto mb-4 ${dragOver ? "text-[#c9a84c]" : "text-gray-300"}`} />
                <p className="text-gray-600 text-sm mb-1 font-medium">
                  Drag & drop files here, or <span className="text-[#c9a84c] font-bold">click to browse</span>
                </p>
                <p className="text-gray-400 text-xs">Plans, specs, photos, DWG files — up to 20MB each</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.dwg,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              {/* File List */}
              {form.files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3" style={{ letterSpacing: "0.12em" }}>
                    {form.files.length} File{form.files.length !== 1 ? "s" : ""} Attached
                  </p>
                  {form.files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-[#c9a84c]" />
                        <div>
                          <p className="text-gray-800 text-sm font-medium">{f.name}</p>
                          <p className="text-gray-400 text-xs">{(f.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                      <button onClick={() => removeFile(i)} className="text-gray-300 hover:text-gray-600 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* No files note */}
              <div className="bg-gray-50 border border-gray-200 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1" style={{ letterSpacing: "0.1em" }}>No files? No problem.</p>
                <p className="text-gray-500 text-sm" style={{ fontWeight: 300 }}>
                  Submit now and our team will follow up to collect plans. Or email directly to{" "}
                  <a href="mailto:projects@renderking.au" className="text-[#c9a84c] font-semibold hover:underline">projects@renderking.au</a>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-4 border-2 border-gray-200 text-gray-500 font-bold uppercase text-xs tracking-widest hover:border-gray-400 hover:text-gray-700 transition-colors"
                  style={{ letterSpacing: "0.12em" }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-4 bg-[#c9a84c] text-[#0f0f0f] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-[#b8963d] transition-colors"
                  style={{ letterSpacing: "0.14em" }}
                >
                  Review & Submit <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: REVIEW & SUBMIT ── */}
        {step === 4 && (
          <div className="bg-white rounded-none shadow-2xl overflow-hidden">
            <div className="bg-[#0f0f0f] px-8 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-[#c9a84c] flex items-center justify-center text-[#0f0f0f] text-xs font-black">4</span>
                <div>
                  <h2 className="text-white font-black uppercase text-lg" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.06em" }}>
                    REVIEW & SUBMIT
                  </h2>
                  <p className="text-white/40 text-xs" style={{ fontWeight: 300 }}>Confirm your details before sending</p>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-5">
              <LightReviewBlock title="Your Details">
                <LightReviewRow label="Company" value={form.companyName} />
                <LightReviewRow label="Contact" value={form.contactName} />
                <LightReviewRow label="Phone" value={form.phone} />
                <LightReviewRow label="Email" value={form.email} />
                {form.builderType && <LightReviewRow label="Type" value={form.builderType} />}
              </LightReviewBlock>

              <LightReviewBlock title="Project Details">
                <LightReviewRow label="Address" value={`${form.projectAddress}, ${form.suburb}`} />
                {form.projectType && <LightReviewRow label="Type" value={form.projectType} />}
                <LightReviewRow label="Services" value={form.services.join(", ")} />
                {form.wallArea && <LightReviewRow label="Wall Area" value={`${form.wallArea} m²`} />}
                {form.startDate && <LightReviewRow label="Start Date" value={form.startDate} />}
                {form.notes && <LightReviewRow label="Notes" value={form.notes} />}
              </LightReviewBlock>

              <LightReviewBlock title="Files">
                {form.files.length === 0 ? (
                  <p className="text-gray-400 text-sm">No files attached — team will follow up</p>
                ) : (
                  form.files.map((f, i) => (
                    <LightReviewRow key={i} label={`File ${i + 1}`} value={f.name} />
                  ))
                )}
              </LightReviewBlock>

              <div className="bg-amber-50 border border-amber-200 px-5 py-4 flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  Your project details will be sent directly to the Render King estimating team. We'll respond within 1 business day. All information is kept strictly confidential.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-4 border-2 border-gray-200 text-gray-500 font-bold uppercase text-xs tracking-widest hover:border-gray-400 hover:text-gray-700 transition-colors"
                  style={{ letterSpacing: "0.12em" }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="flex-1 py-5 bg-[#c9a84c] text-[#0f0f0f] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#b8963d] transition-colors"
                  style={{ letterSpacing: "0.14em" }}
                >
                  {submitMutation.isPending ? "Sending to Render King..." : "Submit Project to Render King →"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

// ── LIGHT FORM FIELD — dark text on white/gray background ──
function LightField({
  label, value, onChange, placeholder, type = "text", hint,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5" style={{ letterSpacing: "0.12em" }}>
        {label}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-1.5" style={{ fontWeight: 300 }}>{hint}</p>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-50 border-2 border-gray-200 text-gray-800 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-gray-400"
        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}
      />
    </div>
  );
}

// ── LIGHT REVIEW BLOCK ──
function LightReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-5 py-2.5 border-b border-gray-200">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500" style={{ letterSpacing: "0.12em" }}>{title}</p>
      </div>
      <div className="px-5 py-4 space-y-2">{children}</div>
    </div>
  );
}

// ── LIGHT REVIEW ROW ──
function LightReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-gray-400 text-xs w-24 shrink-0 pt-0.5 font-semibold uppercase" style={{ letterSpacing: "0.06em" }}>{label}</span>
      <span className="text-gray-700 text-sm" style={{ fontWeight: 400 }}>{value}</span>
    </div>
  );
}
