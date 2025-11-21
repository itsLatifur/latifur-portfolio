import React from "react";
import styled, { keyframes, css } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px) scale(.995); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const Phrase = styled.span`
  display: inline-block;
  will-change: opacity, transform;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.previewPillText || theme.textMain};
  font-weight: 700;
  /* no underline or glow — keep emphasis only via color/weight */
  text-decoration: none;
  text-shadow: none;
  font-size: 1.06em;
  transition: font-size 180ms ease;
  display: inline-block;
  will-change: opacity, transform;
  ${(p) =>
    p.$animate
      ? css`
          animation: ${fadeUp} 360ms ease both;
        `
      : css`
          animation: none;
        `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
  }
`;

const OneLinerWrap = styled.div`
  color: ${({ theme }) => theme.textMain};

  .prefix {
    color: ${({ theme }) => theme.textMain};
    font-weight: 400;
    opacity: 0.82;
  }

  .mobile-highlight {
    color: ${({ theme }) => theme.previewPillText || theme.textMain};
    font-weight: 700;
    font-size: 1.04em;
    display: inline-block;
    margin: 0 2px;
  }

  .muted {
    color: ${({ theme }) => theme.textMain};
    opacity: 0.82;
    font-weight: 400;
  }

  .active-phrase {
    color: ${({ theme }) => theme.textMain};
    font-weight: 400;
  }

  @media (prefers-reduced-motion: reduce) {
    .active-phrase {
      animation: none;
      transform: none;
    }
  }
`;

export default function OneLiner({
  phrases = [],
  interval = 3500,
  className,
  prefix = "Currently building",
  fallback = null,
  projectName = null,
}) {
  const [index, setIndex] = React.useState(0);
  const [isSmall, setIsSmall] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 516 : false,
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsSmall(window.innerWidth < 516);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  React.useEffect(() => {
    if (!phrases || phrases.length <= 1) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % phrases.length),
      interval,
    );
    return () => clearInterval(t);
  }, [phrases, interval]);

  // On small devices we always render the fallback static one-liner (no
  // animations, no rotating variants). The fallback should be the full
  // sentence from `personalData.oneLiner` passed from the caller. If a
  // `projectName` is provided (via props) and appears in the sentence we
  // render that occurrence wrapped in a static highlight span so it stands
  // out on mobile.
  if (isSmall) {
    const txt =
      fallback ||
      (phrases && phrases.length
        ? typeof phrases[0] === "string"
          ? phrases[0]
          : null
        : null) ||
      "";
    const name = projectName || "";
    if (name) {
      const lower = txt.toLowerCase();
      const needle = name.toLowerCase();
      const idx = lower.indexOf(needle);
      if (idx !== -1) {
        const before = txt.slice(0, idx);
        const matched = txt.slice(idx, idx + name.length);
        const after = txt.slice(idx + name.length);
        return (
          <OneLinerWrap
            className={className}
            aria-live="polite"
            aria-atomic="true"
          >
            {before}
            <span className="mobile-highlight">{matched}</span>
            {after}
          </OneLinerWrap>
        );
      }
      // if the project name isn't present, append it highlighted
      return (
        <OneLinerWrap
          className={className}
          aria-live="polite"
          aria-atomic="true"
        >
          {txt}
          {txt && txt.trim() ? " " : ""}
          <span className="mobile-highlight">{name}</span>
        </OneLinerWrap>
      );
    }
    return <OneLinerWrap className={className}>{txt}</OneLinerWrap>;
  }

  if (!phrases || phrases.length === 0) return null;
  if (phrases.length === 1) {
    const p = phrases[0];
    if (typeof p === "string")
      return <OneLinerWrap className={className}>{p}</OneLinerWrap>;
  }

  const current = phrases[index];

  // Determine previous phrase (wrap-around). We use this to compare parts
  // so that unchanged parts (even if highlighted) do not animate.
  const len = phrases.length;
  const prev = len > 0 ? phrases[(index - 1 + len) % len] : null;

  const partText = (p, name) => {
    if (!p) return "";
    if (typeof p === "string") return name === "full" ? p : "";
    return (p[name] || "").trim();
  };

  const changed = (name) => {
    return partText(current, name) !== partText(prev, name);
  };

  return (
    <OneLinerWrap className={className} aria-live="polite" aria-atomic="true">
      <span className="prefix muted">{prefix}</span>{" "}
      <Phrase className="active-phrase" key={index}>
        {typeof current === "string" ? (
          current
        ) : (
          <>
            {current.before ? (
              <span className="muted">{current.before} </span>
            ) : null}
            {current.highlightA ? (
              <Highlight
                $animate={changed("highlightA")}
                key={`ha-${index}-${current.highlightA}`}
              >
                {current.highlightA}
              </Highlight>
            ) : null}
            {current.middle ? (
              <span className="muted"> {current.middle} </span>
            ) : null}
            {current.highlightB ? (
              <Highlight
                $animate={changed("highlightB")}
                key={`hb-${index}-${current.highlightB}`}
              >
                {` ${current.highlightB}`}
              </Highlight>
            ) : null}
          </>
        )}
      </Phrase>
      .
    </OneLinerWrap>
  );
}
