import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import QUERIES, {
  Main,
  Midi,
  Heading,
  Full,
  Paragraph,
  Heading2,
  Heading3,
  LandingMidi,
  ImageProj,
  Caption,
} from "../theming/styles";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as CodeIconSvg } from "../images/code.svg";
import { ReactComponent as ExternalIconSvg } from "../images/external.svg";
import { personalData, experiencesData, collageItems } from "../data";
import { CodeIcon as CodeSvg, ExternalIcon as ExternalSvg } from "../images";
import {
  Nav,
  Foot,
  Project,
  ProjectVideo,
  Collage,
  Experience,
} from "../components";
import { ProjectSlider } from "../components/Project/projectSlider";
import { Spread } from "../components/switch/styles";
import projects from "../data/projects";

const Card = styled(Midi)`
  /* On mobile, cards have no special styling */
  padding: 0;
  padding-bottom: ${(props) => (props.noBottomPadding ? "0" : "24px")};
  &:not(:first-of-type) {
    margin: 48px auto 0;
  }
  &.hero-card {
    margin: 48px auto 0;
  }

  /* On tablet and larger, re-introduce card styles but reduce top/bottom padding */
  @media (min-width: 768px) {
    padding: 8px 24px 8px 24px;
    border-radius: 8px;
    border: 1px solid
      ${(props) =>
        props.mode === "dark"
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.1)"};
    padding-bottom: ${(props) => (props.noBottomPadding ? "0" : "8px")};
    &:not(:first-of-type) {
      margin: 48px auto 0;
    }
    &.hero-card {
      margin: 48px auto 0;
    }
  }

  @media (${QUERIES.large}) {
    padding: 8px 40px 8px 40px;
    padding-bottom: ${(props) => (props.noBottomPadding ? "0" : "8px")};
    &:not(:first-of-type) {
      margin: 48px auto 0;
    }
    &.hero-card {
      margin: 48px auto 0;
    }
  }
`;

// Shared section header wrapper to unify the top spacing inside cards
const SectionHeader = styled(LandingMidi)`
  margin: 0 auto;
  /* On mobile, rely on the 24px card-to-card margin; avoid extra padding above/below header */
  padding-top: 0;
  padding-bottom: 0;
  @media (min-width: 768px) {
    /* Add breathing room inside bordered cards on tablet */
    padding-top: 24px;
    padding-bottom: ${(p) => (p.$noBottomPad ? 0 : "24px")};
  }
  @media (${QUERIES.large}) {
    /* Slightly larger on desktop */
    padding-top: 28px;
    padding-bottom: ${(p) => (p.$noBottomPad ? 0 : "28px")};
  }
  & h2 {
    margin-top: 0; /* avoid UA margin differences */
    margin-bottom: 0; /* normalize heading-to-content spacing (we control it outside) */
  }
`;

// Hero inner wrapper: add consistent bottom spacing inside the hero content
const HeroInner = styled(LandingMidi)`
  padding-top: 0;
  padding-bottom: 24px;
  margin-bottom: 0;
  @media (min-width: 768px) {
    padding-bottom: 32px;
  }
  @media (${QUERIES.large}) {
    padding-bottom: 36px;
  }
`;

// Sticky name bar always visible at the top while scrolling
const StickyNameBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5000;
  background: ${({ theme }) => theme.main};
  border-bottom: 1px solid ${({ theme }) => theme.outline};
  transition:
    opacity 180ms ease,
    transform 220ms ease;
  opacity: ${(p) => (p.$shown ? 1 : 0)};
  transform: translateY(${(p) => (p.$shown ? "0" : "-8px")});
  pointer-events: ${(p) => (p.$shown ? "auto" : "none")};
`;

const StickyNameInner = styled(LandingMidi)`
  margin: 0 auto;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const StickyName = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 500;
  color: ${({ theme }) => theme.textMain};
`;

const HeroGrid = styled.div`
  display: grid;
  align-items: center;
  gap: 24px;
  grid-template-columns: 1fr;

  &.with-image {
    @media (${QUERIES.large}) {
      gap: 40px;
      grid-template-columns: 1fr 1fr;
    }
  }
`;

// Grid for About section – spacing adjustments
const AboutGrid = styled(HeroGrid)`
  margin-top: 24px;
  @media (min-width: 768px) and (max-width: 1199px) {
    gap: 48px;
    margin-top: 48px;
  }
  @media (${QUERIES.large}) {
    margin-top: 0;
  }
`;

// Correct Divider, ButtonGroup, Chip will appear below (Divider previously corrupted HeroGrid)

const HeroName = styled(Heading)`
  font-weight: 500;
  margin: 0 0 16px 0;
  padding: 0;
  line-height: 1.05;
  font-size: clamp(32px, 5vw, 40px);
