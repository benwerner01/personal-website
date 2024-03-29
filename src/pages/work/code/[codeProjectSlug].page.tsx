import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CODE_PROJECTS } from "../../../lib/work/code";
import CodeProjectRepositories from "../../../components/work/CodeProjectRepositories";
import CodeProjectRelated from "../../../components/work/CodeProjectRelated";
import CodeProjectPreview from "../../../components/work/CodeProjectPreview";

type ParsedQueryURL = {
  codeProjectSlug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryURL> = async () => ({
  paths: CODE_PROJECTS.map(({ slug }) => ({
    params: { codeProjectSlug: slug },
  })),
  fallback: false,
});

type CodeProjectPageProps = {
  codeProjectSlug: string;
};

export const getStaticProps: GetStaticProps<
  CodeProjectPageProps,
  ParsedQueryURL
> = async ({ params }) => ({
  props: {
    codeProjectSlug: params.codeProjectSlug,
  },
});

const CodeProjectPage: NextPage<CodeProjectPageProps> = ({
  codeProjectSlug,
}) => {
  const project = CODE_PROJECTS.find(({ slug }) => codeProjectSlug === slug);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h1">{project.name}</Typography>
        {project.url && (
          <a href={project.url} rel="noopener noreferrer" target="_blank">
            <Button variant="outlined">Visit</Button>
          </a>
        )}
      </Box>
      <Typography>{project.blurb}</Typography>
      {project.previews &&
        project.previews.map((preview) => (
          <Box mt={4} key={preview.fileName}>
            <CodeProjectPreview
              codeProjectSlug={codeProjectSlug}
              preview={preview}
            />
          </Box>
        ))}
      {project.repositories && project.repositories.length > 0 && (
        <CodeProjectRepositories mt={4} repositories={project.repositories} />
      )}
      {project.related && project.related.length > 0 && (
        <CodeProjectRelated related={project.related} />
      )}
    </Container>
  );
};

export default CodeProjectPage;
