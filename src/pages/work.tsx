import React, { useMemo } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {
  WORK_ITEMS, WorkVariant, tbdIsWorkVariant,
} from '../lib/work';
import CodeProjectPreview from '../components/work/CodeProjectPreview';

type WorkPageProps = {

}

const parseCurrentVariant = (router: NextRouter): WorkVariant | undefined => {
  const { asPath } = router;

  const hashIndex = asPath.indexOf('#');

  if (hashIndex < 0) return undefined;

  const variant = asPath.slice(hashIndex + 1);

  return tbdIsWorkVariant(variant) ? variant : undefined;
};

const WorkPage: React.FC<WorkPageProps> = () => {
  const router = useRouter();

  const currentVariant = useMemo(() => parseCurrentVariant(router), [router.asPath]);

  return (
    <Container maxWidth="md">
      {/* <Box display="flex" mt={1} mb={4}>
        {WORK_VARIANTS.map((variant) => (
          <Link
            key={variant}
            href={currentVariant === variant ? '/work' : `/work#${variant}`}
          >
            <Chip
              label={(
                <Typography>
                  #
                  {variant}
                </Typography>
              )}
              component="a"
              variant="outlined"
            />
          </Link>
        ))}
      </Box> */}
      <Box mt={1}>
        {WORK_ITEMS
          .filter(({ variant }) => (currentVariant ? variant === currentVariant : true))
          .map((item) => (
            item.variant === 'code'
              ? <CodeProjectPreview key={item.name} project={item} />
              : <></>
          ))}
      </Box>
    </Container>
  );
};

export default WorkPage;
