import { readdirSync, readFileSync, writeFileSync } from 'fs';
import sharp from 'sharp';
import { encode } from 'blurhash';

const BLUR_DATA_PATH = 'public/gallery/blurdata.json';

type BlurData = {
  [url: string]: string;
}

const updateBlurData = async () => {
  const previousBlurData: BlurData = JSON.parse(readFileSync(BLUR_DATA_PATH, 'utf8'));

  const freshImageURLs = readdirSync('public/gallery', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name)
    .map((collectionSlug) => readdirSync(`public/gallery/${collectionSlug}`)
      .filter((fileName) => fileName.endsWith('.jpeg'))
      .map((fileName) => `public/gallery/${collectionSlug}/${fileName}`))
    .flat()
    .filter((imageURL) => previousBlurData[imageURL] === undefined);

  // eslint-disable-next-line no-console
  console.log(`${freshImageURLs.length} fresh image${freshImageURLs.length === 1 ? '' : 's'} found`);

  const updatedBlurData = await freshImageURLs.reduce(async (prev, imageURL) => {
    const { data, info } = await sharp(imageURL)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    const { width, height } = info;

    const blurdata = encode(new Uint8ClampedArray(data), width, height, 4, 4);

    // eslint-disable-next-line no-console
    console.log(`✅ ${imageURL}`);

    return {
      ...(await prev),
      [imageURL]: blurdata,
    };
  }, Promise.resolve(previousBlurData));

  writeFileSync(BLUR_DATA_PATH, JSON.stringify(updatedBlurData, null, '\t'));
};

updateBlurData();
