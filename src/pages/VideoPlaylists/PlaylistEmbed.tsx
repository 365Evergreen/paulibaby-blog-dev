import { useState } from "react";
import { videoSource, type PlaylistEntry } from "../../content/videoPlaylists";
import styles from "./VideoPlaylists.module.css";

export default function PlaylistEmbed({ entry }: { entry: PlaylistEntry }) {
  const [consent, setConsent] = useState(false);
  const [failed, setFailed] = useState(false);
  const source = videoSource(entry.url);
  if (!source) return <p role="alert">This video link is invalid or unsupported. Select another video.</p>;
  return (
    <div>
      <h2>{entry.title}</h2>
      {!consent ? (
        <div className={styles.placeholder}>
          <p>Playing this video connects to {source.provider}. No video is loaded until you choose to play.</p>
          <button className={styles.button} onClick={() => setConsent(true)}>Play video</button>
        </div>
      ) : failed ? <p role="alert">The video could not be loaded. Select another video or open it on {source.provider}.</p> : (
        <iframe
          className={styles.embed}
          src={source.embed}
          title={entry.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          onError={() => setFailed(true)}
        />
      )}
      <p>If playback is unavailable or embedding is disabled, <a href={source.url} target="_blank" rel="noopener noreferrer">open on {source.provider}</a> or select another video.</p>
    </div>
  );
}
