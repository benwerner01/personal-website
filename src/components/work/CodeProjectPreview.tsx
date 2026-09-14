"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MacOSWindow from "../MacOSWindow";
import { PreviewItem } from "../../lib/work/code";

type CodeProjectPreviewProps = {
  codeProjectSlug: string;
  preview: PreviewItem;
  displayCaption?: boolean;
  shadow?: boolean;
  onVideoEnded?: () => void;
};

const CodeProjectPreview: React.FC<CodeProjectPreviewProps> = ({
  codeProjectSlug,
  preview,
  onVideoEnded,
  displayCaption = true,
  shadow = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only download and play the video while at least half of it is on screen,
  // so /work doesn't start every (large) recording at once, including the
  // carousel slides that aren't showing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <MacOSWindow title={preview.title} shadow={shadow}>
        {/* The box reserves its final height from the preview's aspect ratio in
            CSS, so the card doesn't grow after hydration (no layout shift) */}
        <div
          style={{
            width: "100%",
            aspectRatio: `${preview.width} / ${preview.height}`,
          }}
        >
          {preview.variant === "image" ? (
            <Image
              alt={preview.fileName}
              quality={100}
              src={`/work/code/${codeProjectSlug}/${preview.fileName}`}
              width={preview.width}
              height={preview.height}
              // the legacy "responsive" layout: fill the aspect-ratio box
              // above, and a `sizes` of 100vw (its default) so the srcset
              // keeps the same width candidates
              sizes="100vw"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          ) : (
            <video
              ref={videoRef}
              src={`/work/code/${codeProjectSlug}/${preview.fileName}`}
              poster={`/work/code/${codeProjectSlug}/${preview.posterFileName}`}
              style={{ display: "block", width: "100%", height: "100%" }}
              width={preview.width}
              height={preview.height}
              preload="none"
              muted
              playsInline
              controls={false}
              onEnded={({ target }) => {
                if (onVideoEnded) onVideoEnded();
                (target as HTMLVideoElement).play();
              }}
            />
          )}
        </div>
      </MacOSWindow>
      {displayCaption && preview.caption && (
        <Box
          sx={{
            mt: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 500,
            }}
          >
            <Typography align="center">{preview.caption}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default React.memo(CodeProjectPreview);
