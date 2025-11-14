import React from "react";
import styled from "styled-components";
import { SkeletonText, SkeletonBox, SkeletonCard } from "../Skeleton";
import { LandingMidi } from "../../theming/styles";

const SkeletonHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 16px;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    padding: 32px 0;
  }
`;

const SkeletonExperience = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: ${({ theme }) => theme.main};
  border: 1px solid ${({ theme }) => theme.outline};
  border-radius: 10px;

  @media (min-width: 769px) {
    display: grid;
    grid-template-columns: 180px 1fr 160px;
    gap: 48px;
    padding: 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.outline};
    padding-bottom: 16px;
  }
`;

const SkeletonProject = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SkeletonSkills = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, max-content));
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
    gap: 12px;
  }
`;

const SkeletonChip = styled(SkeletonBox)`
  height: 36px;
  border-radius: 999px;

  @media (min-width: 768px) {
    height: 42px;
  }
`;

export const PageSkeleton = () => {
  return (
    <>
      {/* Hero Skeleton */}
      <LandingMidi>
        <SkeletonHero>
          <SkeletonText $width="300px" $height="48px" $margin="0 0 10px 0" />
          <SkeletonText $width="250px" $height="22px" $margin="0 0 24px 0" />
          <SkeletonText $width="100%" $height="20px" $margin="0 0 8px 0" />
          <SkeletonText $width="90%" $height="20px" $margin="0 0 24px 0" />
          <div
            style={{
              display: "flex",
              gap: "12px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <SkeletonBox $width="140px" $height="44px" $radius="8px" />
            <SkeletonBox $width="140px" $height="44px" $radius="8px" />
          </div>
        </SkeletonHero>

        {/* Skills Skeleton */}
        <div style={{ marginTop: "32px" }}>
          <SkeletonText $width="180px" $height="32px" $margin="0 0 20px 0" />
          <SkeletonSkills>
            {[...Array(8)].map((_, i) => (
              <SkeletonChip key={i} />
            ))}
          </SkeletonSkills>
        </div>
      </LandingMidi>

      {/* Experience Skeleton */}
      <LandingMidi style={{ marginTop: "48px" }}>
        <SkeletonText $width="200px" $height="32px" $margin="0 0 24px 0" />
        {[...Array(2)].map((_, i) => (
          <SkeletonExperience key={i} style={{ marginBottom: "24px" }}>
            <SkeletonText $width="100%" $height="20px" />
            <SkeletonCard>
              <SkeletonText $width="80%" $height="24px" />
              <SkeletonText $width="60%" $height="18px" />
              <SkeletonText $width="50%" $height="16px" />
              <SkeletonText $width="100%" $height="16px" />
              <SkeletonText $width="90%" $height="16px" />
            </SkeletonCard>
            <SkeletonBox $width="100%" $height="90px" $radius="8px" />
          </SkeletonExperience>
        ))}
      </LandingMidi>

      {/* Projects Skeleton */}
      <LandingMidi style={{ marginTop: "48px" }}>
        <SkeletonText $width="150px" $height="32px" $margin="0 0 24px 0" />
        {[...Array(3)].map((_, i) => (
          <SkeletonProject key={i} style={{ marginBottom: "48px" }}>
            <SkeletonBox $width="100%" $height="400px" $radius="12px" />
            <SkeletonText $width="60%" $height="24px" />
            <SkeletonText $width="100%" $height="16px" />
            <SkeletonText $width="80%" $height="16px" />
          </SkeletonProject>
        ))}
      </LandingMidi>

      {/* About Skeleton */}
      <LandingMidi style={{ marginTop: "48px" }}>
        <SkeletonText $width="120px" $height="32px" $margin="0 0 24px 0" />
        <div style={{ display: "flex", gap: "24px", flexDirection: "column" }}>
          <SkeletonText $width="100%" $height="18px" />
          <SkeletonText $width="100%" $height="18px" />
          <SkeletonText $width="90%" $height="18px" />
          <SkeletonText $width="80%" $height="18px" />
        </div>
      </LandingMidi>
    </>
  );
};
