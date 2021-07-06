import { readdirSync } from 'fs';
import sizeOf from 'image-size';
import blurdata from '../../public/gallery/blurdata.json';

export type CollectionImage = {
  variant: 'image';
  blurDataURL?: string;
  slug: string;
  width: number;
  height: number;
}

export type CollectionItem = CollectionImage

export type Collection = {
  name: string;
  slug: string;
  startDate: string;
  endDate: string;
  items: CollectionItem[];
}

export type StaticCollection = Omit<Collection, 'items'>

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatCollectionTimeRange = (collection: Collection) => {
  const startDate = new Date(collection.startDate);
  const endDate = new Date(collection.endDate);

  return [
    MONTHS[startDate.getMonth()],
    startDate.getFullYear() === endDate.getFullYear()
      ? ''
      : [
        ` ${startDate.getFullYear()}`,
        startDate.getMonth() !== endDate.getMonth()
          ? ''
          : ` - ${MONTHS[endDate.getMonth()]}`,
      ].join(''),
    startDate.getMonth() === endDate.getMonth()
      ? ''
      : ` - ${MONTHS[endDate.getMonth()]}`,
    ` ${endDate.getFullYear()}`,
  ].join('');
};

export type Gallery = Collection[]

export const getCollectionItems = (
  slug: string,
): CollectionItem[] => readdirSync(`./public/gallery/${slug}`)
  .filter((fileName) => fileName.endsWith('.jpeg'))
  .map((fileName) => {
    const imageURL = `public/gallery/${slug}/${fileName}`;

    const { width, height } = sizeOf(imageURL);

    return ({
      variant: 'image',
      slug: fileName.replace(/\.[^/.]+$/, ''),
      blurDataURL: blurdata[imageURL],
      width,
      height,
    });
  });

export const STATIC_COLLECTIONS = [
  {
    name: 'London Lockdown',
    slug: 'london-lockdown',
    startDate: (new Date('2020-05')).toISOString(),
    endDate: (new Date('2020-06')).toISOString(),
  },
  {
    name: 'NYC Lockdown',
    slug: 'nyc-lockdown',
    startDate: (new Date('2020-03')).toISOString(),
    endDate: (new Date('2020-05')).toISOString(),
  },
];

export const getGallery = (): Gallery => STATIC_COLLECTIONS
  .map((collection) => ({ ...collection, items: getCollectionItems(collection.slug) }));
