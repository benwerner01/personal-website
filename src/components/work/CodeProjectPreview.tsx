import React from 'react';
import Image from 'next/image';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
            src={`/work/code/${codeProjectSlug}/${preview.fileName}`}
            poster={`/work/code/${codeProjectSlug}/${preview.posterFileName}`}
            style={{ width: '100%', height: `calc(100% * (${preview.width} / ${preview.height}))` }}
            width={preview.width}
            height={preview.height}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          />
        )}
    </MacOSWindow>
    {preview.caption && (
      <Box mt={1} width="100%" display="flex" justifyContent="center">
        <Box maxWidth={500}>
          <Typography align="center">{preview.caption}</Typography>
        </Box>
      </Box>
    )}
  </>
);

export default React.memo(CodeProjectImagePreview);
