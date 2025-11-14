import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonBase = styled.div`
  background: ${({ theme }) => theme.outline}33;
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.outline}33 0px,
    ${({ theme }) => theme.outline}66 40px,
    ${({ theme }) => theme.outline}33 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${({ $radius }) => $radius || "4px"};
`;

export const SkeletonText = styled(SkeletonBase)`
  height: ${({ $height }) => $height || "20px"};
  width: ${({ $width }) => $width || "100%"};
  margin: ${({ $margin }) => $margin || "0"};
`;

export const SkeletonCircle = styled(SkeletonBase)`
  width: ${({ $size }) => $size || "40px"};
  height: ${({ $size }) => $size || "40px"};
  border-radius: 50%;
`;

export const SkeletonBox = styled(SkeletonBase)`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "200px"};
`;

export const SkeletonImage = styled(SkeletonBase)`
  width: 100%;
  padding-bottom: ${({ $aspectRatio }) => $aspectRatio || "56.25%"};
  position: relative;
`;

export const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "12px"};
  padding: ${({ $padding }) => $padding || "0"};
`;
