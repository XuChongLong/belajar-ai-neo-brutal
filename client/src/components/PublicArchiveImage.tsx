import React, { useEffect, useState } from "react";

type PublicArchiveImageProps = {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
};

export default function PublicArchiveImage({ src, fallbackSrc, alt, className, width, height }: PublicArchiveImageProps) {
  const [activeSrc, setActiveSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setActiveSrc(src);
    setHasFailed(false);
  }, [src]);

  if (hasFailed) return <span className={`public-archive-image-fallback ${className ?? ""}`} role="img" aria-label={`${alt}. Arsip foto sedang tidak tersedia.`}><b>ARSIP</b><span>NASA<br />STEM</span></span>;

  return <img src={activeSrc} alt={alt} className={className} width={width} height={height} loading="eager" decoding="async" referrerPolicy="no-referrer" onError={() => {
    if (activeSrc !== fallbackSrc) setActiveSrc(fallbackSrc);
    else setHasFailed(true);
  }} />;
}
