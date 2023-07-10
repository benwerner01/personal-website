import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/legacy/image";
import React, { useEffect, useRef, useState } from "react";

import { PreviewItem } from "../../app/work/code/code";
import MacOSWindow from "../mac-os-window";

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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const calculateWidth = () => {
      if (wrapperRef.current) {
        setWidth(wrapperRef.current.clientWidth);
      }
    };

    calculateWidth();

    window.addEventListener("resize", calculateWidth);

    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  const contentHeight = width * (preview.height / preview.width);

  return (
    <>
      <MacOSWindow title={preview.title} shadow={shadow}>
        <div
          ref={wrapperRef}
          style={{
            width: "100%",
            height: contentHeight,
          }}
        >
          {preview.variant === "image" ? (
            <Image
              alt={preview.fileName}
              quality={100}
              src={`/work/code/${codeProjectSlug}/${preview.fileName}`}
              width={preview.width}
              height={preview.height}
            />
          ) : (
            <video
              src={`/work/code/${codeProjectSlug}/${preview.fileName}`}
              poster={`/work/code/${codeProjectSlug}/${preview.posterFileName}`}
              style={{ width: "100%", height: contentHeight }}
              width={preview.width}
              height={preview.height}
              autoPlay
              muted
              playsInline
              controls={false}
              onEnded={({ target }) => {
                if (onVideoEnded) {
                  onVideoEnded();
                }
                void (target as HTMLVideoElement).play();
              }}
            />
          )}
        </div>
      </MacOSWindow>
      {displayCaption && preview.caption && (
        <Box mt={1} width="100%" display="flex" justifyContent="center">
          <Box maxWidth={500}>
            <Typography align="center">{preview.caption}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default React.memo(CodeProjectPreview);
