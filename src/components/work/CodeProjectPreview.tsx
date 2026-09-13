import React from "react";
import Image from "next/legacy/image";
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
}) => (
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
            layout="responsive"
          />
        ) : (
          <video
            src={`/work/code/${codeProjectSlug}/${preview.fileName}`}
            poster={`/work/code/${codeProjectSlug}/${preview.posterFileName}`}
            style={{ display: "block", width: "100%", height: "100%" }}
            width={preview.width}
            height={preview.height}
            autoPlay
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
      <Box mt={1} width="100%" display="flex" justifyContent="center">
        <Box maxWidth={500}>
          <Typography align="center">{preview.caption}</Typography>
        </Box>
      </Box>
    )}
  </>
);

export default React.memo(CodeProjectPreview);
