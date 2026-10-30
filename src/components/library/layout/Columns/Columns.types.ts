export interface ColumnItem {
  heading?: string;
  body?: string;
}

export interface ColumnsProps {
  columns?: string;
  items: ColumnItem[];
}
