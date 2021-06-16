import { readdirSync, readFileSync, writeFileSync } from 'fs';
import sharp from 'sharp';

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
    const blurredImage = await sharp(imageURL)
      .blur()
      .resize(32)
      .jpeg()
      .toBuffer();

    // eslint-disable-next-line no-console
    console.log(`✅ ${imageURL}`);

    return {
      ...(await prev),
      [imageURL]: `data:image/jpeg;base64,${blurredImage.toString('base64')}`,
    };
  }, Promise.resolve(previousBlurData));

  writeFileSync(BLUR_DATA_PATH, JSON.stringify(updatedBlurData, null, '\t'));
};

updateBlurData();
