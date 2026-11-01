import { $ as e, A as t, B as n, C as r, D as i, E as a, F as o, G as s, H as c, I as l, J as u, K as d, L as f, M as p, N as m, O as h, P as g, Q as _, R as v, S as y, T as b, U as x, V as S, W as C, X as w, Y as T, Z as E, _ as D, a as O, at as k, b as A, c as j, ct as M, d as N, dt as P, et as F, f as ee, ft as I, g as te, h as L, i as ne, it as R, j as z, k as re, l as ie, lt as ae, m as oe, n as se, nt as ce, o as le, ot as B, p as ue, pt as de, q as V, r as fe, rt as pe, s as me, st as he, t as ge, tt as H, u as _e, ut as ve, v as ye, w as U, x as be, y as xe, z as Se } from "./chunks/PageDocumentRenderer-BAbDbWN4.js";
import { i as Ce, n as we, r as Te, t as Ee } from "./chunks/document-schema-VZR9R5MX.js";
import { C as De, E as Oe, S as ke, T as Ae, a as je, b as Me, c as Ne, d as Pe, g as Fe, i as Ie, m as Le, n as Re, o as ze, p as Be, r as Ve, s as He, t as Ue, u as We, w as Ge, x as Ke, y as qe } from "./chunks/rich-text-CfH5pQKh.js";
// ../../node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var Je = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
// ../../node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function Ye(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: Je(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
// ../../node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var Xe = (e) => {
	let t = "", n = !1;
	for (let r of e) r === "-" || r === "_" || r <= " " ? n = t.length > 0 : (t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1);
	return t;
}, Ze = (e) => {
	let t = Xe(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, Qe = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), $e = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
// ../../node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function et(e) {
	return e != null;
}
function tt(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? $e.width, a = e.size ?? e.height ?? $e.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? Qe(...c) : Qe("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? $e["stroke-width"]) * Number(e.size ?? e.width ?? $e.width) / Number(t.size ?? t.width ?? $e.width) : t.strokeWidth ?? $e["stroke-width"];
	return [
		"svg",
		{
			...Object.entries($e).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && et(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && et(t.width) && { [r("width")]: t.width },
			..."height" in t && et(t.height) && { [r("height")]: t.height },
			[r("stroke-width")]: u,
			...l && { [r("class")]: l },
			[r("viewBox")]: `0 0 ${i} ${a}`,
			...t.hasA11yProp === !1 ? { [r("aria-hidden")]: "true" } : {},
			..."attributes" in t && t.attributes
		},
		e.node.map((e) => {
			let [n, i, a] = e, o = t.nonScalingStroke ? {
				[r("vector-effect")]: "non-scaling-stroke",
				...i
			} : i;
			return a ? [
				n,
				o,
				a
			] : [n, o];
		})
	];
}
// ../../node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function nt(e, t = {}) {
	return tt(e, {
		...t,
		attributeNames: {
			...t.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
// ../../node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var rt = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, W = /* @__PURE__ */ de(P(), 1), it = (0, W.createContext)({}), at = () => (0, W.useContext)(it), ot = (0, W.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...d }, f) => {
	let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: _ = "currentColor", className: v = "" } = at() ?? {}, y = !!c || rt(d), [b, x, S = []] = nt(u, {
		color: e ?? _,
		width: n ?? t ?? p,
		height: r ?? t ?? p,
		strokeWidth: i ?? m,
		absoluteStrokeWidth: a ?? h,
		nonScalingStroke: o ?? g,
		className: Qe(v, s),
		hasA11yProp: y,
		attributes: d
	});
	return (0, W.createElement)(b, {
		ref: f,
		...x
	}, [...S.map(([e, t]) => (0, W.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
});
// ../../node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function st(e, t = [], n = []) {
	let r = typeof e == "string" ? Ye(e, t, n) : e, i = (0, W.forwardRef)(({ className: e, ...t }, n) => (0, W.createElement)(ot, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = Ze(r.name)), i;
}
// ../../node_modules/lucide-react/dist/esm/icons/chevron-right.mjs
var ct = {
	name: "chevron-right",
	size: 24,
	node: [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]
};
ct.node;
var lt = st(ct), ut = {
	name: "download",
	size: 24,
	node: [
		["path", {
			d: "M12 15V3",
			key: "m9g1x1"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}],
		["path", {
			d: "m7 10 5 5 5-5",
			key: "brsn70"
		}]
	]
};
ut.node;
var dt = st(ut), ft = {
	name: "folder-open",
	size: 24,
	node: [["path", {
		d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
		key: "usdka0"
	}]]
};
ft.node;
var pt = st(ft), mt = {
	name: "grip-vertical",
	size: 24,
	node: [
		["circle", {
			cx: "9",
			cy: "12",
			r: "1",
			key: "1vctgf"
		}],
		["circle", {
			cx: "9",
			cy: "5",
			r: "1",
			key: "hp0tcf"
		}],
		["circle", {
			cx: "9",
			cy: "19",
			r: "1",
			key: "fkjjf6"
		}],
		["circle", {
			cx: "15",
			cy: "12",
			r: "1",
			key: "1tmaij"
		}],
		["circle", {
			cx: "15",
			cy: "5",
			r: "1",
			key: "19l28e"
		}],
		["circle", {
			cx: "15",
			cy: "19",
			r: "1",
			key: "f4zoj3"
		}]
	]
};
mt.node;
var ht = st(mt), gt = {
	name: "redo-2",
	size: 24,
	node: [["path", {
		d: "m15 14 5-5-5-5",
		key: "12vg1m"
	}], ["path", {
		d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",
		key: "6uklza"
	}]]
};
gt.node;
var _t = st(gt), vt = {
	name: "save",
	size: 24,
	node: [
		["path", {
			d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
			key: "1c8476"
		}],
		["path", {
			d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
			key: "1ydtos"
		}],
		["path", {
			d: "M7 3v4a1 1 0 0 0 1 1h7",
			key: "t51u73"
		}]
	]
};
vt.node;
var yt = st(vt), bt = {
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
bt.node;
var xt = st(bt), St = {
	name: "undo-2",
	size: 24,
	node: [["path", {
		d: "M9 14 4 9l5-5",
		key: "102s5s"
	}], ["path", {
		d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
		key: "f3b9sd"
	}]]
};
St.node;
var Ct = st(St), wt = {
	name: "upload",
	size: 24,
	node: [
		["path", {
			d: "M12 3v12",
			key: "1x0j5s"
		}],
		["path", {
			d: "m17 8-5-5-5 5",
			key: "7q97r8"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}]
	]
};
wt.node;
var Tt = st(wt), Et = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
Et.node;
var Dt = st(Et), Ot = ae(), G = M(), kt = class {
	constructor(e) {
		this.value = null, this.level = 0, this.hasChildNodes = !1, this.rendered = null, this.textValue = "", this["aria-label"] = void 0, this.index = 0, this.parentKey = null, this.prevKey = null, this.nextKey = null, this.firstChildKey = null, this.lastChildKey = null, this.props = {}, this.colSpan = null, this.colIndex = null, this.type = this.constructor.type, this.key = e;
	}
	get childNodes() {
		throw Error("childNodes is not supported");
	}
	clone() {
		let e = new this.constructor(this.key);
		return e.value = this.value, e.level = this.level, e.hasChildNodes = this.hasChildNodes, e.rendered = this.rendered, e.textValue = this.textValue, e["aria-label"] = this["aria-label"], e.index = this.index, e.parentKey = this.parentKey, e.prevKey = this.prevKey, e.nextKey = this.nextKey, e.firstChildKey = this.firstChildKey, e.lastChildKey = this.lastChildKey, e.props = this.props, e.render = this.render, e.colSpan = this.colSpan, e.colIndex = this.colIndex, e;
	}
	filter(e, t, n) {
		let r = this.clone();
		return t.addDescendants(r, e), r;
	}
}, At = class extends kt {
	filter(e, t, n) {
		let [r, i] = Pt(e, t, this.firstChildKey, n), a = this.clone();
		return a.firstChildKey = r, a.lastChildKey = i, a;
	}
};
(class extends kt {
	static {
		this.type = "header";
	}
});
var jt = class extends kt {
	static {
		this.type = "loader";
	}
}, Mt = class extends At {
	static {
		this.type = "item";
	}
	filter(e, t, n) {
		if (n(this.textValue, this)) {
			let n = this.clone();
			return t.addDescendants(n, e), n;
		}
		return null;
	}
};
(class extends At {
	static {
		this.type = "section";
	}
	filter(e, t, n) {
		let r = super.filter(e, t, n);
		if (r && r.lastChildKey !== null) {
			let t = e.getItem(r.lastChildKey);
			if (t && t.type !== "header") return r;
		}
		return null;
	}
});
var Nt = class {
	get size() {
		return this.itemCount;
	}
	getKeys() {
		return this.keyMap.keys();
	}
	*[Symbol.iterator]() {
		let e = this.firstKey == null ? void 0 : this.keyMap.get(this.firstKey);
		for (; e;) yield e, e = e.nextKey == null ? void 0 : this.keyMap.get(e.nextKey);
	}
	getChildren(e) {
		let t = this.keyMap;
		return { *[Symbol.iterator]() {
			let n = t.get(e), r = n?.firstChildKey == null ? null : t.get(n.firstChildKey);
			for (; r;) yield r, r = r.nextKey == null ? void 0 : t.get(r.nextKey);
		} };
	}
	getKeyBefore(e) {
		let t = this.keyMap.get(e);
		if (!t) return null;
		if (t.prevKey != null) {
			for (t = this.keyMap.get(t.prevKey); t && t.type !== "item" && t.lastChildKey != null;) t = this.keyMap.get(t.lastChildKey);
			return t?.key ?? null;
		}
		return t.parentKey;
	}
	getKeyAfter(e) {
		let t = this.keyMap.get(e);
		if (!t) return null;
		if (t.type !== "item" && t.firstChildKey != null) return t.firstChildKey;
		for (; t;) {
			if (t.nextKey != null) return t.nextKey;
			if (t.parentKey != null) t = this.keyMap.get(t.parentKey);
			else return null;
		}
		return null;
	}
	getFirstKey() {
		return this.firstKey;
	}
	getLastKey() {
		let e = this.lastKey == null ? null : this.keyMap.get(this.lastKey);
		for (; e?.lastChildKey != null;) e = this.keyMap.get(e.lastChildKey);
		return e?.key ?? null;
	}
	getItem(e) {
		return this.keyMap.get(e) ?? null;
	}
	at() {
		throw Error("Not implemented");
	}
	clone() {
		let e = this.constructor, t = new e();
		return t.keyMap = new Map(this.keyMap), t.firstKey = this.firstKey, t.lastKey = this.lastKey, t.itemCount = this.itemCount, t;
	}
	addNode(e) {
		if (this.frozen) throw Error("Cannot add a node to a frozen collection");
		e.type === "item" && this.keyMap.get(e.key) == null && this.itemCount++, this.keyMap.set(e.key, e);
	}
	addDescendants(e, t) {
		this.addNode(e);
		let n = t.getChildren(e.key);
		for (let e of n) this.addDescendants(e, t);
	}
	removeNode(e) {
		if (this.frozen) throw Error("Cannot remove a node to a frozen collection");
		let t = this.keyMap.get(e);
		t != null && t.type === "item" && this.itemCount--, this.keyMap.delete(e);
	}
	commit(e, t, n = !1) {
		if (this.frozen) throw Error("Cannot commit a frozen collection");
		this.firstKey = e, this.lastKey = t, this.frozen = !n;
	}
	filter(e) {
		let t = new this.constructor(), [n, r] = Pt(this, t, this.firstKey, e);
		return t?.commit(n, r), t;
	}
	constructor() {
		this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.frozen = !1, this.itemCount = 0;
	}
};
function Pt(e, t, n, r) {
	if (n == null) return [null, null];
	let i = null, a = null, o = e.getItem(n);
	for (; o != null;) {
		let n = o.filter(e, t, r);
		n != null && (n.nextKey = null, a && (n.prevKey = a.key, a.nextKey = n.key), i ??= n, t.addNode(n), a = n), o = o.nextKey == null ? null : e.getItem(o.nextKey);
	}
	if (a && a.type === "separator") {
		let e = a.prevKey;
		t.removeNode(a.key), e == null ? a = null : (a = t.getItem(e), a.nextKey = null);
	}
	return [i?.key ?? null, a?.key ?? null];
}
// ../../node_modules/react-aria/dist/private/collections/Document.mjs
var Ft = class {
	constructor(e) {
		this._firstChild = null, this._lastChild = null, this._previousSibling = null, this._nextSibling = null, this._parentNode = null, this._minInvalidChildIndex = null, this.ownerDocument = e;
	}
	*[Symbol.iterator]() {
		let e = this.firstChild;
		for (; e;) yield e, e = e.nextSibling;
	}
	get firstChild() {
		return this._firstChild;
	}
	set firstChild(e) {
		this._firstChild = e, this.ownerDocument.markDirty(this);
	}
	get lastChild() {
		return this._lastChild;
	}
	set lastChild(e) {
		this._lastChild = e, this.ownerDocument.markDirty(this);
	}
	get previousSibling() {
		return this._previousSibling;
	}
	set previousSibling(e) {
		this._previousSibling = e, this.ownerDocument.markDirty(this);
	}
	get nextSibling() {
		return this._nextSibling;
	}
	set nextSibling(e) {
		this._nextSibling = e, this.ownerDocument.markDirty(this);
	}
	get parentNode() {
		return this._parentNode;
	}
	set parentNode(e) {
		this._parentNode = e, this.ownerDocument.markDirty(this);
	}
	get isConnected() {
		return this.parentNode?.isConnected || !1;
	}
	invalidateChildIndices(e) {
		(this._minInvalidChildIndex == null || !this._minInvalidChildIndex.isConnected || e.index < this._minInvalidChildIndex.index) && (this._minInvalidChildIndex = e, this.ownerDocument.markDirty(this));
	}
	updateChildIndices() {
		let e = this._minInvalidChildIndex;
		for (; e;) e.index = e.previousSibling ? e.previousSibling.index + 1 : 0, e = e.nextSibling;
		this._minInvalidChildIndex = null;
	}
	appendChild(e) {
		e.parentNode && e.parentNode.removeChild(e), this.firstChild ??= e, this.lastChild ? (this.lastChild.nextSibling = e, e.index = this.lastChild.index + 1, e.previousSibling = this.lastChild) : (e.previousSibling = null, e.index = 0), e.parentNode = this, e.nextSibling = null, this.lastChild = e, this.ownerDocument.markDirty(this), this.isConnected && this.ownerDocument.queueUpdate();
	}
	insertBefore(e, t) {
		if (t == null) return this.appendChild(e);
		e.parentNode && e.parentNode.removeChild(e), e.nextSibling = t, e.previousSibling = t.previousSibling, e.index = t.index - 1, this.firstChild === t ? this.firstChild = e : t.previousSibling && (t.previousSibling.nextSibling = e), t.previousSibling = e, e.parentNode = t.parentNode, this.invalidateChildIndices(e), this.isConnected && this.ownerDocument.queueUpdate();
	}
	removeChild(e) {
		e.parentNode === this && (this._minInvalidChildIndex === e && (this._minInvalidChildIndex = null), e.nextSibling && (this.invalidateChildIndices(e.nextSibling), e.nextSibling.previousSibling = e.previousSibling), e.previousSibling && (e.previousSibling.nextSibling = e.nextSibling), this.firstChild === e && (this.firstChild = e.nextSibling), this.lastChild === e && (this.lastChild = e.previousSibling), e.parentNode = null, e.nextSibling = null, e.previousSibling = null, e.index = 0, this.ownerDocument.markDirty(e), this.isConnected && this.ownerDocument.queueUpdate());
	}
	addEventListener() {}
	removeEventListener() {}
	get previousVisibleSibling() {
		let e = this.previousSibling;
		for (; e && e.isHidden;) e = e.previousSibling;
		return e;
	}
	get nextVisibleSibling() {
		let e = this.nextSibling;
		for (; e && e.isHidden;) e = e.nextSibling;
		return e;
	}
	get firstVisibleChild() {
		let e = this.firstChild;
		for (; e && e.isHidden;) e = e.nextSibling;
		return e;
	}
	get lastVisibleChild() {
		let e = this.lastChild;
		for (; e && e.isHidden;) e = e.previousSibling;
		return e;
	}
}, It = class e extends Ft {
	constructor(e, t) {
		super(t), this.nodeType = 8, this.isMutated = !0, this._index = 0, this.isHidden = !1, this.node = null;
	}
	get index() {
		return this._index;
	}
	set index(e) {
		this._index = e, this.ownerDocument.markDirty(this);
	}
	get level() {
		return this.parentNode instanceof e ? this.parentNode.level + +(this.parentNode.node?.type === "item") : 0;
	}
	getMutableNode() {
		return this.node == null ? null : (this.isMutated ||= (this.node = this.node.clone(), !0), this.ownerDocument.markDirty(this), this.node);
	}
	updateNode() {
		let t = this.nextVisibleSibling, n = this.getMutableNode();
		if (n != null && (n.index = this.index, n.level = this.level, n.parentKey = this.parentNode instanceof e ? this.parentNode.node?.key ?? null : null, n.prevKey = this.previousVisibleSibling?.node?.key ?? null, n.nextKey = t?.node?.key ?? null, n.hasChildNodes = !!this.firstChild, n.firstChildKey = this.firstVisibleChild?.node?.key ?? null, n.lastChildKey = this.lastVisibleChild?.node?.key ?? null, (n.colSpan != null || n.colIndex != null) && t)) {
			let e = (n.colIndex ?? n.index) + (n.colSpan ?? 1);
			if (t.node != null && e !== t.node.colIndex) {
				let n = t.getMutableNode();
				n.colIndex = e;
			}
		}
	}
	setProps(e, t, n, r, i) {
		let a, { value: o, textValue: s, id: c, ...l } = e;
		if (this.node == null ? (a = new n(c ?? `react-aria-${++this.ownerDocument.nodeId}`), this.node = a) : a = this.getMutableNode(), l.ref = t, a.props = l, a.rendered = r, a.render = i, a.value = o, e["aria-label"] && (a["aria-label"] = e["aria-label"]), a.textValue = s || (typeof l.children == "string" ? l.children : "") || e["aria-label"] || "", c != null && c !== a.key) throw Error("Cannot change the id of an item");
		l.colSpan != null && (a.colSpan = l.colSpan), this.isConnected && this.ownerDocument.queueUpdate();
	}
	get style() {
		let e = this;
		return {
			get display() {
				return e.isHidden ? "none" : "";
			},
			set display(t) {
				let n = t === "none";
				if (e.isHidden !== n) {
					(e.parentNode?.firstVisibleChild === e || e.parentNode?.lastVisibleChild === e) && e.ownerDocument.markDirty(e.parentNode);
					let t = e.previousVisibleSibling, r = e.nextVisibleSibling;
					t && e.ownerDocument.markDirty(t), r && e.ownerDocument.markDirty(r), e.isHidden = n, e.ownerDocument.markDirty(e);
				}
			}
		};
	}
	hasAttribute() {}
	setAttribute() {}
	setAttributeNS() {}
	removeAttribute() {}
}, Lt = class extends Ft {
	constructor(e) {
		super(null), this.nodeType = 11, this.ownerDocument = this, this.dirtyNodes = /* @__PURE__ */ new Set(), this.isSSR = !1, this.nodeId = 0, this.nodesByProps = /* @__PURE__ */ new WeakMap(), this.keyOwners = /* @__PURE__ */ new Map(), this.nextCollection = null, this.subscriptions = /* @__PURE__ */ new Set(), this.queuedRender = !1, this.inSubscription = !1, this.collection = e, this.nextCollection = e;
	}
	get isConnected() {
		return !0;
	}
	createElement(e) {
		return new It(e, this);
	}
	getMutableCollection() {
		return this.nextCollection ||= this.collection.clone(), this.nextCollection;
	}
	markDirty(e) {
		this.dirtyNodes.add(e);
	}
	addNode(e) {
		if (e.isHidden || e.node == null) return;
		let t = this.getMutableCollection();
		if (!t.getItem(e.node.key)) for (let t of e) this.addNode(t);
		t.addNode(e.node);
	}
	removeNode(e) {
		for (let t of e) this.removeNode(t);
		e.node && this.getMutableCollection().removeNode(e.node.key);
	}
	getCollection() {
		return this.inSubscription || (this.queuedRender = !1, this.updateCollection()), this.collection;
	}
	updateCollection() {
		for (let e of this.dirtyNodes) e instanceof It && (!e.isConnected || e.isHidden) ? this.removeNode(e) : e.updateChildIndices();
		for (let e of this.dirtyNodes) e instanceof It ? (e.isConnected && !e.isHidden && (e.updateNode(), this.addNode(e)), e.node && this.dirtyNodes.delete(e), e.isMutated = !1) : this.dirtyNodes.delete(e);
		this.nextCollection && (this.nextCollection.commit(this.firstVisibleChild?.node?.key ?? null, this.lastVisibleChild?.node?.key ?? null, this.isSSR), this.isSSR || (this.collection = this.nextCollection, this.nextCollection = null));
	}
	queueUpdate() {
		if (!(this.dirtyNodes.size === 0 || this.queuedRender)) {
			this.queuedRender = !0, this.inSubscription = !0, this.isSSR || (this.collection = this.collection.clone());
			for (let e of this.subscriptions) e();
			this.inSubscription = !1;
		}
	}
	subscribe(e) {
		return this.subscriptions.add(e), this.queuedRender && e(), () => this.subscriptions.delete(e);
	}
	resetAfterSSR() {
		this.isSSR && (this.isSSR = !1, this.firstChild = null, this.lastChild = null, this.nodeId = 0, this.keyOwners.clear());
	}
};
// ../../node_modules/react-aria/dist/private/collections/useCachedChildren.mjs
function Rt(e) {
	let { children: t, items: n, idScope: r, addIdAndValue: i, dependencies: a = [] } = e, o = (0, W.useMemo)(() => void 0, [t]), s = (0, W.useMemo)(() => /* @__PURE__ */ new WeakMap(), [...a, o]);
	return (0, W.useMemo)(() => {
		if (n && typeof t == "function") {
			let e = [];
			for (let a of n) {
				let n = zt(a) ? a : null, o = n ? s.get(n) : null;
				if (!o) {
					o = t(a);
					let c = o.props.id ?? a?.key ?? a?.id;
					r != null && o.props.id == null && c != null && (c = r + ":" + c);
					let l = c ?? e.length;
					o = (0, W.cloneElement)(o, i ? {
						key: l,
						id: c,
						value: a
					} : { key: l }), n && s.set(n, o);
				}
				e.push(o);
			}
			return e;
		}
		if (typeof t != "function") return t;
	}, [
		t,
		n,
		s,
		r,
		i
	]);
}
function zt(e) {
	switch (typeof e) {
		case "object": return e != null;
		case "function":
		case "symbol": return !0;
		default: return !1;
	}
}
// ../../node_modules/react-aria/dist/private/collections/Hidden.mjs
typeof HTMLTemplateElement < "u" && (Object.defineProperty(HTMLTemplateElement.prototype, "firstChild", {
	configurable: !0,
	enumerable: !0,
	get: function() {
		return this.content.firstChild;
	}
}), Object.defineProperty(HTMLTemplateElement.prototype, "appendChild", {
	configurable: !0,
	enumerable: !0,
	value: function(e) {
		return this.content.appendChild(e);
	}
}), Object.defineProperty(HTMLTemplateElement.prototype, "removeChild", {
	configurable: !0,
	enumerable: !0,
	value: function(e) {
		return this.content.removeChild(e);
	}
}), Object.defineProperty(HTMLTemplateElement.prototype, "insertBefore", {
	configurable: !0,
	enumerable: !0,
	value: function(e, t) {
		return this.content.insertBefore(e, t);
	}
}));
var Bt = /*#__PURE__*/ (0, W.createContext)(!1);
function Vt(e) {
	if ((0, W.useContext)(Bt)) return /*#__PURE__*/ W.createElement(W.Fragment, null, e.children);
	let t = /*#__PURE__*/ W.createElement(Bt.Provider, { value: !0 }, e.children);
	return /*#__PURE__*/ W.createElement("template", null, t);
}
function Ht(e) {
	let t = (t, n) => (0, W.useContext)(Bt) ? null : e(t, n);
	return t.displayName = e.displayName || e.name, (0, W.forwardRef)(t);
}
// ../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var Ut = /* @__PURE__ */ I(((e) => {
	var t = P();
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, a = t.useEffect, o = t.useLayoutEffect, s = t.useDebugValue;
	function c(e, t) {
		var n = t(), r = i({ inst: {
			value: n,
			getSnapshot: t
		} }), c = r[0].inst, u = r[1];
		return o(function() {
			c.value = n, c.getSnapshot = t, l(c) && u({ inst: c });
		}, [
			e,
			n,
			t
		]), a(function() {
			return l(c) && u({ inst: c }), e(function() {
				l(c) && u({ inst: c });
			});
		}, [e]), s(n), n;
	}
	function l(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !r(e, n);
		} catch {
			return !0;
		}
	}
	function u(e, t) {
		return t();
	}
	var d = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? u : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? d : t.useSyncExternalStore;
})), Wt = /* @__PURE__ */ I(((e, t) => {
	t.exports = Ut();
})), Gt = /* @__PURE__ */ de(ve(), 1), Kt = Wt(), qt = /*#__PURE__*/ (0, W.createContext)(!1), Jt = /*#__PURE__*/ (0, W.createContext)(null);
function Yt(e) {
	if ((0, W.useContext)(Jt)) return e.content;
	let { collection: t, document: n } = $t(e.createCollection);
	return /*#__PURE__*/ W.createElement(W.Fragment, null, /*#__PURE__*/ W.createElement(Vt, null, /*#__PURE__*/ W.createElement(Jt.Provider, { value: n }, e.content)), /*#__PURE__*/ W.createElement(Xt, {
		render: e.children,
		collection: t
	}));
}
function Xt({ collection: e, render: t }) {
	return t(e);
}
function Zt(e, t, n) {
	let r = k(), i = (0, W.useRef)(r);
	i.current = r;
	let a = (0, W.useCallback)(() => i.current ? n() : t(), [t, n]);
	return (0, Kt.useSyncExternalStore)(e, a);
}
var Qt = typeof W.useSyncExternalStore == "function" ? W.useSyncExternalStore : Zt;
function $t(e) {
	let [t] = (0, W.useState)(() => new Lt(e?.() || new Nt()));
	return {
		collection: Qt((0, W.useCallback)((e) => t.subscribe(e), [t]), (0, W.useCallback)(() => {
			let e = t.getCollection();
			return t.isSSR && t.resetAfterSSR(), e;
		}, [t]), (0, W.useCallback)(() => (t.isSSR = !0, t.getCollection()), [t])),
		document: t
	};
}
var en = /*#__PURE__*/ (0, W.createContext)(null);
function tn(e) {
	return class extends kt {
		static {
			this.type = e;
		}
	};
}
function nn(e, t, n, r, i, a) {
	typeof e == "string" && (e = tn(e));
	let o = (0, W.useCallback)((i) => {
		i?.setProps(t, n, e, r, a);
	}, [
		t,
		n,
		r,
		a,
		e
	]), s = (0, W.useContext)(en);
	if (s) {
		let o = s.ownerDocument.nodesByProps.get(t);
		return o || (o = s.ownerDocument.createElement(e.type), o.setProps(t, n, e, r, a), s.appendChild(o), s.ownerDocument.updateCollection(), s.ownerDocument.nodesByProps.set(t, o)), i ? /*#__PURE__*/ W.createElement(en.Provider, { value: o }, i) : null;
	}
	return /*#__PURE__*/ W.createElement(e.type, { ref: o }, i);
}
function rn(e, t) {
	let n = ({ node: e }) => t(e.props, e.props.ref, e), r = (0, W.forwardRef)((r, i) => {
		let a = (0, W.useContext)(ue);
		if (!(0, W.useContext)(qt)) {
			if (t.length >= 3) throw Error(t.name + " cannot be rendered outside a collection.");
			return t(r, i);
		}
		return nn(e, r, i, "children" in r ? r.children : null, null, (e) => /*#__PURE__*/ W.createElement(ue.Provider, { value: a }, /*#__PURE__*/ W.createElement(n, { node: e })));
	});
	return r.displayName = t.name, r;
}
function an(e, t, n = on) {
	let r = ({ node: e }) => t(e.props, e.props.ref, e), i = (0, W.forwardRef)((t, i) => nn(e, t, i, null, n(t), (e) => /*#__PURE__*/ W.createElement(r, { node: e })) ?? /*#__PURE__*/ W.createElement(W.Fragment, null));
	return i.displayName = t.name, i;
}
function on(e) {
	return Rt({
		...e,
		addIdAndValue: !0
	});
}
var sn = /*#__PURE__*/ (0, W.createContext)(null);
function cn(e) {
	let t = (0, W.useContext)(sn), n = (t?.dependencies || []).concat(e.dependencies), r = e.idScope ?? t?.idScope, i = on({
		...e,
		idScope: r,
		dependencies: n
	});
	return (0, W.useContext)(Jt) && (i = /*#__PURE__*/ W.createElement(ln, null, i)), t = (0, W.useMemo)(() => ({
		dependencies: n,
		idScope: r
	}), [r, ...n]), /*#__PURE__*/ W.createElement(sn.Provider, { value: t }, i);
}
function ln({ children: e }) {
	let t = (0, W.useContext)(Jt), n = (0, W.useMemo)(() => /*#__PURE__*/ W.createElement(Jt.Provider, { value: null }, /*#__PURE__*/ W.createElement(qt.Provider, { value: !0 }, e)), [e]);
	return k() ? /*#__PURE__*/ W.createElement(en.Provider, { value: t }, n) : /*#__PURE__*/ (0, Gt.createPortal)(n, t);
}
// ../../node_modules/react-aria-components/dist/private/Collection.mjs
var un = {
	CollectionRoot({ collection: e, renderDropIndicator: t }) {
		return dn(e, null, t);
	},
	CollectionBranch({ collection: e, parent: t, renderDropIndicator: n }) {
		return dn(e, t, n);
	}
};
function dn(e, t, n) {
	return Rt({
		items: t ? e.getChildren(t.key) : e,
		dependencies: [n],
		children(t) {
			if (t.type === "content") return /*#__PURE__*/ W.createElement(W.Fragment, null);
			let r = t.render(t);
			return !n || t.type !== "item" ? r : /*#__PURE__*/ W.createElement(W.Fragment, null, n({
				type: "item",
				key: t.key,
				dropPosition: "before"
			}), r, fn(e, t, n));
		}
	});
}
function fn(e, t, n) {
	let r = t.key, i = e.getKeyAfter(r), a = i == null ? null : e.getItem(i);
	for (; a != null && a.type !== "item";) i = e.getKeyAfter(a.key), a = i == null ? null : e.getItem(i);
	let o = t.nextKey == null ? null : e.getItem(t.nextKey);
	for (; o != null && o.type !== "item";) o = o.nextKey == null ? null : e.getItem(o.nextKey);
	let s = [];
	if (o == null) {
		let r = t;
		for (; r?.type === "item" && (!a || r.parentKey !== a.parentKey && a.level < r.level);) {
			let t = n({
				type: "item",
				key: r.key,
				dropPosition: "after"
			});
			/*#__PURE__*/ (0, W.isValidElement)(t) && s.push(/*#__PURE__*/ (0, W.cloneElement)(t, { key: `${r.key}-after` })), r = r.parentKey == null ? null : e.getItem(r.parentKey);
		}
	}
	return s;
}
var pn = /*#__PURE__*/ (0, W.createContext)(un), mn = /* @__PURE__ */ new Set([
	"Arab",
	"Syrc",
	"Samr",
	"Mand",
	"Thaa",
	"Mend",
	"Nkoo",
	"Adlm",
	"Rohg",
	"Hebr"
]), hn = /* @__PURE__ */ new Set([
	"ae",
	"ar",
	"arc",
	"bcc",
	"bqi",
	"ckb",
	"dv",
	"fa",
	"glk",
	"he",
	"ku",
	"mzn",
	"nqo",
	"pnb",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function gn(e) {
	if (Intl.Locale) {
		let t = new Intl.Locale(e).maximize(), n = typeof t.getTextInfo == "function" ? t.getTextInfo() : t.textInfo;
		if (n) return n.direction === "rtl";
		if (t.script) return mn.has(t.script);
	}
	let t = e.split("-")[0];
	return hn.has(t);
}
// ../../node_modules/react-aria/dist/private/i18n/useDefaultLocale.mjs
var _n = Symbol.for("react-aria.i18n.locale");
function vn() {
	let e = typeof window < "u" && window[_n] || typeof navigator < "u" && (navigator.language || navigator.userLanguage) || "en-US";
	try {
		Intl.DateTimeFormat.supportedLocalesOf([e]);
	} catch {
		e = "en-US";
	}
	return {
		locale: e,
		direction: gn(e) ? "rtl" : "ltr"
	};
}
var yn = vn(), bn = /* @__PURE__ */ new Set();
function xn() {
	yn = vn();
	for (let e of bn) e(yn);
}
function Sn() {
	let e = k(), [t, n] = (0, W.useState)(yn);
	return (0, W.useEffect)(() => (bn.size === 0 && window.addEventListener("languagechange", xn), bn.add(n), () => {
		bn.delete(n), bn.size === 0 && window.removeEventListener("languagechange", xn);
	}), []), e ? {
		locale: typeof window < "u" && window[_n] || "en-US",
		direction: "ltr"
	} : t;
}
// ../../node_modules/react-aria/dist/private/i18n/I18nProvider.mjs
var Cn = /*#__PURE__*/ W.createContext(null);
function wn() {
	let e = Sn();
	return (0, W.useContext)(Cn) || e;
}
// ../../node_modules/@internationalized/string/dist/private/LocalizedStringDictionary.mjs
var Tn = Symbol.for("react-aria.i18n.locale"), En = Symbol.for("react-aria.i18n.strings"), Dn = void 0, On = class e {
	constructor(e, t = "en-US") {
		this.strings = Object.fromEntries(Object.entries(e).filter(([, e]) => e)), this.defaultLocale = t;
	}
	getStringForLocale(e, t) {
		let n = this.getStringsForLocale(t)[e];
		if (!n) throw Error(`Could not find intl message ${e} in ${t} locale`);
		return n;
	}
	getStringsForLocale(e) {
		let t = this.strings[e];
		return t || (t = kn(e, this.strings, this.defaultLocale), this.strings[e] = t), t;
	}
	static getGlobalDictionaryForPackage(t) {
		if (typeof window > "u") return null;
		let n = window[Tn];
		if (Dn === void 0) {
			let t = window[En];
			if (!t) return null;
			Dn = {};
			for (let r in t) Dn[r] = new e({ [n]: t[r] }, n);
		}
		let r = Dn?.[t];
		if (!r) throw Error(`Strings for package "${t}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
		return r;
	}
};
function kn(e, t, n = "en-US") {
	if (t[e]) return t[e];
	let r = An(e), i = jn(e);
	if (i && t[`${r}-${i}`]) return t[`${r}-${i}`];
	if (t[r]) return t[r];
	for (let e in t) if (e.startsWith(r + "-")) return t[e];
	return t[n];
}
function An(e) {
	return Intl.Locale ? new Intl.Locale(e).language : e.split("-")[0];
}
function jn(e) {
	if (Intl.Locale) return new Intl.Locale(e).script;
}
// ../../node_modules/@internationalized/string/dist/private/LocalizedStringFormatter.mjs
var Mn = /* @__PURE__ */ new Map(), Nn = /* @__PURE__ */ new Map(), Pn = class {
	constructor(e, t) {
		this.locale = e, this.strings = t;
	}
	format(e, t) {
		let n = this.strings.getStringForLocale(e, this.locale);
		return typeof n == "function" ? n(t, this) : n;
	}
	plural(e, t, n = "cardinal") {
		let r = t["=" + e];
		if (r) return typeof r == "function" ? r() : r;
		let i = this.locale + ":" + n, a = Mn.get(i);
		return a || (a = new Intl.PluralRules(this.locale, { type: n }), Mn.set(i, a)), r = t[a.select(e)] || t.other, typeof r == "function" ? r() : r;
	}
	number(e) {
		let t = Nn.get(this.locale);
		return t || (t = new Intl.NumberFormat(this.locale), Nn.set(this.locale, t)), t.format(e);
	}
	select(e, t) {
		let n = e[t] || e.other;
		return typeof n == "function" ? n() : n;
	}
}, Fn = /* @__PURE__ */ new WeakMap();
function In(e) {
	let t = Fn.get(e);
	return t || (t = new On(e), Fn.set(e, t)), t;
}
function Ln(e, t) {
	return t && On.getGlobalDictionaryForPackage(t) || In(e);
}
function Rn(e, t) {
	let { locale: n } = wn(), r = Ln(e, t);
	return (0, W.useMemo)(() => new Pn(n, r), [n, r]);
}
// ../../node_modules/react-aria-components/dist/private/Label.mjs
var zn = /*#__PURE__*/ (0, W.createContext)({}), Bn = /*#__PURE__*/ Ht(function(e, t) {
	[e, t] = d(e, t, zn);
	let { elementType: n = "label", ...r } = e, i = E[n];
	return /*#__PURE__*/ W.createElement(i, {
		className: "react-aria-Label",
		...r,
		ref: t
	});
});
// ../../node_modules/react-aria/dist/private/utils/useLabels.mjs
function Vn(e, t) {
	let { id: n, "aria-label": r, "aria-labelledby": i } = e;
	return n = R(n), i && r ? i = [.../* @__PURE__ */ new Set([n, ...i.trim().split(/\s+/)])].join(" ") : i &&= i.trim().split(/\s+/).join(" "), !r && !i && t && (r = t), {
		id: n,
		"aria-label": r,
		"aria-labelledby": i
	};
}
// ../../node_modules/react-aria/dist/private/label/useLabel.mjs
function Hn(e) {
	let { id: t, label: n, "aria-labelledby": r, "aria-label": i, labelElementType: a = "label" } = e;
	t = R(t);
	let o = R(), s = {};
	n && (r = r ? `${o} ${r}` : o, s = {
		id: o,
		htmlFor: a === "label" ? t : void 0
	});
	let c = Vn({
		id: t,
		"aria-label": i,
		"aria-labelledby": r
	});
	return {
		labelProps: s,
		fieldProps: c
	};
}
// ../../node_modules/@internationalized/number/dist/private/NumberFormatter.mjs
var Un = /* @__PURE__ */ new Map(), Wn = !1;
try {
	Wn = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
var Gn = class {
	constructor(e, t = {}) {
		this.numberFormatter = Kn(e, t), this.options = t;
	}
	format(e) {
		let t = "";
		return t = !Wn && this.options.signDisplay != null ? qn(this.numberFormatter, this.options.signDisplay, e) : this.numberFormatter.format(e), t;
	}
	formatToParts(e) {
		return this.numberFormatter.formatToParts(e);
	}
	formatRange(e, t) {
		if (typeof this.numberFormatter.formatRange == "function") return this.numberFormatter.formatRange(e, t);
		if (t < e) throw RangeError("End date must be >= start date");
		return `${this.format(e)} \u{2013} ${this.format(t)}`;
	}
	formatRangeToParts(e, t) {
		if (typeof this.numberFormatter.formatRangeToParts == "function") return this.numberFormatter.formatRangeToParts(e, t);
		if (t < e) throw RangeError("End date must be >= start date");
		let n = this.numberFormatter.formatToParts(e), r = this.numberFormatter.formatToParts(t);
		return [
			...n.map((e) => ({
				...e,
				source: "startRange"
			})),
			{
				type: "literal",
				value: " – ",
				source: "shared"
			},
			...r.map((e) => ({
				...e,
				source: "endRange"
			}))
		];
	}
	resolvedOptions() {
		let e = this.numberFormatter.resolvedOptions();
		return !Wn && this.options.signDisplay != null && (e = {
			...e,
			signDisplay: this.options.signDisplay
		}), e;
	}
};
function Kn(e, t = {}) {
	let { numberingSystem: n } = t;
	n && e.includes("-nu-") && (e.includes("-u-") || (e += "-u-"), e += `-nu-${n}`);
	let r = e + (t ? Object.entries(t).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : "");
	if (Un.has(r)) return Un.get(r);
	let i = new Intl.NumberFormat(e, t);
	return Un.set(r, i), i;
}
function qn(e, t, n) {
	if (t === "auto") return e.format(n);
	if (t === "never") return e.format(Math.abs(n));
	{
		let r = !1;
		if (t === "always" ? r = n > 0 || Object.is(n, 0) : t === "exceptZero" && (Object.is(n, -0) || Object.is(n, 0) ? n = Math.abs(n) : r = n > 0), r) {
			let t = e.format(-n), r = e.format(n), i = t.replace(r, "").replace(/\u200e|\u061C/, "");
			return [...i].length !== 1 && console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"), t.replace(r, "!!!").replace(i, "+").replace("!!!", r);
		}
		return e.format(n);
	}
}
// ../../node_modules/react-aria/dist/private/i18n/useNumberFormatter.mjs
function Jn(e = {}) {
	let { locale: t } = wn();
	return (0, W.useMemo)(() => new Gn(t, e), [t, e]);
}
// ../../node_modules/react-stately/dist/private/utils/number.mjs
function Yn(e, t = -Infinity, n = Infinity) {
	return Math.min(Math.max(e, t), n);
}
// ../../node_modules/react-aria/dist/private/progress/useProgressBar.mjs
function Xn(e) {
	let { value: t = 0, minValue: n = 0, maxValue: r = 100, valueLabel: i, isIndeterminate: a, formatOptions: o = { style: "percent" } } = e, s = C(e, { labelable: !0 }), { labelProps: c, fieldProps: l } = Hn({
		...e,
		labelElementType: "span"
	});
	t = Yn(t, n, r);
	let u = r - n, d = u === 0 ? 0 : (t - n) / u, f = Jn(o);
	if (!a && !i) {
		let e = o.style === "percent" ? d : t;
		i = f.format(e);
	}
	return {
		progressBarProps: H(s, {
			...l,
			"aria-valuenow": a ? void 0 : t,
			"aria-valuemin": n,
			"aria-valuemax": r,
			"aria-valuetext": a ? void 0 : i,
			role: "progressbar"
		}),
		labelProps: c
	};
}
// ../../node_modules/react-aria-components/dist/private/ProgressBar.mjs
var Zn = /*#__PURE__*/ (0, W.createContext)(null), Qn = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	[e, t] = d(e, t, Zn);
	let { value: n = 0, minValue: r = 0, maxValue: i = 100, isIndeterminate: a = !1 } = e;
	n = Yn(n, r, i);
	let [o, s] = u(!e["aria-label"] && !e["aria-labelledby"]), { progressBarProps: c, labelProps: l } = Xn({
		...e,
		label: s
	}), f = i - r, p;
	a || (p = f === 0 ? 0 : (n - r) / f * 100);
	let m = V({
		...e,
		defaultClassName: "react-aria-ProgressBar",
		values: {
			percentage: p,
			valueText: c["aria-valuetext"],
			isIndeterminate: a
		}
	}), h = C(e, { global: !0 });
	return /*#__PURE__*/ W.createElement(E.div, {
		...H(h, m, c),
		ref: t,
		slot: e.slot || void 0
	}, /*#__PURE__*/ W.createElement(zn.Provider, { value: {
		...l,
		ref: o,
		elementType: "span"
	} }, m.children));
}), $n = 7e3, er = null;
function tr(e, t = "assertive", n = $n) {
	er ? er.announce(e, t, n) : (er = new nr(), (typeof IS_REACT_ACT_ENVIRONMENT == "boolean" ? IS_REACT_ACT_ENVIRONMENT : typeof jest < "u") ? er.announce(e, t, n) : setTimeout(() => {
		er?.isAttached() && er?.announce(e, t, n);
	}, 100));
}
var nr = class {
	constructor() {
		this.node = null, this.assertiveLog = null, this.politeLog = null, typeof document < "u" && (this.node = document.createElement("div"), this.node.dataset.liveAnnouncer = "true", Object.assign(this.node.style, {
			border: 0,
			clip: "rect(0 0 0 0)",
			clipPath: "inset(50%)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			width: "1px",
			whiteSpace: "nowrap"
		}), this.assertiveLog = this.createLog("assertive"), this.node.appendChild(this.assertiveLog), this.politeLog = this.createLog("polite"), this.node.appendChild(this.politeLog), document.body.prepend(this.node));
	}
	isAttached() {
		return this.node?.isConnected;
	}
	createLog(e) {
		let t = document.createElement("div");
		return t.setAttribute("role", "log"), t.setAttribute("aria-live", e), t.setAttribute("aria-relevant", "additions"), t;
	}
	destroy() {
		this.node &&= (document.body.removeChild(this.node), null);
	}
	announce(e, t = "assertive", n = $n) {
		if (!this.node) return;
		let r = document.createElement("div");
		typeof e == "object" ? (r.setAttribute("role", "img"), r.setAttribute("aria-labelledby", e["aria-labelledby"])) : r.textContent = e, t === "assertive" ? this.assertiveLog?.appendChild(r) : this.politeLog?.appendChild(r), e !== "" && setTimeout(() => {
			r.remove();
		}, n);
	}
	clear(e) {
		this.node && ((!e || e === "assertive") && this.assertiveLog && (this.assertiveLog.innerHTML = ""), (!e || e === "polite") && this.politeLog && (this.politeLog.innerHTML = ""));
	}
};
// ../../node_modules/react-aria/dist/private/button/useButton.mjs
function rr(e, t) {
	let { elementType: n = "button", isDisabled: r, onPress: i, onPressStart: a, onPressEnd: o, onPressUp: s, onPressChange: c, preventFocusOnPress: l, allowFocusWhenDisabled: u, onClick: d, href: f, target: p, rel: m, type: h = "button" } = e, g;
	g = n === "button" ? {
		type: h,
		disabled: r,
		form: e.form,
		formAction: e.formAction,
		formEncType: e.formEncType,
		formMethod: e.formMethod,
		formNoValidate: e.formNoValidate,
		formTarget: e.formTarget,
		name: e.name,
		value: e.value
	} : {
		role: "button",
		href: n === "a" && !r ? f : void 0,
		target: n === "a" ? p : void 0,
		type: n === "input" ? h : void 0,
		disabled: n === "input" ? r : void 0,
		"aria-disabled": !r || n === "input" ? void 0 : r,
		rel: n === "a" ? m : void 0
	};
	let { pressProps: _, isPressed: v } = j({
		onPressStart: a,
		onPressEnd: o,
		onPressChange: c,
		onPress: i,
		onPressUp: s,
		onClick: d,
		isDisabled: r,
		preventFocusOnPress: l,
		ref: t
	}), { focusableProps: y } = ee(e, t);
	u && (y.tabIndex = r ? -1 : y.tabIndex);
	let b = H(y, _, C(e, { labelable: !0 }));
	return {
		isPressed: v,
		buttonProps: H(g, b, {
			"aria-haspopup": e["aria-haspopup"],
			"aria-expanded": e["aria-expanded"],
			"aria-controls": e["aria-controls"],
			"aria-pressed": e["aria-pressed"],
			"aria-current": e["aria-current"],
			"aria-disabled": e["aria-disabled"]
		})
	};
}
// ../../node_modules/react-aria-components/dist/private/Button.mjs
var ir = /*#__PURE__*/ (0, W.createContext)({}), ar = /*#__PURE__*/ Ht(function(e, t) {
	[e, t] = d(e, t, ir);
	let n = e, { isPending: r } = n, { buttonProps: i, isPressed: a } = rr(e, t);
	i = sr(i, r);
	let { focusProps: o, isFocused: s, isFocusVisible: c } = le(e), { hoverProps: l, isHovered: u } = O({
		...e,
		isDisabled: e.isDisabled || r
	}), f = {
		isHovered: u,
		isPressed: (n.isPressed || a) && !r,
		isFocused: s,
		isFocusVisible: c,
		isDisabled: e.isDisabled || !1,
		isPending: r ?? !1
	}, p = V({
		...e,
		values: f,
		defaultClassName: "react-aria-Button"
	}), m = R(i.id), h = R(), g = i["aria-labelledby"];
	r && (g ? g = `${g} ${h}` : i["aria-label"] && (g = `${m} ${h}`));
	let _ = (0, W.useRef)(r);
	(0, W.useEffect)(() => {
		let e = { "aria-labelledby": g || m };
		(!_.current && s && r || _.current && s && !r) && tr(e, "assertive"), _.current = r;
	}, [
		r,
		s,
		g,
		m
	]);
	let v = C(e, { global: !0 });
	return delete v.onClick, /*#__PURE__*/ W.createElement(E.button, {
		...H(v, p, i, o, l),
		type: i.type === "submit" && r ? "button" : i.type,
		id: m,
		ref: t,
		"aria-labelledby": g,
		slot: e.slot || void 0,
		"aria-disabled": r ? "true" : i["aria-disabled"],
		"data-disabled": e.isDisabled || void 0,
		"data-pressed": f.isPressed || void 0,
		"data-hovered": u || void 0,
		"data-focused": s || void 0,
		"data-pending": r || void 0,
		"data-focus-visible": c || void 0
	}, /*#__PURE__*/ W.createElement(Zn.Provider, { value: { id: h } }, p.children));
}), or = /Focus|Blur|Hover|Pointer(Enter|Leave|Over|Out)|Mouse(Enter|Leave|Over|Out)/;
function sr(e, t) {
	if (t) {
		for (let t in e) t.startsWith("on") && !or.test(t) && (e[t] = void 0);
		e.href = void 0, e.target = void 0;
	}
	return e;
}
// ../../packages/ui/src/primitives/ProgressCircle/ProgressCircle.tsx
function cr(e) {
	let t = "calc(50% - 2px)";
	return /* @__PURE__ */ (0, G.jsx)(Qn, {
		...e,
		style: T(e.style, (t) => ({
			...t,
			width: e.size || 16,
			height: e.size || 16
		})),
		children: ({ percentage: e, isIndeterminate: n }) => /* @__PURE__ */ (0, G.jsx)(G.Fragment, { children: /* @__PURE__ */ (0, G.jsxs)("svg", {
			fill: "none",
			width: "100%",
			height: "100%",
			viewBox: "0 0 32 32",
			children: [/* @__PURE__ */ (0, G.jsx)("circle", {
				cx: "50%",
				cy: "50%",
				r: t,
				stroke: "var(--highlight-pressed)",
				strokeWidth: 4
			}), /* @__PURE__ */ (0, G.jsx)("circle", {
				cx: "50%",
				cy: "50%",
				r: t,
				stroke: "var(--highlight-background)",
				strokeWidth: 4,
				pathLength: "100",
				strokeDasharray: "100 200",
				strokeDashoffset: 100 - (n || e == null ? 25 : e),
				strokeLinecap: "round",
				style: {
					rotate: "-90deg",
					transformOrigin: "center center"
				},
				children: n && /* @__PURE__ */ (0, G.jsx)("animateTransform", {
					attributeName: "transform",
					type: "rotate",
					dur: "0.75s",
					values: "0;360",
					repeatCount: "indefinite"
				})
			})]
		}) })
	});
}
// ../../packages/ui/src/primitives/Button/Button.tsx
function K(e) {
	return /* @__PURE__ */ (0, G.jsx)(ar, {
		...e,
		className: T(e.className, (e) => `react-aria-Button button-base${e ? `  ${e}` : ""}`),
		"data-variant": e.variant || "primary",
		children: T(e.children, (e, { isPending: t }) => /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [!t && e, t && /* @__PURE__ */ (0, G.jsx)(cr, {
			"aria-label": "Saving...",
			isIndeterminate: !0
		})] }))
	});
}
// ../../node_modules/react-aria-components/dist/private/Text.mjs
var lr = /*#__PURE__*/ (0, W.createContext)({}), ur = /*#__PURE__*/ Ht(function(e, t) {
	[e, t] = d(e, t, lr);
	let { elementType: n = "span", ...r } = e, i = E[n];
	return /*#__PURE__*/ W.createElement(i, {
		className: "react-aria-Text",
		...r,
		ref: t
	});
});
// ../../node_modules/react-aria/dist/private/utils/useUpdateEffect.mjs
function dr(e, t) {
	let n = (0, W.useRef)(!0), r = (0, W.useRef)(null), i = _e(e);
	(0, W.useEffect)(() => (n.current = !0, () => {
		n.current = !1;
	}), []), (0, W.useEffect)(() => {
		let e = r.current;
		n.current ? n.current = !1 : (!e || t.some((t, n) => !Object.is(t, e[n]))) && i(), r.current = t;
	}, t);
}
// ../../node_modules/react-aria/dist/private/utils/isScrollable.mjs
function fr(e, t) {
	if (!e) return !1;
	let n = window.getComputedStyle(e), r = document.scrollingElement || document.documentElement, i = /(auto|scroll)/.test(n.overflow + n.overflowX + n.overflowY);
	return e === r && n.overflow !== "hidden" && (i = !0), i && t && (i = e.scrollHeight !== e.clientHeight || e.scrollWidth !== e.clientWidth), i;
}
// ../../node_modules/react-aria/dist/private/utils/getScrollParent.mjs
function pr(e, t) {
	let n = e;
	for (fr(n, t) && (n = n.parentElement); n && !fr(n, t);) n = n.parentElement;
	return n || document.scrollingElement || document.documentElement;
}
// ../../node_modules/react-aria/dist/private/utils/getScrollParents.mjs
function mr(e, t) {
	let n = [], r = document.scrollingElement || document.documentElement;
	for (; e && (fr(e, t) && n.push(e), e !== r);) e = e.parentElement;
	return n;
}
// ../../node_modules/react-aria/dist/private/utils/scrollIntoView.mjs
function hr(e, t, n = {}) {
	e !== t && gr(e, t, t.getBoundingClientRect(), n);
}
function gr(e, t, n, r = {}) {
	let { block: i = "nearest", inline: a = "nearest" } = r, o = e.scrollTop, s = e.scrollLeft, l = e.getBoundingClientRect(), u = window.getComputedStyle(t), d = window.getComputedStyle(e), p = document.scrollingElement || document.documentElement, m = e === p, h = e === p ? 0 : l.top, g = e === p ? e.clientHeight : l.bottom, _ = e === p ? 0 : l.left, v = e === p ? e.clientWidth : l.right, y = parseFloat(u.scrollMarginTop) || 0, b = parseFloat(u.scrollMarginBottom) || 0, x = parseFloat(u.scrollMarginLeft) || 0, S = parseFloat(u.scrollMarginRight) || 0, C = parseFloat(d.scrollPaddingTop) || 0, w = parseFloat(d.scrollPaddingBottom) || 0, T = parseFloat(d.scrollPaddingLeft) || 0, E = parseFloat(d.scrollPaddingRight) || 0, D = parseFloat(d.borderTopWidth) || 0, O = parseFloat(d.borderBottomWidth) || 0, k = parseFloat(d.borderLeftWidth) || 0, A = parseFloat(d.borderRightWidth) || 0, j = n.top - y, M = n.bottom + b, N = n.left - x, P = n.right + S, F = e === p ? 0 : k + A, ee = e === p ? 0 : D + O, I = e === p ? 0 : e.offsetWidth - e.clientWidth - F, te = e === p ? 0 : e.offsetHeight - e.clientHeight - ee, L = h + (m ? 0 : D) + C, ne = g - (m ? 0 : O) - w - te, R = _ + (m ? 0 : k) + T, z = v - (m ? 0 : A) - E;
	c() && f() || d.direction === "ltr" ? z -= I : d.direction === "rtl" && (R += I);
	let re = j < L || M > ne, ie = N < R || P > z;
	if (re && i === "start") o += j - L;
	else if (re && i === "center") o += (j + M) / 2 - (L + ne) / 2;
	else if (re && i === "end") o += M - ne;
	else if (re && i === "nearest") {
		let e = j - L, t = M - ne;
		o += Math.abs(e) <= Math.abs(t) ? e : t;
	}
	if (ie && a === "start") s += N - R;
	else if (ie && a === "center") s += (N + P) / 2 - (R + z) / 2;
	else if (ie && a === "end") s += P - z;
	else if (ie && a === "nearest") {
		let e = N - R, t = P - z;
		s += Math.abs(e) <= Math.abs(t) ? e : t;
	}
	e.scrollTo({
		left: s,
		top: o
	});
}
function _r(e, t = {}) {
	let { containingElement: n } = t;
	if (e && e.isConnected) {
		let t = document.scrollingElement || document.documentElement;
		if (window.getComputedStyle(t).overflow !== "hidden") {
			let { left: t, top: r } = e.getBoundingClientRect();
			e?.scrollIntoView?.({ block: "nearest" });
			let { left: i, top: a } = e.getBoundingClientRect();
			(Math.abs(t - i) > 1 || Math.abs(r - a) > 1) && (n?.scrollIntoView?.({
				block: "center",
				inline: "center"
			}), e.scrollIntoView?.({ block: "nearest" }));
		} else {
			let { left: t, top: r } = e.getBoundingClientRect(), i = mr(e, !0);
			for (let t of i) hr(t, e);
			let { left: a, top: o } = e.getBoundingClientRect();
			if (Math.abs(t - a) > 1 || Math.abs(r - o) > 1) {
				i = n ? mr(n, !0) : [];
				for (let e of i) hr(e, n, {
					block: "center",
					inline: "center"
				});
				for (let t of mr(e, !0)) hr(t, e);
			}
		}
	}
}
// ../../node_modules/react-aria/dist/private/utils/useDescription.mjs
var vr = 0, yr = /* @__PURE__ */ new Map();
function br(e) {
	let [t, n] = (0, W.useState)();
	return B(() => {
		if (!e) return;
		let t = yr.get(e);
		if (t) n(t.element.id);
		else {
			let r = `react-aria-description-${vr++}`;
			n(r);
			let i = document.createElement("div");
			i.id = r, i.style.display = "none", i.textContent = e, document.body.appendChild(i), t = {
				refCount: 0,
				element: i
			}, yr.set(e, t);
		}
		return t.refCount++, () => {
			t && --t.refCount === 0 && (t.element.remove(), yr.delete(e));
		};
	}, [e]), { "aria-describedby": e ? t : void 0 };
}
// ../../node_modules/react-aria/dist/private/utils/useEvent.mjs
function xr(e, t, n, r) {
	let i = _e(n), a = n == null;
	(0, W.useEffect)(() => {
		if (!(a || e.current == null)) return p(e.current, t, i, r);
	}, [
		e,
		t,
		r,
		a
	]);
}
// ../../node_modules/react-stately/dist/private/utils/useControlledState.mjs
var Sr = W.useInsertionEffect ?? W.useLayoutEffect;
function Cr(e, t, n) {
	let [r, i] = (0, W.useState)(e || t), a = (0, W.useRef)(r), o = (0, W.useRef)(e !== void 0), s = e !== void 0;
	(0, W.useEffect)(() => {
		o.current, o.current = s;
	}, [s]);
	let c = s ? e : r;
	Sr(() => {
		a.current = c;
	});
	let [, l] = (0, W.useReducer)(() => ({}), {});
	return [c, (0, W.useCallback)((e, ...t) => {
		let r = typeof e == "function" ? e(a.current) : e;
		Object.is(a.current, r) || (a.current = r, i(r), l(), n?.(r, ...t));
	}, [n])];
}
// ../../node_modules/react-aria/dist/private/visually-hidden/VisuallyHidden.mjs
var wr = {
	border: 0,
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	padding: 0,
	position: "absolute",
	width: "1px",
	whiteSpace: "nowrap"
};
function Tr(e = {}) {
	let { style: t, isFocusable: n } = e, [r, i] = (0, W.useState)(!1), { focusWithinProps: a } = me({
		isDisabled: !n,
		onFocusWithinChange: (e) => i(e)
	}), o = (0, W.useMemo)(() => r ? t : t ? {
		...wr,
		...t
	} : wr, [r]);
	return { visuallyHiddenProps: {
		...a,
		style: o
	} };
}
function Er(e) {
	let { children: t, elementType: n = "div", isFocusable: r, style: i, ...a } = e, { visuallyHiddenProps: o } = Tr(e);
	return /*#__PURE__*/ W.createElement(n, H(a, o), t);
}
// ../../packages/ui/src/primitives/Content/Content.tsx
function Dr(e) {
	return /* @__PURE__ */ (0, G.jsx)(ur, { ...e });
}
// ../../node_modules/react-aria-components/dist/private/FieldError.mjs
var Or = /*#__PURE__*/ (0, W.createContext)(null), kr = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	return (0, W.useContext)(Or)?.isInvalid ? /*#__PURE__*/ W.createElement(Ar, {
		...e,
		ref: t
	}) : null;
}), Ar = /*#__PURE__*/ (0, W.forwardRef)((e, t) => {
	let n = (0, W.useContext)(Or), { elementType: r, ...i } = e, a = C(i, { global: !0 }), o = V({
		...i,
		defaultClassName: "react-aria-FieldError",
		defaultChildren: n.validationErrors.length === 0 ? void 0 : n.validationErrors.join(" "),
		values: n
	});
	return o.children == null ? null : /*#__PURE__*/ W.createElement(ur, {
		slot: "errorMessage",
		elementType: r,
		...a,
		...o,
		ref: t
	});
}), jr = {
	badInput: !1,
	customError: !1,
	patternMismatch: !1,
	rangeOverflow: !1,
	rangeUnderflow: !1,
	stepMismatch: !1,
	tooLong: !1,
	tooShort: !1,
	typeMismatch: !1,
	valueMissing: !1,
	valid: !0
}, Mr = {
	...jr,
	customError: !0,
	valid: !1
}, Nr = {
	isInvalid: !1,
	validationDetails: jr,
	validationErrors: []
}, Pr = (0, W.createContext)({}), Fr = "__reactAriaFormValidationState";
function Ir(e) {
	if (e.__reactAriaFormValidationState) {
		let { realtimeValidation: t, displayValidation: n, updateValidation: r, resetValidation: i, commitValidation: a } = e[Fr];
		return {
			realtimeValidation: t,
			displayValidation: n,
			updateValidation: r,
			resetValidation: i,
			commitValidation: a
		};
	}
	return Lr(e);
}
function Lr(e) {
	let { isInvalid: t, validationState: n, name: r, value: i, builtinValidation: a, validate: o, validationBehavior: s = "aria" } = e;
	n && (t ||= n === "invalid");
	let c = t === void 0 ? null : {
		isInvalid: t,
		validationErrors: [],
		validationDetails: Mr
	}, l = (0, W.useMemo)(() => !o || i == null ? null : Br(zr(o, i)), [o, i]);
	a?.validationDetails.valid && (a = void 0);
	let u = (0, W.useContext)(Pr), d = (0, W.useMemo)(() => r ? Array.isArray(r) ? r.flatMap((e) => Rr(u[e])) : Rr(u[r]) : [], [u, r]), [f, p] = (0, W.useState)(u), [m, h] = (0, W.useState)(!1);
	u !== f && (p(u), h(!1));
	let g = (0, W.useMemo)(() => Br(m ? [] : d), [m, d]), _ = (0, W.useRef)(Nr), [v, y] = (0, W.useState)(Nr), b = (0, W.useRef)(Nr), x = () => {
		if (!S) return;
		C(!1);
		let e = l || a || _.current;
		Vr(e, b.current) || (b.current = e, y(e));
	}, [S, C] = (0, W.useState)(!1);
	return (0, W.useEffect)(x), {
		realtimeValidation: c || g || l || a || Nr,
		displayValidation: s === "native" ? c || g || v : c || g || l || a || v,
		updateValidation(e) {
			s === "aria" && !Vr(v, e) ? y(e) : _.current = e;
		},
		resetValidation() {
			let e = Nr;
			Vr(e, b.current) || (b.current = e, y(e)), s === "native" && C(!1), h(!0);
		},
		commitValidation() {
			s === "native" && C(!0), h(!0);
		}
	};
}
function Rr(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function zr(e, t) {
	if (typeof e == "function") {
		let n = e(t);
		if (n && typeof n != "boolean") return Rr(n);
	}
	return [];
}
function Br(e) {
	return e.length ? {
		isInvalid: !0,
		validationErrors: e,
		validationDetails: Mr
	} : null;
}
function Vr(e, t) {
	return e === t || !!e && !!t && e.isInvalid === t.isInvalid && e.validationErrors.length === t.validationErrors.length && e.validationErrors.every((e, n) => e === t.validationErrors[n]) && Object.entries(e.validationDetails).every(([e, n]) => t.validationDetails[e] === n);
}
// ../../node_modules/react-aria-components/dist/private/Form.mjs
var Hr = /*#__PURE__*/ (0, W.createContext)(null), Ur = /* @__PURE__ */ new WeakMap();
// ../../node_modules/react-aria/dist/private/label/useField.mjs
function Wr(e) {
	let { description: t, errorMessage: n, isInvalid: r, validationState: i } = e, { labelProps: a, fieldProps: o } = Hn(e), s = pe([
		!!t,
		!!n,
		r,
		i
	]), c = pe([
		!!t,
		!!n,
		r,
		i
	]);
	return o = H(o, { "aria-describedby": [
		s,
		c,
		e["aria-describedby"]
	].filter(Boolean).join(" ") || void 0 }), {
		labelProps: a,
		fieldProps: o,
		descriptionProps: { id: s },
		errorMessageProps: { id: c }
	};
}
// ../../node_modules/react-aria/dist/private/utils/useFormReset.mjs
function Gr(e, t, n) {
	let r = _e((e) => {
		n && !e.defaultPrevented && n(t);
	});
	(0, W.useEffect)(() => {
		let t = e?.current?.form;
		return t?.addEventListener("reset", r), () => {
			t?.removeEventListener("reset", r);
		};
	}, [e]);
}
// ../../node_modules/react-aria/dist/private/form/useFormValidation.mjs
function Kr(e, t, n) {
	let { validationBehavior: r, focus: a } = e;
	B(() => {
		if (r === "native" && n?.current && "setCustomValidity" in n.current && !n.current.disabled) {
			let e = t.realtimeValidation.isInvalid ? t.realtimeValidation.validationErrors.join(" ") || "Invalid value." : "";
			n.current.setCustomValidity(e), n.current.hasAttribute("title") || (n.current.title = ""), t.realtimeValidation.isInvalid || t.updateValidation(Jr(n.current));
		}
	});
	let o = (0, W.useRef)(!1), s = _e(() => {
		o.current || t.resetValidation();
	}), c = _e((e) => {
		t.displayValidation.isInvalid || t.commitValidation();
		let r = n?.current?.form;
		!e.defaultPrevented && n && r && Yr(r) === n.current && (a ? a() : n.current?.focus(), D("keyboard")), e.preventDefault();
	}), l = _e(() => {
		t.commitValidation();
	});
	(0, W.useEffect)(() => {
		let e = n?.current;
		if (!e) return;
		let t = e.form, r = t?.reset;
		return t && (t.reset = () => {
			o.current = !window.event || window.event.type === "message" && i(window.event) instanceof MessagePort, r?.call(t), o.current = !1;
		}), e.addEventListener("invalid", c), e.addEventListener("change", l), t?.addEventListener("reset", s), () => {
			e.removeEventListener("invalid", c), e.removeEventListener("change", l), t?.removeEventListener("reset", s), t && (t.reset = r);
		};
	}, [n, r]);
}
function qr(e) {
	let t = e.validity;
	return {
		badInput: t.badInput,
		customError: t.customError,
		patternMismatch: t.patternMismatch,
		rangeOverflow: t.rangeOverflow,
		rangeUnderflow: t.rangeUnderflow,
		stepMismatch: t.stepMismatch,
		tooLong: t.tooLong,
		tooShort: t.tooShort,
		typeMismatch: t.typeMismatch,
		valueMissing: t.valueMissing,
		valid: t.valid
	};
}
function Jr(e) {
	return {
		isInvalid: !e.validity.valid,
		validationDetails: qr(e),
		validationErrors: e.validationMessage ? [e.validationMessage] : []
	};
}
function Yr(e) {
	for (let t = 0; t < e.elements.length; t++) {
		let n = e.elements[t];
		if (n.validity?.valid === !1) return n;
	}
	return null;
}
// ../../node_modules/react-aria/dist/private/utils/useSlot.mjs
function Xr(e = !0) {
	let [t, n] = (0, W.useState)(e), r = (0, W.useRef)(!1), i = (0, W.useCallback)((e) => {
		r.current = !0, n(!!e);
	}, []);
	return B(() => {
		r.current || n(!1);
	}, []), [i, t];
}
function Zr(e = !0) {
	let t = R(), [n, r] = Xr(e);
	return {
		id: r ? t : void 0,
		ref: n
	};
}
// ../../node_modules/react-aria/dist/private/toggle/useToggle.mjs
function Qr(e, t, n) {
	let { isDisabled: r = !1, isReadOnly: a = !1, value: o, name: s, form: c, children: l, isRequired: u, validationBehavior: d = "aria", "aria-label": f, "aria-labelledby": p, "aria-describedby": m, onPressStart: h, onPressEnd: g, onPressChange: _, onPress: v, onPressUp: y, onClick: b } = e, x = Ir({
		...e,
		value: t.isSelected
	}), { isInvalid: S, validationErrors: w, validationDetails: T } = x.displayValidation;
	Kr(e, x, n);
	let E = (e) => {
		e.stopPropagation(), t.setSelected(i(e).checked);
	}, { pressProps: D, isPressed: O } = j({
		onPressStart: h,
		onPressEnd: g,
		onPressChange: _,
		onPress: v,
		onPressUp: y,
		onClick: b,
		isDisabled: r
	}), [k, A] = (0, W.useState)(!1), { pressProps: M } = j({
		onPressStart(e) {
			e.pointerType === "keyboard" || e.pointerType === "virtual" ? e.continuePropagation() : (h?.(e), _?.(!0), A(!0));
		},
		onPressEnd(e) {
			e.pointerType === "keyboard" || e.pointerType === "virtual" ? e.continuePropagation() : (g?.(e), _?.(!1), A(!1));
		},
		onPressUp(e) {
			e.pointerType === "keyboard" || e.pointerType === "virtual" ? e.continuePropagation() : y?.(e);
		},
		onClick: b,
		onPress(r) {
			if (r.pointerType === "keyboard" || r.pointerType === "virtual") {
				r.continuePropagation();
				return;
			}
			v?.(r), t.toggle(), n.current?.focus();
			let { [Fr]: i } = e, { commitValidation: a } = i || x;
			a();
		},
		isDisabled: r || a
	}), { focusableProps: N } = ee(e, n), P = H(D, N), F = C(e, { labelable: !0 });
	Gr(n, t.defaultSelected, t.setSelected);
	let I = Zr(), te = Zr();
	return {
		labelProps: H(M, { onClick: (e) => e.preventDefault() }),
		inputProps: H(F, {
			checked: t.isSelected,
			"aria-required": u && d === "aria" || void 0,
			required: u && d === "native",
			"aria-invalid": S || e.validationState === "invalid" || void 0,
			"aria-errormessage": e["aria-errormessage"],
			"aria-controls": e["aria-controls"],
			"aria-readonly": a || void 0,
			"aria-describedby": [
				I.id,
				te.id,
				m
			].filter(Boolean).join(" ") || void 0,
			onChange: E,
			disabled: r,
			...o == null ? {} : { value: o },
			name: s,
			form: c,
			type: "checkbox",
			...P
		}),
		descriptionProps: I,
		errorMessageProps: te,
		isSelected: t.isSelected,
		isPressed: O || k,
		isDisabled: r,
		isReadOnly: a,
		isInvalid: S || e.validationState === "invalid",
		validationErrors: w,
		validationDetails: T
	};
}
// ../../node_modules/react-aria/dist/private/checkbox/useCheckbox.mjs
function $r(e, t, n) {
	let { labelProps: r, inputProps: i, descriptionProps: a, errorMessageProps: o, isSelected: s, isPressed: c, isDisabled: l, isReadOnly: u, isInvalid: d, validationErrors: f, validationDetails: p } = Qr(e, t, n), { isIndeterminate: m } = e;
	return (0, W.useEffect)(() => {
		n.current && (n.current.indeterminate = !!m);
	}), {
		labelProps: H(r, (0, W.useMemo)(() => ({ onMouseDown: (e) => e.preventDefault() }), [])),
		inputProps: i,
		descriptionProps: a,
		errorMessageProps: o,
		isSelected: s,
		isPressed: c,
		isDisabled: l,
		isReadOnly: u,
		isInvalid: d,
		validationErrors: f,
		validationDetails: p
	};
}
// ../../node_modules/react-stately/dist/private/toggle/useToggleState.mjs
function ei(e = {}) {
	let { isReadOnly: t } = e, [n, r] = Cr(e.isSelected, e.defaultSelected || !1, e.onChange), [i] = (0, W.useState)(n);
	function a(e) {
		t || r(e);
	}
	function o() {
		t || r(!n);
	}
	return {
		isSelected: n,
		defaultSelected: e.defaultSelected ?? i,
		setSelected: a,
		toggle: o
	};
}
// ../../node_modules/react-aria/dist/private/checkbox/useCheckboxGroupItem.mjs
function ti(e, t, n) {
	let r = ei({
		isReadOnly: e.isReadOnly || t.isReadOnly,
		isSelected: t.isSelected(e.value),
		defaultSelected: t.defaultValue.includes(e.value),
		onChange(n) {
			n ? t.addValue(e.value) : t.removeValue(e.value), e.onChange && e.onChange(n);
		}
	}), { name: i, form: a, descriptionId: o, errorMessageId: s, validationBehavior: c } = Ur.get(t);
	c = e.validationBehavior ?? c;
	let { realtimeValidation: l } = Ir({
		...e,
		value: r.isSelected,
		name: void 0,
		validationBehavior: "aria"
	}), u = (0, W.useRef)(Nr), d = () => {
		t.setInvalid(e.value, l.isInvalid ? l : u.current);
	};
	(0, W.useEffect)(d);
	let f = t.realtimeValidation.isInvalid ? t.realtimeValidation : l, p = c === "native" ? t.displayValidation : f, m = $r({
		...e,
		isReadOnly: e.isReadOnly || t.isReadOnly,
		isDisabled: e.isDisabled || t.isDisabled,
		name: e.name || i,
		form: e.form || a,
		isRequired: e.isRequired ?? t.isRequired,
		validationBehavior: c,
		[Fr]: {
			realtimeValidation: f,
			displayValidation: p,
			resetValidation: t.resetValidation,
			commitValidation: t.commitValidation,
			updateValidation(e) {
				u.current = e, d();
			}
		}
	}, r, n);
	return {
		...m,
		inputProps: {
			...m.inputProps,
			"aria-describedby": [
				m.inputProps["aria-describedby"],
				t.isInvalid ? s : null,
				o
			].filter(Boolean).join(" ") || void 0
		}
	};
}
// ../../node_modules/react-aria-components/dist/private/Checkbox.mjs
var ni = /*#__PURE__*/ (0, W.createContext)(null), ri = /*#__PURE__*/ (0, W.createContext)(null), ii = /*#__PURE__*/ (0, W.createContext)(null), ai = /*#__PURE__*/ (0, W.createContext)(null), oi = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	let { inputRef: n = null, ...r } = e;
	[e, t] = d(r, t, ri);
	let i = (0, W.useContext)(ii), [a, o] = si(e, n), { descriptionProps: c, errorMessageProps: l, isSelected: u, isDisabled: f, isReadOnly: p, isInvalid: m, validationDetails: h, validationErrors: g } = a, _ = V({
		...e,
		defaultClassName: "react-aria-CheckboxField",
		values: {
			isSelected: u,
			isIndeterminate: e.isIndeterminate || !1,
			isDisabled: f,
			isReadOnly: p,
			isInvalid: m,
			isRequired: e.isRequired || !1
		}
	}), v = C(e, { global: !0 });
	return delete v.id, delete v.onClick, /*#__PURE__*/ W.createElement(E.div, {
		...H(v, _),
		ref: t,
		slot: e.slot || void 0,
		"data-selected": u || void 0,
		"data-indeterminate": e.isIndeterminate || void 0,
		"data-disabled": f || void 0,
		"data-readonly": p || void 0,
		"data-invalid": m || void 0,
		"data-required": e.isRequired || void 0
	}, /*#__PURE__*/ W.createElement(s, { values: [
		[ai, {
			...a,
			inputRef: o,
			defaultClassName: "react-aria-CheckboxButton",
			isIndeterminate: e.isIndeterminate,
			isRequired: e.isRequired
		}],
		[lr, { slots: {
			description: c,
			errorMessage: l
		} }],
		[Or, i ? null : {
			isInvalid: m,
			validationDetails: h,
			validationErrors: g
		}]
	] }, _.children));
});
function si(t, n) {
	let { validationBehavior: r } = e(Hr) || {}, i = t.validationBehavior ?? r ?? "native", a = (0, W.useContext)(ii), o = F((0, W.useMemo)(() => ce(n, t.inputRef === void 0 ? null : t.inputRef), [n, t.inputRef])), s = {
		..._(t),
		children: typeof t.children == "function" || t.children,
		value: t.value,
		validationBehavior: i
	};
	return [a ? ti(s, a, o) : $r(s, ei(t), o), o];
}
var ci = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	let { labelProps: n, inputProps: r, isSelected: i, isDisabled: a, isReadOnly: o, isPressed: s, isInvalid: c, inputRef: l, defaultClassName: u, isIndeterminate: d, isRequired: f } = (0, W.useContext)(ai), { isFocused: p, isFocusVisible: m, focusProps: h } = le(), g = a || o, { hoverProps: _, isHovered: v } = O({
		...e,
		isDisabled: g
	}), y = V({
		...e,
		defaultClassName: u,
		values: {
			isSelected: i,
			isIndeterminate: d || !1,
			isPressed: s,
			isHovered: v,
			isFocused: p,
			isFocusVisible: m,
			isDisabled: a,
			isReadOnly: o,
			isInvalid: c,
			isRequired: f || !1
		}
	}), b = C(e, { global: !0 });
	return delete b.id, delete b.onClick, /*#__PURE__*/ W.createElement(E.label, {
		...H(b, n, _, y),
		ref: t,
		slot: e.slot || void 0,
		"data-selected": i || void 0,
		"data-indeterminate": d || void 0,
		"data-pressed": s || void 0,
		"data-hovered": v || void 0,
		"data-focused": p || void 0,
		"data-focus-visible": m || void 0,
		"data-disabled": a || void 0,
		"data-readonly": o || void 0,
		"data-invalid": c || void 0,
		"data-required": f || void 0
	}, /*#__PURE__*/ W.createElement(Er, { elementType: "span" }, /*#__PURE__*/ W.createElement("input", {
		...H(r, h),
		ref: l
	})), y.children);
});
// ../../packages/ui/src/primitives/Form/Form.tsx
function li(e) {
	return /* @__PURE__ */ (0, G.jsx)(Bn, { ...e });
}
function ui(e) {
	return /* @__PURE__ */ (0, G.jsx)(kr, { ...e });
}
function di(e) {
	return /* @__PURE__ */ (0, G.jsx)(Dr, {
		slot: "description",
		className: "field-description",
		...e
	});
}
// ../../packages/ui/src/primitives/Checkbox/Checkbox.tsx
function fi({ children: e, description: t, errorMessage: n, ...r }) {
	return /* @__PURE__ */ (0, G.jsxs)(oi, {
		...r,
		children: [
			/* @__PURE__ */ (0, G.jsx)(ci, { children: ({ isIndeterminate: t }) => /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [/* @__PURE__ */ (0, G.jsx)("div", {
				className: "indicator",
				children: /* @__PURE__ */ (0, G.jsx)("svg", {
					viewBox: "0 0 18 18",
					"aria-hidden": "true",
					children: t ? /* @__PURE__ */ (0, G.jsx)("rect", {
						x: 1,
						y: 7.5,
						width: 16,
						height: 3
					}) : /* @__PURE__ */ (0, G.jsx)("polyline", { points: "2 9 7 14 16 4" })
				}, t ? "indeterminate" : "check")
			}), e] }) }),
			t && /* @__PURE__ */ (0, G.jsx)(di, { children: t }),
			/* @__PURE__ */ (0, G.jsx)(ui, { children: n })
		]
	});
}
// ../../node_modules/react-aria-components/dist/private/Group.mjs
var pi = /*#__PURE__*/ (0, W.createContext)({}), mi = /*#__PURE__*/ (0, W.createContext)({}), hi = (e) => {
	let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, ...i } = e;
	return i;
}, gi = /*#__PURE__*/ Ht(function(e, t) {
	[e, t] = d(e, t, mi);
	let { hoverProps: n, isHovered: r } = O({
		...e,
		isDisabled: e.disabled
	}), { isFocused: i, isFocusVisible: a, focusProps: o } = le({
		isTextInput: !0,
		autoFocus: e.autoFocus
	}), s = !!e["aria-invalid"] && e["aria-invalid"] !== "false", c = V({
		...e,
		values: {
			isHovered: r,
			isFocused: i,
			isFocusVisible: a,
			isDisabled: e.disabled || !1,
			isInvalid: s
		},
		defaultClassName: "react-aria-Input"
	});
	return /*#__PURE__*/ W.createElement(E.input, {
		...H(hi(e), o, n),
		...c,
		ref: t,
		"data-focused": i || void 0,
		"data-disabled": e.disabled || void 0,
		"data-hovered": r || void 0,
		"data-focus-visible": a || void 0,
		"data-invalid": s || void 0
	});
});
// ../../node_modules/react-aria/dist/private/textfield/useTextField.mjs
function _i(e, t) {
	let { inputElementType: n = "input", isDisabled: r = !1, isRequired: a = !1, isReadOnly: o = !1, type: s = "text", validationBehavior: c = "aria" } = e, [l, u] = Cr(e.value, e.defaultValue || "", e.onChange), { focusableProps: d } = ee(e, t), f = Ir({
		...e,
		value: l
	}), { isInvalid: p, validationErrors: m, validationDetails: h } = f.displayValidation, { labelProps: g, fieldProps: _, descriptionProps: v, errorMessageProps: y } = Wr({
		...e,
		isInvalid: p,
		errorMessage: e.errorMessage || m
	}), b = C(e, { labelable: !0 }), x = {
		type: s,
		pattern: e.pattern
	}, [S] = (0, W.useState)(l);
	return Gr(t, e.defaultValue ?? S, u), Kr(e, f, t), {
		labelProps: g,
		inputProps: H(b, n === "input" ? x : void 0, {
			disabled: r,
			readOnly: o,
			required: a && c === "native",
			"aria-required": a && c === "aria" || void 0,
			"aria-invalid": p || void 0,
			"aria-errormessage": e["aria-errormessage"],
			"aria-activedescendant": e["aria-activedescendant"],
			"aria-autocomplete": e["aria-autocomplete"],
			"aria-haspopup": e["aria-haspopup"],
			"aria-controls": e["aria-controls"],
			value: l,
			onChange: (e) => u(i(e).value),
			autoComplete: e.autoComplete,
			autoCapitalize: e.autoCapitalize,
			maxLength: e.maxLength,
			minLength: e.minLength,
			name: e.name,
			form: e.form,
			placeholder: e.placeholder,
			inputMode: e.inputMode,
			autoCorrect: e.autoCorrect,
			spellCheck: e.spellCheck,
			enterKeyHint: e.enterKeyHint,
			onCopy: e.onCopy,
			onCut: e.onCut,
			onPaste: e.onPaste,
			onCompositionEnd: e.onCompositionEnd,
			onCompositionStart: e.onCompositionStart,
			onCompositionUpdate: e.onCompositionUpdate,
			onSelect: e.onSelect,
			onBeforeInput: e.onBeforeInput,
			onInput: e.onInput,
			...d,
			..._
		}),
		descriptionProps: v,
		errorMessageProps: y,
		isInvalid: p,
		validationErrors: m,
		validationDetails: h
	};
}
// ../../node_modules/react-aria-components/dist/private/DragAndDrop.mjs
var vi = /*#__PURE__*/ (0, W.createContext)({}), yi = /*#__PURE__*/ (0, W.createContext)(null), bi = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	let { render: n } = (0, W.useContext)(yi);
	return /*#__PURE__*/ W.createElement(W.Fragment, null, n(e, t));
});
function xi(e, t) {
	let n = e?.renderDropIndicator, r = e?.isVirtualDragging?.(), i = (0, W.useCallback)((e) => {
		if (r || t?.isDropTarget(e)) return n ? n(e) : /*#__PURE__*/ W.createElement(bi, { target: e });
	}, [
		t?.target,
		r,
		n
	]);
	return e?.useDropIndicator ? i : void 0;
}
function Si(e, t, n) {
	let r = e.focusedKey, i = null;
	if (t?.isVirtualDragging?.() && n?.target?.type === "item" && (i = n.target.key, n.target.dropPosition === "after")) {
		let e = n.collection.getKeyAfter(i), t = null;
		if (e != null) {
			let r = n.collection.getItem(i)?.level ?? 0;
			for (; e != null;) {
				let i = n.collection.getItem(e);
				if (!i) break;
				if (i.type !== "item") e = n.collection.getKeyAfter(e);
				else {
					if ((i.level ?? 0) <= r) break;
					t = e, e = n.collection.getKeyAfter(e);
				}
			}
		}
		i = e ?? t ?? i;
	}
	return (0, W.useMemo)(() => new Set([r, i].filter((e) => e != null)), [r, i]);
}
// ../../node_modules/react-aria/dist/private/utils/constants.mjs
var Ci = "react-aria-clear-focus", wi = "react-aria-focus";
// ../../node_modules/react-aria/dist/private/focus/virtualFocus.mjs
function Ti(e) {
	let n = Oi(t(e));
	n !== e && (n && Ei(n, e), e && Di(e, n));
}
function Ei(e, t) {
	e.dispatchEvent(new FocusEvent("blur", { relatedTarget: t })), e.dispatchEvent(new FocusEvent("focusout", {
		bubbles: !0,
		relatedTarget: t
	}));
}
function Di(e, t) {
	e.dispatchEvent(new FocusEvent("focus", { relatedTarget: t })), e.dispatchEvent(new FocusEvent("focusin", {
		bubbles: !0,
		relatedTarget: t
	}));
}
function Oi(e) {
	let t = a(e), n = t?.getAttribute("aria-activedescendant");
	return n && e.getElementById(n) || t;
}
// ../../node_modules/react-aria/dist/private/utils/keyboard.mjs
var ki = 100, Ai = 600, q = {
	isOpen: !1,
	screenWidth: 0,
	screenHeight: 0,
	screenAngle: 0,
	screenTimeout: 0,
	startTimeStamp: 0,
	endTimeStamp: 0,
	resizeTimeStamp: 0,
	resizeTimeout: 0
}, ji = /* @__PURE__ */ new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
function Mi() {
	let e = Number(window.visualViewport?.width ?? window.innerWidth), t = Number(window.visualViewport?.height ?? window.innerHeight), n = Number(window.visualViewport?.scale ?? 1);
	return {
		width: e * n,
		height: t * n,
		angle: window.screen.orientation?.angle ?? 0
	};
}
function Ni(e) {
	q.resizeTimeStamp <= e.timeStamp + 50 && (q.resizeTimeStamp = e.timeStamp + 150, window.clearTimeout(q.resizeTimeout), q.resizeTimeout = window.setTimeout(Pi, 150));
}
function Pi() {
	let e = N("viewport");
	if (n() && e?.includes("overlays-content")) return;
	let t = performance.now(), r = Mi(), i = t - q.startTimeStamp, o = q.screenHeight - r.height, s = q.screenAngle - r.angle;
	Math.abs(s) % 180 && q.screenWidth - r.height < ki && (q.screenWidth = r.width, q.screenHeight = r.height, q.screenAngle = r.angle, o = 0), i > Ai && (window.clearTimeout(q.screenTimeout), q.screenTimeout = window.setTimeout(() => {
		let e = Ri(document.hasFocus() ? a() : null), t = Mi();
		Math.abs(q.screenAngle - t.angle) % 180 || q.isOpen && e || (q.screenWidth = t.width, q.screenHeight = t.height, q.screenAngle = t.angle, q.isOpen = !1);
	}, Ai)), i <= Ai && o >= ki && (q.endTimeStamp = t), q.isOpen = o >= ki;
}
function Fi() {
	let e = Mi(), t = q.screenAngle - e.angle;
	if (Math.abs(t) % 180 && !q.isOpen) {
		let e = q.screenWidth;
		q.screenWidth = q.screenHeight, q.screenHeight = e;
	}
	q.isOpen || (q.screenAngle = e.angle);
}
function Ii(e) {
	let t = Ri(i(e)), n = performance.now(), r = Mi(), a = q.screenHeight - r.height;
	a < ki && t && (q.screenWidth = r.width, q.screenHeight = r.height, q.screenAngle = r.angle, q.startTimeStamp = n), t && window.clearTimeout(q.screenTimeout), a >= ki && t && (q.endTimeStamp = n);
}
function Li() {
	let e = Mi();
	p(window.visualViewport, "resize", f() ? Pi : Ni), p(window.screen.orientation, "change", Fi), p(window, "focus", Ii, {
		capture: !0,
		passive: !0
	}), q.screenWidth = e.width, q.screenHeight = e.height, q.screenAngle = e.angle;
}
typeof document < "u" && (document.readyState === "loading" ? p(document, "DOMContentLoaded", Li) : Li());
function Ri(e) {
	if (!(e instanceof Element) || !y(e)) return !1;
	let t = e instanceof HTMLTextAreaElement, n = e instanceof HTMLElement && e.isContentEditable, r = e instanceof HTMLInputElement && !ji.has(e.type);
	return t || n || r;
}
function zi(e) {
	return Se() ? e.metaKey : e.ctrlKey;
}
// ../../node_modules/react-aria-components/dist/private/Autocomplete.mjs
var Bi = /*#__PURE__*/ (0, W.createContext)(null), Vi = /*#__PURE__*/ (0, W.createContext)(null), Hi = /*#__PURE__*/ (0, W.createContext)(null);
function Ui(e) {
	let t = (0, W.useRef)({});
	return /*#__PURE__*/ W.createElement(Hi.Provider, { value: t }, e.children);
}
// ../../node_modules/react-aria-components/dist/private/SelectionIndicator.mjs
var Wi = /*#__PURE__*/ (0, W.createContext)({ isSelected: !1 }), Gi = /*#__PURE__*/ (0, W.createContext)({});
(class extends kt {
	static {
		this.type = "separator";
	}
	filter(e, t) {
		let n = t.getItem(this.prevKey);
		if (n && n.type !== "separator") {
			let n = this.clone();
			return t.addDescendants(n, e), n;
		}
		return null;
	}
});
// ../../node_modules/react-aria/dist/private/utils/shadowdom/ShadowTreeWalker.mjs
var Ki = class {
	constructor(e, t, n, r) {
		this._walkerStack = [], this._currentSetFor = /* @__PURE__ */ new Set(), this._acceptNode = (e) => {
			if (e.nodeType === Node.ELEMENT_NODE) {
				let t = e.shadowRoot;
				if (t) {
					let e = this._doc.createTreeWalker(t, this.whatToShow, { acceptNode: this._acceptNode });
					return this._walkerStack.unshift(e), NodeFilter.FILTER_ACCEPT;
				}
				if (typeof this.filter == "function") return this.filter(e);
				if (this.filter?.acceptNode) return this.filter.acceptNode(e);
				if (this.filter === null) return NodeFilter.FILTER_ACCEPT;
			}
			return NodeFilter.FILTER_SKIP;
		}, this._doc = e, this.root = t, this.filter = r ?? null, this.whatToShow = n ?? NodeFilter.SHOW_ALL, this._currentNode = t, this._walkerStack.unshift(e.createTreeWalker(t, n, this._acceptNode));
		let i = t.shadowRoot;
		if (i) {
			let e = this._doc.createTreeWalker(i, this.whatToShow, { acceptNode: this._acceptNode });
			this._walkerStack.unshift(e);
		}
	}
	get currentNode() {
		return this._currentNode;
	}
	set currentNode(e) {
		if (!U(this.root, e)) throw Error("Cannot set currentNode to a node that is not contained by the root node.");
		let t = [], n = e, r = e;
		for (this._currentNode = e; n && n !== this.root;) if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			let e = n, i = this._doc.createTreeWalker(e, this.whatToShow, { acceptNode: this._acceptNode });
			t.push(i), i.currentNode = r, this._currentSetFor.add(i), n = r = e.host;
		} else n = n.parentNode;
		let i = this._doc.createTreeWalker(this.root, this.whatToShow, { acceptNode: this._acceptNode });
		t.push(i), i.currentNode = r, this._currentSetFor.add(i), this._walkerStack = t;
	}
	get doc() {
		return this._doc;
	}
	firstChild() {
		let e = this.currentNode, t = this.nextNode();
		return U(e, t) ? (t && (this.currentNode = t), t) : (this.currentNode = e, null);
	}
	lastChild() {
		let e = this._walkerStack[0].lastChild();
		return e && (this.currentNode = e), e;
	}
	nextNode() {
		let e = this._walkerStack[0].nextNode();
		if (e) {
			if (e.shadowRoot) {
				let t;
				if (typeof this.filter == "function" ? t = this.filter(e) : this.filter?.acceptNode && (t = this.filter.acceptNode(e)), t === NodeFilter.FILTER_ACCEPT) return this.currentNode = e, e;
				let n = this.nextNode();
				return n && (this.currentNode = n), n;
			}
			return e && (this.currentNode = e), e;
		}
		if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let e = this.nextNode();
			return e && (this.currentNode = e), e;
		}
		return null;
	}
	previousNode() {
		let e = this._walkerStack[0];
		if (e.currentNode === e.root) {
			if (this._currentSetFor.has(e)) {
				if (this._currentSetFor.delete(e), this._walkerStack.length > 1) {
					this._walkerStack.shift();
					let e = this.previousNode();
					return e && (this.currentNode = e), e;
				}
				return null;
			}
			return null;
		}
		let t = e.previousNode();
		if (t) {
			if (t.shadowRoot) {
				let e;
				if (typeof this.filter == "function" ? e = this.filter(t) : this.filter?.acceptNode && (e = this.filter.acceptNode(t)), e === NodeFilter.FILTER_ACCEPT) return t && (this.currentNode = t), t;
				let n = this.lastChild();
				return n && (this.currentNode = n), n;
			}
			return t && (this.currentNode = t), t;
		}
		if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let e = this.previousNode();
			return e && (this.currentNode = e), e;
		}
		return null;
	}
	nextSibling() {
		return null;
	}
	previousSibling() {
		return null;
	}
	parentNode() {
		return null;
	}
};
function qi(e, t, n, r) {
	return h() ? new Ki(e, t, n, r) : e.createTreeWalker(t, n, r);
}
// ../../node_modules/react-aria/dist/private/focus/FocusScope.mjs
var Ji = /*#__PURE__*/ W.createContext(null), Yi = "react-aria-focus-scope-restore", J = null;
function Xi(e) {
	let { children: n, contain: r, restoreFocus: i, autoFocus: o } = e, s = (0, W.useRef)(null), c = (0, W.useRef)(null), l = (0, W.useRef)([]), { parentNode: u } = (0, W.useContext)(Ji) || {}, d = (0, W.useMemo)(() => new va({ scopeRef: l }), [l]);
	B(() => {
		let e = u || X.root;
		if (X.getTreeNode(e.scopeRef) && J && !oa(J, e.scopeRef)) {
			let t = X.getTreeNode(J);
			t && (e = t);
		}
		e.addChild(d), X.addNode(d);
	}, [d, u]), B(() => {
		let e = X.getTreeNode(l);
		e && (e.contain = !!r);
	}, [r]), B(() => {
		let e = s.current?.nextSibling, t = [], n = (e) => e.stopPropagation();
		for (; e && e !== c.current;) t.push(e), e.addEventListener(Yi, n), e = e.nextSibling;
		return l.current = t, () => {
			for (let e of t) e.removeEventListener(Yi, n);
		};
	}, [n]), da(l, i, r), na(l, r), pa(l, i, r), ua(l, o), (0, W.useEffect)(() => {
		let e = a(t(l.current ? l.current[0] : void 0)), n = null;
		if (ia(e, l.current)) {
			for (let t of X.traverse()) t.scopeRef && ia(e, t.scopeRef.current) && (n = t);
			n === X.getTreeNode(l) && (J = n.scopeRef);
		}
	}, [l]), B(() => () => {
		let e = X.getTreeNode(l)?.parent?.scopeRef ?? null;
		l !== J && !oa(l, J) || e && !X.getTreeNode(e) || (J = e), X.removeTreeNode(l);
	}, [l]);
	let f = (0, W.useMemo)(() => Zi(l), []), p = (0, W.useMemo)(() => ({
		focusManager: f,
		parentNode: d
	}), [d, f]);
	return /*#__PURE__*/ W.createElement(Ji.Provider, { value: p }, /*#__PURE__*/ W.createElement("span", {
		"data-focus-scope-start": !0,
		hidden: !0,
		ref: s
	}), n, /*#__PURE__*/ W.createElement("span", {
		"data-focus-scope-end": !0,
		hidden: !0,
		ref: c
	}));
}
function Zi(e) {
	return {
		focusNext(n = {}) {
			let r = e.current, { from: i, tabbable: o, wrap: s, accept: c } = n, l = i || a(t(r[0] ?? void 0)), u = r[0].previousElementSibling, d = Y(Qi(r), {
				tabbable: o,
				accept: c
			}, r);
			d.currentNode = ia(l, r) ? l : u;
			let f = d.nextNode();
			return !f && s && (d.currentNode = u, f = d.nextNode()), f && sa(f, !0), f;
		},
		focusPrevious(n = {}) {
			let r = e.current, { from: i, tabbable: o, wrap: s, accept: c } = n, l = i || a(t(r[0] ?? void 0)), u = r[r.length - 1].nextElementSibling, d = Y(Qi(r), {
				tabbable: o,
				accept: c
			}, r);
			d.currentNode = ia(l, r) ? l : u;
			let f = d.previousNode();
			return !f && s && (d.currentNode = u, f = d.previousNode()), f && sa(f, !0), f;
		},
		focusFirst(t = {}) {
			let n = e.current, { tabbable: r, accept: i } = t, a = Y(Qi(n), {
				tabbable: r,
				accept: i
			}, n);
			a.currentNode = n[0].previousElementSibling;
			let o = a.nextNode();
			return o && sa(o, !0), o;
		},
		focusLast(t = {}) {
			let n = e.current, { tabbable: r, accept: i } = t, a = Y(Qi(n), {
				tabbable: r,
				accept: i
			}, n);
			a.currentNode = n[n.length - 1].nextElementSibling;
			let o = a.previousNode();
			return o && sa(o, !0), o;
		}
	};
}
function Qi(e) {
	return e[0].parentElement;
}
function $i(e) {
	let t = X.getTreeNode(J);
	for (; t && t.scopeRef !== e;) {
		if (t.contain) return !1;
		t = t.parent;
	}
	return !0;
}
function ea(e) {
	if (!e.form) return Array.from(t(e).querySelectorAll(`input[type="radio"][name="${CSS.escape(e.name)}"]`)).filter((e) => !e.form);
	let n = e.form.elements.namedItem(e.name), r = z(e);
	return n instanceof r.RadioNodeList ? Array.from(n).filter((e) => e instanceof r.HTMLInputElement) : n instanceof r.HTMLInputElement ? [n] : [];
}
function ta(e) {
	if (e.checked) return !0;
	let t = ea(e);
	return t.length > 0 && !t.some((e) => e.checked);
}
function na(e, r) {
	let o = (0, W.useRef)(void 0), s = (0, W.useRef)(void 0);
	B(() => {
		let c = e.current;
		if (!r) {
			s.current &&= (cancelAnimationFrame(s.current), void 0);
			return;
		}
		let u = t(c ? c[0] : void 0), d = (t) => {
			if (t.key !== "Tab" || t.altKey || t.ctrlKey || t.metaKey || !$i(e) || t.isComposing) return;
			let n = a(u), r = e.current;
			if (!r || !ia(n, r)) return;
			let i = Y(Qi(r), { tabbable: !0 }, r);
			if (!n) return;
			i.currentNode = n;
			let o = t.shiftKey ? i.previousNode() : i.nextNode();
			o ||= (i.currentNode = t.shiftKey ? r[r.length - 1].nextElementSibling : r[0].previousElementSibling, t.shiftKey ? i.previousNode() : i.nextNode()), t.preventDefault(), o && (sa(o, !0), o instanceof z(o).HTMLInputElement && o.select());
		}, f = (t) => {
			(!J || oa(J, e)) && ia(i(t), e.current) ? (J = e, o.current = i(t)) : $i(e) && !aa(i(t), e) ? o.current ? sa(o.current) : J && J.current && la(J.current) : $i(e) && (o.current = i(t));
		}, p = (t) => {
			s.current && cancelAnimationFrame(s.current), s.current = requestAnimationFrame(() => {
				let r = te(), s = (r === "virtual" || r === null) && n() && l(), c = a(u);
				if (!s && c && $i(e) && !aa(c, e)) {
					J = e;
					let n = i(t);
					n && n.isConnected ? (o.current = n, sa(o.current)) : J.current && la(J.current);
				}
			});
		};
		return u.addEventListener("keydown", d, !1), u.addEventListener("focusin", f, !1), c?.forEach((e) => e.addEventListener("focusin", f, !1)), c?.forEach((e) => e.addEventListener("focusout", p, !1)), () => {
			u.removeEventListener("keydown", d, !1), u.removeEventListener("focusin", f, !1), c?.forEach((e) => e.removeEventListener("focusin", f, !1)), c?.forEach((e) => e.removeEventListener("focusout", p, !1));
		};
	}, [e, r]), B(() => () => {
		s.current && cancelAnimationFrame(s.current);
	}, [s]);
}
function ra(e) {
	return aa(e);
}
function ia(e, t) {
	return !e || !t ? !1 : t.some((t) => U(t, e));
}
function aa(e, t = null) {
	if (e instanceof Element && e.closest("[data-react-aria-top-layer]")) return !0;
	for (let { scopeRef: n } of X.traverse(X.getTreeNode(t))) if (n && ia(e, n.current)) return !0;
	return !1;
}
function oa(e, t) {
	let n = X.getTreeNode(t)?.parent;
	for (; n;) {
		if (n.scopeRef === e) return !0;
		n = n.parent;
	}
	return !1;
}
function sa(e, t = !1) {
	if (e != null && !t) try {
		L(e);
	} catch {}
	else if (e != null) try {
		e.focus();
	} catch {}
}
function ca(e, t = !0) {
	let n = e[0].previousElementSibling, r = Qi(e), i = Y(r, { tabbable: t }, e);
	i.currentNode = n;
	let a = i.nextNode();
	return t && !a && (r = Qi(e), i = Y(r, { tabbable: !1 }, e), i.currentNode = n, a = i.nextNode()), a;
}
function la(e, t = !0) {
	sa(ca(e, t));
}
function ua(e, n) {
	let r = W.useRef(n);
	(0, W.useEffect)(() => {
		if (r.current) {
			J = e;
			let n = t(e.current ? e.current[0] : void 0);
			!ia(a(n), J.current) && e.current && la(e.current);
		}
		r.current = !1;
	}, [e]);
}
function da(e, n, r) {
	B(() => {
		if (n || r) return;
		let a = e.current, o = t(a ? a[0] : void 0), s = (t) => {
			let n = i(t);
			ia(n, e.current) ? J = e : ra(n) || (J = null);
		};
		return o.addEventListener("focusin", s, !1), a?.forEach((e) => e.addEventListener("focusin", s, !1)), () => {
			o.removeEventListener("focusin", s, !1), a?.forEach((e) => e.removeEventListener("focusin", s, !1));
		};
	}, [
		e,
		n,
		r
	]);
}
function fa(e) {
	let t = X.getTreeNode(J);
	for (; t && t.scopeRef !== e;) {
		if (t.nodeToRestore) return !1;
		t = t.parent;
	}
	return t?.scopeRef === e;
}
function pa(e, n, r) {
	let i = (0, W.useRef)(typeof document < "u" ? a(t(e.current ? e.current[0] : void 0)) : null);
	B(() => {
		let i = e.current, o = t(i ? i[0] : void 0);
		if (!n || r) return;
		let s = () => {
			(!J || oa(J, e)) && ia(a(o), e.current) && (J = e);
		};
		return o.addEventListener("focusin", s, !1), i?.forEach((e) => e.addEventListener("focusin", s, !1)), () => {
			o.removeEventListener("focusin", s, !1), i?.forEach((e) => e.removeEventListener("focusin", s, !1));
		};
	}, [e, r]), B(() => {
		let i = t(e.current ? e.current[0] : void 0);
		if (!n) return;
		let a = (t) => {
			if (t.key !== "Tab" || t.altKey || t.ctrlKey || t.metaKey || !$i(e) || t.isComposing) return;
			let n = i.activeElement;
			if (!aa(n, e) || !fa(e)) return;
			let r = X.getTreeNode(e);
			if (!r) return;
			let a = r.nodeToRestore, o = Y(i.body, { tabbable: !0 });
			o.currentNode = n;
			let s = t.shiftKey ? o.previousNode() : o.nextNode();
			if (a && a.isConnected && a !== i.body || (a = void 0, r.nodeToRestore = void 0), (!s || !aa(s, e)) && a) {
				o.currentNode = a;
				do
					s = t.shiftKey ? o.previousNode() : o.nextNode();
				while (aa(s, e));
				t.preventDefault(), t.stopPropagation(), s ? sa(s, !0) : ra(a) ? sa(a, !0) : n.blur();
			}
		};
		return r || i.addEventListener("keydown", a, !0), () => {
			r || i.removeEventListener("keydown", a, !0);
		};
	}, [
		e,
		n,
		r
	]), B(() => {
		let r = t(e.current ? e.current[0] : void 0);
		if (!n) return;
		let o = X.getTreeNode(e);
		if (o) return o.nodeToRestore = i.current ?? void 0, () => {
			let t = X.getTreeNode(e);
			if (!t) return;
			let i = t.nodeToRestore, o = a(r);
			if (n && i && (o && aa(o, e) || o === r.body && fa(e))) {
				let t = X.clone();
				requestAnimationFrame(() => {
					if (r.activeElement === r.body) {
						let n = t.getTreeNode(e);
						for (; n;) {
							if (n.nodeToRestore && n.nodeToRestore.isConnected) {
								ma(n.nodeToRestore);
								return;
							}
							n = n.parent;
						}
						for (n = t.getTreeNode(e); n;) {
							if (n.scopeRef && n.scopeRef.current && X.getTreeNode(n.scopeRef)) {
								let e = ca(n.scopeRef.current, !0);
								if (e) {
									ma(e);
									return;
								}
							}
							n = n.parent;
						}
					}
				});
			}
		};
	}, [e, n]);
}
function ma(e) {
	e.dispatchEvent(new CustomEvent(Yi, {
		bubbles: !0,
		cancelable: !0
	})) && sa(e);
}
function Y(e, n, i) {
	let a = n?.tabbable ? r : y, o = e?.nodeType === Node.ELEMENT_NODE ? e : null, s = t(o), c = qi(s, e || s, NodeFilter.SHOW_ELEMENT, { acceptNode(e) {
		return U(n?.from, e) || n?.tabbable && e.tagName === "INPUT" && e.getAttribute("type") === "radio" && (!ta(e) || c.currentNode.tagName === "INPUT" && c.currentNode.type === "radio" && c.currentNode.name === e.name) ? NodeFilter.FILTER_REJECT : a(e) && (!i || ia(e, i)) && (!n?.accept || n.accept(e)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	return n?.from && (c.currentNode = n.from), c;
}
function ha(e, n = {}) {
	return {
		focusNext(r = {}) {
			let i = e.current;
			if (!i) return null;
			let { from: o, tabbable: s = n.tabbable, wrap: c = n.wrap, accept: l = n.accept } = r, u = o || a(t(i)), d = Y(i, {
				tabbable: s,
				accept: l
			});
			U(i, u) && (d.currentNode = u);
			let f = d.nextNode();
			return !f && c && (d.currentNode = i, f = d.nextNode()), f && sa(f, !0), f;
		},
		focusPrevious(r = n) {
			let i = e.current;
			if (!i) return null;
			let { from: o, tabbable: s = n.tabbable, wrap: c = n.wrap, accept: l = n.accept } = r, u = o || a(t(i)), d = Y(i, {
				tabbable: s,
				accept: l
			});
			if (U(i, u)) d.currentNode = u;
			else {
				let e = ga(d);
				return e && sa(e, !0), e ?? null;
			}
			let f = d.previousNode();
			if (!f && c) {
				d.currentNode = i;
				let e = ga(d);
				if (!e) return null;
				f = e;
			}
			return f && sa(f, !0), f ?? null;
		},
		focusFirst(t = n) {
			let r = e.current;
			if (!r) return null;
			let { tabbable: i = n.tabbable, accept: a = n.accept } = t, o = Y(r, {
				tabbable: i,
				accept: a
			}).nextNode();
			return o && sa(o, !0), o;
		},
		focusLast(t = n) {
			let r = e.current;
			if (!r) return null;
			let { tabbable: i = n.tabbable, accept: a = n.accept } = t, o = ga(Y(r, {
				tabbable: i,
				accept: a
			}));
			return o && sa(o, !0), o ?? null;
		}
	};
}
function ga(e) {
	let t, n;
	do
		n = e.lastChild(), n && (t = n);
	while (n);
	return t;
}
var _a = class e {
	constructor() {
		this.fastMap = /* @__PURE__ */ new Map(), this.root = new va({ scopeRef: null }), this.fastMap.set(null, this.root);
	}
	get size() {
		return this.fastMap.size;
	}
	getTreeNode(e) {
		return this.fastMap.get(e);
	}
	addTreeNode(e, t, n) {
		let r = this.fastMap.get(t ?? null);
		if (!r) return;
		let i = new va({ scopeRef: e });
		r.addChild(i), i.parent = r, this.fastMap.set(e, i), n && (i.nodeToRestore = n);
	}
	addNode(e) {
		this.fastMap.set(e.scopeRef, e);
	}
	removeTreeNode(e) {
		if (e === null) return;
		let t = this.fastMap.get(e);
		if (!t) return;
		let n = t.parent;
		for (let e of this.traverse()) e !== t && t.nodeToRestore && e.nodeToRestore && t.scopeRef && t.scopeRef.current && ia(e.nodeToRestore, t.scopeRef.current) && (e.nodeToRestore = t.nodeToRestore);
		let r = t.children;
		n && (n.removeChild(t), r.size > 0 && r.forEach((e) => n && n.addChild(e))), this.fastMap.delete(t.scopeRef);
	}
	*traverse(e = this.root) {
		if (e.scopeRef != null && (yield e), e.children.size > 0) for (let t of e.children) yield* this.traverse(t);
	}
	clone() {
		let t = new e();
		for (let e of this.traverse()) t.addTreeNode(e.scopeRef, e.parent?.scopeRef ?? null, e.nodeToRestore);
		return t;
	}
}, va = class {
	constructor(e) {
		this.children = /* @__PURE__ */ new Set(), this.contain = !1, this.scopeRef = e.scopeRef;
	}
	addChild(e) {
		this.children.add(e), e.parent = this;
	}
	removeChild(e) {
		this.children.delete(e), e.parent = void 0;
	}
}, X = new _a();
// ../../node_modules/react-aria/dist/private/selection/utils.mjs
function ya(e) {
	return S() ? e.altKey : e.ctrlKey;
}
function ba(e, t) {
	let n = `[data-key="${CSS.escape(String(t))}"]`, r = e.current?.dataset.collection;
	return r && (n = `[data-collection="${CSS.escape(r)}"]${n}`), e.current?.querySelector(n);
}
var xa = /* @__PURE__ */ new WeakMap();
function Sa(e) {
	let t = R();
	return xa.set(e, t), t;
}
function Ca(e) {
	return xa.get(e);
}
// ../../node_modules/react-aria/dist/private/selection/useTypeSelect.mjs
var wa = 1e3;
function Ta(e) {
	let { keyboardDelegate: t, selectionManager: n, onTypeSelect: r } = e, a = (0, W.useRef)({
		search: "",
		timeout: void 0
	});
	return (0, W.useEffect)(() => {
		let e = a.current.timeout;
		return () => {
			clearTimeout(e);
		};
	}, [a]), { typeSelectProps: {
		onKeyDownCapture: t.getKeyForSearch ? (e) => {
			if (a.current.search.length > 0 && e.key === " ") {
				if (e.preventDefault(), (!("continuePropagation" in e) || "continuePropagation" in e && !e.isPropagationStopped()) && e.stopPropagation(), a.current.search += " ", t.getKeyForSearch != null) {
					let e = t.getKeyForSearch(a.current.search, n.focusedKey);
					e ??= t.getKeyForSearch(a.current.search), e != null && (n.setFocusedKey(e), r && r(e));
				}
				clearTimeout(a.current.timeout), a.current.timeout = setTimeout(() => {
					a.current.search = "";
				}, wa);
			}
		} : void 0,
		onKeyDown: t.getKeyForSearch ? (e) => {
			let o = Ea(e.key);
			if (!(!o || e.ctrlKey || e.metaKey || e.altKey || !U(e.currentTarget, i(e)) || a.current.search.length === 0 && o === " ")) {
				if (a.current.search += o, t.getKeyForSearch != null) {
					let i = t.getKeyForSearch(a.current.search, n.focusedKey);
					if (i ??= t.getKeyForSearch(a.current.search), i != null) n.setFocusedKey(i), r && r(i), e.preventDefault(), "continuePropagation" in e || e.stopPropagation();
					else {
						a.current.search = "", clearTimeout(a.current.timeout), a.current.timeout = void 0;
						return;
					}
				}
				clearTimeout(a.current.timeout), a.current.timeout = setTimeout(() => {
					a.current.search = "";
				}, wa);
			}
		} : void 0
	} };
}
function Ea(e) {
	return e.length === 1 || !/^[A-Z]/i.test(e) ? e : "";
}
// ../../node_modules/react-aria/dist/private/utils/useUpdateLayoutEffect.mjs
function Da(e, t) {
	let n = (0, W.useRef)(!0), r = (0, W.useRef)(null);
	B(() => (n.current = !0, () => {
		n.current = !1;
	}), []), B(() => {
		n.current ? n.current = !1 : (!r.current || t.some((e, t) => !Object.is(e, r[t]))) && e(), r.current = t;
	}, t);
}
// ../../node_modules/react-aria/dist/private/selection/useSelectableCollection.mjs
function Oa(e) {
	let { selectionManager: t, keyboardDelegate: n, ref: o, autoFocus: s = !1, shouldFocusWrap: c = !1, disallowEmptySelection: l = !1, disallowSelectAll: u = !1, escapeKeyBehavior: d = "clearSelection", selectOnFocus: f = t.selectionBehavior === "replace", disallowTypeAhead: p = !1, shouldUseVirtualFocus: m, allowsTabNavigation: h = !1, scrollRef: _ = o, linkBehavior: v = "action", UNSTABLE_focusOnEntry: y } = e, { direction: S } = wn(), C = g(), w = (e, n, r) => {
		if (n != null) {
			if (t.isLink(n) && v === "selection" && f && !ya(e)) {
				(0, Gt.flushSync)(() => {
					t.setFocusedKey(n, r);
				});
				let i = ba(o, n), a = t.getItemProps(n);
				if (i) {
					C.open(i, e, a.href, a.routerOptions);
					return;
				}
				return !1;
			}
			if (t.setFocusedKey(n, r), t.isLink(n) && v === "override") return !1;
			if (e.shiftKey && t.selectionMode === "multiple") {
				t.extendSelection(n);
				return;
			}
			if (f && !ya(e)) {
				t.replaceSelection(n);
				return;
			}
		}
		return !1;
	}, T = (e) => {
		if (n.getKeyBelow) {
			let r = t.focusedKey == null ? n.getFirstKey?.() : n.getKeyBelow?.(t.focusedKey);
			if (r == null && c && (r = n.getFirstKey?.(t.focusedKey)), r != null) {
				w(e, r);
				return;
			}
		}
		return !1;
	}, E = (e) => {
		if (n.getKeyAbove) {
			let r = t.focusedKey == null ? n.getLastKey?.() : n.getKeyAbove?.(t.focusedKey);
			if (r == null && c && (r = n.getLastKey?.(t.focusedKey)), r != null) {
				w(e, r);
				return;
			}
		}
		return !1;
	}, D = (e) => {
		if (n.getFirstKey) {
			if (t.focusedKey === null && e.shiftKey) return !1;
			let r = n.getFirstKey(t.focusedKey, zi(e));
			if (t.setFocusedKey(r), r != null) {
				if (zi(e) && e.shiftKey && t.selectionMode === "multiple") {
					t.extendSelection(r);
					return;
				}
				if (f) {
					t.replaceSelection(r);
					return;
				}
			}
		}
		return !1;
	}, O = (e) => {
		if (n.getKeyLeftOf) {
			let r = t.focusedKey == null ? n.getFirstKey?.() : n.getKeyLeftOf?.(t.focusedKey);
			if (r == null && c && (r = S === "rtl" ? n.getFirstKey?.(t.focusedKey) : n.getLastKey?.(t.focusedKey)), r != null) {
				w(e, r, S === "rtl" ? "first" : "last");
				return;
			}
		}
		return !1;
	}, k = (e) => {
		if (n.getKeyRightOf) {
			let r = t.focusedKey == null ? n.getFirstKey?.() : n.getKeyRightOf?.(t.focusedKey);
			if (r == null && c && (r = S === "rtl" ? n.getLastKey?.(t.focusedKey) : n.getFirstKey?.(t.focusedKey)), r != null) {
				w(e, r, S === "rtl" ? "last" : "first");
				return;
			}
		}
		return !1;
	}, A = (e) => {
		if (n.getLastKey) {
			if (t.focusedKey === null && e.shiftKey) return !1;
			let r = n.getLastKey(t.focusedKey, zi(e));
			if (t.setFocusedKey(r), r != null) {
				if (zi(e) && e.shiftKey && t.selectionMode === "multiple") {
					t.extendSelection(r);
					return;
				}
				if (f) {
					t.replaceSelection(r);
					return;
				}
			}
		}
		return !1;
	}, j = (e) => {
		if (n.getKeyPageBelow && t.focusedKey != null) {
			let r = n.getKeyPageBelow(t.focusedKey);
			if (r != null) return w(e, r);
		}
		return !1;
	}, M = (e) => {
		if (n.getKeyPageAbove && t.focusedKey != null) {
			let r = n.getKeyPageAbove(t.focusedKey);
			if (r != null) return w(e, r);
		}
		return !1;
	}, N = () => {
		if (t.selectionMode === "multiple" && u !== !0) t.selectAll();
		else return !1;
	}, P = () => {
		if (d === "clearSelection" && !l && t.selectedKeys.size !== 0) t.clearSelection();
		else return !1;
	}, F = () => {
		if (!h && o.current) {
			let e = Y(o.current, { tabbable: !0 }), t, n;
			do
				n = e.lastChild(), n && (t = n);
			while (n);
			let i = a();
			t && (!b(t) || i && !r(i)) && x(t);
		}
		return {
			shouldContinuePropagation: !0,
			shouldPreventDefault: !1
		};
	}, ee = () => (!h && o.current && o.current.focus(), {
		shouldContinuePropagation: !0,
		shouldPreventDefault: !1
	}), I = (e, t) => ({
		[Se() ? e + "+Shift+Alt" : e + "+Shift+Control"]: t,
		[e + "+Shift"]: t,
		[Se() ? e + "+Alt" : e + "+Control"]: t,
		[e]: t
	}), { keyboardProps: ne } = oe({
		shortcuts: {
			...I("ArrowDown", T),
			...I("ArrowUp", E),
			...I("ArrowLeft", O),
			...I("ArrowRight", k),
			...I("PageDown", j),
			...I("PageUp", M)
		},
		allowRepeats: !0
	}), { keyboardProps: R } = oe({ shortcuts: {
		...I("Home", D),
		...I("End", A),
		"Mod+A": N,
		Escape: P,
		Tab: F,
		"Tab+Shift": ee
	} }), z = (0, W.useRef)({
		top: 0,
		left: 0
	});
	xr(_, "scroll", () => {
		z.current = {
			top: _.current?.scrollTop ?? 0,
			left: _.current?.scrollLeft ?? 0
		};
	});
	let re = (e) => {
		if (t.isFocused) {
			U(e.currentTarget, i(e)) || t.setFocused(!1);
			return;
		}
		if (!U(e.currentTarget, i(e))) return;
		let r = te();
		t.setFocused(!0);
		let a = (e) => {
			e != null && (t.setFocusedKey(e), f && !t.isSelected(e) && t.replaceSelection(e));
		};
		if (y && (r === "keyboard" || r === "virtual")) a(y === "first" ? n.getFirstKey?.() : n.getLastKey?.());
		else if (t.focusedKey == null) {
			let r = e.relatedTarget;
			r && e.currentTarget.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING ? a(t.lastSelectedKey ?? n.getLastKey?.()) : a(t.firstSelectedKey ?? n.getFirstKey?.());
		} else _.current && (_.current.scrollTop = z.current.top, _.current.scrollLeft = z.current.left);
		if (t.focusedKey != null && _.current) {
			let e = ba(o, t.focusedKey);
			e instanceof HTMLElement && (!b(e) && !m && x(e), (r === "keyboard" || y && r === "virtual") && _r(e, { containingElement: o.current }));
		}
	}, ie = (e) => {
		U(e.currentTarget, e.relatedTarget) || t.setFocused(!1);
	}, ae = (0, W.useRef)(!1);
	xr(o, wi, m ? (e) => {
		let { detail: n } = e;
		e.stopPropagation(), t.setFocused(!0), n?.focusStrategy === "first" && (ae.current = !0);
	} : void 0);
	let se = n.getFirstKey?.() ?? null;
	Da(() => {
		if (ae.current) {
			if (se == null) {
				let e = a();
				Ti(o.current), Di(e, null), t.collection.size > 0 && (ae.current = !1);
			} else t.setFocusedKey(se), ae.current = !1;
		}
	}, [se, t.collection.size]), Da(() => {
		t.collection.size > 0 && (ae.current = !1);
	}, [t.focusedKey]), xr(o, Ci, m ? (e) => {
		e.stopPropagation(), t.setFocused(!1), e.detail?.clearFocusKey && t.setFocusedKey(null);
	} : void 0);
	let ce = (0, W.useRef)(s), le = (0, W.useRef)(!1);
	(0, W.useEffect)(() => {
		if (ce.current) {
			let e = null;
			s === "first" && (e = n.getFirstKey?.() ?? null), s === "last" && (e = n.getLastKey?.() ?? null);
			let r = t.selectedKeys;
			if (r.size) {
				for (let n of r) if (t.canSelectItem(n)) {
					e = n;
					break;
				}
			}
			t.setFocused(!0), t.setFocusedKey(e), e != null && f && !r.size && t.canSelectItem(e) && t.replaceSelection(e), e == null && !m && o.current && L(o.current), t.collection.size > 0 && (ce.current = !1, le.current = !0);
		}
	});
	let B = (0, W.useRef)(t.focusedKey), ue = (0, W.useRef)(null);
	(0, W.useEffect)(() => {
		if (t.isFocused && t.focusedKey != null && (t.focusedKey !== B.current || le.current) && _.current && o.current) {
			let e = te(), n = ba(o, t.focusedKey);
			if (!(n instanceof HTMLElement)) return;
			(e === "keyboard" || le.current) && (ue.current && cancelAnimationFrame(ue.current), ue.current = requestAnimationFrame(() => {
				_.current && (hr(_.current, n), e !== "virtual" && _r(n, { containingElement: o.current }));
			}));
		}
		!m && t.isFocused && t.focusedKey == null && B.current != null && o.current && L(o.current), B.current = t.focusedKey, le.current = !1;
	}), (0, W.useEffect)(() => () => {
		ue.current && cancelAnimationFrame(ue.current);
	}, []), xr(o, "react-aria-focus-scope-restore", (e) => {
		e.preventDefault(), t.setFocused(!0);
	});
	let de = {
		...H(R, ne),
		onFocus: re,
		onBlur: ie,
		onMouseDown(e) {
			_.current === i(e) && e.preventDefault();
		}
	}, { typeSelectProps: V } = Ta({
		keyboardDelegate: n,
		selectionManager: t
	});
	p || (de = H(V, de));
	let fe;
	m || (fe = t.focusedKey == null ? 0 : -1);
	let pe = Sa(t.collection);
	return { collectionProps: H(de, {
		tabIndex: fe,
		"data-collection": pe
	}) };
}
// ../../node_modules/react-aria/dist/private/selection/DOMLayoutDelegate.mjs
var ka = class {
	constructor(e) {
		this.ref = e;
	}
	getItemRect(e) {
		let t = this.ref.current;
		if (!t) return null;
		let n = e == null ? null : ba(this.ref, e);
		if (!n) return null;
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect();
		return {
			x: i.left - r.left - t.clientLeft + t.scrollLeft,
			y: i.top - r.top - t.clientTop + t.scrollTop,
			width: i.width,
			height: i.height
		};
	}
	getContentSize() {
		let e = this.ref.current;
		return {
			width: e?.scrollWidth ?? 0,
			height: e?.scrollHeight ?? 0
		};
	}
	getVisibleRect() {
		let e = this.ref.current;
		return {
			x: e?.scrollLeft ?? 0,
			y: e?.scrollTop ?? 0,
			width: e?.clientWidth ?? 0,
			height: e?.clientHeight ?? 0
		};
	}
}, Aa = class {
	constructor(...e) {
		if (e.length === 1) {
			let t = e[0];
			this.collection = t.collection, this.ref = t.ref, this.collator = t.collator, this.disabledKeys = t.disabledKeys || /* @__PURE__ */ new Set(), this.disabledBehavior = t.disabledBehavior || "all", this.orientation = t.orientation || "vertical", this.direction = t.direction, this.layout = t.layout || "stack", this.layoutDelegate = t.layoutDelegate || new ka(t.ref);
		} else this.collection = e[0], this.disabledKeys = e[1], this.ref = e[2], this.collator = e[3], this.layout = "stack", this.orientation = "vertical", this.disabledBehavior = "all", this.layoutDelegate = new ka(this.ref);
		this.layout === "stack" && this.orientation === "vertical" && (this.getKeyLeftOf = void 0, this.getKeyRightOf = void 0);
	}
	isDisabled(e) {
		return this.disabledBehavior === "all" && (e.props?.isDisabled || this.disabledKeys.has(e.key)) && e.props?.disabledBehavior !== "selection";
	}
	findNextNonDisabled(e, t, n = !1) {
		let r = e;
		for (; r != null;) {
			let e = this.collection.getItem(r);
			if (e?.type === "item" && (n || !this.isDisabled(e))) return r;
			r = t(r);
		}
		return null;
	}
	getNextKey(e, t) {
		let n = e;
		return n = this.collection.getKeyAfter(n), this.findNextNonDisabled(n, (e) => this.collection.getKeyAfter(e), t?.includeDisabled);
	}
	getPreviousKey(e, t) {
		let n = e;
		return n = this.collection.getKeyBefore(n), this.findNextNonDisabled(n, (e) => this.collection.getKeyBefore(e), t?.includeDisabled);
	}
	findKey(e, t, n) {
		let r = e, i = this.layoutDelegate.getItemRect(r);
		if (!i || r == null) return null;
		let a = i;
		do {
			if (r = t(r), r == null) break;
			i = this.layoutDelegate.getItemRect(r);
		} while (i && n(a, i) && r != null);
		return r;
	}
	isSameRow(e, t) {
		return e.y === t.y || e.x !== t.x;
	}
	isSameColumn(e, t) {
		return e.x === t.x || e.y !== t.y;
	}
	isReversed(e) {
		let t = this.getNextKey(e), n = ba(this.ref, e);
		if (t != null) {
			let e = ba(this.ref, t);
			return !n || !e ? !1 : n.getBoundingClientRect().top > e.getBoundingClientRect().top;
		}
		let r = this.getPreviousKey(e);
		if (r != null) {
			let e = ba(this.ref, r);
			return !n || !e ? !1 : e.getBoundingClientRect().top > n.getBoundingClientRect().top;
		}
		return !1;
	}
	getKeyBelow(e, t) {
		return this.layout === "grid" && this.orientation === "vertical" ? this.findKey(e, (e) => this.getNextKey(e, t), this.isSameRow) : this.orientation === "vertical" && this.isReversed(e) ? this.getPreviousKey(e, t) : this.getNextKey(e, t);
	}
	getKeyAbove(e, t) {
		return this.layout === "grid" && this.orientation === "vertical" ? this.findKey(e, (e) => this.getPreviousKey(e, t), this.isSameRow) : this.orientation === "vertical" && this.isReversed(e) ? this.getNextKey(e, t) : this.getPreviousKey(e, t);
	}
	getNextColumn(e, t, n) {
		return t ? this.getPreviousKey(e, n) : this.getNextKey(e, n);
	}
	getKeyRightOf(e, t) {
		let n = this.direction === "ltr" ? "getKeyRightOf" : "getKeyLeftOf";
		return this.layoutDelegate[n] ? (e = this.layoutDelegate[n](e), this.findNextNonDisabled(e, (e) => this.layoutDelegate[n](e), t?.includeDisabled)) : this.layout === "grid" ? this.orientation === "vertical" ? this.getNextColumn(e, this.direction === "rtl", t) : this.findKey(e, (e) => this.getNextColumn(e, this.direction === "rtl", t), this.isSameColumn) : this.orientation === "horizontal" ? this.getNextColumn(e, this.direction === "rtl", t) : null;
	}
	getKeyLeftOf(e, t) {
		let n = this.direction === "ltr" ? "getKeyLeftOf" : "getKeyRightOf";
		return this.layoutDelegate[n] ? (e = this.layoutDelegate[n](e), this.findNextNonDisabled(e, (e) => this.layoutDelegate[n](e), t?.includeDisabled)) : this.layout === "grid" ? this.orientation === "vertical" ? this.getNextColumn(e, this.direction === "ltr", t) : this.findKey(e, (e) => this.getNextColumn(e, this.direction === "ltr", t), this.isSameColumn) : this.orientation === "horizontal" ? this.getNextColumn(e, this.direction === "ltr", t) : null;
	}
	getFirstKey() {
		let e = this.collection.getFirstKey();
		return this.findNextNonDisabled(e, (e) => this.collection.getKeyAfter(e));
	}
	getLastKey() {
		let e = this.collection.getLastKey();
		return this.findNextNonDisabled(e, (e) => this.collection.getKeyBefore(e));
	}
	getKeyPageAbove(e) {
		let t = this.ref.current, n = this.layoutDelegate.getItemRect(e);
		if (!n) return null;
		let r = this.isReversed(e);
		if (t && !fr(t)) return this.getFirstKey();
		let i = e;
		if (this.orientation === "horizontal") {
			let e = Math.max(0, n.x + n.width - this.layoutDelegate.getVisibleRect().width);
			for (; n && n.x > e && i != null;) i = this.getKeyAbove(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		} else {
			let e = this.layoutDelegate.getVisibleRect(), t = r ? n.y - e.height : Math.max(0, n.y + n.height - e.height);
			for (; n && n.y > t && i != null;) i = this.getKeyAbove(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		}
		return i ?? (r ? this.getLastKey() : this.getFirstKey());
	}
	getKeyPageBelow(e) {
		let t = this.ref.current, n = this.layoutDelegate.getItemRect(e);
		if (!n) return null;
		let r = this.isReversed(e);
		if (t && !fr(t)) return this.getLastKey();
		let i = e;
		if (this.orientation === "horizontal") {
			let e = Math.min(this.layoutDelegate.getContentSize().width, n.x - n.width + this.layoutDelegate.getVisibleRect().width);
			for (; n && n.x < e && i != null;) i = this.getKeyBelow(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		} else {
			let e = Math.min(this.layoutDelegate.getContentSize().height, n.y - n.height + this.layoutDelegate.getVisibleRect().height);
			for (; n && n.y < e && i != null;) i = this.getKeyBelow(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		}
		return i ?? (r ? this.getFirstKey() : this.getLastKey());
	}
	getKeyForSearch(e, t) {
		if (!this.collator) return null;
		let n = this.collection, r = t || this.getFirstKey();
		for (; r != null;) {
			let t = n.getItem(r);
			if (!t) return null;
			let i = t.textValue.slice(0, e.length);
			if (t.textValue && this.collator.compare(i, e) === 0) return r;
			r = this.getNextKey(r);
		}
		return null;
	}
}, ja = /* @__PURE__ */ new Map();
function Ma(e) {
	let { locale: t } = wn(), n = t + (e ? Object.entries(e).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : "");
	if (ja.has(n)) return ja.get(n);
	let r = new Intl.Collator(t, e);
	return ja.set(n, r), r;
}
// ../../node_modules/react-aria/dist/private/selection/useSelectableList.mjs
function Na(e) {
	let { selectionManager: t, collection: n, disabledKeys: r, ref: i, keyboardDelegate: a, layoutDelegate: o, orientation: s } = e, c = Ma({
		usage: "search",
		sensitivity: "base"
	}), l = t.disabledBehavior, u = (0, W.useMemo)(() => a || new Aa({
		collection: n,
		disabledKeys: r,
		disabledBehavior: l,
		ref: i,
		collator: c,
		layoutDelegate: o,
		orientation: s
	}), [
		a,
		o,
		n,
		r,
		i,
		c,
		l,
		s
	]), { collectionProps: d } = Oa({
		...e,
		ref: i,
		selectionManager: t,
		keyboardDelegate: u
	});
	return { listProps: d };
}
// ../../node_modules/react-aria/dist/private/interactions/useLongPress.mjs
var Pa = 500;
function Fa(e) {
	let { isDisabled: n, pointerType: r, onLongPressStart: i, onLongPressEnd: a, onLongPress: o, threshold: s = Pa, accessibilityDescription: c } = e, l = (0, W.useRef)(void 0), { addGlobalListener: u, removeAllGlobalListeners: d } = ie(), f = (e) => r ? e.pointerType === r : e.pointerType === "mouse" || e.pointerType === "touch", { pressProps: p } = j({
		isDisabled: n,
		onPressStart(e) {
			if (e.continuePropagation(), f(e)) {
				i && i({
					...e,
					type: "longpressstart"
				}), l.current = setTimeout(() => {
					e.target.dispatchEvent(new PointerEvent("pointercancel", { bubbles: !0 })), u(e.target, "click", (e) => e.preventDefault(), { once: !0 }), t(e.target).activeElement !== e.target && x(e.target), o && o({
						...e,
						type: "longpress"
					}), l.current = void 0;
				}, s), e.pointerType === "touch" && u(e.target, "contextmenu", (e) => e.preventDefault(), { once: !0 });
				let n = z(e.target);
				u(n, "pointerup", () => {
					setTimeout(() => {
						d();
					}, 100);
				}, { once: !0 });
			}
		},
		onPressEnd(e) {
			l.current && clearTimeout(l.current), a && f(e) && a({
				...e,
				type: "longpressend"
			});
		}
	}), m = br(o && !n ? c : void 0);
	return { longPressProps: H(p, m) };
}
// ../../node_modules/react-aria/dist/private/selection/useSelectableItem.mjs
function Ia(e) {
	let { id: t, selectionManager: n, key: o, ref: s, shouldSelectOnPressUp: c, shouldUseVirtualFocus: l, focus: u, isDisabled: d, onAction: f, allowsDifferentPressOrigin: p, linkBehavior: h = "action" } = e, _ = g();
	t = R(t);
	let v = (e) => {
		if (e.pointerType === "keyboard" && ya(e)) n.toggleSelection(o);
		else {
			if (n.selectionMode === "none") return;
			if (n.isLink(o)) {
				if (h === "selection" && s.current) {
					let t = n.getItemProps(o);
					_.open(s.current, e, t.href, t.routerOptions), n.setSelectedKeys(n.selectedKeys);
					return;
				}
				if (h === "override" || h === "none") return;
			}
			n.selectionMode === "single" ? n.isSelected(o) && !n.disallowEmptySelection ? n.toggleSelection(o) : n.replaceSelection(o) : e && e.shiftKey ? n.extendSelection(o) : n.selectionBehavior === "toggle" || e && (zi(e) || e.pointerType === "touch" || e.pointerType === "virtual") ? n.toggleSelection(o) : n.replaceSelection(o);
		}
	};
	(0, W.useEffect)(() => {
		o === n.focusedKey && n.isFocused && (l ? Ti(s.current) : u ? u() : a() !== s.current && s.current && L(s.current));
	}, [
		s,
		o,
		n.focusedKey,
		n.childFocusStrategy,
		n.isFocused,
		l
	]), d ||= n.isDisabled(o);
	let y = {};
	!l && !d ? y = {
		tabIndex: o === n.focusedKey ? 0 : -1,
		onFocus(e) {
			i(e) === s.current && n.setFocusedKey(o);
		}
	} : d && (y.onMouseDown = (e) => {
		e.preventDefault();
	}), (0, W.useEffect)(() => {
		d && n.focusedKey === o && n.setFocusedKey(null);
	}, [
		n,
		d,
		o
	]);
	let b = n.isLink(o) && h === "override", x = f && e.UNSTABLE_itemBehavior === "action", S = n.isLink(o) && h !== "selection" && h !== "none", C = !d && n.canSelectItem(o) && !b && !x, w = (f || S) && !d, T = w && (n.selectionBehavior === "replace" ? !C : !C || n.isEmpty), E = w && C && n.selectionBehavior === "replace", D = T || E, O = (0, W.useRef)(null), k = D && C, A = (0, W.useRef)(!1), M = (0, W.useRef)(!1), N = n.getItemProps(o), P = (e) => {
		f && (f(), s.current?.dispatchEvent(new CustomEvent("react-aria-item-action", { bubbles: !0 }))), S && s.current && _.open(s.current, e, N.href, N.routerOptions);
	}, F = { ref: s };
	c ? (F.onPressStart = (e) => {
		O.current = e.pointerType, A.current = k, e.pointerType === "keyboard" && (!D || Ra(e.key)) && v(e);
	}, p ? (F.onPressUp = T ? void 0 : (e) => {
		e.pointerType === "mouse" && C && v(e);
	}, F.onPress = T ? P : (e) => {
		e.pointerType !== "keyboard" && e.pointerType !== "mouse" && C && v(e);
	}) : F.onPress = (e) => {
		if (T || E && e.pointerType !== "mouse") {
			if (e.pointerType === "keyboard" && !La(e.key)) return;
			P(e);
		} else e.pointerType !== "keyboard" && C && v(e);
	}) : (F.onPressStart = (e) => {
		O.current = e.pointerType, A.current = k, M.current = T, C && (e.pointerType === "mouse" && !T || e.pointerType === "keyboard" && (!w || Ra(e.key))) && v(e);
	}, F.onPress = (e) => {
		(e.pointerType === "touch" || e.pointerType === "pen" || e.pointerType === "virtual" || e.pointerType === "keyboard" && D && La(e.key) || e.pointerType === "mouse" && M.current) && (D ? P(e) : C && v(e));
	});
	let ee = Ca(n.collection);
	if (y["data-collection"] = ee, y["data-key"] = o, F.preventFocusOnPress = l, l && (F = H(F, {
		onPressStart(e) {
			e.pointerType !== "touch" && (n.setFocused(!0), n.setFocusedKey(o));
		},
		onPress(e) {
			e.pointerType === "touch" && (n.setFocused(!0), n.setFocusedKey(o));
		}
	})), N) for (let e of [
		"onPressStart",
		"onPressEnd",
		"onPressChange",
		"onPress",
		"onPressUp",
		"onClick"
	]) N[e] && (F[e] = he(F[e], N[e]));
	let { pressProps: I, isPressed: te } = j(F), ne = E ? (e) => {
		O.current === "mouse" && (e.stopPropagation(), e.preventDefault(), P(e));
	} : void 0, { longPressProps: z } = Fa({
		isDisabled: !k,
		onLongPress(e) {
			e.pointerType === "touch" && (v(e), n.setSelectionBehavior("toggle"));
		}
	}), re = (e) => {
		O.current === "touch" && A.current && e.preventDefault();
	}, ie = h !== "none" && n.isLink(o) ? (e) => {
		m.isOpening || e.preventDefault();
	} : void 0, ae = H(y, C || T || l && !d ? I : {}, k ? z : {}, {
		onDoubleClick: ne,
		onDragStartCapture: re,
		onClick: ie,
		id: t
	}, l ? { onMouseDown: (e) => e.preventDefault() } : void 0), oe = (e) => {
		let t = e;
		for (; t && t !== s.current;) {
			let e = t.getAttribute("data-collection");
			if (e != null) return e !== ee;
			t = t.parentElement;
		}
		return r(e);
	}, se = ae.onPointerDown;
	ae.onPointerDown = (e) => {
		let t = i(e);
		t && t !== s.current && oe(t) ? e.stopPropagation() : se?.(e);
	};
	let ce = ae.onMouseDown;
	return ae.onMouseDown = (e) => {
		let t = i(e);
		t && t !== s.current && oe(t) ? e.stopPropagation() : ce?.(e);
	}, {
		itemProps: ae,
		isPressed: te,
		isSelected: n.isSelected(o),
		isFocused: n.isFocused && n.focusedKey === o,
		isDisabled: d,
		allowsSelection: C,
		hasAction: D
	};
}
function La(e) {
	return e === "Enter";
}
function Ra(e) {
	return e === " ";
}
// ../../node_modules/react-stately/dist/private/collections/getChildNodes.mjs
function za(e, t) {
	return typeof t.getChildren == "function" ? t.getChildren(e.key) : e.childNodes;
}
function Ba(e) {
	return Va(e, 0);
}
function Va(e, t) {
	if (t < 0) return;
	let n = 0;
	for (let r of e) {
		if (n === t) return r;
		n++;
	}
}
function Ha(e, t, n) {
	if (t.parentKey === n.parentKey) return t.index - n.index;
	let r = [...Ua(e, t), t], i = [...Ua(e, n), n], a = r.slice(0, i.length).findIndex((e, t) => e !== i[t]);
	return a === -1 ? r.findIndex((e) => e === n) >= 0 ? 1 : (i.findIndex((e) => e === t), -1) : (t = r[a], n = i[a], t.index - n.index);
}
function Ua(e, t) {
	let n = [], r = t;
	for (; r?.parentKey != null;) r = e.getItem(r.parentKey), r && n.unshift(r);
	return n;
}
// ../../node_modules/react-aria/dist/private/utils/inertValue.mjs
function Wa(e) {
	let t = W.version.split(".");
	return parseInt(t[0], 10) >= 19 ? e : e ? "true" : void 0;
}
// ../../node_modules/react-stately/dist/private/list/ListCollection.mjs
var Ga = class {
	constructor(e) {
		this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.iterable = e;
		let t = (e) => {
			if (this.keyMap.set(e.key, e), e.childNodes && e.type === "section") for (let n of e.childNodes) t(n);
		};
		for (let n of e) t(n);
		let n = null, r = 0, i = 0;
		for (let [e, t] of this.keyMap) n ? (n.nextKey = e, t.prevKey = n.key) : (this.firstKey = e, t.prevKey = void 0), t.type === "item" && (t.index = r++), (t.type === "section" || t.type === "item") && i++, n = t, n.nextKey = void 0;
		this._size = i, this.lastKey = n?.key ?? null;
	}
	*[Symbol.iterator]() {
		yield* this.iterable;
	}
	get size() {
		return this._size;
	}
	getKeys() {
		return this.keyMap.keys();
	}
	getKeyBefore(e) {
		let t = this.keyMap.get(e);
		return t ? t.prevKey ?? null : null;
	}
	getKeyAfter(e) {
		let t = this.keyMap.get(e);
		return t ? t.nextKey ?? null : null;
	}
	getFirstKey() {
		return this.firstKey;
	}
	getLastKey() {
		return this.lastKey;
	}
	getItem(e) {
		return this.keyMap.get(e) ?? null;
	}
	at(e) {
		let t = [...this.getKeys()];
		return this.getItem(t[e]);
	}
	getChildren(e) {
		return this.keyMap.get(e)?.childNodes || [];
	}
}, Ka = class e extends Set {
	constructor(t, n, r) {
		super(t), t instanceof e ? (this.anchorKey = n ?? t.anchorKey, this.currentKey = r ?? t.currentKey) : (this.anchorKey = n ?? null, this.currentKey = r ?? null);
	}
};
// ../../node_modules/react-stately/dist/private/selection/useMultipleSelectionState.mjs
function qa(e, t) {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
}
function Ja(e) {
	let { selectionMode: t = "none", disallowEmptySelection: n = !1, allowDuplicateSelectionEvents: r, selectionBehavior: i = "toggle", disabledBehavior: a = "all" } = e, o = (0, W.useRef)(!1), [, s] = (0, W.useState)(!1), c = (0, W.useRef)(null), l = (0, W.useRef)(null), [, u] = (0, W.useState)(null), [d, f] = Cr((0, W.useMemo)(() => Ya(e.selectedKeys), [e.selectedKeys]), (0, W.useMemo)(() => Ya(e.defaultSelectedKeys, new Ka()), [e.defaultSelectedKeys]), e.onSelectionChange), p = (0, W.useMemo)(() => e.disabledKeys ? new Set(e.disabledKeys) : /* @__PURE__ */ new Set(), [e.disabledKeys]), [m, h] = (0, W.useState)(i);
	i === "replace" && m === "toggle" && typeof d == "object" && d.size === 0 && h("replace");
	let g = (0, W.useRef)(i);
	return (0, W.useEffect)(() => {
		i !== g.current && (h(i), g.current = i);
	}, [i]), {
		selectionMode: t,
		disallowEmptySelection: n,
		selectionBehavior: m,
		setSelectionBehavior: h,
		get isFocused() {
			return o.current;
		},
		setFocused(e) {
			o.current = e, s(e);
		},
		get focusedKey() {
			return c.current;
		},
		get childFocusStrategy() {
			return l.current;
		},
		setFocusedKey(e, t = "first") {
			c.current = e, l.current = t, u(e);
		},
		selectedKeys: d,
		setSelectedKeys(e) {
			(r || !qa(e, d)) && f(e);
		},
		disabledKeys: p,
		disabledBehavior: a
	};
}
function Ya(e, t) {
	return e ? e === "all" ? "all" : new Ka(e) : t;
}
// ../../node_modules/react-stately/dist/private/selection/SelectionManager.mjs
var Xa = class e {
	constructor(e, t, n) {
		this.collection = e, this.state = t, this.allowsCellSelection = n?.allowsCellSelection ?? !1, this._isSelectAll = null, this.layoutDelegate = n?.layoutDelegate || null, this.fullCollection = n?.fullCollection || null;
	}
	get selectionMode() {
		return this.state.selectionMode;
	}
	get disallowEmptySelection() {
		return this.state.disallowEmptySelection;
	}
	get selectionBehavior() {
		return this.state.selectionBehavior;
	}
	setSelectionBehavior(e) {
		this.state.setSelectionBehavior(e);
	}
	get isFocused() {
		return this.state.isFocused;
	}
	setFocused(e) {
		this.state.setFocused(e);
	}
	get focusedKey() {
		return this.state.focusedKey;
	}
	get childFocusStrategy() {
		return this.state.childFocusStrategy;
	}
	setFocusedKey(e, t) {
		(e == null || this.collection.getItem(e)) && this.state.setFocusedKey(e, t);
	}
	get selectedKeys() {
		return this.state.selectedKeys === "all" ? new Set(this.getSelectAllKeys()) : this.state.selectedKeys;
	}
	get rawSelection() {
		return this.state.selectedKeys;
	}
	isSelected(e) {
		if (this.state.selectionMode === "none") return !1;
		let t = this.getKey(e);
		return t == null ? !1 : this.state.selectedKeys === "all" ? this.canSelectItem(t) : this.state.selectedKeys.has(t);
	}
	get isEmpty() {
		return this.state.selectedKeys !== "all" && this.state.selectedKeys.size === 0;
	}
	get isSelectAll() {
		if (this.isEmpty) return !1;
		if (this.state.selectedKeys === "all") return !0;
		if (this._isSelectAll != null) return this._isSelectAll;
		let e = this.getSelectAllKeys(), t = this.state.selectedKeys;
		return this._isSelectAll = e.every((e) => t.has(e)), this._isSelectAll;
	}
	get firstSelectedKey() {
		let e = null;
		for (let t of this.state.selectedKeys) {
			let n = this.collection.getItem(t);
			(!e || n && Ha(this.collection, n, e) < 0) && (e = n);
		}
		return e?.key ?? null;
	}
	get lastSelectedKey() {
		let e = null;
		for (let t of this.state.selectedKeys) {
			let n = this.collection.getItem(t);
			(!e || n && Ha(this.collection, n, e) > 0) && (e = n);
		}
		return e?.key ?? null;
	}
	get disabledKeys() {
		return this.state.disabledKeys;
	}
	get disabledBehavior() {
		return this.state.disabledBehavior;
	}
	extendSelection(e) {
		if (this.selectionMode === "none") return;
		if (this.selectionMode === "single") {
			this.replaceSelection(e);
			return;
		}
		let t = this.getKey(e);
		if (t == null) return;
		let n;
		if (this.state.selectedKeys === "all") n = new Ka([t], t, t);
		else {
			let e = this.state.selectedKeys, r = e.anchorKey ?? t;
			n = new Ka(e, r, t);
			for (let i of this.getKeyRange(r, e.currentKey ?? t)) n.delete(i);
			for (let e of this.getKeyRange(t, r)) this.canSelectItem(e) && n.add(e);
		}
		this.state.setSelectedKeys(n);
	}
	getKeyRange(e, t) {
		let n = this.collection.getItem(e), r = this.collection.getItem(t);
		return n && r ? Ha(this.collection, n, r) <= 0 ? this.getKeyRangeInternal(e, t) : this.getKeyRangeInternal(t, e) : [];
	}
	getKeyRangeInternal(e, t) {
		if (this.layoutDelegate?.getKeyRange) return this.layoutDelegate.getKeyRange(e, t);
		let n = [], r = e;
		for (; r != null;) {
			let e = this.collection.getItem(r);
			if (e && (e.type === "item" || e.type === "cell" && this.allowsCellSelection) && n.push(r), r === t) return n;
			r = this.collection.getKeyAfter(r);
		}
		return [];
	}
	getKey(e) {
		let t = this.collection.getItem(e);
		if (!t || t.type === "cell" && this.allowsCellSelection) return e;
		for (; t && t.type !== "item" && t.parentKey != null;) t = this.collection.getItem(t.parentKey);
		return !t || t.type !== "item" ? null : t.key;
	}
	toggleSelection(e) {
		if (this.selectionMode === "none") return;
		if (this.selectionMode === "single" && !this.isSelected(e)) {
			this.replaceSelection(e);
			return;
		}
		let t = this.getKey(e);
		if (t == null) return;
		let n = new Ka(this.state.selectedKeys === "all" ? this.getSelectAllKeys() : this.state.selectedKeys);
		n.has(t) ? n.delete(t) : this.canSelectItem(t) && (n.add(t), n.anchorKey = t, n.currentKey = t), this.disallowEmptySelection && n.size === 0 || this.state.setSelectedKeys(n);
	}
	replaceSelection(e) {
		if (this.selectionMode === "none") return;
		let t = this.getKey(e);
		if (t == null) return;
		let n = this.canSelectItem(t) ? new Ka([t], t, t) : new Ka();
		this.state.setSelectedKeys(n);
	}
	setSelectedKeys(e) {
		if (this.selectionMode === "none") return;
		let t = new Ka();
		for (let n of e) {
			let e = this.getKey(n);
			if (e != null && (t.add(e), this.selectionMode === "single")) break;
		}
		this.state.setSelectedKeys(t);
	}
	getSelectAllKeys() {
		let e = this.fullCollection ?? this.collection, t = [], n = (r) => {
			for (; r != null;) {
				if (this.canSelectItemIn(r, e)) {
					let i = e.getItem(r);
					i?.type === "item" && t.push(r), i?.hasChildNodes && (this.allowsCellSelection || i.type !== "item") && n(Ba(za(i, e))?.key ?? null);
				}
				r = e.getKeyAfter(r);
			}
		};
		return n(e.getFirstKey()), t;
	}
	selectAll() {
		!this.isSelectAll && this.selectionMode === "multiple" && this.state.setSelectedKeys("all");
	}
	clearSelection() {
		!this.disallowEmptySelection && (this.state.selectedKeys === "all" || this.state.selectedKeys.size > 0) && this.state.setSelectedKeys(new Ka());
	}
	toggleSelectAll() {
		this.isSelectAll ? this.clearSelection() : this.selectAll();
	}
	select(e, t) {
		this.selectionMode !== "none" && (this.selectionMode === "single" ? this.isSelected(e) && !this.disallowEmptySelection ? this.toggleSelection(e) : this.replaceSelection(e) : this.selectionBehavior === "toggle" || t && (t.pointerType === "touch" || t.pointerType === "virtual") ? this.toggleSelection(e) : this.replaceSelection(e));
	}
	isSelectionEqual(e) {
		if (e === this.state.selectedKeys) return !0;
		let t = this.selectedKeys;
		if (e.size !== t.size) return !1;
		for (let n of e) if (!t.has(n)) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	canSelectItem(e) {
		return this.canSelectItemIn(e, this.collection);
	}
	canSelectItemIn(e, t) {
		if (this.state.selectionMode === "none" || this.state.disabledKeys.has(e)) return !1;
		let n = t.getItem(e);
		return !(!n || n?.props?.isDisabled || n.type === "cell" && !this.allowsCellSelection);
	}
	isDisabled(e) {
		let t = this.collection.getItem(e);
		return this.state.disabledBehavior === "all" && (this.state.disabledKeys.has(e) || !!t?.props?.isDisabled) && t?.props?.disabledBehavior !== "selection";
	}
	isLink(e) {
		return !!this.collection.getItem(e)?.props?.href;
	}
	getItemProps(e) {
		return this.collection.getItem(e)?.props;
	}
	withCollection(t) {
		return new e(t, this.state, {
			allowsCellSelection: this.allowsCellSelection,
			layoutDelegate: this.layoutDelegate || void 0,
			fullCollection: this.fullCollection ?? this.collection
		});
	}
}, Za = class {
	build(e, t) {
		return this.context = t, Qa(() => this.iterateCollection(e));
	}
	*iterateCollection(e) {
		let { children: t, items: n } = e;
		if (W.isValidElement(t) && t.type === W.Fragment) yield* this.iterateCollection({
			children: t.props.children,
			items: n
		});
		else if (typeof t == "function") {
			if (!n) throw Error("props.children was a function but props.items is missing");
			let e = 0;
			for (let r of n) yield* this.getFullNode({
				value: r,
				index: e
			}, { renderer: t }), e++;
		} else {
			let e = [];
			W.Children.forEach(t, (t) => {
				t && e.push(t);
			});
			let n = 0;
			for (let t of e) {
				let e = this.getFullNode({
					element: t,
					index: n
				}, {});
				for (let t of e) n++, yield t;
			}
		}
	}
	getKey(e, t, n, r) {
		if (e.key != null) return e.key;
		if (t.type === "cell" && t.key != null) return `${r}${t.key}`;
		let i = t.value;
		if (i != null) {
			let e = i.key ?? i.id;
			if (e == null) throw Error("No key found for item");
			return e;
		}
		return r ? `${r}.${t.index}` : `$.${t.index}`;
	}
	getChildState(e, t) {
		return { renderer: t.renderer || e.renderer };
	}
	*getFullNode(e, t, n, r) {
		if (W.isValidElement(e.element) && e.element.type === W.Fragment) {
			let i = [];
			W.Children.forEach(e.element.props.children, (e) => {
				i.push(e);
			});
			let a = e.index ?? 0;
			for (let e of i) yield* this.getFullNode({
				element: e,
				index: a++
			}, t, n, r);
			return;
		}
		let i = e.element;
		if (!i && e.value && t && t.renderer) {
			let n = this.cache.get(e.value);
			if (n && (!n.shouldInvalidate || !n.shouldInvalidate(this.context))) {
				n.index = e.index, n.parentKey = r ? r.key : null, yield n;
				return;
			}
			i = t.renderer(e.value);
		}
		if (W.isValidElement(i)) {
			let a = i.type;
			if (typeof a != "function" && typeof a.getCollectionNode != "function") {
				let e = i.type;
				throw Error(`Unknown element <${e}> in collection.`);
			}
			let o = a.getCollectionNode(i.props, this.context), s = e.index ?? 0, c = o.next();
			for (; !c.done && c.value;) {
				let a = c.value;
				e.index = s;
				let l = a.key ?? null;
				l ??= a.element ? null : this.getKey(i, e, t, n);
				let u = [...this.getFullNode({
					...a,
					key: l,
					index: s,
					wrapper: $a(e.wrapper, a.wrapper)
				}, this.getChildState(t, a), n ? `${n}${i.key}` : i.key, r)];
				for (let t of u) {
					if (t.value = a.value ?? e.value ?? null, t.value && this.cache.set(t.value, t), e.type && t.type !== e.type) throw Error(`Unsupported type <${eo(t.type)}> in <${eo(r?.type ?? "unknown parent type")}>. Only <${eo(e.type)}> is supported.`);
					s++, yield t;
				}
				c = o.next(u);
			}
			return;
		}
		if (e.key == null || e.type == null) return;
		let a = this, o = {
			type: e.type,
			props: e.props,
			key: e.key,
			parentKey: r ? r.key : null,
			value: e.value ?? null,
			level: (r?.level ?? 0) + +(r?.type === "item"),
			index: e.index,
			rendered: e.rendered,
			textValue: e.textValue ?? "",
			"aria-label": e["aria-label"],
			wrapper: e.wrapper,
			shouldInvalidate: e.shouldInvalidate,
			hasChildNodes: e.hasChildNodes || !1,
			childNodes: Qa(function* () {
				if (!e.hasChildNodes || !e.childNodes) return;
				let n = 0;
				for (let r of e.childNodes()) {
					r.key != null && (r.key = `${o.key}${r.key}`);
					let e = a.getFullNode({
						...r,
						index: n
					}, a.getChildState(t, r), o.key, o);
					for (let t of e) n++, yield t;
				}
			})
		};
		yield o;
	}
	constructor() {
		this.cache = /* @__PURE__ */ new WeakMap();
	}
};
function Qa(e) {
	let t = [], n = null;
	return { *[Symbol.iterator]() {
		for (let e of t) yield e;
		n ||= e();
		for (let e of n) t.push(e), yield e;
	} };
}
function $a(e, t) {
	if (e && t) return (n) => e(t(n));
	if (e) return e;
	if (t) return t;
}
function eo(e) {
	return e[0].toUpperCase() + e.slice(1);
}
// ../../node_modules/react-stately/dist/private/collections/useCollection.mjs
function to(e, t, n) {
	let r = (0, W.useMemo)(() => new Za(), []), { children: i, items: a, collection: o } = e;
	return (0, W.useMemo)(() => o || t(r.build({
		children: i,
		items: a
	}, n)), [
		r,
		i,
		a,
		o,
		n,
		t
	]);
}
// ../../node_modules/react-stately/dist/private/list/useListState.mjs
function no(e) {
	let { filter: t, layoutDelegate: n } = e, r = Ja(e), i = (0, W.useMemo)(() => e.disabledKeys ? new Set(e.disabledKeys) : /* @__PURE__ */ new Set(), [e.disabledKeys]), a = to(e, (0, W.useCallback)((e) => t ? new Ga(t(e)) : new Ga(e), [t]), (0, W.useMemo)(() => ({ suppressTextValueWarning: e.suppressTextValueWarning }), [e.suppressTextValueWarning])), o = (0, W.useMemo)(() => new Xa(a, r, { layoutDelegate: n }), [
		a,
		r,
		n
	]);
	return io(a, o), {
		collection: a,
		disabledKeys: i,
		selectionManager: o
	};
}
function ro(e, t) {
	let n = (0, W.useMemo)(() => t ? e.collection.filter(t) : e.collection, [e.collection, t]), r = e.selectionManager.withCollection(n);
	return io(n, r), {
		collection: n,
		selectionManager: r,
		disabledKeys: e.disabledKeys
	};
}
function io(e, t) {
	let n = (0, W.useRef)(null);
	(0, W.useEffect)(() => {
		if (t.focusedKey != null && !e.getItem(t.focusedKey) && n.current) {
			let r = n.current.getKeyAfter(t.focusedKey), i = null;
			for (; r != null;) {
				let a = e.getItem(r);
				if (a && a.type === "item" && !t.isDisabled(r)) {
					i = r;
					break;
				}
				r = n.current.getKeyAfter(r);
			}
			if (i == null) for (r = n.current.getKeyBefore(t.focusedKey); r != null;) {
				let a = e.getItem(r);
				if (a && a.type === "item" && !t.isDisabled(r)) {
					i = r;
					break;
				}
				r = n.current.getKeyBefore(r);
			}
			t.setFocusedKey(i);
		}
		n.current = e;
	}, [e, t]);
}
// ../../node_modules/react-aria/dist/private/utils/useLoadMoreSentinel.mjs
function ao(e, t) {
	let { collection: n, onLoadMore: r, scrollOffset: i = 1, direction: a = "end" } = e, o = (0, W.useRef)(null), s = _e((e) => {
		for (let t of e) t.isIntersecting && r && r();
	});
	B(() => {
		if (t.current) {
			let e = 100 * i, n = a === "start" ? `${e}% 0px 0px 0px` : `0px ${e}% ${e}% ${e}%`;
			o.current = new IntersectionObserver(s, {
				root: pr(t?.current),
				rootMargin: n
			}), o.current.observe(t.current);
		}
		return () => {
			o.current && o.current.disconnect();
		};
	}, [
		n,
		t,
		i,
		a
	]);
}
// ../../node_modules/react-aria-components/dist/private/ListBox.mjs
var oo = /*#__PURE__*/ (0, W.createContext)(null);
rn(jt, function(e, t, n) {
	let r = (0, W.useContext)(oo), { isLoading: i, onLoadMore: a, scrollOffset: o, ...s } = e, c = (0, W.useRef)(null);
	ao((0, W.useMemo)(() => ({
		onLoadMore: a,
		collection: r?.collection,
		sentinelRef: c,
		scrollOffset: o
	}), [
		a,
		o,
		r?.collection
	]), c);
	let l = V({
		...s,
		id: void 0,
		children: n.rendered,
		defaultClassName: "react-aria-ListBoxLoadingIndicator",
		values: void 0
	});
	return /*#__PURE__*/ W.createElement(W.Fragment, null, /*#__PURE__*/ W.createElement("div", {
		style: {
			position: "relative",
			width: 0,
			height: 0
		},
		inert: Wa(!0)
	}, /*#__PURE__*/ W.createElement("div", {
		"data-testid": "loadMoreSentinel",
		ref: c,
		style: {
			position: "absolute",
			height: 1,
			width: 1
		}
	})), i && l.children && /*#__PURE__*/ W.createElement(W.Fragment, null, /*#__PURE__*/ W.createElement(E.div, {
		...H(C(e, { global: !0 }), { tabIndex: -1 }),
		...l,
		role: "option",
		ref: t
	}, l.children)));
});
// ../../node_modules/react-aria/dist/private/overlays/ariaHideOutside.mjs
var so = typeof HTMLElement < "u" && "inert" in HTMLElement.prototype;
function co(e) {
	return e.dataset.liveAnnouncer === "true" || e.dataset.reactAriaTopLayer !== void 0;
}
var lo = /* @__PURE__ */ new WeakMap(), uo = [];
function fo(e, n) {
	let r = z(e?.[0]), i = n instanceof r.Element ? { root: n } : n, a = i?.root ?? document.body, o = i?.shouldUseInert && so, s = new Set(e), c = /* @__PURE__ */ new Set(), l = (e) => o && e instanceof r.HTMLElement ? e.inert : e.getAttribute("aria-hidden") === "true", u = (e, t) => {
		o && e instanceof r.HTMLElement ? e.inert = t : t ? e.setAttribute("aria-hidden", "true") : (e.removeAttribute("aria-hidden"), e instanceof r.HTMLElement && (e.inert = !1));
	}, d = /* @__PURE__ */ new Set();
	if (h()) {
		let t = a.getRootNode();
		for (let n of e) {
			let e = n.getRootNode();
			for (; re(e) && e !== t;) d.add(e), e = e.host.getRootNode();
		}
	}
	let f = (e) => {
		for (let t of e.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]")) s.add(t);
		let n = (e) => {
			if (c.has(e) || s.has(e) || e.parentElement && c.has(e.parentElement) && e.parentElement.getAttribute("role") !== "row") return NodeFilter.FILTER_REJECT;
			for (let t of s) if (U(e, t)) return NodeFilter.FILTER_SKIP;
			return NodeFilter.FILTER_ACCEPT;
		}, r = qi(t(e), e, NodeFilter.SHOW_ELEMENT, { acceptNode: n }), i = n(e);
		if (i === NodeFilter.FILTER_ACCEPT && p(e), i !== NodeFilter.FILTER_REJECT) {
			let e = r.nextNode();
			for (; e != null;) p(e), e = r.nextNode();
		}
	}, p = (e) => {
		let t = lo.get(e) ?? 0;
		l(e) && t === 0 || (t === 0 && u(e, !0), c.add(e), lo.set(e, t + 1));
	};
	uo.length && uo[uo.length - 1].disconnect(), f(a);
	let m = new MutationObserver((e) => {
		for (let t of e) if (t.type === "childList") {
			if (t.target.isConnected && ![...s, ...c].some((e) => U(e, t.target))) for (let e of t.addedNodes) (e instanceof HTMLElement || e instanceof SVGElement) && co(e) ? s.add(e) : e instanceof Element && f(e);
			if (h()) {
				for (let e of d) if (!e.isConnected) {
					m.disconnect();
					break;
				}
			}
		}
	});
	m.observe(a, {
		childList: !0,
		subtree: !0
	});
	let g = /* @__PURE__ */ new Set();
	if (h()) for (let e of d) {
		let t = new MutationObserver((e) => {
			for (let t of e) if (t.type === "childList") {
				if (t.target.isConnected && ![...s, ...c].some((e) => U(e, t.target))) for (let e of t.addedNodes) (e instanceof HTMLElement || e instanceof SVGElement) && co(e) ? s.add(e) : e instanceof Element && f(e);
				if (h()) {
					for (let e of d) if (!e.isConnected) {
						m.disconnect();
						break;
					}
				}
			}
		});
		t.observe(e, {
			childList: !0,
			subtree: !0
		}), g.add(t);
	}
	let _ = {
		visibleNodes: s,
		hiddenNodes: c,
		observe() {
			m.observe(a, {
				childList: !0,
				subtree: !0
			});
		},
		disconnect() {
			m.disconnect();
		}
	};
	return uo.push(_), () => {
		if (m.disconnect(), h()) for (let e of g) e.disconnect();
		for (let e of c) {
			let t = lo.get(e);
			t != null && (t === 1 ? (u(e, !1), lo.delete(e)) : lo.set(e, t - 1));
		}
		_ === uo[uo.length - 1] ? (uo.pop(), uo.length && uo[uo.length - 1].observe()) : uo.splice(uo.indexOf(_), 1);
	};
}
// ../../node_modules/react-stately/dist/private/tree/TreeCollection.mjs
var po = class {
	constructor(e, { expandedKeys: t } = {}) {
		this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.iterable = e, t ||= /* @__PURE__ */ new Set();
		let n = (e) => {
			if (this.keyMap.set(e.key, e), e.childNodes && (e.type === "section" || t.has(e.key))) for (let t of e.childNodes) n(t);
		};
		for (let t of e) n(t);
		let r = null, i = 0;
		for (let [e, t] of this.keyMap) r ? (r.nextKey = e, t.prevKey = r.key) : (this.firstKey = e, t.prevKey = void 0), t.type === "item" && (t.index = i++), r = t, r.nextKey = void 0;
		this.lastKey = r?.key ?? null;
	}
	*[Symbol.iterator]() {
		yield* this.iterable;
	}
	get size() {
		return this.keyMap.size;
	}
	getKeys() {
		return this.keyMap.keys();
	}
	getKeyBefore(e) {
		let t = this.keyMap.get(e);
		return t ? t.prevKey ?? null : null;
	}
	getKeyAfter(e) {
		let t = this.keyMap.get(e);
		return t ? t.nextKey ?? null : null;
	}
	getFirstKey() {
		return this.firstKey;
	}
	getLastKey() {
		return this.lastKey;
	}
	getItem(e) {
		return this.keyMap.get(e) ?? null;
	}
	at(e) {
		let t = [...this.getKeys()];
		return this.getItem(t[e]);
	}
};
// ../../node_modules/react-stately/dist/private/tree/useTreeState.mjs
function mo(e) {
	let { onExpandedChange: t } = e, [n, r] = Cr(e.expandedKeys ? new Set(e.expandedKeys) : void 0, e.defaultExpandedKeys ? new Set(e.defaultExpandedKeys) : /* @__PURE__ */ new Set(), t), i = Ja(e), a = (0, W.useMemo)(() => e.disabledKeys ? new Set(e.disabledKeys) : /* @__PURE__ */ new Set(), [e.disabledKeys]), o = to(e, (0, W.useCallback)((e) => new po(e, { expandedKeys: n }), [n]), null);
	return (0, W.useEffect)(() => {
		i.focusedKey != null && !o.getItem(i.focusedKey) && i.setFocusedKey(null);
	}, [o, i.focusedKey]), {
		collection: o,
		expandedKeys: n,
		disabledKeys: a,
		toggleKey: (e) => {
			r(ho(n, e));
		},
		setExpandedKeys: r,
		selectionManager: new Xa(o, i)
	};
}
function ho(e, t) {
	let n = new Set(e);
	return n.has(t) ? n.delete(t) : n.add(t), n;
}
// ../../node_modules/react-aria/dist/private/intl/searchfield/ar-AE.mjs
var go = {};
go = { "Clear search": "مسح البحث" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/bg-BG.mjs
var _o = {};
_o = { "Clear search": "Изчистване на търсене" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/cs-CZ.mjs
var vo = {};
vo = { "Clear search": "Vymazat hledání" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/da-DK.mjs
var yo = {};
yo = { "Clear search": "Ryd søgning" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/de-DE.mjs
var bo = {};
bo = { "Clear search": "Suche zurücksetzen" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/el-GR.mjs
var xo = {};
xo = { "Clear search": "Απαλοιφή αναζήτησης" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/en-US.mjs
var So = {};
So = { "Clear search": "Clear search" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/es-ES.mjs
var Co = {};
Co = { "Clear search": "Borrar búsqueda" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/et-EE.mjs
var wo = {};
wo = { "Clear search": "Tühjenda otsing" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/fi-FI.mjs
var To = {};
To = { "Clear search": "Tyhjennä haku" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/fr-FR.mjs
var Eo = {};
Eo = { "Clear search": "Effacer la recherche" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/he-IL.mjs
var Do = {};
Do = { "Clear search": "נקה חיפוש" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/hr-HR.mjs
var Oo = {};
Oo = { "Clear search": "Obriši pretragu" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/hu-HU.mjs
var ko = {};
ko = { "Clear search": "Keresés törlése" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/it-IT.mjs
var Ao = {};
Ao = { "Clear search": "Cancella ricerca" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/ja-JP.mjs
var jo = {};
jo = { "Clear search": "検索をクリア" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/ko-KR.mjs
var Mo = {};
Mo = { "Clear search": "검색 지우기" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/lt-LT.mjs
var No = {};
No = { "Clear search": "Išvalyti iešką" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/lv-LV.mjs
var Po = {};
Po = { "Clear search": "Notīrīt meklēšanu" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/nb-NO.mjs
var Fo = {};
Fo = { "Clear search": "Tøm søk" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/nl-NL.mjs
var Io = {};
Io = { "Clear search": "Zoekactie wissen" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/pl-PL.mjs
var Lo = {};
Lo = { "Clear search": "Wyczyść zawartość wyszukiwania" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/pt-BR.mjs
var Ro = {};
Ro = { "Clear search": "Limpar pesquisa" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/pt-PT.mjs
var zo = {};
zo = { "Clear search": "Limpar pesquisa" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/ro-RO.mjs
var Bo = {};
Bo = { "Clear search": "Ştergeţi căutarea" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/ru-RU.mjs
var Vo = {};
Vo = { "Clear search": "Очистить поиск" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/sk-SK.mjs
var Ho = {};
Ho = { "Clear search": "Vymazať vyhľadávanie" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/sl-SI.mjs
var Uo = {};
Uo = { "Clear search": "Počisti iskanje" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/sr-SP.mjs
var Wo = {};
Wo = { "Clear search": "Obriši pretragu" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/sv-SE.mjs
var Go = {};
Go = { "Clear search": "Rensa sökning" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/tr-TR.mjs
var Ko = {};
Ko = { "Clear search": "Aramayı temizle" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/uk-UA.mjs
var qo = {};
qo = { "Clear search": "Очистити пошук" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/zh-CN.mjs
var Jo = {};
Jo = { "Clear search": "清除搜索" };
// ../../node_modules/react-aria/dist/private/intl/searchfield/zh-TW.mjs
var Yo = {};
Yo = { "Clear search": "清除搜尋條件" };
// ../../node_modules/react-aria/dist/private/searchfield/intlStrings.mjs
var Xo = {};
Xo = {
	"ar-AE": go,
	"bg-BG": _o,
	"cs-CZ": vo,
	"da-DK": yo,
	"de-DE": bo,
	"el-GR": xo,
	"en-US": So,
	"es-ES": Co,
	"et-EE": wo,
	"fi-FI": To,
	"fr-FR": Eo,
	"he-IL": Do,
	"hr-HR": Oo,
	"hu-HU": ko,
	"it-IT": Ao,
	"ja-JP": jo,
	"ko-KR": Mo,
	"lt-LT": No,
	"lv-LV": Po,
	"nb-NO": Fo,
	"nl-NL": Io,
	"pl-PL": Lo,
	"pt-BR": Ro,
	"pt-PT": zo,
	"ro-RO": Bo,
	"ru-RU": Vo,
	"sk-SK": Ho,
	"sl-SI": Uo,
	"sr-SP": Wo,
	"sv-SE": Go,
	"tr-TR": Ko,
	"uk-UA": qo,
	"zh-CN": Jo,
	"zh-TW": Yo
};
// ../../node_modules/react-aria/dist/private/searchfield/useSearchField.mjs
function Zo(e) {
	return e && e.__esModule ? e.default : e;
}
function Qo(e, t, n) {
	let r = Rn(Zo(Xo), "@react-aria/searchfield"), { isDisabled: i, isReadOnly: a, onSubmit: o, onClear: s, type: c = "search" } = e, { keyboardProps: l } = oe({
		isDisabled: i || a,
		shortcuts: {
			Enter: () => {
				if (o) o(t.value);
				else return !1;
			},
			Escape: () => {
				if (t.value === "" && (!n.current || n.current.value === "")) return !1;
				t.setValue(""), s?.();
			}
		}
	}), u = () => {
		t.setValue(""), s && s();
	}, d = () => {
		n.current?.focus();
	}, { labelProps: f, inputProps: p, descriptionProps: m, errorMessageProps: h, ...g } = _i({
		...e,
		value: t.value,
		onChange: t.setValue,
		onKeyDown: e.onKeyDown,
		onKeyUp: e.onKeyUp,
		type: c
	}, n);
	return {
		labelProps: f,
		inputProps: H(l, {
			...p,
			defaultValue: void 0
		}),
		clearButtonProps: {
			"aria-label": r.format("Clear search"),
			excludeFromTabOrder: !0,
			preventFocusOnPress: !0,
			isDisabled: i || a,
			onPress: u,
			onPressStart: d
		},
		descriptionProps: m,
		errorMessageProps: h,
		...g
	};
}
// ../../node_modules/react-stately/dist/private/searchfield/useSearchFieldState.mjs
function $o(e) {
	let [t, n] = Cr(es(e.value), es(e.defaultValue) || "", e.onChange);
	return {
		value: t,
		setValue: n
	};
}
function es(e) {
	if (e != null) return e.toString();
}
// ../../node_modules/react-aria-components/dist/private/SearchField.mjs
var ts = /*#__PURE__*/ (0, W.createContext)(null), ns = /*#__PURE__*/ Ht(function(t, n) {
	[t, n] = d(t, n, ts);
	let { validationBehavior: r } = e(Hr) || {}, i = t.validationBehavior ?? r ?? "native", a = (0, W.useRef)(null);
	[t, a] = d(t, a, Vi);
	let [o, c] = u(!t["aria-label"] && !t["aria-labelledby"]), l = $o({
		...t,
		validationBehavior: i
	}), { labelProps: f, inputProps: p, clearButtonProps: m, descriptionProps: h, errorMessageProps: g, ...v } = Qo({
		..._(t),
		label: c,
		validationBehavior: i
	}, l, a), y = V({
		...t,
		values: {
			isEmpty: l.value === "",
			isDisabled: t.isDisabled || !1,
			isInvalid: v.isInvalid || !1,
			isReadOnly: t.isReadOnly || !1,
			isRequired: t.isRequired || !1,
			state: l
		},
		defaultClassName: "react-aria-SearchField"
	}), b = C(t, { global: !0 });
	return delete b.id, /*#__PURE__*/ W.createElement(E.div, {
		...b,
		...y,
		ref: n,
		slot: t.slot || void 0,
		"data-empty": l.value === "" || void 0,
		"data-disabled": t.isDisabled || void 0,
		"data-invalid": v.isInvalid || void 0,
		"data-readonly": t.isReadOnly || void 0,
		"data-required": t.isRequired || void 0
	}, /*#__PURE__*/ W.createElement(s, { values: [
		[zn, {
			...f,
			ref: o
		}],
		[mi, {
			...p,
			ref: a
		}],
		[ir, m],
		[lr, { slots: {
			description: h,
			errorMessage: g
		} }],
		[pi, {
			isInvalid: v.isInvalid,
			isDisabled: t.isDisabled || !1
		}],
		[Or, v]
	] }, y.children));
});
// ../../packages/ui/src/primitives/SearchField/SearchField.tsx
function rs({ label: e, description: t, errorMessage: n, placeholder: r, ...i }) {
	return /* @__PURE__ */ (0, G.jsxs)(ns, {
		...i,
		children: [
			e && /* @__PURE__ */ (0, G.jsx)(li, { children: e }),
			/* @__PURE__ */ (0, G.jsx)(xt, { size: 18 }),
			/* @__PURE__ */ (0, G.jsx)(gi, {
				placeholder: r,
				className: "react-aria-Input inset"
			}),
			/* @__PURE__ */ (0, G.jsx)(ar, {
				className: "clear-button",
				children: /* @__PURE__ */ (0, G.jsx)(Dt, { size: 14 })
			}),
			t && /* @__PURE__ */ (0, G.jsx)(di, { children: t }),
			/* @__PURE__ */ (0, G.jsx)(ui, { children: n })
		]
	});
}
// ../../node_modules/react-aria/dist/private/dnd/constants.mjs
var Z = /*#__PURE__*/ function(e) {
	return e[e.none = 0] = "none", e[e.cancel = 0] = "cancel", e[e.move = 1] = "move", e[e.copy = 2] = "copy", e[e.link = 4] = "link", e[e.all = 7] = "all", e;
}({}), is = {
	...Z,
	copyMove: 3,
	copyLink: 6,
	linkMove: 5,
	all: 7,
	uninitialized: 7
}, as = cs(is);
as[7] = "all";
var os = {
	none: "cancel",
	link: "link",
	copy: "copy",
	move: "move"
}, ss = cs(os);
function cs(e) {
	let t = {};
	for (let n in e) t[e[n]] = n;
	return t;
}
var ls = /* @__PURE__ */ new Set([
	"text/plain",
	"text/uri-list",
	"text/html"
]), us = "application/vnd.react-aria.items+json", ds = "application/octet-stream", fs = /* @__PURE__ */ new WeakMap(), ps = Symbol();
function ms(e) {
	let { id: t } = fs.get(e) || {};
	if (!t) throw Error("Droppable item outside a droppable collection");
	return t;
}
function hs(e) {
	let { ref: t } = fs.get(e) || {};
	if (!t) throw Error("Droppable item outside a droppable collection");
	return t;
}
function gs(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) for (let e of Object.keys(n)) t.add(e);
	return t;
}
function _s(e) {
	return e ||= "virtual", e === "pointer" && (e = "virtual"), e === "virtual" && typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches && (e = "touch"), e;
}
function vs() {
	return _s(ye());
}
function ys() {
	return _s(te());
}
function bs(e, t) {
	let n = /* @__PURE__ */ new Map(), r = !1, i = [];
	for (let e of t) {
		let t = Object.keys(e);
		t.length > 1 && (r = !0);
		let a = {};
		for (let i of t) {
			let t = n.get(i);
			t ? r = !0 : (t = [], n.set(i, t));
			let o = e[i];
			a[i] = o, t.push(o);
		}
		i.push(a);
	}
	for (let [t, r] of n) if (ls.has(t)) {
		let n = r.join("\n");
		e.items.add(n, t);
	} else e.items.add(r[0], t);
	if (r) {
		let t = JSON.stringify(i);
		e.items.add(t, us);
	}
}
var xs = class {
	constructor(e) {
		this.types = /* @__PURE__ */ new Set();
		let t = !1;
		for (let n of e.items) n.type !== "application/vnd.react-aria.items+json" && (n.kind === "file" && (t = !0), n.type ? this.types.add(n.type) : this.types.add(ds));
		this.includesUnknownTypes = !t && e.types.includes("Files");
	}
	has(e) {
		if (Array.isArray(e)) return e.some((e) => this.has(e));
		if (this.includesUnknownTypes || e === ps && this.types.has("application/octet-stream") || e === "*/*") return !0;
		if (typeof e == "string") {
			if (e.endsWith("/*")) {
				for (let t of this.types) if (t.startsWith(e.slice(0, -2))) return !0;
				return !1;
			}
			return this.types.has(e);
		}
		return !1;
	}
};
function Ss(e) {
	let t = [];
	if (!e) return t;
	let n = !1;
	if (e.types.includes("application/vnd.react-aria.items+json")) try {
		let r = e.getData(us), i = JSON.parse(r);
		for (let e of i) t.push({
			kind: "text",
			types: new Set(Object.keys(e)),
			getText: (t) => Promise.resolve(e[t])
		});
		n = !0;
	} catch {}
	if (!n) {
		let n = /* @__PURE__ */ new Map();
		for (let r of e.items) if (r.kind === "string") n.set(r.type || "application/octet-stream", e.getData(r.type));
		else if (r.kind === "file") {
			if (typeof r.webkitGetAsEntry == "function") {
				let e = r.webkitGetAsEntry();
				if (!e) continue;
				e.isFile ? t.push(ws(r.getAsFile())) : e.isDirectory && t.push(Ts(e));
			} else t.push(ws(r.getAsFile()));
		}
		n.size > 0 && t.push({
			kind: "text",
			types: new Set(n.keys()),
			getText: (e) => Promise.resolve(n.get(e))
		});
	}
	return t;
}
function Cs(e) {
	return typeof e.text == "function" ? e.text() : new Promise((t, n) => {
		let r = new FileReader();
		r.onload = () => {
			t(r.result);
		}, r.onerror = n, r.readAsText(e);
	});
}
function ws(e) {
	if (!e) throw Error("No file provided");
	return {
		kind: "file",
		type: e.type || "application/octet-stream",
		name: e.name,
		getText: () => Cs(e),
		getFile: () => Promise.resolve(e)
	};
}
function Ts(e) {
	return {
		kind: "directory",
		name: e.name,
		getEntries: () => Es(e)
	};
}
async function* Es(e) {
	let t = e.createReader(), n;
	do {
		n = await new Promise((e, n) => {
			t.readEntries(e, n);
		});
		for (let e of n) e.isFile ? yield ws(await Ds(e)) : e.isDirectory && (yield Ts(e));
	} while (n.length > 0);
}
function Ds(e) {
	return new Promise((t, n) => e.file(t, n));
}
function Os(e) {
	return e.kind === "text";
}
var Q = { draggingKeys: /* @__PURE__ */ new Set() };
function ks(e) {
	Q.draggingCollectionRef = e;
}
function As(e) {
	Q.draggingKeys = e;
}
function js(e) {
	Q.dropCollectionRef = e;
}
function Ms() {
	Q = { draggingKeys: /* @__PURE__ */ new Set() };
}
function Ns(e) {
	Q = e;
}
function Ps(e) {
	let { draggingCollectionRef: t, dropCollectionRef: n } = Q;
	return t?.current != null && t.current === (e?.current || n?.current);
}
var Fs;
function Is(e) {
	Fs = e;
}
var Ls = Z.none;
function Rs(e) {
	Ls = e;
}
// ../../node_modules/react-aria/dist/private/dnd/DragManager.mjs
var zs = /* @__PURE__ */ new Map(), Bs = /* @__PURE__ */ new Map(), Vs = null, Hs = /* @__PURE__ */ new Set();
function Us(e) {
	return zs.set(e.element, e), Vs?.updateValidDropTargets(), () => {
		zs.delete(e.element), Vs?.updateValidDropTargets();
	};
}
function Ws(e) {
	return Bs.set(e.element, e), () => {
		Bs.delete(e.element);
	};
}
function Gs(e, t) {
	if (Vs) throw Error("Cannot begin dragging while already dragging");
	Vs = new Qs(e, t), requestAnimationFrame(() => {
		Vs && (Vs.setup(), ys() === "keyboard" && Vs.next());
	});
	for (let e of Hs) e();
}
function Ks() {
	let [e, t] = (0, W.useState)(Vs);
	return (0, W.useEffect)(() => {
		let e = () => t(Vs);
		return Hs.add(e), () => {
			Hs.delete(e);
		};
	}, []), e;
}
function qs() {
	return !!Vs;
}
function Js() {
	Vs = null;
	for (let e of Hs) e();
}
var Ys = [
	"pointerdown",
	"pointermove",
	"pointerenter",
	"pointerleave",
	"pointerover",
	"pointerout",
	"pointerup",
	"mousedown",
	"mousemove",
	"mouseenter",
	"mouseleave",
	"mouseover",
	"mouseout",
	"mouseup",
	"touchstart",
	"touchmove",
	"touchend",
	"focusin",
	"focusout"
], Xs = [
	"pointerup",
	"mouseup",
	"touchend"
], Zs = {
	keyboard: "dragStartedKeyboard",
	touch: "dragStartedTouch",
	virtual: "dragStartedVirtual"
}, Qs = class {
	constructor(e, t) {
		this.validDropTargets = [], this.currentDropTarget = null, this.currentDropItem = null, this.dropOperation = null, this.mutationObserver = null, this.restoreAriaHidden = null, this.isVirtualClick = !1, this.dragTarget = e, this.stringFormatter = t, this.onKeyDown = this.onKeyDown.bind(this), this.onKeyUp = this.onKeyUp.bind(this), this.onFocus = this.onFocus.bind(this), this.onBlur = this.onBlur.bind(this), this.onClick = this.onClick.bind(this), this.onPointerDown = this.onPointerDown.bind(this), this.cancelEvent = this.cancelEvent.bind(this), this.initialFocused = !1;
	}
	setup() {
		document.addEventListener("keydown", this.onKeyDown, !0), document.addEventListener("keyup", this.onKeyUp, !0), window.addEventListener("focus", this.onFocus, !0), window.addEventListener("blur", this.onBlur, !0), document.addEventListener("click", this.onClick, !0), document.addEventListener("pointerdown", this.onPointerDown, !0);
		for (let e of Ys) document.addEventListener(e, this.cancelEvent, !0);
		this.mutationObserver = new MutationObserver(() => this.updateValidDropTargets()), this.updateValidDropTargets(), tr(this.stringFormatter.format(Zs[ys()]));
	}
	teardown() {
		document.removeEventListener("keydown", this.onKeyDown, !0), document.removeEventListener("keyup", this.onKeyUp, !0), window.removeEventListener("focus", this.onFocus, !0), window.removeEventListener("blur", this.onBlur, !0), document.removeEventListener("click", this.onClick, !0), document.removeEventListener("pointerdown", this.onPointerDown, !0);
		for (let e of Ys) document.removeEventListener(e, this.cancelEvent, !0);
		this.mutationObserver?.disconnect(), this.restoreAriaHidden?.();
	}
	onKeyDown(e) {
		this.cancelEvent(e), e.key === "Escape" ? this.cancel() : (e.key === "Tab" && !(e.metaKey || e.altKey || e.ctrlKey) && (e.shiftKey ? this.previous() : this.next()), typeof this.currentDropTarget?.onKeyDown == "function" && this.currentDropTarget.onKeyDown(e, this.dragTarget));
	}
	onKeyUp(e) {
		this.cancelEvent(e), e.key === "Enter" && (e.altKey || U(this.getCurrentActivateButton(), i(e)) ? this.activate(this.currentDropTarget, this.currentDropItem) : this.drop());
	}
	getCurrentActivateButton() {
		return this.currentDropItem?.activateButtonRef?.current ?? this.currentDropTarget?.activateButtonRef?.current ?? null;
	}
	onFocus(e) {
		let t = this.getCurrentActivateButton(), n = i(e);
		if (n === t) {
			this.cancelEvent(e);
			return;
		}
		if (n !== this.dragTarget.element && this.cancelEvent(e), !(n instanceof HTMLElement) || n === this.dragTarget.element) return;
		let r = this.validDropTargets.find((e) => e.element === n) || this.validDropTargets.find((e) => U(e.element, n));
		if (!r) {
			this.currentDropTarget ? this.currentDropTarget.element.focus() : this.dragTarget.element.focus();
			return;
		}
		let a = Bs.get(n);
		r && this.setCurrentDropTarget(r, a);
	}
	onBlur(e) {
		let t = this.getCurrentActivateButton();
		t && e.relatedTarget === t ? this.cancelEvent(e) : (i(e) !== this.dragTarget.element && this.cancelEvent(e), e.relatedTarget && e.relatedTarget instanceof HTMLElement || (this.currentDropTarget ? this.currentDropTarget.element.focus() : this.dragTarget.element.focus()));
	}
	onClick(e) {
		if (this.cancelEvent(e), be(e) || this.isVirtualClick) {
			let t = Bs.values(), n = i(e), r = [...t].find((e) => e.element === n || U(e.activateButtonRef?.current, n)), a = this.validDropTargets.find((e) => U(e.element, n)), o = r?.activateButtonRef?.current ?? a?.activateButtonRef?.current;
			if (U(o, n) && a) {
				this.activate(a, r);
				return;
			}
			if (i(e) === this.dragTarget.element) {
				this.cancel();
				return;
			}
			a && (this.setCurrentDropTarget(a, r), this.drop(r));
		}
	}
	onPointerDown(e) {
		this.cancelEvent(e), this.isVirtualClick = A(e);
	}
	cancelEvent(e) {
		let t = i(e);
		(e.type !== "focusin" && e.type !== "focusout" || t !== this.dragTarget?.element && t !== this.getCurrentActivateButton()) && (Xs.includes(e.type) || e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation());
	}
	updateValidDropTargets() {
		if (!this.mutationObserver) return;
		if (this.mutationObserver.disconnect(), this.restoreAriaHidden && this.restoreAriaHidden(), this.validDropTargets = $s(this.dragTarget), this.validDropTargets.length > 0) {
			let e = this.findNearestDropTarget();
			this.validDropTargets = [...this.validDropTargets.slice(e), ...this.validDropTargets.slice(0, e)];
		}
		this.currentDropTarget && !this.validDropTargets.includes(this.currentDropTarget) && this.setCurrentDropTarget(this.validDropTargets[0]);
		let e = gs(this.dragTarget.items), t = [...Bs.values()].filter((t) => typeof t.getDropOperation != "function" || t.getDropOperation(e, this.dragTarget.allowedDropOperations) !== "cancel"), n = this.validDropTargets.filter((e) => !t.some((t) => U(e.element, t.element)));
		this.restoreAriaHidden = fo([
			this.dragTarget.element,
			...t.flatMap((e) => e.activateButtonRef?.current ? [e.element, e.activateButtonRef?.current] : [e.element]),
			...n.flatMap((e) => e.activateButtonRef?.current ? [e.element, e.activateButtonRef?.current] : [e.element])
		], { shouldUseInert: !0 }), this.mutationObserver.observe(document.body, {
			subtree: !0,
			attributes: !0,
			attributeFilter: ["aria-hidden", "inert"]
		});
	}
	next() {
		if (!this.currentDropTarget) {
			this.setCurrentDropTarget(this.validDropTargets[0]);
			return;
		}
		let e = this.validDropTargets.indexOf(this.currentDropTarget);
		e < 0 ? this.setCurrentDropTarget(this.validDropTargets[0]) : e === this.validDropTargets.length - 1 ? this.dragTarget.element.closest("[aria-hidden=\"true\"], [inert]") ? this.setCurrentDropTarget(this.validDropTargets[0]) : (this.setCurrentDropTarget(null), this.dragTarget.element.focus()) : this.setCurrentDropTarget(this.validDropTargets[e + 1]);
	}
	previous() {
		if (!this.currentDropTarget) {
			this.setCurrentDropTarget(this.validDropTargets[this.validDropTargets.length - 1]);
			return;
		}
		let e = this.validDropTargets.indexOf(this.currentDropTarget);
		e < 0 ? this.setCurrentDropTarget(this.validDropTargets[this.validDropTargets.length - 1]) : e === 0 ? this.dragTarget.element.closest("[aria-hidden=\"true\"], [inert]") ? this.setCurrentDropTarget(this.validDropTargets[this.validDropTargets.length - 1]) : (this.setCurrentDropTarget(null), this.dragTarget.element.focus()) : this.setCurrentDropTarget(this.validDropTargets[e - 1]);
	}
	findNearestDropTarget() {
		let e = this.dragTarget.element.getBoundingClientRect(), t = Infinity, n = -1, r = -1;
		for (let i = 0; i < this.validDropTargets.length; i++) {
			let a = this.validDropTargets[i];
			r < 0 && U(a.element, this.dragTarget.element) && (r = i);
			let o = a.element.getBoundingClientRect(), s = o.left - e.left, c = o.top - e.top, l = s * s + c * c;
			l < t && (t = l, n = i);
		}
		return r >= 0 ? r : n;
	}
	setCurrentDropTarget(e, t) {
		if (e !== this.currentDropTarget) {
			if (this.currentDropTarget && typeof this.currentDropTarget.onDropExit == "function") {
				let e = this.currentDropTarget.element.getBoundingClientRect();
				this.currentDropTarget.onDropExit({
					type: "dropexit",
					x: e.left + e.width / 2,
					y: e.top + e.height / 2
				});
			}
			if (this.currentDropTarget = e, e) {
				if (typeof e.onDropEnter == "function") {
					let t = e.element.getBoundingClientRect();
					e.onDropEnter({
						type: "dropenter",
						x: t.left + t.width / 2,
						y: t.top + t.height / 2
					}, this.dragTarget);
				}
				t || e?.element.focus();
			}
		}
		if (t != null && t !== this.currentDropItem && (this.currentDropTarget && typeof this.currentDropTarget.onDropTargetEnter == "function" && this.currentDropTarget.onDropTargetEnter(t.target), t.element.focus(), this.currentDropItem = t, !this.initialFocused)) {
			let e = t?.element.getAttribute("aria-label");
			e && tr(e, "polite"), this.initialFocused = !0;
		}
	}
	end() {
		if (this.teardown(), Js(), typeof this.dragTarget.onDragEnd == "function") {
			let e = (this.currentDropTarget && this.dropOperation !== "cancel" ? this.currentDropTarget : this.dragTarget).element.getBoundingClientRect();
			this.dragTarget.onDragEnd({
				type: "dragend",
				x: e.x + e.width / 2,
				y: e.y + e.height / 2,
				dropOperation: this.dropOperation || "cancel"
			});
		}
		this.currentDropTarget && !this.currentDropTarget.preventFocusOnDrop && a()?.dispatchEvent(new FocusEvent("focusin", { bubbles: !0 })), this.setCurrentDropTarget(null);
	}
	cancel() {
		this.setCurrentDropTarget(null), this.end(), this.dragTarget.element.closest("[aria-hidden=\"true\"], [inert]") || this.dragTarget.element.focus(), a()?.dispatchEvent(new FocusEvent("focusin", { bubbles: !0 })), tr(this.stringFormatter.format("dropCanceled"));
	}
	drop(e) {
		if (!this.currentDropTarget) this.cancel();
		else {
			if (typeof e?.getDropOperation == "function") {
				let t = gs(this.dragTarget.items);
				this.dropOperation = e.getDropOperation(t, this.dragTarget.allowedDropOperations);
			} else if (typeof this.currentDropTarget.getDropOperation == "function") {
				let e = gs(this.dragTarget.items);
				this.dropOperation = this.currentDropTarget.getDropOperation(e, this.dragTarget.allowedDropOperations);
			} else this.dropOperation = this.dragTarget.allowedDropOperations[0];
			if (typeof this.currentDropTarget.onDrop == "function") {
				let t = this.dragTarget.items.map((e) => ({
					kind: "text",
					types: new Set(Object.keys(e)),
					getText: (t) => Promise.resolve(e[t])
				})), n = this.currentDropTarget.element.getBoundingClientRect();
				this.currentDropTarget.onDrop({
					type: "drop",
					x: n.left + n.width / 2,
					y: n.top + n.height / 2,
					items: t,
					dropOperation: this.dropOperation
				}, e?.target ?? null);
			}
			this.end(), tr(this.stringFormatter.format("dropComplete"));
		}
	}
	activate(e, t) {
		if (e && typeof e.onDropActivate == "function") {
			let n = t?.target ?? null, r = e.element.getBoundingClientRect();
			e.onDropActivate({
				type: "dropactivate",
				x: r.left + r.width / 2,
				y: r.top + r.height / 2
			}, n);
		}
	}
};
function $s(e) {
	let t = gs(e.items);
	return [...zs.values()].filter((n) => n.element.closest("[aria-hidden=\"true\"], [inert]") ? !1 : typeof n.getDropOperation != "function" || n.getDropOperation(t, e.allowedDropOperations) !== "cancel");
}
// ../../node_modules/react-aria/dist/private/intl/dnd/ar-AE.mjs
var ec = {};
ec = {
	dragDescriptionKeyboard: "اضغط Enter لبدء السحب.",
	dragDescriptionKeyboardAlt: "اضغط على Alt + Enter لبدء السحب.",
	dragDescriptionLongPress: "اضغط باستمرار لبدء السحب.",
	dragDescriptionTouch: "اضغط مرتين لبدء السحب.",
	dragDescriptionVirtual: "انقر لبدء السحب.",
	dragItem: (e) => `\u{627}\u{633}\u{62D}\u{628} ${e.itemText}`,
	dragSelectedItems: (e, t) => `\u{627}\u{633}\u{62D}\u{628} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{639}\u{646}\u{635}\u{631} \u{645}\u{62D}\u{62F}\u{62F}`,
		other: () => `${t.number(e.count)} \u{639}\u{646}\u{627}\u{635}\u{631} \u{645}\u{62D}\u{62F}\u{62F}\u{629}`
	})}`,
	dragSelectedKeyboard: (e, t) => `\u{627}\u{636}\u{63A}\u{637} \u{639}\u{644}\u{649} Enter \u{644}\u{644}\u{633}\u{62D}\u{628} ${t.plural(e.count, {
		one: "عدد العناصر المختارة",
		other: "عدد العناصر المختارة"
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `\u{627}\u{636}\u{63A}\u{637} \u{639}\u{644}\u{649} \u{645}\u{641}\u{62A}\u{627}\u{62D}\u{64A} Alt + Enter \u{644}\u{644}\u{633}\u{62D}\u{628} ${t.plural(e.count, {
		one: "عدد العناصر المختارة",
		other: "عدد العناصر المختارة"
	})}.`,
	dragSelectedLongPress: (e, t) => `\u{627}\u{636}\u{63A}\u{637} \u{628}\u{627}\u{633}\u{62A}\u{645}\u{631}\u{627}\u{631} \u{644}\u{644}\u{633}\u{62D}\u{628} ${t.plural(e.count, {
		one: "عدد العناصر المختارة",
		other: "عدد العناصر المختارة"
	})}.`,
	dragStartedKeyboard: "بدأ السحب. اضغط Tab للانتقال إلى موضع الإفلات، ثم اضغط Enter للإفلات، أو اضغط Escape للإلغاء.",
	dragStartedTouch: "بدأ السحب. انتقل إلى موضع الإفلات، ثم اضغط مرتين للإفلات.",
	dragStartedVirtual: "بدأ السحب. انتقل إلى مكان الإفلات، ثم انقر أو اضغط Enter للإفلات.",
	dropCanceled: "تم إلغاء الإفلات.",
	dropComplete: "اكتمل الإفلات.",
	dropDescriptionKeyboard: "اضغط Enter للإفلات. اضغط Escape لإلغاء السحب.",
	dropDescriptionTouch: "اضغط مرتين للإفلات.",
	dropDescriptionVirtual: "انقر للإفلات.",
	dropIndicator: "مؤشر الإفلات",
	dropOnItem: (e) => `\u{625}\u{641}\u{644}\u{627}\u{62A} ${e.itemText}`,
	dropOnRoot: "الإفلات",
	endDragKeyboard: "السحب. اضغط Enter لإلغاء السحب.",
	endDragTouch: "السحب. اضغط مرتين لإلغاء السحب.",
	endDragVirtual: "السحب. انقر لإلغاء السحب.",
	insertAfter: (e) => `\u{623}\u{62F}\u{62E}\u{644} \u{628}\u{639}\u{62F} ${e.itemText}`,
	insertBefore: (e) => `\u{623}\u{62F}\u{62E}\u{644} \u{642}\u{628}\u{644} ${e.itemText}`,
	insertBetween: (e) => `\u{623}\u{62F}\u{62E}\u{644} \u{628}\u{64A}\u{646} ${e.beforeItemText} \u{648} ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/bg-BG.mjs
var tc = {};
tc = {
	dragDescriptionKeyboard: "Натиснете „Enter“, за да започнете да плъзгате.",
	dragDescriptionKeyboardAlt: "Натиснете Alt + Enter, за да започнете да плъзгате.",
	dragDescriptionLongPress: "Натиснете продължително, за да започнете да плъзгате.",
	dragDescriptionTouch: "Натиснете двукратно, за да започнете да плъзгате.",
	dragDescriptionVirtual: "Щракнете, за да започнете да плъзгате.",
	dragItem: (e) => `\u{41F}\u{43B}\u{44A}\u{437}\u{43D}\u{438} ${e.itemText}`,
	dragSelectedItems: (e, t) => `\u{41F}\u{43B}\u{44A}\u{437}\u{43D}\u{438} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{430}`
	})}`,
	dragSelectedKeyboard: (e, t) => `\u{41D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{435}\u{442}\u{435} Enter, \u{437}\u{430} \u{434}\u{430} \u{43F}\u{43B}\u{44A}\u{437}\u{43D}\u{435}\u{442}\u{435} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `\u{41D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{435}\u{442}\u{435} Alt \u{438} Enter, \u{437}\u{430} \u{434}\u{430} \u{43F}\u{43B}\u{44A}\u{437}\u{43D}\u{435}\u{442}\u{435} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}`
	})}.`,
	dragSelectedLongPress: (e, t) => `\u{41D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{435}\u{442}\u{435} \u{43F}\u{440}\u{43E}\u{434}\u{44A}\u{43B}\u{436}\u{438}\u{442}\u{435}\u{43B}\u{43D}\u{43E}, \u{437}\u{430} \u{434}\u{430} \u{43F}\u{43B}\u{44A}\u{437}\u{43D}\u{435}\u{442}\u{435} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}`
	})}.`,
	dragStartedKeyboard: "Започна плъзгане. Натиснете „Tab“, за да се придвижите до целта, след което натиснете „Enter“ за пускане или натиснете „Escape“ за отмяна.",
	dragStartedTouch: "Започна плъзгане. Придвижете се до целта, след което натиснете двукратно, за да пуснете.",
	dragStartedVirtual: "Започна плъзгане. Придвижете се до целта, след което щракнете или натиснете „Enter“ за пускане.",
	dropCanceled: "Пускането е отменено.",
	dropComplete: "Пускането е завършено.",
	dropDescriptionKeyboard: "Натиснете „Enter“ за пускане. Натиснете „Escape“ за отмяна на плъзгането.",
	dropDescriptionTouch: "Натиснете двукратно за пускане.",
	dropDescriptionVirtual: "Щракнете за пускане.",
	dropIndicator: "индикатор за пускане",
	dropOnItem: (e) => `\u{41F}\u{443}\u{441}\u{43D}\u{438} \u{432}\u{44A}\u{440}\u{445}\u{443} ${e.itemText}`,
	dropOnRoot: "Пусни върху",
	endDragKeyboard: "Плъзгане. Натиснете „Enter“ за отмяна на плъзгането.",
	endDragTouch: "Плъзгане. Натиснете двукратно за отмяна на плъзгането.",
	endDragVirtual: "Плъзгане. Щракнете за отмяна.",
	insertAfter: (e) => `\u{412}\u{43C}\u{44A}\u{43A}\u{43D}\u{438} \u{441}\u{43B}\u{435}\u{434} ${e.itemText}`,
	insertBefore: (e) => `\u{412}\u{43C}\u{44A}\u{43A}\u{43D}\u{438} \u{43F}\u{440}\u{435}\u{434}\u{438} ${e.itemText}`,
	insertBetween: (e) => `\u{412}\u{43C}\u{44A}\u{43A}\u{43D}\u{438} \u{43C}\u{435}\u{436}\u{434}\u{443} ${e.beforeItemText} \u{438} ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/cs-CZ.mjs
var nc = {};
nc = {
	dragDescriptionKeyboard: "Stisknutím klávesy Enter začnete s přetahováním.",
	dragDescriptionKeyboardAlt: "Stisknutím Alt + Enter zahájíte přetahování.",
	dragDescriptionLongPress: "Dlouhým stisknutím zahájíte přetahování.",
	dragDescriptionTouch: "Poklepáním začnete s přetahováním.",
	dragDescriptionVirtual: "Kliknutím začnete s přetahováním.",
	dragItem: (e) => `P\u{159}et\xe1hnout ${e.itemText}`,
	dragSelectedItems: (e, t) => `P\u{159}et\xe1hnout ${t.plural(e.count, {
		one: () => `${t.number(e.count)} vybranou polo\u{17E}ku`,
		few: () => `${t.number(e.count)} vybran\xe9 polo\u{17E}ky`,
		other: () => `${t.number(e.count)} vybran\xfdch polo\u{17E}ek`
	})}`,
	dragSelectedKeyboard: (e, t) => `Stisknut\xedm kl\xe1vesy Enter p\u{159}et\xe1hn\u{11B}te ${t.plural(e.count, {
		one: () => `${t.number(e.count)} vybranou polo\u{17E}ku`,
		other: () => `${t.number(e.count)} vybran\xe9 polo\u{17E}ky`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Stisknut\xedm Alt + Enter p\u{159}et\xe1hn\u{11B}te ${t.plural(e.count, {
		one: () => `${t.number(e.count)} vybranou polo\u{17E}ku`,
		other: () => `${t.number(e.count)} vybran\xe9 polo\u{17E}ky`
	})}.`,
	dragSelectedLongPress: (e, t) => `Dlouh\xfdm stisknut\xedm p\u{159}et\xe1hnete ${t.plural(e.count, {
		one: () => `${t.number(e.count)} vybranou polo\u{17E}ku`,
		other: () => `${t.number(e.count)} vybran\xe9 polo\u{17E}ky`
	})}.`,
	dragStartedKeyboard: "Začněte s přetahováním. Po stisknutí klávesy Tab najděte požadovaný cíl a stisknutím klávesy Enter přetažení dokončete nebo stisknutím klávesy Esc akci zrušte.",
	dragStartedTouch: "Začněte s přetahováním. Najděte požadovaný cíl a poklepáním přetažení dokončete.",
	dragStartedVirtual: "Začněte s přetahováním. Najděte požadovaný cíl a kliknutím nebo stisknutím klávesy Enter přetažení dokončete.",
	dropCanceled: "Přetažení bylo zrušeno.",
	dropComplete: "Přetažení bylo dokončeno.",
	dropDescriptionKeyboard: "Stisknutím klávesy Enter přetažení dokončete nebo stisknutím klávesy Esc akci zrušte.",
	dropDescriptionTouch: "Poklepáním přetažení dokončete.",
	dropDescriptionVirtual: "Kliknutím objekt přetáhněte.",
	dropIndicator: "indikátor přetažení",
	dropOnItem: (e) => `P\u{159}et\xe1hnout na ${e.itemText}`,
	dropOnRoot: "Přetáhnout na",
	endDragKeyboard: "Probíhá přetahování. Stisknutím klávesy Enter přetažení zrušíte.",
	endDragTouch: "Probíhá přetahování. Poklepáním přetažení zrušíte.",
	endDragVirtual: "Probíhá přetahování. Kliknutím přetažení zrušíte.",
	insertAfter: (e) => `Vlo\u{17E}it za ${e.itemText}`,
	insertBefore: (e) => `Vlo\u{17E}it p\u{159}ed ${e.itemText}`,
	insertBetween: (e) => `Vlo\u{17E}it mezi ${e.beforeItemText} a ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/da-DK.mjs
var rc = {};
rc = {
	dragDescriptionKeyboard: "Tryk på Enter for at starte med at trække.",
	dragDescriptionKeyboardAlt: "Tryk på Alt + Enter for at starte med at trække.",
	dragDescriptionLongPress: "Tryk længe for at starte med at trække.",
	dragDescriptionTouch: "Dobbelttryk for at starte med at trække.",
	dragDescriptionVirtual: "Klik for at starte med at trække.",
	dragItem: (e) => `Tr\xe6k ${e.itemText}`,
	dragSelectedItems: (e, t) => `Tr\xe6k ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valgt element`,
		other: () => `${t.number(e.count)} valgte elementer`
	})}`,
	dragSelectedKeyboard: (e, t) => `Tryk p\xe5 Enter for at tr\xe6kke ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valgte element`,
		other: () => `${t.number(e.count)} valgte elementer`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Tryk p\xe5 Alt + Enter for at tr\xe6kke ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valgte element`,
		other: () => `${t.number(e.count)} valgte elementer`
	})}.`,
	dragSelectedLongPress: (e, t) => `Tryk l\xe6nge for at tr\xe6kke ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valgte element`,
		other: () => `${t.number(e.count)} valgte elementer`
	})}.`,
	dragStartedKeyboard: "Startet med at trække. Tryk på Tab for at gå til et slip-mål, tryk derefter på Enter for at slippe, eller tryk på Escape for at annullere.",
	dragStartedTouch: "Startet med at trække. Gå til et slip-mål, og dobbelttryk derefter for at slippe.",
	dragStartedVirtual: "Startet med at trække. Gå til et slip-mål, og klik eller tryk derefter på enter for at slippe.",
	dropCanceled: "Slip annulleret.",
	dropComplete: "Slip fuldført.",
	dropDescriptionKeyboard: "Tryk på Enter for at slippe. Tryk på Escape for at annullere trækning.",
	dropDescriptionTouch: "Dobbelttryk for at slippe.",
	dropDescriptionVirtual: "Klik for at slippe.",
	dropIndicator: "slip-indikator",
	dropOnItem: (e) => `Slip p\xe5 ${e.itemText}`,
	dropOnRoot: "Slip på",
	endDragKeyboard: "Trækning. Tryk på enter for at annullere træk.",
	endDragTouch: "Trækning. Dobbelttryk for at annullere træk.",
	endDragVirtual: "Trækning. Klik for at annullere trækning.",
	insertAfter: (e) => `Inds\xe6t efter ${e.itemText}`,
	insertBefore: (e) => `Inds\xe6t f\xf8r ${e.itemText}`,
	insertBetween: (e) => `Inds\xe6t mellem ${e.beforeItemText} og ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/de-DE.mjs
var ic = {};
ic = {
	dragDescriptionKeyboard: "Drücken Sie die Eingabetaste, um den Ziehvorgang zu starten.",
	dragDescriptionKeyboardAlt: "Alt + Eingabe drücken, um den Ziehvorgang zu starten.",
	dragDescriptionLongPress: "Lang drücken, um mit dem Ziehen zu beginnen.",
	dragDescriptionTouch: "Tippen Sie doppelt, um den Ziehvorgang zu starten.",
	dragDescriptionVirtual: "Zum Starten des Ziehvorgangs klicken.",
	dragItem: (e) => `${e.itemText} ziehen`,
	dragSelectedItems: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)} ausgew\xe4hltes Objekt`,
		other: () => `${t.number(e.count)} ausgew\xe4hlte Objekte`
	})} ziehen`,
	dragSelectedKeyboard: (e, t) => `Eingabetaste dr\xfccken, um ${t.plural(e.count, {
		one: () => `${t.number(e.count)} ausgew\xe4hltes Element`,
		other: () => `${t.number(e.count)} ausgew\xe4hlte Elemente`
	})} zu ziehen.`,
	dragSelectedKeyboardAlt: (e, t) => `Alt + Eingabetaste dr\xfccken, um ${t.plural(e.count, {
		one: () => `${t.number(e.count)} ausgew\xe4hltes Element`,
		other: () => `${t.number(e.count)} ausgew\xe4hlte Elemente`
	})} zu ziehen.`,
	dragSelectedLongPress: (e, t) => `Lang dr\xfccken, um ${t.plural(e.count, {
		one: () => `${t.number(e.count)} ausgew\xe4hltes Element`,
		other: () => `${t.number(e.count)} ausgew\xe4hlte Elemente`
	})} zu ziehen.`,
	dragStartedKeyboard: "Ziehvorgang gestartet. Drücken Sie die Tabulatortaste, um zu einem Ablegeziel zu navigieren und drücken Sie dann die Eingabetaste, um das Objekt abzulegen, oder Escape, um den Vorgang abzubrechen.",
	dragStartedTouch: "Ziehvorgang gestartet. Navigieren Sie zu einem Ablegeziel und tippen Sie doppelt, um das Objekt abzulegen.",
	dragStartedVirtual: "Ziehvorgang gestartet. Navigieren Sie zu einem Ablegeziel und klicken Sie oder drücken Sie die Eingabetaste, um das Objekt abzulegen.",
	dropCanceled: "Ablegen abgebrochen.",
	dropComplete: "Ablegen abgeschlossen.",
	dropDescriptionKeyboard: "Drücken Sie die Eingabetaste, um das Objekt abzulegen. Drücken Sie Escape, um den Vorgang abzubrechen.",
	dropDescriptionTouch: "Tippen Sie doppelt, um das Objekt abzulegen.",
	dropDescriptionVirtual: "Zum Ablegen klicken.",
	dropIndicator: "Ablegeanzeiger",
	dropOnItem: (e) => `Auf ${e.itemText} ablegen`,
	dropOnRoot: "Ablegen auf",
	endDragKeyboard: "Ziehvorgang läuft. Drücken Sie die Eingabetaste, um den Vorgang abzubrechen.",
	endDragTouch: "Ziehvorgang läuft. Tippen Sie doppelt, um den Vorgang abzubrechen.",
	endDragVirtual: "Ziehvorgang läuft. Klicken Sie, um den Vorgang abzubrechen.",
	insertAfter: (e) => `Nach ${e.itemText} einf\xfcgen`,
	insertBefore: (e) => `Vor ${e.itemText} einf\xfcgen`,
	insertBetween: (e) => `Zwischen ${e.beforeItemText} und ${e.afterItemText} einf\xfcgen`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/el-GR.mjs
var ac = {};
ac = {
	dragDescriptionKeyboard: "Πατήστε Enter για έναρξη της μεταφοράς.",
	dragDescriptionKeyboardAlt: "Πατήστε Alt + Enter για έναρξη της μεταφοράς.",
	dragDescriptionLongPress: "Πατήστε παρατεταμένα για να ξεκινήσετε τη μεταφορά.",
	dragDescriptionTouch: "Πατήστε δύο φορές για έναρξη της μεταφοράς.",
	dragDescriptionVirtual: "Κάντε κλικ για να ξεκινήσετε τη μεταφορά.",
	dragItem: (e) => `\u{39C}\u{3B5}\u{3C4}\u{3B1}\u{3C6}\u{3BF}\u{3C1}\u{3AC} ${e.itemText}`,
	dragSelectedItems: (e, t) => `\u{39C}\u{3B5}\u{3C4}\u{3B1}\u{3C6}\u{3BF}\u{3C1}\u{3AC} \u{3C3}\u{3B5} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3BF} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3BF}`,
		other: () => `${t.number(e.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B1} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`
	})}`,
	dragSelectedKeyboard: (e, t) => `\u{3A0}\u{3B1}\u{3C4}\u{3AE}\u{3C3}\u{3C4}\u{3B5} Enter \u{3B3}\u{3B9}\u{3B1} \u{3BD}\u{3B1} \u{3C3}\u{3CD}\u{3C1}\u{3B5}\u{3C4}\u{3B5} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3BF} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3BF}`,
		other: () => `${t.number(e.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B1} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `\u{3A0}\u{3B1}\u{3C4}\u{3AE}\u{3C3}\u{3C4}\u{3B5} Alt + Enter \u{3B3}\u{3B9}\u{3B1} \u{3BD}\u{3B1} \u{3C3}\u{3CD}\u{3C1}\u{3B5}\u{3C4}\u{3B5} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3BF} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3BF}`,
		other: () => `${t.number(e.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B1} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`
	})}.`,
	dragSelectedLongPress: (e, t) => `\u{3A0}\u{3B1}\u{3C4}\u{3AE}\u{3C3}\u{3C4}\u{3B5} \u{3C0}\u{3B1}\u{3C1}\u{3B1}\u{3C4}\u{3B5}\u{3C4}\u{3B1}\u{3BC}\u{3AD}\u{3BD}\u{3B1} \u{3B3}\u{3B9}\u{3B1} \u{3BD}\u{3B1} \u{3C3}\u{3CD}\u{3C1}\u{3B5}\u{3C4}\u{3B5} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3BF} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3BF}`,
		other: () => `${t.number(e.count)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B1} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`
	})}.`,
	dragStartedKeyboard: "Η μεταφορά ξεκίνησε. Πατήστε το πλήκτρο Tab για να μεταβείτε σε έναν προορισμό απόθεσης και, στη συνέχεια, πατήστε Enter για απόθεση ή πατήστε Escape για ακύρωση.",
	dragStartedTouch: "Η μεταφορά ξεκίνησε. Μεταβείτε σε έναν προορισμό απόθεσης και, στη συνέχεια, πατήστε δύο φορές για απόθεση.",
	dragStartedVirtual: "Η μεταφορά ξεκίνησε. Μεταβείτε σε έναν προορισμό απόθεσης και, στη συνέχεια, κάντε κλικ ή πατήστε Enter για απόθεση.",
	dropCanceled: "Η απόθεση ακυρώθηκε.",
	dropComplete: "Η απόθεση ολοκληρώθηκε.",
	dropDescriptionKeyboard: "Πατήστε Enter για απόθεση. Πατήστε Escape για ακύρωση της μεταφοράς.",
	dropDescriptionTouch: "Πατήστε δύο φορές για απόθεση.",
	dropDescriptionVirtual: "Κάντε κλικ για απόθεση.",
	dropIndicator: "δείκτης απόθεσης",
	dropOnItem: (e) => `\u{391}\u{3C0}\u{3CC}\u{3B8}\u{3B5}\u{3C3}\u{3B7} \u{3C3}\u{3B5} ${e.itemText}`,
	dropOnRoot: "Απόθεση σε",
	endDragKeyboard: "Μεταφορά σε εξέλιξη. Πατήστε Enter για ακύρωση της μεταφοράς.",
	endDragTouch: "Μεταφορά σε εξέλιξη. Πατήστε δύο φορές για ακύρωση της μεταφοράς.",
	endDragVirtual: "Μεταφορά σε εξέλιξη. Κάντε κλικ για ακύρωση της μεταφοράς.",
	insertAfter: (e) => `\u{395}\u{3B9}\u{3C3}\u{3B1}\u{3B3}\u{3C9}\u{3B3}\u{3AE} \u{3BC}\u{3B5}\u{3C4}\u{3AC} \u{3B1}\u{3C0}\u{3CC} ${e.itemText}`,
	insertBefore: (e) => `\u{395}\u{3B9}\u{3C3}\u{3B1}\u{3B3}\u{3C9}\u{3B3}\u{3AE} \u{3C0}\u{3C1}\u{3B9}\u{3BD} \u{3B1}\u{3C0}\u{3CC} ${e.itemText}`,
	insertBetween: (e) => `\u{395}\u{3B9}\u{3C3}\u{3B1}\u{3B3}\u{3C9}\u{3B3}\u{3AE} \u{3BC}\u{3B5}\u{3C4}\u{3B1}\u{3BE}\u{3CD} ${e.beforeItemText} \u{3BA}\u{3B1}\u{3B9} ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/en-US.mjs
var oc = {};
oc = {
	dragItem: (e) => `Drag ${e.itemText}`,
	dragSelectedItems: (e, t) => `Drag ${t.plural(e.count, {
		one: () => `${t.number(e.count)} selected item`,
		other: () => `${t.number(e.count)} selected items`
	})}`,
	dragDescriptionKeyboard: "Press Enter to start dragging.",
	dragDescriptionKeyboardAlt: "Press Alt + Enter to start dragging.",
	dragDescriptionTouch: "Double tap to start dragging.",
	dragDescriptionVirtual: "Click to start dragging.",
	dragDescriptionLongPress: "Long press to start dragging.",
	dragSelectedKeyboard: (e, t) => `Press Enter to drag ${t.plural(e.count, {
		one: () => `${t.number(e.count)} selected item`,
		other: () => `${t.number(e.count)} selected items`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Press Alt + Enter to drag ${t.plural(e.count, {
		one: () => `${t.number(e.count)} selected item`,
		other: () => `${t.number(e.count)} selected items`
	})}.`,
	dragSelectedLongPress: (e, t) => `Long press to drag ${t.plural(e.count, {
		one: () => `${t.number(e.count)} selected item`,
		other: () => `${t.number(e.count)} selected items`
	})}.`,
	dragStartedKeyboard: "Started dragging. Press Tab to navigate to a drop target, then press Enter to drop, or press Escape to cancel.",
	dragStartedTouch: "Started dragging. Navigate to a drop target, then double tap to drop.",
	dragStartedVirtual: "Started dragging. Navigate to a drop target, then click or press Enter to drop.",
	endDragKeyboard: "Dragging. Press Enter to cancel drag.",
	endDragTouch: "Dragging. Double tap to cancel drag.",
	endDragVirtual: "Dragging. Click to cancel drag.",
	dropDescriptionKeyboard: "Press Enter to drop. Press Escape to cancel drag.",
	dropDescriptionTouch: "Double tap to drop.",
	dropDescriptionVirtual: "Click to drop.",
	dropCanceled: "Drop canceled.",
	dropComplete: "Drop complete.",
	dropIndicator: "drop indicator",
	dropOnRoot: "Drop on",
	dropOnItem: (e) => `Drop on ${e.itemText}`,
	insertBefore: (e) => `Insert before ${e.itemText}`,
	insertBetween: (e) => `Insert between ${e.beforeItemText} and ${e.afterItemText}`,
	insertAfter: (e) => `Insert after ${e.itemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/es-ES.mjs
var sc = {};
sc = {
	dragDescriptionKeyboard: "Pulse Intro para empezar a arrastrar.",
	dragDescriptionKeyboardAlt: "Pulse Intro para empezar a arrastrar.",
	dragDescriptionLongPress: "Mantenga pulsado para comenzar a arrastrar.",
	dragDescriptionTouch: "Pulse dos veces para iniciar el arrastre.",
	dragDescriptionVirtual: "Haga clic para iniciar el arrastre.",
	dragItem: (e) => `Arrastrar ${e.itemText}`,
	dragSelectedItems: (e, t) => `Arrastrar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} elemento seleccionado`,
		other: () => `${t.number(e.count)} elementos seleccionados`
	})}`,
	dragSelectedKeyboard: (e, t) => `Pulse Intro para arrastrar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} elemento seleccionado`,
		other: () => `${t.number(e.count)} elementos seleccionados`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Pulse Alt + Intro para arrastrar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} elemento seleccionado`,
		other: () => `${t.number(e.count)} elementos seleccionados`
	})}.`,
	dragSelectedLongPress: (e, t) => `Mantenga pulsado para arrastrar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} elemento seleccionado`,
		other: () => `${t.number(e.count)} elementos seleccionados`
	})}.`,
	dragStartedKeyboard: "Se ha empezado a arrastrar. Pulse el tabulador para ir al destino donde se vaya a colocar y, a continuación, pulse Intro para soltar, o pulse Escape para cancelar.",
	dragStartedTouch: "Se ha empezado a arrastrar. Vaya al destino donde se vaya a colocar y, a continuación, pulse dos veces para soltar.",
	dragStartedVirtual: "Se ha empezado a arrastrar. Vaya al destino donde se vaya a colocar y, a continuación, haga clic o pulse Intro para soltar.",
	dropCanceled: "Se ha cancelado la colocación.",
	dropComplete: "Colocación finalizada.",
	dropDescriptionKeyboard: "Pulse Intro para soltar. Pulse Escape para cancelar el arrastre.",
	dropDescriptionTouch: "Pulse dos veces para soltar.",
	dropDescriptionVirtual: "Haga clic para soltar.",
	dropIndicator: "indicador de colocación",
	dropOnItem: (e) => `Soltar en ${e.itemText}`,
	dropOnRoot: "Soltar en",
	endDragKeyboard: "Arrastrando. Pulse Intro para cancelar el arrastre.",
	endDragTouch: "Arrastrando. Pulse dos veces para cancelar el arrastre.",
	endDragVirtual: "Arrastrando. Haga clic para cancelar el arrastre.",
	insertAfter: (e) => `Insertar despu\xe9s de ${e.itemText}`,
	insertBefore: (e) => `Insertar antes de ${e.itemText}`,
	insertBetween: (e) => `Insertar entre ${e.beforeItemText} y ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/et-EE.mjs
var cc = {};
cc = {
	dragDescriptionKeyboard: "Lohistamise alustamiseks vajutage klahvi Enter.",
	dragDescriptionKeyboardAlt: "Lohistamise alustamiseks vajutage klahvikombinatsiooni Alt + Enter.",
	dragDescriptionLongPress: "Vajutage pikalt lohistamise alustamiseks.",
	dragDescriptionTouch: "Topeltpuudutage lohistamise alustamiseks.",
	dragDescriptionVirtual: "Klõpsake lohistamise alustamiseks.",
	dragItem: (e) => `Lohista ${e.itemText}`,
	dragSelectedItems: (e, t) => `Lohista ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valitud \xfcksust`,
		other: () => `${t.number(e.count)} valitud \xfcksust`
	})}`,
	dragSelectedKeyboard: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)} valitud \xfcksuse`,
		other: () => `${t.number(e.count)} valitud \xfcksuse`
	})} lohistamiseks vajutage sisestusklahvi Enter.`,
	dragSelectedKeyboardAlt: (e, t) => `Lohistamiseks vajutage klahvikombinatsiooni Alt + Enter ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valitud \xfcksuse`,
		other: () => `${t.number(e.count)} valitud \xfcksuse`
	})} jaoks.`,
	dragSelectedLongPress: (e, t) => `Pikk vajutus ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valitud \xfcksuse`,
		other: () => `${t.number(e.count)} valitud \xfcksuse`
	})} lohistamiseks.`,
	dragStartedKeyboard: "Alustati lohistamist. Kukutamise sihtmärgi juurde navigeerimiseks vajutage klahvi Tab, seejärel vajutage kukutamiseks klahvi Enter või loobumiseks klahvi Escape.",
	dragStartedTouch: "Alustati lohistamist. Navigeerige kukutamise sihtmärgi juurde ja topeltpuudutage kukutamiseks.",
	dragStartedVirtual: "Alustati lohistamist. Navigeerige kukutamise sihtmärgi juurde ja kukutamiseks klõpsake või vajutage klahvi Enter.",
	dropCanceled: "Lohistamisest loobuti.",
	dropComplete: "Lohistamine on tehtud.",
	dropDescriptionKeyboard: "Kukutamiseks vajutage klahvi Enter. Lohistamisest loobumiseks vajutage klahvi Escape.",
	dropDescriptionTouch: "Kukutamiseks topeltpuudutage.",
	dropDescriptionVirtual: "Kukutamiseks klõpsake.",
	dropIndicator: "lohistamise indikaator",
	dropOnItem: (e) => `Kukuta asukohta ${e.itemText}`,
	dropOnRoot: "Kukuta asukohta",
	endDragKeyboard: "Lohistamine. Lohistamisest loobumiseks vajutage klahvi Enter.",
	endDragTouch: "Lohistamine. Lohistamisest loobumiseks topeltpuudutage.",
	endDragVirtual: "Lohistamine. Lohistamisest loobumiseks klõpsake.",
	insertAfter: (e) => `Sisesta ${e.itemText} j\xe4rele`,
	insertBefore: (e) => `Sisesta ${e.itemText} ette`,
	insertBetween: (e) => `Sisesta ${e.beforeItemText} ja ${e.afterItemText} vahele`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/fi-FI.mjs
var lc = {};
lc = {
	dragDescriptionKeyboard: "Aloita vetäminen painamalla Enter-näppäintä.",
	dragDescriptionKeyboardAlt: "Aloita vetäminen painamalla Alt + Enter -näppäinyhdistelmää.",
	dragDescriptionLongPress: "Aloita vetäminen pitämällä painettuna.",
	dragDescriptionTouch: "Aloita vetäminen kaksoisnapauttamalla.",
	dragDescriptionVirtual: "Aloita vetäminen napsauttamalla.",
	dragItem: (e) => `Ved\xe4 kohdetta ${e.itemText}`,
	dragSelectedItems: (e, t) => `Ved\xe4 ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valittua kohdetta`,
		other: () => `${t.number(e.count)} valittua kohdetta`
	})}`,
	dragSelectedKeyboard: (e, t) => `Ved\xe4 painamalla Enter ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valittu kohde`,
		other: () => `${t.number(e.count)} valittua kohdetta`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Ved\xe4 painamalla Alt + Enter ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valittu kohde`,
		other: () => `${t.number(e.count)} valittua kohdetta`
	})}.`,
	dragSelectedLongPress: (e, t) => `Ved\xe4 pit\xe4m\xe4ll\xe4 painettuna ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valittu kohde`,
		other: () => `${t.number(e.count)} valittua kohdetta`
	})}.`,
	dragStartedKeyboard: "Vetäminen aloitettu. Siirry pudotuskohteeseen painamalla sarkainnäppäintä ja sitten pudota painamalla Enter-näppäintä tai peruuta painamalla Escape-näppäintä.",
	dragStartedTouch: "Vetäminen aloitettu. Siirry pudotuskohteeseen ja pudota kaksoisnapauttamalla.",
	dragStartedVirtual: "Vetäminen aloitettu. Siirry pudotuskohteeseen ja pudota napsauttamalla tai painamalla Enter-näppäintä.",
	dropCanceled: "Pudotus peruutettu.",
	dropComplete: "Pudotus suoritettu.",
	dropDescriptionKeyboard: "Pudota painamalla Enter-näppäintä. Peruuta vetäminen painamalla Escape-näppäintä.",
	dropDescriptionTouch: "Pudota kaksoisnapauttamalla.",
	dropDescriptionVirtual: "Pudota napsauttamalla.",
	dropIndicator: "pudotuksen ilmaisin",
	dropOnItem: (e) => `Pudota kohteeseen ${e.itemText}`,
	dropOnRoot: "Pudota kohteeseen",
	endDragKeyboard: "Vedetään. Peruuta vetäminen painamalla Enter-näppäintä.",
	endDragTouch: "Vedetään. Peruuta vetäminen kaksoisnapauttamalla.",
	endDragVirtual: "Vedetään. Peruuta vetäminen napsauttamalla.",
	insertAfter: (e) => `Lis\xe4\xe4 kohteen ${e.itemText} j\xe4lkeen`,
	insertBefore: (e) => `Lis\xe4\xe4 ennen kohdetta ${e.itemText}`,
	insertBetween: (e) => `Lis\xe4\xe4 kohteiden ${e.beforeItemText} ja ${e.afterItemText} v\xe4liin`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/fr-FR.mjs
var uc = {};
uc = {
	dragDescriptionKeyboard: "Appuyez sur Entrée pour commencer le déplacement.",
	dragDescriptionKeyboardAlt: "Appuyez sur Alt\xA0+\xA0Entrée pour commencer à faire glisser.",
	dragDescriptionLongPress: "Appuyez de manière prolongée pour commencer à faire glisser.",
	dragDescriptionTouch: "Touchez deux fois pour commencer le déplacement.",
	dragDescriptionVirtual: "Cliquez pour commencer le déplacement.",
	dragItem: (e) => `D\xe9placer ${e.itemText}`,
	dragSelectedItems: (e, t) => `D\xe9placer ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \xe9l\xe9ment s\xe9lectionn\xe9`,
		other: () => `${t.number(e.count)} \xe9l\xe9ments s\xe9lectionn\xe9s`
	})}`,
	dragSelectedKeyboard: (e, t) => `Appuyez sur Entr\xe9e pour faire glisser ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \xe9l\xe9ment s\xe9lectionn\xe9`,
		other: () => `${t.number(e.count)} \xe9l\xe9ments s\xe9lectionn\xe9s`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Appuyez sur Alt\xa0+\xa0Entr\xe9e pour faire glisser ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \xe9l\xe9ment s\xe9lectionn\xe9`,
		other: () => `${t.number(e.count)} \xe9l\xe9ments s\xe9lectionn\xe9s`
	})}.`,
	dragSelectedLongPress: (e, t) => `Appuyez de mani\xe8re prolong\xe9e pour faire glisser ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \xe9l\xe9ment s\xe9lectionn\xe9`,
		other: () => `${t.number(e.count)} \xe9l\xe9ments s\xe9lectionn\xe9s`
	})}.`,
	dragStartedKeyboard: "Déplacement commencé. Appuyez sur Tabulation pour accéder à une cible de dépôt, puis appuyez sur Entrée pour déposer, ou appuyez sur Échap pour annuler.",
	dragStartedTouch: "Déplacement commencé. Accédez à une cible de dépôt, puis touchez deux fois pour déposer.",
	dragStartedVirtual: "Déplacement commencé. Accédez à une cible de dépôt, puis cliquez ou appuyez sur Entrée pour déposer.",
	dropCanceled: "Dépôt annulé.",
	dropComplete: "Dépôt terminé.",
	dropDescriptionKeyboard: "Appuyez sur Entrée pour déposer. Appuyez sur Échap pour annuler le déplacement.",
	dropDescriptionTouch: "Touchez deux fois pour déposer.",
	dropDescriptionVirtual: "Cliquez pour déposer.",
	dropIndicator: "indicateur de dépôt",
	dropOnItem: (e) => `D\xe9poser sur ${e.itemText}`,
	dropOnRoot: "Déposer sur",
	endDragKeyboard: "Déplacement. Appuyez sur Entrée pour annuler le déplacement.",
	endDragTouch: "Déplacement. Touchez deux fois pour annuler le déplacement.",
	endDragVirtual: "Déplacement. Cliquez pour annuler le déplacement.",
	insertAfter: (e) => `Ins\xe9rer apr\xe8s ${e.itemText}`,
	insertBefore: (e) => `Ins\xe9rer avant ${e.itemText}`,
	insertBetween: (e) => `Ins\xe9rer entre ${e.beforeItemText} et ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/he-IL.mjs
var dc = {};
dc = {
	dragDescriptionKeyboard: "הקש על Enter כדי להתחיל לגרור.",
	dragDescriptionKeyboardAlt: "הקש Alt + Enter כדי להתחיל לגרור.",
	dragDescriptionLongPress: "לחץ לחיצה ארוכה כדי להתחיל לגרור.",
	dragDescriptionTouch: "הקש פעמיים כדי להתחיל בגרירה.",
	dragDescriptionVirtual: "לחץ כדי להתחיל לגרור.",
	dragItem: (e) => `\u{5D2}\u{5E8}\u{5D5}\u{5E8} \u{5D0}\u{5EA} ${e.itemText}`,
	dragSelectedItems: (e, t) => `\u{5D2}\u{5E8}\u{5D5}\u{5E8} ${t.plural(e.count, {
		one: () => `\u{5E4}\u{5E8}\u{5D9}\u{5D8} \u{5E0}\u{5D1}\u{5D7}\u{5E8} ${t.number(e.count)}`,
		other: () => `${t.number(e.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E9}\u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`
	})}`,
	dragSelectedKeyboard: (e, t) => `\u{5D4}\u{5E7}\u{5E9} \u{5E2}\u{5DC} Enter \u{5DB}\u{5D3}\u{5D9} \u{5DC}\u{5D2}\u{5E8}\u{5D5}\u{5E8} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8} \u{5E9}\u{5E0}\u{5D1}\u{5D7}\u{5E8}`,
		other: () => `${t.number(e.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E9}\u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `\u{5D4}\u{5E7}\u{5E9} Alt + Enter \u{5DB}\u{5D3}\u{5D9} \u{5DC}\u{5D2}\u{5E8}\u{5D5}\u{5E8} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8} \u{5E9}\u{5E0}\u{5D1}\u{5D7}\u{5E8}`,
		other: () => `${t.number(e.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E9}\u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`
	})}.`,
	dragSelectedLongPress: (e, t) => `\u{5DC}\u{5D7}\u{5E5} \u{5DC}\u{5D7}\u{5D9}\u{5E6}\u{5D4} \u{5D0}\u{5E8}\u{5D5}\u{5DB}\u{5D4} \u{5DB}\u{5D3}\u{5D9} \u{5DC}\u{5D2}\u{5E8}\u{5D5}\u{5E8} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8} \u{5E9}\u{5E0}\u{5D1}\u{5D7}\u{5E8}`,
		other: () => `${t.number(e.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E9}\u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`
	})}.`,
	dragStartedKeyboard: "התחלת לגרור. הקש על Tab כדי לנווט לנקודת הגרירה ולאחר מכן הקש על Enter כדי לשחרר או על Escape כדי לבטל.",
	dragStartedTouch: "התחלת לגרור. נווט לנקודת השחרור ולאחר מכן הקש פעמיים כדי לשחרר.",
	dragStartedVirtual: "התחלת לגרור. נווט לנקודת השחרור ולאחר מכן לחץ או הקש על Enter כדי לשחרר.",
	dropCanceled: "השחרור בוטל.",
	dropComplete: "השחרור הושלם.",
	dropDescriptionKeyboard: "הקש על Enter כדי לשחרר. הקש על Escape כדי לבטל את הגרירה.",
	dropDescriptionTouch: "הקש פעמיים כדי לשחרר.",
	dropDescriptionVirtual: "לחץ כדי לשחרר.",
	dropIndicator: "מחוון שחרור",
	dropOnItem: (e) => `\u{5E9}\u{5D7}\u{5E8}\u{5E8} \u{5E2}\u{5DC} ${e.itemText}`,
	dropOnRoot: "שחרר על",
	endDragKeyboard: "גורר. הקש על Enter כדי לבטל את הגרירה.",
	endDragTouch: "גורר. הקש פעמיים כדי לבטל את הגרירה.",
	endDragVirtual: "גורר. לחץ כדי לבטל את הגרירה.",
	insertAfter: (e) => `\u{5D4}\u{5D5}\u{5E1}\u{5E3} \u{5D0}\u{5D7}\u{5E8}\u{5D9} ${e.itemText}`,
	insertBefore: (e) => `\u{5D4}\u{5D5}\u{5E1}\u{5E3} \u{5DC}\u{5E4}\u{5E0}\u{5D9} ${e.itemText}`,
	insertBetween: (e) => `\u{5D4}\u{5D5}\u{5E1}\u{5E3} \u{5D1}\u{5D9}\u{5DF} ${e.beforeItemText} \u{5DC}\u{5D1}\u{5D9}\u{5DF} ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/hr-HR.mjs
var fc = {};
fc = {
	dragDescriptionKeyboard: "Pritisnite Enter da biste počeli povlačiti.",
	dragDescriptionKeyboardAlt: "Pritisnite Alt + Enter za početak povlačenja.",
	dragDescriptionLongPress: "Dugo pritisnite za početak povlačenja.",
	dragDescriptionTouch: "Dvaput dodirnite da biste počeli povlačiti.",
	dragDescriptionVirtual: "Kliknite da biste počeli povlačiti.",
	dragItem: (e) => `Povucite stavku ${e.itemText}`,
	dragSelectedItems: (e, t) => `Povucite ${t.plural(e.count, {
		one: () => `${t.number(e.count)} odabranu stavku`,
		other: () => `ovoliko odabranih stavki: ${t.number(e.count)}`
	})}`,
	dragSelectedKeyboard: (e, t) => `Pritisnite Enter za povla\u{10D}enje ${t.plural(e.count, {
		one: () => `${t.number(e.count)} odabrana stavka`,
		other: () => `${t.number(e.count)} odabrane stavke`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Pritisnite Alt + Enter za povla\u{10D}enje ${t.plural(e.count, {
		one: () => `${t.number(e.count)} odabrana stavka`,
		other: () => `${t.number(e.count)} odabrane stavke`
	})}.`,
	dragSelectedLongPress: (e, t) => `Dugo pritisnite za povla\u{10D}enje ${t.plural(e.count, {
		one: () => `${t.number(e.count)} odabrana stavka`,
		other: () => `${t.number(e.count)} odabrane stavke`
	})}.`,
	dragStartedKeyboard: "Počeli ste povlačiti. Pritisnite tipku tabulatora da biste došli do cilja ispuštanja, a zatim Enter da biste ispustili stavku ili Escape da biste prekinuli povlačenje.",
	dragStartedTouch: "Počeli ste povlačiti. Dođite do cilja ispuštanja, a zatim dvaput dodirnite da biste ispustili stavku.",
	dragStartedVirtual: "Počeli ste povlačiti. Dođite do cilja ispuštanja, a zatim kliknite ili pritisnite Enter da biste ispustili stavku.",
	dropCanceled: "Povlačenje je prekinuto.",
	dropComplete: "Ispuštanje je dovršeno.",
	dropDescriptionKeyboard: "Pritisnite Enter da biste ispustili stavku. Pritisnite Escape da biste prekinuli povlačenje.",
	dropDescriptionTouch: "Dvaput dodirnite da biste ispustili stavku.",
	dropDescriptionVirtual: "Kliknite da biste ispustili stavku.",
	dropIndicator: "pokazatelj ispuštanja",
	dropOnItem: (e) => `Ispustite na stavku ${e.itemText}`,
	dropOnRoot: "Ispustite na",
	endDragKeyboard: "Povlačenje. Pritisnite Enter da biste prekinuli povlačenje.",
	endDragTouch: "Povlačenje. Dvaput dodirnite da biste prekinuli povlačenje.",
	endDragVirtual: "Povlačenje. Kliknite da biste prekinuli povlačenje.",
	insertAfter: (e) => `Umetnite iza stavke ${e.itemText}`,
	insertBefore: (e) => `Ispustite ispred stavke ${e.itemText}`,
	insertBetween: (e) => `Umetnite izme\u{111}u stavki ${e.beforeItemText} i ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/hu-HU.mjs
var pc = {};
pc = {
	dragDescriptionKeyboard: "Nyomja le az Enter billentyűt a húzás megkezdéséhez.",
	dragDescriptionKeyboardAlt: "Nyomja le az Alt + Enter billentyűket a húzás megkezdéséhez.",
	dragDescriptionLongPress: "Hosszan nyomja meg a húzás elindításához.",
	dragDescriptionTouch: "Koppintson duplán a húzás megkezdéséhez.",
	dragDescriptionVirtual: "Kattintson a húzás megkezdéséhez.",
	dragItem: (e) => `${e.itemText} h\xfaz\xe1sa`,
	dragSelectedItems: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)} kijel\xf6lt elem`,
		other: () => `${t.number(e.count)} kijel\xf6lt elem`
	})} h\xfaz\xe1sa`,
	dragSelectedKeyboard: (e, t) => `Nyomja meg az Entert ${t.plural(e.count, {
		one: () => `${t.number(e.count)} kijel\xf6lt elem`,
		other: () => `${t.number(e.count)} kijel\xf6lt elem`
	})} h\xfaz\xe1s\xe1hoz.`,
	dragSelectedKeyboardAlt: (e, t) => `Nyomja meg az Alt + Enter billenty\u{171}ket ${t.plural(e.count, {
		one: () => `${t.number(e.count)} kijel\xf6lt elem`,
		other: () => `${t.number(e.count)} kijel\xf6lt elem`
	})} h\xfaz\xe1s\xe1hoz.`,
	dragSelectedLongPress: (e, t) => `Tartsa lenyomva hosszan ${t.plural(e.count, {
		one: () => `${t.number(e.count)} kijel\xf6lt elem`,
		other: () => `${t.number(e.count)} kijel\xf6lt elem`
	})} h\xfaz\xe1s\xe1hoz.`,
	dragStartedKeyboard: "Húzás megkezdve. Nyomja le a Tab billentyűt az elengedési célhoz navigálásához, majd nyomja le az Enter billentyűt az elengedéshez, vagy nyomja le az Escape billentyűt a megszakításhoz.",
	dragStartedTouch: "Húzás megkezdve. Navigáljon egy elengedési célhoz, majd koppintson duplán az elengedéshez.",
	dragStartedVirtual: "Húzás megkezdve. Navigáljon egy elengedési célhoz, majd kattintson vagy nyomja le az Enter billentyűt az elengedéshez.",
	dropCanceled: "Elengedés megszakítva.",
	dropComplete: "Elengedés teljesítve.",
	dropDescriptionKeyboard: "Nyomja le az Enter billentyűt az elengedéshez. Nyomja le az Escape billentyűt a húzás megszakításához.",
	dropDescriptionTouch: "Koppintson duplán az elengedéshez.",
	dropDescriptionVirtual: "Kattintson az elengedéshez.",
	dropIndicator: "elengedésjelző",
	dropOnItem: (e) => `Elenged\xe9s erre: ${e.itemText}`,
	dropOnRoot: "Elengedés erre:",
	endDragKeyboard: "Húzás folyamatban. Nyomja le az Enter billentyűt a húzás megszakításához.",
	endDragTouch: "Húzás folyamatban. Koppintson duplán a húzás megszakításához.",
	endDragVirtual: "Húzás folyamatban. Kattintson a húzás megszakításához.",
	insertAfter: (e) => `Besz\xfar\xe1s ${e.itemText} ut\xe1n`,
	insertBefore: (e) => `Besz\xfar\xe1s ${e.itemText} el\xe9`,
	insertBetween: (e) => `Besz\xfar\xe1s ${e.beforeItemText} \xe9s ${e.afterItemText} k\xf6z\xe9`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/it-IT.mjs
var mc = {};
mc = {
	dragDescriptionKeyboard: "Premi Invio per iniziare a trascinare.",
	dragDescriptionKeyboardAlt: "Premi Alt + Invio per iniziare a trascinare.",
	dragDescriptionLongPress: "Premi a lungo per iniziare a trascinare.",
	dragDescriptionTouch: "Tocca due volte per iniziare a trascinare.",
	dragDescriptionVirtual: "Fai clic per iniziare a trascinare.",
	dragItem: (e) => `Trascina ${e.itemText}`,
	dragSelectedItems: (e, t) => `Trascina ${t.plural(e.count, {
		one: () => `${t.number(e.count)} altro elemento selezionato`,
		other: () => `${t.number(e.count)} altri elementi selezionati`
	})}`,
	dragSelectedKeyboard: (e, t) => `Premi Invio per trascinare ${t.plural(e.count, {
		one: () => `${t.number(e.count)} elemento selezionato`,
		other: () => `${t.number(e.count)} elementi selezionati`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Premi Alt + Invio per trascinare ${t.plural(e.count, {
		one: () => `${t.number(e.count)} elemento selezionato`,
		other: () => `${t.number(e.count)} elementi selezionati`
	})}.`,
	dragSelectedLongPress: (e, t) => `Premi a lungo per trascinare ${t.plural(e.count, {
		one: () => `${t.number(e.count)} elemento selezionato`,
		other: () => `${t.number(e.count)} elementi selezionati`
	})}.`,
	dragStartedKeyboard: "Hai iniziato a trascinare. Premi Tab per arrivare sull’area di destinazione, quindi premi Invio per rilasciare o Esc per annullare.",
	dragStartedTouch: "Hai iniziato a trascinare. Arriva sull’area di destinazione, quindi tocca due volte per rilasciare.",
	dragStartedVirtual: "Hai iniziato a trascinare. Arriva sull’area di destinazione, quindi fai clic o premi Invio per rilasciare.",
	dropCanceled: "Rilascio annullato.",
	dropComplete: "Rilascio completato.",
	dropDescriptionKeyboard: "Premi Invio per rilasciare. Premi Esc per annullare.",
	dropDescriptionTouch: "Tocca due volte per rilasciare.",
	dropDescriptionVirtual: "Fai clic per rilasciare.",
	dropIndicator: "indicatore di rilascio",
	dropOnItem: (e) => `Rilascia su ${e.itemText}`,
	dropOnRoot: "Rilascia su",
	endDragKeyboard: "Trascinamento. Premi Invio per annullare.",
	endDragTouch: "Trascinamento. Tocca due volte per annullare.",
	endDragVirtual: "Trascinamento. Fai clic per annullare.",
	insertAfter: (e) => `Inserisci dopo ${e.itemText}`,
	insertBefore: (e) => `Inserisci prima di ${e.itemText}`,
	insertBetween: (e) => `Inserisci tra ${e.beforeItemText} e ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/ja-JP.mjs
var hc = {};
hc = {
	dragDescriptionKeyboard: "Enter キーを押してドラッグを開始してください。",
	dragDescriptionKeyboardAlt: "Alt+Enter キーを押してドラッグを開始します。",
	dragDescriptionLongPress: "長押ししてドラッグを開始します。",
	dragDescriptionTouch: "ダブルタップしてドラッグを開始します。",
	dragDescriptionVirtual: "クリックしてドラッグを開始します。",
	dragItem: (e) => `${e.itemText} \u{3092}\u{30C9}\u{30E9}\u{30C3}\u{30B0}`,
	dragSelectedItems: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{500B}\u{306E}\u{9078}\u{629E}\u{9805}\u{76EE}`,
		other: () => `${t.number(e.count)} \u{500B}\u{306E}\u{9078}\u{629E}\u{9805}\u{76EE}`
	})} \u{3092}\u{30C9}\u{30E9}\u{30C3}\u{30B0}`,
	dragSelectedKeyboard: (e, t) => `Enter \u{30AD}\u{30FC}\u{3092}\u{62BC}\u{3057}\u{3066}\u{3001}${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{9078}\u{629E}\u{3057}\u{305F}\u{9805}\u{76EE}`,
		other: () => `${t.number(e.count)} \u{9078}\u{629E}\u{3057}\u{305F}\u{9805}\u{76EE}`
	})}\u{3092}\u{30C9}\u{30E9}\u{30C3}\u{30B0}\u{3057}\u{307E}\u{3059}\u{3002}`,
	dragSelectedKeyboardAlt: (e, t) => `Alt+Enter \u{30AD}\u{30FC}\u{3092}\u{62BC}\u{3057}\u{3066}\u{3001}${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{9078}\u{629E}\u{3057}\u{305F}\u{9805}\u{76EE}`,
		other: () => `${t.number(e.count)} \u{9078}\u{629E}\u{3057}\u{305F}\u{9805}\u{76EE}`
	})}\u{3092}\u{30C9}\u{30E9}\u{30C3}\u{30B0}\u{3057}\u{307E}\u{3059}\u{3002}`,
	dragSelectedLongPress: (e, t) => `\u{9577}\u{62BC}\u{3057}\u{3057}\u{3066}\u{3001}${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{9078}\u{629E}\u{3057}\u{305F}\u{9805}\u{76EE}`,
		other: () => `${t.number(e.count)} \u{9078}\u{629E}\u{3057}\u{305F}\u{9805}\u{76EE}`
	})}\u{3092}\u{30C9}\u{30E9}\u{30C3}\u{30B0}\u{3057}\u{307E}\u{3059}\u{3002}`,
	dragStartedKeyboard: "ドラッグを開始します。Tab キーを押してドロップターゲットにいどうし、Enter キーを押してドロップするか、Esc キーを押してキャンセルします。",
	dragStartedTouch: "ドラッグを開始しました。ドロップのターゲットに移動し、ダブルタップしてドロップします。",
	dragStartedVirtual: "ドラッグを開始しました。ドロップのターゲットに移動し、クリックまたは Enter キーを押してドロップします。",
	dropCanceled: "ドロップがキャンセルされました。",
	dropComplete: "ドロップが完了しました。",
	dropDescriptionKeyboard: "Enter キーを押してドロップします。Esc キーを押してドラッグをキャンセルします。",
	dropDescriptionTouch: "ダブルタップしてドロップします。",
	dropDescriptionVirtual: "クリックしてドロップします。",
	dropIndicator: "ドロップインジケーター",
	dropOnItem: (e) => `${e.itemText} \u{306B}\u{30C9}\u{30ED}\u{30C3}\u{30D7}`,
	dropOnRoot: "ドロップ場所",
	endDragKeyboard: "ドラッグしています。Enter キーを押してドラッグをキャンセルします。",
	endDragTouch: "ドラッグしています。ダブルタップしてドラッグをキャンセルします。",
	endDragVirtual: "ドラッグしています。クリックしてドラッグをキャンセルします。",
	insertAfter: (e) => `${e.itemText} \u{306E}\u{5F8C}\u{306B}\u{633F}\u{5165}`,
	insertBefore: (e) => `${e.itemText} \u{306E}\u{524D}\u{306B}\u{633F}\u{5165}`,
	insertBetween: (e) => `${e.beforeItemText} \u{3068} ${e.afterItemText} \u{306E}\u{9593}\u{306B}\u{633F}\u{5165}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/ko-KR.mjs
var gc = {};
gc = {
	dragDescriptionKeyboard: "드래그를 시작하려면 Enter를 누르세요.",
	dragDescriptionKeyboardAlt: "드래그를 시작하려면 Alt + Enter를 누르십시오.",
	dragDescriptionLongPress: "드래그를 시작하려면 길게 누르십시오.",
	dragDescriptionTouch: "드래그를 시작하려면 더블 탭하세요.",
	dragDescriptionVirtual: "드래그를 시작하려면 클릭하세요.",
	dragItem: (e) => `${e.itemText} \u{B4DC}\u{B798}\u{ADF8}`,
	dragSelectedItems: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)}\u{AC1C} \u{C120}\u{D0DD} \u{D56D}\u{BAA9}`,
		other: () => `${t.number(e.count)}\u{AC1C} \u{C120}\u{D0DD} \u{D56D}\u{BAA9}`
	})} \u{B4DC}\u{B798}\u{ADF8}`,
	dragSelectedKeyboard: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)}\u{AC1C} \u{C120}\u{D0DD} \u{D56D}\u{BAA9}`,
		other: () => `${t.number(e.count)}\u{AC1C} \u{C120}\u{D0DD} \u{D56D}\u{BAA9}`
	})}\u{C744} \u{B4DC}\u{B798}\u{ADF8}\u{D558}\u{B824}\u{BA74} Enter\u{B97C} \u{B204}\u{B974}\u{C2ED}\u{C2DC}\u{C624}.`,
	dragSelectedKeyboardAlt: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)}\u{AC1C} \u{C120}\u{D0DD} \u{D56D}\u{BAA9}`,
		other: () => `${t.number(e.count)}\u{AC1C} \u{C120}\u{D0DD} \u{D56D}\u{BAA9}`
	})}\u{C744} \u{B4DC}\u{B798}\u{ADF8}\u{D558}\u{B824}\u{BA74} Alt + Enter\u{B97C} \u{B204}\u{B974}\u{C2ED}\u{C2DC}\u{C624}.`,
	dragSelectedLongPress: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)}\u{AC1C} \u{C120}\u{D0DD} \u{D56D}\u{BAA9}`,
		other: () => `${t.number(e.count)}\u{AC1C} \u{C120}\u{D0DD} \u{D56D}\u{BAA9}`
	})}\u{C744} \u{B4DC}\u{B798}\u{ADF8}\u{D558}\u{B824}\u{BA74} \u{AE38}\u{AC8C} \u{B204}\u{B974}\u{C2ED}\u{C2DC}\u{C624}.`,
	dragStartedKeyboard: "드래그가 시작되었습니다. Tab을 눌러 드롭 대상으로 이동한 다음 Enter를 눌러 드롭하거나 Esc를 눌러 취소하세요.",
	dragStartedTouch: "드래그가 시작되었습니다. 드롭 대상으로 이동한 다음 더블 탭하여 드롭하세요.",
	dragStartedVirtual: "드래그가 시작되었습니다. 드롭 대상으로 이동한 다음 클릭하거나 Enter를 눌러 드롭하세요.",
	dropCanceled: "드롭이 취소되었습니다.",
	dropComplete: "드롭이 완료되었습니다.",
	dropDescriptionKeyboard: "드롭하려면 Enter를 누르세요. 드래그를 취소하려면 Esc를 누르세요.",
	dropDescriptionTouch: "더블 탭하여 드롭하세요.",
	dropDescriptionVirtual: "드롭하려면 클릭하세요.",
	dropIndicator: "드롭 표시기",
	dropOnItem: (e) => `${e.itemText}\u{C5D0} \u{B4DC}\u{B86D}`,
	dropOnRoot: "드롭 대상",
	endDragKeyboard: "드래그 중입니다. 드래그를 취소하려면 Enter를 누르세요.",
	endDragTouch: "드래그 중입니다. 드래그를 취소하려면 더블 탭하세요.",
	endDragVirtual: "드래그 중입니다. 드래그를 취소하려면 클릭하세요.",
	insertAfter: (e) => `${e.itemText} \u{C774}\u{D6C4}\u{C5D0} \u{C0BD}\u{C785}`,
	insertBefore: (e) => `${e.itemText} \u{C774}\u{C804}\u{C5D0} \u{C0BD}\u{C785}`,
	insertBetween: (e) => `${e.beforeItemText} \u{BC0F} ${e.afterItemText} \u{C0AC}\u{C774}\u{C5D0} \u{C0BD}\u{C785}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/lt-LT.mjs
var _c = {};
_c = {
	dragDescriptionKeyboard: "Paspauskite „Enter“, kad pradėtumėte vilkti.",
	dragDescriptionKeyboardAlt: "Paspauskite „Alt + Enter“, kad pradėtumėte vilkti.",
	dragDescriptionLongPress: "Palaikykite nuspaudę, kad pradėtumėte vilkti.",
	dragDescriptionTouch: "Palieskite dukart, kad pradėtumėte vilkti.",
	dragDescriptionVirtual: "Spustelėkite, kad pradėtumėte vilkti.",
	dragItem: (e) => `Vilkti ${e.itemText}`,
	dragSelectedItems: (e, t) => `Vilkti ${t.plural(e.count, {
		one: () => `${t.number(e.count)} pasirinkt\u{105} element\u{105}`,
		other: () => `${t.number(e.count)} pasirinktus elementus`
	})}`,
	dragSelectedKeyboard: (e, t) => `Paspauskite \u{201E}Enter\u{201C}, jei norite nuvilkti ${t.plural(e.count, {
		one: () => `${t.number(e.count)} pasirinkt\u{105} element\u{105}`,
		other: () => `${t.number(e.count)} pasirinktus elementus`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Paspauskite \u{201E}Alt + Enter\u{201C}, kad nuvilktum\u{117}te ${t.plural(e.count, {
		one: () => `${t.number(e.count)} pasirinkt\u{105} element\u{105}`,
		other: () => `${t.number(e.count)} pasirinktus elementus`
	})}.`,
	dragSelectedLongPress: (e, t) => `Nuspaud\u{119} palaikykite, kad nuvilktum\u{117}te ${t.plural(e.count, {
		one: () => `${t.number(e.count)} pasirinkt\u{105} element\u{105}`,
		other: () => `${t.number(e.count)} pasirinktus elementus`
	})}.`,
	dragStartedKeyboard: "Pradėta vilkti. Paspauskite „Tab“, kad pereitumėte į tiesioginę paskirties vietą, tada paspauskite „Enter“, kad numestumėte, arba „Escape“, kad atšauktumėte.",
	dragStartedTouch: "Pradėta vilkti. Eikite į tiesioginę paskirties vietą, tada palieskite dukart, kad numestumėte.",
	dragStartedVirtual: "Pradėta vilkti. Eikite į tiesioginę paskirties vietą ir spustelėkite arba paspauskite „Enter“, kad numestumėte.",
	dropCanceled: "Numetimas atšauktas.",
	dropComplete: "Numesta.",
	dropDescriptionKeyboard: "Paspauskite „Enter“, kad numestumėte. Paspauskite „Escape“, kad atšauktumėte vilkimą.",
	dropDescriptionTouch: "Palieskite dukart, kad numestumėte.",
	dropDescriptionVirtual: "Spustelėkite, kad numestumėte.",
	dropIndicator: "numetimo indikatorius",
	dropOnItem: (e) => `Numesti ant ${e.itemText}`,
	dropOnRoot: "Numesti ant",
	endDragKeyboard: "Velkama. Paspauskite „Enter“, kad atšauktumėte vilkimą.",
	endDragTouch: "Velkama. Spustelėkite dukart, kad atšauktumėte vilkimą.",
	endDragVirtual: "Velkama. Spustelėkite, kad atšauktumėte vilkimą.",
	insertAfter: (e) => `\u{12E}terpti po ${e.itemText}`,
	insertBefore: (e) => `\u{12E}terpti prie\u{161} ${e.itemText}`,
	insertBetween: (e) => `\u{12E}terpti tarp ${e.beforeItemText} ir ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/lv-LV.mjs
var vc = {};
vc = {
	dragDescriptionKeyboard: "Nospiediet Enter, lai sāktu vilkšanu.",
	dragDescriptionKeyboardAlt: "Nospiediet taustiņu kombināciju Alt+Enter, lai sāktu vilkšanu.",
	dragDescriptionLongPress: "Turiet nospiestu, lai sāktu vilkšanu.",
	dragDescriptionTouch: "Veiciet dubultskārienu, lai sāktu vilkšanu.",
	dragDescriptionVirtual: "Noklikšķiniet, lai sāktu vilkšanu.",
	dragItem: (e) => `Velciet ${e.itemText}`,
	dragSelectedItems: (e, t) => `Velciet ${t.plural(e.count, {
		one: () => `${t.number(e.count)} atlas\u{12B}to vienumu`,
		other: () => `${t.number(e.count)} atlas\u{12B}tos vienumus`
	})}`,
	dragSelectedKeyboard: (e, t) => `Nospiediet tausti\u{146}u Enter, lai vilktu ${t.plural(e.count, {
		one: () => `${t.number(e.count)} atlas\u{12B}to vienumu`,
		other: () => `${t.number(e.count)} atlas\u{12B}tos vienumus`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Nospiediet tausti\u{146}u kombin\u{101}ciju Alt+Enter, lai vilktu ${t.plural(e.count, {
		one: () => `${t.number(e.count)} atlas\u{12B}to vienumu`,
		other: () => `${t.number(e.count)} atlas\u{12B}tos vienumus`
	})}.`,
	dragSelectedLongPress: (e, t) => `Turiet nospiestu, lai vilktu ${t.plural(e.count, {
		one: () => `${t.number(e.count)} atlas\u{12B}to vienumu`,
		other: () => `${t.number(e.count)} atlas\u{12B}tos vienumus`
	})}.`,
	dragStartedKeyboard: "Uzsākta vilkšana. Nospiediet taustiņu Tab, lai pārietu uz nomešanas mērķi, pēc tam nospiediet Enter, lai nomestu, vai nospiediet Escape, lai atceltu.",
	dragStartedTouch: "Uzsākta vilkšana. Pārejiet uz nomešanas mērķi, pēc tam veiciet dubultskārienu, lai nomestu.",
	dragStartedVirtual: "Uzsākta vilkšana. Pārejiet uz nomešanas mērķi, pēc tam nospiediet Enter, lai nomestu.",
	dropCanceled: "Nomešana atcelta.",
	dropComplete: "Nomešana pabeigta.",
	dropDescriptionKeyboard: "Nospiediet Enter, lai nomestu. Nospiediet Escape, lai atceltu vilkšanu.",
	dropDescriptionTouch: "Veiciet dubultskārienu, lai nomestu.",
	dropDescriptionVirtual: "Noklikšķiniet, lai nomestu.",
	dropIndicator: "nomešanas indikators",
	dropOnItem: (e) => `Nometiet uz ${e.itemText}`,
	dropOnRoot: "Nometiet uz",
	endDragKeyboard: "Notiek vilkšana. Nospiediet Enter, lai atceltu vilkšanu.",
	endDragTouch: "Notiek vilkšana. Veiciet dubultskārienu, lai atceltu vilkšanu.",
	endDragVirtual: "Notiek vilkšana. Noklikšķiniet, lai atceltu vilkšanu.",
	insertAfter: (e) => `Ievietojiet p\u{113}c ${e.itemText}`,
	insertBefore: (e) => `Ievietojiet pirms ${e.itemText}`,
	insertBetween: (e) => `Ievietojiet starp ${e.beforeItemText} un ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/nb-NO.mjs
var yc = {};
yc = {
	dragDescriptionKeyboard: "Trykk på Enter for å begynne å dra.",
	dragDescriptionKeyboardAlt: "Trykk på Alt + Enter for å begynne å dra.",
	dragDescriptionLongPress: "Trykk lenge for å begynne å dra.",
	dragDescriptionTouch: "Dobbelttrykk for å begynne å dra.",
	dragDescriptionVirtual: "Klikk for å begynne å dra.",
	dragItem: (e) => `Dra ${e.itemText}`,
	dragSelectedItems: (e, t) => `Dra ${t.plural(e.count, {
		one: () => `${t.number(e.count)} merket element`,
		other: () => `${t.number(e.count)} merkede elementer`
	})}`,
	dragSelectedKeyboard: (e, t) => `Trykk Enter for \xe5 dra ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valgt element`,
		other: () => `${t.number(e.count)} valgte elementer`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Trykk p\xe5 Alt + Enter for \xe5 dra ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valgt element`,
		other: () => `${t.number(e.count)} valgte elementer`
	})}.`,
	dragSelectedLongPress: (e, t) => `Trykk lenge for \xe5 dra ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valgt element`,
		other: () => `${t.number(e.count)} valgte elementer`
	})}.`,
	dragStartedKeyboard: "Begynte å dra. Trykk på Tab for å navigere til et mål, og trykk deretter på Enter for å slippe eller på Esc for å avbryte.",
	dragStartedTouch: "Begynte å dra. Naviger til et mål, og dobbelttrykk for å slippe.",
	dragStartedVirtual: "Begynte å dra. Naviger til et mål, og klikk eller trykk på Enter for å slippe.",
	dropCanceled: "Avbrøt slipping.",
	dropComplete: "Slippingen er fullført.",
	dropDescriptionKeyboard: "Trykk på Enter for å slippe. Trykk på Esc hvis du vil avbryte draingen.",
	dropDescriptionTouch: "Dobbelttrykk for å slippe.",
	dropDescriptionVirtual: "Klikk for å slippe.",
	dropIndicator: "slippeindikator",
	dropOnItem: (e) => `Slipp p\xe5 ${e.itemText}`,
	dropOnRoot: "Slipp på",
	endDragKeyboard: "Drar. Trykk på Enter hvis du vil avbryte.",
	endDragTouch: "Drar. Dobbelttrykk hvis du vil avbryte.",
	endDragVirtual: "Drar. Klikk hvis du vil avbryte.",
	insertAfter: (e) => `Sett inn etter ${e.itemText}`,
	insertBefore: (e) => `Sett inn f\xf8r ${e.itemText}`,
	insertBetween: (e) => `Sett inn mellom ${e.beforeItemText} og ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/nl-NL.mjs
var bc = {};
bc = {
	dragDescriptionKeyboard: "Druk op Enter om te slepen.",
	dragDescriptionKeyboardAlt: "Druk op Alt + Enter om te slepen.",
	dragDescriptionLongPress: "Houd lang ingedrukt om te slepen.",
	dragDescriptionTouch: "Dubbeltik om te slepen.",
	dragDescriptionVirtual: "Klik om met slepen te starten.",
	dragItem: (e) => `${e.itemText} slepen`,
	dragSelectedItems: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)} geselecteerd item`,
		other: () => `${t.number(e.count)} geselecteerde items`
	})} slepen`,
	dragSelectedKeyboard: (e, t) => `Druk op Enter om ${t.plural(e.count, {
		one: () => `${t.number(e.count)} geselecteerd item`,
		other: () => `${t.number(e.count)} geselecteerde items`
	})} te slepen.`,
	dragSelectedKeyboardAlt: (e, t) => `Druk op Alt + Enter om ${t.plural(e.count, {
		one: () => `${t.number(e.count)} geselecteerd item`,
		other: () => `${t.number(e.count)} geselecteerde items`
	})} te slepen.`,
	dragSelectedLongPress: (e, t) => `Houd lang ingedrukt om ${t.plural(e.count, {
		one: () => `${t.number(e.count)} geselecteerd item`,
		other: () => `${t.number(e.count)} geselecteerde items`
	})} te slepen.`,
	dragStartedKeyboard: "Begonnen met slepen. Druk op Tab om naar een locatie te gaan. Druk dan op Enter om neer te zetten, of op Esc om te annuleren.",
	dragStartedTouch: "Begonnen met slepen. Ga naar de gewenste locatie en dubbeltik om neer te zetten.",
	dragStartedVirtual: "Begonnen met slepen. Ga naar de gewenste locatie en klik of druk op Enter om neer te zetten.",
	dropCanceled: "Neerzetten geannuleerd.",
	dropComplete: "Neerzetten voltooid.",
	dropDescriptionKeyboard: "Druk op Enter om neer te zetten. Druk op Esc om het slepen te annuleren.",
	dropDescriptionTouch: "Dubbeltik om neer te zetten.",
	dropDescriptionVirtual: "Klik om neer te zetten.",
	dropIndicator: "aanwijzer voor neerzetten",
	dropOnItem: (e) => `Neerzetten op ${e.itemText}`,
	dropOnRoot: "Neerzetten op",
	endDragKeyboard: "Bezig met slepen. Druk op Enter om te annuleren.",
	endDragTouch: "Bezig met slepen. Dubbeltik om te annuleren.",
	endDragVirtual: "Bezig met slepen. Klik om te annuleren.",
	insertAfter: (e) => `Plaatsen na ${e.itemText}`,
	insertBefore: (e) => `Plaatsen v\xf3\xf3r ${e.itemText}`,
	insertBetween: (e) => `Plaatsen tussen ${e.beforeItemText} en ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/pl-PL.mjs
var xc = {};
xc = {
	dragDescriptionKeyboard: "Naciśnij Enter, aby rozpocząć przeciąganie.",
	dragDescriptionKeyboardAlt: "Naciśnij Alt + Enter, aby rozpocząć przeciąganie.",
	dragDescriptionLongPress: "Naciśnij i przytrzymaj, aby rozpocząć przeciąganie.",
	dragDescriptionTouch: "Dotknij dwukrotnie, aby rozpocząć przeciąganie.",
	dragDescriptionVirtual: "Kliknij, aby rozpocząć przeciąganie.",
	dragItem: (e) => `Przeci\u{105}gnij ${e.itemText}`,
	dragSelectedItems: (e, t) => `Przeci\u{105}gnij ${t.plural(e.count, {
		one: () => `${t.number(e.count)} wybrany element`,
		other: () => `${t.number(e.count)} wybranych element\xf3w`
	})}`,
	dragSelectedKeyboard: (e, t) => `Naci\u{15B}nij Enter, aby przeci\u{105}gn\u{105}\u{107} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} wybrany element`,
		other: () => `${t.number(e.count)} wybrane(-ych) elementy(-\xf3w)`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Naci\u{15B}nij Alt + Enter, aby przeci\u{105}gn\u{105}\u{107} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} wybrany element`,
		other: () => `${t.number(e.count)} wybrane(-ych) elementy(-\xf3w)`
	})}.`,
	dragSelectedLongPress: (e, t) => `Naci\u{15B}nij i przytrzymaj, aby przeci\u{105}gn\u{105}\u{107} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} wybrany element`,
		other: () => `${t.number(e.count)} wybrane(-ych) elementy(-\xf3w)`
	})}.`,
	dragStartedKeyboard: "Rozpoczęto przeciąganie. Naciśnij Tab, aby wybrać miejsce docelowe, a następnie naciśnij Enter, aby upuścić, lub Escape, aby anulować.",
	dragStartedTouch: "Rozpoczęto przeciąganie. Wybierz miejsce, w którym chcesz upuścić element, a następnie dotknij dwukrotnie, aby upuścić.F",
	dragStartedVirtual: "Rozpoczęto przeciąganie. Wybierz miejsce, w którym chcesz upuścić element, a następnie kliknij lub naciśnij Enter, aby upuścić.",
	dropCanceled: "Anulowano upuszczenie.",
	dropComplete: "Zakończono upuszczanie.",
	dropDescriptionKeyboard: "Naciśnij Enter, aby upuścić. Naciśnij Escape, aby anulować przeciągnięcie.",
	dropDescriptionTouch: "Dotknij dwukrotnie, aby upuścić.",
	dropDescriptionVirtual: "Kliknij, aby upuścić.",
	dropIndicator: "wskaźnik upuszczenia",
	dropOnItem: (e) => `Upu\u{15B}\u{107} na ${e.itemText}`,
	dropOnRoot: "Upuść",
	endDragKeyboard: "Przeciąganie. Naciśnij Enter, aby anulować przeciągnięcie.",
	endDragTouch: "Przeciąganie. Kliknij dwukrotnie, aby anulować przeciągnięcie.",
	endDragVirtual: "Przeciąganie. Kliknij, aby anulować przeciąganie.",
	insertAfter: (e) => `Umie\u{15B}\u{107} za ${e.itemText}`,
	insertBefore: (e) => `Umie\u{15B}\u{107} przed ${e.itemText}`,
	insertBetween: (e) => `Umie\u{15B}\u{107} mi\u{119}dzy ${e.beforeItemText} i ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/pt-BR.mjs
var Sc = {};
Sc = {
	dragDescriptionKeyboard: "Pressione Enter para começar a arrastar.",
	dragDescriptionKeyboardAlt: "Pressione Alt + Enter para começar a arrastar.",
	dragDescriptionLongPress: "Pressione e segure para começar a arrastar.",
	dragDescriptionTouch: "Toque duas vezes para começar a arrastar.",
	dragDescriptionVirtual: "Clique para começar a arrastar.",
	dragItem: (e) => `Arrastar ${e.itemText}`,
	dragSelectedItems: (e, t) => `Arrastar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} item selecionado`,
		other: () => `${t.number(e.count)} itens selecionados`
	})}`,
	dragSelectedKeyboard: (e, t) => `Pressione Enter para arrastar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} o item selecionado`,
		other: () => `${t.number(e.count)} os itens selecionados`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Pressione Alt + Enter para arrastar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} o item selecionado`,
		other: () => `${t.number(e.count)} os itens selecionados`
	})}.`,
	dragSelectedLongPress: (e, t) => `Pressione e segure para arrastar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} o item selecionado`,
		other: () => `${t.number(e.count)} os itens selecionados`
	})}.`,
	dragStartedKeyboard: "Comece a arrastar. Pressione Tab para navegar até um alvo e, em seguida, pressione Enter para soltar ou pressione Escape para cancelar.",
	dragStartedTouch: "Comece a arrastar. Navegue até um alvo e toque duas vezes para soltar.",
	dragStartedVirtual: "Comece a arrastar. Navegue até um alvo e clique ou pressione Enter para soltar.",
	dropCanceled: "Liberação cancelada.",
	dropComplete: "Liberação concluída.",
	dropDescriptionKeyboard: "Pressione Enter para soltar. Pressione Escape para cancelar.",
	dropDescriptionTouch: "Toque duas vezes para soltar.",
	dropDescriptionVirtual: "Clique para soltar.",
	dropIndicator: "indicador de liberação",
	dropOnItem: (e) => `Soltar em ${e.itemText}`,
	dropOnRoot: "Soltar",
	endDragKeyboard: "Arrastando. Pressione Enter para cancelar.",
	endDragTouch: "Arrastando. Toque duas vezes para cancelar.",
	endDragVirtual: "Arrastando. Clique para cancelar.",
	insertAfter: (e) => `Inserir ap\xf3s ${e.itemText}`,
	insertBefore: (e) => `Inserir antes de ${e.itemText}`,
	insertBetween: (e) => `Inserir entre ${e.beforeItemText} e ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/pt-PT.mjs
var Cc = {};
Cc = {
	dragDescriptionKeyboard: "Prima Enter para iniciar o arrasto.",
	dragDescriptionKeyboardAlt: "Prima Alt + Enter para iniciar o arrasto.",
	dragDescriptionLongPress: "Prima longamente para começar a arrastar.",
	dragDescriptionTouch: "Faça duplo toque para começar a arrastar.",
	dragDescriptionVirtual: "Clique para iniciar o arrasto.",
	dragItem: (e) => `Arrastar ${e.itemText}`,
	dragSelectedItems: (e, t) => `Arrastar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} item selecionado`,
		other: () => `${t.number(e.count)} itens selecionados`
	})}`,
	dragSelectedKeyboard: (e, t) => `Prima Enter para arrastar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} o item selecionado`,
		other: () => `${t.number(e.count)} os itens selecionados`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Prima Alt + Enter para arrastar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} o item selecionado`,
		other: () => `${t.number(e.count)} os itens selecionados`
	})}.`,
	dragSelectedLongPress: (e, t) => `Prima longamente para arrastar ${t.plural(e.count, {
		one: () => `${t.number(e.count)} o item selecionado`,
		other: () => `${t.number(e.count)} os itens selecionados`
	})}.`,
	dragStartedKeyboard: "Arrasto iniciado. Prima a tecla de tabulação para navegar para um destino para largar, e em seguida prima Enter para largar ou prima Escape para cancelar.",
	dragStartedTouch: "Arrasto iniciado. Navegue para um destino para largar, e em seguida faça duplo toque para largar.",
	dragStartedVirtual: "Arrasto iniciado. Navegue para um destino para largar, e em seguida clique ou prima Enter para largar.",
	dropCanceled: "Largar cancelado.",
	dropComplete: "Largar completo.",
	dropDescriptionKeyboard: "Prima Enter para largar. Prima Escape para cancelar o arrasto.",
	dropDescriptionTouch: "Faça duplo toque para largar.",
	dropDescriptionVirtual: "Clique para largar.",
	dropIndicator: "Indicador de largar",
	dropOnItem: (e) => `Largar em ${e.itemText}`,
	dropOnRoot: "Largar em",
	endDragKeyboard: "A arrastar. Prima Enter para cancelar o arrasto.",
	endDragTouch: "A arrastar. Faça duplo toque para cancelar o arrasto.",
	endDragVirtual: "A arrastar. Clique para cancelar o arrasto.",
	insertAfter: (e) => `Inserir depois de ${e.itemText}`,
	insertBefore: (e) => `Inserir antes de ${e.itemText}`,
	insertBetween: (e) => `Inserir entre ${e.beforeItemText} e ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/ro-RO.mjs
var wc = {};
wc = {
	dragDescriptionKeyboard: "Apăsați pe Enter pentru a începe glisarea.",
	dragDescriptionKeyboardAlt: "Apăsați pe Alt + Enter pentru a începe glisarea.",
	dragDescriptionLongPress: "Apăsați lung pentru a începe glisarea.",
	dragDescriptionTouch: "Atingeți de două ori pentru a începe să glisați.",
	dragDescriptionVirtual: "Faceți clic pentru a începe glisarea.",
	dragItem: (e) => `Glisa\u{21B}i ${e.itemText}`,
	dragSelectedItems: (e, t) => `Glisa\u{21B}i ${t.plural(e.count, {
		one: () => `${t.number(e.count)} element selectat`,
		other: () => `${t.number(e.count)} elemente selectate`
	})}`,
	dragSelectedKeyboard: (e, t) => `Ap\u{103}sa\u{21B}i pe Enter pentru a glisa ${t.plural(e.count, {
		one: () => `${t.number(e.count)} element selectat`,
		other: () => `${t.number(e.count)} elemente selectate`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Ap\u{103}sa\u{21B}i pe Alt + Enter pentru a glisa ${t.plural(e.count, {
		one: () => `${t.number(e.count)} element selectat`,
		other: () => `${t.number(e.count)} elemente selectate`
	})}.`,
	dragSelectedLongPress: (e, t) => `Ap\u{103}sa\u{21B}i lung pentru a glisa ${t.plural(e.count, {
		one: () => `${t.number(e.count)} element selectat`,
		other: () => `${t.number(e.count)} elemente selectate`
	})}.`,
	dragStartedKeyboard: "A început glisarea. Apăsați pe Tab pentru a naviga la o țintă de fixare, apoi apăsați pe Enter pentru a fixa sau apăsați pe Escape pentru a anula glisarea.",
	dragStartedTouch: "A început glisarea. Navigați la o țintă de fixare, apoi atingeți de două ori pentru a fixa.",
	dragStartedVirtual: "A început glisarea. Navigați la o țintă de fixare, apoi faceți clic sau apăsați pe Enter pentru a fixa.",
	dropCanceled: "Fixare anulată.",
	dropComplete: "Fixare finalizată.",
	dropDescriptionKeyboard: "Apăsați pe Enter pentru a fixa. Apăsați pe Escape pentru a anula glisarea.",
	dropDescriptionTouch: "Atingeți de două ori pentru a fixa.",
	dropDescriptionVirtual: "Faceți clic pentru a fixa.",
	dropIndicator: "indicator de fixare",
	dropOnItem: (e) => `Fixa\u{21B}i pe ${e.itemText}`,
	dropOnRoot: "Fixare pe",
	endDragKeyboard: "Se glisează. Apăsați pe Enter pentru a anula glisarea.",
	endDragTouch: "Se glisează. Atingeți de două ori pentru a anula glisarea.",
	endDragVirtual: "Se glisează. Faceți clic pentru a anula glisarea.",
	insertAfter: (e) => `Insera\u{21B}i dup\u{103} ${e.itemText}`,
	insertBefore: (e) => `Insera\u{21B}i \xeenainte de ${e.itemText}`,
	insertBetween: (e) => `Insera\u{21B}i \xeentre ${e.beforeItemText} \u{219}i ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/ru-RU.mjs
var Tc = {};
Tc = {
	dragDescriptionKeyboard: "Нажмите клавишу Enter для начала перетаскивания.",
	dragDescriptionKeyboardAlt: "Нажмите Alt + Enter, чтобы начать перетаскивать.",
	dragDescriptionLongPress: "Нажмите и удерживайте, чтобы начать перетаскивать.",
	dragDescriptionTouch: "Дважды нажмите для начала перетаскивания.",
	dragDescriptionVirtual: "Щелкните для начала перетаскивания.",
	dragItem: (e) => `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{449}\u{438}\u{442}\u{44C} ${e.itemText}`,
	dragSelectedItems: (e, t) => `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{449}\u{438}\u{442}\u{44C} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{439} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{445} \u{44D}\u{43B}\u{435}\u{43C}`
	})}`,
	dragSelectedKeyboard: (e, t) => `\u{41D}\u{430}\u{436}\u{43C}\u{438}\u{442}\u{435} Enter \u{434}\u{43B}\u{44F} \u{43F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{441}\u{43A}\u{438}\u{432}\u{430}\u{43D}\u{438}\u{44F} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{43E}\u{433}\u{43E} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{430}`,
		other: () => `${t.number(e.count)} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{445} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{43E}\u{432}`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `\u{41D}\u{430}\u{436}\u{43C}\u{438}\u{442}\u{435} Alt + Enter \u{434}\u{43B}\u{44F} \u{43F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{441}\u{43A}\u{438}\u{432}\u{430}\u{43D}\u{438}\u{44F} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{43E}\u{433}\u{43E} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{430}`,
		other: () => `${t.number(e.count)} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{445} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{43E}\u{432}`
	})}.`,
	dragSelectedLongPress: (e, t) => `\u{41D}\u{430}\u{436}\u{43C}\u{438}\u{442}\u{435} \u{438} \u{443}\u{434}\u{435}\u{440}\u{436}\u{438}\u{432}\u{430}\u{439}\u{442}\u{435} \u{434}\u{43B}\u{44F} \u{43F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{441}\u{43A}\u{438}\u{432}\u{430}\u{43D}\u{438}\u{44F} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{43E}\u{433}\u{43E} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{430}`,
		other: () => `${t.number(e.count)} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{445} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{43E}\u{432}`
	})}.`,
	dragStartedKeyboard: "Начато перетаскивание. Нажмите клавишу Tab для выбора цели, затем нажмите клавишу Enter, чтобы применить перетаскивание, или клавишу Escape для отмены действия.",
	dragStartedTouch: "Начато перетаскивание. Выберите цель, затем дважды нажмите, чтобы применить перетаскивание.",
	dragStartedVirtual: "Начато перетаскивание. Нажмите клавишу Tab для выбора цели, затем нажмите клавишу Enter, чтобы применить перетаскивание.",
	dropCanceled: "Перетаскивание отменено.",
	dropComplete: "Перетаскивание завершено.",
	dropDescriptionKeyboard: "Нажмите клавишу Enter, чтобы применить перетаскивание. Нажмите клавишу Escape для отмены.",
	dropDescriptionTouch: "Дважды нажмите, чтобы применить перетаскивание.",
	dropDescriptionVirtual: "Щелкните, чтобы применить перетаскивание.",
	dropIndicator: "индикатор перетаскивания",
	dropOnItem: (e) => `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{430}\u{449}\u{438}\u{442}\u{44C} \u{43D}\u{430} ${e.itemText}`,
	dropOnRoot: "Перетащить на",
	endDragKeyboard: "Перетаскивание. Нажмите клавишу Enter для отмены.",
	endDragTouch: "Перетаскивание. Дважды нажмите для отмены.",
	endDragVirtual: "Перетаскивание. Щелкните для отмены.",
	insertAfter: (e) => `\u{412}\u{441}\u{442}\u{430}\u{432}\u{438}\u{442}\u{44C} \u{43F}\u{43E}\u{441}\u{43B}\u{435} ${e.itemText}`,
	insertBefore: (e) => `\u{412}\u{441}\u{442}\u{430}\u{432}\u{438}\u{442}\u{44C} \u{43F}\u{435}\u{440}\u{435}\u{434} ${e.itemText}`,
	insertBetween: (e) => `\u{412}\u{441}\u{442}\u{430}\u{432}\u{438}\u{442}\u{44C} \u{43C}\u{435}\u{436}\u{434}\u{443} ${e.beforeItemText} \u{438} ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/sk-SK.mjs
var Ec = {};
Ec = {
	dragDescriptionKeyboard: "Stlačením klávesu Enter začnete presúvanie.",
	dragDescriptionKeyboardAlt: "Stlačením klávesov Alt + Enter začnete presúvanie.",
	dragDescriptionLongPress: "Dlhým stlačením začnete presúvanie.",
	dragDescriptionTouch: "Dvojitým kliknutím začnete presúvanie.",
	dragDescriptionVirtual: "Kliknutím začnete presúvanie.",
	dragItem: (e) => `Presun\xfa\u{165} polo\u{17E}ku ${e.itemText}`,
	dragSelectedItems: (e, t) => `Presun\xfa\u{165} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} vybrat\xfa polo\u{17E}ku`,
		other: () => `${t.number(e.count)} vybrat\xe9 polo\u{17E}ky`
	})}`,
	dragSelectedKeyboard: (e, t) => `Stla\u{10D}en\xedm kl\xe1vesu Enter presuniete ${t.plural(e.count, {
		one: () => `${t.number(e.count)} vybrat\xfa polo\u{17E}ku`,
		other: () => `${t.number(e.count)} vybrat\xfdch polo\u{17E}iek`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Stla\u{10D}en\xedm kl\xe1vesov Alt + Enter presuniete ${t.plural(e.count, {
		one: () => `${t.number(e.count)} vybrat\xfa polo\u{17E}ku`,
		other: () => `${t.number(e.count)} vybrat\xfdch polo\u{17E}iek`
	})}.`,
	dragSelectedLongPress: (e, t) => `Dlh\xfdm stla\u{10D}en\xedm presuniete ${t.plural(e.count, {
		one: () => `${t.number(e.count)} vybrat\xfa polo\u{17E}ku`,
		other: () => `${t.number(e.count)} vybrat\xfdch polo\u{17E}iek`
	})}.`,
	dragStartedKeyboard: "Presúvanie sa začalo. Do cieľového umiestnenia prejdete stlačením klávesu Tab. Ak chcete položku umiestniť, stlačte kláves Enter alebo stlačte kláves Esc, ak chcete presúvanie zrušiť.",
	dragStartedTouch: "Presúvanie sa začalo. Prejdite na cieľové umiestnenie a dvojitým kliknutím umiestnite položku.",
	dragStartedVirtual: "Presúvanie sa začalo. Prejdite na cieľové umiestnenie a kliknutím alebo stlačením klávesu Enter umiestnite položku.",
	dropCanceled: "Umiestnenie zrušené.",
	dropComplete: "Umiestnenie dokončené.",
	dropDescriptionKeyboard: "Stlačením klávesu Enter umiestnite položku. Stlačením klávesu Esc zrušíte presúvanie.",
	dropDescriptionTouch: "Dvojitým kliknutím umiestnite položku.",
	dropDescriptionVirtual: "Kliknutím umiestnite položku.",
	dropIndicator: "indikátor umiestnenia",
	dropOnItem: (e) => `Umiestni\u{165} na polo\u{17E}ku ${e.itemText}`,
	dropOnRoot: "Umiestniť na",
	endDragKeyboard: "Prebieha presúvanie. Ak ho chcete zrušiť, stlačte kláves Enter.",
	endDragTouch: "Prebieha presúvanie. Dvojitým kliknutím ho môžete zrušiť.",
	endDragVirtual: "Prebieha presúvanie.",
	insertAfter: (e) => `Vlo\u{17E}i\u{165} za polo\u{17E}ku ${e.itemText}`,
	insertBefore: (e) => `Vlo\u{17E}i\u{165} pred polo\u{17E}ku ${e.itemText}`,
	insertBetween: (e) => `Vlo\u{17E}i\u{165} medzi polo\u{17E}ky ${e.beforeItemText} a ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/sl-SI.mjs
var Dc = {};
Dc = {
	dragDescriptionKeyboard: "Pritisnite tipko Enter za začetek vlečenja.",
	dragDescriptionKeyboardAlt: "Pritisnite tipki Alt + Enter za začetek vlečenja.",
	dragDescriptionLongPress: "Pritisnite in zadržite za začetek vlečenja.",
	dragDescriptionTouch: "Dvotapnite za začetek vlečenja.",
	dragDescriptionVirtual: "Kliknite za začetek vlečenja.",
	dragItem: (e) => `Povleci ${e.itemText}`,
	dragSelectedItems: (e, t) => `Povlecite ${t.plural(e.count, {
		one: () => `${t.number(e.count)} izbran element`,
		other: () => `izbrane elemente (${t.number(e.count)})`
	})}`,
	dragSelectedKeyboard: (e, t) => `Pritisnite tipko Enter, da povle\u{10D}ete ${t.plural(e.count, {
		one: () => `${t.number(e.count)} izbrani element`,
		other: () => `${t.number(e.count)} izbranih elementov`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Pritisnite tipki Alt + Enter, da povle\u{10D}ete ${t.plural(e.count, {
		one: () => `${t.number(e.count)} izbrani element`,
		other: () => `${t.number(e.count)} izbranih elementov`
	})}.`,
	dragSelectedLongPress: (e, t) => `Pritisnite in zadr\u{17E}ite, da povle\u{10D}ete ${t.plural(e.count, {
		one: () => `${t.number(e.count)} izbrani element`,
		other: () => `${t.number(e.count)} izbranih elementov`
	})}.`,
	dragStartedKeyboard: "Vlečenje se je začelo. Pritisnite tipko Tab za pomik na mesto, kamor želite spustiti elemente, in pritisnite tipko Enter, da jih spustite, ali tipko Escape, da prekličete postopek.",
	dragStartedTouch: "Vlečenje se je začelo. Pomaknite se na mesto, kamor želite spustiti elemente, in dvotapnite, da jih spustite.",
	dragStartedVirtual: "Vlečenje se je začelo. Pomaknite se na mesto, kamor želite spustiti elemente, in kliknite ali pritisnite tipko Enter, da jih spustite.",
	dropCanceled: "Spust je preklican.",
	dropComplete: "Spust je končan.",
	dropDescriptionKeyboard: "Pritisnite tipko Enter, da spustite. Pritisnite tipko Escape, da prekličete vlečenje.",
	dropDescriptionTouch: "Dvotapnite, da spustite.",
	dropDescriptionVirtual: "Kliknite, da spustite.",
	dropIndicator: "indikator spusta",
	dropOnItem: (e) => `Spusti na mesto ${e.itemText}`,
	dropOnRoot: "Spusti na mesto",
	endDragKeyboard: "Vlečenje. Pritisnite tipko Enter za preklic vlečenja.",
	endDragTouch: "Vlečenje. Dvotapnite za preklic vlečenja.",
	endDragVirtual: "Vlečenje. Kliknite, da prekličete vlečenje.",
	insertAfter: (e) => `Vstavi za ${e.itemText}`,
	insertBefore: (e) => `Vstavi pred ${e.itemText}`,
	insertBetween: (e) => `Vstavi med ${e.beforeItemText} in ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/sr-SP.mjs
var Oc = {};
Oc = {
	dragDescriptionKeyboard: "Pritisnite Enter da biste započeli prevlačenje.",
	dragDescriptionKeyboardAlt: "Pritisnite Alt + Enter da biste započeli prevlačenje.",
	dragDescriptionLongPress: "Pritisnite dugo da biste započeli prevlačenje.",
	dragDescriptionTouch: "Dvaput dodirnite da biste započeli prevlačenje.",
	dragDescriptionVirtual: "Kliknite da biste započeli prevlačenje.",
	dragItem: (e) => `Prevucite ${e.itemText}`,
	dragSelectedItems: (e, t) => `Prevucite ${t.plural(e.count, {
		one: () => `${t.number(e.count)} izabranu stavku`,
		other: () => `${t.number(e.count)} izabrane stavke`
	})}`,
	dragSelectedKeyboard: (e, t) => `Pritisnite Enter da biste prevukli ${t.plural(e.count, {
		one: () => `${t.number(e.count)} izabranu stavku`,
		other: () => `${t.number(e.count)} izabranih stavki`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Pritisnite Alt + Enter da biste prevukli ${t.plural(e.count, {
		one: () => `${t.number(e.count)} izabranu stavku`,
		other: () => `${t.number(e.count)} izabranih stavki`
	})}.`,
	dragSelectedLongPress: (e, t) => `Pritisnite dugo da biste prevukli ${t.plural(e.count, {
		one: () => `${t.number(e.count)} izabranu stavku`,
		other: () => `${t.number(e.count)} izabranih stavki`
	})}.`,
	dragStartedKeyboard: "Prevlačenje je započeto. Pritisnite Tab da biste otišli do cilja za otpuštanje, zatim pritisnite Enter za ispuštanje ili pritisnite Escape za otkazivanje.",
	dragStartedTouch: "Prevlačenje je započeto. Idite do cilja za otpuštanje, a zatim dvaput dodirnite za otpuštanje.",
	dragStartedVirtual: "Prevlačenje je započeto. Idite do cilja za otpuštanje, a zatim kliknite ili pritinite Enter za otpuštanje.",
	dropCanceled: "Otpuštanje je otkazano.",
	dropComplete: "Prevlačenje je završeno.",
	dropDescriptionKeyboard: "Pritisnite Enter da biste otpustili. Pritisnite Escape da biste otkazali prevlačenje.",
	dropDescriptionTouch: "Dvaput dodirnite za otpuštanje.",
	dropDescriptionVirtual: "Kliknite za otpuštanje.",
	dropIndicator: "Indikator otpuštanja",
	dropOnItem: (e) => `Otpusti na ${e.itemText}`,
	dropOnRoot: "Otpusti na",
	endDragKeyboard: "Prevlačenje u toku. Pritisnite Enter da biste otkazali prevlačenje.",
	endDragTouch: "Prevlačenje u toku. Dvaput dodirnite da biste otkazali prevlačenje.",
	endDragVirtual: "Prevlačenje u toku. Kliknite da biste otkazali prevlačenje.",
	insertAfter: (e) => `Umetnite posle ${e.itemText}`,
	insertBefore: (e) => `Umetnite ispred ${e.itemText}`,
	insertBetween: (e) => `Umetnite izme\u{111}u ${e.beforeItemText} i ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/sv-SE.mjs
var kc = {};
kc = {
	dragDescriptionKeyboard: "Tryck på enter för att börja dra.",
	dragDescriptionKeyboardAlt: "Tryck på Alt + Retur för att börja dra.",
	dragDescriptionLongPress: "Tryck länge för att börja dra.",
	dragDescriptionTouch: "Dubbeltryck för att börja dra.",
	dragDescriptionVirtual: "Klicka för att börja dra.",
	dragItem: (e) => `Dra ${e.itemText}`,
	dragSelectedItems: (e, t) => `Dra ${t.plural(e.count, {
		one: () => `${t.number(e.count)} valt objekt`,
		other: () => `${t.number(e.count)} valda objekt`
	})}`,
	dragSelectedKeyboard: (e, t) => `Tryck p\xe5 Retur f\xf6r att dra ${t.plural(e.count, {
		one: () => `${t.number(e.count)} markerat objekt`,
		other: () => `${t.number(e.count)} markerade objekt`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `Tryck p\xe5 Alt + Retur f\xf6r att dra ${t.plural(e.count, {
		one: () => `${t.number(e.count)} markerat objekt`,
		other: () => `${t.number(e.count)} markerade objekt`
	})}.`,
	dragSelectedLongPress: (e, t) => `Tryck l\xe4nge f\xf6r att dra ${t.plural(e.count, {
		one: () => `${t.number(e.count)} markerat objekt`,
		other: () => `${t.number(e.count)} markerade objekt`
	})}.`,
	dragStartedKeyboard: "Börja dra. Tryck på tabb för att navigera till målet, tryck på enter för att släppa eller på escape för att avbryta.",
	dragStartedTouch: "Börja dra. Navigera till ett mål och dubbeltryck för att släppa.",
	dragStartedVirtual: "Börja dra. Navigera till ett mål och klicka eller tryck på enter för att släppa.",
	dropCanceled: "Släppåtgärd avbröts.",
	dropComplete: "Släppåtgärd klar.",
	dropDescriptionKeyboard: "Tryck på enter för att släppa. Tryck på escape för att avbryta dragåtgärd.",
	dropDescriptionTouch: "Dubbeltryck för att släppa.",
	dropDescriptionVirtual: "Klicka för att släppa.",
	dropIndicator: "släppindikator",
	dropOnItem: (e) => `Sl\xe4pp p\xe5 ${e.itemText}`,
	dropOnRoot: "Släpp på",
	endDragKeyboard: "Drar. Tryck på enter för att avbryta dragåtgärd.",
	endDragTouch: "Drar. Dubbeltryck för att avbryta dragåtgärd.",
	endDragVirtual: "Drar. Klicka för att avbryta dragåtgärd.",
	insertAfter: (e) => `Infoga efter ${e.itemText}`,
	insertBefore: (e) => `Infoga f\xf6re ${e.itemText}`,
	insertBetween: (e) => `Infoga mellan ${e.beforeItemText} och ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/tr-TR.mjs
var Ac = {};
Ac = {
	dragDescriptionKeyboard: "Sürüklemeyi başlatmak için Enter'a basın.",
	dragDescriptionKeyboardAlt: "Sürüklemeyi başlatmak için Alt + Enter'a basın.",
	dragDescriptionLongPress: "Sürüklemeye başlamak için uzun basın.",
	dragDescriptionTouch: "Sürüklemeyi başlatmak için çift tıklayın.",
	dragDescriptionVirtual: "Sürüklemeyi başlatmak için tıklayın.",
	dragItem: (e) => `${e.itemText}\u{2019}i s\xfcr\xfckle`,
	dragSelectedItems: (e, t) => `S\xfcr\xfckle ${t.plural(e.count, {
		one: () => `${t.number(e.count)} se\xe7ili \xf6ge`,
		other: () => `${t.number(e.count)} se\xe7ili \xf6ge`
	})}`,
	dragSelectedKeyboard: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)} se\xe7ilmi\u{15F} \xf6\u{11F}e`,
		other: () => `${t.number(e.count)} se\xe7ilmi\u{15F} \xf6\u{11F}e`
	})} \xf6\u{11F}esini s\xfcr\xfcklemek i\xe7in Enter'a bas\u{131}n.`,
	dragSelectedKeyboardAlt: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)} se\xe7ilmi\u{15F} \xf6\u{11F}e`,
		other: () => `${t.number(e.count)} se\xe7ilmi\u{15F} \xf6\u{11F}e`
	})} \xf6\u{11F}esini s\xfcr\xfcklemek i\xe7in Alt + Enter tu\u{15F}una bas\u{131}n.`,
	dragSelectedLongPress: (e, t) => `${t.plural(e.count, {
		one: () => `${t.number(e.count)} se\xe7ilmi\u{15F} \xf6\u{11F}e`,
		other: () => `${t.number(e.count)} se\xe7ilmi\u{15F} \xf6\u{11F}e`
	})} \xf6\u{11F}esini s\xfcr\xfcklemek i\xe7in uzun bas\u{131}n.`,
	dragStartedKeyboard: "Sürükleme başlatıldı. Bir bırakma hedefine gitmek için Tab’a basın, ardından bırakmak için Enter’a basın veya iptal etmek için Escape’e basın.",
	dragStartedTouch: "Sürükleme başlatıldı. Bir bırakma hedefine gidin, ardından bırakmak için çift tıklayın.",
	dragStartedVirtual: "Sürükleme başlatıldı. Bir bırakma hedefine gidin, ardından bırakmak için Enter’a tıklayın veya basın.",
	dropCanceled: "Bırakma iptal edildi.",
	dropComplete: "Bırakma tamamlandı.",
	dropDescriptionKeyboard: "Bırakmak için Enter'a basın. Sürüklemeyi iptal etmek için Escape'e basın.",
	dropDescriptionTouch: "Bırakmak için çift tıklayın.",
	dropDescriptionVirtual: "Bırakmak için tıklayın.",
	dropIndicator: "bırakma göstergesi",
	dropOnItem: (e) => `${e.itemText} \xfczerine b\u{131}rak`,
	dropOnRoot: "Bırakın",
	endDragKeyboard: "Sürükleme. Sürüklemeyi iptal etmek için Enter'a basın.",
	endDragTouch: "Sürükleme. Sürüklemeyi iptal etmek için çift tıklayın.",
	endDragVirtual: "Sürükleme. Sürüklemeyi iptal etmek için tıklayın.",
	insertAfter: (e) => `${e.itemText}\u{2019}den sonra gir`,
	insertBefore: (e) => `${e.itemText}\u{2019}den \xf6nce gir`,
	insertBetween: (e) => `${e.beforeItemText} ve ${e.afterItemText} aras\u{131}na gir`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/uk-UA.mjs
var jc = {};
jc = {
	dragDescriptionKeyboard: "Натисніть Enter, щоб почати перетягування.",
	dragDescriptionKeyboardAlt: "Натисніть Alt + Enter, щоб почати перетягування.",
	dragDescriptionLongPress: "Натисніть і утримуйте, щоб почати перетягування.",
	dragDescriptionTouch: "Натисніть двічі, щоб почати перетягування.",
	dragDescriptionVirtual: "Натисніть, щоб почати перетягування.",
	dragItem: (e) => `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{443}\u{442}\u{438} ${e.itemText}`,
	dragSelectedItems: (e, t) => `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{456}\u{442}\u{44C} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{439} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{445} \u{435}\u{43B}\u{435}\u{43C}`
	})}`,
	dragSelectedKeyboard: (e, t) => `\u{41D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{456}\u{442}\u{44C} Enter, \u{449}\u{43E}\u{431} \u{43F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{443}\u{442}\u{438} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{439} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{445} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}(-\u{456}\u{432})`
	})}.`,
	dragSelectedKeyboardAlt: (e, t) => `\u{41D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{456}\u{442}\u{44C} Alt + Enter, \u{449}\u{43E}\u{431} \u{43F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{443}\u{442}\u{438} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{439} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{445} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}(-\u{456}\u{432})`
	})}.`,
	dragSelectedLongPress: (e, t) => `\u{423}\u{442}\u{440}\u{438}\u{43C}\u{443}\u{439}\u{442}\u{435}, \u{449}\u{43E}\u{431} \u{43F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{443}\u{442}\u{438} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{439} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{438}\u{445} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}(-\u{456}\u{432})`
	})}.`,
	dragStartedKeyboard: "Перетягування почалося. Натисніть Tab, щоб перейти до цілі перетягування, потім натисніть Enter, щоб перетягнути, або Escape, щоб скасувати.",
	dragStartedTouch: "Перетягування почалося. Перейдіть до цілі перетягування, потім натисніть двічі, щоб перетягнути.",
	dragStartedVirtual: "Перетягування почалося. Перейдіть до цілі перетягування, потім натисніть Enter, щоб перетягнути.",
	dropCanceled: "Перетягування скасовано.",
	dropComplete: "Перетягування завершено.",
	dropDescriptionKeyboard: "Натисніть Enter, щоб перетягнути. Натисніть Escape, щоб скасувати перетягування.",
	dropDescriptionTouch: "Натисніть двічі, щоб перетягнути.",
	dropDescriptionVirtual: "Натисніть, щоб перетягнути.",
	dropIndicator: "індикатор перетягування",
	dropOnItem: (e) => `\u{41F}\u{435}\u{440}\u{435}\u{442}\u{44F}\u{433}\u{43D}\u{443}\u{442}\u{438} \u{43D}\u{430} ${e.itemText}`,
	dropOnRoot: "Перетягнути на",
	endDragKeyboard: "Триває перетягування. Натисніть Enter, щоб скасувати перетягування.",
	endDragTouch: "Триває перетягування. Натисніть двічі, щоб скасувати перетягування.",
	endDragVirtual: "Триває перетягування. Натисніть, щоб скасувати перетягування.",
	insertAfter: (e) => `\u{412}\u{441}\u{442}\u{430}\u{432}\u{438}\u{442}\u{438} \u{43F}\u{456}\u{441}\u{43B}\u{44F} ${e.itemText}`,
	insertBefore: (e) => `\u{412}\u{441}\u{442}\u{430}\u{432}\u{438}\u{442}\u{438} \u{43F}\u{435}\u{440}\u{435}\u{434} ${e.itemText}`,
	insertBetween: (e) => `\u{412}\u{441}\u{442}\u{430}\u{432}\u{438}\u{442}\u{438} \u{43C}\u{456}\u{436} ${e.beforeItemText} \u{456} ${e.afterItemText}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/zh-CN.mjs
var Mc = {};
Mc = {
	dragDescriptionKeyboard: "按 Enter 开始拖动。",
	dragDescriptionKeyboardAlt: "按 Alt + Enter 开始拖动。",
	dragDescriptionLongPress: "长按以开始拖动。",
	dragDescriptionTouch: "双击开始拖动。",
	dragDescriptionVirtual: "单击开始拖动。",
	dragItem: (e) => `\u{62D6}\u{52A8} ${e.itemText}`,
	dragSelectedItems: (e, t) => `\u{62D6}\u{52A8} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{9009}\u{4E2D}\u{9879}\u{76EE}`,
		other: () => `${t.number(e.count)} \u{9009}\u{4E2D}\u{9879}\u{76EE}`
	})}`,
	dragSelectedKeyboard: (e, t) => `\u{6309} Enter \u{4EE5}\u{62D6}\u{52A8} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{4E2A}\u{9009}\u{5B9A}\u{9879}`,
		other: () => `${t.number(e.count)} \u{4E2A}\u{9009}\u{5B9A}\u{9879}`
	})}\u{3002}`,
	dragSelectedKeyboardAlt: (e, t) => `\u{6309} Alt + Enter \u{4EE5}\u{62D6}\u{52A8} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{4E2A}\u{9009}\u{5B9A}\u{9879}`,
		other: () => `${t.number(e.count)} \u{4E2A}\u{9009}\u{5B9A}\u{9879}`
	})}\u{3002}`,
	dragSelectedLongPress: (e, t) => `\u{957F}\u{6309}\u{4EE5}\u{62D6}\u{52A8} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{4E2A}\u{9009}\u{5B9A}\u{9879}`,
		other: () => `${t.number(e.count)} \u{4E2A}\u{9009}\u{5B9A}\u{9879}`
	})}\u{3002}`,
	dragStartedKeyboard: "已开始拖动。按 Tab 导航到放置目标，然后按 Enter 放置或按 Escape 取消。",
	dragStartedTouch: "已开始拖动。导航到放置目标，然后双击放置。",
	dragStartedVirtual: "已开始拖动。导航到放置目标，然后单击或按 Enter 放置。",
	dropCanceled: "放置已取消。",
	dropComplete: "放置已完成。",
	dropDescriptionKeyboard: "按 Enter 放置。按 Escape 取消拖动。",
	dropDescriptionTouch: "双击放置。",
	dropDescriptionVirtual: "单击放置。",
	dropIndicator: "放置标记",
	dropOnItem: (e) => `\u{653E}\u{7F6E}\u{4E8E} ${e.itemText}`,
	dropOnRoot: "放置于",
	endDragKeyboard: "正在拖动。按 Enter 取消拖动。",
	endDragTouch: "正在拖动。双击取消拖动。",
	endDragVirtual: "正在拖动。单击取消拖动。",
	insertAfter: (e) => `\u{63D2}\u{5165}\u{5230} ${e.itemText} \u{4E4B}\u{540E}`,
	insertBefore: (e) => `\u{63D2}\u{5165}\u{5230} ${e.itemText} \u{4E4B}\u{524D}`,
	insertBetween: (e) => `\u{63D2}\u{5165}\u{5230} ${e.beforeItemText} \u{548C} ${e.afterItemText} \u{4E4B}\u{95F4}`
};
// ../../node_modules/react-aria/dist/private/intl/dnd/zh-TW.mjs
var Nc = {};
Nc = {
	dragDescriptionKeyboard: "按 Enter 鍵以開始拖曳。",
	dragDescriptionKeyboardAlt: "按 Alt+Enter 鍵以開始拖曳。",
	dragDescriptionLongPress: "長按以開始拖曳。",
	dragDescriptionTouch: "輕點兩下以開始拖曳。",
	dragDescriptionVirtual: "按一下滑鼠以開始拖曳。",
	dragItem: (e) => `\u{62D6}\u{66F3}\u{300C}${e.itemText}\u{300D}`,
	dragSelectedItems: (e, t) => `\u{62D6}\u{66F3} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{500B}\u{9078}\u{5B9A}\u{9805}\u{76EE}`,
		other: () => `${t.number(e.count)} \u{500B}\u{9078}\u{5B9A}\u{9805}\u{76EE}`
	})}`,
	dragSelectedKeyboard: (e, t) => `\u{6309} Enter \u{9375}\u{4EE5}\u{62D6}\u{66F3} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{500B}\u{9078}\u{5B9A}\u{9805}\u{76EE}`,
		other: () => `${t.number(e.count)} \u{500B}\u{9078}\u{5B9A}\u{9805}\u{76EE}`
	})}\u{3002}`,
	dragSelectedKeyboardAlt: (e, t) => `\u{6309} Alt+Enter \u{9375}\u{4EE5}\u{62D6}\u{66F3} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{500B}\u{9078}\u{5B9A}\u{9805}\u{76EE}`,
		other: () => `${t.number(e.count)} \u{500B}\u{9078}\u{5B9A}\u{9805}\u{76EE}`
	})}\u{3002}`,
	dragSelectedLongPress: (e, t) => `\u{9577}\u{6309}\u{4EE5}\u{62D6}\u{66F3} ${t.plural(e.count, {
		one: () => `${t.number(e.count)} \u{500B}\u{9078}\u{5B9A}\u{9805}\u{76EE}`,
		other: () => `${t.number(e.count)} \u{500B}\u{9078}\u{5B9A}\u{9805}\u{76EE}`
	})}\u{3002}`,
	dragStartedKeyboard: "已開始拖曳。按 Tab 鍵以瀏覽至放置目標，然後按 Enter 鍵以放置，或按 Escape 鍵以取消。",
	dragStartedTouch: "已開始拖曳。瀏覽至放置目標，然後輕點兩下以放置。",
	dragStartedVirtual: "已開始拖曳。瀏覽至放置目標，然後按一下滑鼠或按 Enter 鍵以放置。",
	dropCanceled: "放置已取消。",
	dropComplete: "放置已完成。",
	dropDescriptionKeyboard: "按 Enter 鍵以放置。按 Escape 鍵以取消拖曳。",
	dropDescriptionTouch: "輕點兩下以放置。",
	dropDescriptionVirtual: "按一下滑鼠以放置。",
	dropIndicator: "放置指示器",
	dropOnItem: (e) => `\u{653E}\u{7F6E}\u{5728}\u{300C}${e.itemText}\u{300D}\u{4E0A}`,
	dropOnRoot: "放置在",
	endDragKeyboard: "拖曳中。按 Enter 鍵以取消拖曳。",
	endDragTouch: "拖曳中。輕點兩下以取消拖曳。",
	endDragVirtual: "拖曳中。按一下滑鼠以取消拖曳。",
	insertAfter: (e) => `\u{63D2}\u{5165}\u{81F3}\u{300C}${e.itemText}\u{300D}\u{4E4B}\u{5F8C}`,
	insertBefore: (e) => `\u{63D2}\u{5165}\u{81F3}\u{300C}${e.itemText}\u{300D}\u{4E4B}\u{524D}`,
	insertBetween: (e) => `\u{63D2}\u{5165}\u{81F3}\u{300C}${e.beforeItemText}\u{300D}\u{548C}\u{300C}${e.afterItemText}\u{300D}\u{4E4B}\u{9593}`
};
// ../../node_modules/react-aria/dist/private/dnd/intlStrings.mjs
var Pc = {};
Pc = {
	"ar-AE": ec,
	"bg-BG": tc,
	"cs-CZ": nc,
	"da-DK": rc,
	"de-DE": ic,
	"el-GR": ac,
	"en-US": oc,
	"es-ES": sc,
	"et-EE": cc,
	"fi-FI": lc,
	"fr-FR": uc,
	"he-IL": dc,
	"hr-HR": fc,
	"hu-HU": pc,
	"it-IT": mc,
	"ja-JP": hc,
	"ko-KR": gc,
	"lt-LT": _c,
	"lv-LV": vc,
	"nb-NO": yc,
	"nl-NL": bc,
	"pl-PL": xc,
	"pt-BR": Sc,
	"pt-PT": Cc,
	"ro-RO": wc,
	"ru-RU": Tc,
	"sk-SK": Ec,
	"sl-SI": Dc,
	"sr-SP": Oc,
	"sv-SE": kc,
	"tr-TR": Ac,
	"uk-UA": jc,
	"zh-CN": Mc,
	"zh-TW": Nc
};
// ../../node_modules/react-aria/dist/private/dnd/useVirtualDrop.mjs
function Fc(e) {
	return e && e.__esModule ? e.default : e;
}
var Ic = {
	keyboard: "dropDescriptionKeyboard",
	touch: "dropDescriptionTouch",
	virtual: "dropDescriptionVirtual"
};
function Lc() {
	let e = Rn(Fc(Pc), "@react-aria/dnd"), t = vs();
	return { dropProps: {
		...br(Ks() ? e.format(Ic[t]) : ""),
		onClick: () => {}
	} };
}
// ../../node_modules/react-aria/dist/private/dnd/useDrop.mjs
var Rc = 800;
function zc(e) {
	let { hasDropButton: t, isDisabled: n } = e, [r, a] = (0, W.useState)(!1), o = (0, W.useRef)({
		x: 0,
		y: 0,
		dragOverElements: /* @__PURE__ */ new Set(),
		dropEffect: "none",
		allowedOperations: Z.all,
		dropActivateTimer: void 0
	}).current, s = (t) => {
		if (a(!0), typeof e.onDropEnter == "function") {
			let n = t.currentTarget.getBoundingClientRect();
			e.onDropEnter({
				type: "dropenter",
				x: t.clientX - n.x,
				y: t.clientY - n.y
			});
		}
	}, c = (t) => {
		if (a(!1), typeof e.onDropExit == "function") {
			let n = t.currentTarget.getBoundingClientRect();
			e.onDropExit({
				type: "dropexit",
				x: t.clientX - n.x,
				y: t.clientY - n.y
			});
		}
	}, l = (t) => {
		t.preventDefault(), t.stopPropagation();
		let n = Bc(t);
		if (t.clientX === o.x && t.clientY === o.y && n === o.allowedOperations) {
			t.dataTransfer.dropEffect = o.dropEffect;
			return;
		}
		o.x = t.clientX, o.y = t.clientY;
		let r = o.dropEffect;
		if (n !== o.allowedOperations) {
			let r = Vc(n), i = r[0];
			if (typeof e.getDropOperation == "function") {
				let a = new xs(t.dataTransfer);
				i = Hc(n, e.getDropOperation(a, r));
			}
			o.dropEffect = ss[i] || "none";
		}
		if (typeof e.getDropOperationForPoint == "function") {
			let r = new xs(t.dataTransfer), i = t.currentTarget.getBoundingClientRect(), a = Hc(n, e.getDropOperationForPoint(r, Vc(n), o.x - i.x, o.y - i.y));
			o.dropEffect = ss[a] || "none";
		}
		if (o.allowedOperations = n, t.dataTransfer.dropEffect = o.dropEffect, o.dropEffect === "none" && r !== "none" ? c(t) : o.dropEffect !== "none" && r === "none" && s(t), typeof e.onDropMove == "function" && o.dropEffect !== "none") {
			let n = t.currentTarget.getBoundingClientRect();
			e.onDropMove({
				type: "dropmove",
				x: o.x - n.x,
				y: o.y - n.y
			});
		}
		if (clearTimeout(o.dropActivateTimer), e.onDropActivate && typeof e.onDropActivate == "function" && o.dropEffect !== "none") {
			let n = e.onDropActivate, r = t.currentTarget.getBoundingClientRect();
			o.dropActivateTimer = setTimeout(() => {
				n({
					type: "dropactivate",
					x: o.x - r.x,
					y: o.y - r.y
				});
			}, Rc);
		}
	}, u = (t) => {
		if (t.preventDefault(), t.stopPropagation(), o.dragOverElements.add(i(t)), o.dragOverElements.size > 1) return;
		let n = Bc(t), r = Vc(n), a = r[0];
		if (typeof e.getDropOperation == "function") {
			let i = new xs(t.dataTransfer);
			a = Hc(n, e.getDropOperation(i, r));
		}
		if (typeof e.getDropOperationForPoint == "function") {
			let i = new xs(t.dataTransfer), o = t.currentTarget.getBoundingClientRect();
			a = Hc(n, e.getDropOperationForPoint(i, r, t.clientX - o.x, t.clientY - o.y));
		}
		o.x = t.clientX, o.y = t.clientY, o.allowedOperations = n, o.dropEffect = ss[a] || "none", t.dataTransfer.dropEffect = o.dropEffect, a !== "cancel" && s(t);
	}, d = (e) => {
		e.preventDefault(), e.stopPropagation();
		let t = i(e);
		if (o.dragOverElements.delete(t), t === e.currentTarget) for (let t of o.dragOverElements) U(e.currentTarget, t) || o.dragOverElements.delete(t);
		o.dragOverElements.size > 0 || (o.dropEffect !== "none" && c(e), clearTimeout(o.dropActivateTimer));
	}, f = (t) => {
		if (t.preventDefault(), t.stopPropagation(), Is(o.dropEffect), typeof e.onDrop == "function") {
			let n = os[o.dropEffect], r = Ss(t.dataTransfer), i = t.currentTarget.getBoundingClientRect(), a = {
				type: "drop",
				x: t.clientX - i.x,
				y: t.clientY - i.y,
				items: r,
				dropOperation: n
			};
			e.onDrop(a);
		}
		let n = { ...Q };
		o.dragOverElements.clear(), c(t), clearTimeout(o.dropActivateTimer), n.draggingCollectionRef == null ? Is(void 0) : Ns(n);
	}, p = _e((t) => {
		typeof e.onDropEnter == "function" && e.onDropEnter(t);
	}), m = _e((t) => {
		typeof e.onDropExit == "function" && e.onDropExit(t);
	}), h = _e((t) => {
		typeof e.onDropActivate == "function" && e.onDropActivate(t);
	}), g = _e((t) => {
		typeof e.onDrop == "function" && e.onDrop(t);
	}), _ = _e((t, n) => e.getDropOperation ? e.getDropOperation(t, n) : n[0]), { ref: v } = e;
	B(() => {
		if (!n && v.current) return Us({
			element: v.current,
			getDropOperation: _,
			onDropEnter(e) {
				a(!0), p(e);
			},
			onDropExit(e) {
				a(!1), m(e);
			},
			onDrop: g,
			onDropActivate: h
		});
	}, [n, v]);
	let { dropProps: y } = Lc();
	return n ? {
		dropProps: {},
		dropButtonProps: { isDisabled: !0 },
		isDropTarget: !1
	} : {
		dropProps: {
			...!t && y,
			onDragEnter: u,
			onDragOver: l,
			onDragLeave: d,
			onDrop: f
		},
		dropButtonProps: { ...t && y },
		isDropTarget: r
	};
}
function Bc(e) {
	let t = is[e.dataTransfer.effectAllowed];
	Ls && (t &= Ls);
	let n = Z.none;
	return Se() ? (e.altKey && (n |= Z.copy), e.ctrlKey && !v() && (n |= Z.link), e.metaKey && (n |= Z.move)) : (e.altKey && (n |= Z.link), e.shiftKey && (n |= Z.move), e.ctrlKey && (n |= Z.copy)), n ? t & n : t;
}
function Vc(e) {
	let t = [];
	return e & Z.move && t.push("move"), e & Z.copy && t.push("copy"), e & Z.link && t.push("link"), t;
}
function Hc(e, t) {
	return e & Z[t] ? t : "cancel";
}
// ../../node_modules/react-aria/dist/private/gridlist/utils.mjs
var Uc = /* @__PURE__ */ new WeakMap();
function Wc(e, t) {
	let { id: n } = Uc.get(e) ?? {};
	if (!n) throw Error("Unknown list");
	return `${n}-${Gc(t)}`;
}
function Gc(e) {
	return typeof e == "string" ? e.replace(/\s*/g, "") : "" + e;
}
// ../../node_modules/react-aria/dist/private/intl/grid/ar-AE.mjs
var Kc = {};
Kc = {
	deselectedItem: (e) => `${e.item} \u{63A}\u{64A}\u{631} \u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}`,
	longPressToSelect: "اضغط مطولًا للدخول إلى وضع التحديد.",
	select: "تحديد",
	selectedAll: "جميع العناصر المحددة.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "لم يتم تحديد عناصر",
		one: () => `${t.number(e.count)} \u{639}\u{646}\u{635}\u{631} \u{645}\u{62D}\u{62F}\u{62F}`,
		other: () => `${t.number(e.count)} \u{639}\u{646}\u{635}\u{631} \u{645}\u{62D}\u{62F}\u{62F}`
	})}.`,
	selectedItem: (e) => `${e.item} \u{627}\u{644}\u{645}\u{62D}\u{62F}\u{62F}`
};
// ../../node_modules/react-aria/dist/private/intl/grid/bg-BG.mjs
var qc = {};
qc = {
	deselectedItem: (e) => `${e.item} \u{43D}\u{435} \u{435} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}.`,
	longPressToSelect: "Натиснете и задръжте за да влезете в избирателен режим.",
	select: "Изберете",
	selectedAll: "Всички елементи са избрани.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Няма избрани елементи",
		one: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}`,
		other: () => `${t.number(e.count)} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{438}`
	})}.`,
	selectedItem: (e) => `${e.item} \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/cs-CZ.mjs
var Jc = {};
Jc = {
	deselectedItem: (e) => `Polo\u{17E}ka ${e.item} nen\xed vybr\xe1na.`,
	longPressToSelect: "Dlouhým stisknutím přejdete do režimu výběru.",
	select: "Vybrat",
	selectedAll: "Vybrány všechny položky.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Nevybrány žádné položky",
		one: () => `Vybr\xe1na ${t.number(e.count)} polo\u{17E}ka`,
		other: () => `Vybr\xe1no ${t.number(e.count)} polo\u{17E}ek`
	})}.`,
	selectedItem: (e) => `Vybr\xe1na polo\u{17E}ka ${e.item}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/da-DK.mjs
var Yc = {};
Yc = {
	deselectedItem: (e) => `${e.item} ikke valgt.`,
	longPressToSelect: "Lav et langt tryk for at aktivere valgtilstand.",
	select: "Vælg",
	selectedAll: "Alle elementer valgt.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Ingen elementer valgt",
		one: () => `${t.number(e.count)} element valgt`,
		other: () => `${t.number(e.count)} elementer valgt`
	})}.`,
	selectedItem: (e) => `${e.item} valgt.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/de-DE.mjs
var Xc = {};
Xc = {
	deselectedItem: (e) => `${e.item} nicht ausgew\xe4hlt.`,
	longPressToSelect: "Gedrückt halten, um Auswahlmodus zu öffnen.",
	select: "Auswählen",
	selectedAll: "Alle Elemente ausgewählt.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Keine Elemente ausgewählt",
		one: () => `${t.number(e.count)} Element ausgew\xe4hlt`,
		other: () => `${t.number(e.count)} Elemente ausgew\xe4hlt`
	})}.`,
	selectedItem: (e) => `${e.item} ausgew\xe4hlt.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/el-GR.mjs
var Zc = {};
Zc = {
	deselectedItem: (e) => `\u{394}\u{3B5}\u{3BD} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B5} \u{3C4}\u{3BF} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3BF} ${e.item}.`,
	longPressToSelect: "Πατήστε παρατεταμένα για να μπείτε σε λειτουργία επιλογής.",
	select: "Επιλογή",
	selectedAll: "Επιλέχθηκαν όλα τα στοιχεία.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Δεν επιλέχθηκαν στοιχεία",
		one: () => `\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B5} ${t.number(e.count)} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3BF}`,
		other: () => `\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B1}\u{3BD} ${t.number(e.count)} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3B1}`
	})}.`,
	selectedItem: (e) => `\u{395}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B5} \u{3C4}\u{3BF} \u{3C3}\u{3C4}\u{3BF}\u{3B9}\u{3C7}\u{3B5}\u{3AF}\u{3BF} ${e.item}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/en-US.mjs
var Qc = {};
Qc = {
	deselectedItem: (e) => `${e.item} not selected.`,
	select: "Select",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "No items selected",
		one: () => `${t.number(e.count)} item selected`,
		other: () => `${t.number(e.count)} items selected`
	})}.`,
	selectedAll: "All items selected.",
	selectedItem: (e) => `${e.item} selected.`,
	longPressToSelect: "Long press to enter selection mode."
};
// ../../node_modules/react-aria/dist/private/intl/grid/es-ES.mjs
var $c = {};
$c = {
	deselectedItem: (e) => `${e.item} no seleccionado.`,
	longPressToSelect: "Mantenga pulsado para abrir el modo de selección.",
	select: "Seleccionar",
	selectedAll: "Todos los elementos seleccionados.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Ningún elemento seleccionado",
		one: () => `${t.number(e.count)} elemento seleccionado`,
		other: () => `${t.number(e.count)} elementos seleccionados`
	})}.`,
	selectedItem: (e) => `${e.item} seleccionado.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/et-EE.mjs
var el = {};
el = {
	deselectedItem: (e) => `${e.item} pole valitud.`,
	longPressToSelect: "Valikurežiimi sisenemiseks vajutage pikalt.",
	select: "Vali",
	selectedAll: "Kõik üksused valitud.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Üksusi pole valitud",
		one: () => `${t.number(e.count)} \xfcksus valitud`,
		other: () => `${t.number(e.count)} \xfcksust valitud`
	})}.`,
	selectedItem: (e) => `${e.item} valitud.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/fi-FI.mjs
var tl = {};
tl = {
	deselectedItem: (e) => `Kohdetta ${e.item} ei valittu.`,
	longPressToSelect: "Siirry valintatilaan painamalla pitkään.",
	select: "Valitse",
	selectedAll: "Kaikki kohteet valittu.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Ei yhtään kohdetta valittu",
		one: () => `${t.number(e.count)} kohde valittu`,
		other: () => `${t.number(e.count)} kohdetta valittu`
	})}.`,
	selectedItem: (e) => `${e.item} valittu.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/fr-FR.mjs
var nl = {};
nl = {
	deselectedItem: (e) => `${e.item} non s\xe9lectionn\xe9.`,
	longPressToSelect: "Appuyez de manière prolongée pour passer en mode de sélection.",
	select: "Sélectionner",
	selectedAll: "Tous les éléments sélectionnés.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Aucun élément sélectionné",
		one: () => `${t.number(e.count)} \xe9l\xe9ment s\xe9lectionn\xe9`,
		other: () => `${t.number(e.count)} \xe9l\xe9ments s\xe9lectionn\xe9s`
	})}.`,
	selectedItem: (e) => `${e.item} s\xe9lectionn\xe9.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/he-IL.mjs
var rl = {};
rl = {
	deselectedItem: (e) => `${e.item} \u{5DC}\u{5D0} \u{5E0}\u{5D1}\u{5D7}\u{5E8}.`,
	longPressToSelect: "הקשה ארוכה לכניסה למצב בחירה.",
	select: "בחר",
	selectedAll: "כל הפריטים נבחרו.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "לא נבחרו פריטים",
		one: () => `\u{5E4}\u{5E8}\u{5D9}\u{5D8} ${t.number(e.count)} \u{5E0}\u{5D1}\u{5D7}\u{5E8}`,
		other: () => `${t.number(e.count)} \u{5E4}\u{5E8}\u{5D9}\u{5D8}\u{5D9}\u{5DD} \u{5E0}\u{5D1}\u{5D7}\u{5E8}\u{5D5}`
	})}.`,
	selectedItem: (e) => `${e.item} \u{5E0}\u{5D1}\u{5D7}\u{5E8}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/hr-HR.mjs
var il = {};
il = {
	deselectedItem: (e) => `Stavka ${e.item} nije odabrana.`,
	longPressToSelect: "Dugo pritisnite za ulazak u način odabira.",
	select: "Odaberite",
	selectedAll: "Odabrane su sve stavke.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Nije odabrana nijedna stavka",
		one: () => `Odabrana je ${t.number(e.count)} stavka`,
		other: () => `Odabrano je ${t.number(e.count)} stavki`
	})}.`,
	selectedItem: (e) => `Stavka ${e.item} je odabrana.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/hu-HU.mjs
var al = {};
al = {
	deselectedItem: (e) => `${e.item} nincs kijel\xf6lve.`,
	longPressToSelect: "Nyomja hosszan a kijelöléshez.",
	select: "Kijelölés",
	selectedAll: "Az összes elem kijelölve.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Egy elem sincs kijelölve",
		one: () => `${t.number(e.count)} elem kijel\xf6lve`,
		other: () => `${t.number(e.count)} elem kijel\xf6lve`
	})}.`,
	selectedItem: (e) => `${e.item} kijel\xf6lve.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/it-IT.mjs
var ol = {};
ol = {
	deselectedItem: (e) => `${e.item} non selezionato.`,
	longPressToSelect: "Premi a lungo per passare alla modalità di selezione.",
	select: "Seleziona",
	selectedAll: "Tutti gli elementi selezionati.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Nessun elemento selezionato",
		one: () => `${t.number(e.count)} elemento selezionato`,
		other: () => `${t.number(e.count)} elementi selezionati`
	})}.`,
	selectedItem: (e) => `${e.item} selezionato.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/ja-JP.mjs
var sl = {};
sl = {
	deselectedItem: (e) => `${e.item} \u{304C}\u{9078}\u{629E}\u{3055}\u{308C}\u{3066}\u{3044}\u{307E}\u{305B}\u{3093}\u{3002}`,
	longPressToSelect: "長押しして選択モードを開きます。",
	select: "選択",
	selectedAll: "すべての項目を選択しました。",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "項目が選択されていません",
		one: () => `${t.number(e.count)} \u{9805}\u{76EE}\u{3092}\u{9078}\u{629E}\u{3057}\u{307E}\u{3057}\u{305F}`,
		other: () => `${t.number(e.count)} \u{9805}\u{76EE}\u{3092}\u{9078}\u{629E}\u{3057}\u{307E}\u{3057}\u{305F}`
	})}\u{3002}`,
	selectedItem: (e) => `${e.item} \u{3092}\u{9078}\u{629E}\u{3057}\u{307E}\u{3057}\u{305F}\u{3002}`
};
// ../../node_modules/react-aria/dist/private/intl/grid/ko-KR.mjs
var cl = {};
cl = {
	deselectedItem: (e) => `${e.item}\u{C774}(\u{AC00}) \u{C120}\u{D0DD}\u{B418}\u{C9C0} \u{C54A}\u{C558}\u{C2B5}\u{B2C8}\u{B2E4}.`,
	longPressToSelect: "선택 모드로 들어가려면 길게 누르십시오.",
	select: "선택",
	selectedAll: "모든 항목이 선택되었습니다.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "선택된 항목이 없습니다",
		one: () => `${t.number(e.count)}\u{AC1C} \u{D56D}\u{BAA9}\u{C774} \u{C120}\u{D0DD}\u{B418}\u{C5C8}\u{C2B5}\u{B2C8}\u{B2E4}`,
		other: () => `${t.number(e.count)}\u{AC1C} \u{D56D}\u{BAA9}\u{C774} \u{C120}\u{D0DD}\u{B418}\u{C5C8}\u{C2B5}\u{B2C8}\u{B2E4}`
	})}.`,
	selectedItem: (e) => `${e.item}\u{C774}(\u{AC00}) \u{C120}\u{D0DD}\u{B418}\u{C5C8}\u{C2B5}\u{B2C8}\u{B2E4}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/lt-LT.mjs
var ll = {};
ll = {
	deselectedItem: (e) => `${e.item} nepasirinkta.`,
	longPressToSelect: "Norėdami įjungti pasirinkimo režimą, paspauskite ir palaikykite.",
	select: "Pasirinkti",
	selectedAll: "Pasirinkti visi elementai.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Nepasirinktas nė vienas elementas",
		one: () => `Pasirinktas ${t.number(e.count)} elementas`,
		other: () => `Pasirinkta element\u{173}: ${t.number(e.count)}`
	})}.`,
	selectedItem: (e) => `Pasirinkta: ${e.item}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/lv-LV.mjs
var ul = {};
ul = {
	deselectedItem: (e) => `Vienums ${e.item} nav atlas\u{12B}ts.`,
	longPressToSelect: "Ilgi turiet nospiestu. lai ieslēgtu atlases režīmu.",
	select: "Atlasīt",
	selectedAll: "Atlasīti visi vienumi.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Nav atlasīts neviens vienums",
		one: () => `Atlas\u{12B}to vienumu skaits: ${t.number(e.count)}`,
		other: () => `Atlas\u{12B}to vienumu skaits: ${t.number(e.count)}`
	})}.`,
	selectedItem: (e) => `Atlas\u{12B}ts vienums ${e.item}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/nb-NO.mjs
var dl = {};
dl = {
	deselectedItem: (e) => `${e.item} er ikke valgt.`,
	longPressToSelect: "Bruk et langt trykk for å gå inn i valgmodus.",
	select: "Velg",
	selectedAll: "Alle elementer er valgt.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Ingen elementer er valgt",
		one: () => `${t.number(e.count)} element er valgt`,
		other: () => `${t.number(e.count)} elementer er valgt`
	})}.`,
	selectedItem: (e) => `${e.item} er valgt.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/nl-NL.mjs
var fl = {};
fl = {
	deselectedItem: (e) => `${e.item} niet geselecteerd.`,
	longPressToSelect: "Druk lang om de selectiemodus te openen.",
	select: "Selecteren",
	selectedAll: "Alle items geselecteerd.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Geen items geselecteerd",
		one: () => `${t.number(e.count)} item geselecteerd`,
		other: () => `${t.number(e.count)} items geselecteerd`
	})}.`,
	selectedItem: (e) => `${e.item} geselecteerd.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/pl-PL.mjs
var pl = {};
pl = {
	deselectedItem: (e) => `Nie zaznaczono ${e.item}.`,
	longPressToSelect: "Naciśnij i przytrzymaj, aby wejść do trybu wyboru.",
	select: "Zaznacz",
	selectedAll: "Wszystkie zaznaczone elementy.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Nie zaznaczono żadnych elementów",
		one: () => `${t.number(e.count)} zaznaczony element`,
		other: () => `${t.number(e.count)} zaznaczonych element\xf3w`
	})}.`,
	selectedItem: (e) => `Zaznaczono ${e.item}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/pt-BR.mjs
var ml = {};
ml = {
	deselectedItem: (e) => `${e.item} n\xe3o selecionado.`,
	longPressToSelect: "Mantenha pressionado para entrar no modo de seleção.",
	select: "Selecionar",
	selectedAll: "Todos os itens selecionados.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Nenhum item selecionado",
		one: () => `${t.number(e.count)} item selecionado`,
		other: () => `${t.number(e.count)} itens selecionados`
	})}.`,
	selectedItem: (e) => `${e.item} selecionado.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/pt-PT.mjs
var hl = {};
hl = {
	deselectedItem: (e) => `${e.item} n\xe3o selecionado.`,
	longPressToSelect: "Prima continuamente para entrar no modo de seleção.",
	select: "Selecionar",
	selectedAll: "Todos os itens selecionados.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Nenhum item selecionado",
		one: () => `${t.number(e.count)} item selecionado`,
		other: () => `${t.number(e.count)} itens selecionados`
	})}.`,
	selectedItem: (e) => `${e.item} selecionado.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/ro-RO.mjs
var gl = {};
gl = {
	deselectedItem: (e) => `${e.item} neselectat.`,
	longPressToSelect: "Apăsați lung pentru a intra în modul de selectare.",
	select: "Selectare",
	selectedAll: "Toate elementele selectate.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Niciun element selectat",
		one: () => `${t.number(e.count)} element selectat`,
		other: () => `${t.number(e.count)} elemente selectate`
	})}.`,
	selectedItem: (e) => `${e.item} selectat.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/ru-RU.mjs
var _l = {};
_l = {
	deselectedItem: (e) => `${e.item} \u{43D}\u{435} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E}.`,
	longPressToSelect: "Нажмите и удерживайте для входа в режим выбора.",
	select: "Выбрать",
	selectedAll: "Выбраны все элементы.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Нет выбранных элементов",
		one: () => `${t.number(e.count)} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}`,
		other: () => `${t.number(e.count)} \u{44D}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{43E}\u{432} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E}`
	})}.`,
	selectedItem: (e) => `${e.item} \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/sk-SK.mjs
var vl = {};
vl = {
	deselectedItem: (e) => `Nevybrat\xe9 polo\u{17E}ky: ${e.item}.`,
	longPressToSelect: "Dlhším stlačením prejdite do režimu výberu.",
	select: "Vybrať",
	selectedAll: "Všetky vybraté položky.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Žiadne vybraté položky",
		one: () => `${t.number(e.count)} vybrat\xe1 polo\u{17E}ka`,
		other: () => `Po\u{10D}et vybrat\xfdch polo\u{17E}iek:${t.number(e.count)}`
	})}.`,
	selectedItem: (e) => `Vybrat\xe9 polo\u{17E}ky: ${e.item}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/sl-SI.mjs
var yl = {};
yl = {
	deselectedItem: (e) => `Element ${e.item} ni izbran.`,
	longPressToSelect: "Za izbirni način pritisnite in dlje časa držite.",
	select: "Izberite",
	selectedAll: "Vsi elementi so izbrani.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Noben element ni izbran",
		one: () => `${t.number(e.count)} element je izbran`,
		other: () => `${t.number(e.count)} elementov je izbranih`
	})}.`,
	selectedItem: (e) => `Element ${e.item} je izbran.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/sr-SP.mjs
var bl = {};
bl = {
	deselectedItem: (e) => `${e.item} nije izabrano.`,
	longPressToSelect: "Dugo pritisnite za ulazak u režim biranja.",
	select: "Izaberite",
	selectedAll: "Izabrane su sve stavke.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Nije izabrana nijedna stavka",
		one: () => `Izabrana je ${t.number(e.count)} stavka`,
		other: () => `Izabrano je ${t.number(e.count)} stavki`
	})}.`,
	selectedItem: (e) => `${e.item} je izabrano.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/sv-SE.mjs
var xl = {};
xl = {
	deselectedItem: (e) => `${e.item} ej markerat.`,
	longPressToSelect: "Tryck länge när du vill öppna väljarläge.",
	select: "Markera",
	selectedAll: "Alla markerade objekt.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Inga markerade objekt",
		one: () => `${t.number(e.count)} markerat objekt`,
		other: () => `${t.number(e.count)} markerade objekt`
	})}.`,
	selectedItem: (e) => `${e.item} markerat.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/tr-TR.mjs
var Sl = {};
Sl = {
	deselectedItem: (e) => `${e.item} se\xe7ilmedi.`,
	longPressToSelect: "Seçim moduna girmek için uzun basın.",
	select: "Seç",
	selectedAll: "Tüm ögeler seçildi.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Hiçbir öge seçilmedi",
		one: () => `${t.number(e.count)} \xf6ge se\xe7ildi`,
		other: () => `${t.number(e.count)} \xf6ge se\xe7ildi`
	})}.`,
	selectedItem: (e) => `${e.item} se\xe7ildi.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/uk-UA.mjs
var Cl = {};
Cl = {
	deselectedItem: (e) => `${e.item} \u{43D}\u{435} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}.`,
	longPressToSelect: "Виконайте довге натиснення, щоб перейти в режим вибору.",
	select: "Вибрати",
	selectedAll: "Усі елементи вибрано.",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "Жодних елементів не вибрано",
		one: () => `${t.number(e.count)} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
		other: () => `\u{412}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E} \u{435}\u{43B}\u{435}\u{43C}\u{435}\u{43D}\u{442}\u{456}\u{432}: ${t.number(e.count)}`
	})}.`,
	selectedItem: (e) => `${e.item} \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}.`
};
// ../../node_modules/react-aria/dist/private/intl/grid/zh-CN.mjs
var wl = {};
wl = {
	deselectedItem: (e) => `\u{672A}\u{9009}\u{62E9} ${e.item}\u{3002}`,
	longPressToSelect: "长按以进入选择模式。",
	select: "选择",
	selectedAll: "已选择所有项目。",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "未选择项目",
		one: () => `\u{5DF2}\u{9009}\u{62E9} ${t.number(e.count)} \u{4E2A}\u{9879}\u{76EE}`,
		other: () => `\u{5DF2}\u{9009}\u{62E9} ${t.number(e.count)} \u{4E2A}\u{9879}\u{76EE}`
	})}\u{3002}`,
	selectedItem: (e) => `\u{5DF2}\u{9009}\u{62E9} ${e.item}\u{3002}`
};
// ../../node_modules/react-aria/dist/private/intl/grid/zh-TW.mjs
var Tl = {};
Tl = {
	deselectedItem: (e) => `\u{672A}\u{9078}\u{53D6}\u{300C}${e.item}\u{300D}\u{3002}`,
	longPressToSelect: "長按以進入選擇模式。",
	select: "選取",
	selectedAll: "已選取所有項目。",
	selectedCount: (e, t) => `${t.plural(e.count, {
		"=0": "未選取任何項目",
		one: () => `\u{5DF2}\u{9078}\u{53D6} ${t.number(e.count)} \u{500B}\u{9805}\u{76EE}`,
		other: () => `\u{5DF2}\u{9078}\u{53D6} ${t.number(e.count)} \u{500B}\u{9805}\u{76EE}`
	})}\u{3002}`,
	selectedItem: (e) => `\u{5DF2}\u{9078}\u{53D6}\u{300C}${e.item}\u{300D}\u{3002}`
};
// ../../node_modules/react-aria/dist/private/grid/intlStrings.mjs
var El = {};
El = {
	"ar-AE": Kc,
	"bg-BG": qc,
	"cs-CZ": Jc,
	"da-DK": Yc,
	"de-DE": Xc,
	"el-GR": Zc,
	"en-US": Qc,
	"es-ES": $c,
	"et-EE": el,
	"fi-FI": tl,
	"fr-FR": nl,
	"he-IL": rl,
	"hr-HR": il,
	"hu-HU": al,
	"it-IT": ol,
	"ja-JP": sl,
	"ko-KR": cl,
	"lt-LT": ll,
	"lv-LV": ul,
	"nb-NO": dl,
	"nl-NL": fl,
	"pl-PL": pl,
	"pt-BR": ml,
	"pt-PT": hl,
	"ro-RO": gl,
	"ru-RU": _l,
	"sk-SK": vl,
	"sl-SI": yl,
	"sr-SP": bl,
	"sv-SE": xl,
	"tr-TR": Sl,
	"uk-UA": Cl,
	"zh-CN": wl,
	"zh-TW": Tl
};
// ../../node_modules/react-aria/dist/private/grid/useGridSelectionAnnouncement.mjs
function Dl(e) {
	return e && e.__esModule ? e.default : e;
}
function Ol(e, t) {
	let { getRowText: n = (e) => t.collection.getTextValue?.(e) ?? t.collection.getItem(e)?.textValue } = e, r = Rn(Dl(El), "@react-aria/grid"), i = t.selectionManager.rawSelection, a = (0, W.useRef)(i), o = (0, W.useCallback)(() => {
		if (!t.selectionManager.isFocused || i === a.current) {
			a.current = i;
			return;
		}
		let e = kl(i, a.current), o = kl(a.current, i), s = t.selectionManager.selectionBehavior === "replace", c = [];
		if (t.selectionManager.selectedKeys.size === 1 && s) {
			let e = t.selectionManager.selectedKeys.keys().next().value;
			if (e != null && t.collection.getItem(e)) {
				let t = n(e);
				t && c.push(r.format("selectedItem", { item: t }));
			}
		} else if (e.size === 1 && o.size === 0) {
			let t = e.keys().next().value;
			if (t != null) {
				let e = n(t);
				e && c.push(r.format("selectedItem", { item: e }));
			}
		} else if (o.size === 1 && e.size === 0) {
			let e = o.keys().next().value;
			if (e != null && t.collection.getItem(e)) {
				let t = n(e);
				t && c.push(r.format("deselectedItem", { item: t }));
			}
		}
		t.selectionManager.selectionMode === "multiple" && (c.length === 0 || i === "all" || i.size > 1 || a.current === "all" || a.current?.size > 1) && c.push(i === "all" ? r.format("selectedAll") : r.format("selectedCount", { count: i.size })), c.length > 0 && tr(c.join(" ")), a.current = i;
	}, [
		i,
		t.selectionManager.selectedKeys,
		t.selectionManager.isFocused,
		t.selectionManager.selectionBehavior,
		t.selectionManager.selectionMode,
		t.collection,
		n,
		r
	]);
	dr(() => {
		if (t.selectionManager.isFocused) o();
		else {
			let e = requestAnimationFrame(o);
			return () => cancelAnimationFrame(e);
		}
	}, [i, t.selectionManager.isFocused]);
}
function kl(e, t) {
	let n = /* @__PURE__ */ new Set();
	if (e === "all" || t === "all") return n;
	for (let r of e.keys()) t.has(r) || n.add(r);
	return n;
}
// ../../node_modules/react-aria/dist/private/focus/useHasTabbableChild.mjs
function Al(e, t) {
	let n = t?.isDisabled, [r, i] = (0, W.useState)(!1);
	return B(() => {
		if (e?.current && !n) {
			let t = () => {
				if (e.current) {
					let t = Y(e.current, { tabbable: !0 });
					i(!!t.nextNode());
				}
			};
			t();
			let n = new MutationObserver(t);
			return n.observe(e.current, {
				subtree: !0,
				childList: !0,
				attributes: !0,
				attributeFilter: ["tabIndex", "disabled"]
			}), () => {
				n.disconnect();
			};
		}
	}), !n && r;
}
// ../../node_modules/react-aria/dist/private/grid/useHighlightSelectionDescription.mjs
function jl(e) {
	return e && e.__esModule ? e.default : e;
}
function Ml(e) {
	let t = Rn(jl(El), "@react-aria/grid"), n = ye(), r = (n === "pointer" || n === "virtual" || n == null) && typeof window < "u" && "ontouchstart" in window;
	return br((0, W.useMemo)(() => {
		let n = e.selectionManager.selectionMode, i = e.selectionManager.selectionBehavior, a;
		return r && (a = t.format("longPressToSelect")), i === "replace" && n !== "none" && e.hasItemActions ? a : void 0;
	}, [
		e.selectionManager.selectionMode,
		e.selectionManager.selectionBehavior,
		e.hasItemActions,
		t,
		r
	]));
}
// ../../node_modules/react-aria/dist/private/gridlist/useGridList.mjs
function Nl(e, t, n) {
	let { isVirtualized: r, keyboardDelegate: i, layoutDelegate: a, onAction: o, disallowTypeAhead: s, linkBehavior: c = "action", keyboardNavigationBehavior: l = "arrow", escapeKeyBehavior: u = "clearSelection", shouldSelectOnPressUp: d } = e;
	!e["aria-label"] && !e["aria-labelledby"] && console.warn("An aria-label or aria-labelledby prop is required for accessibility.");
	let { listProps: f } = Na({
		selectionManager: t.selectionManager,
		collection: t.collection,
		disabledKeys: t.disabledKeys,
		ref: n,
		keyboardDelegate: i,
		layoutDelegate: a,
		isVirtualized: r,
		selectOnFocus: t.selectionManager.selectionBehavior === "replace",
		shouldFocusWrap: e.shouldFocusWrap,
		linkBehavior: c,
		disallowTypeAhead: s,
		autoFocus: e.autoFocus,
		escapeKeyBehavior: u,
		UNSTABLE_focusOnEntry: e.UNSTABLE_focusOnEntry
	}), p = R(e.id);
	Uc.set(t, {
		id: p,
		onAction: o,
		linkBehavior: c,
		keyboardNavigationBehavior: l,
		shouldSelectOnPressUp: d
	});
	let m = Ml({
		selectionManager: t.selectionManager,
		hasItemActions: !!o
	}), h = Al(n, { isDisabled: t.collection.size !== 0 }), g = C(e, { labelable: !0 }), _ = H(g, {
		role: "grid",
		id: p,
		"aria-multiselectable": t.selectionManager.selectionMode === "multiple" ? "true" : void 0
	}, t.collection.size === 0 ? { tabIndex: h ? -1 : 0 } : f, m);
	return r && (_["aria-rowcount"] = t.collection.size, _["aria-colcount"] = 1), Ol({}, t), { gridProps: _ };
}
// ../../node_modules/react-aria/dist/private/gridlist/useGridListItem.mjs
var Pl = {
	expand: {
		ltr: "ArrowRight",
		rtl: "ArrowLeft"
	},
	collapse: {
		ltr: "ArrowLeft",
		rtl: "ArrowRight"
	}
};
function Fl(e, n, r) {
	let { node: s, isVirtualized: c, focusMode: l = "row", allowsArrowNavigation: u } = e, { direction: d } = wn(), { onAction: f, linkBehavior: p, keyboardNavigationBehavior: m, shouldSelectOnPressUp: h } = Uc.get(n), g = pe(), _ = (0, W.useRef)(null), v = () => {
		if (r.current !== null) {
			if (l === "child") {
				if (b(r.current) && r.current !== a(t(r.current))) return;
				let e = Y(r.current, { tabbable: !0 }).firstChild();
				if (e) {
					L(e), _r(e, { containingElement: pr(e) });
					return;
				}
			}
			(_.current != null && s.key !== _.current || !b(r.current)) && L(r.current);
		}
	}, y = {}, x = e.hasChildItems, S = n.selectionManager.isLink(s.key);
	if (s != null && "expandedKeys" in n) {
		let e = n.collection.getChildren?.(s.key);
		x ||= [...e ?? []].length > 1, f == null && !S && n.selectionManager.selectionMode === "none" && x && (f = () => n.toggleKey(s.key));
		let t = x ? n.expandedKeys.has(s.key) : void 0, r = 1, i = s.index;
		if (s.level >= 0 && s?.parentKey != null) {
			let e = n.collection.getItem(s.parentKey);
			if (e) {
				let t = Rl(e, n.collection);
				r = [...t].filter((e) => e.type === "item").length, i > 0 && t[0].type !== "item" && --i;
			}
		} else r = [...n.collection].filter((e) => e.level === 0 && e.type === "item").length;
		y = {
			"aria-expanded": t,
			"aria-level": s.level + 1,
			"aria-posinset": i + 1,
			"aria-setsize": r
		};
	}
	let { itemProps: C, ...w } = Ia({
		selectionManager: n.selectionManager,
		key: s.key,
		ref: r,
		isVirtualized: c,
		shouldSelectOnPressUp: e.shouldSelectOnPressUp || h,
		onAction: f || s.props?.onAction ? he(s.props?.onAction, f ? () => f(s.key) : void 0) : void 0,
		focus: v,
		linkBehavior: p
	}), T = (e) => {
		let o = a(t(r.current));
		if (!U(e.currentTarget, i(e)) || !r.current || !o) return;
		let c = Y(r.current);
		if (c.currentNode = o, !Il(e, n, s, x, d, o, r.current, u)) switch (e.key) {
			case "ArrowLeft":
				if (m === "arrow") {
					let t = d === "rtl" ? c.nextNode() : c.previousNode();
					if (t) e.preventDefault(), e.stopPropagation(), L(t), _r(t, { containingElement: pr(r.current) });
					else if (e.preventDefault(), e.stopPropagation(), d === "rtl") L(r.current), _r(r.current, { containingElement: pr(r.current) });
					else {
						c.currentNode = r.current;
						let e = Ll(c);
						e && (L(e), _r(e, { containingElement: pr(r.current) }));
					}
				}
				break;
			case "ArrowRight":
				if (m === "arrow") {
					let t = d === "rtl" ? c.previousNode() : c.nextNode();
					if (t) e.preventDefault(), e.stopPropagation(), L(t), _r(t, { containingElement: pr(r.current) });
					else if (e.preventDefault(), e.stopPropagation(), d === "ltr") L(r.current), _r(r.current, { containingElement: pr(r.current) });
					else {
						c.currentNode = r.current;
						let e = Ll(c);
						e && (L(e), _r(e, { containingElement: pr(r.current) }));
					}
				}
				break;
			case "ArrowUp":
			case "ArrowDown": !e.altKey && U(r.current, i(e)) && (e.stopPropagation(), e.preventDefault(), r.current.parentElement?.dispatchEvent(new KeyboardEvent(e.nativeEvent.type, e.nativeEvent)));
		}
	}, E = (e) => {
		_.current = s.key, i(e) === r.current ? l === "child" && e.relatedTarget && U(r.current, e.relatedTarget) || requestAnimationFrame(() => {
			l === "child" && a(t(r.current)) === r.current && v();
		}) : xe() || n.selectionManager.setFocusedKey(s.key);
	}, D = (e) => {
		let o = a(t(r.current));
		if (U(e.currentTarget, i(e)) && r.current && o) {
			if (m === "tab") {
				if (i(e) !== r.current && e.key !== "Tab") {
					e.stopPropagation();
					return;
				}
				if (Il(e, n, s, x, d, o, r.current, u)) return;
			}
			if (e.key === "Tab" && m === "tab") {
				let t = Y(r.current, { tabbable: !0 });
				t.currentNode = o, (e.shiftKey ? t.previousNode() : t.nextNode()) && e.stopPropagation();
			}
		}
	}, O = o(s.props), k = w.hasAction ? O : {}, A = H(C, k, {
		role: "row",
		onKeyDownCapture: m === "arrow" || u ? T : void 0,
		onFocus: E,
		"aria-label": s["aria-label"] || s.textValue || void 0,
		"aria-selected": n.selectionManager.canSelectItem(s.key) ? n.selectionManager.isSelected(s.key) : void 0,
		"aria-disabled": n.selectionManager.isDisabled(s.key) || void 0,
		"aria-labelledby": g && (s["aria-label"] || s.textValue) ? `${Wc(n, s.key)} ${g}` : void 0,
		id: Wc(n, s.key)
	});
	l === "child" && u && m === "tab" && (A.tabIndex = -1);
	let j = A.onKeyDown;
	if (A.onKeyDown = (e) => {
		D(e), e.isPropagationStopped() || j?.(e);
	}, c) {
		let { collection: e } = n;
		A["aria-rowindex"] = [...e].find((e) => e.type === "section") ? [...e.getKeys()].filter((t) => e.getItem(t)?.type !== "section").findIndex((e) => e === s.key) + 1 : s.index + 1;
	}
	let M = {
		role: "gridcell",
		"aria-colindex": 1
	};
	return {
		rowProps: { ...H(A, y) },
		gridCellProps: M,
		descriptionProps: { id: g },
		...w
	};
}
function Il(e, t, n, r, i, a, o, s) {
	if (!("expandedKeys" in t) || !s && a !== o) return !1;
	if (e.key === Pl.expand[i] && t.selectionManager.focusedKey === n.key && r && !t.expandedKeys.has(n.key)) return t.toggleKey(n.key), e.stopPropagation(), !0;
	if (e.key === Pl.collapse[i] && t.selectionManager.focusedKey === n.key) {
		if (r && t.expandedKeys.has(n.key)) return t.toggleKey(n.key), e.stopPropagation(), !0;
		if (!t.expandedKeys.has(n.key) && n.parentKey && t.collection.getItem(n.parentKey)?.type === "item") return t.selectionManager.setFocusedKey(n.parentKey), e.stopPropagation(), !0;
	}
	return !1;
}
function Ll(e) {
	let t = null, n = null;
	do
		n = e.lastChild(), n && (t = n);
	while (n);
	return t;
}
function Rl(e, t) {
	let n = t.getChildren?.(e.key), r = n ? Array.from(n) : [], i = r.length > 0 ? r[0] : null, a = [];
	for (; i;) a.push(i), i = i.nextKey == null ? null : t.getItem(i.nextKey);
	return a;
}
// ../../node_modules/react-aria/dist/private/grid/useGridSelectionCheckbox.mjs
function zl(e) {
	return e && e.__esModule ? e.default : e;
}
function Bl(e, t) {
	let { key: n } = e, r = t.selectionManager, i = R(), a = !t.selectionManager.canSelectItem(n), o = t.selectionManager.isSelected(n);
	return { checkboxProps: {
		id: i,
		"aria-label": Rn(zl(El), "@react-aria/grid").format("select"),
		isSelected: o,
		isDisabled: a,
		onChange: () => r.toggleSelection(n)
	} };
}
// ../../node_modules/react-aria/dist/private/gridlist/useGridListSelectionCheckbox.mjs
function Vl(e, t) {
	let { key: n } = e, { checkboxProps: r } = Bl(e, t);
	return { checkboxProps: {
		...r,
		"aria-labelledby": `${r.id} ${Wc(t, n)}`
	} };
}
// ../../node_modules/react-aria-components/dist/private/GridList.mjs
var Hl = /*#__PURE__*/ (0, W.createContext)(null), Ul = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	return [e, t] = d(e, t, Hl), /*#__PURE__*/ W.createElement(Yt, { content: /*#__PURE__*/ W.createElement(cn, e) }, (n) => /*#__PURE__*/ W.createElement(Wl, {
		props: e,
		collection: n,
		gridListRef: t
	}));
});
function Wl({ props: e, collection: t, gridListRef: n }) {
	[e, n] = d(e, n, Bi);
	let { shouldUseVirtualFocus: r, filter: i, disallowTypeAhead: a, UNSTABLE_focusOnEntry: o, ...c } = e, { dragAndDropHooks: l, keyboardNavigationBehavior: u = "arrow", layout: f = "stack", orientation: p = "vertical" } = e, { CollectionRoot: m, isVirtualized: h, layoutDelegate: g, dropTargetDelegate: _ } = (0, W.useContext)(pn), v = ro(no({
		...c,
		collection: t,
		children: void 0,
		layoutDelegate: g
	}), i), y = Ma({
		usage: "search",
		sensitivity: "base"
	}), { disabledBehavior: b, disabledKeys: x } = v.selectionManager, { direction: S } = wn(), w = (0, W.useMemo)(() => new Aa({
		collection: v.collection,
		collator: y,
		ref: n,
		disabledKeys: x,
		disabledBehavior: b,
		layoutDelegate: g,
		layout: f,
		orientation: p,
		direction: S
	}), [
		v.collection,
		n,
		f,
		p,
		x,
		b,
		g,
		y,
		S
	]), { gridProps: T } = Nl({
		...c,
		keyboardDelegate: w,
		keyboardNavigationBehavior: f === "grid" ? "tab" : u,
		isVirtualized: h,
		shouldSelectOnPressUp: e.shouldSelectOnPressUp,
		disallowTypeAhead: a,
		UNSTABLE_focusOnEntry: o
	}, v, n), D = v.selectionManager, O = !!l?.useDraggableCollectionState, k = !!l?.useDroppableCollectionState;
	(0, W.useRef)(O), (0, W.useRef)(k), (0, W.useEffect)(() => {}, [O, k]);
	let A, j, M, N = !1, P = null, F = (0, W.useRef)(null);
	if (O && l) {
		A = l.useDraggableCollectionState({
			collection: v.collection,
			selectionManager: D,
			preview: l.renderDragPreview ? F : void 0
		}), l.useDraggableCollection({}, A, n);
		let e = l.DragPreview;
		P = l.renderDragPreview ? /*#__PURE__*/ W.createElement(e, { ref: F }, l.renderDragPreview) : null;
	}
	if (k && l) {
		j = l.useDroppableCollectionState({
			collection: v.collection,
			selectionManager: D
		});
		let e = l.dropTargetDelegate || _ || new l.ListDropTargetDelegate(t, n, {
			layout: f,
			direction: S,
			orientation: p
		});
		M = l.useDroppableCollection({
			keyboardDelegate: w,
			dropTargetDelegate: e
		}, j, n), N = j.isDropTarget({ type: "root" });
	}
	let { focusProps: ee, isFocused: I, isFocusVisible: te } = le(), L = v.collection.size === 0, ne = {
		isDropTarget: N,
		orientation: p,
		isEmpty: L,
		isFocused: I,
		isFocusVisible: te,
		layout: f,
		state: v
	}, R = V({
		...e,
		children: void 0,
		defaultClassName: "react-aria-GridList",
		values: ne
	}), z = null;
	if (L && e.renderEmptyState) {
		let t = e.renderEmptyState(ne);
		z = /*#__PURE__*/ W.createElement("div", {
			role: "row",
			"aria-rowindex": 1,
			style: { display: "contents" }
		}, /*#__PURE__*/ W.createElement("div", {
			role: "gridcell",
			style: { display: "contents" }
		}, t));
	}
	let re = C(e, { global: !0 });
	return /*#__PURE__*/ W.createElement(Xi, null, /*#__PURE__*/ W.createElement(E.div, {
		...H(re, R, T, ee, M?.collectionProps, null),
		ref: n,
		slot: e.slot || void 0,
		onScroll: e.onScroll,
		"data-drop-target": N || void 0,
		"data-empty": L || void 0,
		"data-focused": I || void 0,
		"data-focus-visible": te || void 0,
		"data-layout": f,
		"data-orientation": p
	}, /*#__PURE__*/ W.createElement(s, { values: [
		[oo, v],
		[vi, {
			dragAndDropHooks: l,
			dragState: A,
			dropState: j
		}],
		[yi, { render: Kl }]
	] }, k && /*#__PURE__*/ W.createElement(Yl, null), /*#__PURE__*/ W.createElement(Ui, null, /*#__PURE__*/ W.createElement(m, {
		collection: v.collection,
		scrollRef: n,
		persistedKeys: Si(D, l, j),
		renderDropIndicator: xi(l, j)
	}))), z, P));
}
var Gl = /*#__PURE__*/ rn(Mt, function(e, t, n) {
	let r = (0, W.useContext)(oo), { dragAndDropHooks: i, dragState: a, dropState: o } = (0, W.useContext)(vi), c = F(t), { isVirtualized: l } = (0, W.useContext)(pn), u = a && !(a.isDisabled || a.selectionManager.isDisabled(n.key)), { rowProps: d, gridCellProps: f, descriptionProps: p, ...m } = Fl({
		node: n,
		shouldSelectOnPressUp: !!a,
		isVirtualized: l,
		focusMode: e.focusMode,
		allowsArrowNavigation: e.allowsArrowNavigation
	}, r, c), { hoverProps: h, isHovered: g } = O({
		isDisabled: !m.allowsSelection && !m.hasAction && !u,
		onHoverStart: n.props.onHoverStart,
		onHoverChange: n.props.onHoverChange,
		onHoverEnd: n.props.onHoverEnd
	}), { isFocusVisible: _, focusProps: v } = le(), { isFocusVisible: y, focusProps: b } = le({ within: !0 }), { checkboxProps: x } = Vl({ key: n.key }, r), S = r.selectionManager.disabledBehavior === "all" && m.isDisabled ? { isDisabled: !0 } : {}, T = null;
	a && i && (T = i.useDraggableItem({
		key: n.key,
		hasDragButton: !0
	}, a));
	let D = null, k = (0, W.useRef)(null), { visuallyHiddenProps: A } = Tr();
	o && i && (D = i.useDropIndicator({ target: {
		type: "item",
		key: n.key,
		dropPosition: "on"
	} }, o, k));
	let j = a && a.isDragging(n.key), M = V({
		...e,
		id: void 0,
		children: n.rendered,
		defaultClassName: "react-aria-GridListItem",
		values: {
			...m,
			isHovered: g,
			isFocusVisible: _,
			isFocusVisibleWithin: y,
			selectionMode: r.selectionManager.selectionMode,
			selectionBehavior: r.selectionManager.selectionBehavior,
			allowsDragging: !!a,
			isDragging: j,
			isDropTarget: D?.isDropTarget,
			id: n.key,
			state: r
		}
	}), N = (0, W.useRef)(null);
	(0, W.useEffect)(() => {
		a && !N.current && console.warn("Draggable items in a GridList must contain a <Button slot=\"drag\"> element so that keyboard and screen reader users can drag them.");
	}, []), (0, W.useEffect)(() => {
		n.textValue;
	}, [n.textValue]);
	let P = C(e, { global: !0 });
	return delete P.id, delete P.onClick, /*#__PURE__*/ W.createElement(W.Fragment, null, D && !D.isHidden && /*#__PURE__*/ W.createElement("div", {
		role: "row",
		style: { position: "absolute" }
	}, /*#__PURE__*/ W.createElement("div", { role: "gridcell" }, /*#__PURE__*/ W.createElement("div", {
		role: "button",
		...A,
		...D?.dropIndicatorProps,
		ref: k
	}))), /*#__PURE__*/ W.createElement(E.div, {
		...H(P, M, d, v, b, h, T?.dragProps),
		ref: c,
		"data-selected": m.isSelected || void 0,
		"data-disabled": m.isDisabled || void 0,
		"data-hovered": g || void 0,
		"data-focused": m.isFocused || void 0,
		"data-focus-visible": _ || void 0,
		"data-focus-visible-within": y || void 0,
		"data-pressed": m.isPressed || void 0,
		"data-allows-dragging": !!a || void 0,
		"data-dragging": j || void 0,
		"data-drop-target": D?.isDropTarget || void 0,
		"data-selection-mode": r.selectionManager.selectionMode === "none" ? void 0 : r.selectionManager.selectionMode
	}, /*#__PURE__*/ W.createElement("div", {
		...f,
		style: { display: "contents" }
	}, /*#__PURE__*/ W.createElement(s, { values: [
		[ni, { slots: {
			[w]: {},
			selection: x
		} }],
		[ri, { slots: {
			[w]: {},
			selection: x
		} }],
		[ir, { slots: {
			[w]: S,
			drag: {
				...T?.dragButtonProps,
				ref: N,
				style: { pointerEvents: "none" }
			}
		} }],
		[lr, { slots: {
			[w]: {},
			description: p
		} }],
		[pn, un],
		[oo, null],
		[Bi, null],
		[Vi, null],
		[Wi, { isSelected: m.isSelected }]
	] }, M.children))));
});
function Kl(e, t) {
	t = F(t);
	let { dragAndDropHooks: n, dropState: r } = (0, W.useContext)(vi), i = (0, W.useRef)(null), { dropIndicatorProps: a, isHidden: o, isDropTarget: s } = n.useDropIndicator(e, r, i);
	return o ? null : /*#__PURE__*/ W.createElement(Jl, {
		...e,
		dropIndicatorProps: a,
		isDropTarget: s,
		buttonRef: i,
		ref: t
	});
}
function ql(e, t) {
	let { dropIndicatorProps: n, isDropTarget: r, buttonRef: i, ...a } = e, { visuallyHiddenProps: o } = Tr(), s = V({
		...a,
		defaultClassName: "react-aria-DropIndicator",
		values: { isDropTarget: r }
	});
	return /*#__PURE__*/ W.createElement(E.div, {
		...s,
		role: "row",
		ref: t,
		"data-drop-target": r || void 0
	}, /*#__PURE__*/ W.createElement("div", { role: "gridcell" }, /*#__PURE__*/ W.createElement("div", {
		...o,
		role: "button",
		...n,
		ref: i
	}), s.children));
}
var Jl = /*#__PURE__*/ (0, W.forwardRef)(ql);
function Yl() {
	let { dragAndDropHooks: e, dropState: t } = (0, W.useContext)(vi), n = (0, W.useRef)(null), { dropIndicatorProps: r } = e.useDropIndicator({ target: { type: "root" } }, t, n), i = t.isDropTarget({ type: "root" }), { visuallyHiddenProps: a } = Tr();
	return !i && r["aria-hidden"] ? null : /*#__PURE__*/ W.createElement("div", {
		role: "row",
		"aria-hidden": r["aria-hidden"],
		style: { position: "absolute" }
	}, /*#__PURE__*/ W.createElement("div", { role: "gridcell" }, /*#__PURE__*/ W.createElement("div", {
		role: "button",
		...a,
		...r,
		ref: n
	})));
}
rn(jt, function(e, t, n) {
	let r = (0, W.useContext)(oo), { isVirtualized: i } = (0, W.useContext)(pn), { isLoading: a, onLoadMore: o, scrollOffset: s, ...c } = e, l = (0, W.useRef)(null);
	ao((0, W.useMemo)(() => ({
		onLoadMore: o,
		collection: r?.collection,
		sentinelRef: l,
		scrollOffset: s
	}), [
		o,
		s,
		l,
		r?.collection
	]), l);
	let u = V({
		...c,
		id: void 0,
		children: n.rendered,
		defaultClassName: "react-aria-GridListLoadingIndicator",
		values: void 0
	});
	return /*#__PURE__*/ W.createElement(W.Fragment, null, /*#__PURE__*/ W.createElement("div", {
		style: {
			position: "relative",
			width: 0,
			height: 0
		},
		inert: Wa(!0)
	}, /*#__PURE__*/ W.createElement("div", {
		"data-testid": "loadMoreSentinel",
		ref: l,
		style: {
			position: "absolute",
			height: 1,
			width: 1
		}
	})), a && u.children && /*#__PURE__*/ W.createElement(E.div, {
		...u,
		...C(e, { global: !0 }),
		role: "row",
		ref: t
	}, /*#__PURE__*/ W.createElement("div", {
		"aria-colindex": i ? 1 : void 0,
		role: "gridcell"
	}, u.children)));
});
// ../../packages/ui/src/primitives/GridList/GridList.tsx
function Xl({ children: e, layout: t = "grid", ...n }) {
	return /* @__PURE__ */ (0, G.jsx)(Ul, {
		...n,
		layout: t,
		children: e
	});
}
function Zl({ children: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Gl, {
		textValue: typeof e == "string" ? e : void 0,
		...t,
		children: ({ selectionMode: t, selectionBehavior: n, allowsDragging: r }) => /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [
			r && /* @__PURE__ */ (0, G.jsx)(ar, {
				slot: "drag",
				children: /* @__PURE__ */ (0, G.jsx)(ht, { size: 16 })
			}),
			t === "multiple" && n === "toggle" && /* @__PURE__ */ (0, G.jsx)(fi, { slot: "selection" }),
			e
		] })
	});
}
// ../../node_modules/react-aria-components/dist/private/TreeDropTargetDelegate.mjs
var Ql = 10, $l = 5, eu = class {
	setup(e, t, n) {
		this.delegate = e, this.state = t, this.direction = n;
	}
	getDropTargetFromPoint(e, t, n) {
		let r = this.delegate.getDropTargetFromPoint(e, t, n);
		return !r || r.type === "root" ? r : this.resolveDropTarget(r, e, t, n);
	}
	resolveDropTarget(e, t, n, r) {
		let i = this.pointerTracking, a = n - i.lastY, o = t - i.lastX, s = i.yDirection, c = i.xDirection;
		if (Math.abs(a) > $l && (s = a > 0 ? "down" : "up", i.yDirection = s, i.lastY = n), Math.abs(o) > Ql && (c = o > 0 ? "right" : "left", i.xDirection = c, i.lastX = t), e.dropPosition === "before") {
			let t = this.state.collection.getKeyBefore(e.key);
			for (; t != null;) {
				let e = this.state.collection.getItem(t);
				if (e?.type === "item") break;
				t = e?.parentKey ?? null;
			}
			if (t != null) {
				let n = {
					type: "item",
					key: t,
					dropPosition: "after"
				};
				r(n) && (e = n);
			}
		}
		let l = this.getPotentialTargets(e, r);
		if (l.length === 0) return { type: "root" };
		let u;
		return l.length > 1 ? u = this.selectTarget(l, e, t, n, s, c) : (u = l[0], i.boundaryContext = null), u;
	}
	getPotentialTargets(e, t) {
		if (e.dropPosition === "on") return [e];
		let n = e, r = this.state.collection, i = r.getItem(n.key);
		for (; i && i?.type !== "item" && i.nextKey != null;) n.key = i.nextKey, i = r.getItem(i.nextKey);
		let a = [n];
		if (i && i.hasChildNodes && this.state.expandedKeys.has(i.key) && r.getChildren && n.dropPosition === "after") {
			let e = i.firstChildKey == null ? null : r.getItem(i.firstChildKey);
			for (; e && e.type !== "item";) e = e.nextKey == null ? null : r.getItem(e.nextKey);
			if (e?.type === "item") {
				let n = {
					type: "item",
					key: e.key,
					dropPosition: "before"
				};
				return t(n) ? [n] : [];
			}
		}
		if (i?.nextKey != null) return [e];
		let o = i?.parentKey, s = [];
		for (; o != null;) {
			let e = r.getItem(o), n = e?.nextKey == null ? null : r.getItem(e.nextKey);
			if (!n || n.parentKey !== o) {
				if (e?.type === "item") {
					let e = {
						type: "item",
						key: o,
						dropPosition: "after"
					};
					t(e) && s.push(e);
				}
				if (n) break;
			}
			o = e?.parentKey;
		}
		if (s.length > 0 && a.push(...s), a.length === 1) {
			let e = r.getKeyAfter(n.key), a = e == null ? null : r.getItem(e);
			if (e != null && a && i && a.level != null && i.level != null && a.level > i.level) {
				let n = {
					type: "item",
					key: e,
					dropPosition: "before"
				};
				if (t(n)) return [n];
			}
		}
		return a.filter(t);
	}
	selectTarget(e, t, n, r, i, a) {
		if (e.length < 2) return e[0];
		let o = this.pointerTracking, s = this.state.collection.getItem(t.key)?.parentKey;
		if (s == null) return e[0];
		o.boundaryContext && o.boundaryContext.parentKey === s || (o.boundaryContext = {
			parentKey: s,
			preferredTargetIndex: o.yDirection === "up" ? e.length - 1 : 0,
			lastSwitchY: r,
			lastSwitchX: n
		});
		let c = o.boundaryContext, l = Math.abs(n - c.lastSwitchX);
		if (Math.abs(r - c.lastSwitchY) > $l && i) {
			let t = c.preferredTargetIndex || 0;
			i === "down" && t === 0 ? c.preferredTargetIndex = e.length - 1 : i === "up" && t === e.length - 1 && (c.preferredTargetIndex = 0), o.xDirection = null;
		}
		if (l > Ql && a) {
			let t = c.preferredTargetIndex || 0;
			a === "left" ? this.direction === "ltr" ? t < e.length - 1 && (c.preferredTargetIndex = t + 1, c.lastSwitchX = n) : t > 0 && (c.preferredTargetIndex = t - 1, c.lastSwitchX = n) : a === "right" && (this.direction === "ltr" ? t > 0 && (c.preferredTargetIndex = t - 1, c.lastSwitchX = n) : t < e.length - 1 && (c.preferredTargetIndex = t + 1, c.lastSwitchX = n)), o.yDirection = null;
		}
		return e[Math.max(0, Math.min(c.preferredTargetIndex || 0, e.length - 1))];
	}
	constructor() {
		this.delegate = null, this.state = null, this.direction = "ltr", this.pointerTracking = {
			lastY: 0,
			lastX: 0,
			yDirection: null,
			xDirection: null,
			boundaryContext: null
		};
	}
};
// ../../node_modules/react-aria/dist/private/tree/useTree.mjs
function tu(e, t, n) {
	let { gridProps: r } = Nl(e, t, n);
	return r.role = "treegrid", { gridProps: r };
}
// ../../node_modules/react-aria/dist/private/intl/tree/ar-AE.mjs
var nu = {};
nu = {
	collapse: "طي",
	expand: "تمديد"
};
// ../../node_modules/react-aria/dist/private/intl/tree/bg-BG.mjs
var ru = {};
ru = {
	collapse: "Свиване",
	expand: "Разширяване"
};
// ../../node_modules/react-aria/dist/private/intl/tree/cs-CZ.mjs
var iu = {};
iu = {
	collapse: "Sbalit",
	expand: "Roztáhnout"
};
// ../../node_modules/react-aria/dist/private/intl/tree/da-DK.mjs
var au = {};
au = {
	collapse: "Skjul",
	expand: "Udvid"
};
// ../../node_modules/react-aria/dist/private/intl/tree/de-DE.mjs
var ou = {};
ou = {
	collapse: "Reduzieren",
	expand: "Erweitern"
};
// ../../node_modules/react-aria/dist/private/intl/tree/el-GR.mjs
var su = {};
su = {
	collapse: "Σύμπτυξη",
	expand: "Ανάπτυξη"
};
// ../../node_modules/react-aria/dist/private/intl/tree/en-US.mjs
var cu = {};
cu = {
	expand: "Expand",
	collapse: "Collapse"
};
// ../../node_modules/react-aria/dist/private/intl/tree/es-ES.mjs
var lu = {};
lu = {
	collapse: "Contraer",
	expand: "Expandir"
};
// ../../node_modules/react-aria/dist/private/intl/tree/et-EE.mjs
var uu = {};
uu = {
	collapse: "Ahenda",
	expand: "Laienda"
};
// ../../node_modules/react-aria/dist/private/intl/tree/fi-FI.mjs
var du = {};
du = {
	collapse: "Pienennä",
	expand: "Laajenna"
};
// ../../node_modules/react-aria/dist/private/intl/tree/fr-FR.mjs
var fu = {};
fu = {
	collapse: "Réduire",
	expand: "Développer"
};
// ../../node_modules/react-aria/dist/private/intl/tree/he-IL.mjs
var pu = {};
pu = {
	collapse: "כווץ",
	expand: "הרחב"
};
// ../../node_modules/react-aria/dist/private/intl/tree/hr-HR.mjs
var mu = {};
mu = {
	collapse: "Sažmi",
	expand: "Proširi"
};
// ../../node_modules/react-aria/dist/private/intl/tree/hu-HU.mjs
var hu = {};
hu = {
	collapse: "Összecsukás",
	expand: "Kibontás"
};
// ../../node_modules/react-aria/dist/private/intl/tree/it-IT.mjs
var gu = {};
gu = {
	collapse: "Comprimi",
	expand: "Espandi"
};
// ../../node_modules/react-aria/dist/private/intl/tree/ja-JP.mjs
var _u = {};
_u = {
	collapse: "折りたたむ",
	expand: "展開"
};
// ../../node_modules/react-aria/dist/private/intl/tree/ko-KR.mjs
var vu = {};
vu = {
	collapse: "접기",
	expand: "펼치기"
};
// ../../node_modules/react-aria/dist/private/intl/tree/lt-LT.mjs
var yu = {};
yu = {
	collapse: "Sutraukti",
	expand: "Išskleisti"
};
// ../../node_modules/react-aria/dist/private/intl/tree/lv-LV.mjs
var bu = {};
bu = {
	collapse: "Sakļaut",
	expand: "Izvērst"
};
// ../../node_modules/react-aria/dist/private/intl/tree/nb-NO.mjs
var xu = {};
xu = {
	collapse: "Skjul",
	expand: "Utvid"
};
// ../../node_modules/react-aria/dist/private/intl/tree/nl-NL.mjs
var Su = {};
Su = {
	collapse: "Samenvouwen",
	expand: "Uitvouwen"
};
// ../../node_modules/react-aria/dist/private/intl/tree/pl-PL.mjs
var Cu = {};
Cu = {
	collapse: "Zwiń",
	expand: "Rozwiń"
};
// ../../node_modules/react-aria/dist/private/intl/tree/pt-BR.mjs
var wu = {};
wu = {
	collapse: "Recolher",
	expand: "Expandir"
};
// ../../node_modules/react-aria/dist/private/intl/tree/pt-PT.mjs
var Tu = {};
Tu = {
	collapse: "Colapsar",
	expand: "Expandir"
};
// ../../node_modules/react-aria/dist/private/intl/tree/ro-RO.mjs
var Eu = {};
Eu = {
	collapse: "Restrângeți",
	expand: "Extindeți"
};
// ../../node_modules/react-aria/dist/private/intl/tree/ru-RU.mjs
var Du = {};
Du = {
	collapse: "Свернуть",
	expand: "Развернуть"
};
// ../../node_modules/react-aria/dist/private/intl/tree/sk-SK.mjs
var Ou = {};
Ou = {
	collapse: "Zbaliť",
	expand: "Rozbaliť"
};
// ../../node_modules/react-aria/dist/private/intl/tree/sl-SI.mjs
var ku = {};
ku = {
	collapse: "Strni",
	expand: "Razširi"
};
// ../../node_modules/react-aria/dist/private/intl/tree/sr-SP.mjs
var Au = {};
Au = {
	collapse: " Skupi",
	expand: "Proširi"
};
// ../../node_modules/react-aria/dist/private/intl/tree/sv-SE.mjs
var ju = {};
ju = {
	collapse: "Dölj",
	expand: "Expandera"
};
// ../../node_modules/react-aria/dist/private/intl/tree/tr-TR.mjs
var Mu = {};
Mu = {
	collapse: "Daralt",
	expand: "Genişlet"
};
// ../../node_modules/react-aria/dist/private/intl/tree/uk-UA.mjs
var Nu = {};
Nu = {
	collapse: "Згорнути",
	expand: "Розгорнути"
};
// ../../node_modules/react-aria/dist/private/intl/tree/zh-CN.mjs
var Pu = {};
Pu = {
	collapse: "折叠",
	expand: "扩展"
};
// ../../node_modules/react-aria/dist/private/intl/tree/zh-TW.mjs
var Fu = {};
Fu = {
	collapse: "收合",
	expand: "展開"
};
// ../../node_modules/react-aria/dist/private/tree/intlStrings.mjs
var Iu = {};
Iu = {
	"ar-AE": nu,
	"bg-BG": ru,
	"cs-CZ": iu,
	"da-DK": au,
	"de-DE": ou,
	"el-GR": su,
	"en-US": cu,
	"es-ES": lu,
	"et-EE": uu,
	"fi-FI": du,
	"fr-FR": fu,
	"he-IL": pu,
	"hr-HR": mu,
	"hu-HU": hu,
	"it-IT": gu,
	"ja-JP": _u,
	"ko-KR": vu,
	"lt-LT": yu,
	"lv-LV": bu,
	"nb-NO": xu,
	"nl-NL": Su,
	"pl-PL": Cu,
	"pt-BR": wu,
	"pt-PT": Tu,
	"ro-RO": Eu,
	"ru-RU": Du,
	"sk-SK": Ou,
	"sl-SI": ku,
	"sr-SP": Au,
	"sv-SE": ju,
	"tr-TR": Mu,
	"uk-UA": Nu,
	"zh-CN": Pu,
	"zh-TW": Fu
};
// ../../node_modules/react-aria/dist/private/tree/useTreeItem.mjs
function Lu(e) {
	return e && e.__esModule ? e.default : e;
}
function Ru(e, t, n) {
	let { node: r } = e, i = Fl(e, t, n), a = i.rowProps["aria-expanded"] === !0, o = Rn(Lu(Iu), "@react-aria/tree"), s = {
		onPress: () => {
			i.isDisabled || (t.toggleKey(r.key), t.selectionManager.setFocused(!0), t.selectionManager.setFocusedKey(r.key));
		},
		excludeFromTabOrder: !0,
		preventFocusOnPress: !0,
		"data-react-aria-prevent-focus": !0,
		...Vn({
			"aria-label": a ? o.format("collapse") : o.format("expand"),
			"aria-labelledby": i.rowProps.id
		})
	};
	return {
		...i,
		expandButtonProps: s
	};
}
// ../../node_modules/react-aria-components/dist/private/Tree.mjs
var zu = class e extends Nt {
	withExpandedKeys(t, n) {
		let r = this.clone();
		return r.expandedKeys = n, e.cloneAncestorSections(n, t, r), e.cloneAncestorSections(t, n, r), r.frozen = this.frozen, r;
	}
	static cloneAncestorSections(e, t, n) {
		for (let r of e) if (!t.has(r)) {
			let e = r;
			for (; e != null;) {
				let t = n.getItem(e);
				if (t?.type === "section") {
					n.keyMap.set(e, t.clone());
					break;
				}
				e = t?.parentKey ?? null;
			}
		}
	}
	*[Symbol.iterator]() {
		let e = this.getFirstKey(), t = e == null ? null : this.getItem(e);
		for (; t;) if (yield t, t.type === "section") t = t.nextKey == null ? null : this.getItem(t.nextKey);
		else {
			let e = this.getKeyAfter(t.key);
			t = e == null ? null : this.getItem(e);
		}
	}
	getLastKey() {
		let e = this.lastKey;
		if (e == null) return null;
		let t = this.getItem(e);
		for (; t?.lastChildKey != null && (t.type !== "item" || this.expandedKeys.has(t.key));) t = this.getItem(t.lastChildKey);
		return t?.key;
	}
	getKeyAfter(e) {
		let t = this.getItem(e);
		if (!t) return null;
		if ((this.expandedKeys.has(t.key) || t.type !== "item") && t.firstChildKey != null) return t.firstChildKey;
		for (; t;) {
			if (t.nextKey != null) return t.nextKey;
			if (t.parentKey != null) t = this.getItem(t.parentKey);
			else return null;
		}
		return null;
	}
	getKeyBefore(e) {
		let t = this.getItem(e);
		if (!t) return null;
		if (t.prevKey != null) {
			for (t = this.getItem(t.prevKey); t && (t.type !== "item" || this.expandedKeys.has(t.key)) && t.lastChildKey != null;) t = this.getItem(t.lastChildKey);
			return t?.key ?? null;
		}
		return t.parentKey;
	}
	getChildren(e) {
		let t = this;
		return { *[Symbol.iterator]() {
			let n = t.getItem(e), r = n?.firstChildKey == null ? null : t.getItem(n.firstChildKey);
			if (n && n.type === "section" && r) for (; r && r.key !== n.nextKey;) {
				yield t.getItem(r.key);
				let e = t.getKeyAfter(r.key);
				r = e == null ? null : t.getItem(e);
			}
			else for (; r;) yield r, r = r.nextKey == null ? null : t.getItem(r.nextKey);
		} };
	}
	getTextValue(e) {
		let t = this.getItem(e);
		return t ? t.textValue : "";
	}
	constructor(...e) {
		super(...e), this.expandedKeys = /* @__PURE__ */ new Set();
	}
}, Bu = /*#__PURE__*/ (0, W.createContext)(null), Vu = /*#__PURE__*/ (0, W.createContext)(null), Hu = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	return [e, t] = d(e, t, Bu), /*#__PURE__*/ W.createElement(Yt, {
		content: /*#__PURE__*/ W.createElement(cn, e),
		createCollection: () => new zu()
	}, (n) => /*#__PURE__*/ W.createElement(Wu, {
		props: e,
		collection: n,
		treeRef: t
	}));
}), Uu = {
	expand: {
		ltr: "ArrowRight",
		rtl: "ArrowLeft"
	},
	collapse: {
		ltr: "ArrowLeft",
		rtl: "ArrowRight"
	}
};
function Wu({ props: e, collection: t, treeRef: n }) {
	let { dragAndDropHooks: r } = e, { direction: i } = wn(), a = Ma({
		usage: "search",
		sensitivity: "base"
	}), o = !!r?.useDraggableCollectionState, c = !!r?.useDroppableCollectionState, l = (0, W.useRef)(o), u = (0, W.useRef)(c);
	(0, W.useEffect)(() => {
		l.current !== o && console.warn("Drag hooks were provided during one render, but not another. This should be avoided as it may produce unexpected behavior."), u.current !== c && console.warn("Drop hooks were provided during one render, but not another. This should be avoided as it may produce unexpected behavior.");
	}, [o, c]);
	let { selectionMode: d = "none", expandedKeys: f, defaultExpandedKeys: p, onExpandedChange: m, disabledBehavior: h = "all" } = e, { CollectionRoot: g, isVirtualized: _, layoutDelegate: v, dropTargetDelegate: y } = (0, W.useContext)(pn), [b, x] = Cr(f ? new Set(f) : void 0, p ? new Set(p) : /* @__PURE__ */ new Set(), m), [S, w] = (0, W.useState)(t), [T, D] = (0, W.useState)(b), [O, k] = (0, W.useState)(() => t.withExpandedKeys(T, b));
	Qu(T, b) && t === S || (k(t.withExpandedKeys(T, b)), w(t), D(b));
	let A = mo({
		...e,
		selectionMode: d,
		expandedKeys: b,
		onExpandedChange: x,
		collection: O,
		children: void 0,
		disabledBehavior: h
	}), { gridProps: j } = tu({
		...e,
		isVirtualized: _,
		layoutDelegate: v
	}, A, n), M, N, P, F = !1, ee = null, I = (0, W.useRef)(null);
	if (o && r) {
		M = r.useDraggableCollectionState({
			collection: A.collection,
			selectionManager: A.selectionManager,
			preview: r.renderDragPreview ? I : void 0
		}), r.useDraggableCollection({}, M, n);
		let e = r.DragPreview;
		ee = r.renderDragPreview ? /*#__PURE__*/ W.createElement(e, { ref: I }, r.renderDragPreview) : null;
	}
	let [te] = (0, W.useState)(() => new eu());
	if (c && r) {
		N = r.useDroppableCollectionState({
			collection: A.collection,
			selectionManager: A.selectionManager
		});
		let e = r.dropTargetDelegate || y || new r.ListDropTargetDelegate(A.collection, n, { direction: i });
		te.setup(e, A, i);
		let t = new Aa({
			collection: A.collection,
			collator: a,
			ref: n,
			disabledKeys: A.selectionManager.disabledKeys,
			disabledBehavior: A.selectionManager.disabledBehavior,
			direction: i,
			layoutDelegate: v
		});
		P = r.useDroppableCollection({
			keyboardDelegate: t,
			dropTargetDelegate: te,
			onDropActivate: (e) => {
				if (e.target.type === "item") {
					let t = e.target.key, n = A.collection.getItem(t), i = b.has(t);
					n && n.hasChildNodes && (!i || r?.isVirtualDragging?.()) && A.toggleKey(t);
				}
			},
			onKeyDown: (e) => {
				let t = N?.target;
				if (t && t.type === "item" && t.dropPosition === "on") {
					let n = A.collection.getItem(t.key);
					(e.key === Uu.expand[i] && n?.hasChildNodes && !A.expandedKeys.has(t.key) || e.key === Uu.collapse[i] && n?.hasChildNodes && A.expandedKeys.has(t.key)) && A.toggleKey(t.key);
				}
			}
		}, N, n), F = N.isDropTarget({ type: "root" });
	}
	let L = !(!o || M?.isDisabled), { focusProps: ne, isFocused: R, isFocusVisible: z } = le(), re = {
		isEmpty: A.collection.size === 0,
		isFocused: R,
		isFocusVisible: z,
		isDropTarget: F,
		selectionMode: A.selectionManager.selectionMode,
		allowsDragging: !!L,
		state: A
	}, ie = V({
		...e,
		children: void 0,
		defaultClassName: "react-aria-Tree",
		values: re
	}), ae = null;
	if (A.collection.size === 0 && e.renderEmptyState) {
		let { isEmpty: t, ...n } = re, r = e.renderEmptyState({ ...n });
		ae = /*#__PURE__*/ W.createElement("div", {
			role: "row",
			style: { display: "contents" },
			"aria-level": 1
		}, /*#__PURE__*/ W.createElement("div", {
			role: "gridcell",
			style: { display: "contents" }
		}, r));
	}
	let oe = C(e, { global: !0 });
	return /*#__PURE__*/ W.createElement(W.Fragment, null, /*#__PURE__*/ W.createElement(Xi, null, /*#__PURE__*/ W.createElement(E.div, {
		...H(oe, ie, j, ne, P?.collectionProps),
		ref: n,
		slot: e.slot || void 0,
		"data-empty": A.collection.size === 0 || void 0,
		"data-focused": R || void 0,
		"data-drop-target": F || void 0,
		"data-focus-visible": z || void 0,
		"data-selection-mode": A.selectionManager.selectionMode === "none" ? void 0 : A.selectionManager.selectionMode,
		"data-allows-dragging": !!L || void 0
	}, /*#__PURE__*/ W.createElement(s, { values: [
		[Vu, A],
		[vi, {
			dragAndDropHooks: r,
			dragState: M,
			dropState: N
		}],
		[yi, { render: Ju }]
	] }, c && /*#__PURE__*/ W.createElement(Zu, null), /*#__PURE__*/ W.createElement(Ui, null, /*#__PURE__*/ W.createElement(g, {
		collection: A.collection,
		persistedKeys: Si(A.selectionManager, r, N),
		scrollRef: n,
		renderDropIndicator: xi(r, N)
	}))), ae)), ee);
}
var Gu = /*#__PURE__*/ rn(class extends kt {
	static {
		this.type = "content";
	}
}, function(e) {
	let t = (0, W.useContext)(Ku), n = V({
		children: e.children,
		values: t
	});
	return /*#__PURE__*/ W.createElement(pn.Provider, { value: un }, n.children);
}), Ku = /*#__PURE__*/ (0, W.createContext)(null), qu = /*#__PURE__*/ an(class extends kt {
	static {
		this.type = "item";
	}
}, (e, t, n) => {
	let r = (0, W.useContext)(Vu);
	t = F(t);
	let { dragAndDropHooks: i, dragState: a, dropState: o } = (0, W.useContext)(vi), c = a && !(a.isDisabled || a.selectionManager.isDisabled(n.key)), { rowProps: l, gridCellProps: u, expandButtonProps: d, descriptionProps: f, ...p } = Ru({
		node: n,
		shouldSelectOnPressUp: !!a,
		focusMode: e.focusMode,
		allowsArrowNavigation: e.allowsArrowNavigation
	}, r, t), m = l["aria-expanded"] === !0, h = e.hasChildItems || [...r.collection.getChildren(n.key)].length > 1, g = l["aria-level"] || 1, { hoverProps: _, isHovered: v } = O({
		isDisabled: !p.allowsSelection && !p.hasAction && !c,
		onHoverStart: e.onHoverStart,
		onHoverChange: e.onHoverChange,
		onHoverEnd: e.onHoverEnd
	}), { isFocusVisible: y, focusProps: b } = le(), { isFocusVisible: x, focusProps: S } = le({ within: !0 }), { checkboxProps: T } = Vl({ key: n.key }, r), D = null;
	a && i && (D = i.useDraggableItem({
		key: n.key,
		hasDragButton: !0
	}, a));
	let k = null, A = (0, W.useRef)(null), j = (0, W.useRef)(null), M = (0, W.useRef)(null), { visuallyHiddenProps: N } = Tr();
	o && i && (k = i.useDropIndicator({
		target: {
			type: "item",
			key: n.key,
			dropPosition: "on"
		},
		activateButtonRef: M
	}, o, j));
	let P = a && a.isDragging(n.key), ee = k?.isDropTarget, I = r.selectionManager.selectionMode, te = r.selectionManager.selectionBehavior, L = W.useMemo(() => ({
		...p,
		isHovered: v,
		isFocusVisible: y,
		isExpanded: m,
		hasChildItems: h,
		level: g,
		selectionMode: I,
		selectionBehavior: te,
		isFocusVisibleWithin: x,
		state: r,
		id: n.key,
		allowsDragging: !!a,
		isDragging: P,
		isDropTarget: ee
	}), [
		p,
		v,
		y,
		m,
		h,
		g,
		x,
		r,
		n.key,
		a,
		P,
		ee,
		te,
		I
	]), ne = V({
		...e,
		id: void 0,
		children: n.rendered,
		defaultClassName: "react-aria-TreeItem",
		defaultStyle: { "--tree-item-level": g },
		values: L
	});
	(0, W.useEffect)(() => {
		n.textValue;
	}, [n.textValue]), (0, W.useEffect)(() => {
		h && A.current;
	}, []);
	let z = (0, W.useRef)(null);
	(0, W.useEffect)(() => {
		a && z.current;
	}, []);
	let re = Rt({
		items: r.collection.getChildren(n.key),
		children: (e) => {
			switch (e.type) {
				case "content": return e.render(e);
				case "loader":
				case "item": return /*#__PURE__*/ W.createElement(W.Fragment, null);
				default: throw Error("Unsupported element type in TreeRow: " + e.type);
			}
		}
	}), ie = R(), ae = C(e, { global: !0 });
	return delete ae.id, delete ae.onClick, /*#__PURE__*/ W.createElement(W.Fragment, null, k && !k.isHidden && /*#__PURE__*/ W.createElement("div", {
		role: "row",
		"aria-level": l["aria-level"],
		"aria-expanded": l["aria-expanded"],
		"aria-label": k.dropIndicatorProps["aria-label"]
	}, /*#__PURE__*/ W.createElement("div", {
		role: "gridcell",
		"aria-colindex": 1,
		style: { display: "contents" }
	}, /*#__PURE__*/ W.createElement("div", {
		role: "button",
		...N,
		...k.dropIndicatorProps,
		ref: j
	}), l["aria-expanded"] == null ? null : /*#__PURE__*/ W.createElement("div", {
		role: "button",
		...N,
		id: ie,
		"aria-label": d["aria-label"],
		"aria-labelledby": `${ie} ${l.id}`,
		tabIndex: -1,
		ref: M
	}))), /*#__PURE__*/ W.createElement(E.div, {
		...H(ae, l, b, _, S, D?.dragProps),
		...ne,
		ref: t,
		"data-expanded": h && m || void 0,
		"data-has-child-items": h || void 0,
		"data-level": g,
		"data-selected": p.isSelected || void 0,
		"data-disabled": p.isDisabled || void 0,
		"data-hovered": v || void 0,
		"data-focused": p.isFocused || void 0,
		"data-focus-visible": y || void 0,
		"data-pressed": p.isPressed || void 0,
		"data-selection-mode": r.selectionManager.selectionMode === "none" ? void 0 : r.selectionManager.selectionMode,
		"data-allows-dragging": !!a || void 0,
		"data-dragging": P || void 0,
		"data-drop-target": ee || void 0
	}, /*#__PURE__*/ W.createElement("div", {
		...u,
		style: { display: "contents" }
	}, /*#__PURE__*/ W.createElement(s, { values: [
		[ni, { slots: {
			[w]: {},
			selection: T
		} }],
		[ri, { slots: {
			[w]: {},
			selection: T
		} }],
		[ir, { slots: {
			[w]: {},
			chevron: {
				...d,
				ref: A
			},
			drag: {
				...D?.dragButtonProps,
				ref: z,
				style: { pointerEvents: "none" }
			}
		} }],
		[Ku, { ...L }],
		[Wi, { isSelected: p.isSelected }]
	] }, re))));
});
rn(jt, function(e, t, n) {
	let { isVirtualized: r } = (0, W.useContext)(pn), i = (0, W.useContext)(Vu), { isLoading: a, onLoadMore: o, scrollOffset: s, ...c } = e, l = (0, W.useRef)(null);
	ao((0, W.useMemo)(() => ({
		onLoadMore: o,
		collection: i?.collection,
		sentinelRef: l,
		scrollOffset: s
	}), [
		o,
		s,
		i?.collection
	]), l), t = F(t);
	let { rowProps: u, gridCellProps: d } = Ru({ node: n }, i, t), f = u["aria-level"] || 1, p = {
		role: "row",
		"aria-level": u["aria-level"]
	}, m = V({
		...c,
		id: void 0,
		children: n.rendered,
		defaultClassName: "react-aria-TreeLoader",
		values: { level: f }
	}), h = {};
	return r && (h = { display: "contents" }), /*#__PURE__*/ W.createElement(W.Fragment, null, /*#__PURE__*/ W.createElement("div", {
		style: {
			position: "relative",
			width: 0,
			height: 0
		},
		inert: Wa(!0)
	}, /*#__PURE__*/ W.createElement("div", {
		"data-testid": "loadMoreSentinel",
		ref: l,
		style: {
			position: "absolute",
			height: 1,
			width: 1
		}
	})), a && m.children && /*#__PURE__*/ W.createElement(E.div, {
		ref: t,
		...H(C(e), p),
		...m,
		"data-level": f
	}, /*#__PURE__*/ W.createElement("div", {
		...d,
		style: h
	}, m.children)));
});
function Ju(e, t) {
	t = F(t);
	let { dragAndDropHooks: n, dropState: r } = (0, W.useContext)(vi), i = (0, W.useRef)(null), { dropIndicatorProps: a, isHidden: o, isDropTarget: s } = n.useDropIndicator(e, r, i);
	if (o) return null;
	let c = r && e.target.type === "item" ? (r.collection.getItem(e.target.key)?.level || 0) + 1 : 1;
	return /*#__PURE__*/ W.createElement(Xu, {
		...e,
		dropIndicatorProps: a,
		isDropTarget: s,
		ref: t,
		buttonRef: i,
		level: c
	});
}
function Yu(e, t) {
	let { dropIndicatorProps: n, isDropTarget: r, buttonRef: i, level: a, ...o } = e, { visuallyHiddenProps: s } = Tr(), c = V({
		...o,
		defaultClassName: "react-aria-DropIndicator",
		defaultStyle: {
			position: "relative",
			"--tree-item-level": a
		},
		values: { isDropTarget: r }
	});
	return /*#__PURE__*/ W.createElement(E.div, {
		...c,
		role: "row",
		"aria-level": a,
		ref: t,
		"data-drop-target": r || void 0
	}, /*#__PURE__*/ W.createElement("div", { role: "gridcell" }, /*#__PURE__*/ W.createElement("div", {
		...s,
		role: "button",
		...n,
		ref: i
	}), c.children));
}
var Xu = /*#__PURE__*/ (0, W.forwardRef)(Yu);
function Zu() {
	let { dragAndDropHooks: e, dropState: t } = (0, W.useContext)(vi), n = (0, W.useRef)(null), { dropIndicatorProps: r } = e.useDropIndicator({ target: { type: "root" } }, t, n), i = t.isDropTarget({ type: "root" }), { visuallyHiddenProps: a } = Tr();
	return !i && r["aria-hidden"] ? null : /*#__PURE__*/ W.createElement("div", {
		role: "row",
		"aria-hidden": r["aria-hidden"],
		style: { position: "absolute" }
	}, /*#__PURE__*/ W.createElement("div", { role: "gridcell" }, /*#__PURE__*/ W.createElement("div", {
		role: "button",
		...a,
		...r,
		ref: n
	})));
}
function Qu(e, t) {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
}
W.createContext(void 0);
// ../../node_modules/react-aria/dist/private/button/useToggleButton.mjs
function $u(e, t, n) {
	let { isSelected: r } = t, { isPressed: i, buttonProps: a } = rr({
		...e,
		onPress: he(t.toggle, e.onPress)
	}, n);
	return {
		isPressed: i,
		isSelected: r,
		isDisabled: e.isDisabled || !1,
		buttonProps: H(a, { "aria-pressed": r })
	};
}
// ../../node_modules/react-aria/dist/private/toolbar/useToolbar.mjs
function ed(e, t) {
	let { "aria-label": n, "aria-labelledby": r, orientation: o = "horizontal" } = e, [s, c] = (0, W.useState)(!1);
	B(() => {
		c(!!(t.current && t.current.parentElement?.closest("[role=\"toolbar\"]")));
	});
	let { direction: l } = wn(), u = l === "rtl" && o === "horizontal", d = ha(t), f = (e) => {
		if (U(e.currentTarget, i(e))) {
			if (o === "horizontal" && e.key === "ArrowRight" || o === "vertical" && e.key === "ArrowDown") u ? d.focusPrevious() : d.focusNext();
			else if (o === "horizontal" && e.key === "ArrowLeft" || o === "vertical" && e.key === "ArrowUp") u ? d.focusNext() : d.focusPrevious();
			else if (e.key === "Tab") {
				p.current = a(), e.shiftKey ? d.focusFirst() : d.focusLast();
				return;
			} else return;
			e.stopPropagation(), e.preventDefault();
		}
	}, p = (0, W.useRef)(null), m = (e) => {
		!U(e.currentTarget, e.relatedTarget) && !p.current && (p.current = i(e));
	}, h = (e) => {
		p.current && !U(e.currentTarget, e.relatedTarget) && U(t.current, i(e)) && (p.current?.focus(), p.current = null);
	};
	return { toolbarProps: {
		...C(e, { labelable: !0 }),
		role: s ? "group" : "toolbar",
		"aria-orientation": o,
		"aria-label": n,
		"aria-labelledby": n == null ? r : void 0,
		onKeyDownCapture: s ? void 0 : f,
		onFocusCapture: s ? void 0 : h,
		onBlurCapture: s ? void 0 : m
	} };
}
// ../../node_modules/react-aria/dist/private/button/useToggleButtonGroup.mjs
function td(e, t, n) {
	let { isDisabled: r } = e, { toolbarProps: i } = ed(e, n);
	return { groupProps: {
		...i,
		role: t.selectionMode === "single" ? "radiogroup" : i.role,
		"aria-disabled": r
	} };
}
function nd(e, t, n) {
	let r = {
		isSelected: t.selectedKeys.has(e.id),
		defaultSelected: !1,
		setSelected(n) {
			t.setSelected(e.id, n);
		},
		toggle() {
			t.toggleKey(e.id);
		}
	}, { isPressed: i, isSelected: a, isDisabled: o, buttonProps: s } = $u({
		...e,
		id: void 0,
		isDisabled: e.isDisabled || t.isDisabled
	}, r, n);
	return t.selectionMode === "single" && (s.role = "radio", s["aria-checked"] = r.isSelected, delete s["aria-pressed"]), {
		isPressed: i,
		isSelected: a,
		isDisabled: o,
		buttonProps: s
	};
}
// ../../node_modules/react-stately/dist/private/toggle/useToggleGroupState.mjs
function rd(e) {
	let { selectionMode: t = "single", disallowEmptySelection: n, isDisabled: r = !1 } = e, [i, a] = Cr((0, W.useMemo)(() => e.selectedKeys ? new Set(e.selectedKeys) : void 0, [e.selectedKeys]), (0, W.useMemo)(() => e.defaultSelectedKeys ? new Set(e.defaultSelectedKeys) : /* @__PURE__ */ new Set(), [e.defaultSelectedKeys]), e.onSelectionChange);
	return {
		selectionMode: t,
		isDisabled: r,
		selectedKeys: i,
		setSelectedKeys: a,
		toggleKey(e) {
			let r;
			t === "multiple" ? (r = new Set(i), r.has(e) && (!n || r.size > 1) ? r.delete(e) : r.add(e)) : r = new Set(i.has(e) && !n ? [] : [e]), a(r);
		},
		setSelected(e, t) {
			t !== i.has(e) && this.toggleKey(e);
		}
	};
}
// ../../node_modules/react-aria-components/dist/private/ToggleButtonGroup.mjs
var id = /*#__PURE__*/ (0, W.createContext)({}), ad = /*#__PURE__*/ (0, W.createContext)(null), od = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	[e, t] = d(e, t, id);
	let n = rd(e), { groupProps: r } = td(e, n, t), i = V({
		...e,
		values: {
			orientation: e.orientation || "horizontal",
			isDisabled: n.isDisabled,
			state: n
		},
		defaultClassName: "react-aria-ToggleButtonGroup"
	}), a = C(e, { global: !0 });
	return /*#__PURE__*/ W.createElement(E.div, {
		...H(a, i, r),
		ref: t,
		slot: e.slot || void 0,
		"data-orientation": e.orientation || "horizontal",
		"data-disabled": e.isDisabled || void 0
	}, /*#__PURE__*/ W.createElement(ad.Provider, { value: n }, /*#__PURE__*/ W.createElement(Ui, null, i.children)));
}), sd = /*#__PURE__*/ (0, W.createContext)({}), cd = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	[e, t] = d(e, t, sd);
	let n = (0, W.useContext)(ad), r = ei(n && e.id != null ? {
		isSelected: n.selectedKeys.has(e.id),
		onChange(t) {
			n.setSelected(e.id, t);
		}
	} : e), { buttonProps: i, isPressed: a, isSelected: o, isDisabled: s } = n && e.id != null ? nd({
		...e,
		id: e.id
	}, n, t) : $u({
		...e,
		id: e.id == null ? void 0 : String(e.id)
	}, r, t), { focusProps: c, isFocused: l, isFocusVisible: u } = le(e), { hoverProps: f, isHovered: p } = O({
		...e,
		isDisabled: s
	}), m = V({
		...e,
		id: void 0,
		values: {
			isHovered: p,
			isPressed: a,
			isFocused: l,
			isSelected: r.isSelected,
			isFocusVisible: u,
			isDisabled: s,
			state: r
		},
		defaultClassName: "react-aria-ToggleButton"
	}), h = C(e, { global: !0 });
	return delete h.id, delete h.onClick, /*#__PURE__*/ W.createElement(E.button, {
		...H(h, m, i, c, f),
		ref: t,
		slot: e.slot || void 0,
		"data-focused": l || void 0,
		"data-disabled": s || void 0,
		"data-pressed": a || void 0,
		"data-selected": o || void 0,
		"data-hovered": p || void 0,
		"data-focus-visible": u || void 0
	}, /*#__PURE__*/ W.createElement(Wi.Provider, { value: { isSelected: o } }, m.children));
}), ld = /*#__PURE__*/ (0, W.createContext)({}), ud = (e) => {
	let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, ...i } = e;
	return i;
}, dd = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	[e, t] = d(e, t, ld);
	let { hoverProps: n, isHovered: r } = O(e), { isFocused: i, isFocusVisible: a, focusProps: o } = le({
		isTextInput: !0,
		autoFocus: e.autoFocus
	}), s = !!e["aria-invalid"] && e["aria-invalid"] !== "false", c = V({
		...e,
		values: {
			isHovered: r,
			isFocused: i,
			isFocusVisible: a,
			isDisabled: e.disabled || !1,
			isInvalid: s
		},
		defaultClassName: "react-aria-TextArea"
	});
	return /*#__PURE__*/ W.createElement(E.textarea, {
		...H(ud(e), o, n),
		...c,
		ref: t,
		"data-focused": i || void 0,
		"data-disabled": e.disabled || void 0,
		"data-hovered": r || void 0,
		"data-focus-visible": a || void 0,
		"data-invalid": s || void 0
	});
}), fd = /*#__PURE__*/ (0, W.createContext)(null), pd = /*#__PURE__*/ Ht(function(t, n) {
	[t, n] = d(t, n, fd);
	let { validationBehavior: r } = e(Hr) || {}, i = t.validationBehavior ?? r ?? "native", a = (0, W.useRef)(null);
	[t, a] = d(t, a, Vi);
	let [o, c] = u(!t["aria-label"] && !t["aria-labelledby"]), [l, f] = (0, W.useState)("input"), { labelProps: p, inputProps: m, descriptionProps: h, errorMessageProps: g, ...v } = _i({
		..._(t),
		inputElementType: l,
		label: c,
		validationBehavior: i
	}, a), y = (0, W.useCallback)((e) => {
		a.current = e, e && f(e instanceof HTMLTextAreaElement ? "textarea" : "input");
	}, [a]), b = V({
		...t,
		values: {
			isDisabled: t.isDisabled || !1,
			isInvalid: v.isInvalid,
			isReadOnly: t.isReadOnly || !1,
			isRequired: t.isRequired || !1
		},
		defaultClassName: "react-aria-TextField"
	}), x = C(t, { global: !0 });
	return delete x.id, /*#__PURE__*/ W.createElement(E.div, {
		...x,
		...b,
		ref: n,
		slot: t.slot || void 0,
		"data-disabled": t.isDisabled || void 0,
		"data-invalid": v.isInvalid || void 0,
		"data-readonly": t.isReadOnly || void 0,
		"data-required": t.isRequired || void 0
	}, /*#__PURE__*/ W.createElement(s, { values: [
		[zn, {
			...p,
			ref: o
		}],
		[mi, {
			...m,
			ref: y
		}],
		[ld, {
			...m,
			ref: y
		}],
		[pi, {
			role: "presentation",
			isInvalid: v.isInvalid,
			isDisabled: t.isDisabled || !1
		}],
		[lr, { slots: {
			description: h,
			errorMessage: g
		} }],
		[Or, v]
	] }, b.children));
});
// ../../packages/ui/src/primitives/TextField/TextField.tsx
function md({ label: e, description: t, errorMessage: n, placeholder: r, inputRef: i, ...a }) {
	return /* @__PURE__ */ (0, G.jsxs)(pd, {
		...a,
		children: [
			e && /* @__PURE__ */ (0, G.jsx)(li, { children: e }),
			/* @__PURE__ */ (0, G.jsx)(gi, {
				ref: i,
				className: "react-aria-Input inset",
				placeholder: r
			}),
			t && /* @__PURE__ */ (0, G.jsx)(di, { children: t }),
			/* @__PURE__ */ (0, G.jsx)(ui, { children: n })
		]
	});
}
function hd({ label: e, description: t, errorMessage: n, placeholder: r, inputRef: i, ...a }) {
	return /* @__PURE__ */ (0, G.jsxs)(pd, {
		...a,
		children: [
			/* @__PURE__ */ (0, G.jsx)(li, { children: e }),
			/* @__PURE__ */ (0, G.jsx)(dd, {
				ref: i,
				className: "react-aria-TextArea inset",
				placeholder: r
			}),
			t && /* @__PURE__ */ (0, G.jsx)(di, { children: t }),
			/* @__PURE__ */ (0, G.jsx)(ui, { children: n })
		]
	});
}
// ../../node_modules/react-stately/dist/private/toast/useToastState.mjs
var gd = class {
	constructor(e) {
		this.queue = [], this.subscriptions = /* @__PURE__ */ new Set(), this.visibleToasts = [], this.maxVisibleToasts = e?.maxVisibleToasts ?? Infinity, this.wrapUpdate = e?.wrapUpdate;
	}
	runWithWrapUpdate(e, t) {
		this.wrapUpdate ? this.wrapUpdate(e, t) : e();
	}
	subscribe(e) {
		return this.subscriptions.add(e), () => this.subscriptions.delete(e);
	}
	add(e, t = {}) {
		let n = "_" + Math.random().toString(36).slice(2), r = {
			...t,
			content: e,
			key: n,
			timer: t.timeout ? new _d(() => this.close(n), t.timeout) : void 0
		};
		return this.queue.unshift(r), this.updateVisibleToasts("add"), n;
	}
	close(e) {
		let t = this.queue.findIndex((t) => t.key === e);
		t >= 0 && (this.queue[t].onClose?.(), this.queue.splice(t, 1)), this.updateVisibleToasts("remove");
	}
	updateVisibleToasts(e) {
		this.visibleToasts = this.queue.slice(0, this.maxVisibleToasts), this.runWithWrapUpdate(() => {
			for (let e of this.subscriptions) e();
		}, e);
	}
	pauseAll() {
		for (let e of this.visibleToasts) e.timer && e.timer.pause();
	}
	resumeAll() {
		for (let e of this.visibleToasts) e.timer && e.timer.resume();
	}
	clear() {
		this.queue = [], this.updateVisibleToasts("clear");
	}
}, _d = class {
	constructor(e, t) {
		this.startTime = null, this.remaining = t, this.callback = e;
	}
	reset(e) {
		this.remaining = e, this.resume();
	}
	pause() {
		this.timerId != null && (clearTimeout(this.timerId), this.timerId = null, this.remaining -= Date.now() - this.startTime);
	}
	resume() {
		this.remaining <= 0 || (this.startTime = Date.now(), this.timerId = setTimeout(() => {
			this.timerId = null, this.remaining = 0, this.callback();
		}, this.remaining));
	}
};
new gd({ wrapUpdate(e) {
	"startViewTransition" in document ? document.startViewTransition(() => {
		(0, Gt.flushSync)(e);
	}) : e();
} });
// ../../packages/ui/src/primitives/ToggleButton/ToggleButton.tsx
function vd(e) {
	return /* @__PURE__ */ (0, G.jsx)(cd, {
		...e,
		className: "react-aria-ToggleButton button-base",
		"data-variant": e.variant || "primary",
		children: T(e.children, (e) => /* @__PURE__ */ (0, G.jsx)("span", { children: e }))
	});
}
// ../../packages/ui/src/primitives/ToggleButtonGroup/ToggleButtonGroup.tsx
function yd(e) {
	return /* @__PURE__ */ (0, G.jsx)(od, { ...e });
}
// ../../node_modules/react-aria-components/dist/private/Toolbar.mjs
var bd = /*#__PURE__*/ (0, W.createContext)({}), xd = /*#__PURE__*/ (0, W.forwardRef)(function(e, t) {
	[e, t] = d(e, t, bd);
	let { toolbarProps: n } = ed(e, t), r = V({
		...e,
		values: { orientation: e.orientation || "horizontal" },
		defaultClassName: "react-aria-Toolbar"
	}), i = C(e, { global: !0 });
	return delete i.id, /*#__PURE__*/ W.createElement(E.div, {
		...H(i, r, n),
		ref: t,
		slot: e.slot || void 0,
		"data-orientation": e.orientation || "horizontal"
	}, r.children);
});
// ../../packages/ui/src/primitives/Toolbar/Toolbar.tsx
function Sd(e) {
	let { orientation: t = "horizontal" } = e;
	return /* @__PURE__ */ (0, G.jsx)(id.Provider, {
		value: { orientation: t },
		children: /* @__PURE__ */ (0, G.jsx)(Gi.Provider, {
			value: { orientation: t === "horizontal" ? "vertical" : "horizontal" },
			children: /* @__PURE__ */ (0, G.jsx)(xd, { ...e })
		})
	});
}
// ../../packages/ui/src/primitives/Tree/Tree.tsx
function Cd(e) {
	return /* @__PURE__ */ (0, G.jsx)(Hu, { ...e });
}
function wd(e) {
	return /* @__PURE__ */ (0, G.jsx)(Gu, { children: ({ selectionBehavior: t, selectionMode: n, allowsDragging: r }) => /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [
		r && /* @__PURE__ */ (0, G.jsx)(ar, {
			slot: "drag",
			children: /* @__PURE__ */ (0, G.jsx)(ht, { size: 16 })
		}),
		t === "toggle" && n !== "none" && /* @__PURE__ */ (0, G.jsx)(fi, { slot: "selection" }),
		/* @__PURE__ */ (0, G.jsx)(ar, {
			slot: "chevron",
			children: /* @__PURE__ */ (0, G.jsx)(lt, {})
		}),
		e.children
	] }) });
}
function Td(e) {
	let t = typeof e.title == "string" ? e.title : "";
	return /* @__PURE__ */ (0, G.jsx)(qu, {
		textValue: t,
		...e,
		children: e.title == null ? e.children : /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [/* @__PURE__ */ (0, G.jsx)(wd, { children: e.title }), e.children] })
	});
}
// ../../node_modules/react-aria/dist/private/dnd/DropTargetKeyboardNavigation.mjs
function Ed(e, t, n, r, i = !1, a = !1) {
	switch (r) {
		case "left": return i ? Dd(e, t, n, a, "left") : Od(e, t, n, a, "left");
		case "right": return i ? Od(e, t, n, a, "right") : Dd(e, t, n, a, "right");
		case "up": return Od(e, t, n, a);
		case "down": return Dd(e, t, n, a);
	}
}
function Dd(e, t, n, r = !1, i = null) {
	if (!n) return { type: "root" };
	if (n.type === "root") {
		let t = e.getFirstKey?.() ?? null;
		return t == null ? null : {
			type: "item",
			key: t,
			dropPosition: "before"
		};
	}
	if (n.type === "item") {
		let r = null;
		r = i ? i === "right" ? e.getKeyRightOf?.(n.key, { includeDisabled: !0 }) : e.getKeyLeftOf?.(n.key, { includeDisabled: !0 }) : e.getKeyBelow?.(n.key, { includeDisabled: !0 });
		let a = Ad(t, n.key, (e) => t.getKeyAfter(e));
		if (r != null && r !== a) return {
			type: "item",
			key: r,
			dropPosition: n.dropPosition
		};
		switch (n.dropPosition) {
			case "before": return {
				type: "item",
				key: n.key,
				dropPosition: "on"
			};
			case "on": {
				let e = t.getItem(n.key), i = r == null ? null : t.getItem(r);
				return e && i && i.level >= e.level ? {
					type: "item",
					key: i.key,
					dropPosition: "before"
				} : {
					type: "item",
					key: n.key,
					dropPosition: "after"
				};
			}
			case "after": {
				let e = t.getItem(n.key), r = e?.nextKey == null ? null : t.getItem(e.nextKey);
				for (; r != null && r.type !== "item";) r = r.nextKey == null ? null : t.getItem(r.nextKey);
				if (e && r == null && e.parentKey != null) {
					let n = t.getItem(e.parentKey), r = n?.nextKey == null ? null : t.getItem(n.nextKey);
					if (r?.type === "item") return {
						type: "item",
						key: r.key,
						dropPosition: "before"
					};
					if (n?.type === "item") return {
						type: "item",
						key: n.key,
						dropPosition: "after"
					};
				}
				if (r) return {
					type: "item",
					key: r.key,
					dropPosition: "on"
				};
			}
		}
	}
	return r ? { type: "root" } : null;
}
function Od(e, t, n, r = !1, i = null) {
	if (!n || r && n.type === "root") {
		let n = null, r = e.getLastKey?.();
		for (; r != null;) {
			let e = t.getItem(r);
			if (e?.type !== "item") break;
			n = r, r = e?.parentKey;
		}
		return n == null ? null : {
			type: "item",
			key: n,
			dropPosition: "after"
		};
	}
	if (n.type === "item") {
		let r = null;
		r = i ? i === "left" ? e.getKeyLeftOf?.(n.key, { includeDisabled: !0 }) : e.getKeyRightOf?.(n.key, { includeDisabled: !0 }) : e.getKeyAbove?.(n.key, { includeDisabled: !0 });
		let a = Ad(t, n.key, (e) => t.getKeyBefore(e));
		if (r != null && r !== a) return {
			type: "item",
			key: r,
			dropPosition: n.dropPosition
		};
		switch (n.dropPosition) {
			case "before": {
				let e = t.getItem(n.key);
				if (e && e.prevKey != null) {
					let n = kd(t, e.prevKey);
					if (n) return n;
				}
				return r == null ? { type: "root" } : {
					type: "item",
					key: r,
					dropPosition: "on"
				};
			}
			case "on": return {
				type: "item",
				key: n.key,
				dropPosition: "before"
			};
			case "after": return kd(t, n.key) || {
				type: "item",
				key: n.key,
				dropPosition: "on"
			};
		}
	}
	return n.type === "root" ? null : { type: "root" };
}
function kd(e, t) {
	let n = e.getItem(t), r = Ad(e, t, (t) => e.getKeyAfter(t)), i = r == null ? null : e.getItem(r);
	if (n && i && i.level > n.level) {
		let t = null;
		if ("lastChildKey" in n) for (t = n.lastChildKey == null ? null : e.getItem(n.lastChildKey); t && t.type !== "item" && t.prevKey != null;) t = e.getItem(t.prevKey);
		else t = Array.from(n.childNodes).findLast((e) => e.type === "item") || null;
		if (t) return {
			type: "item",
			key: t.key,
			dropPosition: "after"
		};
	}
	return null;
}
function Ad(e, t, n) {
	let r = n(t), i = r == null ? null : e.getItem(r);
	for (; i && i.type !== "item";) r = n(i.key), i = r == null ? null : e.getItem(r);
	return r;
}
// ../../node_modules/react-aria/dist/private/dnd/useAutoScroll.mjs
var jd = 20;
function Md(e) {
	let t = (0, W.useRef)(null), n = (0, W.useRef)(!0), r = (0, W.useRef)(!0);
	(0, W.useEffect)(() => {
		if (e.current) {
			t.current = fr(e.current) ? e.current : pr(e.current);
			let i = window.getComputedStyle(t.current);
			n.current = /(auto|scroll)/.test(i.overflowX), r.current = /(auto|scroll)/.test(i.overflowY);
		}
	}, [e]);
	let i = (0, W.useRef)({
		timer: void 0,
		dx: 0,
		dy: 0
	}).current;
	(0, W.useEffect)(() => () => {
		i.timer &&= (cancelAnimationFrame(i.timer), void 0);
	}, [i]);
	let a = (0, W.useCallback)(() => {
		n.current && t.current && (t.current.scrollLeft += i.dx), r.current && t.current && (t.current.scrollTop += i.dy), i.timer &&= requestAnimationFrame(a);
	}, [t, i]);
	return {
		move(e, n) {
			if (!f() || c() || !t.current) return;
			let r = t.current.getBoundingClientRect(), o = jd, s = jd, l = r.height - jd, u = r.width - jd;
			e < o || e > u || n < s || n > l ? (e < o ? i.dx = e - o : e > u && (i.dx = e - u), n < s ? i.dy = n - s : n > l && (i.dy = n - l), i.timer ||= requestAnimationFrame(a)) : this.stop();
		},
		stop() {
			i.timer &&= (cancelAnimationFrame(i.timer), void 0);
		}
	};
}
// ../../node_modules/react-aria/dist/private/dnd/useDroppableCollection.mjs
function Nd(e, t, n) {
	let r = (0, W.useRef)({
		props: e,
		state: t,
		nextTarget: null,
		dropOperation: null
	}).current;
	r.props = e, r.state = t;
	let i = (0, W.useCallback)(async (e) => {
		let { onInsert: t, onRootDrop: i, onItemDrop: a, onReorder: o, onMove: s, acceptedDragTypes: c = "all", shouldAcceptItemDrop: l } = r.props, { draggingKeys: u } = Q, d = Ps(n), { target: f, dropOperation: p, items: m } = e, h = m;
		(c !== "all" || l) && (h = m.filter((e) => {
			let t;
			return t = e.kind === "directory" ? /* @__PURE__ */ new Set([ps]) : e.kind === "file" ? /* @__PURE__ */ new Set([e.type]) : e.types, c === "all" || c.some((e) => t.has(e)) ? f.type === "item" && f.dropPosition === "on" && l ? l(f, t) : !0 : !1;
		})), h.length > 0 && (f.type === "root" && i && await i({
			items: h,
			dropOperation: p
		}), f.type === "item" && (f.dropPosition === "on" && a && await a({
			items: h,
			dropOperation: p,
			isInternal: d,
			target: f
		}), s && d && await s({
			keys: u,
			dropOperation: p,
			target: f
		}), f.dropPosition !== "on" && (!d && t && await t({
			items: h,
			dropOperation: p,
			target: f
		}), d && o && await o({
			keys: u,
			dropOperation: p,
			target: f
		}))));
	}, [r, n]), a = Md(n), { dropProps: o } = zc({
		ref: n,
		onDropEnter() {
			r.nextTarget != null && t.setTarget(r.nextTarget);
		},
		onDropMove(e) {
			r.nextTarget != null && t.setTarget(r.nextTarget), a.move(e.x, e.y);
		},
		getDropOperationForPoint(i, a, o, s) {
			let { draggingKeys: c, dropCollectionRef: l } = Q, u = Ps(n), d = e.dropTargetDelegate.getDropTargetFromPoint(o, s, (e) => t.getDropOperation({
				target: e,
				types: i,
				allowedOperations: a,
				isInternal: u,
				draggingKeys: c
			}) !== "cancel");
			if (!d) return r.dropOperation = "cancel", r.nextTarget = null, "cancel";
			if (r.dropOperation = t.getDropOperation({
				target: d,
				types: i,
				allowedOperations: a,
				isInternal: u,
				draggingKeys: c
			}), r.dropOperation === "cancel") {
				let e = { type: "root" }, n = t.getDropOperation({
					target: e,
					types: i,
					allowedOperations: a,
					isInternal: u,
					draggingKeys: c
				});
				n !== "cancel" && (d = e, r.dropOperation = n);
			}
			return d && r.dropOperation !== "cancel" && n?.current !== l?.current && js(n), r.nextTarget = r.dropOperation === "cancel" ? null : d, r.dropOperation;
		},
		onDropExit() {
			js(void 0), t.setTarget(null), a.stop();
		},
		onDropActivate(n) {
			t.target?.type === "item" && typeof e.onDropActivate == "function" && e.onDropActivate({
				type: "dropactivate",
				x: n.x,
				y: n.y,
				target: t.target
			});
		},
		onDrop(e) {
			js(n), t.target && l(e, t.target);
			let { draggingCollectionRef: r } = Q;
			r ?? Ms();
		}
	}), s = (0, W.useRef)(null), c = (0, W.useCallback)(() => {
		let { state: e } = r;
		if (s.current) {
			let { target: t, collection: n, selectedKeys: r, focusedKey: i, isInternal: a, draggingKeys: o } = s.current;
			if (e.collection.size > n.size && e.selectionManager.isSelectionEqual(r)) {
				let t = /* @__PURE__ */ new Set(), r = e.collection.getFirstKey();
				for (; r != null;) {
					let i = e.collection.getItem(r);
					i?.type === "item" && !n.getItem(i.key) && t.add(i.key), r = i?.hasChildNodes && e.collection.getItem(i.lastChildKey)?.type === "item" ? i.firstChildKey : e.collection.getKeyAfter(r);
				}
				if (e.selectionManager.setSelectedKeys(t), e.selectionManager.focusedKey === i) {
					let n = t.keys().next().value;
					if (n != null) {
						let t = e.collection.getItem(n), r = s.current.target, i = e.collection.expandedKeys ? e.collection.expandedKeys.has(t?.parentKey) : !1;
						t && (t?.type === "cell" || r.type === "item" && r.dropPosition === "on" && !i) && (n = t.parentKey), n != null && e.selectionManager.setFocusedKey(n), e.selectionManager.selectionMode === "none" && D("keyboard");
					}
				}
			} else i != null && e.selectionManager.focusedKey === i && a && t.type === "item" && t.dropPosition !== "on" && o.has(e.collection.getItem(i)?.parentKey) ? (e.selectionManager.setFocusedKey(e.collection.getItem(i)?.parentKey ?? null), D("keyboard")) : e.selectionManager.focusedKey === i && t.type === "item" && t.dropPosition === "on" && e.collection.getItem(t.key) != null ? (e.selectionManager.setFocusedKey(t.key), D("keyboard")) : e.selectionManager.focusedKey != null && !e.selectionManager.isSelected(e.selectionManager.focusedKey) && D("keyboard");
			e.selectionManager.setFocused(!0);
		}
	}, [r]), l = (0, W.useCallback)((e, t) => {
		let { state: a } = r;
		s.current = {
			timeout: void 0,
			focusedKey: a.selectionManager.focusedKey,
			collection: a.collection,
			selectedKeys: a.selectionManager.selectedKeys,
			draggingKeys: Q.draggingKeys,
			isInternal: Ps(n),
			target: t
		}, (r.props.onDrop || i)({
			type: "drop",
			x: e.x,
			y: e.y,
			target: t,
			items: e.items,
			dropOperation: e.dropOperation
		}), s.current.timeout = setTimeout(() => {
			c(), s.current = null;
		}, 50);
	}, [
		r,
		i,
		n,
		c
	]);
	(0, W.useEffect)(() => () => {
		s.current && clearTimeout(s.current.timeout);
	}, []), B(() => {
		s.current && t.collection !== s.current.collection && c();
	});
	let { direction: u } = wn();
	(0, W.useEffect)(() => {
		if (!n.current) return;
		let e = (e, t = !0, n = "down") => Ed(r.props.keyboardDelegate, r.state.collection, e, n, u === "rtl", t), t = (t, n = !0) => e(t, n, "up"), i = (e, t, i, a, o = !0) => {
			let s = 0, c, { draggingKeys: l } = Q, u = Ps(n);
			do {
				let n = a(e, o);
				if (!n) return null;
				e = n, c = r.state.getDropOperation({
					target: n,
					types: t,
					allowedOperations: i,
					isInternal: u,
					draggingKeys: l
				}), e.type === "root" && s++;
			} while (c === "cancel" && !r.state.isDropTarget(e) && s < 2);
			return c === "cancel" ? null : e;
		};
		return Us({
			element: n.current,
			preventFocusOnDrop: !0,
			getDropOperation(t, a) {
				if (r.state.target) {
					let { draggingKeys: e } = Q, i = Ps(n);
					return r.state.getDropOperation({
						target: r.state.target,
						types: t,
						allowedOperations: a,
						isInternal: i,
						draggingKeys: e
					});
				}
				return i(null, t, a, e) ? "move" : "cancel";
			},
			onDropEnter(a, o) {
				let s = gs(o.items), c = r.state.selectionManager, l = null;
				js(n);
				let u = c.focusedKey, d = "after", f = u == null ? null : r.state.collection.getItem(u);
				if (f?.type === "cell" && (u = f.parentKey), u != null && c.isSelected(u) && (c.selectedKeys.size > 1 && c.firstSelectedKey === u ? d = "before" : u = c.lastSelectedKey), u != null) {
					l = {
						type: "item",
						key: u,
						dropPosition: d
					};
					let { draggingKeys: a } = Q, c = Ps(n);
					r.state.getDropOperation({
						target: l,
						types: s,
						allowedOperations: o.allowedDropOperations,
						isInternal: c,
						draggingKeys: a
					}) === "cancel" && (l = i(l, s, o.allowedDropOperations, e, !1) ?? i(l, s, o.allowedDropOperations, t, !1));
				}
				l ||= i(null, s, o.allowedDropOperations, e), r.state.setTarget(l);
			},
			onDropExit() {
				js(void 0), r.state.setTarget(null);
			},
			onDropTargetEnter(e) {
				r.state.setTarget(e);
			},
			onDropActivate(e, t) {
				t?.type === "item" && t?.dropPosition === "on" && typeof r.props.onDropActivate == "function" && r.props.onDropActivate({
					type: "dropactivate",
					x: e.x,
					y: e.y,
					target: t
				});
			},
			onDrop(e, t) {
				js(n), r.state.target && l(e, t || r.state.target);
			},
			onKeyDown(a, o) {
				let { keyboardDelegate: s } = r.props, c = gs(o.items);
				switch (a.key) {
					case "ArrowDown":
						if (s.getKeyBelow) {
							let t = i(r.state.target, c, o.allowedDropOperations, (t, n) => e(t, n, "down"));
							r.state.setTarget(t);
						}
						break;
					case "ArrowUp":
						if (s.getKeyAbove) {
							let t = i(r.state.target, c, o.allowedDropOperations, (t, n) => e(t, n, "up"));
							r.state.setTarget(t);
						}
						break;
					case "ArrowLeft":
						if (s.getKeyLeftOf) {
							let t = i(r.state.target, c, o.allowedDropOperations, (t, n) => e(t, n, "left"));
							r.state.setTarget(t);
						}
						break;
					case "ArrowRight":
						if (s.getKeyRightOf) {
							let t = i(r.state.target, c, o.allowedDropOperations, (t, n) => e(t, n, "right"));
							r.state.setTarget(t);
						}
						break;
					case "Home":
						if (s.getFirstKey) {
							let t = i(null, c, o.allowedDropOperations, e);
							r.state.setTarget(t);
						}
						break;
					case "End":
						if (s.getLastKey) {
							let e = i(null, c, o.allowedDropOperations, t);
							r.state.setTarget(e);
						}
						break;
					case "PageDown":
						if (s.getKeyPageBelow) {
							let a = r.state.target;
							if (!a) a = i(null, c, o.allowedDropOperations, e);
							else {
								let l = s.getFirstKey?.();
								a.type === "item" && (l = a.key);
								let u = null;
								l != null && (u = s.getKeyPageBelow(l));
								let d = a.type === "item" ? a.dropPosition : "after";
								if ((u == null || a.type === "item" && a.key === s.getLastKey?.()) && (u = s.getLastKey?.() ?? null, d = "after"), u == null) break;
								a = {
									type: "item",
									key: u,
									dropPosition: d
								};
								let { draggingCollectionRef: f, draggingKeys: p } = Q, m = f?.current === n?.current;
								r.state.getDropOperation({
									target: a,
									types: c,
									allowedOperations: o.allowedDropOperations,
									isInternal: m,
									draggingKeys: p
								}) === "cancel" && (a = i(a, c, o.allowedDropOperations, e, !1) ?? i(a, c, o.allowedDropOperations, t, !1));
							}
							r.state.setTarget(a ?? r.state.target);
						}
						break;
					case "PageUp": {
						if (!s.getKeyPageAbove) break;
						let a = r.state.target;
						if (!a) a = i(null, c, o.allowedDropOperations, t);
						else if (a.type === "item") {
							if (a.key === s.getFirstKey?.()) a = { type: "root" };
							else {
								let e = s.getKeyPageAbove(a.key), t = a.dropPosition;
								if (e ?? (e = s.getFirstKey?.(), t = "before"), e == null) break;
								a = {
									type: "item",
									key: e,
									dropPosition: t
								};
							}
							let { draggingKeys: l } = Q, u = Ps(n);
							r.state.getDropOperation({
								target: a,
								types: c,
								allowedOperations: o.allowedDropOperations,
								isInternal: u,
								draggingKeys: l
							}) === "cancel" && (a = i(a, c, o.allowedDropOperations, t, !1) ?? i(a, c, o.allowedDropOperations, e, !1));
						}
						r.state.setTarget(a ?? r.state.target);
						break;
					}
				}
				r.props.onKeyDown?.(a);
			}
		});
	}, [
		r,
		n,
		l,
		u
	]);
	let d = R();
	return fs.set(t, {
		id: d,
		ref: n
	}), { collectionProps: H(o, {
		id: d,
		"aria-describedby": null
	}) };
}
// ../../node_modules/react-aria/dist/private/dnd/useDroppableItem.mjs
function Pd(e, t, n) {
	let { dropProps: r } = Lc(), i = hs(t);
	(0, W.useEffect)(() => {
		if (n.current) return Ws({
			element: n.current,
			target: e.target,
			getDropOperation(n, r) {
				let { draggingKeys: a } = Q, o = Ps(i);
				return t.getDropOperation({
					target: e.target,
					types: n,
					allowedOperations: r,
					isInternal: o,
					draggingKeys: a
				});
			},
			activateButtonRef: e.activateButtonRef
		});
	}, [
		n,
		e.target,
		t,
		i,
		e.activateButtonRef
	]);
	let a = Ks(), { draggingKeys: o } = Q, s = Ps(i), c = a && t.getDropOperation({
		target: e.target,
		types: gs(a.dragTarget.items),
		allowedOperations: a.dragTarget.allowedDropOperations,
		isInternal: s,
		draggingKeys: o
	}) !== "cancel", l = t.isDropTarget(e.target);
	return (0, W.useEffect)(() => {
		a && l && n.current && n.current.focus();
	}, [
		l,
		a,
		n
	]), {
		dropProps: {
			...r,
			"aria-hidden": !a || c ? void 0 : "true"
		},
		isDropTarget: l
	};
}
// ../../node_modules/react-aria/dist/private/dnd/useDropIndicator.mjs
function Fd(e) {
	return e && e.__esModule ? e.default : e;
}
function Id(e, t, n) {
	let { target: r } = e, { collection: i } = t, a = Rn(Fd(Pc), "@react-aria/dnd"), o = Ks(), { dropProps: s } = Pd(e, t, n), c = R(), l = (e) => e == null ? "" : i.getTextValue?.(e) ?? i.getItem(e)?.textValue ?? "", u = "", d;
	if (r.type === "root") u = a.format("dropOnRoot"), d = `${c} ${ms(t)}`;
	else if (r.dropPosition === "on") u = a.format("dropOnItem", { itemText: l(r.key) });
	else {
		let e, t;
		if (r.dropPosition === "before") {
			let t = i.getItem(r.key)?.prevKey, n = t == null ? null : i.getItem(t);
			e = n?.type === "item" ? n.key : null;
		} else e = r.key;
		if (r.dropPosition === "after") {
			let e = i.getItem(r.key)?.nextKey, n = e == null ? null : i.getItem(e);
			t = n?.type === "item" ? n.key : null;
		} else t = r.key;
		e != null && t != null ? u = a.format("insertBetween", {
			beforeItemText: l(e),
			afterItemText: l(t)
		}) : e == null ? t != null && (u = a.format("insertBefore", { itemText: l(t) })) : u = a.format("insertAfter", { itemText: l(e) });
	}
	let f = t.isDropTarget(r), p = o ? s["aria-hidden"] : "true";
	return {
		dropIndicatorProps: {
			...s,
			id: c,
			"aria-roledescription": a.format("dropIndicator"),
			"aria-label": u,
			"aria-labelledby": d,
			"aria-hidden": p,
			tabIndex: -1
		},
		isDropTarget: f,
		isHidden: !f && !!p
	};
}
// ../../node_modules/react-aria/dist/private/dnd/useDrag.mjs
function Ld(e) {
	return e && e.__esModule ? e.default : e;
}
var Rd = {
	keyboard: {
		start: "dragDescriptionKeyboard",
		end: "endDragKeyboard"
	},
	touch: {
		start: "dragDescriptionTouch",
		end: "endDragTouch"
	},
	virtual: {
		start: "dragDescriptionVirtual",
		end: "endDragVirtual"
	}
};
function zd(e) {
	let { hasDragButton: t, isDisabled: n } = e, r = Rn(Ld(Pc), "@react-aria/dnd"), a = (0, W.useRef)({
		options: e,
		x: 0,
		y: 0
	}).current;
	a.options = e;
	let o = (0, W.useRef)(null), [s, l] = (0, W.useState)(!1), u = (e) => {
		o.current = e, l(!!e);
	}, { addGlobalListener: d, removeAllGlobalListeners: p } = ie(), m = (0, W.useRef)(null), h = (t) => {
		if (t.defaultPrevented) return;
		if (t.stopPropagation(), m.current === "virtual") {
			t.preventDefault(), y(i(t)), m.current = null;
			return;
		}
		typeof e.onDragStart == "function" && e.onDragStart({
			type: "dragstart",
			x: t.clientX,
			y: t.clientY
		});
		let n = e.getItems();
		t.dataTransfer.clearData?.(), bs(t.dataTransfer, n);
		let r = Z.all;
		if (typeof e.getAllowedDropOperations == "function") {
			let t = e.getAllowedDropOperations();
			r = Z.none;
			for (let e of t) r |= Z[e] || Z.none;
		}
		Rs(r);
		let o = as[r] || "none";
		t.dataTransfer.effectAllowed = o === "cancel" ? "none" : o, typeof e.preview?.current == "function" && e.preview.current(n, (e, n, r) => {
			if (!e) return;
			let i = e.getBoundingClientRect(), a = t.currentTarget.getBoundingClientRect(), o = t.clientX - a.x, s = t.clientY - a.y;
			(o > i.width || s > i.height) && (o = i.width / 2, s = i.height / 2);
			let c = o, l = s;
			typeof n == "number" && typeof r == "number" && (c = n, l = r), c = Math.max(0, Math.min(c, i.width)), l = Math.max(0, Math.min(l, i.height));
			let u = 2 * Math.round(i.height / 2);
			e.style.height = `${u}px`, t.dataTransfer.setDragImage(e, c, l);
		}), d(window, "drop", (e) => {
			e.preventDefault(), e.stopPropagation(), console.warn("Drags initiated from the React Aria useDrag hook may only be dropped on a target created with useDrop. This ensures that a keyboard and screen reader accessible alternative is available.");
		}, { once: !0 }), a.x = t.clientX, a.y = t.clientY;
		let s = i(t);
		requestAnimationFrame(() => {
			u(s);
		});
	}, g = (t) => {
		t.stopPropagation(), (t.clientX !== a.x || t.clientY !== a.y) && (typeof e.onDragMove == "function" && e.onDragMove({
			type: "dragmove",
			x: t.clientX,
			y: t.clientY
		}), a.x = t.clientX, a.y = t.clientY);
	}, _ = (t) => {
		if (t.stopPropagation(), typeof e.onDragEnd == "function") {
			let n = {
				type: "dragend",
				x: t.clientX,
				y: t.clientY,
				dropOperation: os[t.dataTransfer.dropEffect]
			};
			Fs && (n.dropOperation = os[Fs]), e.onDragEnd(n);
		}
		u(null), p(), Rs(Z.none), Is(void 0);
	};
	(0, W.useEffect)(() => () => {
		if (o.current && (!o.current.isConnected || parseInt(W.version, 10) < 17)) {
			if (typeof a.options.onDragEnd == "function") {
				let e = {
					type: "dragend",
					x: 0,
					y: 0,
					dropOperation: os[Fs || "none"]
				};
				a.options.onDragEnd(e);
			}
			u(null), Rs(Z.none), Is(void 0);
		}
	}, [a]);
	let v = (e) => {
		(e.pointerType === "keyboard" || e.pointerType === "virtual") && y(e.target);
	}, y = (e) => {
		if (typeof a.options.onDragStart == "function") {
			let t = e.getBoundingClientRect();
			a.options.onDragStart({
				type: "dragstart",
				x: t.x + t.width / 2,
				y: t.y + t.height / 2
			});
		}
		Gs({
			element: e,
			items: a.options.getItems(),
			allowedDropOperations: typeof a.options.getAllowedDropOperations == "function" ? a.options.getAllowedDropOperations() : [
				"move",
				"copy",
				"link"
			],
			onDragEnd(e) {
				u(null), typeof a.options.onDragEnd == "function" && a.options.onDragEnd(e);
			}
		}, r), u(e);
	}, b = vs(), x = s ? Rd[b].end : Rd[b].start, S = br(r.format(x)), C = {};
	return t || (C = {
		...S,
		onPointerDown(e) {
			if (m.current = A(e.nativeEvent) ? "virtual" : e.pointerType, e.width < 1 && e.height < 1 && c() && f()) m.current = "virtual";
			else {
				let t = e.currentTarget.getBoundingClientRect(), n = e.clientX - t.x, r = e.clientY - t.y, i = t.width / 2, a = t.height / 2;
				Math.abs(n - i) <= .5 && Math.abs(r - a) <= .5 ? m.current = "virtual" : m.current = e.pointerType;
			}
		},
		onKeyDownCapture(e) {
			i(e) === e.currentTarget && e.key === "Enter" && (e.preventDefault(), e.stopPropagation());
		},
		onKeyUpCapture(e) {
			i(e) === e.currentTarget && e.key === "Enter" && (e.preventDefault(), e.stopPropagation(), y(i(e)));
		},
		onClick(e) {
			(be(e.nativeEvent) || m.current === "virtual") && (e.preventDefault(), e.stopPropagation(), y(i(e)));
		}
	}), n ? {
		dragProps: { draggable: "false" },
		dragButtonProps: {},
		isDragging: !1
	} : {
		dragProps: {
			...C,
			draggable: "true",
			onDragStart: h,
			onDrag: g,
			onDragEnd: _
		},
		dragButtonProps: {
			...S,
			onPress: v
		},
		isDragging: s
	};
}
// ../../node_modules/react-aria/dist/private/dnd/useDraggableItem.mjs
function Bd(e) {
	return e && e.__esModule ? e.default : e;
}
var Vd = {
	keyboard: {
		selected: "dragSelectedKeyboard",
		notSelected: "dragDescriptionKeyboard"
	},
	touch: {
		selected: "dragSelectedLongPress",
		notSelected: "dragDescriptionLongPress"
	},
	virtual: {
		selected: "dragDescriptionVirtual",
		notSelected: "dragDescriptionVirtual"
	}
};
function Hd(e, t) {
	let n = Rn(Bd(Pc), "@react-aria/dnd"), r = t.isDisabled || t.selectionManager.isDisabled(e.key), { dragProps: i, dragButtonProps: a } = zd({
		getItems() {
			return t.getItems(e.key);
		},
		preview: t.preview,
		getAllowedDropOperations: t.getAllowedDropOperations,
		hasDragButton: e.hasDragButton,
		onDragStart(n) {
			t.startDrag(e.key, n), As(t.draggingKeys);
		},
		onDragMove(e) {
			t.moveDrag(e);
		},
		onDragEnd(e) {
			let { dropOperation: n } = e, r = n !== "cancel" && Ps();
			t.endDrag({
				...e,
				keys: t.draggingKeys,
				isInternal: r
			}), Ms();
		}
	}), o = t.collection.getItem(e.key), s = t.getKeysForDrag(e.key).size, c = s > 1 && t.selectionManager.isSelected(e.key), l, u, d = vs();
	if (!e.hasDragButton && t.selectionManager.selectionMode !== "none") {
		let t = Vd[d][c ? "selected" : "notSelected"];
		e.hasAction && d === "keyboard" && (t += "Alt"), u = c ? n.format(t, { count: s }) : n.format(t), delete i.onClick;
	} else if (c) l = n.format("dragSelectedItems", { count: s });
	else {
		let r = t.collection.getTextValue?.(e.key) ?? o?.textValue ?? "";
		l = n.format("dragItem", { itemText: r });
	}
	let f = br(u);
	if (u && Object.assign(i, f), !e.hasDragButton && e.hasAction) {
		let { onKeyDownCapture: e, onKeyUpCapture: t } = i;
		d === "touch" && delete i["aria-describedby"], i.onKeyDownCapture = (t) => {
			t.altKey && e?.(t);
		}, i.onKeyUpCapture = (e) => {
			e.altKey && t?.(e);
		};
	}
	return {
		dragProps: r ? {} : i,
		dragButtonProps: {
			...a,
			isDisabled: r,
			"aria-label": l
		}
	};
}
// ../../node_modules/react-aria/dist/private/dnd/useDraggableCollection.mjs
function Ud(e, t, n) {
	let { draggingCollectionRef: r } = Q;
	t.draggingKeys.size > 0 && r?.current !== n.current && ks(n);
}
// ../../node_modules/react-aria/dist/private/dnd/DragPreview.mjs
var Wd = /*#__PURE__*/ W.forwardRef(function(e, t) {
	let n = e.children, [r, i] = (0, W.useState)(null), a = (0, W.useRef)(null), o = (0, W.useRef)(void 0);
	return (0, W.useImperativeHandle)(t, () => (e, t) => {
		let r = n(e), s, c, l;
		r && typeof r == "object" && "element" in r ? (s = r.element, c = r.x, l = r.y) : s = r, (0, Gt.flushSync)(() => {
			i(s);
		}), t(a.current, c, l), o.current = requestAnimationFrame(() => {
			i(null);
		});
	}, [n]), (0, W.useEffect)(() => () => {
		o.current && cancelAnimationFrame(o.current);
	}, []), r ? /*#__PURE__*/ W.createElement("div", {
		style: {
			zIndex: -100,
			position: "fixed",
			top: 0,
			left: -1e5
		},
		ref: a
	}, r) : null;
});
// ../../node_modules/react-stately/dist/private/dnd/useDraggableCollectionState.mjs
function Gd(e) {
	let { getItems: t, isDisabled: n, collection: r, selectionManager: i, onDragStart: a, onDragMove: o, onDragEnd: s, preview: c, getAllowedDropOperations: l } = e, [, u] = (0, W.useState)(!1), d = (0, W.useRef)(/* @__PURE__ */ new Set()), f = (0, W.useRef)(null), p = (e) => {
		let t = /* @__PURE__ */ new Set();
		if (i.isSelected(e)) for (let e of i.selectedKeys) {
			let n = r.getItem(e);
			if (n) {
				let a = !1, o = n.parentKey;
				for (; o != null;) {
					if (i.selectedKeys.has(o)) {
						a = !0;
						break;
					}
					let e = r.getItem(o);
					o = e ? e.parentKey : null;
				}
				a || t.add(e);
			}
		}
		else t.add(e);
		return t;
	};
	return {
		collection: r,
		selectionManager: i,
		get draggedKey() {
			return f.current;
		},
		get draggingKeys() {
			return d.current;
		},
		isDragging(e) {
			return d.current.has(e);
		},
		getKeysForDrag: p,
		getItems(e) {
			let n = p(e), i = [];
			for (let e of n) {
				let t = r.getItem(e)?.value;
				t != null && i.push(t);
			}
			return t(p(e), i);
		},
		isDisabled: n,
		preview: c,
		getAllowedDropOperations: l,
		startDrag(e, t) {
			let n = p(e);
			d.current = n, f.current = e, i.setFocused(!1), u(!0), typeof a == "function" && a({
				...t,
				keys: n
			});
		},
		moveDrag(e) {
			typeof o == "function" && o({
				...e,
				keys: d.current
			});
		},
		endDrag(e) {
			let { isInternal: t } = e;
			typeof s == "function" && s({
				...e,
				keys: d.current,
				isInternal: t
			}), d.current = /* @__PURE__ */ new Set(), f.current = null, u(!1);
		}
	};
}
// ../../node_modules/react-stately/dist/private/dnd/useDroppableCollectionState.mjs
function Kd(e) {
	let { acceptedDragTypes: t = "all", isDisabled: n, onInsert: r, onRootDrop: i, onItemDrop: a, onReorder: o, onMove: s, shouldAcceptItemDrop: c, collection: l, selectionManager: u, onDropEnter: d, getDropOperation: f, onDrop: p } = e, [m, h] = (0, W.useState)(null), g = (0, W.useRef)(null), _ = (e) => {
		if (e.dropPosition === "before") {
			let t = l.getItem(e.key);
			return t && t.prevKey != null ? {
				type: "item",
				key: t.prevKey,
				dropPosition: "after"
			} : null;
		}
		if (e.dropPosition === "after") {
			let t = l.getItem(e.key);
			return t && t.nextKey != null ? {
				type: "item",
				key: t.nextKey,
				dropPosition: "before"
			} : null;
		}
		return null;
	}, v = (0, W.useCallback)((e) => {
		let { target: u, types: d, allowedOperations: m, isInternal: h, draggingKeys: g } = e;
		if (n || !u) return "cancel";
		if (t === "all" || t.some((e) => d.has(e))) {
			let e = r && u.type === "item" && !h && (u.dropPosition === "before" || u.dropPosition === "after"), t = o && u.type === "item" && h && (u.dropPosition === "before" || u.dropPosition === "after") && Jd(l, u, g), n = u.type !== "item" || u.dropPosition !== "on" || !c || c(u, d), _ = s && u.type === "item" && h && n, v = i && u.type === "root" && !h, y = a && u.type === "item" && u.dropPosition === "on" && !(h && u.key != null && g.has(u.key)) && n;
			if (p || e || t || _ || v || y) return f ? f(u, d, m) : m[0];
		}
		return "cancel";
	}, [
		n,
		l,
		t,
		f,
		r,
		i,
		a,
		c,
		o,
		s,
		p
	]);
	return {
		collection: l,
		selectionManager: u,
		isDisabled: n,
		target: m,
		setTarget(t) {
			if (this.isDropTarget(t)) return;
			let n = g.current;
			n && typeof e.onDropExit == "function" && e.onDropExit({
				type: "dropexit",
				x: 0,
				y: 0,
				target: n
			}), t && typeof d == "function" && d({
				type: "dropenter",
				x: 0,
				y: 0,
				target: t
			}), g.current = t ?? null, h(t ?? null);
		},
		isDropTarget(e) {
			let t = g.current;
			return !t || !e ? !1 : qd(e, t) ? !0 : e?.type === "item" && t?.type === "item" && e.key !== t.key && e.dropPosition !== t.dropPosition && e.dropPosition !== "on" && t.dropPosition !== "on" ? qd(_(e), t) || qd(e, _(t)) : !1;
		},
		getDropOperation(e) {
			let { target: t, isInternal: n, draggingKeys: r } = e;
			if (n && t.type === "item" && r.size > 0) {
				if (r.has(t.key) && t.dropPosition === "on") return "cancel";
				let e = t.key;
				for (; e != null;) {
					let t = l.getItem(e)?.parentKey;
					if (t != null && r.has(t)) return "cancel";
					e = t ?? null;
				}
			}
			return v(e);
		}
	};
}
function qd(e, t) {
	if (!e) return !t;
	switch (e.type) {
		case "root": return t?.type === "root";
		case "item": return t?.type === "item" && t?.key === e.key && t?.dropPosition === e.dropPosition;
	}
}
function Jd(e, t, n) {
	let r = e.getItem(t.key);
	for (let t of n) if (e.getItem(t)?.parentKey !== r?.parentKey) return !1;
	return !0;
}
// ../../node_modules/react-aria/dist/private/dnd/ListDropTargetDelegate.mjs
var Yd = class {
	constructor(e, t, n) {
		this.collection = e, this.ref = t, this.layout = n?.layout || "stack", this.orientation = n?.orientation || "vertical", this.direction = n?.direction || "ltr";
	}
	getPrimaryStart(e) {
		return this.orientation === "horizontal" ? e.left : e.top;
	}
	getPrimaryEnd(e) {
		return this.orientation === "horizontal" ? e.right : e.bottom;
	}
	getSecondaryStart(e) {
		return this.orientation === "horizontal" ? e.top : e.left;
	}
	getSecondaryEnd(e) {
		return this.orientation === "horizontal" ? e.bottom : e.right;
	}
	getFlowStart(e) {
		return this.layout === "stack" ? this.getPrimaryStart(e) : this.getSecondaryStart(e);
	}
	getFlowEnd(e) {
		return this.layout === "stack" ? this.getPrimaryEnd(e) : this.getSecondaryEnd(e);
	}
	getFlowSize(e) {
		return this.getFlowEnd(e) - this.getFlowStart(e);
	}
	getDropTargetFromPoint(e, t, n) {
		if (this.collection[Symbol.iterator]().next().done || !this.ref.current) return { type: "root" };
		let r = this.ref.current.getBoundingClientRect(), i = this.orientation === "horizontal" ? e : t, a = this.orientation === "horizontal" ? t : e;
		i += this.getPrimaryStart(r), a += this.getSecondaryStart(r);
		let o = this.layout === "stack" ? i : a, s = this.orientation === "horizontal" && this.direction === "rtl", c = this.layout === "grid" && this.orientation === "vertical" && this.direction === "rtl", l = this.layout === "stack" ? s : c, u = this.ref.current?.dataset.collection, d = this.ref.current.querySelectorAll(u ? `[data-collection="${CSS.escape(u)}"]` : "[data-key]"), f = /* @__PURE__ */ new Map();
		for (let e of d) e instanceof HTMLElement && e.dataset.key != null && f.set(e.dataset.key, e);
		let p = [...this.collection].filter((e) => e.type === "item");
		if (p.length < 1) return { type: "root" };
		let m = 0, h = p.length;
		for (; m < h;) {
			let e = Math.floor((m + h) / 2), t = p[e], r = f.get(String(t.key));
			if (!r) break;
			let u = r.getBoundingClientRect(), d = (t) => {
				t ? m = e + 1 : h = e;
			};
			if (i < this.getPrimaryStart(u)) d(s);
			else if (i > this.getPrimaryEnd(u)) d(!s);
			else if (a < this.getSecondaryStart(u)) d(c);
			else if (a > this.getSecondaryEnd(u)) d(!c);
			else {
				let e = {
					type: "item",
					key: t.key,
					dropPosition: "on"
				};
				if (n(e)) o <= this.getFlowStart(u) + 5 && n({
					...e,
					dropPosition: "before"
				}) ? e.dropPosition = l ? "after" : "before" : o >= this.getFlowEnd(u) - 5 && n({
					...e,
					dropPosition: "after"
				}) && (e.dropPosition = l ? "before" : "after");
				else {
					let t = this.getFlowStart(u) + this.getFlowSize(u) / 2;
					o <= t && n({
						...e,
						dropPosition: "before"
					}) ? e.dropPosition = l ? "after" : "before" : o >= t && n({
						...e,
						dropPosition: "after"
					}) && (e.dropPosition = l ? "before" : "after");
				}
				return e;
			}
		}
		let g = p[Math.min(m, p.length - 1)];
		return r = f.get(String(g.key))?.getBoundingClientRect(), r && (i < this.getPrimaryStart(r) || Math.abs(o - this.getFlowStart(r)) < Math.abs(o - this.getFlowEnd(r))) ? {
			type: "item",
			key: g.key,
			dropPosition: l ? "after" : "before"
		} : {
			type: "item",
			key: g.key,
			dropPosition: l ? "before" : "after"
		};
	}
};
// ../../node_modules/react-aria-components/dist/private/useDragAndDrop.mjs
function Xd(e) {
	return { dragAndDropHooks: (0, W.useMemo)(() => {
		let { onDrop: t, onInsert: n, onItemDrop: r, onReorder: i, onMove: a, onRootDrop: o, getItems: s, renderDragPreview: c, renderDropIndicator: l, dropTargetDelegate: u } = e, d = !!s, f = !!(t || n || r || i || a || o), p = {};
		return d && (p.useDraggableCollectionState = function(t) {
			return Gd({
				...t,
				...e
			});
		}, p.useDraggableCollection = Ud, p.useDraggableItem = Hd, p.DragPreview = Wd, p.renderDragPreview = c, p.isVirtualDragging = qs), f && (p.useDroppableCollectionState = function(t) {
			return Kd({
				...t,
				...e
			});
		}, p.useDroppableItem = Pd, p.useDroppableCollection = function(t, n, r) {
			return Nd({
				...t,
				...e
			}, n, r);
		}, p.useDropIndicator = Id, p.renderDropIndicator = l, p.dropTargetDelegate = u, p.ListDropTargetDelegate = Yd), p;
	}, [e]) };
}
// ../../packages/ui/src/builder/model.ts
var $ = (e, t, n = null) => {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i.id === t) return {
			node: i,
			parentId: n,
			index: r
		};
		let a = $(i.children, t, i.id);
		if (a) return a;
	}
	return null;
}, Zd = (e, t) => e.id === t || e.children.some((e) => Zd(e, t)), Qd = (e, t) => t === null ? e : $(e, t)?.node.children ?? [], $d = (e, t, n) => e.flatMap((e) => {
	if (e.id === t) {
		let t = n(e);
		return t ? [t] : [];
	}
	return [{
		...e,
		children: $d(e.children, t, n)
	}];
}), ef = (e, t) => $d(e, t, () => null), tf = (e, t, n) => $d(e, t, n), nf = (e, t, n, r) => {
	let i = (e) => {
		let t = Math.max(0, Math.min(n, e.length));
		return [
			...e.slice(0, t),
			r,
			...e.slice(t)
		];
	};
	return t === null ? i(e) : tf(e, t, (e) => ({
		...e,
		children: i(e.children)
	}));
}, rf = (e, t) => ({
	...structuredClone({
		...e,
		children: []
	}),
	id: t(),
	children: e.children.map((e) => rf(e, t))
}), af = (e) => e.flatMap((e) => [e, ...af(e.children)]), of = (e) => ne(e.type) ? {
	id: e.id,
	type: e.type,
	styles: e.props.styles,
	data: e.props.data
} : null, sf = (e) => e.map((e) => ({
	id: e.id,
	type: e.type,
	props: {
		data: e.data,
		styles: e.styles
	},
	children: []
})), cf = (e) => af(e).flatMap((e) => of(e) ?? []), lf = "container", uf = () => crypto.randomUUID(), df = (e, t, n = {}) => {
	if (e.kind === "boolean" || e.kind === "list" || e.kind === "richtext") return null;
	let r = t == null ? "" : String(t), i = r.trim();
	if (e.key === "alt" && n.decorative !== !0 && i === "") return "Enter alt text, or mark the image as decorative.";
	if (e.required && i === "") return `${e.label} is required.`;
	if (e.maxLength && r.length > e.maxLength) return `${e.label} must be ${e.maxLength} characters or fewer.`;
	if (i === "") return null;
	if (e.kind === "url" && !Le.test(i)) return "Use an http(s), mailto or tel URL, or a relative or # link.";
	if (e.kind === "imageUrl" && !Be.test(i)) return "Use an http(s) URL, a relative path, or an image data URL.";
	if (e.kind === "integer") {
		let t = Number(i);
		if (!Number.isInteger(t)) return `${e.label} must be a whole number.`;
		if (e.min !== void 0 && t < e.min) return `${e.label} must be at least ${e.min}.`;
		if (e.max !== void 0 && t > e.max) return `${e.label} must be at most ${e.max}.`;
	}
	return null;
}, ff = (e, t, n) => ({
	key: e,
	label: t,
	kind: "text",
	scope: "styles",
	maxLength: 40,
	description: n
}), pf = {
	"hero-banner": [
		{
			key: "eyebrow",
			label: "Eyebrow",
			kind: "text",
			maxLength: 80
		},
		{
			key: "title",
			label: "Title",
			kind: "text",
			maxLength: 200
		},
		{
			key: "description",
			label: "Description",
			kind: "textarea",
			maxLength: 500
		},
		{
			key: "bgImage",
			label: "Background image URL",
			kind: "imageUrl"
		},
		{
			key: "buttonText",
			label: "Button text",
			kind: "text",
			maxLength: 80
		},
		{
			key: "buttonUrl",
			label: "Button URL",
			kind: "url"
		},
		ff("height", "Height", "A CSS length such as 55vh."),
		{
			key: "textAlign",
			label: "Text alignment",
			kind: "select",
			scope: "styles",
			options: [
				{
					value: "left",
					label: "Left"
				},
				{
					value: "center",
					label: "Centre"
				},
				{
					value: "right",
					label: "Right"
				}
			]
		}
	],
	"grid-section": [
		{
			key: "heading",
			label: "Heading",
			kind: "text",
			maxLength: 200
		},
		{
			key: "columns",
			label: "Columns",
			kind: "integer",
			min: 1,
			max: 4,
			required: !0
		},
		{
			key: "items",
			label: "Cards",
			kind: "list",
			itemName: "card",
			itemFields: [{
				key: "title",
				label: "Title",
				kind: "text",
				required: !0,
				maxLength: 120
			}, {
				key: "description",
				label: "Description",
				kind: "textarea",
				maxLength: 500
			}],
			newItem: () => ({
				id: uf(),
				title: "New card",
				description: ""
			})
		},
		ff("padding", "Padding", "A CSS length such as 4rem 1.5rem."),
		ff("gap", "Gap", "A CSS length such as 1.5rem.")
	],
	"media-gallery": [
		{
			key: "heading",
			label: "Heading",
			kind: "text",
			maxLength: 200
		},
		{
			key: "layoutType",
			label: "Layout",
			kind: "select",
			options: [{
				value: "grid",
				label: "Grid"
			}, {
				value: "masonry",
				label: "Masonry"
			}]
		},
		{
			key: "items",
			label: "Images",
			kind: "list",
			itemName: "image",
			itemFields: [
				{
					key: "src",
					label: "Image URL",
					kind: "imageUrl",
					required: !0
				},
				{
					key: "alt",
					label: "Alt text",
					kind: "text",
					maxLength: 300
				},
				{
					key: "decorative",
					label: "Decorative image (no alt text)",
					kind: "boolean"
				},
				{
					key: "caption",
					label: "Caption",
					kind: "text",
					maxLength: 300
				}
			],
			newItem: () => ({
				id: uf(),
				src: "",
				alt: "",
				decorative: !1,
				caption: ""
			})
		},
		ff("gap", "Gap", "A CSS length such as 1rem.")
	],
	"rich-text": [{
		key: "content",
		label: "Content",
		kind: "richtext"
	}, ff("maxWidth", "Maximum width", "A CSS length such as 44rem.")],
	"post-body": [
		{
			key: "title",
			label: "Title",
			kind: "text",
			required: !0,
			maxLength: 200
		},
		{
			key: "author",
			label: "Author",
			kind: "text",
			maxLength: 120
		},
		{
			key: "publishedOn",
			label: "Published on",
			kind: "text",
			maxLength: 10,
			description: "Date as YYYY-MM-DD."
		},
		{
			key: "content",
			label: "Content",
			kind: "richtext"
		},
		ff("maxWidth", "Maximum width", "A CSS length such as 44rem.")
	]
}, mf = Object.keys(fe).map((e) => {
	let t = fe[e];
	return {
		type: e,
		name: t.name,
		category: t.category,
		description: t.description,
		canHaveChildren: !1,
		fields: pf[e],
		defaults: () => {
			let { data: e, styles: n } = structuredClone(t.defaultConfig);
			return {
				data: e,
				styles: n
			};
		}
	};
}), hf = [{
	type: lf,
	name: "Container",
	category: "layout",
	description: "A group that holds other blocks.",
	canHaveChildren: !0,
	fields: [{
		key: "label",
		label: "Label",
		kind: "text",
		maxLength: 80
	}],
	defaults: () => ({ data: { label: "Container" } })
}, ...mf], gf = (e) => hf.find((t) => t.type === e), _f = (e) => gf(e)?.canHaveChildren ?? !1, vf = (e, t = crypto.randomUUID()) => ({
	id: t,
	type: e,
	props: gf(e)?.defaults() ?? {},
	children: []
}), yf = (e) => {
	let t = e.props.data ?? {}, n = [
		t.title,
		t.heading,
		t.label
	].find((e) => typeof e == "string" && e.trim() !== ""), r = gf(e.type)?.name ?? e.type;
	return typeof n == "string" ? `${r}: ${n}` : r;
}, bf = "application/x-page-builder-block", xf = "application/x-page-builder-node", Sf = (e, t, n = null) => {
	let r = (e) => n ? e.filter((e) => e.id !== n) : e;
	if (t.type === "root") return {
		parentId: null,
		index: r(e).length
	};
	let i = String(t.key), a = $(e, i);
	if (!a) return null;
	if (t.dropPosition === "on") return _f(a.node.type) ? {
		parentId: a.node.id,
		index: r(a.node.children).length
	} : null;
	let o = r(Qd(e, a.parentId)).findIndex((e) => e.id === i);
	return o < 0 ? null : {
		parentId: a.parentId,
		index: o + +(t.dropPosition === "after")
	};
}, Cf = (e) => e.flatMap((e) => [...e.children.length > 0 || _f(e.type) ? [e.id] : [], ...Cf(e.children)]), wf = (0, W.memo)(function({ node: e, theme: t }) {
	let n = of(e);
	return n ? /* @__PURE__ */ (0, G.jsx)("span", {
		className: "pb-node-preview",
		"aria-hidden": "true",
		inert: !0,
		children: /* @__PURE__ */ (0, G.jsx)(se, {
			blocks: [n],
			theme: t,
			asLandmark: !1
		})
	}) : null;
});
function Tf(e, t) {
	let n = gf(e.type);
	return /* @__PURE__ */ (0, G.jsx)(Td, {
		id: e.id,
		textValue: yf(e),
		title: /* @__PURE__ */ (0, G.jsxs)("span", {
			className: "pb-node",
			children: [
				/* @__PURE__ */ (0, G.jsx)("span", {
					className: "pb-node-label",
					children: yf(e)
				}),
				/* @__PURE__ */ (0, G.jsx)("span", {
					className: "pb-node-type",
					children: n?.category ?? "unknown"
				}),
				/* @__PURE__ */ (0, G.jsx)(wf, {
					node: e,
					theme: t
				})
			]
		}),
		children: e.children.map((e) => Tf(e, t))
	}, e.id);
}
function Ef({ tree: e, selectedId: t, focusId: n, theme: r, dispatch: i }) {
	let a = (0, W.useRef)(null), o = (0, W.useRef)(/* @__PURE__ */ new Set()), [s, c] = (0, W.useState)(/* @__PURE__ */ new Set());
	(0, W.useEffect)(() => {
		let t = Cf(e).filter((e) => !o.current.has(e));
		t.length !== 0 && (t.forEach((e) => o.current.add(e)), c((e) => /* @__PURE__ */ new Set([...e, ...t])));
	}, [e]), (0, W.useEffect)(() => {
		let e = a.current;
		if (!n || !e) return;
		let t = () => {
			let t = [...e.querySelectorAll("[data-key]")].find((e) => e.dataset.key === n);
			return t ? (t.focus(), i({ type: "clearFocus" }), !0) : !1;
		};
		if (t()) return;
		let r = new MutationObserver(() => {
			t() && r.disconnect();
		});
		return r.observe(e, {
			childList: !0,
			subtree: !0
		}), () => r.disconnect();
	}, [
		n,
		e,
		i
	]);
	let l = async (t, n, r) => {
		let a = r ? [...r].map(String) : [];
		for (let t of a) {
			let r = Sf(e, n, t);
			if (!r) {
				i({
					type: "move",
					id: t,
					parentId: "",
					index: 0
				});
				return;
			}
			i({
				type: "move",
				id: t,
				...r
			});
		}
		let o = 0;
		for (let a of t) if (Os(a)) {
			if (a.types.has("application/x-page-builder-block")) {
				let t = await a.getText(bf), r = Sf(e, n);
				if (!r) continue;
				i({
					type: "add",
					blockType: t,
					parentId: r.parentId,
					index: r.index + o++
				});
			} else if (a.types.has("application/x-page-builder-node") && !r) {
				let t = await a.getText(xf), r = Sf(e, n, t);
				r && i({
					type: "move",
					id: t,
					...r
				});
			}
		}
	}, { dragAndDropHooks: u } = Xd({
		getItems: (t) => [...t].map((t) => {
			let n = $(e, String(t));
			return {
				[xf]: String(t),
				"text/plain": n ? yf(n.node) : ""
			};
		}),
		getAllowedDropOperations: () => ["move", "copy"],
		acceptedDragTypes: [bf, xf],
		getDropOperation: (t, n) => {
			if (t.type === "item" && t.dropPosition === "on") {
				let n = $(e, String(t.key));
				if (!n || !_f(n.node.type)) return "cancel";
			}
			return n.has("application/x-page-builder-block") ? "copy" : "move";
		},
		shouldAcceptItemDrop: (t) => {
			let n = $(e, String(t.key));
			return !!n && _f(n.node.type);
		},
		onReorder: (e) => {
			l([], e.target, e.keys);
		},
		onInsert: (e) => {
			l(e.items, e.target);
		},
		onItemDrop: (e) => {
			l(e.items, e.target);
		},
		onRootDrop: (e) => {
			l(e.items, { type: "root" });
		}
	});
	return /* @__PURE__ */ (0, G.jsx)("div", {
		ref: a,
		className: "pb-canvas",
		onKeyDownCapture: (e) => {
			if (!e.target.closest("[role=\"row\"]") || !t) return;
			let n = e.ctrlKey || e.metaKey, r = e.key.toLowerCase(), a = null;
			e.altKey && !n && (e.key === "ArrowUp" || e.key === "ArrowDown") ? a = {
				type: "moveBy",
				id: t,
				delta: e.key === "ArrowUp" ? -1 : 1
			} : !n && !e.altKey && (e.key === "Delete" || e.key === "Backspace") ? a = {
				type: "remove",
				id: t
			} : n && r === "d" ? a = {
				type: "duplicate",
				id: t
			} : n && r === "z" ? a = { type: e.shiftKey ? "redo" : "undo" } : n && r === "y" && (a = { type: "redo" }), a && (e.preventDefault(), e.stopPropagation(), i(a));
		},
		children: /* @__PURE__ */ (0, G.jsx)(Cd, {
			"aria-label": "Page canvas",
			"aria-describedby": "pb-canvas-help",
			selectionMode: "single",
			selectionBehavior: "replace",
			selectedKeys: t ? [t] : [],
			onSelectionChange: (e) => {
				if (e === "all") return;
				let [t] = e;
				i({
					type: "select",
					id: t === void 0 ? null : String(t)
				});
			},
			expandedKeys: s,
			onExpandedChange: (e) => c(new Set(e)),
			dragAndDropHooks: u,
			renderEmptyState: () => /* @__PURE__ */ (0, G.jsx)("span", { children: "Canvas is empty. Add blocks from the palette." }),
			children: e.map((e) => Tf(e, r))
		})
	});
}
// ../../packages/ui/src/builder/BlockPalette.tsx
function Df({ onInsert: e }) {
	let [t, n] = (0, W.useState)(""), r = (0, W.useMemo)(() => {
		let e = t.trim().toLowerCase();
		return e ? hf.filter((t) => `${t.name} ${t.description} ${t.category}`.toLowerCase().includes(e)) : hf;
	}, [t]), { dragAndDropHooks: i } = Xd({
		getItems: (e) => [...e].map((e) => {
			let t = hf.find((t) => t.type === e)?.name ?? "";
			return {
				[bf]: String(e),
				"text/plain": t
			};
		}),
		getAllowedDropOperations: () => ["copy"]
	});
	return /* @__PURE__ */ (0, G.jsxs)("section", {
		className: "pb-palette",
		"aria-labelledby": "pb-palette-title",
		children: [
			/* @__PURE__ */ (0, G.jsx)("h2", {
				id: "pb-palette-title",
				children: "Blocks"
			}),
			/* @__PURE__ */ (0, G.jsx)(rs, {
				label: "Search blocks",
				value: t,
				onChange: n
			}),
			/* @__PURE__ */ (0, G.jsx)("p", {
				id: "pb-palette-help",
				className: "pb-help",
				children: "Press Enter on a block to insert it. To drag, use the block's drag handle with the mouse, or focus the handle, press Enter, then move to the canvas and press Enter again."
			}),
			/* @__PURE__ */ (0, G.jsx)(Xl, {
				"aria-label": "Available blocks",
				"aria-describedby": "pb-palette-help",
				layout: "stack",
				items: r,
				dragAndDropHooks: i,
				onAction: (t) => e(String(t)),
				renderEmptyState: () => /* @__PURE__ */ (0, G.jsxs)("span", {
					role: "status",
					children: [
						"No blocks match “",
						t,
						"”."
					]
				}),
				className: "pb-palette-list",
				children: (e) => /* @__PURE__ */ (0, G.jsxs)(Zl, {
					id: e.type,
					textValue: e.name,
					className: "pb-palette-item",
					children: [/* @__PURE__ */ (0, G.jsx)("span", {
						className: "pb-palette-name",
						children: e.name
					}), /* @__PURE__ */ (0, G.jsx)(ur, {
						slot: "description",
						children: e.description
					})]
				})
			}),
			"    "
		]
	});
}
// ../../packages/ui/src/builder/persistence.ts
var Of = "react-aria-page-builder", kf = "react-aria-page-builder.page", Af = 16, jf = Ce.element, Mf = ke({
	data: De(Ge(), Oe()).optional(),
	styles: De(Ge(), Ae([Ge(), Ke()])).optional()
}), Nf = qe(() => ke({
	id: Ge().min(1),
	type: Ge().min(1),
	props: Mf,
	children: Fe(Nf)
})), Pf = ke({
	format: Me(Of),
	version: Ke().int(),
	savedAt: Ge().optional(),
	tree: Fe(Nf)
}), Ff = (e, t = "") => e.issues.map((e) => {
	let n = e.path.join(".");
	return `${t}${n ? `${n}: ` : ""}${e.message}`;
}), If = (e) => {
	let t = [], n = /* @__PURE__ */ new Set(), r = (e, i, a) => {
		if (n.has(e.id) && t.push(`${a}: duplicate id "${e.id}".`), n.add(e.id), i > Af) t.push(`${a}: nested deeper than ${Af} levels.`);
		else {
			if (!gf(e.type)) t.push(`${a}: unknown block type "${e.type}".`);
			else if (e.type === "container") {
				let n = e.props.data?.label;
				n !== void 0 && (typeof n != "string" || n.length > 80) && t.push(`${a}: label must be text of 80 characters or fewer.`);
			} else {
				let n = jf.safeParse({
					id: e.id,
					type: e.type,
					styles: e.props.styles,
					data: e.props.data
				});
				n.success || t.push(...Ff(n.error, `${a}: `));
			}
			e.children.length > 0 && !_f(e.type) && t.push(`${a}: ${e.type} cannot contain other blocks.`), e.children.forEach((e, t) => r(e, i + 1, `${a} > block ${t + 1}`));
		}
	};
	return e.forEach((e, t) => r(e, 0, `Block ${t + 1}`)), t;
}, Lf = (e, t = /* @__PURE__ */ new Date()) => ({
	format: Of,
	version: 1,
	savedAt: t.toISOString(),
	tree: e
}), Rf = (e) => {
	let t = If(e.tree);
	return t.length > 0 ? {
		ok: !1,
		errors: t
	} : {
		ok: !0,
		json: JSON.stringify(e, null, 2)
	};
}, zf = (e, t = /* @__PURE__ */ new Date()) => Rf(Lf(e, t)), Bf = (e) => {
	let t;
	try {
		t = JSON.parse(e);
	} catch {
		return {
			ok: !1,
			errors: ["The file is not valid JSON."]
		};
	}
	let n = Te.safeParse(t);
	if (n.success) return Vf(sf(n.data.blocks));
	let r = Pf.safeParse(t);
	return r.success ? r.data.version > 1 ? {
		ok: !1,
		errors: [`This file uses format version ${r.data.version}; this editor supports up to 1.`]
	} : Vf(r.data.tree) : {
		ok: !1,
		errors: ["This is not a page builder file.", ...Ff(r.error)]
	};
}, Vf = (e) => {
	let t = If(e);
	return t.length > 0 ? {
		ok: !1,
		errors: t
	} : {
		ok: !0,
		tree: e
	};
}, Hf = (e, t = kf, n = localStorage) => {
	let r = zf(e);
	if (!r.ok) return r;
	try {
		n.setItem(t, r.json);
	} catch {
		return {
			ok: !1,
			errors: ["The browser refused to store the page (storage full or blocked)."]
		};
	}
	return { ok: !0 };
}, Uf = (e = kf, t = localStorage) => {
	let n;
	try {
		n = t.getItem(e);
	} catch {
		return null;
	}
	return n === null ? null : Bf(n);
}, Wf = [
	{
		key: "bold",
		label: "Bold"
	},
	{
		key: "italic",
		label: "Italic"
	},
	{
		key: "underline",
		label: "Underline"
	},
	{
		key: "strike",
		label: "Strikethrough"
	},
	{
		key: "code",
		label: "Code"
	}
], Gf = /https?:\/\/[^\s<>]+|www\.[^\s<>]+/gi, Kf = /[.,;:!?)}\]]+$/, qf = (e) => e.flatMap((e) => {
	if (He(e)) return [e];
	let t = [], n = 0;
	for (let r of e.text.matchAll(new RegExp(Gf.source, "gi"))) {
		let i = r.index ?? 0, a = r[0], o = a.match(Kf)?.[0] ?? "", s = o ? a.slice(0, -o.length) : a, c = s.startsWith("www.") ? `https://${s}` : s;
		s && Le.test(c) && (i > n && t.push({
			text: e.text.slice(n, i),
			marks: e.marks
		}), t.push({
			text: s,
			marks: [...e.marks ?? [], {
				type: "link",
				href: c
			}]
		}), o && t.push({
			text: o,
			marks: e.marks
		}), n = i + a.length);
	}
	return n === 0 ? [e] : (n < e.text.length && t.push({
		text: e.text.slice(n),
		marks: e.marks
	}), t);
}), Jf = [
	{
		value: "paragraph",
		label: "Paragraph"
	},
	{
		value: "heading-1",
		label: "Heading level 1"
	},
	{
		value: "heading-2",
		label: "Heading level 2"
	},
	{
		value: "heading-3",
		label: "Heading level 3"
	},
	{
		value: "heading-4",
		label: "Heading level 4"
	},
	{
		value: "list-bullet",
		label: "Bulleted list"
	},
	{
		value: "list-number",
		label: "Numbered list"
	}
], Yf = (e) => e.type === "heading" ? `heading-${e.level}` : e.type === "list" ? e.ordered ? "list-number" : "list-bullet" : "paragraph", Xf = (e) => e.type !== "paragraph" && e.type !== "heading" && e.type !== "list" ? e.type.replace("-", " ") : Jf.find((t) => t.value === Yf(e))?.label ?? "Block", Zf = (e) => e.type === "list" ? e.items[0]?.children ?? [ze()] : e.children, Qf = (e, t) => {
	let n = Zf(e);
	if (t === "paragraph") return e.type === "list" ? e.items.flatMap((t, n) => [{
		id: n === 0 ? e.id : t.id,
		type: "paragraph",
		children: t.children
	}, ...t.blocks ?? []]) : [{
		id: e.id,
		type: "paragraph",
		children: n
	}];
	if (t.startsWith("heading-")) {
		let r = Number(t.slice(-1));
		return e.type === "list" ? e.items.flatMap((t, n) => [{
			id: n === 0 ? e.id : t.id,
			type: "heading",
			level: r,
			children: t.children
		}, ...t.blocks ?? []]) : [{
			id: e.id,
			type: "heading",
			level: r,
			children: n
		}];
	}
	let r = t === "list-number";
	return e.type === "list" ? [{
		...e,
		ordered: r
	}] : [{
		id: e.id,
		type: "list",
		ordered: r,
		items: [{
			id: crypto.randomUUID(),
			children: n
		}]
	}];
};
function $f({ run: e, label: t, onChange: n }) {
	let r = He(e), [i, a] = (0, W.useState)(r), o = i.trim() !== "" && !Le.test(i.trim()) ? "Use an http(s), mailto or tel URL, or a relative or # link." : null;
	return (0, W.useEffect)(() => {
		a((e) => e !== r && o === null ? r : e);
	}, [r]), /* @__PURE__ */ (0, G.jsx)(md, {
		label: `${t} link URL`,
		value: i,
		type: "url",
		validationBehavior: "aria",
		isInvalid: o !== null,
		errorMessage: o ?? void 0,
		onChange: (t) => {
			a(t), (t.trim() === "" || Le.test(t.trim())) && n(We(e, t.trim()));
		}
	});
}
function ep({ label: e, runs: t, onChange: n }) {
	let r = (e, r) => n(t.map((t, n) => n === e ? r : t));
	return /* @__PURE__ */ (0, G.jsxs)("fieldset", {
		className: "pb-richtext-runs",
		children: [
			/* @__PURE__ */ (0, G.jsx)("legend", { children: e }),
			t.map((i, a) => {
				let o = `${e}, part ${a + 1}`, s = Wf.filter((e) => Ne(i, e.key)).map((e) => e.key);
				return /* @__PURE__ */ (0, G.jsxs)("div", {
					className: "pb-richtext-run",
					children: [
						/* @__PURE__ */ (0, G.jsx)(md, {
							label: `${o} text`,
							value: i.text,
							maxLength: Ue,
							onChange: (e) => r(a, {
								...i,
								text: e
							}),
							onBlur: () => {
								let e = qf(t);
								e.some((e, n) => e !== t[n]) && n(e);
							}
						}),
						/* @__PURE__ */ (0, G.jsx)(yd, {
							"aria-label": `${o} formatting`,
							selectionMode: "multiple",
							selectedKeys: s,
							onSelectionChange: (e) => {
								let t = i;
								for (let n of Wf) {
									let r = e.has(n.key);
									r !== Ne(t, n.key) && (t = Pe(t, n.key, r));
								}
								r(a, t);
							},
							children: Wf.map((e) => /* @__PURE__ */ (0, G.jsx)(vd, {
								id: e.key,
								variant: "secondary",
								children: e.label
							}, e.key))
						}),
						/* @__PURE__ */ (0, G.jsx)(K, {
							variant: "quiet",
							"aria-pressed": i.hardBreak === !0,
							onPress: () => r(a, {
								...i,
								hardBreak: !i.hardBreak || void 0
							}),
							children: i.hardBreak ? `Remove line break after ${o}` : `Insert line break after ${o}`
						}),
						/* @__PURE__ */ (0, G.jsx)($f, {
							run: i,
							label: o,
							onChange: (e) => r(a, e)
						}),
						t.length > 1 && /* @__PURE__ */ (0, G.jsxs)(K, {
							variant: "quiet",
							onPress: () => n(t.filter((e, t) => t !== a)),
							children: ["Remove ", o]
						})
					]
				}, a);
			}),
			/* @__PURE__ */ (0, G.jsxs)(K, {
				variant: "quiet",
				onPress: () => n([...t, ze()]),
				children: ["Add text part to ", e]
			})
		]
	});
}
function tp({ label: e, value: t, onChange: n, uploadMedia: r }) {
	let i = (e, r) => n(t.map((t, n) => n === e ? r : t)), a = (e, r) => n([
		...t.slice(0, e),
		...r,
		...t.slice(e + 1)
	]), o = (e, r) => {
		let i = [...t];
		[i[e], i[e + r]] = [i[e + r], i[e]], n(i);
	};
	return /* @__PURE__ */ (0, G.jsxs)("fieldset", {
		className: "pb-list pb-richtext",
		children: [
			/* @__PURE__ */ (0, G.jsx)("legend", { children: e }),
			t.length === 0 && /* @__PURE__ */ (0, G.jsx)("p", {
				className: "pb-help",
				children: "No content yet."
			}),
			t.map((e, s) => {
				let c = `Block ${s + 1} (${Xf(e)})`, l = e.type === "paragraph" || e.type === "heading" || e.type === "list";
				return /* @__PURE__ */ (0, G.jsxs)("fieldset", {
					className: "pb-list-item",
					children: [
						/* @__PURE__ */ (0, G.jsx)("legend", { children: c }),
						l && /* @__PURE__ */ (0, G.jsxs)("div", {
							className: "pb-field",
							children: [/* @__PURE__ */ (0, G.jsxs)("label", {
								htmlFor: `rt-kind-${e.id}`,
								className: "pb-field-label",
								children: ["Type of block ", s + 1]
							}), /* @__PURE__ */ (0, G.jsx)("select", {
								id: `rt-kind-${e.id}`,
								className: "pb-select",
								value: Yf(e),
								onChange: (t) => a(s, Qf(e, t.target.value)),
								children: Jf.map((e) => /* @__PURE__ */ (0, G.jsx)("option", {
									value: e.value,
									children: e.label
								}, e.value))
							})]
						}),
						e.type === "list" ? /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [e.items.map((t, n) => /* @__PURE__ */ (0, G.jsxs)("div", { children: [
							/* @__PURE__ */ (0, G.jsx)(ep, {
								label: `Block ${s + 1} item ${n + 1}`,
								runs: t.children,
								onChange: (n) => i(s, {
									...e,
									items: e.items.map((e) => e.id === t.id ? {
										...e,
										children: n
									} : e)
								})
							}),
							e.ordered && /* @__PURE__ */ (0, G.jsx)(md, {
								label: `Block ${s + 1} list starting number`,
								value: e.start === void 0 ? "" : String(e.start),
								type: "number",
								onChange: (t) => i(s, {
									...e,
									start: t === "" ? void 0 : Number(t)
								})
							}),
							!t.blocks && /* @__PURE__ */ (0, G.jsxs)(K, {
								variant: "quiet",
								onPress: () => i(s, {
									...e,
									items: e.items.map((e) => e.id === t.id ? {
										...e,
										blocks: [Ie()]
									} : e)
								}),
								children: ["Add nested content to item ", n + 1]
							}),
							t.blocks && /* @__PURE__ */ (0, G.jsx)(tp, {
								label: `Block ${s + 1} item ${n + 1} nested content`,
								value: t.blocks,
								onChange: (n) => i(s, {
									...e,
									items: e.items.map((e) => e.id === t.id ? {
										...e,
										blocks: n
									} : e)
								}),
								uploadMedia: r
							}),
							e.items.length > 1 && /* @__PURE__ */ (0, G.jsxs)(K, {
								variant: "quiet",
								onPress: () => i(s, {
									...e,
									items: e.items.filter((e) => e.id !== t.id)
								}),
								children: [
									"Remove block ",
									s + 1,
									" item ",
									n + 1
								]
							})
						] }, t.id)), /* @__PURE__ */ (0, G.jsxs)(K, {
							variant: "secondary",
							onPress: () => i(s, {
								...e,
								items: [...e.items, {
									id: crypto.randomUUID(),
									children: [ze()]
								}]
							}),
							children: ["Add item to block ", s + 1]
						})] }) : e.type === "paragraph" || e.type === "heading" ? /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [/* @__PURE__ */ (0, G.jsx)(ep, {
							label: `Block ${s + 1} text`,
							runs: e.children,
							onChange: (t) => i(s, {
								...e,
								children: t
							})
						}), /* @__PURE__ */ (0, G.jsxs)("label", {
							className: "pb-field",
							children: ["Text alignment", /* @__PURE__ */ (0, G.jsx)("select", {
								className: "pb-select",
								"aria-label": `Block ${s + 1} text alignment`,
								value: e.textAlign ?? "left",
								onChange: (t) => i(s, {
									...e,
									textAlign: t.target.value
								}),
								children: [
									"left",
									"center",
									"right",
									"justify"
								].map((e) => /* @__PURE__ */ (0, G.jsx)("option", {
									value: e,
									children: e
								}, e))
							})]
						})] }) : /* @__PURE__ */ (0, G.jsx)(np, {
							block: e,
							label: `Block ${s + 1}`,
							onChange: (e) => i(s, e),
							uploadMedia: r
						}),
						/* @__PURE__ */ (0, G.jsxs)("div", {
							className: "pb-richtext-actions",
							children: [
								/* @__PURE__ */ (0, G.jsxs)(K, {
									variant: "secondary",
									isDisabled: s === 0,
									onPress: () => o(s, -1),
									children: [
										"Move block ",
										s + 1,
										" up"
									]
								}),
								/* @__PURE__ */ (0, G.jsxs)(K, {
									variant: "secondary",
									isDisabled: s === t.length - 1,
									onPress: () => o(s, 1),
									children: [
										"Move block ",
										s + 1,
										" down"
									]
								}),
								/* @__PURE__ */ (0, G.jsxs)(K, {
									variant: "secondary",
									onPress: () => n(t.filter((e, t) => t !== s)),
									children: ["Remove block ", s + 1]
								})
							]
						})
					]
				}, e.id);
			}),
			/* @__PURE__ */ (0, G.jsxs)("div", {
				className: "pb-richtext-actions",
				children: [
					/* @__PURE__ */ (0, G.jsx)(K, {
						variant: "secondary",
						onPress: () => n([...t, Ie()]),
						children: "Add paragraph"
					}),
					/* @__PURE__ */ (0, G.jsx)(K, {
						variant: "secondary",
						onPress: () => n([...t, Re()]),
						children: "Add heading"
					}),
					/* @__PURE__ */ (0, G.jsx)(K, {
						variant: "secondary",
						onPress: () => n([...t, Ve()]),
						children: "Add list"
					}),
					[
						["blockquote", "Add quote"],
						["code-block", "Add code block"],
						["divider", "Add divider"],
						["callout", "Add callout"],
						["columns", "Add columns"],
						["accordion", "Add accordion"],
						["image", "Add image"],
						["audio", "Add audio"],
						["video", "Add video"],
						["youtube", "Add YouTube video"],
						["vimeo", "Add Vimeo video"],
						["iframe", "Add embed"]
					].map(([e, r]) => /* @__PURE__ */ (0, G.jsx)(K, {
						variant: "secondary",
						onPress: () => n([...t, je(e)]),
						children: r
					}, e))
				]
			})
		]
	});
}
function np({ block: e, label: t, onChange: n, uploadMedia: r }) {
	let i = (e, r, i, a = "text") => /* @__PURE__ */ (0, G.jsx)(md, {
		label: `${t} ${e}`,
		value: r,
		type: a,
		onChange: (e) => n(i(e))
	}), a = (e, t, n) => i(e, t === void 0 ? "" : String(t), (e) => n(e === "" ? void 0 : Number(e)), "number");
	switch (e.type) {
		case "blockquote":
		case "callout":
		case "accordion": return /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [
			e.type === "callout" && /* @__PURE__ */ (0, G.jsxs)("label", {
				className: "pb-field",
				children: [
					t,
					" variant",
					/* @__PURE__ */ (0, G.jsxs)("select", {
						className: "pb-select",
						"aria-label": `${t} variant`,
						value: e.variant,
						onChange: (t) => n({
							...e,
							variant: t.target.value
						}),
						children: [
							/* @__PURE__ */ (0, G.jsx)("option", {
								value: "info",
								children: "Info"
							}),
							/* @__PURE__ */ (0, G.jsx)("option", {
								value: "warning",
								children: "Warning"
							}),
							/* @__PURE__ */ (0, G.jsx)("option", {
								value: "success",
								children: "Success"
							})
						]
					})
				]
			}),
			e.type === "accordion" && i("title", e.title, (t) => ({
				...e,
				title: t
			})),
			/* @__PURE__ */ (0, G.jsx)(tp, {
				label: `${t} content`,
				value: e.children,
				onChange: (t) => n({
					...e,
					children: t
				}),
				uploadMedia: r
			})
		] });
		case "columns": return /* @__PURE__ */ (0, G.jsxs)("div", {
			className: "pb-richtext-columns-editor",
			children: [e.columns.map((i, o) => /* @__PURE__ */ (0, G.jsxs)("fieldset", {
				className: "pb-list-item",
				children: [
					/* @__PURE__ */ (0, G.jsxs)("legend", { children: [
						t,
						" column ",
						o + 1
					] }),
					a("width (%)", i.width, (t) => ({
						...e,
						columns: e.columns.map((e) => e.id === i.id ? {
							...e,
							width: t
						} : e)
					})),
					/* @__PURE__ */ (0, G.jsx)(tp, {
						label: `${t} column ${o + 1} content`,
						value: i.children,
						onChange: (t) => n({
							...e,
							columns: e.columns.map((e) => e.id === i.id ? {
								...e,
								children: t
							} : e)
						}),
						uploadMedia: r
					}),
					e.columns.length > 2 && /* @__PURE__ */ (0, G.jsxs)(K, {
						variant: "quiet",
						onPress: () => n({
							...e,
							columns: e.columns.filter((e) => e.id !== i.id)
						}),
						children: ["Remove column ", o + 1]
					})
				]
			}, i.id)), e.columns.length < 3 && /* @__PURE__ */ (0, G.jsx)(K, {
				variant: "secondary",
				onPress: () => n({
					...e,
					columns: [...e.columns, {
						id: crypto.randomUUID(),
						children: [Ie()]
					}]
				}),
				children: "Add column"
			})]
		});
		case "code-block": return /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [i("language", e.language ?? "", (t) => ({
			...e,
			language: t
		})), /* @__PURE__ */ (0, G.jsxs)("label", {
			className: "pb-field",
			children: [
				t,
				" code",
				/* @__PURE__ */ (0, G.jsx)("textarea", {
					value: e.text,
					maxLength: 1e5,
					"aria-label": `${t} code`,
					onChange: (t) => n({
						...e,
						text: t.target.value
					}),
					rows: 8
				})
			]
		})] });
		case "divider": return /* @__PURE__ */ (0, G.jsx)("p", { children: "A horizontal divider is shown in the page preview." });
		case "image": return /* @__PURE__ */ (0, G.jsx)(ap, {
			block: e,
			label: t,
			onChange: n,
			uploadMedia: r
		});
		case "audio": return /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [i("audio URL", e.src, (t) => ({
			...e,
			src: t
		}), "url"), i("title", e.title ?? "", (t) => ({
			...e,
			title: t
		}))] });
		case "video": return /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [
			i("video URL", e.src, (t) => ({
				...e,
				src: t
			}), "url"),
			i("title", e.title ?? "", (t) => ({
				...e,
				title: t
			})),
			i("poster URL", e.poster ?? "", (t) => ({
				...e,
				poster: t || void 0
			}), "url"),
			a("width (px)", e.width, (t) => ({
				...e,
				width: t
			})),
			a("height (px)", e.height, (t) => ({
				...e,
				height: t
			}))
		] });
		case "youtube": return /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [
			i("video ID", e.videoId, (t) => ({
				...e,
				videoId: t
			})),
			i("title", e.title ?? "", (t) => ({
				...e,
				title: t
			})),
			a("width (px)", e.width, (t) => ({
				...e,
				width: t
			})),
			a("height (px)", e.height, (t) => ({
				...e,
				height: t
			}))
		] });
		case "vimeo":
		case "iframe": return /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [
			i("source URL", e.src, (t) => ({
				...e,
				src: t
			}), "url"),
			i("accessible title", e.title ?? "", (t) => ({
				...e,
				title: t
			})),
			e.type === "iframe" ? /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [i("width", e.width ?? "100%", (t) => ({
				...e,
				width: t
			})), i("height", e.height ?? "400", (t) => ({
				...e,
				height: t
			}))] }) : /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [a("width (px)", e.width, (t) => ({
				...e,
				width: t
			})), a("height (px)", e.height, (t) => ({
				...e,
				height: t
			}))] })
		] });
	}
}
var rp = 10485760, ip = (e) => new Promise((t, n) => {
	let r = new FileReader();
	r.onerror = () => n(r.error ?? /* @__PURE__ */ Error("The image could not be read.")), r.onload = () => typeof r.result == "string" ? t(r.result) : n(/* @__PURE__ */ Error("The image reader returned an invalid result.")), r.readAsDataURL(e);
});
function ap({ block: e, label: t, onChange: n, uploadMedia: r }) {
	let [i, a] = (0, W.useState)(null), o = (0, W.useRef)(null), s = async (t) => {
		if (t) {
			if (!t.type.startsWith("image/")) a("Choose an image file.");
			else if (t.size > rp) a("Images must be 10 MB or smaller.");
			else try {
				let i = r ? await r(t) : await ip(t);
				n({
					...e,
					src: i
				}), a(null);
			} catch (e) {
				a(e instanceof Error ? e.message : "The image upload failed.");
			}
		}
	}, c = (e) => {
		let t = e?.item(0);
		t && s(t);
	};
	return /* @__PURE__ */ (0, G.jsxs)("fieldset", {
		className: "pb-richtext-image",
		"aria-label": `${t} image upload`,
		onPaste: (e) => {
			let t = Array.from(e.clipboardData.files).find((e) => e.type.startsWith("image/"));
			t && (e.preventDefault(), s(t));
		},
		onDragOver: (e) => {
			Array.from(e.dataTransfer.types).includes("Files") && e.preventDefault();
		},
		onDrop: (e) => {
			Array.from(e.dataTransfer.files).some((e) => e.type.startsWith("image/")) && (e.preventDefault(), c(e.dataTransfer.files));
		},
		children: [
			/* @__PURE__ */ (0, G.jsxs)("legend", { children: [t, " image"] }),
			/* @__PURE__ */ (0, G.jsx)(md, {
				label: `${t} image URL`,
				value: e.src,
				type: "url",
				onChange: (t) => n({
					...e,
					src: t
				})
			}),
			/* @__PURE__ */ (0, G.jsx)(md, {
				label: `${t} alt text`,
				value: e.alt,
				isRequired: !0,
				onChange: (t) => n({
					...e,
					alt: t
				})
			}),
			/* @__PURE__ */ (0, G.jsx)(md, {
				label: `${t} title`,
				value: e.title ?? "",
				onChange: (t) => n({
					...e,
					title: t
				})
			}),
			/* @__PURE__ */ (0, G.jsxs)("label", {
				className: "pb-field",
				children: [
					t,
					" alignment",
					/* @__PURE__ */ (0, G.jsxs)("select", {
						className: "pb-select",
						"aria-label": `${t} image alignment`,
						value: e.align ?? "center",
						onChange: (t) => n({
							...e,
							align: t.target.value
						}),
						children: [
							/* @__PURE__ */ (0, G.jsx)("option", {
								value: "left",
								children: "Left"
							}),
							/* @__PURE__ */ (0, G.jsx)("option", {
								value: "center",
								children: "Centre"
							}),
							/* @__PURE__ */ (0, G.jsx)("option", {
								value: "right",
								children: "Right"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, G.jsx)(md, {
				label: `${t} width (px)`,
				value: e.width === void 0 ? "" : String(e.width),
				type: "number",
				onChange: (t) => n({
					...e,
					width: t === "" ? void 0 : Number(t)
				})
			}),
			/* @__PURE__ */ (0, G.jsx)(md, {
				label: `${t} height (px)`,
				value: e.height === void 0 ? "" : String(e.height),
				type: "number",
				onChange: (t) => n({
					...e,
					height: t === "" ? void 0 : Number(t)
				})
			}),
			/* @__PURE__ */ (0, G.jsx)("input", {
				ref: o,
				type: "file",
				accept: "image/*",
				hidden: !0,
				"aria-label": `${t} choose image file`,
				onChange: (e) => {
					c(e.target.files), e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, G.jsx)(K, {
				variant: "secondary",
				onPress: () => o.current?.click(),
				children: "Upload image"
			}),
			/* @__PURE__ */ (0, G.jsxs)("p", {
				className: "pb-help",
				children: ["Or paste an image or drop it in this fieldset. ", r ? "Files are uploaded by the host." : "Files are stored as local image data."]
			}),
			i && /* @__PURE__ */ (0, G.jsx)("p", {
				role: "alert",
				children: i
			})
		]
	});
}
// ../../packages/ui/src/builder/PropsPanel.tsx
var op = (e) => e == null ? "" : String(e);
function sp({ field: e, value: t, siblings: n, onChange: r }) {
	let [i, a] = (0, W.useState)(op(t)), o = df(e, i, n);
	(0, W.useEffect)(() => {
		a((r) => r !== op(t) && df(e, r, n) === null ? op(t) : r);
	}, [t]);
	let s = (t) => {
		a(t), df(e, t, n) === null && r(e.kind === "integer" && t.trim() !== "" ? Number(t) : t);
	}, c = e.kind === "textarea" ? hd : md;
	return /* @__PURE__ */ (0, G.jsx)(c, {
		label: e.label,
		description: e.description,
		value: i,
		onChange: s,
		isRequired: e.required,
		isInvalid: o !== null,
		errorMessage: o ?? void 0,
		validationBehavior: "aria",
		type: e.kind === "url" ? "url" : "text",
		inputMode: e.kind === "integer" ? "numeric" : void 0
	});
}
function cp({ field: e, value: t, onChange: n }) {
	let r = (0, W.useId)();
	return /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "pb-field",
		children: [/* @__PURE__ */ (0, G.jsx)("label", {
			htmlFor: r,
			className: "pb-field-label",
			children: e.label
		}), /* @__PURE__ */ (0, G.jsx)("select", {
			id: r,
			className: "pb-select",
			value: op(t),
			onChange: (e) => n(e.target.value),
			children: e.options?.map((e) => /* @__PURE__ */ (0, G.jsx)("option", {
				value: e.value,
				children: e.label
			}, e.value))
		})]
	});
}
function lp({ field: e, value: t, onChange: n }) {
	let r = Array.isArray(t) ? t : [], i = e.itemName ?? "item", a = (e, t, i) => n(r.map((n, r) => r === e ? {
		...n,
		[t]: i
	} : n));
	return /* @__PURE__ */ (0, G.jsxs)("fieldset", {
		className: "pb-list",
		children: [
			/* @__PURE__ */ (0, G.jsx)("legend", { children: e.label }),
			r.length === 0 && /* @__PURE__ */ (0, G.jsxs)("p", {
				className: "pb-help",
				children: [
					"No ",
					e.label.toLowerCase(),
					" yet."
				]
			}),
			r.map((t, o) => /* @__PURE__ */ (0, G.jsxs)("fieldset", {
				className: "pb-list-item",
				children: [
					/* @__PURE__ */ (0, G.jsxs)("legend", { children: [
						i,
						" ",
						o + 1
					] }),
					e.itemFields?.map((e) => /* @__PURE__ */ (0, G.jsx)(up, {
						field: e,
						value: t[e.key],
						siblings: t,
						onChange: (t) => a(o, e.key, t)
					}, e.key)),
					/* @__PURE__ */ (0, G.jsxs)(K, {
						variant: "secondary",
						onPress: () => n(r.filter((e, t) => t !== o)),
						children: [
							"Remove ",
							i,
							" ",
							o + 1
						]
					})
				]
			}, op(t.id) || o)),
			/* @__PURE__ */ (0, G.jsxs)(K, {
				variant: "secondary",
				onPress: () => n([...r, e.newItem?.() ?? {}]),
				children: ["Add ", i]
			})
		]
	});
}
function up(e) {
	switch (e.field.kind) {
		case "select": return /* @__PURE__ */ (0, G.jsx)(cp, { ...e });
		case "boolean": return /* @__PURE__ */ (0, G.jsx)(fi, {
			isSelected: e.value === !0,
			onChange: (t) => e.onChange(t),
			children: e.field.label
		});
		case "richtext": return /* @__PURE__ */ (0, G.jsx)(tp, {
			label: e.field.label,
			value: Array.isArray(e.value) ? e.value : [],
			onChange: e.onChange,
			uploadMedia: e.uploadMedia
		});
		case "list": return /* @__PURE__ */ (0, G.jsx)(lp, { ...e });
		default: return /* @__PURE__ */ (0, G.jsx)(sp, { ...e });
	}
}
function dp({ tree: e, selectedId: t, dispatch: n, uploadMedia: r }) {
	let i = t ? $(e, t) : null, a = i ? gf(i.node.type) : void 0;
	return /* @__PURE__ */ (0, G.jsxs)("section", {
		className: "pb-props",
		"aria-labelledby": "pb-props-title",
		children: [/* @__PURE__ */ (0, G.jsx)("h2", {
			id: "pb-props-title",
			children: "Properties"
		}), !i || !a ? /* @__PURE__ */ (0, G.jsx)("p", {
			className: "pb-help",
			children: "Select a block to edit its properties."
		}) : /* @__PURE__ */ (0, G.jsx)("form", {
			onSubmit: (e) => e.preventDefault(),
			"aria-label": `${yf(i.node)} properties`,
			children: a.fields.map((e) => {
				let t = e.scope ?? "data";
				return /* @__PURE__ */ (0, G.jsx)(up, {
					field: e,
					value: i.node.props[t]?.[e.key],
					uploadMedia: r,
					onChange: (r) => n({
						type: "update",
						id: i.node.id,
						field: e.key,
						value: r,
						scope: t
					})
				}, `${t}.${e.key}`);
			})
		}, i.node.id)]
	});
}
// ../../packages/ui/src/builder/reducer.ts
var fp = (e = []) => ({
	tree: e,
	selectedId: null,
	past: [],
	future: [],
	announcement: "",
	focusId: null,
	lastEditKey: null
}), pp = (e, t, n) => ({
	...e,
	tree: t,
	past: [...e.past, e.tree].slice(-100),
	future: [],
	lastEditKey: null,
	focusId: null,
	...n
}), mp = (e, t) => ({
	...e,
	announcement: t,
	focusId: null
}), hp = (e, t) => {
	let n = $(e, t);
	return n ? yf(n.node) : "Block";
}, gp = (e, t) => {
	let n = $(e, t);
	if (!n) return "";
	let r = Qd(e, n.parentId);
	return `position ${n.index + 1} of ${r.length}`;
}, _p = (e, t, n, r) => {
	let i = $(e, t);
	if (!i) return null;
	if (n !== null) {
		let t = $(e, n);
		if (!t || !_f(t.node.type) || Zd(i.node, n)) return null;
	}
	return nf(ef(e, t), n, r, i.node);
};
function vp(e, t) {
	switch (t.type) {
		case "add": {
			if (!gf(t.blockType)) return e;
			let n = vf(t.blockType, t.id);
			if (t.parentId !== null) {
				let n = $(e.tree, t.parentId);
				if (!n || !_f(n.node.type)) return e;
			}
			let r = nf(e.tree, t.parentId, t.index, n);
			return pp(e, r, {
				selectedId: n.id,
				focusId: n.id,
				announcement: `${yf(n)} added, ${gp(r, n.id)}.`
			});
		}
		case "move": {
			let n = _p(e.tree, t.id, t.parentId, t.index);
			return n ? pp(e, n, {
				selectedId: t.id,
				focusId: t.id,
				announcement: `${hp(n, t.id)} moved, ${gp(n, t.id)}.`
			}) : mp(e, "That block cannot be moved there.");
		}
		case "moveBy": {
			let n = $(e.tree, t.id);
			if (!n) return e;
			let r = Qd(e.tree, n.parentId), i = n.index + t.delta;
			if (i < 0 || i >= r.length) return {
				...mp(e, `${yf(n.node)} is already ${t.delta < 0 ? "first" : "last"}.`),
				focusId: t.id
			};
			let a = _p(e.tree, t.id, n.parentId, i);
			return pp(e, a, {
				focusId: t.id,
				announcement: `${yf(n.node)} moved ${t.delta < 0 ? "up" : "down"}, ${gp(a, t.id)}.`
			});
		}
		case "remove": {
			let n = $(e.tree, t.id);
			if (!n) return e;
			let r = Qd(e.tree, n.parentId), i = (r[n.index + 1] ?? r[n.index - 1])?.id ?? n.parentId;
			return pp(e, ef(e.tree, t.id), {
				selectedId: i,
				focusId: i,
				announcement: `${yf(n.node)} deleted.`
			});
		}
		case "duplicate": {
			let n = $(e.tree, t.id);
			if (!n) return e;
			let r = rf(n.node, t.newId ?? (() => crypto.randomUUID())), i = nf(e.tree, n.parentId, n.index + 1, r);
			return pp(e, i, {
				selectedId: r.id,
				focusId: r.id,
				announcement: `${yf(n.node)} duplicated, ${gp(i, r.id)}.`
			});
		}
		case "update": {
			if (!$(e.tree, t.id)) return e;
			let n = tf(e.tree, t.id, (e) => ({
				...e,
				props: {
					...e.props,
					data: {
						...e.props.data,
						[t.field]: t.value
					}
				}
			})), r = `${t.id}:${t.field}`;
			return e.lastEditKey === r ? {
				...e,
				tree: n,
				future: [],
				focusId: null
			} : pp(e, n, { lastEditKey: r });
		}
		case "load": return pp(e, t.tree, {
			selectedId: null,
			announcement: t.message ?? "Page loaded."
		});
		case "select": return {
			...e,
			selectedId: t.id
		};
		case "undo": {
			let t = e.past[e.past.length - 1];
			return t ? {
				...e,
				tree: t,
				past: e.past.slice(0, -1),
				future: [e.tree, ...e.future],
				selectedId: yp(t, e.selectedId),
				lastEditKey: null,
				focusId: null,
				announcement: "Undone."
			} : mp(e, "Nothing to undo.");
		}
		case "redo": {
			let [t, ...n] = e.future;
			return t ? {
				...e,
				tree: t,
				past: [...e.past, e.tree],
				future: n,
				selectedId: yp(t, e.selectedId),
				lastEditKey: null,
				focusId: null,
				announcement: "Redone."
			} : mp(e, "Nothing to redo.");
		}
		case "clearFocus": return e.focusId === null ? e : {
			...e,
			focusId: null
		};
		default: return e;
	}
}
var yp = (e, t) => t && $(e, t) ? t : null, bp = (e) => e instanceof Error ? e.message : "Unexpected error.";
function xp({ initialTree: e = [], theme: t, storageKey: n = kf, persistence: r, autoSave: i = !1, onDirtyChange: a, initialDirty: o = !1, title: s = "Page builder", assetBasePath: c, uploadMedia: l }) {
	let u = (0, W.useMemo)(() => r ?? {
		save: async (e) => Hf(e, n),
		load: async () => Uf(n)
	}, [r, n]), d = u.location ?? "in this browser", [f, p] = (0, W.useReducer)(vp, e, fp), [m, h] = (0, W.useState)(!1), { tree: g, selectedId: _ } = f, v = (0, W.useRef)(o ? null : e), y = (0, W.useRef)(g);
	y.current = g;
	let b = (0, W.useRef)(o), x = (0, W.useRef)(a);
	x.current = a;
	let S = (e) => v.current === null || JSON.stringify(e) !== JSON.stringify(v.current), C = (0, W.useCallback)((e) => {
		b.current !== e && (b.current = e, x.current?.(e));
	}, []), [w, T] = (0, W.useState)(null), E = (0, W.useRef)(null);
	(0, W.useEffect)(() => {
		x.current?.(b.current);
	}, [a]), (0, W.useEffect)(() => {
		C(S(g));
	}, [g, C]);
	let D = (e) => {
		v.current = e, C(S(y.current));
	};
	(0, W.useEffect)(() => {
		if (!i) return;
		let e = setTimeout(() => {
			u.save(g).then((e) => {
				e.ok ? D(g) : T({
					kind: "error",
					lines: ["Cannot save yet:", ...e.errors]
				});
			}).catch((e) => T({
				kind: "error",
				lines: ["Cannot save yet:", bp(e)]
			}));
		}, 400);
		return () => clearTimeout(e);
	}, [
		i,
		g,
		u
	]);
	let O = async () => {
		let e;
		try {
			e = await u.save(g);
		} catch (t) {
			e = {
				ok: !1,
				errors: [bp(t)]
			};
		}
		T(e.ok ? {
			kind: "info",
			lines: [`Page saved ${d}.`]
		} : {
			kind: "error",
			lines: ["Cannot save yet:", ...e.errors]
		}), e.ok && D(g);
	}, k = async () => {
		let e;
		try {
			e = await u.load();
		} catch (e) {
			return T({
				kind: "error",
				lines: ["Cannot load the page:", bp(e)]
			});
		}
		if (!e) return T({
			kind: "error",
			lines: ["No saved page found."]
		});
		if (!e.ok) return T({
			kind: "error",
			lines: ["The saved page is invalid:", ...e.errors]
		});
		v.current = e.tree, C(!1), p({
			type: "load",
			tree: e.tree,
			message: "Saved page loaded."
		}), T({
			kind: "info",
			lines: ["Saved page loaded. Undo restores the previous page."]
		});
	}, A = () => {
		let e = zf(g);
		if (!e.ok) return T({
			kind: "error",
			lines: ["Cannot export yet:", ...e.errors]
		});
		let t = URL.createObjectURL(new Blob([e.json], { type: "application/json" })), n = document.createElement("a");
		n.href = t, n.download = "page.json", n.click(), URL.revokeObjectURL(t), T({
			kind: "info",
			lines: ["Exported page.json."]
		});
	}, j = async (e) => {
		if (!e) return;
		let t = Bf(await e.text());
		if (!t.ok) return T({
			kind: "error",
			lines: [`Cannot import ${e.name}:`, ...t.errors]
		});
		p({
			type: "load",
			tree: t.tree,
			message: `Imported ${e.name}.`
		}), T({
			kind: "info",
			lines: [`Imported ${e.name}. Undo restores the previous page.`]
		});
	}, M = _ ? $(g, _) : null, N = M ? Qd(g, M.parentId) : [], P = (0, W.useCallback)((e) => {
		M && _f(M.node.type) ? p({
			type: "add",
			blockType: e,
			parentId: M.node.id,
			index: M.node.children.length
		}) : p(M ? {
			type: "add",
			blockType: e,
			parentId: M.parentId,
			index: M.index + 1
		} : {
			type: "add",
			blockType: e,
			parentId: null,
			index: g.length
		});
	}, [M, g.length]), F = (0, W.useMemo)(() => cf(g), [g]), ee = _ ?? "";
	return /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "pb-shell",
		children: [
			/* @__PURE__ */ (0, G.jsx)("header", {
				className: "pb-header",
				children: /* @__PURE__ */ (0, G.jsx)("h1", {
					className: "pb-title",
					children: s
				})
			}),
			/* @__PURE__ */ (0, G.jsx)("div", {
				className: "pb-live pb-visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: f.announcement
			}),
			/* @__PURE__ */ (0, G.jsx)("aside", {
				className: "pb-sidebar",
				"aria-label": "Block library",
				children: /* @__PURE__ */ (0, G.jsx)(Df, { onInsert: P })
			}),
			/* @__PURE__ */ (0, G.jsxs)("main", {
				className: "pb-main",
				"aria-labelledby": "pb-canvas-title",
				children: [
					/* @__PURE__ */ (0, G.jsx)("h2", {
						id: "pb-canvas-title",
						children: "Canvas"
					}),
					/* @__PURE__ */ (0, G.jsxs)(Sd, {
						"aria-label": "Block actions",
						className: "pb-toolbar",
						children: [
							/* @__PURE__ */ (0, G.jsxs)(K, {
								variant: "secondary",
								isDisabled: f.past.length === 0,
								onPress: () => p({ type: "undo" }),
								children: [/* @__PURE__ */ (0, G.jsx)(Ct, {
									size: 16,
									"aria-hidden": "true"
								}), " Undo"]
							}),
							/* @__PURE__ */ (0, G.jsxs)(K, {
								variant: "secondary",
								isDisabled: f.future.length === 0,
								onPress: () => p({ type: "redo" }),
								children: [/* @__PURE__ */ (0, G.jsx)(_t, {
									size: 16,
									"aria-hidden": "true"
								}), " Redo"]
							}),
							/* @__PURE__ */ (0, G.jsx)(K, {
								variant: "secondary",
								isDisabled: !M || M.index === 0,
								onPress: () => p({
									type: "moveBy",
									id: ee,
									delta: -1
								}),
								children: "Move up"
							}),
							/* @__PURE__ */ (0, G.jsx)(K, {
								variant: "secondary",
								isDisabled: !M || M.index >= N.length - 1,
								onPress: () => p({
									type: "moveBy",
									id: ee,
									delta: 1
								}),
								children: "Move down"
							}),
							/* @__PURE__ */ (0, G.jsx)(K, {
								variant: "secondary",
								isDisabled: !M,
								onPress: () => p({
									type: "duplicate",
									id: ee
								}),
								children: "Duplicate"
							}),
							/* @__PURE__ */ (0, G.jsx)(K, {
								variant: "secondary",
								isDisabled: !M,
								onPress: () => p({
									type: "remove",
									id: ee
								}),
								children: "Delete"
							}),
							/* @__PURE__ */ (0, G.jsx)(K, {
								variant: "quiet",
								onPress: () => h((e) => !e),
								children: m ? "Hide preview" : "Show preview"
							})
						]
					}),
					/* @__PURE__ */ (0, G.jsxs)(Sd, {
						"aria-label": "Page file",
						className: "pb-toolbar",
						children: [
							/* @__PURE__ */ (0, G.jsxs)(K, {
								variant: "secondary",
								onPress: () => void O(),
								children: [/* @__PURE__ */ (0, G.jsx)(yt, {
									size: 16,
									"aria-hidden": "true"
								}), " Save"]
							}),
							/* @__PURE__ */ (0, G.jsxs)(K, {
								variant: "secondary",
								onPress: () => void k(),
								children: [/* @__PURE__ */ (0, G.jsx)(pt, {
									size: 16,
									"aria-hidden": "true"
								}), " Load"]
							}),
							/* @__PURE__ */ (0, G.jsxs)(K, {
								variant: "secondary",
								onPress: A,
								children: [/* @__PURE__ */ (0, G.jsx)(dt, {
									size: 16,
									"aria-hidden": "true"
								}), " Export JSON"]
							}),
							/* @__PURE__ */ (0, G.jsxs)(K, {
								variant: "secondary",
								onPress: () => E.current?.click(),
								children: [/* @__PURE__ */ (0, G.jsx)(Tt, {
									size: 16,
									"aria-hidden": "true"
								}), " Import JSON"]
							}),
							/* @__PURE__ */ (0, G.jsx)("input", {
								ref: E,
								type: "file",
								accept: "application/json,.json",
								hidden: !0,
								"data-testid": "import-file",
								"aria-label": "Import page JSON file",
								onChange: (e) => {
									j(e.target.files?.[0]), e.target.value = "";
								}
							})
						]
					}),
					w && /* @__PURE__ */ (0, G.jsx)("div", {
						className: `pb-notice pb-notice-${w.kind}`,
						role: w.kind === "error" ? "alert" : "status",
						children: w.lines.map((e, t) => /* @__PURE__ */ (0, G.jsx)("p", { children: e }, t))
					}),
					/* @__PURE__ */ (0, G.jsx)("p", {
						id: "pb-canvas-help",
						className: "pb-help",
						children: "Arrow keys move between blocks, Home and End jump to the first and last. Alt+Up/Down moves the selected block, Ctrl+D duplicates, Delete removes, Ctrl+Z undoes. To drag with the keyboard, focus a block's drag handle and press Enter."
					}),
					/* @__PURE__ */ (0, G.jsx)(Ef, {
						tree: g,
						selectedId: _,
						focusId: f.focusId,
						theme: t,
						dispatch: p
					}),
					m && /* @__PURE__ */ (0, G.jsx)("section", {
						className: "pb-preview",
						"aria-label": "Page preview",
						children: /* @__PURE__ */ (0, G.jsx)(se, {
							blocks: F,
							theme: t,
							isEditing: !0,
							asLandmark: !1,
							assetBasePath: c
						})
					})
				]
			}),
			/* @__PURE__ */ (0, G.jsx)("aside", {
				className: "pb-sidebar",
				"aria-label": "Block inspector",
				children: /* @__PURE__ */ (0, G.jsx)(dp, {
					tree: g,
					selectedId: _,
					dispatch: p,
					uploadMedia: l
				})
			})
		]
	});
}
// src/editor/store/types.ts
var Sp = class extends Error {
	errors;
	code;
	constructor(e, t = "storage-error") {
		super(e.join(" ")), this.name = "PageStoreError", this.errors = e, this.code = t;
	}
}, Cp = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, wp = (e) => Cp.test(e), Tp = "default", Ep = (e) => {
	if (!wp(e)) throw new Sp([`"${e}" is not a valid page id. Use letters, numbers, hyphens and underscores (up to 64 characters).`]);
}, Dp = (e) => {
	if (typeof e == "string") return e;
	if (e.kind !== "page" || typeof e.id != "string") throw new Sp(["LocalStore supports string page IDs only."], "unsupported-identity");
	return e.id;
}, Op = class {
	storage;
	prefix;
	constructor({ storage: e, keyPrefix: t = kf } = {}) {
		this.storage = e ?? localStorage, this.prefix = t;
	}
	keyFor(e) {
		let t = Dp(e);
		return Ep(t), t === "default" ? this.prefix : `${this.prefix}:${t}`;
	}
	async load(e) {
		let t = this.keyFor(e), n;
		try {
			n = this.storage.getItem(t);
		} catch {
			throw new Sp(["The browser blocked access to saved pages."]);
		}
		if (n === null) return null;
		let r = Bf(n);
		if (!r.ok) throw new Sp(r.errors);
		return {
			document: Lf(r.tree, kp(n)),
			revision: null,
			publishedRevision: null
		};
	}
	async save(e, t, n) {
		let r = this.keyFor(e), i = Rf(t);
		if (!i.ok) throw new Sp(i.errors);
		try {
			this.storage.setItem(r, i.json);
		} catch {
			throw new Sp(["The browser refused to store the page (storage full or blocked)."]);
		}
		return {
			revision: null,
			publishedRevision: null
		};
	}
	async list() {
		let e = [];
		for (let t = 0; t < this.storage.length; t++) {
			let n = this.storage.key(t);
			if (n === null) continue;
			let r = null;
			if (n === this.prefix ? r = Tp : n.startsWith(`${this.prefix}:`) && (r = n.slice(this.prefix.length + 1)), r === null || !wp(r)) continue;
			let i = this.storage.getItem(n), a = i === null ? void 0 : kp(i)?.toISOString();
			e.push(a ? {
				id: r,
				kind: "page",
				savedAt: a
			} : {
				id: r,
				kind: "page"
			});
		}
		return e.sort((e, t) => String(e.id).localeCompare(String(t.id)));
	}
	async remove(e) {
		this.storage.removeItem(this.keyFor(e));
	}
}, kp = (e) => {
	try {
		let t = JSON.parse(e).savedAt, n = typeof t == "string" ? new Date(t) : void 0;
		return n && !Number.isNaN(n.getTime()) ? n : void 0;
	} catch {
		return;
	}
}, Ap = (e) => {
	let t = (e ?? "/").trim();
	return t.startsWith("/") || (t = `/${t}`), t.endsWith("/") ? t : `${t}/`;
}, jp = (e = {
	BASE_URL: "./",
	DEV: !1,
	MODE: "embed",
	PROD: !0,
	SSR: !1
}) => {
	let t = String(e.VITE_PAGE_STORE ?? "local").trim().toLowerCase();
	if (t !== "local" && t !== "cloudflare") throw Error(`VITE_PAGE_STORE must be "local" or "cloudflare" (got "${t}").`);
	return {
		basePath: Ap(typeof e.BASE_URL == "string" ? e.BASE_URL : "/"),
		storeKind: t,
		apiBase: String(e.VITE_API_BASE ?? "").trim().replace(/\/+$/, "")
	};
}, Mp = (e) => {
	switch (e.storeKind) {
		case "local": return new Op();
		case "cloudflare": throw Error("VITE_PAGE_STORE=cloudflare is not available yet (planned for phase 3). Use \"local\".");
	}
}, Np = {
	schemaVersion: 1,
	theme: {
		themePrimary: "#005a9e",
		themeLighterAlt: "#f2f8fc",
		themeLighter: "#deecf9",
		themeLight: "#c7e0f4",
		themeTertiary: "#71afe5",
		themeSecondary: "#2b88d8",
		themeDarkAlt: "#106ebe",
		themeDark: "#005a9e",
		themeDarker: "#004578",
		neutralLighterAlt: "#faf9f8",
		neutralLighter: "#f3f2f1",
		neutralLight: "#edebe9",
		neutralQuaternaryAlt: "#e1dfdd",
		neutralQuaternary: "#d2d0ce",
		neutralTertiaryAlt: "#c8c6c4",
		neutralTertiary: "#a19f9d",
		neutralSecondaryAlt: "#8a8886",
		neutralSecondary: "#605e5c",
		neutralPrimaryAlt: "#3b3a39",
		neutralPrimary: "#323130",
		neutralDark: "#201f1e",
		black: "#000000",
		white: "#ffffff"
	},
	blocks: [
		{
			id: "hero-home",
			type: "hero-banner",
			styles: {
				height: "58vh",
				textAlign: "left"
			},
			data: {
				eyebrow: "Component-driven publishing",
				title: "Build pages from reusable React blocks",
				description: "One registry powers rendering, editor discovery, defaults and validation.",
				buttonText: "Explore the scaffold",
				buttonUrl: "#section-features",
				bgImage: ""
			}
		},
		{
			id: "section-features",
			type: "grid-section",
			styles: {
				padding: "4rem 1.5rem",
				gap: "1.5rem"
			},
			data: {
				heading: "Featured components",
				columns: 3,
				items: [
					{
						id: "registry-card",
						title: "Registry map",
						description: "Resolve blocks and expose editor metadata from the same catalogue."
					},
					{
						id: "theme-card",
						title: "Dynamic theming",
						description: "Map theme JSON to scoped CSS custom properties without prop drilling."
					},
					{
						id: "validation-card",
						title: "Runtime validation",
						description: "Validate persisted page JSON before it reaches the renderer."
					}
				]
			}
		},
		{
			id: "gallery-featured",
			type: "media-gallery",
			styles: { gap: "1rem" },
			data: {
				heading: "Media gallery starter",
				layoutType: "grid",
				items: []
			}
		}
	]
}, Pp = (e, t) => {
	let n = e.endsWith("/") ? e : `${e}/`;
	return t ? `${n}editor/${encodeURIComponent(t)}` : `${n}editor`;
}, Fp = (e, t) => {
	let n = e.replace(/\/+$/, "");
	return t ? `${n}/${t.kind === "page" ? "pages" : "posts"}/${encodeURIComponent(String(t.id))}` : n || "/";
}, Ip = Te.parse(Np), Lp = Ip.theme, Rp = (e) => e.kind === "page" && e.id === "default" ? sf(Ip.blocks) : e.kind === "post" ? [vf("post-body")] : [vf("hero-banner")], zp = (e) => e instanceof Sp ? e.errors : [e instanceof Error ? e.message : "Unexpected error."];
function Bp({ pageId: e, identity: t, store: n, basePath: r, routeBasePath: i, navigate: a, onDirtyChange: o, assetBasePath: s, uploadMedia: c, theme: l = Lp }) {
	let u = (0, W.useMemo)(() => t ?? {
		kind: "page",
		id: e ?? "default"
	}, [
		t?.kind,
		t?.id,
		e
	]), d = String(u.id), f = i ? Fp(i) : Pp(r), p = (e) => {
		!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.preventDefault(), a(f));
	}, [m, h] = (0, W.useState)({ status: "loading" }), g = (0, W.useRef)(null);
	(0, W.useEffect)(() => {
		let e = !1;
		return h({ status: "loading" }), n.load(u).then((t) => {
			e || (g.current = t?.revision ?? null, h({
				status: "ready",
				tree: t ? t.document.tree : Rp(u),
				isNew: t === null,
				revision: t?.revision ?? null
			}));
		}).catch((t) => {
			e || h({
				status: "error",
				errors: zp(t)
			});
		}), () => {
			e = !0;
		};
	}, [n, u]);
	let _ = (0, W.useMemo)(() => ({
		save: async (e) => {
			try {
				let t = await n.save(u, Lf(e), { expectedRevision: g.current });
				return g.current = t.revision, h((e) => e.status === "ready" ? {
					...e,
					revision: t.revision
				} : e), { ok: !0 };
			} catch (e) {
				return {
					ok: !1,
					errors: zp(e)
				};
			}
		},
		load: async () => {
			try {
				let e = await n.load(u);
				return e ? (g.current = e.revision, {
					ok: !0,
					tree: e.document.tree
				}) : null;
			} catch (e) {
				return {
					ok: !1,
					errors: zp(e)
				};
			}
		}
	}), [n, u]);
	return m.status === "loading" ? /* @__PURE__ */ (0, G.jsxs)("main", {
		className: "editor-status",
		role: "status",
		children: [
			"Loading ",
			u.kind,
			" “",
			d,
			"”…"
		]
	}) : m.status === "error" ? /* @__PURE__ */ (0, G.jsxs)("main", {
		className: "editor-status",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, G.jsxs)("h1", { children: [
				"Cannot open ",
				u.kind,
				" “",
				d,
				"”"
			] }),
			m.errors.map((e, t) => /* @__PURE__ */ (0, G.jsx)("p", { children: e }, t)),
			/* @__PURE__ */ (0, G.jsx)("p", { children: /* @__PURE__ */ (0, G.jsx)("a", {
				href: f,
				onClick: p,
				children: "Back to all pages"
			}) })
		]
	}) : /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [/* @__PURE__ */ (0, G.jsxs)("nav", {
		className: "editor-nav",
		"aria-label": "Editor",
		children: [
			/* @__PURE__ */ (0, G.jsx)("a", {
				href: f,
				onClick: p,
				children: "All pages"
			}),
			/* @__PURE__ */ (0, G.jsxs)("span", { children: [
				u.kind,
				": ",
				/* @__PURE__ */ (0, G.jsx)("strong", { children: d }),
				m.isNew ? " (not saved yet)" : ""
			] }),
			m.revision && /* @__PURE__ */ (0, G.jsxs)("span", { children: ["Revision: ", m.revision] })
		]
	}), /* @__PURE__ */ (0, G.jsx)(xp, {
		title: `${u.kind} builder: ${d}`,
		initialTree: m.tree,
		theme: l,
		persistence: _,
		autoSave: !0,
		initialDirty: m.isNew,
		onDirtyChange: o,
		assetBasePath: s,
		uploadMedia: c
	}, `${u.kind}:${d}`)] });
}
// src/editor/EditorIndex.tsx
function Vp({ store: e, basePath: t, routeBasePath: n, navigate: r }) {
	let [i, a] = (0, W.useState)(null), [o, s] = (0, W.useState)(null), [c, l] = (0, W.useState)(""), [u, d] = (0, W.useState)(!1), f = (0, W.useCallback)(() => {
		e.list().then(a).catch((e) => s(e instanceof Error ? e.message : "Cannot list pages."));
	}, [e]);
	(0, W.useEffect)(f, [f]);
	let p = wp(c) ? null : "Use letters, numbers, hyphens and underscores (up to 64 characters).", m = (e) => {
		if (e.preventDefault(), p) return d(!0);
		let i = n ? Fp(n, {
			kind: "page",
			id: c
		}) : Pp(t, c);
		r ? r(i) : window.location.assign(i);
	}, h = (e) => n ? Fp(n, {
		kind: "page",
		id: e
	}) : Pp(t, e), g = (e, t) => {
		!r || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.preventDefault(), r(t));
	}, _ = async (t) => {
		try {
			await e.remove(t), f();
		} catch (e) {
			s(e instanceof Sp ? e.message : "Cannot delete the page.");
		}
	};
	return /* @__PURE__ */ (0, G.jsxs)("main", {
		className: "editor-index",
		children: [
			/* @__PURE__ */ (0, G.jsx)("h1", { children: "Pages" }),
			o && /* @__PURE__ */ (0, G.jsx)("p", {
				role: "alert",
				children: o
			}),
			/* @__PURE__ */ (0, G.jsxs)("section", {
				"aria-labelledby": "editor-pages-heading",
				children: [/* @__PURE__ */ (0, G.jsx)("h2", {
					id: "editor-pages-heading",
					children: "Saved pages"
				}), i === null ? /* @__PURE__ */ (0, G.jsx)("p", {
					role: "status",
					children: "Loading pages…"
				}) : i.length === 0 ? /* @__PURE__ */ (0, G.jsx)("p", { children: "No saved pages yet. Create one below." }) : /* @__PURE__ */ (0, G.jsx)("ul", {
					className: "editor-page-list",
					children: i.filter((e) => e.kind !== "post").map((e) => /* @__PURE__ */ (0, G.jsxs)("li", { children: [
						/* @__PURE__ */ (0, G.jsx)("a", {
							href: h(String(e.id)),
							onClick: (t) => g(t, h(String(e.id))),
							children: e.id
						}),
						e.savedAt && /* @__PURE__ */ (0, G.jsxs)("span", {
							className: "editor-muted",
							children: [
								" ",
								"saved ",
								/* @__PURE__ */ (0, G.jsx)("time", {
									dateTime: e.savedAt,
									children: new Date(e.savedAt).toLocaleString("en-GB")
								})
							]
						}),
						" ",
						/* @__PURE__ */ (0, G.jsxs)(K, {
							variant: "quiet",
							onPress: () => void _({
								kind: e.kind ?? "page",
								id: e.id
							}),
							children: ["Delete ", e.id]
						})
					] }, e.id))
				})]
			}),
			/* @__PURE__ */ (0, G.jsxs)("section", {
				"aria-labelledby": "editor-new-heading",
				children: [/* @__PURE__ */ (0, G.jsx)("h2", {
					id: "editor-new-heading",
					children: "New page"
				}), /* @__PURE__ */ (0, G.jsxs)("form", {
					onSubmit: m,
					noValidate: !0,
					children: [/* @__PURE__ */ (0, G.jsx)(md, {
						label: "Page id",
						description: "Used in the address, for example /editor/about.",
						value: c,
						onChange: l,
						isInvalid: u && p !== null,
						errorMessage: p ?? void 0,
						validationBehavior: "aria"
					}), /* @__PURE__ */ (0, G.jsx)(K, {
						type: "submit",
						children: "Create page"
					})]
				})]
			})
		]
	});
}
// src/editor/mount.tsx
function Hp({ container: e, pageId: t, identity: n, storage: r, basePath: i, routeBasePath: a, assetBasePath: o, navigate: s, onDirtyChange: c, uploadMedia: l, theme: u }) {
	let d = (0, Ot.createRoot)(e);
	try {
		let e = jp(), f = r ?? Mp(e), p = i ?? e.basePath;
		d.render(/* @__PURE__ */ (0, G.jsx)(W.StrictMode, { children: /* @__PURE__ */ (0, G.jsx)("div", {
			className: "pb-embed-root",
			"data-asset-base-path": o,
			children: t === void 0 && n === void 0 ? /* @__PURE__ */ (0, G.jsx)(Vp, {
				store: f,
				basePath: a ?? p,
				routeBasePath: a,
				navigate: s
			}) : /* @__PURE__ */ (0, G.jsx)(Bp, {
				pageId: t,
				identity: n,
				store: f,
				basePath: a ?? p,
				routeBasePath: a,
				navigate: s,
				onDirtyChange: c,
				assetBasePath: o,
				uploadMedia: l,
				theme: u
			})
		}) }));
	} catch (e) {
		d.render(/* @__PURE__ */ (0, G.jsxs)("main", {
			className: "editor-status",
			role: "alert",
			children: [/* @__PURE__ */ (0, G.jsx)("h1", { children: "The editor cannot start" }), /* @__PURE__ */ (0, G.jsx)("p", { children: e instanceof Error ? e.message : "Unexpected error." })]
		}));
	}
	return { unmount: () => d.unmount() };
}
export { Ee as PAGE_SCHEMA_VERSION, ge as PageDocumentRenderer, Hp as mountEditor, we as validatePageDocument };
