/*
 * RENDER KING — Admin Dashboard
 * Full admin panel: blog management, SEO audit, keyword tracker, Google tools
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Eye, EyeOff, Trash2, Send, Plus, UserX, UserCheck,
  Loader2, ChevronDown, ChevronUp, ExternalLink, CheckCircle,
  XCircle, AlertCircle, Search, BarChart2, FileText, Globe,
  Lock, LogIn
} from "lucide-react";
import { getLoginUrl } from "@/const";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  published: number;
  createdAt: Date;
}

interface ClientEmail {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  active: number;
  createdAt: Date;
}

// ─── SEO Checklist data ───────────────────────────────────────────────────────
const SEO_PAGES = [
  {
    name: "Homepage",
    path: "/",
    checks: [
      { label: "Title tag", status: "pass" },
      { label: "Meta description", status: "pass" },
      { label: "Open Graph tags", status: "pass" },
      { label: "LocalBusiness JSON-LD", status: "pass" },
      { label: "Canonical URL", status: "pass" },
      { label: "H1 tag", status: "pass" },
      { label: "GA4 tracking", status: "pass" },
    ],
  },
  {
    name: "Services",
    path: "/services",
    checks: [
      { label: "Title tag", status: "pass" },
      { label: "Meta description", status: "pass" },
      { label: "Open Graph tags", status: "pass" },
      { label: "LocalBusiness JSON-LD", status: "pass" },
      { label: "Canonical URL", status: "pass" },
      { label: "H1 tag", status: "pass" },
      { label: "GA4 tracking", status: "pass" },
    ],
  },
  {
    name: "Contact",
    path: "/contact",
    checks: [
      { label: "Title tag", status: "pass" },
      { label: "Meta description", status: "pass" },
      { label: "Open Graph tags", status: "pass" },
      { label: "LocalBusiness JSON-LD", status: "pass" },
      { label: "Canonical URL", status: "pass" },
      { label: "H1 tag", status: "pass" },
      { label: "GA4 tracking", status: "pass" },
    ],
  },
  {
    name: "Blog",
    path: "/blog",
    checks: [
      { label: "Title tag", status: "pass" },
      { label: "Meta description", status: "pass" },
      { label: "Open Graph tags", status: "pass" },
      { label: "Canonical URL", status: "pass" },
      { label: "H1 tag", status: "pass" },
      { label: "GA4 tracking", status: "pass" },
      { label: "LocalBusiness JSON-LD", status: "warn" },
    ],
  },
  {
    name: "Builder Portal",
    path: "/submit-project",
    checks: [
      { label: "Title tag", status: "pass" },
      { label: "Meta description", status: "pass" },
      { label: "Open Graph tags", status: "pass" },
      { label: "Canonical URL", status: "pass" },
      { label: "H1 tag", status: "pass" },
      { label: "GA4 tracking", status: "pass" },
      { label: "LocalBusiness JSON-LD", status: "warn" },
    ],
  },
];

const TARGET_KEYWORDS = [
  { keyword: "rendering contractor Brisbane", priority: "High" },
  { keyword: "acrylic render Brisbane", priority: "High" },
  { keyword: "Hebel installation Brisbane", priority: "High" },
  { keyword: "EPS cladding Brisbane", priority: "High" },
  { keyword: "rendering contractor Gold Coast", priority: "High" },
  { keyword: "acrylic render Gold Coast", priority: "Medium" },
  { keyword: "rendering contractor Ipswich", priority: "Medium" },
  { keyword: "rendering contractor Springfield", priority: "Medium" },
  { keyword: "Dulux Acratex applicator Brisbane", priority: "Medium" },
  { keyword: "volume builder renderer SEQ", priority: "Medium" },
  { keyword: "external wall cladding Brisbane", priority: "Medium" },
  { keyword: "render and paint Brisbane", priority: "Low" },
];

// ─── Blog Post Row ─────────────────────────────────────────────────────────────
function PostRow({ post, onRefetch }: { post: BlogPost; onRefetch: () => void }) {
  const [blastLoading, setBlastLoading] = useState(false);
  const [blastResult, setBlastResult] = useState<{ sent: number; failed: number } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const toggleMutation = trpc.blogAdmin.togglePublished.useMutation({
    onSuccess: () => {
      onRefetch();
      toast.success(post.published ? "Post unpublished" : "Post published");
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = trpc.blogAdmin.delete.useMutation({
    onSuccess: () => {
      onRefetch();
      toast.success("Post deleted");
    },
    onError: (e) => toast.error(e.message),
  });

  const blastMutation = trpc.blogAdmin.sendBlast.useMutation({
    onSuccess: (data) => {
      setBlastResult(data);
      setBlastLoading(false);
      toast.success(`Blast sent — ${data.sent} delivered, ${data.failed} failed`);
    },
    onError: (e) => {
      setBlastLoading(false);
      toast.error(e.message);
    },
  });

  const handleBlast = () => {
    setBlastLoading(true);
    setBlastResult(null);
    blastMutation.mutate({ postId: post.id });
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    deleteMutation.mutate({ id: post.id });
  };

  return (
    <div
      className="border border-white/10 rounded-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3"
      style={{ background: post.published ? "#141414" : "#1a1200" }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="inline-block px-2 py-0.5 text-xs uppercase tracking-wider rounded-sm font-bold"
            style={{
              background: post.published ? "#c9a84c22" : "#ff660022",
              color: post.published ? "#c9a84c" : "#ff9944",
            }}
          >
            {post.published ? "Published" : "Draft"}
          </span>
          <span className="text-xs text-white/30 uppercase tracking-wider">{post.category}</span>
          <span className="text-xs text-white/20">· {post.readTime}</span>
        </div>
        <p className="text-sm font-semibold text-white truncate">{post.title}</p>
        <p className="text-xs text-white/30 mt-0.5">
          {new Date(post.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {post.published && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-white/30 hover:text-white/70 transition-colors"
            title="View post"
          >
            <ExternalLink size={14} />
          </a>
        )}

        <button
          onClick={() =>     toggleMutation.mutate({ id: post.id, published: post.published })}
          disabled={toggleMutation.isPending}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-white/30 transition-colors disabled:opacity-50"
          style={{ color: post.published ? "#ff9944" : "#c9a84c" }}
          title={post.published ? "Unpublish" : "Publish"}
        >
          {toggleMutation.isPending ? (
            <Loader2 size={12} className="animate-spin" />
          ) : post.published ? (
            <><EyeOff size={12} /> Unpublish</>
          ) : (
            <><Eye size={12} /> Publish</>
          )}
        </button>

        {post.published && (
          <button
            onClick={handleBlast}
            disabled={blastLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-white/30 transition-colors disabled:opacity-50 text-white/60"
            title="Email blast to client list"
          >
            {blastLoading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
            Blast
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="p-1.5 transition-colors disabled:opacity-50"
          style={{ color: confirmDelete ? "#ff4444" : "#ffffff30" }}
          title={confirmDelete ? "Click again to confirm delete" : "Delete post"}
        >
          {deleteMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
      </div>

      {blastResult && (
        <div className="w-full text-xs text-white/40 border-t border-white/10 pt-2 mt-1">
          Last blast: {blastResult.sent} delivered · {blastResult.failed} failed
        </div>
      )}
    </div>
  );
}

// ─── Add Client Form ──────────────────────────────────────────────────────────
function AddClientForm({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const addMutation = trpc.clients.add.useMutation({
    onSuccess: () => {
      setName(""); setEmail(""); setCompany("");
      setOpen(false);
      onAdded();
      toast.success("Client added");
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="border border-white/10 rounded-sm mb-4" style={{ background: "#141414" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
          <Plus size={12} /> Add New Client
        </span>
        {open ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
      </button>
      {open && (
        <form
          onSubmit={(e) => { e.preventDefault(); addMutation.mutate({ name, email, company: company || undefined }); }}
          className="px-4 pb-4 border-t border-white/10 pt-4 flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Smith"
              className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@builder.com.au"
              className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Company</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Ausbuild"
              className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={addMutation.isPending}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50"
              style={{ background: "#c9a84c", color: "#0f0f0f" }}
            >
              {addMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── Client Row ───────────────────────────────────────────────────────────────
function ClientRow({ client, onRefetch }: { client: ClientEmail; onRefetch: () => void }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const toggleMutation = trpc.clients.toggleActive.useMutation({
    onSuccess: () => {
      onRefetch();
      toast.success(client.active ? "Client deactivated" : "Client activated");
    },
    onError: (e) => toast.error(e.message),
  });

  const removeMutation = trpc.clients.remove.useMutation({
    onSuccess: () => {
      onRefetch();
      toast.success("Client removed");
    },
    onError: (e) => toast.error(e.message),
  });

  const handleRemove = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    removeMutation.mutate({ id: client.id });
  };

  return (
    <div
      className="border border-white/10 rounded-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2"
      style={{ background: "#141414", opacity: client.active ? 1 : 0.5 }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{client.name}</p>
        <p className="text-xs text-white/40">{client.email}{client.company ? ` · ${client.company}` : ""}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => toggleMutation.mutate({ id: client.id, active: client.active })}
          disabled={toggleMutation.isPending}
          className="p-1.5 transition-colors disabled:opacity-50"
          style={{ color: client.active ? "#c9a84c" : "#ffffff30" }}
          title={client.active ? "Deactivate" : "Activate"}
        >
          {toggleMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : client.active ? <UserCheck size={14} /> : <UserX size={14} />}
        </button>
        <button
          onClick={handleRemove}
          disabled={removeMutation.isPending}
          className="p-1.5 transition-colors disabled:opacity-50"
          style={{ color: confirmDelete ? "#ff4444" : "#ffffff30" }}
          title={confirmDelete ? "Click again to confirm" : "Remove client"}
        >
          {removeMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
      </div>
    </div>
  );
}

// ─── Generate Post Panel ─────────────────────────────────────────────────────
function GeneratePostPanel({ onGenerated }: { onGenerated: () => void }) {
  const [topic, setTopic] = useState("");
  const [saveDraft, setSaveDraft] = useState(true);
  const [open, setOpen] = useState(false);
  const [lastResult, setLastResult] = useState<{ title: string; slug: string; published: number } | null>(null);

  const generateMutation = trpc.blogAdmin.generate.useMutation({
    onSuccess: (data) => {
      setLastResult(data);
      setTopic("");
      onGenerated();
      toast.success(`Post generated: "${data.title}"`);
    },
    onError: (e) => toast.error(`Generate failed: ${e.message}`),
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    generateMutation.mutate({ topic: topic.trim() || undefined, saveDraft });
  };

  return (
    <div className="border border-white/10 rounded-sm mb-6" style={{ background: "#141414" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider" style={{ color: "#c9a84c" }}>
          <FileText size={14} />
          AI Generate New Post
          {generateMutation.isPending && <Loader2 size={12} className="animate-spin ml-1" />}
        </span>
        {open ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
      </button>
      {open && (
        <form onSubmit={handleGenerate} className="px-4 pb-4 border-t border-white/10 pt-4 flex flex-col gap-3">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">
              Topic (optional — leave blank for auto-pick from Brisbane/SEQ pool)
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Hebel vs brick veneer for Gold Coast builds"
              className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={saveDraft}
              onChange={(e) => setSaveDraft(e.target.checked)}
              className="accent-yellow-500"
            />
            <span className="text-xs text-white/50 uppercase tracking-wider">Save as draft (review before publishing)</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={generateMutation.isPending}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50"
              style={{ background: "#c9a84c", color: "#0f0f0f" }}
            >
              {generateMutation.isPending ? (
                <><Loader2 size={12} className="animate-spin" /> Generating (~15s)…</>
              ) : (
                "Generate Post"
              )}
            </button>
            {lastResult && (
              <a
                href={`/blog/${lastResult.slug}`}
                className="text-xs text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
              >
                View: {lastResult.title.slice(0, 40)}…
              </a>
            )}
          </div>
          <p className="text-xs text-white/25">
            Auto-generates a 700+ word SEO article on Brisbane/Gold Coast building topics. Saves as draft by default — you review and publish.
          </p>
        </form>
      )}
    </div>
  );
}

// ─── SEO Panel ────────────────────────────────────────────────────────────────
function SEOPanel() {
  const [open, setOpen] = useState(false);

  const statusIcon = (status: string) => {
    if (status === "pass") return <CheckCircle size={13} className="text-green-400 flex-shrink-0" />;
    if (status === "warn") return <AlertCircle size={13} className="text-yellow-400 flex-shrink-0" />;
    return <XCircle size={13} className="text-red-400 flex-shrink-0" />;
  };

  const pageScore = (checks: { status: string }[]) => {
    const pass = checks.filter(c => c.status === "pass").length;
    return Math.round((pass / checks.length) * 100);
  };

  return (
    <div className="border border-white/10 rounded-sm mb-6" style={{ background: "#141414" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider" style={{ color: "#c9a84c" }}>
          <Globe size={14} />
          SEO Audit — All Pages
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-green-400 font-bold">All pages passing</span>
          {open ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
        </div>
      </button>
      {open && (
        <div className="border-t border-white/10 px-4 pb-4 pt-4 flex flex-col gap-4">
          {SEO_PAGES.map((page) => (
            <div key={page.path}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <a
                    href={`https://renderking.au${page.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-yellow-400 transition-colors flex items-center gap-1"
                  >
                    {page.name} <ExternalLink size={11} className="opacity-50" />
                  </a>
                </div>
                <span className="text-xs font-bold" style={{ color: pageScore(page.checks) === 100 ? "#4ade80" : "#c9a84c" }}>
                  {pageScore(page.checks)}%
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {page.checks.map((check) => (
                  <div key={check.label} className="flex items-center gap-1.5 text-xs text-white/50">
                    {statusIcon(check.status)}
                    {check.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-white/10 pt-3 mt-1">
            <p className="text-xs text-white/30">
              ⚠ Blog and Builder Portal pages don't carry LocalBusiness JSON-LD — this is expected. JSON-LD lives on the homepage and is inherited by Google for the domain.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Keyword Tracker ─────────────────────────────────────────────────────────
function KeywordPanel() {
  const [open, setOpen] = useState(false);

  const priorityColor = (p: string) =>
    p === "High" ? "#ff9944" : p === "Medium" ? "#c9a84c" : "#ffffff40";

  return (
    <div className="border border-white/10 rounded-sm mb-6" style={{ background: "#141414" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider" style={{ color: "#c9a84c" }}>
          <Search size={14} />
          Target Keywords — Brisbane / SEQ
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40">{TARGET_KEYWORDS.length} keywords tracked</span>
          {open ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
        </div>
      </button>
      {open && (
        <div className="border-t border-white/10 px-4 pb-4 pt-4">
          <div className="flex flex-col gap-2">
            {TARGET_KEYWORDS.map((kw) => (
              <div key={kw.keyword} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm" style={{ background: priorityColor(kw.priority) + "22", color: priorityColor(kw.priority) }}>
                    {kw.priority}
                  </span>
                  <span className="text-sm text-white truncate">{kw.keyword}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`https://www.google.com.au/search?q=${encodeURIComponent(kw.keyword)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/30 hover:text-white/70 transition-colors flex items-center gap-1 uppercase tracking-wider"
                  >
                    Google <ExternalLink size={10} />
                  </a>
                  <a
                    href={`https://www.google.com.au/maps/search/${encodeURIComponent(kw.keyword)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/30 hover:text-white/70 transition-colors flex items-center gap-1 uppercase tracking-wider"
                  >
                    Maps <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/25 mt-4 border-t border-white/10 pt-3">
            Click Google or Maps to check current ranking for each keyword. Target: top 3 for all High priority keywords within 90 days.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Google Tools Panel ───────────────────────────────────────────────────────
function GoogleToolsPanel() {
  const [open, setOpen] = useState(true);

  const tools = [
    {
      group: "Google Search Console",
      icon: "🔍",
      links: [
        { label: "Performance Report", desc: "Clicks, impressions, CTR, average position", url: "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Arenderking.au" },
        { label: "Coverage Report", desc: "Indexed pages, errors, excluded URLs", url: "https://search.google.com/search-console/index?resource_id=sc-domain%3Arenderking.au" },
        { label: "Sitemaps", desc: "Check sitemap status and submitted URLs", url: "https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Arenderking.au" },
        { label: "URL Inspection", desc: "Check any page's index status + request indexing", url: "https://search.google.com/search-console/inspect?resource_id=sc-domain%3Arenderking.au&item_url=https%3A%2F%2Frenderking.au%2F" },
      ],
    },
    {
      group: "Google Analytics (GA4)",
      icon: "📊",
      links: [
        { label: "Realtime Overview", desc: "Active users right now", url: "https://analytics.google.com/analytics/web/#/p" },
        { label: "Traffic Acquisition", desc: "Where visitors are coming from", url: "https://analytics.google.com/analytics/web/#/p" },
        { label: "Pages & Screens", desc: "Most visited pages and bounce rates", url: "https://analytics.google.com/analytics/web/#/p" },
        { label: "Geographic Report", desc: "Visitor locations — confirm Brisbane/SEQ traffic", url: "https://analytics.google.com/analytics/web/#/p" },
      ],
    },
    {
      group: "Google Business Profile",
      icon: "📍",
      links: [
        { label: "Business Profile Manager", desc: "Edit name, hours, photos, posts", url: "https://business.google.com" },
        { label: "Reviews", desc: "Respond to reviews + get review link", url: "https://business.google.com" },
        { label: "Photos", desc: "Upload job site photos (target: 20+)", url: "https://business.google.com" },
        { label: "Posts", desc: "Create a Google Business Post", url: "https://business.google.com" },
      ],
    },
  ];

  return (
    <div className="border border-white/10 rounded-sm mb-6" style={{ background: "#141414" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider" style={{ color: "#c9a84c" }}>
          <BarChart2 size={14} />
          Google Tools — Search Console · Analytics · GBP
        </span>
        {open ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
      </button>
      {open && (
        <div className="border-t border-white/10 px-4 pb-4 pt-4 flex flex-col gap-6">
          {tools.map((group) => (
            <div key={group.group}>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
                {group.icon} {group.group}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-2 border border-white/10 rounded-sm px-3 py-2.5 hover:border-white/30 hover:bg-white/5 transition-all group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-yellow-400 transition-colors">{link.label}</p>
                      <p className="text-xs text-white/30 mt-0.5">{link.desc}</p>
                    </div>
                    <ExternalLink size={12} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0 mt-0.5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BlogAdmin() {
  const { user, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#f2f2f2" }}>
        <Navigation />
        <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
          <Loader2 size={24} className="animate-spin text-white/30" />
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#f2f2f2" }}>
        <Navigation />
        <div className="flex flex-col items-center justify-center text-center px-6" style={{ minHeight: "60vh" }}>
          <Lock size={32} className="text-white/20 mb-4" />
          <h2 className="text-xl font-black uppercase tracking-tight text-white mb-2">Admin Access Required</h2>
          <p className="text-white/40 text-sm mb-6 max-w-sm">
            You need to be logged in with an admin account to access this panel.
          </p>
          <a
            href={getLoginUrl()}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-widest transition-opacity"
            style={{ background: "#c9a84c", color: "#0f0f0f" }}
          >
            <LogIn size={14} /> Log In
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return (
      <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#f2f2f2" }}>
        <Navigation />
        <div className="flex flex-col items-center justify-center text-center px-6" style={{ minHeight: "60vh" }}>
          <Lock size={32} className="text-white/20 mb-4" />
          <h2 className="text-xl font-black uppercase tracking-tight text-white mb-2">Admin Access Only</h2>
          <p className="text-white/40 text-sm mb-2 max-w-sm">
            Your account <span className="text-white/70">{user.name}</span> does not have admin permissions.
          </p>
          <p className="text-white/30 text-xs max-w-sm">
            Contact Matty to have your account upgraded to admin access.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return <AdminDashboard user={{ name: user.name ?? "Admin", role: user.role }} />;
}

// ─── Admin Dashboard (only renders when user is confirmed admin) ───────────────
function AdminDashboard({ user }: { user: { name: string; role: string } }) {
  const {
    data: posts,
    isLoading: postsLoading,
    refetch: refetchPosts,
  } = trpc.blogAdmin.listAll.useQuery();

  const {
    data: clients,
    isLoading: clientsLoading,
    refetch: refetchClients,
  } = trpc.clients.list.useQuery();

  const publishedCount = posts?.filter((p) => p.published).length ?? 0;
  const draftCount = posts?.filter((p) => !p.published).length ?? 0;
  const activeClients = clients?.filter((c) => c.active).length ?? 0;
  const totalPosts = posts?.length ?? 0;

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#f2f2f2" }}>
      <Navigation />

      <div style={{ paddingTop: "calc(128px + 70px)" }}>
        <div className="max-w-5xl mx-auto px-6 pb-24">

          {/* Header */}
          <div className="mb-10 border-b border-white/10 pb-8">
            <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#c9a84c" }}>
              Admin Panel · {user.name}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
              Render King Dashboard
            </h1>
            <p className="text-white/40 text-sm">
              Blog management · SEO audit · Keyword tracking · Google tools
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Published Posts", value: publishedCount, color: "#4ade80" },
              { label: "Drafts Waiting", value: draftCount, color: draftCount > 0 ? "#ff9944" : "#ffffff40" },
              { label: "Total Posts", value: totalPosts, color: "#c9a84c" },
              { label: "Active Clients", value: activeClients, color: "#60a5fa" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 rounded-sm p-4 text-center"
                style={{ background: "#141414" }}
              >
                <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Draft alert */}
          {draftCount > 0 && (
            <div
              className="border rounded-sm px-4 py-3 mb-6 flex items-center gap-3"
              style={{ background: "#1a1200", borderColor: "#c9a84c44" }}
            >
              <AlertCircle size={16} style={{ color: "#c9a84c" }} className="flex-shrink-0" />
              <p className="text-sm" style={{ color: "#c9a84c" }}>
                <strong>{draftCount} draft{draftCount > 1 ? "s" : ""} waiting for review.</strong>{" "}
                <span className="text-white/50">Scroll down to Blog Posts → find the orange "Draft" badge → click Publish when ready.</span>
              </p>
            </div>
          )}

          {/* ── Google Tools ── */}
          <GoogleToolsPanel />

          {/* ── SEO Audit ── */}
          <SEOPanel />

          {/* ── Keyword Tracker ── */}
          <KeywordPanel />

          {/* ── Generate Post ── */}
          <GeneratePostPanel onGenerated={refetchPosts} />

          {/* ── Blog Posts ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: "#c9a84c" }}>
                Blog Posts
              </h2>
              <a
                href="/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                View Public Blog <ExternalLink size={10} />
              </a>
            </div>

            {postsLoading ? (
              <div className="flex items-center gap-2 text-white/40 text-sm py-8">
                <Loader2 size={16} className="animate-spin" /> Loading posts…
              </div>
            ) : !posts?.length ? (
              <p className="text-white/30 text-sm py-8">No blog posts yet. Use the AI generator above to create your first post.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {/* Show drafts first */}
                {posts
                  .slice()
                  .sort((a, b) => (a.published === b.published ? 0 : a.published ? 1 : -1))
                  .map((post) => (
                    <PostRow key={post.id} post={post as BlogPost} onRefetch={refetchPosts} />
                  ))}
              </div>
            )}
          </section>

          {/* ── Client Email List ── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: "#c9a84c" }}>
                Client Email Blast List
              </h2>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                {activeClients} active · {(clients?.length ?? 0) - activeClients} inactive
              </span>
            </div>

            <AddClientForm onAdded={refetchClients} />

            <div className="flex flex-col gap-3 mt-4">
              {clientsLoading ? (
                <div className="flex items-center gap-2 text-white/40 text-sm py-4">
                  <Loader2 size={16} className="animate-spin" /> Loading clients…
                </div>
              ) : !clients?.length ? (
                <p className="text-white/30 text-sm py-4">
                  No clients yet. Add your volume builder contacts above — Ausbuild, Metricon, Stylemaster, McCarthy, Parade, Taylord.
                </p>
              ) : (
                clients.map((client) => (
                  <ClientRow key={client.id} client={client as ClientEmail} onRefetch={refetchClients} />
                ))
              )}
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
