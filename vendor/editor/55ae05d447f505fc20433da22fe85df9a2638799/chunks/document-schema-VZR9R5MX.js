import { C as e, E as t, S as n, T as r, _ as i, b as a, g as o, h as s, l as c, m as l, p as u, v as d, w as f, x as p, y as m } from "./rich-text-CfH5pQKh.js";
// ../../packages/ui/src/page-builder/page-schema.ts
var h = f().refine((e) => e === "" || l.test(e.trim()), { message: "URL must be http(s), mailto, tel, or a relative/hash link" }), g = f().refine((e) => e === "" || u.test(e.trim()), { message: "Image URL must be http(s) or a relative path" }), _ = n({
	themePrimary: f(),
	themeLighterAlt: f(),
	themeLighter: f(),
	themeLight: f(),
	themeTertiary: f(),
	themeSecondary: f(),
	themeDarkAlt: f(),
	themeDark: f(),
	themeDarker: f(),
	neutralLighterAlt: f(),
	neutralLighter: f(),
	neutralLight: f(),
	neutralQuaternaryAlt: f(),
	neutralQuaternary: f(),
	neutralTertiaryAlt: f(),
	neutralTertiary: f(),
	neutralSecondaryAlt: f(),
	neutralSecondary: f(),
	neutralPrimaryAlt: f(),
	neutralPrimary: f(),
	neutralDark: f(),
	black: f(),
	white: f()
}), v = n({
	id: f().min(1),
	type: a("grid-section"),
	styles: n({
		padding: f().optional(),
		gap: f().optional()
	}).optional(),
	data: n({
		heading: f().max(200).optional(),
		columns: p().int().min(1).max(4),
		items: o(n({
			id: f().min(1),
			title: f().min(1).max(120),
			description: f().max(500).optional()
		}))
	})
}), y = n({
	id: f().min(1),
	type: a("hero-banner"),
	styles: n({
		height: f().optional(),
		textAlign: s([
			"left",
			"center",
			"right"
		]).optional()
	}).optional(),
	data: n({
		eyebrow: f().max(80).optional(),
		title: f().max(200).optional(),
		description: f().max(500).optional(),
		bgImage: g.optional(),
		buttonText: f().max(80).optional(),
		buttonUrl: h.optional()
	})
}), b = n({
	id: f().min(1),
	type: a("media-gallery"),
	styles: n({ gap: f().optional() }).optional(),
	data: n({
		heading: f().max(200).optional(),
		layoutType: s(["grid", "masonry"]),
		items: o(n({
			id: f().min(1),
			src: g.refine((e) => e !== "", "Image URL is required"),
			alt: f().max(300),
			decorative: i().optional(),
			caption: f().max(300).optional()
		}).refine((e) => e.decorative === !0 || e.alt.trim() !== "", {
			message: "Provide alt text or mark the image as decorative",
			path: ["alt"]
		}))
	})
}), x = n({
	id: f().min(1),
	type: a("rich-text"),
	styles: n({ maxWidth: f().optional() }).optional(),
	data: n({ content: c })
}), S = n({
	id: f().min(1),
	type: a("post-body"),
	styles: n({ maxWidth: f().optional() }).optional(),
	data: n({
		title: f().min(1).max(200),
		author: f().max(120).optional(),
		publishedOn: f().refine((e) => e === "" || /^\d{4}-\d{2}-\d{2}$/.test(e), { message: "Date must be YYYY-MM-DD" }).optional(),
		content: c
	})
}), C = o(d("type", [
	v,
	y,
	b,
	x,
	S
])), w = n({
	schemaVersion: a(1),
	theme: _,
	blocks: C
}), T = 1, E = 2e3, D = n({
	data: e(f(), t()).optional(),
	styles: e(f(), r([f(), p()])).optional()
}).strict(), O = m(() => n({
	id: f().min(1),
	type: f().min(1),
	props: D,
	children: o(O).max(E)
}).strict()), k = n({
	format: a("react-aria-page-builder"),
	version: p().int().min(1).max(1),
	savedAt: f().datetime().optional(),
	tree: o(O).max(E)
}).strict(), A = (e) => e.issues.map((e) => {
	let t = e.path.join(".");
	return `${t ? `${t}: ` : ""}${e.message}`;
}), j = (e) => {
	let t = k.safeParse(e);
	if (!t.success) return {
		ok: !1,
		errors: A(t.error)
	};
	let n = [], r = /* @__PURE__ */ new Set(), i = 0, a = (e, t, o) => {
		if (i += 1, i > E) n.push(`Document exceeds the maximum of ${E} blocks.`);
		else if (t > 16) n.push(`${o}: nested deeper than 16 levels.`);
		else {
			if (r.has(e.id) && n.push(`${o}: duplicate id "${e.id}".`), r.add(e.id), e.type === "container") {
				let t = e.props.data?.label;
				t !== void 0 && (typeof t != "string" || t.length > 80) && n.push(`${o}: container label must be 80 characters or fewer.`);
			} else {
				let t = C.element.safeParse({
					id: e.id,
					type: e.type,
					styles: e.props.styles,
					data: e.props.data
				});
				t.success || n.push(...A(t.error).map((e) => `${o}: ${e}`)), e.children.length > 0 && n.push(`${o}: ${e.type} cannot contain child blocks.`);
			}
			e.children.forEach((e, n) => a(e, t + 1, `${o} > block ${n + 1}`));
		}
	};
	return t.data.tree.forEach((e, t) => a(e, 0, `Block ${t + 1}`)), n.length > 0 ? {
		ok: !1,
		errors: n
	} : {
		ok: !0,
		document: t.data
	};
};
export { C as i, j as n, w as r, T as t };
