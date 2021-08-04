import React, { ReactNode } from 'react';

export type ImagePreview = {
  variant: 'image';
}

export type VideoPreview = {
  variant: 'video';
  posterFileName: string;
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

type PaperBook = {
  name: string;
  url: string;
  year: string;
}

export type Paper = {
  variant: 'Paper';
  type?: string;
  title: string;
  url: string;
  book?: PaperBook;
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
        type: 'Conference Paper',
        title: 'ProvViz: An Intuitive Prov Editor and Visualiser',
        url: 'https://link.springer.com/chapter/10.1007%2F978-3-030-80960-7_18',
        book: {
          name: 'Provenance and Annotation of Data and Processes',
          url: 'https://link.springer.com/book/10.1007/978-3-030-80960-7',
          year: '2021',
        },
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
        posterFileName: 'editor-recording.jpeg',
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
    previews: [
      {
        variant: 'video',
        fileName: 'graph.mp4',
        posterFileName: 'graph.jpeg',
        width: 2878,
        height: 1584,
        caption: (
          <>
            {'Create and explore your '}
            <strong>personal knowledge graph</strong>
          </>
        ),
      },
      {
        variant: 'video',
        fileName: 'create-relationships.mp4',
        posterFileName: 'create-relationships.jpeg',
        width: 2880,
        height: 1592,
        caption: (
          <>
            {'Intuitively create '}
            <strong>relationships</strong>
            {' between '}
            <strong>entities</strong>
          </>
        ),
      },
      {
        variant: 'video',
        fileName: 'note.mp4',
        posterFileName: 'note.jpeg',
        width: 2878,
        height: 1590,
        caption: (
          <>
            {'Create '}
            <strong>notes</strong>
            {' about the entities in your knowledge graph'}
          </>
        ),
      },
    ],
  },
];
