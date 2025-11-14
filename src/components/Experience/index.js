import React, { useState } from "react";
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
              {/**
               * Support both new and legacy shapes:
               * - New: { role, company, companyUrl }
               * - Legacy: { title: "Role at Company" }
               */}
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
                        >
                          {company}
                        </a>
                      ) : (
                        <span className="company">{company}</span>
                      ))}

                    {/* Location and chips stacked vertically */}
                    <MetaRow>
                      {exp.location &&
                        (exp.locationMapUrl ? (
                          <a
                            className="location"
                            href={exp.locationMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${exp.location} on map`}
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
                        ) : (
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
                        ))}
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