`;

const RoleLine = styled(Heading2)`
  font-size: 18px;
  font-weight: 400;
  margin: -4px 0 0 0;
  opacity: 0.9;
  line-height: 1.3;
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 200px; /* smaller on mobile */
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid white;
  margin: 0 auto;
  display: block;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;

  /* Tablet */
  @media (min-width: 768px) {
    max-width: 260px;
  }

  /* Desktop and up: unchanged */
  @media (${QUERIES.large}) {
    max-width: 300px;
  }
`;

// Primary hero text wrapper (was accidentally removed in refactor)
const HeroText = styled.div`
  color: white;
  mix-blend-mode: difference;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  /* Match other sections: no internal width constraint or auto-centering */
  @media (${QUERIES.large}) {
    grid-row: 1;
    grid-column: 1 / 2;
  }
`;

// About-specific ordering: image above text on mobile/tablet, unchanged on desktop
const AboutText = styled(HeroText)`
  /* Mobile/Tablet: show text below image */
  grid-row: 2;

  @media (${QUERIES.large}) {
    /* Desktop: text left as before */
    grid-row: 1;
    grid-column: 1 / 2;
  }
`;

const AboutImage = styled(HeroImage)`
  /* Mobile/Tablet: show image first */
  grid-row: 1;

  @media (${QUERIES.large}) {
    /* Desktop: image right as before */
    grid-row: 1;
    grid-column: 2 / 3;
    justify-self: end;
  }
`;

// Slightly larger, more readable body text in About on mobile
const AboutParagraph = styled(Paragraph)`
  margin-top: 0;
  font-size: 15px;
  line-height: 1.65;
  opacity: 0.95;
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 1.7;
  }
`;

const AboutMeta = styled.div`
  margin-top: 8px;
  font-size: 13px;
  opacity: 0.85;
  color: ${({ theme }) => theme.textMain};
  a {
    color: ${({ theme }) => theme.textMain};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  /* Space between lines */
  & > * + * {
    margin-top: 4px;
  }
  @media (min-width: 768px) {
    font-size: 13.5px;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === "primary" ? theme.textMain : theme.textMain};
  border-radius: 8px;
  color: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.main : theme.textMain};
  text-decoration: none;
  background: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.textMain : "transparent"};
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
  font-size: 13px;
  font-weight: 500;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.textMain};
    outline-offset: 3px;
  }

  &:hover {
    background-color: ${({ theme, $variant }) =>
      $variant === "primary" ? theme.textMain + "CC" : theme.textMain + "22"};
    color: ${({ theme, $variant }) =>
      $variant === "primary" ? theme.main : theme.textMain};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.textMain};
    outline-offset: 2px;
  }

  @media (min-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

const GitHubIcon = styled(CodeIconSvg)`
  width: 16px;
  height: 16px;
  display: inline-block;
  color: currentColor;
`;
const ExternalIcon = styled(ExternalIconSvg)`
  width: 16px;
  height: 16px;
  display: inline-block;
  color: currentColor;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    justify-content: center;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  margin: 18px 0 0 0;
  position: relative;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.outline}AA 25%,
    ${({ theme }) => theme.outline}CC 50%,
    ${({ theme }) => theme.outline}AA 75%,
    transparent 100%
  );
  @media (max-width: 767px) {
    margin-top: 16px;
  }
`;

// Mobile-only section separator used between major sections
const SectionCut = styled(Divider)`
  display: block;
  margin-top: 12px;
  /* Blend into background on mobile so it's effectively invisible */
  background: ${({ theme }) => theme.main};
  opacity: 1; /* ensure consistent paint without gradient banding */
  pointer-events: none;
  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledButton = styled.a`
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  font-size: 14px;
  text-align: center;
  flex-grow: 1;
  border: 1px solid;
  background-color: ${({ className, theme }) =>
    className && className.includes("primary")
      ? theme.textMain
      : "transparent"};
  color: ${({ className, theme }) =>
    className && className.includes("primary") ? theme.main : theme.textMain};
  border-color: ${({ theme }) => theme.textMain};
  ${({ mode }) =>
    mode === "light" &&
    `
      mix-blend-mode: difference;
    `}

  &:hover {
    background-color: ${({ className, theme }) =>
      className && className.includes("primary")
        ? theme.textMain + "CC"
        : theme.textMain + "22"};
    color: ${({ className, theme }) =>
      className && className.includes("primary") ? theme.main : theme.textMain};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.textMain};
    outline-offset: 3px;
  }

  @media (min-width: 768px) {
    padding: 12px 24px;
    font-size: initial;
    flex-grow: 0;
  }
