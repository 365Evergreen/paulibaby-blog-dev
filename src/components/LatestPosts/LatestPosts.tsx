import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  usePosts,
  formatDate,
  type Post,
} from "../../hooks/usePosts"
import styles from "./LatestPosts.module.css"

const LatestPosts = () => {
  const navigate = useNavigate()
  const { posts, loading, error } = usePosts(undefined, 5)

  const [failedImages, setFailedImages] = useState<Set<string>>(
    () => new Set()
  )

  const handleNavigate = (post: Post) => {
    navigate(`/posts/${post.slug}`)
  }

  const handleImageError = (postId: string) => {
    setFailedImages((current) => {
      const next = new Set(current)
      next.add(postId)
      return next
    })
  }

  const getCategoryName = (post: Post): string => {
    if (post.categories && post.categories.length > 0) {
      return post.categories[0].name
    }

    if (post.category_slug) {
      return post.category_slug.replace(/-/g, " ")
    }

    return post.type
  }

  const getCategorySlug = (post: Post): string => {
    if (post.category_slug) {
      return post.category_slug
    }

    if (post.categories && post.categories.length > 0) {
      return post.categories[0].slug
    }

    return post.type
  }

  const getCategoryClass = (post: Post): string => {
    const slug = getCategorySlug(post)

    switch (slug) {
      case "music":
        return styles.categoryMusic

      case "radio":
        return styles.categoryRadio

      case "documentary":
      case "documentaries":
        return styles.categoryDocumentary

      case "comedy":
        return styles.categoryComedy

      case "video":
        return styles.categoryVideo

      default:
        return styles.categoryDefault
    }
  }

  const renderImage = (post: Post, isLead: boolean) => {
    const hasImage =
      Boolean(post.cover_image) && !failedImages.has(post.id)

    return (
      <div className={styles.imageWrapper}>
        {hasImage ? (
          <img
            src={post.cover_image ?? ""}
            alt=""
            className={styles.image}
            loading={isLead ? "eager" : "lazy"}
            onError={() => handleImageError(post.id)}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>{getCategoryName(post)}</span>
          </div>
        )}

        {post.type !== "article" && (
          <span className={styles.mediaType}>
            {post.type === "audio" ? "Listen" : "Watch"}
          </span>
        )}
      </div>
    )
  }

  const renderPost = (
    post: Post,
    index: number
  ) => {
    const isLead = index === 0
    const isSecondary = index === 1

    const cardClasses = [
      styles.card,
      isLead ? styles.leadCard : "",
      isSecondary ? styles.secondaryCard : "",
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <article
        key={post.id}
        className={cardClasses}
      >
        <button
          type="button"
          className={styles.imageButton}
          onClick={() => handleNavigate(post)}
          aria-label={`Read ${post.title}`}
        >
          {renderImage(post, isLead)}
        </button>

        <div className={styles.content}>
          <div className={styles.meta}>
            <span
              className={[
                styles.category,
                getCategoryClass(post),
              ].join(" ")}
            >
              {getCategoryName(post)}
            </span>

            {post.duration && (
              <span className={styles.readingTime}>
                {post.duration}
              </span>
            )}
          </div>

          <h3 className={styles.title}>
            <button
              type="button"
              className={styles.titleButton}
              onClick={() => handleNavigate(post)}
            >
              {post.title}
            </button>
          </h3>

          {(isLead || isSecondary) && post.excerpt && (
            <p className={styles.excerpt}>
              {post.excerpt}
            </p>
          )}

          {isLead ? (
            <button
              type="button"
              className={styles.readStory}
              onClick={() => handleNavigate(post)}
            >
              Read story
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <div className={styles.date}>
              {formatDate(post.created_at)}
            </div>
          )}
        </div>
      </article>
    )
  }

  if (loading) {
    return (
      <section
        className={styles.section}
        aria-labelledby="latest-posts-heading"
      >
        <div className={styles.header}>
          <h2
            id="latest-posts-heading"
            className={styles.heading}
          >
            Latest
          </h2>
        </div>

        <div className={styles.loading}>
          Loading latest posts…
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section
        className={styles.section}
        aria-labelledby="latest-posts-heading"
      >
        <div className={styles.header}>
          <h2
            id="latest-posts-heading"
            className={styles.heading}
          >
            Latest
          </h2>
        </div>

        <div className={styles.error}>
          Unable to load the latest posts.
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="latest-posts-heading"
    >
      <div className={styles.header}>
        <h2
          id="latest-posts-heading"
          className={styles.heading}
        >
          Latest
        </h2>

        <button
          type="button"
          className={styles.viewAll}
          onClick={() => navigate("/archive")}
        >
          View all posts
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.grid}>
        {posts.map((post, index) =>
          renderPost(post, index)
        )}
      </div>
    </section>
  )
}

export default LatestPosts