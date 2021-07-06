import React, { ReactNode } from 'react';

export type ImagePreview = {
  variant: 'image';
}

export type VideoPreview = {
  variant: 'video';
}

export type PreviewItem = {
  fileName: string;
  width: number;
  height: number;
  title?: string;
  caption?: string | ReactNode;
} & (ImagePreview | VideoPreview);

export type Repository = {
  slug: string;
  comment?: string;
}

export type Paper = {
  variant: 'Paper';
  title: string;
  url: string;
}

export type MiscWriting = {
  variant: 'Misc';
  title: string;
  url: string;
}

export type Related = Paper | MiscWriting;

export type CodeProject = {
  variant: 'code';
  name: string;
  slug: string;
  blurb?: string | ReactNode;
  url?: string;
  previews?: PreviewItem[];
  related?: Related[];
  repositories?: Repository[];
}

export const CODE_PROJECTS: CodeProject[] = [
  {
    variant: 'code',
    name: 'ProvViz',
    slug: 'provviz',
    blurb: (
      <>
        {'An intuitive in-browser editor for editing and visualising data provenance using the '}
        <a href="https://www.w3.org/TR/prov-overview/" rel="noopener noreferrer" target="_blank">PROV model</a>
        .
      </>
    ),
    url: 'https://provviz.com',
    repositories: [
      {
        slug: 'benwerner01/provviz',
        comment: 'ProvViz Visualiser NPM Package',
      },
      {
        slug: 'benwerner01/provviz-web',
        comment: 'ProvViz Web React App',
      },
    ],
    related: [
      {
        variant: 'Paper',
        title: 'ProvViz: An Intuitive PROV Editory and Visualiser',
        url: 'https://ben-werner.com/papers/provviz-an-intuitive-prov-editor-and-visualiser.pdf',
      },
      {
        variant: 'Misc',
        title: 'ProvViz User Guide',
        url: 'https://provviz.com/user-guide.pdf',
      },
    ],
    previews: [
      {
        variant: 'video',
        fileName: 'editor-recording.mp4',
        width: 2904,
        height: 1762,
        caption: (
          <>
            {'ProvViz provides '}
            <strong>intuitive PROV editing functionality</strong>
            , that does not require prior knowledge of PROV document syntax
          </>
        ),
      },
    ],
  },
  {
    variant: 'code',
    name: 'Cortex',
    slug: 'cortex',
    blurb: (
      <>
        {'A platform that enables non-technical users to create and maintain a '}
        <strong>personal knowledge graph</strong>
        {' as a second brain, to bring the benefits of networked structured data, currently harnessed primarily by large organisations, to anyone.'}
      </>
    ),
    url: 'https://cortexnotes.com',
  },
];