`;

const Skills = styled.ul`
  /* Base layout (legacy flex kept for in-hero, but hidden everywhere now) */
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  list-style: none;
  @media (max-width: 767px) {
    justify-content: center;
  }
  &.in-hero-skills {
    /* Hide the in-hero variant across all breakpoints to avoid duplication */
    display: none !important;
  }
  &.below-hero-skills {
    /* Unified responsive grid for all screens */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, max-content));
    justify-content: center;
    gap: 10px;
    @media (min-width: 600px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
      gap: 12px;
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(auto-fit, minmax(180px, max-content));
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
      gap: 14px;
    }
  }
`;

const Chip = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  line-height: 1;
  border: 1px solid ${({ theme }) => theme.outline}99;
  color: ${({ theme }) => theme.textMain};
  background:
    linear-gradient(
      0deg,
      ${({ theme }) => theme.main}0A,
      ${({ theme }) => theme.main}0A
    ),
    ${({ theme }) => theme.textMain}0F;
  backdrop-filter: saturate(140%) blur(2px);
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.outline}33 inset,
    0 2px 8px ${({ theme }) => theme.main}14;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow:
      0 0 0 1px ${({ theme }) => theme.outline}33 inset,
      0 6px 14px ${({ theme }) => theme.main}22;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.textMain};
    outline-offset: 3px;
  }

  @media (min-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

// Wrapper for the skills section with responsive spacing so it doesn't collide
// with the hero card border on desktop
const SkillsSection = styled(LandingMidi)`
  padding-top: 0;
  /* Add breathing room at the end of the skills area */
  padding-bottom: 24px;
  /* Match Card vertical spacing so the gap above and below looks equal */
  margin-top: 0; /* Mobile: hero already provides 48px bottom padding */
  margin-bottom: 0;

  /* Ensure the next Card (Projects) uses the same spacing below the skills */
  & + ${Card} {
    /* Keep visual rhythm at 48px from the end of skills content */
    margin-top: 24px !important; /* 48 - 24 bottom padding */
  }

  @media (min-width: 768px) {
    padding-bottom: 32px;
    margin-top: 48px;
    & + ${Card} {
      margin-top: 16px !important; /* 48 - 32 */
    }
  }
  @media (${QUERIES.large}) {
    margin-top: 48px;
    padding-bottom: 36px;
    & + ${Card} {
      margin-top: 12px !important; /* 48 - 36 */
    }
  }
`;

// SVG icons that inherit currentColor; shown on all sizes to the left of label
const SkillIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  & > svg {
    width: 16px;
    height: 16px;
    display: block;
    color: currentColor;
  }
`;

const ReactIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(-60 12 12)" />
    <ellipse cx="12" cy="12" rx="11" ry="4.5" />
  </svg>
);

const JsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="currentColor"
      opacity="0.1"
    />
    <path
      d="M11 7v8a3 3 0 1 1-6 0"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M13 15.5c.6.9 1.6 1.5 2.9 1.5 1.6 0 2.6-.8 2.6-2 0-1.1-.7-1.6-2.6-2-1.9-.3-3.5-1-3.5-3 0-1.9 1.7-3 3.7-3 1.5 0 2.7.5 3.5 1.4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const BootstrapIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" opacity="0.1" />
    <path
      d="M8 7h5.5a3 3 0 0 1 0 6H8z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M8 13h6a2.5 2.5 0 0 1 0 5H8z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const TailwindIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      d="M3 12c2-4 4-6 7-6 3 0 4 2 6 2 2 0 3-1 5-3-2 4-4 6-7 6-3 0-4-2-6-2-2 0-3 1-5 3Z"
      fill="currentColor"
      opacity="0.25"
    />
    <path
      d="M3 12c2-4 4-6 7-6 3 0 4 2 6 2 2 0 3-1 5-3-2 4-4 6-7 6-3 0-4-2-6-2-2 0-3 1-5 3Zm0 6c2-4 4-6 7-6 3 0 4 2 6 2 2 0 3-1 5-3-2 4-4 6-7 6-3 0-4-2-6-2-2 0-3 1-5 3Z"
      fill="currentColor"
    />
  </svg>
);

const MySqlIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    <path d="M4 16c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    <path d="M6 16c0-3.3 2.7-6 6-6s6 2.7 6 6" opacity="0.5" />
    <path d="M8 16c0-2.2 1.8-4 4-4s4 1.8 4 4" opacity="0.3" />
  </svg>
);

