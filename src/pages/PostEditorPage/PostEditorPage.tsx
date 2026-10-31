/* eslint-disable react-hooks/exhaustive-deps */
import { apiFetch } from "../../lib/auth";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import BlockEditor from "../../editor/BlockEditor";
import { ExternalLink, PanelRight, Plus, Redo2, Undo2 } from "lucide-react";
import FieldEditor from "../../components/FieldEditor/FieldEditor";
import {
  componentRegistry,
  resolveProps,
} from "../DashboardPage/Templates/componentRegistry";
import {
  fetchTemplates,
  normalizeTemplate,
  type Template,
} from "../DashboardPage/Templates/templatesApi";
import DatePicker from "../../components/DatePicker/DatePicker";
import styles from "./PostEditorPage.module.css";

type Post = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  published: number | boolean;
  published_date: string | null;
  category_ids: number[];
  template_id: number | null;
  template_content: Record<string, Record<string, unknown>>;
  created_at?: string;
  updated_at?: string;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
};

type CategoryNode = Category & { children: CategoryNode[] };

// Build a tree from a flat category list
function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const map = new Map<number, CategoryNode>();
  const roots: CategoryNode[] = [];

  for (const c of categories) {
    map.set(c.id, { ...c, children: [] });
  }
  for (const c of categories) {
    const node = map.get(c.id)!;
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

// Flatten the tree into indented options for a <select>
function flattenCategoryTree(
  nodes: CategoryNode[],
  depth = 0,
): { id: number; label: string }[] {
  const result: { id: number; label: string }[] = [];
  for (const node of nodes) {
    const indent = "\u00A0\u00A0".repeat(depth) + (depth > 0 ? "↳ " : "");
    result.push({ id: node.id, label: indent + node.name });
    result.push(...flattenCategoryTree(node.children, depth + 1));
  }
  return result;
}

export default function PostEditorPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;

  const [editing, setEditing] = useState<Post>({
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    cover_image: null,
    published: false,
    published_date: new Date().toISOString().split("T")[0],
    category_ids: [],
    template_id: null,
    template_content: {},
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(
    () => window.matchMedia("(min-width: 900px)").matches,
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryParent, setNewCategoryParent] = useState<string>("");
  const [addingCategory, setAddingCategory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadCategories();
    loadTemplates();
    if (!isNew) {
      loadPost(id!);
    }
  }, [id]);

  async function loadTemplates() {
    try {
      setTemplates(
        (await fetchTemplates())
          .map(normalizeTemplate)
          .filter((template) => template.template_type === "post"),
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to load templates.",
      );
    }
  }

  async function loadCategories() {
    const res = await apiFetch("/api/admin/categories");
    if (res.status === 403) {
      window.location.reload();
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setCategories(data);
    }
  }

  async function loadPost(postId: string) {
    setLoading(true);
    const res = await apiFetch(`/api/admin/posts/${postId}`);
    if (res.status === 403) {
      window.location.reload();
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setEditing({
        ...data,
        published: Boolean(data.published),
        published_date: data.published_date ?? format(new Date(), "yyyy-MM-dd"),
        category_ids: data.category_ids || [],
        template_id: data.template_id ?? null,
        template_content:
          typeof data.template_content === "object" && data.template_content
            ? data.template_content
            : {},
      });
    }
    setLoading(false);
  }

  async function savePost(published: boolean = Boolean(editing.published)) {
    setSaving(true);
    setMessage("");

    const payload = {
      ...editing,
      published: published ? 1 : 0,
    };

    try {
      let res;
      if (editing.id) {
        res = await apiFetch(`/api/admin/posts/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await apiFetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        if (created.id) {
          setEditing((cur) => ({
            ...cur,
            id: created.id,
            slug: created.slug ?? cur.slug,
          }));
        }
      }

      if (res.status === 403) {
        window.location.reload();
        return;
      }

      if (res.ok) {
        setEditing((cur) => ({ ...cur, published }));
        setMessage(published ? "Published!" : "Draft saved.");
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage(err.error || "Error saving post.");
      }
    } catch {
      setMessage("Network error.");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  }

  function previewPost() {
    if (editing.published && editing.slug)
      window.open(
        `/posts/${encodeURIComponent(editing.slug)}`,
        "_blank",
        "noopener",
      );
    else setMessage("Publish the post to preview it.");
    setTimeout(() => setMessage(""), 3000);
  }

  async function uploadImage(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiFetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (res.status === 403) {
      window.location.reload();
      return null;
    }

    if (res.ok) {
      const data = await res.json();
      return data.url;
    }
    return null;
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessage("Uploading image…");
    const url = await uploadImage(file);
    if (url) {
      setEditing({ ...editing, cover_image: url });
      setMessage("Image uploaded!");
    } else {
      setMessage("Upload failed.");
    }
    setTimeout(() => setMessage(""), 3000);
  }

  async function createCategory() {
    if (!newCategoryName.trim()) return;
    setAddingCategory(true);
    const res = await apiFetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newCategoryName.trim(),
        parent_id: newCategoryParent ? parseInt(newCategoryParent) : null,
      }),
    });
    setAddingCategory(false);
    if (res.status === 403) {
      window.location.reload();
      return;
    }
    if (res.ok) {
      const created = await res.json();
      setNewCategoryName("");
      setNewCategoryParent("");
      await loadCategories();
      // Auto-select the newly created category
      setEditing({
        ...editing,
        category_ids: [...editing.category_ids, created.id],
      });
    } else {
      const err = await res.json().catch(() => ({}));
      setMessage(err.error || "Failed to create category.");
      setTimeout(() => setMessage(""), 3000);
    }
  }

  function toggleCategory(catId: number) {
    setEditing({
      ...editing,
      category_ids: editing.category_ids.includes(catId)
        ? editing.category_ids.filter((c) => c !== catId)
        : [...editing.category_ids, catId],
    });
  }

  function chooseTemplate(templateId: string) {
    const template = templates.find((item) => item.id === Number(templateId));
    if (!template) {
      setEditing((current) => ({
        ...current,
        template_id: null,
        template_content: {},
      }));
      return;
    }
    const content = Object.fromEntries(
      (template.schema.components ?? []).map((component) => [
        component.id,
        resolveProps(component.type, {
          ...component.props,
          ...(editing.template_content[component.id] ?? {}),
        }),
      ]),
    );
    setEditing((current) => ({
      ...current,
      template_id: template.id,
      template_content: content,
    }));
  }

  function updateTemplateContent(
    componentId: string,
    key: string,
    value: unknown,
  ) {
    setEditing((current) => ({
      ...current,
      template_content: {
        ...current.template_content,
        [componentId]: {
          ...(current.template_content[componentId] ?? {}),
          [key]: value,
        },
      },
    }));
  }

  if (loading) {
    return (
      <div className={styles.editorPage}>
        <div className={styles.loading}>Loading…</div>
      </div>
    );
  }

  const categoryOptions = flattenCategoryTree(buildCategoryTree(categories));
  const selectedTemplate = templates.find(
    (template) => template.id === editing.template_id,
  );
  return (
    <div className={styles.editorPage}>
      {/* Block drawer + canvas + settings panel */}
      <div className={styles.editorBody}>
        <BlockEditor
          value={editing.body}
          onChange={(html) => setEditing((cur) => ({ ...cur, body: html }))}
          onUpload={uploadImage}
          onError={setMessage}
          topbar={({ editor, blocksOpen, toggleBlocks }) => (
            <header className={styles.topbar}>
              <div className={styles.topbarLeft}>
                <button
                  className={`${styles.iconBtn} ${styles.iconBtnPrimary}`}
                  onClick={() => navigate("/admin/dashboard")}
                ></button>
                <button
                  className={`${styles.iconBtn} ${blocksOpen ? styles.iconBtnActive : ""}`}
                  onClick={toggleBlocks}
                  aria-pressed={blocksOpen}
                  aria-label={
                    blocksOpen ? "Close block drawer" : "Open block drawer"
                  }
                  title="Toggle blocks"
                >
                  <Plus size={18} />
                </button>
                <button
                  className={styles.iconBtn}
                  onClick={() => editor?.chain().focus().undo().run()}
                  disabled={!editor?.can().undo()}
                  aria-label="Undo"
                  title="Undo"
                >
                  <Undo2 size={18} />
                </button>
                <button
                  className={styles.iconBtn}
                  onClick={() => editor?.chain().focus().redo().run()}
                  disabled={!editor?.can().redo()}
                  aria-label="Redo"
                  title="Redo"
                >
                  <Redo2 size={18} />
                </button>
              </div>
              <input
                type="text"
                value={editing.title}
                onChange={(e) =>
                  setEditing((cur) => ({ ...cur, title: e.target.value }))
                }
                placeholder="Add title"
                aria-label="Post title"
                className={styles.topbarTitle}
              />
              <div className={styles.topbarRight}>
                {message && <span className={styles.message}>{message}</span>}
                <button
                  className={styles.btnSecondary}
                  onClick={() => savePost(false)}
                  disabled={saving}
                >
                  Save draft
                </button>
                <button
                  className={styles.btnSecondary}
                  onClick={previewPost}
                  title="Open the published post in a new tab"
                >
                  <ExternalLink size={14} /> Preview
                </button>
                <button
                  className={styles.btnPrimary}
                  onClick={() => savePost(true)}
                  disabled={saving}
                >
                  {saving
                    ? "Saving…"
                    : editing.published
                      ? "Update"
                      : "Publish"}
                </button>
                <button
                  className={`${styles.iconBtn} ${drawerOpen ? styles.iconBtnActive : ""}`}
                  onClick={() => setDrawerOpen((o) => !o)}
                  aria-pressed={drawerOpen}
                  aria-label={drawerOpen ? "Hide settings" : "Show settings"}
                  title={drawerOpen ? "Hide settings" : "Show settings"}
                >
                  <PanelRight size={18} />
                </button>
              </div>
            </header>
          )}
          aside={
            <>
              {/* Settings drawer */}
              {drawerOpen && (
                <>
                  <div
                    className={styles.drawerOverlay}
                    onClick={() => setDrawerOpen(false)}
                  />
                  <aside className={styles.drawer}>
                    <div className={styles.drawerHeader}>
                      <h2>Post Settings</h2>
                      <button
                        onClick={() => setDrawerOpen(false)}
                        className={styles.drawerClose}
                      >
                        ✕
                      </button>
                    </div>

                    <div className={styles.drawerBody}>
                      {/* Slug */}
                      <div className={styles.formGroup}>
                        <label>Slug</label>
                        <input
                          type="text"
                          value={editing.slug}
                          onChange={(e) =>
                            setEditing({ ...editing, slug: e.target.value })
                          }
                          placeholder="auto-generated-from-title"
                          className={styles.formInput}
                        />
                        <small>Leave empty to auto-generate from title</small>
                      </div>

                      {/* Excerpt */}
                      <div className={styles.formGroup}>
                        <label>Excerpt</label>
                        <textarea
                          value={editing.excerpt}
                          onChange={(e) =>
                            setEditing({ ...editing, excerpt: e.target.value })
                          }
                          placeholder="Short summary shown in the post list"
                          className={styles.formTextarea}
                          rows={4}
                        />
                      </div>

                      {/* Cover Image */}
                      <div className={styles.formGroup}>
                        <label>Cover Image</label>
                        <div className={styles.coverUpload}>
                          {editing.cover_image && (
                            <img
                              src={editing.cover_image}
                              alt="Cover preview"
                              className={styles.coverPreview}
                            />
                          )}
                          <input
                            type="text"
                            value={editing.cover_image || ""}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                cover_image: e.target.value,
                              })
                            }
                            placeholder="https://media.paulibaby.com/image.jpg"
                            className={styles.formInput}
                          />
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleCoverUpload}
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className={`${styles.btnSecondary} ${styles.btnFull}`}
                          >
                            Upload Image
                          </button>
                        </div>
                      </div>

                      {/* Category selector (multi-select) */}
                      <div className={styles.formGroup}>
                        <label>Categories</label>
                        <div className={styles.categoryList}>
                          {categoryOptions.length === 0 && (
                            <small>No categories yet — create one below</small>
                          )}
                          {categoryOptions.map((opt) => (
                            <label key={opt.id} className={styles.categoryItem}>
                              <input
                                type="checkbox"
                                checked={editing.category_ids.includes(opt.id)}
                                onChange={() => toggleCategory(opt.id)}
                              />
                              <span>{opt.label}</span>
                            </label>
                          ))}
                        </div>
                        <small>
                          Select one or more categories for this post
                        </small>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Template</label>
                        <select
                          className={styles.formInput}
                          value={editing.template_id ?? ""}
                          onChange={(event) =>
                            chooseTemplate(event.target.value)
                          }
                        >
                          <option value="">No template</option>
                          {templates.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                        <small>
                          Select a template to configure its components for this
                          post.
                        </small>
                      </div>

                      {selectedTemplate?.schema.components?.map((component) => {
                        const definition = componentRegistry[component.type];
                        if (!definition) return null;
                        const content = resolveProps(component.type, {
                          ...component.props,
                          ...(editing.template_content[component.id] ?? {}),
                        });
                        return (
                          <div className={styles.formGroup} key={component.id}>
                            <label>{definition.name}</label>
                            <small>{definition.description}</small>
                            <FieldEditor
                              fields={definition.fields}
                              values={content}
                              onChange={(key, value) =>
                                updateTemplateContent(component.id, key, value)
                              }
                            />
                          </div>
                        );
                      })}

                      {/* Inline category creator */}
                      <div className={styles.formGroup}>
                        <label>Add new category</label>
                        <div className={styles.categoryAddRow}>
                          <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Category name"
                            className={styles.formInput}
                          />
                          <select
                            value={newCategoryParent}
                            onChange={(e) =>
                              setNewCategoryParent(e.target.value)
                            }
                            className={styles.formInput}
                          >
                            <option value="">Top-level</option>
                            {categoryOptions.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={createCategory}
                            disabled={addingCategory || !newCategoryName.trim()}
                            className={styles.btnSecondary}
                          >
                            {addingCategory ? "…" : "+ Add"}
                          </button>
                        </div>
                        <small>
                          Nest under an existing category or leave as top-level
                        </small>
                      </div>

                      {/* Published toggle */}
                      <div className={styles.formGroup}>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={Boolean(editing.published)}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                published: e.target.checked,
                              })
                            }
                          />
                          Published
                        </label>
                      </div>

                      {/* Publish Date */}
                      <div className={styles.formGroup}>
                        <label>Publish Date</label>
                        <div className={styles.datePickerWrapper}>
                          <DatePicker
                            label="Publish Date"
                            value={editing.published_date ?? ""}
                            onChange={(newDate: string) =>
                              setEditing((prev) => ({
                                ...prev,
                                published_date: newDate,
                              }))
                            }
                          />
                        </div>
                        <small>
                          Choose when this post should be published. Leave empty
                          to publish immediately.
                        </small>
                      </div>
                    </div>

                    <div className={styles.drawerFooter}>
                      <button
                        onClick={() => setDrawerOpen(false)}
                        className={`${styles.btnPrimary} ${styles.btnFull}`}
                      >
                        Done
                      </button>
                    </div>
                  </aside>
                </>
              )}
            </>
          }
        />
      </div>
    </div>
  );
}
