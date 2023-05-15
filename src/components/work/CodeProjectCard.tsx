import React, { FunctionComponent, useState } from "react";
import Link from "next/link";
import Color from "color";
import {
  Button,
  IconButton,
  CardContent,
  Card,
  Typography,
  Box,
  buttonClasses,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { CodeProject, PreviewItem } from "../../lib/work/code";
import { WORK_VARIANT_PALETTE } from "../../lib/work";
import CodeProjectRepositories from "./CodeProjectRepositories";
import CodeProjectRelated from "./CodeProjectRelated";
import CodeProjectPreview from "./CodeProjectPreview";

type CodePreviewsCarouselProps = {
  codeProjectSlug: string;
  previews: PreviewItem[];
};

const CodePreviewsCarousel: FunctionComponent<CodePreviewsCarouselProps> = ({
  codeProjectSlug,
  previews,
}) => {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [autoIncrement, setAutoIncrement] = useState<boolean>(true);

  const handleChange = (i: number) => {
    setAutoIncrement(false);
    setSelectedItem(i);
  };

  return previews.length > 1 ? (
    <Box marginTop={2}>
      <Carousel
        selectedItem={selectedItem}
        onChange={handleChange}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        labels={{ leftArrow: "previous", rightArrow: "next", item: "preview" }}
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <IconButton
              onClick={onClickHandler}
              title={label}
              sx={{
                position: "absolute",
                zIndex: 2,
                top: "calc(50% - 12px)",
                cursor: "pointer",
                right: 0,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )
        }
        renderArrowPrev={(onClickHandler, hasNext, label) =>
          hasNext && (
            <IconButton
              onClick={onClickHandler}
              title={label}
              sx={{
                position: "absolute",
                zIndex: 2,
                top: "calc(50% - 12px)",
                cursor: "pointer",
                left: 0,
                transform: "scale(-1)",
              }}
            >
              <ArrowForwardIosIcon sx={{ position: "relative", left: 2 }} />
            </IconButton>
          )
        }
      >
        {previews.map((preview, i) => (
          <Box
            key={preview.fileName}
            sx={{
              paddingLeft: { xs: 0, sm: 5 },
              paddingRight: { xs: 0, sm: 5 },
            }}
          >
            <CodeProjectPreview
              shadow={false}
              displayCaption={false}
              codeProjectSlug={codeProjectSlug}
              preview={preview}
              onVideoEnded={() => {
                if (autoIncrement) {
                  if (selectedItem === i) {
                    setSelectedItem((prev) =>
                      prev === previews.length - 1 ? 0 : prev + 1
                    );
                  }
                } else {
                  setAutoIncrement(true);
                }
              }}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  ) : (
    <Box
      sx={{
        marginTop: 2,
        paddingLeft: { xs: 0, sm: 5 },
        paddingRight: { xs: 0, sm: 5 },
      }}
    >
      <CodeProjectPreview
        shadow={false}
        displayCaption={false}
        codeProjectSlug={codeProjectSlug}
        preview={previews[0]}
      />
    </Box>
  );
};

type CodeProjectCardProps = {
  project: CodeProject;
};

const CodeProjectCard: FunctionComponent<CodeProjectCardProps> = ({
  project,
}) => (
  <Card
    sx={{
      "&:not(:last-child)": {
        marginBottom: {
          sm: 4,
          xs: 2,
        },
      },
    }}
  >
    <CardContent>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">
          <strong>{project.name}</strong>
        </Typography>
        <Box display="flex" columnGap={1}>
          {project.url && (
            <Box
              component="a"
              href={project.url}
              rel="noopener noreferrer"
              target="_blank"
              marginLeft={1}
            >
              <Button variant="outlined">Visit</Button>
            </Box>
          )}
          <Link href={`/work/code/${project.slug}`}>
            <Button
              sx={{
                borderColor: WORK_VARIANT_PALETTE.code,
                color: WORK_VARIANT_PALETTE.code,
                "&:hover": {
                  backgroundColor: Color(WORK_VARIANT_PALETTE.code)
                    .lighten(0.9)
                    .fade(0.8)
                    .hex(),
                  "& $moreButtonEndIcon": {
                    left: 3,
                  },
                },
                [`.${buttonClasses.endIcon}`]: {
                  position: "relative",
                  transition: ({ transitions }) => transitions.create("left"),
                  left: 0,
                  "& > *:first-child": {
                    fontSize: 16,
                  },
                },
              }}
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
            >
              More
            </Button>
          </Link>
        </Box>
      </Box>
      {project.blurb && (
        <Typography sx={{ marginTop: 1 }}>{project.blurb}</Typography>
      )}
      {project.previews && project.previews.length > 0 && (
        <CodePreviewsCarousel
          codeProjectSlug={project.slug}
          previews={project.previews}
        />
      )}
      {project.repositories && project.repositories.length > 0 && (
        <CodeProjectRepositories repositories={project.repositories} />
      )}
      {project.related && project.related.length > 0 && (
        <CodeProjectRelated related={project.related} />
      )}
    </CardContent>
  </Card>
);

export default CodeProjectCard;