// Additional common icons (placeholders but professional-looking, all currentColor)
const HtmlIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4 3h16l-2 18-6 2-6-2z" opacity="0.1" />
    <path
      d="M7 7h10l-.5 5H10.5l.2 2.5H16L15.7 17l-3.7 1.2L8 17l-.2-2H10l-.2-2.5H6.7z"
      fill="currentColor"
    />
  </svg>
);
const CssIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4 3h16l-2 18-6 2-6-2z" opacity="0.1" />
    <path
      d="M7 7h10l-.3 3H11l-.2 2h5.1L15.3 17l-3.3 1.1L8.7 17l.1-1.5h-2L7 13h2.9l.2-3H7z"
      fill="currentColor"
    />
  </svg>
);
const NodeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    <path d="M12 2 3 7v10l9 5 9-5V7z" />
    <path d="M8 12a4 4 0 0 0 8 0" />
  </svg>
);
const ExpressIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    {...props}
  >
    <path d="M5 15l4-6 4 6" />
    <path d="M15 9v6" />
  </svg>
);
const GitIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="12" cy="4" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <path
      d="M12 6v4M12 10l-4 2m4-2l4 2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
const MongoIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2s6 6 6 12-6 8-6 8-6-2-6-8 6-12 6-12Z" opacity="0.2" />
    <path d="M12 2s6 6 6 12-6 8-6 8-6-2-6-8 6-12 6-12Z" fill="currentColor" />
  </svg>
);
const PythonIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    {...props}
  >
    <rect x="4" y="5" width="10" height="7" rx="2" />
    <rect x="10" y="12" width="10" height="7" rx="2" />
    <circle cx="9" cy="8.5" r="0.8" fill="currentColor" />
    <circle cx="15" cy="15.5" r="0.8" fill="currentColor" />
  </svg>
);
const PostgresIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    {...props}
  >
    <path d="M12 4c5 0 8 3 8 6 0 5-4 10-8 10S4 15 4 10c0-3 3-6 8-6Z" />
    <path d="M9 10h6M8 13h8" />
  </svg>
);

// --- Additional icons for .NET-focused skills (currentColor, lightweight) ---
const CSharpIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="3"
      opacity="0.15"
      fill="currentColor"
    />
    <path d="M10.5 9.5c-.9-1-2.7-1-3.6 0-.9 1-.9 3 0 4 1 1 2.7 1 3.6 0" />
    <path d="M14 9v6M17 9v6M13.2 12h5.6" />
  </svg>
);

const DotNetIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    <circle cx="6" cy="12" r="2.3" fill="currentColor" opacity="0.2" />
    <circle cx="12" cy="12" r="2.3" />
    <circle cx="18" cy="12" r="2.3" fill="currentColor" opacity="0.2" />
  </svg>
);

const AspNetIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    {...props}
  >
    <path d="M4 16V8l8-3 8 3v8l-8 3z" />
    <path d="M8 13h8M10 10l4 6" />
  </svg>
);

const EfCoreIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    {...props}
  >
    <ellipse cx="12" cy="7.5" rx="6" ry="2.5" />
    <path d="M6 7.5v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" />
    <path d="M9 12h6" opacity="0.7" />
  </svg>
);

const LinqIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    {...props}
  >
    <path d="M4 12h6l2 4 4-8h4" />
    <circle cx="4" cy="12" r="1.2" fill="currentColor" />
    <circle cx="10" cy="12" r="1.2" fill="currentColor" />
    <circle cx="12" cy="16" r="1.2" fill="currentColor" />
    <circle cx="16" cy="8" r="1.2" fill="currentColor" />
  </svg>
);

const SqlServerIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    {...props}
  >
    <ellipse cx="12" cy="6.5" rx="6.5" ry="2.5" />
    <path d="M5.5 6.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" />
    <path
      d="M5.5 12v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5"
      opacity="0.6"
    />
  </svg>
);

const WebApiIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    {...props}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3M5 5l2.2 2.2M19 5l-2.2 2.2M19 19l-2.2-2.2M5 19l2.2-2.2" />
  </svg>
);

const AzureIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    {...props}
  >
    <path d="M4 18 12 4l3 6-7 8z" />
    <path d="M14 10 20 18h-9" />
  </svg>
);

const XunitIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    {...props}
  >
    <circle cx="12" cy="12" r="8" opacity="0.2" fill="currentColor" />
    <path d="M8 12l2.5 2.5L16 9" />
  </svg>
);

const DockerIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    {...props}
  >
    <rect x="5" y="10" width="3" height="3" />
    <rect x="9" y="10" width="3" height="3" />
    <rect x="13" y="10" width="3" height="3" />
    <rect x="9" y="6.5" width="3" height="3" />
    <path d="M4 15.5h15c1.5 0 2.5-1 2.5-2 0-1-1-1.8-2.3-1.9" />
  </svg>
);
const SkillsHeading = styled.small`
  display: block;
  text-align: center;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textMain};
  opacity: 0.85;
  letter-spacing: 0.2px;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 16px;
`;

