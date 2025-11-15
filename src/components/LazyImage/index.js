import React from "react";

// Simple wrapper that defaults to loading="lazy" unless eager prop set
export default function LazyImage({
  src,
  alt = "",
  loading,
  style,
  onClick,
  className,
  ...rest
}) {
  const loadAttr = loading || (rest.eager ? "eager" : "lazy");
  return (
    <img
      src={src}
      alt={alt}
      loading={loadAttr}
      style={style}
      onClick={onClick}
      className={className}
      {...rest}
    />
  );
}
