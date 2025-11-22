import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SeoHead from '../components/SeoHead';

export default function BlogPost() {
  const { slug } = useParams();
  const currentIndex = blogPosts.findIndex((entry) => entry.slug === slug);
  const post = currentIndex >= 0 ? blogPosts[currentIndex] : null;
  const [relatedOffset, setRelatedOffset] = React.useState(0);

  const orderedOthers = React.useMemo(() => {
    if (blogPosts.length <= 1 || currentIndex < 0) return [];
    const result = [];
    for (let i = 1; i < blogPosts.length; i += 1) {
      const index = (currentIndex + i) % blogPosts.length;
      result.push(blogPosts[index]);
    }
    return result;
  }, [currentIndex]);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-lg text-slate-200">Post not found.</p>
        <Link to="/blog" className="text-raven-cyan hover:text-white">
          Back to blog
        </Link>
      </div>
    );
  }

  const hasRelated = orderedOthers.length > 0;
  const visibleCount = Math.min(3, orderedOthers.length);
  let visibleRelated = [];

  if (hasRelated) {
    const total = orderedOthers.length;
    const safeOffset = ((relatedOffset % total) + total) % total;
    visibleRelated = [];
    for (let i = 0; i < visibleCount; i += 1) {
      visibleRelated.push(orderedOthers[(safeOffset + i) % total]);
    }
  }

  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <SeoHead
        title={`${post.title} | Raven Development Operations`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-raven-cyan">{post.date}</p>
        <h1 className="text-4xl font-bold text-white">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
          {post.readMinutes && (
            <span className="rounded-full border border-raven-border/60 bg-raven-card/60 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-100">
              {post.readMinutes} min read
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {post.tags.map((tag) => {
            let tagClasses = 'rounded-full border px-3 py-1';

            if (tag === 'CI/CD') {
              tagClasses += ' border-emerald-400/70 bg-emerald-500/10 text-emerald-300';
            } else if (tag === 'Cloud') {
              tagClasses += ' border-sky-400/70 bg-sky-500/10 text-sky-300';
            } else if (tag === 'SRE') {
              tagClasses += ' border-amber-400/70 bg-amber-500/10 text-amber-200';
            } else if (tag === 'Tooling') {
              tagClasses += ' border-violet-400/70 bg-violet-500/10 text-violet-300';
            } else {
              tagClasses += ' border-raven-border/60 bg-raven-surface/60 text-slate-200';
            }

            return (
              <span key={tag} className={tagClasses}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      {post.image ? (
        <div className="overflow-hidden rounded-3xl border border-raven-border/70 bg-raven-card/80">
          <img src={post.image} alt={post.title} className="h-64 w-full object-cover sm:h-80" />
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-raven-border/70 bg-gradient-to-br from-raven-card/80 via-raven-card to-black/40 text-center sm:h-80">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-raven-cyan">Preview coming soon</p>
            <p className="mt-2 text-lg font-semibold text-white">{post.title}</p>
          </div>
        </div>
      )}
      <div className="space-y-4 text-lg leading-relaxed text-slate-200">
        {(post.content || '').split('\n\n').map((para, idx) => (
          <p key={`${idx}-${para.slice(0, 20)}`}>{para}</p>
        ))}
      </div>

      {Array.isArray(post.lessons) && post.lessons.length > 0 && (
        <section className="space-y-3 rounded-2xl border border-raven-border/70 bg-raven-card/60 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-raven-cyan">
            Lessons learned
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            {post.lessons.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-raven-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(post.challenges) && post.challenges.length > 0 && (
        <section className="space-y-3 rounded-2xl border border-raven-border/70 bg-raven-card/60 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-raven-cyan">
            Challenges faced
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            {post.challenges.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-raven-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(post.sources) && post.sources.length > 0 && (
        <section className="space-y-3 rounded-2xl border border-raven-border/70 bg-raven-card/60 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-raven-cyan">
            Further reading
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            {post.sources.map((source) => (
              <li key={source.title + source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-raven-cyan hover:text-white"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {hasRelated && (
        <section className="mt-10 space-y-3 border-t border-raven-border/70 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-raven-cyan">
              More posts
            </h2>
            {orderedOthers.length > visibleCount && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRelatedOffset((prev) => prev - 1)}
                  className="rounded-full border border-raven-border/70 bg-raven-card px-2 py-1 text-xs text-slate-100 hover:border-raven-accent/80 hover:bg-raven-card/90"
                  aria-label="Previous posts"
                >
                  {'<'}
                </button>
                <button
                  type="button"
                  onClick={() => setRelatedOffset((prev) => prev + 1)}
                  className="rounded-full border border-raven-border/70 bg-raven-card px-2 py-1 text-xs text-slate-100 hover:border-raven-accent/80 hover:bg-raven-card/90"
                  aria-label="Next posts"
                >
                  {'>'}
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {visibleRelated.map((related) => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="group block w-56 shrink-0"
              >
                <article className="flex h-full flex-col gap-2 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-3 text-sm transition transform hover:scale-105 hover:border-raven-accent/80 hover:bg-raven-card hover:shadow-soft-glow">
                  {related.image ? (
                    <div className="overflow-hidden rounded-xl border border-raven-border/60 bg-raven-card/80">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="h-24 w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-raven-border/60 bg-gradient-to-br from-raven-card/80 via-raven-card to-black/40 text-center">
                      <p className="text-[10px] font-semibold text-white">Preview coming soon</p>
                    </div>
                  )}
                  <p className="text-[10px] uppercase tracking-[0.2em] text-raven-cyan">
                    {related.date}
                  </p>
                  <h3 className="text-sm font-semibold text-white group-hover:text-raven-accent line-clamp-2">
                    {related.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
                    {(related.tags || []).map((tag) => {
                      let tagClasses = 'rounded-full border px-2 py-0.5';

                      if (tag === 'CI/CD') {
                        tagClasses += ' border-emerald-400/70 bg-emerald-500/10 text-emerald-300';
                      } else if (tag === 'Cloud') {
                        tagClasses += ' border-sky-400/70 bg-sky-500/10 text-sky-300';
                      } else if (tag === 'SRE') {
                        tagClasses += ' border-amber-400/70 bg-amber-500/10 text-amber-200';
                      } else if (tag === 'Tooling') {
                        tagClasses += ' border-violet-400/70 bg-violet-500/10 text-violet-300';
                      } else {
                        tagClasses += ' border-raven-border/60 bg-raven-surface/60 text-slate-200';
                      }

                      return (
                        <span key={tag} className={tagClasses}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
      <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-raven-cyan hover:text-white">
        Back to blog
      </Link>
    </article>
  );
}