// Layout wrapper: places Certifications and Research side-by-side on large screens
// and stacked on smaller breakpoints. If only one section exists, it will span full width.
const CertResearchWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const CertCard = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.outline};
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: ${({ theme }) => theme.main}08;
  color: ${({ theme }) => theme.textMain};
  text-decoration: none;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease,
    transform 0.25s ease;
  will-change: transform;

  &:hover {
    border-color: ${({ theme }) => theme.textMain}66;
    background: ${({ theme }) => theme.main}0E;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.textMain};
    outline-offset: 2px;
  }
  @media (min-width: 768px) {
    padding: 14px 16px;
  }
`;

const CertTitle = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.25px;
  line-height: 1.35;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const CertMeta = styled.span`
  font-size: 11.5px;
  font-weight: 400;
  opacity: 0.8;
  letter-spacing: 0.3px;
  line-height: 1.45;
`;

const CertIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 4px;
`;

const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px; /* match Experience heading->content spacing */
  padding-bottom: 24px; /* internal breathing room at bottom of projects */
  /* Ensure there's always some breathing room after the last project */
  & > *:last-child {
    padding-bottom: 0; /* keep section-to-section gap consistent on mobile */
  }

  @media (min-width: 768px) {
    gap: 48px;
    margin-top: 24px; /* SectionHeader tablet bottom pad is disabled for Projects */
    padding-bottom: 32px;
    & > *:last-child {
      padding-bottom: 0; /* rely on card margin/padding on larger screens too */
    }
  }
  @media (${QUERIES.large}) {
    margin-top: 24px; /* keep consistent with Experience */
    padding-bottom: 36px;
  }
`;

// Project item container: remove top padding so heading→content gap isn't inflated
const ProjectItem = styled(LandingMidi)`
  padding-top: 0;
`;

// Use a real <img> for the above-the-fold thumbnail so the browser can
// prioritize it as the LCP image.
const LcpThumb = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9; /* match case study thumbnails */
  height: auto;
  object-fit: cover;
  display: block;
  border-radius: 25px;
  margin-bottom: 18px;
  background-color: ${({ theme }) => theme.outline}22; /* subtle placeholder */
`;

