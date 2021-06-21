import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CODE_PROJECTS } from '../../../lib/work/code';
import CodeProjectRepositories from '../../../components/work/CodeProjectRepositories';
import CodeProjectRelated from '../../../components/work/CodeProjectRelated';

type ParsedQueryURL = {
  codeProjectSlug: string;
}

export const getStaticPaths: GetStaticPaths<ParsedQueryURL> = async () => ({
  paths: CODE_PROJECTS.map(({ slug }) => ({
    params: { codeProjectSlug: slug },
  })),
  fallback: false,
});

type CodeProjectPageProps = {
  codeProjectSlug: string;
}

export const getStaticProps: GetStaticProps<CodeProjectPageProps, ParsedQueryURL> = async ({
  params,
}) => ({
  props: {
    codeProjectSlug: params.codeProjectSlug,
  },
});

const CodeProjectPage: NextPage<CodeProjectPageProps> = ({ codeProjectSlug }) => {
  const project = CODE_PROJECTS.find(({ slug }) => codeProjectSlug === slug);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography variant="h1">{project.name}</Typography>
        {project.url && (
        <a href={project.url} rel="noopener noreferrer" target="_blank">
          <Button variant="outlined">
            Visit
          </Button>
        </a>
        )}
      </Box>
      <Typography>
        {project.blurb}
      </Typography>
      {project.repositories && project.repositories.length > 0 && (
        <CodeProjectRepositories repositories={project.repositories} />
      )}
      {project.related && project.related.length > 0 && (
        <CodeProjectRelated related={project.related} />
      )}
    </Container>
  );
};

export default CodeProjectPage;
