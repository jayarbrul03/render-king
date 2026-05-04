/*
 * RENDER KING — Blog Page
 * Lists all published blog posts with category filters
 */
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { Calendar, Clock, ArrowRight } from "lucide-react";

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Volume Builders": "text-[#C9A84C] border-[#C9A84C]/30 bg-[#C9A84C]/10",
  "Technical": "text-blue-400 border-blue-400/30 bg-blue-400/10",
  "For Builders": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "Quality": "text-purple-400 border-purple-400/30 bg-purple-400/10",
  "Systems": "text-orange-400 border-orange-400/30 bg-orange-400/10",
  "General": "text-gray-400 border-gray-400/30 bg-gray-400/10",
};

export default function Blog() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SEO
        title="Blog | Render King — Insights for Volume Builders in Brisbane & Gold Coast"
        description="Expert articles on acrylic render, Hebel AAC, EPS cladding, and construction systems for volume builders across Brisbane, Ipswich, and the Gold Coast."
        canonical="https://renderking.au/blog"
      />
      <Navigation />

      {/* ── HEADER ── */}
      <section className="pt-32 pb-12 bg-[#0a0a0a] border-b border-white/8" style={{ paddingTop: "calc(128px + 70px)" }}>
        <div className="container max-w-4xl">
          <p className="rk-section-label mb-3">Knowledge Base</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            INSIGHTS FOR<br />
            <span className="text-[#C9A84C]">VOLUME BUILDERS</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Technical guides, best practices, and industry insights for builders running volume programmes across South-East Queensland.
          </p>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="grid gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white/5 rounded-lg h-48" />
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-8">
              {posts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group flex flex-col md:flex-row gap-0 bg-[#111] border border-white/8 rounded-lg overflow-hidden hover:border-[#C9A84C]/40 transition-all duration-300 cursor-pointer">
                    {/* Image */}
                    {post.heroImage && (
                      <div className="md:w-64 md:flex-shrink-0 h-48 md:h-auto overflow-hidden">
                        <img
                          src={post.heroImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    {/* Content */}
                    <div className="flex flex-col justify-between p-6 flex-1">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded border ${CATEGORY_COLORS[post.category] || CATEGORY_COLORS["General"]}`}>
                            {post.category}
                          </span>
                          {index === 0 && (
                            <span className="text-xs font-semibold px-2 py-1 rounded border text-[#C9A84C] border-[#C9A84C]/30 bg-[#C9A84C]/10">
                              Latest
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A84C] transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                          {post.metaDescription}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/8">
                        <div className="flex items-center gap-4 text-white/40 text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-[#C9A84C] text-xs font-semibold group-hover:gap-2 transition-all">
                          Read article <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-center py-16">No articles published yet.</p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#0f0f0f] border-t border-white/8">
        <div className="container max-w-3xl text-center">
          <p className="rk-section-label mb-3">Ready to Work Together?</p>
          <h2 className="text-3xl font-black text-white mb-4">
            SUBMIT YOUR NEXT PROJECT
          </h2>
          <p className="text-white/50 mb-8">
            Our estimating team responds within one business day across Brisbane, Ipswich, and the Gold Coast.
          </p>
          <Link href="/submit-project">
            <button className="rk-btn-primary">
              Submit a Project Brief →
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
