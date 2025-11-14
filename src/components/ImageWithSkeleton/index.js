import React, { useState } from "react";
import styled from "styled-components";
import { SkeletonBox } from "../Skeleton";

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledImage = styled.img`
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export const ImageWithSkeleton = ({ src, alt, className, style, onError }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ImageWrapper style={style}>
      {!loaded && (
        <SkeletonBox
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
      <StyledImage
        src={src}
        alt={alt}
        className={className}
        $loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={onError}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </ImageWrapper>
  );
};
