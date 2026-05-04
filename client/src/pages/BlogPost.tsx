/*
 * RENDER KING — Blog Post Detail Page
 * Renders a single blog post with markdown content
 */
import { Link, useRoute } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Simple markdown-to-HTML renderer for the blog content
function renderMarkdown(md: string): string {
  return md
    // H2
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-3">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Tables — pipe tables
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split("|").filter(c => c.trim() !== "");
      return `<tr>${cells.map(c => `<td class="px-4 py-2 border border-white/10 text-white/70 text-sm">${c.trim()}</td>`).join("")}</tr>`;
    })
    .replace(/(<tr>[\s\S]*?<\/tr>\n?)+/gm, (tableContent) => {
      const rows = tableContent.trim().split("\n").filter(r => r.trim() && !r.match(/^\|[-| ]+\|$/));
      if (rows.length === 0) return tableContent;
      const [headerRow, ...bodyRows] = rows;
      const headerCells = headerRow.replace(/<td/g, '<th').replace(/<\/td>/g, '</th>').replace(/text-white\/70/g, 'text-[#C9A84C] font-semibold');
      return `<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-white/10 rounded-lg overflow-hidden"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows.join("\n")}</tbody></table></div>`;
    })
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="text-white/70 mb-2 ml-4 list-decimal">$1</li>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="text-white/70 mb-2 ml-4 list-disc">$1</li>')
    // Wrap consecutive list items
    .replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/gm, (match) => `<ul class="my-4 space-y-1 pl-4">${match}</ul>`)
    // Internal links
    .replace(/\[(.+?)\]\(\/(.+?)\)/g, '<a href="/$2" class="text-[#C9A84C] hover:underline font-medium">$1</a>')
    // External links
    .replace(/\[(.+?)\]\((https?:\/\/.+?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-[#C9A84C] hover:underline font-medium">$1</a>')
    // Paragraphs — lines that aren't already wrapped
    .replace(/^(?!<[hultd]).+$/gm, (line) => line.trim() ? `<p class="text-white/65 leading-relaxed mb-4">${line}</p>` : '')
    // Clean up empty paragraphs
    .replace(/<p[^>]*>\s*<\/p>/g, '');
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";

  const { data: post, isLoading } = trpc.blog.bySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <div className="container max-w-3xl py-32 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-white/5 rounded w-1/2 mx-auto" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <div className="container max-w-3xl py-32 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-white/50 mb-8">This article doesn't exist or has been removed.</p>
          <Link href="/blog">
            <button className="rk-btn-primary">← Back to Blog</button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SEO
        title={`${post.title} | Render King`}
        description={post.metaDescription}
        canonical={`https://renderking.au/blog/${post.slug}`}
      />
      <Navigation />

      {/* ── HERO ── */}
      {post.heroImage && (
        <div className="relative h-72 md:h-96 overflow-hidden" style={{ marginTop: "calc(128px + 70px - 2rem)" }}>
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>
      )}

      {/* ── ARTICLE ── */}
      <article className="container max-w-3xl py-12" style={!post.heroImage ? { paddingTop: "calc(128px + 70px)" } : {}}>
        {/* Back link */}
        <Link href="/blog">
          <a className="inline-flex items-center gap-2 text-white/40 hover:text-[#C9A84C] text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </a>
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-semibold px-2 py-1 rounded border text-[#C9A84C] border-[#C9A84C]/30 bg-[#C9A84C]/10">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-white/40 text-xs">
            <Calendar className="w-3 h-3" /> {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1 text-white/40 text-xs">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-8">
          {post.title}
        </h1>

        {/* Divider */}
        <div className="w-16 h-1 bg-[#C9A84C] mb-10" />

        {/* Content */}
        <div
          className="prose-rk"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 bg-[#111] border border-[#C9A84C]/20 rounded-lg text-center">
          <p className="rk-section-label mb-2">Ready to Work Together?</p>
          <h3 className="text-2xl font-black text-white mb-3">SUBMIT YOUR NEXT PROJECT</h3>
          <p className="text-white/50 text-sm mb-6">
            Our estimating team responds within one business day across Brisbane, Ipswich, and the Gold Coast.
          </p>
          <Link href="/submit-project">
            <button className="rk-btn-primary inline-flex items-center gap-2">
              Submit a Project Brief <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
