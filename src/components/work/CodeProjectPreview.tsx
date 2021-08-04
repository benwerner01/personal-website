import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MacOSWindow from '../MacOSWindow';
import { PreviewItem } from '../../lib/work/code';

type CodeProjectPreviewProps = {
  codeProjectSlug: string;
  preview: PreviewItem;
  displayCaption?: boolean;
  shadow?: boolean;
  onVideoEnded?: () => void;
}

const CodeProjectPreview: React.FC<CodeProjectPreviewProps> = ({
  codeProjectSlug, preview, onVideoEnded, displayCaption = true, shadow = true,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (wrapperRef.current) {
      const calculateWidth = () => setWidth(wrapperRef.current.clientWidth);

      calculateWidth();

      window.addEventListener('resize', calculateWidth);

      return () => window.removeEventListener('resize', calculateWidth);
    }
    return undefined;
  }, [wrapperRef.current]);

  const contentHeight = width * (preview.height / preview.width);

  return (
    <>
      <MacOSWindow title={preview.title} shadow={shadow}>
        <div
          ref={wrapperRef}
          style={{
            width: '100%',
            height: contentHeight,
          }}
        >
          {preview.variant === 'image'
            ? (
              <Image
                quality={100}
                src={`/work/code/${codeProjectSlug}/${preview.fileName}`}
                width={preview.width}
                height={preview.height}
              />
            ) : (
              <video
                src={`/work/code/${codeProjectSlug}/${preview.fileName}`}
                poster={`/work/code/${codeProjectSlug}/${preview.posterFileName}`}
                style={{ width: '100%', height: contentHeight }}
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
};

export default React.memo(CodeProjectPreview);
