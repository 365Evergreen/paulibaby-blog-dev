import { ct as e, lt as t, t as n } from "./chunks/PageDocumentRenderer-BAbDbWN4.js";
// ../../packages/ui/src/renderer.ts
var r = t(), i = e(), a = ({ container: e, document: t, theme: a, assetBasePath: o, asLandmark: s = !0 }) => {
	let c = (0, r.createRoot)(e);
	return c.render(/* @__PURE__ */ (0, i.jsx)("div", {
		className: "pb-renderer-root",
		children: /* @__PURE__ */ (0, i.jsx)(n, {
			document: t,
			theme: a,
			assetBasePath: o,
			asLandmark: s
		})
	})), { unmount: () => c.unmount() };
};
export { a as mountRenderer };
