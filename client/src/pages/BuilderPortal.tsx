/*
 * RENDER KING — Builder Portal / Submit Project
 * Dark Luxury Editorial design
 * 4-step form: Builder ID → Project Details → Upload Files → Submit
 * Server-side submission via tRPC → notifyOwner → instant email to Matty
 */
import { useState, useRef } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Upload, CheckCircle, AlertCircle, X, FileText, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const STEPS = [
  { id: 1, label: "Your Details" },
  { id: 2, label: "Project Info" },
  { id: 3, label: "Upload Files" },
  { id: 4, label: "Submit" },
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
      toast.error("Submission failed. Please call us directly on (07) 3123 4567.");
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="container max-w-2xl text-center py-24">
            <div className="flex justify-center mb-8">
              <CheckCircle size={64} className="rk-gold" />
            </div>
            <p className="rk-section-label mb-4">Submission Received</p>
            <h1
              className="text-white font-black uppercase mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.03em" }}
            >
              PROJECT LODGED.<br />
              <span className="rk-gold">WE'LL BE IN TOUCH.</span>
            </h1>
            <div className="rk-divider mx-auto mb-8" />
            <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
              Your project for <strong className="text-white">{form.suburb}</strong> has been submitted to the Render King estimating team. You'll receive a response within 1 business day.
            </p>
            {submissionRef && (
              <p className="text-white/40 text-xs mb-10" style={{ fontWeight: 300 }}>
                Reference: {submissionRef} — {form.companyName}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="rk-btn-gold">Back to Home</Link>
              <Link href="/portfolio" className="rk-btn-outline">View Our Work</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-12 bg-[#0a0a0a] border-b border-white/8">
        <div className="container">
          <p className="rk-section-label mb-3">Builder Portal</p>
          <h1
            className="text-white font-black uppercase mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}
          >
            SUBMIT YOUR<br />
            <span className="rk-gold">PROJECT.</span>
          </h1>
          <p className="text-white/50 text-sm max-w-xl leading-relaxed" style={{ fontWeight: 300 }}>
            Upload your plans, specs, or photos. Our estimating team will review and respond within 1 business day. All submissions are treated as confidential.
          </p>
        </div>
      </section>

      {/* Step Indicator */}
      <div className="bg-[#111] border-b border-white/8 sticky top-0 z-40">
        <div className="container">
          <div className="flex">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`flex-1 py-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  step === s.id
                    ? "border-[#c9a84c] text-[#c9a84c]"
                    : step > s.id
                    ? "border-[#c9a84c]/40 text-white/40"
                    : "border-transparent text-white/25"
                }`}
                style={{ letterSpacing: "0.1em" }}
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center text-xs font-black ${
                    step > s.id ? "bg-[#c9a84c]/30 text-[#c9a84c]" : step === s.id ? "bg-[#c9a84c] text-[#0f0f0f]" : "bg-white/10 text-white/30"
                  }`}
                >
                  {step > s.id ? "✓" : s.id}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="container py-16 max-w-3xl">

        {/* STEP 1 — Your Details */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <p className="rk-section-label mb-2">Step 1 of 4</p>
              <h2 className="text-white font-black uppercase text-2xl" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>
                YOUR DETAILS
              </h2>
              <div className="rk-divider mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Company / Builder Name *" value={form.companyName} onChange={(v) => update("companyName", v)} placeholder="e.g. Ausbuild Pty Ltd" />
              <FormField label="Your Name *" value={form.contactName} onChange={(v) => update("contactName", v)} placeholder="e.g. John Smith" />
              <FormField label="Phone *" value={form.phone} onChange={(v) => update("phone", v)} placeholder="0400 000 000" type="tel" />
              <FormField label="Email *" value={form.email} onChange={(v) => update("email", v)} placeholder="john@builder.com.au" type="email" />
            </div>
            <div>
              <label className="rk-section-label block mb-3">Builder Type</label>
              <div className="flex flex-wrap gap-2">
                {builderTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => update("builderType", t)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                      form.builderType === t
                        ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]"
                        : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                    }`}
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Project Info */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <p className="rk-section-label mb-2">Step 2 of 4</p>
              <h2 className="text-white font-black uppercase text-2xl" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>
                PROJECT DETAILS
              </h2>
              <div className="rk-divider mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FormField label="Project Address *" value={form.projectAddress} onChange={(v) => update("projectAddress", v)} placeholder="123 Example Street" />
              </div>
              <FormField label="Suburb *" value={form.suburb} onChange={(v) => update("suburb", v)} placeholder="e.g. Coomera" />
              <FormField label="Estimated Wall Area (m²)" value={form.wallArea} onChange={(v) => update("wallArea", v)} placeholder="e.g. 450" type="number" />
              <FormField label="Preferred Start Date" value={form.startDate} onChange={(v) => update("startDate", v)} placeholder="" type="date" />
            </div>
            <div>
              <label className="rk-section-label block mb-3">Project Type</label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => update("projectType", t)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                      form.projectType === t
                        ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]"
                        : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                    }`}
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="rk-section-label block mb-3">Services Required * (select all that apply)</label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleService(s)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                      form.services.includes(s)
                        ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]"
                        : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                    }`}
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="rk-section-label block mb-3">Additional Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Any specific requirements, access notes, colour preferences, or questions for our estimator..."
                rows={4}
                className="w-full bg-[#141414] border border-white/10 text-white/80 text-sm p-4 focus:outline-none focus:border-[#c9a84c] transition-colors resize-none"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
              />
            </div>
          </div>
        )}

        {/* STEP 3 — Upload Files */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <p className="rk-section-label mb-2">Step 3 of 4</p>
              <h2 className="text-white font-black uppercase text-2xl" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>
                UPLOAD FILES
              </h2>
              <div className="rk-divider mt-3" />
              <p className="text-white/50 text-sm mt-4" style={{ fontWeight: 300 }}>
                Upload plans, specs, photos, or any relevant documents. PDF, JPG, PNG, DWG accepted. Max 20MB per file.
              </p>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
                dragOver
                  ? "border-[#c9a84c] bg-[#c9a84c]/5"
                  : "border-white/15 hover:border-white/30 bg-[#141414]"
              }`}
            >
              <Upload size={32} className={`mx-auto mb-4 ${dragOver ? "rk-gold" : "text-white/30"}`} />
              <p className="text-white/60 text-sm mb-2" style={{ fontWeight: 300 }}>
                Drag & drop files here, or <span className="rk-gold font-semibold">click to browse</span>
              </p>
              <p className="text-white/30 text-xs">Plans, specs, photos, DWG files — up to 20MB each</p>
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
                <p className="rk-section-label mb-3">{form.files.length} File{form.files.length !== 1 ? "s" : ""} Attached</p>
                {form.files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#141414] border border-white/8 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="rk-gold" />
                      <div>
                        <p className="text-white text-sm font-medium">{f.name}</p>
                        <p className="text-white/40 text-xs">{(f.size / 1024).toFixed(0)} KB</p>
                      </div>
                    </div>
                    <button onClick={() => removeFile(i)} className="text-white/30 hover:text-white/70 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="rk-card">
              <p className="rk-section-label mb-2">No files yet?</p>
              <p className="text-white/50 text-sm" style={{ fontWeight: 300 }}>
                That's fine. You can still submit and our team will follow up to collect plans. Alternatively, email files directly to{" "}
                <a href="mailto:estimating@renderking.com.au" className="rk-gold hover:underline">estimating@renderking.com.au</a>
              </p>
            </div>
          </div>
        )}

        {/* STEP 4 — Review & Submit */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <p className="rk-section-label mb-2">Step 4 of 4</p>
              <h2 className="text-white font-black uppercase text-2xl" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>
                REVIEW & SUBMIT
              </h2>
              <div className="rk-divider mt-3" />
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <ReviewBlock title="Your Details">
                <ReviewRow label="Company" value={form.companyName} />
                <ReviewRow label="Contact" value={form.contactName} />
                <ReviewRow label="Phone" value={form.phone} />
                <ReviewRow label="Email" value={form.email} />
                {form.builderType && <ReviewRow label="Type" value={form.builderType} />}
              </ReviewBlock>

              <ReviewBlock title="Project Details">
                <ReviewRow label="Address" value={`${form.projectAddress}, ${form.suburb}`} />
                {form.projectType && <ReviewRow label="Type" value={form.projectType} />}
                <ReviewRow label="Services" value={form.services.join(", ")} />
                {form.wallArea && <ReviewRow label="Wall Area" value={`${form.wallArea} m²`} />}
                {form.startDate && <ReviewRow label="Start Date" value={form.startDate} />}
                {form.notes && <ReviewRow label="Notes" value={form.notes} />}
              </ReviewBlock>

              <ReviewBlock title="Files">
                {form.files.length === 0 ? (
                  <p className="text-white/40 text-sm" style={{ fontWeight: 300 }}>No files attached</p>
                ) : (
                  form.files.map((f, i) => (
                    <ReviewRow key={i} label={`File ${i + 1}`} value={f.name} />
                  ))
                )}
              </ReviewBlock>
            </div>

            <div className="rk-card border-l-[#c9a84c]">
              <div className="flex items-start gap-3">
                <AlertCircle size={16} className="rk-gold mt-0.5 shrink-0" />
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  By submitting, your project details will be sent directly to the Render King estimating team. We'll respond within 1 business day. All information is kept strictly confidential.
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitMutation.isPending}
              className="rk-btn-gold w-full text-center text-sm py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Project to Render King →"}
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between mt-12 pt-8 border-t border-white/8">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="rk-btn-outline text-xs"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="rk-btn-gold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {step === 3 ? "Review Submission" : "Continue"} <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function FormField({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="rk-section-label block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#141414] border border-white/10 text-white/80 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-white/20"
        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
      />
    </div>
  );
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#141414] border border-white/8">
      <div className="px-5 py-3 border-b border-white/8">
        <p className="rk-section-label">{title}</p>
      </div>
      <div className="px-5 py-4 space-y-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-white/30 text-xs w-24 shrink-0 pt-0.5" style={{ fontWeight: 600 }}>{label}</span>
      <span className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{value}</span>
    </div>
  );
}
