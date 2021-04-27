export type CollectionImage = {
  variant: 'image';
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

const gallery: Gallery = [
  {
    name: 'NYC Lockdown',
    slug: 'nyc-lockdown',
    startDate: (new Date('2020-05')).toISOString(),
    endDate: (new Date('2020-06')).toISOString(),
    items: [
      {
        variant: 'image',
        slug: 'IMG_6676',
        width: 2789,
        height: 3719,
      },
      {
        variant: 'image',
        slug: 'IMG_6685',
        width: 3024,
        height: 4032,
      },
      {
        variant: 'image',
        slug: 'IMG_6688',
        width: 2796,
        height: 3729,
      },
      {
        variant: 'image',
        slug: 'IMG_6696',
        width: 4032,
        height: 3024,
      },
      {
        variant: 'image',
        slug: 'IMG_6746',
        width: 4032,
        height: 3024,
      },
      {
        variant: 'image',
        slug: 'IMG_6763',
        width: 2954,
        height: 3939,
      },
      {
        variant: 'image',
        slug: 'IMG_6775',
        width: 2884,
        height: 3846,
      },
      {
        variant: 'image',
        slug: 'IMG_6816',
        width: 2871,
        height: 3828,
      },
      {
        variant: 'image',
        slug: 'IMG_6838',
        width: 3024,
        height: 4032,
      },
      {
        variant: 'image',
        slug: 'IMG_6865',
        width: 3024,
        height: 4032,
      },
      {
        variant: 'image',
        slug: 'IMG_6876',
        width: 3870,
        height: 2902,
      },
      {
        variant: 'image',
        slug: 'IMG_7015',
        width: 2278,
        height: 3038,
      },
      {
        variant: 'image',
        slug: 'IMG_7030',
        width: 2669,
        height: 3561,
      },
      {
        variant: 'image',
        slug: 'IMG_7148',
        width: 1066,
        height: 853,
      },
      {
        variant: 'image',
        slug: 'IMG_7164',
        width: 2942,
        height: 3923,
      },
      {
        variant: 'image',
        slug: 'IMG_7240',
        width: 3024,
        height: 4032,
      },
      {
        variant: 'image',
        slug: 'IMG_7229',
        width: 3024,
        height: 4032,
      },
      {
        variant: 'image',
        slug: 'IMG_7248',
        width: 3024,
        height: 4032,
      },
    ],
  },
];

export default gallery;
