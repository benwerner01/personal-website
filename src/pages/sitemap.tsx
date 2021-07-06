import { GetServerSideProps, NextPage } from 'next';
import xml from 'xml';
import { CODE_PROJECTS } from '../lib/work/code';
import { getGallery } from '../lib/gallery';

const BASE_URL = 'https://ben-werner.com/';

const SiteMapPage: NextPage = () => null;

type SiteMapURL = {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const prefixZero = (number: number) => (number < 10 ? `0${number}` : number);

// eslint-disable-next-line no-unused-vars
const formatLastMod = (date: Date) => `${date.getFullYear()}-${prefixZero(date.getMonth() + 1)}-${prefixZero(date.getDate())}`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const urls: SiteMapURL[] = [
      { url: '' },
      { url: 'work' },
      ...CODE_PROJECTS.map(({ slug }) => ({
        url: `work/code/${slug}`,
      })),
      { url: 'gallery' },
      ...(await getGallery()).map(({ slug, items }) => [
        { url: `gallery/${slug}` },
        ...items.map((item) => ({ url: `gallery/${slug}/${item.slug}` })),
      ]).flat(),
      { url: 'contact' },
    ];
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml([
      {
        urlset: [
          {
            _attr: {
              xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
            },
          },
          ...urls.map(({ url, lastmod, changefreq }) => ({
            url: [
              { loc: BASE_URL + url },
              lastmod ? { lastmod } : [],
              changefreq ? { changefreq } : [],
            ],
          })),
        ],
      },
    ], {
      declaration: true,
    }));
    res.end();
  }

  return { props: {} };
};

export default SiteMapPage;
