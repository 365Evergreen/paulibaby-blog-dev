import { useEffect, useMemo, useRef, useState } from "react";
import { validatePageDocument, type RendererHandle } from "./editorArtifact";
import { editorTheme, loadRendererModule } from "./artifactLoader";

export function PublishedDocument({ document }: { document: unknown }) {
  const container = useRef<HTMLDivElement>(null);
  const result = useMemo(() => validatePageDocument(document), [document]);
  const [failure, setFailure] = useState<{ document: unknown; message: string } | null>(null);
  const error = !result.ok ? `Published document failed validation: ${result.errors.join("; ")}` : failure && failure.document === document ? failure.message : "";
  useEffect(() => {
    let active = true;
    let handle: RendererHandle | undefined;
    if (!result.ok) return;
    loadRendererModule().then(module => {
      if (active && container.current) handle = module.mountRenderer({
        container: container.current, document: result.document, theme: editorTheme, assetBasePath: `${location.origin}/`, asLandmark: false,
      });
    }).catch(cause => { if (active) setFailure({ document, message: cause instanceof Error ? cause.message : "Published renderer could not load" }); });
    return () => { active = false; handle?.unmount(); };
  }, [document, result]);
  return <>{error && <p role="alert">{error}</p>}<div ref={container} /></>;
}
