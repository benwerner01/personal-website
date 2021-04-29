import React from 'react';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import gallery, { formatCollectionTimeRange } from '../../lib/gallery';
import CollectionPreview from '../../components/CollectionPreview';

const GalleryPage: React.FC = () => (
  <Container>
    {gallery.map((collection) => (
      <Box key={collection.name}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5">
            <Link href={`/gallery/${collection.slug}`}>
              <a>
                {collection.name}
              </a>
            </Link>
          </Typography>
          <Typography variant="h5">
            {formatCollectionTimeRange(collection)}
          </Typography>
        </Box>
        <CollectionPreview collection={collection} />
      </Box>
    ))}
  </Container>
);

export default GalleryPage;
