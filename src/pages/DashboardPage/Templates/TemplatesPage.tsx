import { AlertCircle, FilePlus2, LayoutTemplate, Pencil } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createTemplate,
  fetchTemplates,
  type Template,
  type TemplateLayout,
  normalizeTemplate,
} from "./templatesApi";
import styles from "../DashboardPage.module.css";

const layouts: { value: TemplateLayout; label: string; description: string }[] = [
  { value: "article", label: "Article", description: "A focused reading layout for posts." },
  { value: "feature", label: "Feature", description: "A post layout with a prominent hero area." },
  { value: "basic", label: "Basic", description: "A simple, flexible page layout." },
];

function TemplatePreview({ layout }: { layout: TemplateLayout }) {
  return (
    <div className={`${styles.templatePreview} ${styles[`preview${layout[0].toUpperCase()}${layout.slice(1)}`]}`}>
      <span className={styles.previewBar} />
      {layout === "feature" && <span className={styles.previewHero} />}
      <span className={styles.previewTitle} />
      <span className={styles.previewLine} />
      <span className={styles.previewLine} />
      <span className={`${styles.previewLine} ${styles.previewLineShort}`} />
    </div>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[] | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = useCallback(() => {
    fetchTemplates().then((items) => setTemplates(items.map(normalizeTemplate)), (reason: Error) => setError(reason.message));
  }, []);

  useEffect(load, [load]);

  const startNew = () => {
    navigate("/admin/dashboard/templates/new");
  };

  const startEdit = (template: Template) => {
    navigate(`/admin/dashboard/templates/${template.id}`);
  };

  return (
    <div className={styles.content}>
      <div className={styles.pageHead}>
        <div>
          <h1>Templates</h1>
          <p className={styles.pageDescription}>Choose a starting layout for posts and pages, then add and configure reusable components.</p>
        </div>
        <button className={`${styles.btn} ${styles.primary}`} onClick={startNew}>
          <FilePlus2 size={16} /> Add template
        </button>
      </div>

      {error && (
        <div className={styles.error} role="alert">
          <AlertCircle size={18} /> {error}
          <button className={styles.btn} onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

      <section>
        <div className={styles.galleryHead}>
          <h2>Saved templates</h2>
          <span className={styles.muted}>{templates ? `${templates.length} templates` : ""}</span>
        </div>
        <div className={styles.templateGrid}>
          {templates === null &&
            Array.from({ length: 3 }, (_, index) => (
              <div className={`${styles.templateCard} ${styles.templateSkeleton}`} key={index}><div className={styles.skeleton} /></div>
            ))}
          {templates?.map((template) => (
            <article key={template.id} className={styles.templateCard}>
              <TemplatePreview layout={template.schema.layout} />
              <div className={styles.templateCardBody}>
                <span className={styles.templateType}>{template.template_type}</span>
                <h3>{template.name}</h3>
                <p>{layouts.find((layout) => layout.value === template.schema.layout)?.description}</p>
                <Link className={styles.btn} to={`/admin/dashboard/templates/${template.id}`}><Pencil size={15} /> Edit</Link>
              </div>
            </article>
          ))}
          {templates?.length === 0 && (
            <div className={styles.emptyTemplates}>
              <LayoutTemplate size={24} />
              <p>No templates yet. Create one from a simple layout.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
