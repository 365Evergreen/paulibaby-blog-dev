import { useEffect, useState } from "react";
import { Outlet, useBlocker } from "react-router-dom";
import { PublisherContext } from "./publisherContext";
import type { PublicationDraft } from "./publisherContext";

export default function PublisherWorkspace() {
  const [draft, setDraft] = useState<PublicationDraft | null>(null);
  const blocker = useBlocker(({ nextLocation }) =>
    Boolean(
      draft?.modified &&
      nextLocation.pathname !== "/publisher" &&
      !nextLocation.pathname.startsWith("/publisher/"),
    ),
  );
  useEffect(() => {
    if (blocker.state !== "blocked") return;
    if (
      window.confirm(
        "Leave Publisher? Your current draft is only in this tab. Cancel to continue editing and download it first.",
      )
    )
      blocker.proceed();
    else blocker.reset();
  }, [blocker]);
  useEffect(() => {
    if (!draft?.modified) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [draft?.modified]);
  return (
    <PublisherContext
      value={{
        draft,
        startTemplate: (template) =>
          setDraft({
            templateId: template.id,
            settings: structuredClone(template.settings),
            content: structuredClone(template.content),
            modified: false,
          }),
        updateContent: (content) =>
          setDraft((current) => {
            if (!current)
              throw new Error("Choose a publication template first.");
            return { ...current, content, modified: true };
          }),
        updateSettings: (settings) =>
          setDraft((current) => {
            if (!current)
              throw new Error("Choose a publication template first.");
            return {
              ...current,
              settings: { ...current.settings, ...settings },
              modified: true,
            };
          }),
      }}
    >
      <Outlet />
    </PublisherContext>
  );
}
