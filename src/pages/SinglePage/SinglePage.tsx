import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ComponentProps, TemplateComponent } from "../../components/library/componentTypes";
import { renderMarkdown } from "../../lib/renderMarkdown";
import { PageRenderer } from "../../page-builder/PageRenderer";
import styles from "../SinglePostPage/SinglePostPage.module.css";

type PageData = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  template_content: Record<string, ComponentProps>;
  template: { schema: { components?: TemplateComponent[] } } | null;
};

export default function SinglePage() {
  const { slug } = useParams<{ slug: string }>();
  const [result, setResult] = useState<{ slug: string; page: PageData | null } | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetch(`/api/pages/${encodeURIComponent(slug)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json() as Promise<PageData>;
      })
      .then((data) => {
        if (!cancelled) setResult({ slug, page: data });
      })
      .catch(() => {
        if (!cancelled) setResult({ slug, page: null });
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const loading = result?.slug !== slug;
  const page = result && result.slug === slug ? result.page : null;

  useEffect(() => {
    if (page?.title) document.title = page.title;
  }, [page?.title]);

  if (loading) {
    return (
      <div className={styles.contentContainer}>
        <div className="loading">Loading…</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className={styles.contentContainer}>
        <div className="loading">Page not found.</div>
        <div className="back-link">
          <Link to="/">← Back to blog</Link>
        </div>
      </div>
    );
  }

  const components = page.template?.schema.components ?? [];

  return (
    <div className={styles.contentContainer}>
      <article className={styles.singlePostFullContent}>
        {page.cover_image && (
          <img src={page.cover_image} alt={page.title} className={styles.singlePostCoverFull} />
        )}
        <h1>{page.title}</h1>
        {page.body && (
          <div
            className={styles.singlePostFullBody}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(page.body) }}
          />
        )}
      </article>

      {components.length > 0 && (
        <PageRenderer components={components} content={page.template_content} />
      )}
    </div>
  );
}
