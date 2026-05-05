/*
 * RENDER KING — Blog Admin Panel
 * Admin-only page: manage blog posts (publish/unpublish/delete/blast) + client email list
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Eye, EyeOff, Trash2, Send, Plus, UserX, UserCheck, Loader2, ChevronDown, ChevronUp } from "lucide-react";

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
      className="border border-white/10 rounded-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3"
      style={{ background: "#141414" }}
    >
      {/* Status indicator */}
      <div className="flex-shrink-0">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: post.published ? "#c9a84c" : "#444" }}
        />
      </div>

      {/* Post info */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{post.title}</p>
        <p className="text-white/40 text-xs mt-0.5 uppercase tracking-wider">
          {post.category} · {post.readTime} ·{" "}
          {new Date(post.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
        </p>
        {blastResult && (
          <p className="text-xs mt-1" style={{ color: "#c9a84c" }}>
            Last blast: {blastResult.sent} sent, {blastResult.failed} failed
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Publish toggle */}
        <button
          onClick={() => toggleMutation.mutate({ id: post.id, published: post.published ? 0 : 1 })}
          disabled={toggleMutation.isPending}
          title={post.published ? "Unpublish" : "Publish"}
          className="p-2 rounded-sm border border-white/10 hover:border-white/30 transition-colors"
          style={{ background: "#1a1a1a" }}
        >
          {post.published ? (
            <Eye size={14} className="text-white/60" />
          ) : (
            <EyeOff size={14} className="text-white/30" />
          )}
        </button>

        {/* Email blast */}
        <button
          onClick={handleBlast}
          disabled={blastLoading || !post.published}
          title={post.published ? "Send email blast" : "Publish post first to send blast"}
          className="p-2 rounded-sm border border-white/10 hover:border-white/30 transition-colors disabled:opacity-30"
          style={{ background: "#1a1a1a" }}
        >
          {blastLoading ? (
            <Loader2 size={14} className="text-white/60 animate-spin" />
          ) : (
            <Send size={14} style={{ color: "#c9a84c" }} />
          )}
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          title={confirmDelete ? "Click again to confirm delete" : "Delete post"}
          className="p-2 rounded-sm border transition-colors"
          style={{
            background: "#1a1a1a",
            borderColor: confirmDelete ? "#ef4444" : "rgba(255,255,255,0.1)",
          }}
        >
          <Trash2 size={14} style={{ color: confirmDelete ? "#ef4444" : "rgba(255,255,255,0.4)" }} />
        </button>
      </div>
    </div>
  );
}

// ─── Add Client Form ──────────────────────────────────────────────────────────
function AddClientForm({ onAdded }: { onAdded: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [open, setOpen] = useState(false);

  const addMutation = trpc.clients.add.useMutation({
    onSuccess: () => {
      setName(""); setEmail(""); setCompany("");
      setOpen(false);
      onAdded();
      toast.success("Client added");
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    addMutation.mutate({ name: name.trim(), email: email.trim(), company: company.trim() || undefined });
  };

  return (
    <div className="border border-white/10 rounded-sm" style={{ background: "#141414" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider" style={{ color: "#c9a84c" }}>
          <Plus size={14} />
          Add Client to Blast List
        </span>
        {open ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
      </button>
      {open && (
        <form onSubmit={handleSubmit} className="px-4 pb-4 flex flex-col gap-3 border-t border-white/10 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Smith"
                className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
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
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Company</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ausbuild"
                className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="self-start flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50"
            style={{ background: "#c9a84c", color: "#0f0f0f" }}
          >
            {addMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
            Add Client
          </button>
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
      <div className="flex-shrink-0">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: client.active ? "#c9a84c" : "#444" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold">{client.name}</p>
        <p className="text-white/40 text-xs mt-0.5">
          {client.email}
          {client.company ? ` · ${client.company}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => toggleMutation.mutate({ id: client.id, active: client.active ? 0 : 1 })}
          disabled={toggleMutation.isPending}
          title={client.active ? "Deactivate" : "Activate"}
          className="p-2 rounded-sm border border-white/10 hover:border-white/30 transition-colors"
          style={{ background: "#1a1a1a" }}
        >
          {client.active ? (
            <UserCheck size={14} style={{ color: "#c9a84c" }} />
          ) : (
            <UserX size={14} className="text-white/30" />
          )}
        </button>
        <button
          onClick={handleRemove}
          disabled={removeMutation.isPending}
          title={confirmDelete ? "Click again to confirm" : "Remove client"}
          className="p-2 rounded-sm border transition-colors"
          style={{
            background: "#1a1a1a",
            borderColor: confirmDelete ? "#ef4444" : "rgba(255,255,255,0.1)",
          }}
        >
          <Trash2 size={14} style={{ color: confirmDelete ? "#ef4444" : "rgba(255,255,255,0.4)" }} />
        </button>
      </div>
    </div>
  );
}

// ─── Generate Post Panel ─────────────────────────────────────────────────────
function GeneratePostPanel({ onGenerated }: { onGenerated: () => void }) {
  const [topic, setTopic] = useState("");
  const [saveDraft, setSaveDraft] = useState(false);
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
          <Loader2 size={14} className={generateMutation.isPending ? "animate-spin" : "opacity-0"} />
          AI Generate New Post
        </span>
        {open ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
      </button>
      {open && (
        <form onSubmit={handleGenerate} className="px-4 pb-4 border-t border-white/10 pt-4 flex flex-col gap-3">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">
              Topic (optional — leave blank for random)
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
            <span className="text-xs text-white/50 uppercase tracking-wider">Save as draft (don't publish immediately)</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={generateMutation.isPending}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50"
              style={{ background: "#c9a84c", color: "#0f0f0f" }}
            >
              {generateMutation.isPending ? (
                <><Loader2 size={12} className="animate-spin" /> Generating…</>
              ) : (
                "Generate Post"
              )}
            </button>
            {lastResult && (
              <a
                href={`/blog/${lastResult.slug}`}
                className="text-xs text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
              >
                View last: {lastResult.title.slice(0, 40)}…
              </a>
            )}
          </div>
          <p className="text-xs text-white/25">
            Uses AI to write a full SEO article on Brisbane/Gold Coast building topics. Takes ~15 seconds.
          </p>
        </form>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BlogAdmin() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  // Redirect non-admins
  if (!loading && (!user || user.role !== "admin")) {
    navigate("/");
    return null;
  }

  const {
    data: posts,
    isLoading: postsLoading,
    refetch: refetchPosts,
  } = trpc.blogAdmin.listAll.useQuery(undefined, { enabled: !!user && user.role === "admin" });

  const {
    data: clients,
    isLoading: clientsLoading,
    refetch: refetchClients,
  } = trpc.clients.list.useQuery(undefined, { enabled: !!user && user.role === "admin" });

  const publishedCount = posts?.filter((p) => p.published).length ?? 0;
  const draftCount = posts?.filter((p) => !p.published).length ?? 0;
  const activeClients = clients?.filter((c) => c.active).length ?? 0;

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#f2f2f2" }}>
      <Navigation />

      <div className="pt-32" style={{ paddingTop: "calc(128px + 70px)" }}>
        <div className="max-w-5xl mx-auto px-6 pb-24">

          {/* Header */}
          <div className="mb-10 border-b border-white/10 pb-8">
            <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#c9a84c" }}>
              Admin Panel
            </p>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
              Blog & Email Management
            </h1>
            <p className="text-white/40 text-sm">
              Manage blog posts, publish/unpublish, send email blasts to your client list.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: "Published", value: publishedCount },
              { label: "Drafts", value: draftCount },
              { label: "Active Clients", value: activeClients },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 rounded-sm p-4 text-center"
                style={{ background: "#141414" }}
              >
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

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
                className="text-xs text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
              >
                View Public Blog →
              </a>
            </div>

            {postsLoading ? (
              <div className="flex items-center gap-2 text-white/40 text-sm py-8">
                <Loader2 size={16} className="animate-spin" /> Loading posts…
              </div>
            ) : !posts?.length ? (
              <p className="text-white/30 text-sm py-8">No blog posts found.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {posts.map((post) => (
                  <PostRow key={post.id} post={post as BlogPost} onRefetch={refetchPosts} />
                ))}
              </div>
            )}
          </section>

          {/* ── Client Email List ── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: "#c9a84c" }}>
                Client Email List
              </h2>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                {activeClients} active
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
                  No clients yet. Add your first client above.
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
