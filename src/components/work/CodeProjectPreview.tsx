import React from 'react';
import Image from 'next/image';
import { Typography } from '@material-ui/core';
import MacOSWindow from '../MacOSWindow';
import { PreviewItem } from '../../lib/work/code';

type CodeProjectImagePreviewProps = {
  codeProjectSlug: string;
  preview: PreviewItem;
}

const CodeProjectImagePreview: React.FC<CodeProjectImagePreviewProps> = ({
  codeProjectSlug, preview,
}) => (
  <>
    <MacOSWindow title={preview.title}>
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
            style={{ width: '100%', height: `calc(100% * (${preview.width} / ${preview.height}))` }}
            width={preview.width}
            height={preview.height}
            autoPlay
            loop
            muted
          >
            <source src={`/work/code/${codeProjectSlug}/${preview.fileName}`} type={preview.type} />
          </video>
        )}
    </MacOSWindow>
    {preview.caption && <Typography align="center">{preview.caption}</Typography>}
  </>
);

export default React.memo(CodeProjectImagePreview);
