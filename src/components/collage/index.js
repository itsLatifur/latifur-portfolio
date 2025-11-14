import React from "react";
import { CollageCont, CollageItem } from "./styles";

const Collage = () => {
  // Collage is disabled, return empty array
  const defaultItems = [];

  // Use default items since collage is disabled
  const items = defaultItems;

  return (
    <CollageCont>
      {items.map((item, index) => {
        const label = item.label || `Item ${index + 1}`;
        const imgSrc = item.src || item.img; // support either external/public path (src) or imported (img)
        const alt = item.alt || label;
        const href = item.href;

        return (
          <CollageItem key={index} data-label={label}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ display: "block", width: "100%", height: "100%" }}
              >
                <img src={imgSrc} alt={alt} loading="lazy" />
              </a>
            ) : (
              <img src={imgSrc} alt={alt} loading="lazy" />
            )}
          </CollageItem>
        );
      })}
    </CollageCont>
  );
};

export { Collage };
