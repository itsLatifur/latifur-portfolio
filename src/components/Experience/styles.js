import styled from "styled-components";

export const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 24px 0 0;
`;

export const ExperienceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 20px;

  /* Subtle divider between entries */
  &:not(:last-child) {
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.outline};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    /* Mobile card treatment for better visual grouping */
    /* Use main background to avoid unintended color cast while retaining border */
    background: ${({ theme }) => theme.main};
    border: 1px solid ${({ theme }) => theme.outline};
    border-radius: 10px;
    padding: 12px;
    /* Replace desktop divider with card spacing */
    &:not(:last-child) {
      border-bottom: none;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
  }
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const ExperienceContent = styled.div`
  flex: 1;
  display: flex;
  gap: 2%;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: row-reverse;
    gap: 3%;
  }
`;

export const ExperienceYears = styled.div`
  min-width: 180px;
  text-align: left;

  /* Match paragraph sizing for the years text for visual hierarchy */
  h3 {
    font-size: 16px;
    line-height: 28px;
    font-weight: 300;
    color: ${({ theme }) => theme.grayText};
    margin: 0; /* prevent inconsistent spacing */
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 14px;
      line-height: 22px;
    }
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

export const ExperienceDetails = styled.div`
  flex: 1;

  /* Ensure consistent typography with the rest of the site */
  h3.role {
    font-size: clamp(18px, 4vw, 20px);
    line-height: 1.4;
    font-weight: 500;
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h3 {
    font-size: 20px; /* aligns with Heading3 default */
    line-height: 28px;
    font-weight: 500; /* slightly stronger for titles */
    margin: 0 0 4px 0;
  }
  @media (max-width: 480px) {
    h3 {
      font-size: 18px;
      line-height: 26px;
    }
  }

  p {
    font-size: 16px; /* aligns with Paragraph default */
    line-height: 28px;
    margin: 4px 0 0 0;
    color: ${({ theme }) => theme.grayText}; /* make description more subtle */
  }
  @media (max-width: 480px) {
    p {
      font-size: 15px;
      line-height: 24px;
    }
  }

  /* Company link (or span if no URL) */
  a.company,
  span.company {
    display: inline-block;
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayText};
    margin: 0 0 6px 0;
    text-decoration: none;
  }
  @media (max-width: 480px) {
    a.company,
    span.company {
      font-size: 15px;
      line-height: 24px;
      margin-bottom: 4px;
    }
  }

  a.company:hover,
  a.company:focus-visible {
    color: ${({ theme }) => theme.textMain};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin: 2px 0 8px 0;

  span.location,
  a.location {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    line-height: 22px;
    color: ${({ theme }) => theme.grayText};
    white-space: normal;
    overflow-wrap: anywhere;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a.location:hover,
  a.location:focus-visible {
    color: ${({ theme }) => theme.textMain};
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    span.location,
    a.location {
      font-size: 13px;
      line-height: 20px;
    }
  }
`;

export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.outline};
  color: ${({ theme }) => theme.textMain};
  background: transparent;
  font-size: 12.5px;
  line-height: 20px;
  font-weight: 500;
  user-select: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.textMain};
    outline-offset: 2px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 2px 8px;
    line-height: 18px;
  }
`;

export const MetaIcon = styled.svg`
  width: 14px;
  height: 14px;
  display: inline-block;
  fill: ${({ theme }) => theme.grayText};
  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
`;

export const LogoWrapper = styled.div`
  width: clamp(100px, 12vw, 160px);
  height: clamp(100px, 12vw, 160px);
  border-radius: 12px;
  background: ${({ theme }) => theme.main};
  border: 1px solid ${({ theme }) => theme.outline};
  flex-shrink: 0;
  margin: 0;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
  overflow: hidden; /* Clips the image to border-radius */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0; /* Remove padding so border-radius clips properly */

  a:hover &,
  a:focus-visible & {
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.textMain};
  }

  @media (max-width: 768px) {
    width: clamp(60px, 15vw, 90px);
    height: clamp(60px, 15vw, 90px);
    border-radius: 8px;
  }

  @media (max-width: 330px) {
    width: clamp(50px, 13vw, 70px);
    height: clamp(50px, 13vw, 70px);
    border-radius: 6px;
  }
`;

export const CompanyLogo = styled.img`
  width: 85%; /* Slightly smaller than container for padding effect */
  height: 85%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  border-radius: 6px; /* Proportionally matches wrapper's 12px */

  @media (max-width: 768px) {
    border-radius: 4px; /* Proportionally matches wrapper's 8px */
  }
`;
