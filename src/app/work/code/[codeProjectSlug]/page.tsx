import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CODE_PROJECTS } from "../../../../lib/work/code";
import CodeProjectRepositories from "../../../../components/work/CodeProjectRepositories";
import CodeProjectRelated from "../../../../components/work/CodeProjectRelated";
import CodeProjectPreview from "../../../../components/work/CodeProjectPreview";
import { ogImageUrl, pageMetadata } from "../../../../lib/metadata";

type Params = {
  codeProjectSlug: string;
};

type CodeProjectPageProps = {
  params: Promise<Params>;
};

// every project is prerendered; unknown slugs 404 (`fallback: false`)
export const dynamicParams = false;

export const generateStaticParams = (): Params[] =>
  CODE_PROJECTS.map(({ slug }) => ({ codeProjectSlug: slug }));

const findProject = (codeProjectSlug: string) =>
  CODE_PROJECTS.find(({ slug }) => codeProjectSlug === slug);

export const generateMetadata = async ({
  params,
}: CodeProjectPageProps): Promise<Metadata> => {
  const { codeProjectSlug } = await params;
  const project = findProject(codeProjectSlug);
  if (!project) notFound();

  const poster = project.previews?.find(
    (preview) => preview.variant === "video",
  );

  return pageMetadata({
    title: `${project.name} — Ben Werner`,
    description: project.description,
    path: `/work/code/${codeProjectSlug}`,
    image:
      poster && poster.variant === "video"
        ? ogImageUrl(`/work/code/${codeProjectSlug}/${poster.posterFileName}`)
        : undefined,
  });
};

const CodeProjectPage = async ({ params }: CodeProjectPageProps) => {
  const { codeProjectSlug } = await params;
  const project = findProject(codeProjectSlug);
  if (!project) notFound();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h1">{project.name}</Typography>
        {project.url && (
          <a
            href={project.url}
            rel="noopener noreferrer"
            target="_blank"
            // the link is a flex item: keep it button-sized rather than
            // stretched to the heading row, so its hit area isn't obscured
            style={{ alignSelf: "flex-start" }}
          >
            <Button variant="outlined">Visit</Button>
          </a>
        )}
      </Box>
      <Typography>{project.blurb}</Typography>
      {project.previews &&
        project.previews.map((preview) => (
          <Box
            key={preview.fileName}
            sx={{
              mt: 4,
            }}
          >
            <CodeProjectPreview
              codeProjectSlug={codeProjectSlug}
              preview={preview}
            />
          </Box>
        ))}
      {project.repositories && project.repositories.length > 0 && (
        <CodeProjectRepositories
          mt={4}
          headingComponent="h2"
          repositories={project.repositories}
        />
      )}
      {project.related && project.related.length > 0 && (
        <CodeProjectRelated headingComponent="h2" related={project.related} />
      )}
    </Container>
  );
};

export default CodeProjectPage;
