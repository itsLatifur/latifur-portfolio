import React, { useState } from "react";
import styled from "styled-components";
import { Heading3, Paragraph } from "../../theming/styles";
import {
  ExperienceList,
  ExperienceItem,
  ExperienceYears,
  ExperienceDetails,
  MetaRow,
  ChipsRow,
  Chip,
  MetaIcon,
  CompanyLogo,
  LogoWrapper,
  ExperienceContent,
} from "./styles";

// Hover card for organization/map preview (reuse About's style)
const Spinner = styled.div`
  border: 4px solid #eee;
  border-top: 4px solid #888;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: auto;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const HoverPreview = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  width: 480px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.18s;
  /* Only show on desktop */
  @media (max-width: 1024px) {
    display: none !important;
  }
`;

const HoverWrapper = styled.span`
  position: relative;
  display: inline-block;
  &:hover ${HoverPreview}, &:focus-within ${HoverPreview} {
    opacity: 1;
    pointer-events: auto;
  }
`;

// Only render iframe when preview is visible, show spinner while loading
function HoverPreviewContent({ url, title, label, children }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const previewRef = React.useRef();

  // Show/hide preview on hover/focus
  function handleEnter() {
    setShow(true);
    setLoading(true);
    setIframeKey((k) => k + 1); // force reload
  }
  function handleLeave() {
    setShow(false);
  }

  // Accessibility: close preview with Escape
  React.useEffect(() => {
    if (!show) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setShow(false);
        // Move focus back to trigger
        if (previewRef.current && previewRef.current.parentElement) {
          previewRef.current.parentElement
            .querySelector('a,button,[tabindex="0"]')
            ?.focus();
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [show]);

  const [iframeError, setIframeError] = useState(false);
  return (
    <span
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
      onMouseLeave={handleLeave}
      onBlur={handleLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      <HoverPreview
        aria-label={label}
        aria-modal="true"
        role="dialog"
        ref={previewRef}
        tabIndex={-1}
        style={show ? { opacity: 1, pointerEvents: "auto" } : {}}
      >
        {show && (
          <>
            {loading && !iframeError && (
              <Spinner role="status" aria-label="Loading preview" />
            )}
            {!iframeError ? (
              <iframe
                key={iframeKey}
                src={url}
                title={title}
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: loading ? "none" : "block",
                }}
                loading="lazy"
                tabIndex={-1}
                aria-label={title}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setIframeError(true);
                }}
              />
            ) : (
              <div
                style={{ textAlign: "center", color: "#888", padding: "2rem" }}
              >
                <p>
                  Preview unavailable.
                  <br />
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Open map in new tab
                  </a>
                </p>
              </div>
            )}
          </>
        )}
      </HoverPreview>
    </span>
  );
}

export const Experience = ({ experiences }) => {
  return (
    <ExperienceList>
      {experiences.map((exp, index) => (
        <ExperienceItem key={index}>
          <ExperienceYears>
            <Heading3>{exp.years}</Heading3>
          </ExperienceYears>
          <ExperienceContent>
            <ExperienceDetails>
              {(() => {
                const legacyTitle = exp.title || "";
                const hasNewShape = exp.role || exp.company;
                let role = exp.role || "";
                let company = exp.company || "";
                let companyUrl = exp.companyUrl || "";
                if (!hasNewShape && legacyTitle) {
                  const parts = legacyTitle.split(/\s+at\s+/i);
                  if (parts.length === 2) {
                    role = parts[0];
                    company = parts[1];
                  } else {
                    role = legacyTitle;
                  }
                }
                return (
                  <>
                    {role && <Heading3 className="role">{role}</Heading3>}
                    {company &&
                      (companyUrl ? (
                        <a
                          className="company"
                          href={companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${company} website`}
                          tabIndex={0}
                        >
                          {company}
                        </a>
                      ) : (
                        <span className="company">{company}</span>
                      ))}
                    <MetaRow>
                      {exp.location && exp.locationMapUrl ? (
                        <a
                          className="location"
                          href={exp.locationMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${exp.location} on map`}
                          tabIndex={0}
                        >
                          <MetaIcon
                            viewBox="0 0 16 16"
                            focusable="false"
                            aria-hidden="true"
                          >
                            <path d="M8 1a4.5 4.5 0 0 0-4.5 4.5c0 3.2 4.5 9 4.5 9s4.5-5.8 4.5-9A4.5 4.5 0 0 0 8 1zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
                          </MetaIcon>
                          {exp.location}
                        </a>
                      ) : exp.location ? (
                        <span className="location">
                          <MetaIcon
                            viewBox="0 0 16 16"
                            focusable="false"
                            aria-hidden="true"
                          >
                            <path d="M8 1a4.5 4.5 0 0 0-4.5 4.5c0 3.2 4.5 9 4.5 9s4.5-5.8 4.5-9A4.5 4.5 0 0 0 8 1zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
                          </MetaIcon>
                          {exp.location}
                        </span>
                      ) : null}
                      {(exp.workMode || exp.employmentType) && (
                        <ChipsRow>
                          {exp.workMode && (
                            <Chip aria-label={`Work mode: ${exp.workMode}`}>
                              {exp.workMode}
                            </Chip>
                          )}
                          {exp.employmentType && (
                            <Chip
                              aria-label={`Employment type: ${exp.employmentType}`}
                            >
                              {exp.employmentType}
                            </Chip>
                          )}
                        </ChipsRow>
                      )}
                    </MetaRow>
                  </>
                );
              })()}
              {exp.description && <Paragraph>{exp.description}</Paragraph>}
            </ExperienceDetails>

            {/* Company Logo */}
            {(() => {
              const logoSrc =
                exp.logo ||
                (exp.companyUrl
                  ? `https://logo.clearbit.com/${new URL(exp.companyUrl).hostname}`
                  : null);
              const LogoWithLoading = () => {
                const [loaded, setLoaded] = useState(false);
                const [error, setError] = useState(false);

                if (error) return null;

                return (
                  <LogoWrapper>
                    {!loaded && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(90deg, rgba(128,128,128,0.1) 0%, rgba(128,128,128,0.2) 50%, rgba(128,128,128,0.1) 100%)`,
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                          borderRadius: "inherit",
                        }}
                      />
                    )}
                    <CompanyLogo
                      src={logoSrc}
                      alt={`${exp.company || "Company"} logo`}
                      style={{
                        opacity: loaded ? 1 : 0,
                        transition: "opacity 0.3s",
                      }}
                      onLoad={() => setLoaded(true)}
                      onError={(e) => {
                        setError(true);
                        e.target.parentElement.parentElement.style.display =
                          "none";
                      }}
                    />
                  </LogoWrapper>
                );
              };

              const logoElement = logoSrc ? <LogoWithLoading /> : null;

              // Wrap logo in link if companyUrl exists
              return logoElement && exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${exp.company || "company"} website`}
                  style={{ lineHeight: 0 }}
                >
                  {logoElement}
                </a>
              ) : (
                logoElement
              );
            })()}
          </ExperienceContent>
        </ExperienceItem>
      ))}
    </ExperienceList>
  );
};
