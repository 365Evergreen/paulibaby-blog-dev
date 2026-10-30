import type { ReactNode } from "react"
import styles from "./PostsGrid.module.css"

interface PostsGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
}

export default function PostsGrid({ children, columns = 3 }: PostsGridProps) {
  return (
    <div className={styles.grid} data-columns={columns}>
      {children}
    </div>
  )
}