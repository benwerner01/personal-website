"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React from "react";

import CodeProjectPreview from "../../../../components/work/code-project-preview";
import CodeProjectRelated from "../../../../components/work/code-project-related";
import CodeProjectRepositories from "../../../../components/work/code-project-repositories";
import { CODE_PROJECTS } from "../code";

const CodeProjectPage: NextPage<{ params: { codeProjectSlug: string } }> = ({
  params,
}) => {
  const router = useRouter();

  const { codeProjectSlug } = params;

  const project = CODE_PROJECTS.find(({ slug }) => codeProjectSlug === slug);

  if (!project) {
    router.push("/work");
    return null;
  }

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
