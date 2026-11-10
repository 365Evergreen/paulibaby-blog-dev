import { format } from "prettier/standalone";
import * as babel from "prettier/plugins/babel";
import * as estree from "prettier/plugins/estree";
import * as html from "prettier/plugins/html";
import * as postcss from "prettier/plugins/postcss";
import * as markdown from "prettier/plugins/markdown";

export const languages = [
  "javascript",
  "typescript",
  "json",
  "html",
  "css",
  "markdown",
] as const;
export type Language = (typeof languages)[number];
export const samples: Record<Language, string> = {
  javascript:
    "function total(items,tax){return items.reduce((sum,item)=>sum+item.price*(1+tax),0)}",
  typescript:
    'interface User{id:number;name:string;}const user:User={id:1,name:"Alice"};',
  json: '{"name":"browser-tools","private":true,"features":["local","private"]}',
  html: "<article><h2>Browser tools</h2><p>Your input stays here.</p></article>",
  css: ".container{display:flex;gap:1rem;padding:24px;}",
  markdown: "# Browser tools\n\n- Local processing\n- Private files\n",
};

export function formatCode(
  input: string,
  language: Language,
  tabWidth: number,
  singleQuote: boolean,
  semi: boolean,
): Promise<string> {
  const parsers: Record<Language, string> = {
    javascript: "babel",
    typescript: "babel-ts",
    json: "json",
    html: "html",
    css: "css",
    markdown: "markdown",
  };
  return format(input, {
    parser: parsers[language],
    plugins: [babel, estree, html, postcss, markdown],
    tabWidth,
    singleQuote,
    semi,
  });
}