const Landing = ({ toggleMode, mode, spread, setDisableScroll }) => {
  const spreadClass =
    spread === "first" ? "growBlack" : spread === "second" ? "growWhite" : "";

  const location = useLocation();
  const heroRef = useRef(null);
  const [showStickyName, setShowStickyName] = useState(false);
  useEffect(() => {
    const isProjectsRoute = location.pathname === "/projects";
    const isProjectsHash =
      location.pathname === "/" && location.hash === "#projects";
    if (isProjectsRoute || isProjectsHash) {
      // Smooth scroll to projects section after mount
      const el = document.getElementById("projects");
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }

      // Update document title and meta description while on projects view
      const prevTitle = document.title;
      const meta = document.querySelector('meta[name="description"]');
      const prevDesc = meta ? meta.getAttribute("content") : undefined;
      document.title = "Projects — Latifur Rahman Limon";
      const projectsDesc =
        "Selected projects by Latifur Rahman: Content Variety & Scheduling, Redesigning B2B Signup, and more.";
      if (meta) meta.setAttribute("content", projectsDesc);

      return () => {
        document.title = prevTitle;
        if (meta && typeof prevDesc === "string")
          meta.setAttribute("content", prevDesc);
      };
    }
  }, [location.pathname, location.hash]);

  // Show sticky name only after hero is out of view
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowStickyName(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Main
      style={{
        position: "relative",
        height: setDisableScroll ? "100vh" : "unset",
      }}
    >
      <StickyNameBar $shown={showStickyName}>
        <StickyNameInner>
          <StickyName>{personalData.name}</StickyName>
        </StickyNameInner>
      </StickyNameBar>
      <Spread className={spreadClass} />
      <Nav mode={mode} toggleMode={toggleMode} />
      {/* --- NEW HERO STRUCTURE --- */}
      <Card mode={mode} className="hero-card" ref={heroRef}>
        <HeroInner>
          <HeroGrid>
            {/* Text Column */}
            <HeroText>
              <HeroName>{personalData.name}</HeroName>
              {personalData.role?.length > 0 && (
                <RoleLine>{personalData.role.join(" · ")}</RoleLine>
              )}
              <Paragraph style={{ marginTop: "24px" }}>
                {personalData.description}
              </Paragraph>
              {/* Skills are rendered below the hero across all breakpoints */}
              <Divider />
              <ButtonGroup>
                <StyledButton
                  href={
                    personalData.showProjectsOnHome ||
                    location.pathname === "/projects"
                      ? "#projects"
                      : "/projects"
                  }
                  className="primary"
                  mode={mode}
                >
                  View Projects
                </StyledButton>
                <StyledButton
                  href={personalData.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary"
                  mode={mode}
                >
                  View Resume
                </StyledButton>
              </ButtonGroup>
            </HeroText>

            {/* Intentionally no image in hero; About section handles profile image */}
          </HeroGrid>
          {/* Mobile-only separator to mark end of Hero */}
          <SectionCut />
        </HeroInner>
      </Card>
      {/* Mobile / Tablet skills below hero */}
      {personalData.showSkills !== false &&
        Array.isArray(personalData.skills) &&
        personalData.skills.length > 0 && (
          <SkillsSection>
            <SkillsHeading>Skills & Tools</SkillsHeading>
            <Skills className="below-hero-skills">
              {personalData.skills
                .slice()
                .map((s, idx) => ({ s, idx }))
                .sort((a, b) => {
                  const ao =
                    typeof a.s === "object" && Number.isFinite(a.s.order)
                      ? a.s.order
                      : Infinity;
                  const bo =
                    typeof b.s === "object" && Number.isFinite(b.s.order)
                      ? b.s.order
                      : Infinity;
                  if (ao === bo) return a.idx - b.idx;
                  return ao - bo;
                })
                .map(({ s }, i) => {
                  const item = typeof s === "string" ? { label: s } : s;
                  const label = item.label?.toLowerCase?.() || "";
                  const iconMap = [
                    // Backend / .NET additions first to catch specific labels
                    { match: "c#", Comp: CSharpIcon },
                    { match: "csharp", Comp: CSharpIcon },
                    { match: ".net", Comp: DotNetIcon },
                    { match: "dotnet", Comp: DotNetIcon },
                    { match: "asp.net", Comp: AspNetIcon },
                    { match: "aspnet", Comp: AspNetIcon },
                    { match: "asp.net core", Comp: AspNetIcon },
                    { match: "entity framework", Comp: EfCoreIcon },
                    { match: "ef core", Comp: EfCoreIcon },
                    { match: "linq", Comp: LinqIcon },
                    { match: "sql server", Comp: SqlServerIcon },
                    { match: "mssql", Comp: SqlServerIcon },
                    { match: "web api", Comp: WebApiIcon },
                    { match: "azure", Comp: AzureIcon },
                    { match: "xunit", Comp: XunitIcon },
                    { match: "docker", Comp: DockerIcon },
                    { match: "react", Comp: ReactIcon },
                    { match: "javascript", Comp: JsIcon },
                    { match: "bootstrap", Comp: BootstrapIcon },
                    { match: "tailwind", Comp: TailwindIcon },
                    { match: "mysql", Comp: MySqlIcon },
                    { match: "html", Comp: HtmlIcon },
                    { match: "css", Comp: CssIcon },
                    { match: "node", Comp: NodeIcon },
                    { match: "express", Comp: ExpressIcon },
                    { match: "git", Comp: GitIcon },
                    { match: "mongo", Comp: MongoIcon },
                    { match: "python", Comp: PythonIcon },
                    { match: "postgres", Comp: PostgresIcon },
                  ];
                  const found = iconMap.find((it) => label.includes(it.match));
                  const Icon = found?.Comp || null;
                  return (
                    <Chip key={i}>
                      {Icon ? (
                        <SkillIconWrap aria-hidden="true">
                          <Icon />
                        </SkillIconWrap>
                      ) : null}
                      <span>{item.label}</span>
                    </Chip>
                  );
                })}
            </Skills>
            {/* Mobile-only separator to mark end of Skills */}
            <SectionCut />
          </SkillsSection>
        )}
      {/* --- END HERO STRUCTURE --- */}

      {/* Experience Section Card */}
      {personalData.showExperiences && (
        <Card mode={mode} noBottomPadding>
          <SectionHeader>
            <Heading2 id="experience" tabIndex="0">
              <a
                href="#experience"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Experience
              </a>
            </Heading2>
            <Experience experiences={experiencesData} />
            {/* Mobile-only separator to mark end of Experience */}
            <SectionCut />
          </SectionHeader>
        </Card>
      )}

      {/* Projects Card */}
      {(location.pathname === "/projects" ||
        personalData.showProjectsOnHome) && (
        <Card mode={mode} noBottomPadding>
          {/* Main Title */}
          <div>
            <SectionHeader $noBottomPad>
              <Heading2 id="projects" tabIndex="0">
                <a
                  href="#projects"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Projects
                </a>
              </Heading2>
            </SectionHeader>
          </div>

          <ProjectsWrapper>
            {(location.pathname === "/projects"
              ? projects
              : projects.filter((p) => p.visibleOnHome !== false)
            )
              .slice()
              .sort((a, b) => {
                const ao = Number.isFinite(a.order) ? a.order : Infinity;
                const bo = Number.isFinite(b.order) ? b.order : Infinity;
                if (ao !== bo) return ao - bo;
                return a.name.localeCompare(b.name);
              })
              .map((p) => {
                const isExternal =
                  typeof p.url === "string" && /^https?:\/\//i.test(p.url);
                const posterSrc = p.posterPublic || p.poster;
                let sliderImages = [];
                if (p.id === "wordsmaster") {
                  try {
                    const ctx = require.context(
                      "../images/wordsmaster",
                      false,
                      /\.(png|jpe?g|gif|webp)$/i,
                    );
                    sliderImages = ctx
                      .keys()
                      .sort()
                      .map((k) => ctx(k));
                  } catch (_) {}
                } else if (p.id === "khorochnama") {
                  try {
                    const ctx = require.context(
                      "../images/khorochnama",
                      false,
                      /\.(png|jpe?g|gif|webp)$/i,
                    );
                    sliderImages = ctx
                      .keys()
                      .sort()
                      .map((k) => ctx(k));
                  } catch (_) {}
                }
                return (
                  <ProjectItem key={p.id} style={{ margin: "0 auto" }}>
                    {p.video ? (
                      <ProjectVideo
                        name={p.name}
                        image={p.video}
                        poster={posterSrc}
                        url={p.url}
                        description={p.description}
                        autoplay={!!p.autoplay}
                      />
                    ) : sliderImages.length > 0 ? (
                      <>
                        {isExternal ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ProjectSlider
                              images={sliderImages}
                              alt={`${p.name} slide`}
                            />
                          </a>
                        ) : (
                          <Link to={`/${p.url}`}>
                            <ProjectSlider
                              images={sliderImages}
                              alt={`${p.name} slide`}
                            />
                          </Link>
                        )}
                        <div style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                          <Heading3
                            style={{ textAlign: "left", margin: 0, padding: 0 }}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {isExternal ? (
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                {p.name}
                              </a>
                            ) : (
                              <StyledLink to={`/${p.url}`}>{p.name}</StyledLink>
                            )}
                          </Heading3>
                          <Paragraph style={{ marginTop: "-4px" }}>
                            {p.description}
                          </Paragraph>
                          {(p.repo || p.live) && (
                            <ActionsRow>
                              {p.repo && (
                                <ActionButton
                                  href={p.repo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <GitHubIcon
                                    aria-hidden="true"
                                    focusable="false"
                                  />
                                  GitHub
                                </ActionButton>
                              )}
                              {p.live && (
                                <ActionButton
                                  $variant="primary"
                                  href={p.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalIcon
                                    aria-hidden="true"
                                    focusable="false"
                                  />
                                  Try it
                                </ActionButton>
                              )}
                            </ActionsRow>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {isExternal ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LcpThumb
                              src={posterSrc}
                              alt={`${p.name} project thumbnail`}
                              loading="eager"
                              fetchpriority="high"
                              decoding="async"
                            />
                          </a>
                        ) : (
                          <Link to={`/${p.url}`}>
                            <LcpThumb
                              src={posterSrc}
                              alt={`${p.name} project thumbnail`}
                              loading="eager"
                              fetchpriority="high"
                              decoding="async"
                            />
                          </Link>
                        )}
                        <div style={{ paddingTop: "0px", paddingLeft: "0px" }}>
                          <Heading3
                            style={{ textAlign: "left", margin: 0, padding: 0 }}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {isExternal ? (
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                {p.name}
                              </a>
                            ) : (
                              <StyledLink to={p.url}>{p.name}</StyledLink>
                            )}
                          </Heading3>
                          <Paragraph style={{ marginTop: "-4px" }}>
                            {p.description}
                          </Paragraph>
                          {(p.repo || p.live) && (
                            <ActionsRow>
                              {p.repo && (
                                <ActionButton
                                  href={p.repo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <GitHubIcon
                                    aria-hidden="true"
                                    focusable="false"
                                  />
                                  GitHub
                                </ActionButton>
                              )}
                              {p.live && (
                                <ActionButton
                                  $variant="primary"
                                  href={p.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalIcon
                                    aria-hidden="true"
                                    focusable="false"
                                  />
                                  Try it
                                </ActionButton>
                              )}
                            </ActionsRow>
                          )}
                        </div>
                      </>
                    )}
                  </ProjectItem>
                );
              })}
          </ProjectsWrapper>
          {/* Mobile-only separator to mark end of Projects */}
          <SectionCut />
        </Card>
      )}

      {/* About Section Card (below Projects, above Collage) */}
      <Card mode={mode}>
        <SectionHeader>
          <Heading2 id="about" tabIndex="0">
            <a
              href="#about"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              About
            </a>
          </Heading2>
          <AboutGrid
            className={personalData.showProfileImage ? "with-image" : ""}
          >
            {/* Text column mimics previous hero text styling */}
            <AboutText>
              <AboutParagraph>
                {personalData.about ?? personalData.description}
              </AboutParagraph>
              {(personalData.education || personalData.location) && (
                <AboutMeta>
                  {personalData.education && (
                    <div>
                      {personalData.education.status}{" "}
                      {personalData.education.institution &&
                      personalData.education.url ? (
                        <>
                          at{" "}
                          <a
                            href={personalData.education.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {personalData.education.institution}
                          </a>
                          .
                        </>
                      ) : null}
                    </div>
                  )}
                  {personalData.location && (
                    <div>Based in {personalData.location}.</div>
                  )}
                </AboutMeta>
              )}
            </AboutText>

            {/* Image column appears only when flag is on */}
            {personalData.showProfileImage && (
              <AboutImage
                src={personalData.profileImage}
                alt={`${personalData.name} - Software Engineer, ASP.NET Core and React Developer from Bangladesh`}
                title={`${personalData.name} - Software Engineer`}
                loading="lazy"
                decoding="async"
              />
            )}
          </AboutGrid>

          {(() => {
            const showCerts =
              personalData.showCertifications !== false &&
              Array.isArray(personalData.certifications) &&
              personalData.certifications.length > 0;
            const showResearch =
              personalData.showResearch !== false &&
              Array.isArray(personalData.research) &&
              personalData.research.length > 0;
            if (!showCerts && !showResearch) return null;
            return (
              <>
                <Divider />
                <CertResearchWrap style={{ marginTop: 16 }}>
                  {showCerts && (
                    <div>
                      <Heading3 style={{ marginBottom: 8 }} tabIndex="0">
                        <a
                          href="#about"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          Certifications
                        </a>
                      </Heading3>
                      <CertGrid>
                        {personalData.certifications
                          .slice()
                          .sort((a, b) => {
                            const ao = Number.isFinite(a.order)
                              ? a.order
                              : Infinity;
                            const bo = Number.isFinite(b.order)
                              ? b.order
                              : Infinity;
                            if (ao !== bo) return ao - bo;
                            const ay = Number(a.year) || 0;
                            const by = Number(b.year) || 0;
                            return by - ay;
                          })
                          .map((c, i) => (
                            <CertCard
                              key={i}
                              as={c.url ? "a" : "div"}
                              href={c.url || undefined}
                              target={c.url ? "_blank" : undefined}
                              rel={c.url ? "noopener noreferrer" : undefined}
                            >
                              {c.icon ? <CertIcon alt="" src={c.icon} /> : null}
                              <CertTitle>{c.name}</CertTitle>
                              <CertMeta>
                                {c.issuer}
                                {c.year ? ` • ${c.year}` : ""}
                              </CertMeta>
                            </CertCard>
                          ))}
                      </CertGrid>
                    </div>
                  )}
                  {showResearch && (
                    <div>
                      <Heading3 style={{ marginBottom: 8 }} tabIndex="0">
                        <a
                          href="#about"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          Research
                        </a>
                      </Heading3>
                      <CertGrid>
                        {personalData.research
                          .slice()
                          .sort((a, b) => {
                            const ao = Number.isFinite(a.order)
                              ? a.order
                              : Infinity;
                            const bo = Number.isFinite(b.order)
                              ? b.order
                              : Infinity;
                            if (ao !== bo) return ao - bo;
                            const ay = Number(a.year) || 0;
                            const by = Number(b.year) || 0;
                            return by - ay;
                          })
                          .map((r, i) => (
                            <CertCard
                              key={i}
                              as={r.url ? "a" : "div"}
                              href={r.url || undefined}
                              target={r.url ? "_blank" : undefined}
                              rel={r.url ? "noopener noreferrer" : undefined}
                            >
                              <CertTitle>{r.title}</CertTitle>
                              <CertMeta>
                                {r.status ? `${r.status}` : null}
                                {r.year
                                  ? r.status
                                    ? ` • ${r.year}`
                                    : `${r.year}`
                                  : ""}
                                {r.institution
                                  ? r.status || r.year
                                    ? ` • ${r.institution}`
                                    : r.institution
                                  : ""}
                              </CertMeta>
                            </CertCard>
                          ))}
                      </CertGrid>
                    </div>
                  )}
                </CertResearchWrap>
              </>
            );
          })()}
          {/* Mobile-only separator to mark end of About */}
          <SectionCut />
        </SectionHeader>
      </Card>

      {/* Collage section without a card */}
      {personalData.showCollage !== false &&
        collageItems.filter?.((i) => i?.visible !== false).length > 0 && (
          <LandingMidi
            style={{
              paddingTop: 20,
            }}
          >
            <Collage />
          </LandingMidi>
        )}

      <LandingMidi style={{ marginBottom: 0, paddingBottom: 0 }}>
        <Foot />
      </LandingMidi>
    </Main>
  );
};

export { Landing };
