import React from 'react';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import gallery, { Collection, formatCollectionTimeRange } from '../../lib/gallery';
import CollectionPreview from '../../components/CollectionPreview';

const CollectionComponent: React.FC<{ collection: Collection }> = ({ collection }) => (
  <Box>
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
);

const GalleryPage: React.FC = () => (
  <Container>
    <Typography gutterBottom variant="h1">Gallery</Typography>
    {gallery.map((collection) => (
      <CollectionComponent key={collection.name} collection={collection} />
    ))}
  </Container>
);

export default GalleryPage;
