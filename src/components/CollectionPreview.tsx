import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Collection, CollectionImage } from '../lib/gallery';

const IMAGE_HEIGHT = 400;

type CollectionImageComponentProps = {
  image: CollectionImage;
  collectionSlug: string;
}

const useCollectionImageStyles = makeStyles((theme) => ({
  image: {
    opacity: 1,
    transition: theme.transitions.create('opacity'),
    '&:hover': {
      opacity: 0.75,
    },
  },
}));

const CollectionImageComponent: React.FC<CollectionImageComponentProps> = ({
  collectionSlug, image,
}) => {
  const classes = useCollectionImageStyles();
  return (
    <Box m={1}>
      <Link href={`/gallery/${collectionSlug}/${image.slug}`}>
        <a>
          <Image
            quality={100}
            className={classes.image}
            src={`/gallery/${collectionSlug}/${image.slug}.jpeg`}
            width={(IMAGE_HEIGHT / image.height) * image.width}
            height={IMAGE_HEIGHT}
          />
        </a>
      </Link>
    </Box>
  );
};

const CollectionPreview: React.FC<{ collection: Collection }> = ({ collection }) => (
  <>
    {(new Array(Math.ceil(collection.items.length / 5))).fill([]).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Box key={i} display="flex" m={-1}>
        {collection.items.slice(i * 5, (i * 5) + 5).map((item) => (
          <CollectionImageComponent
            key={item.slug}
            image={item}
            collectionSlug={collection.slug}
          />
        ))}
      </Box>
    ))}
  </>
);

export default CollectionPreview;
