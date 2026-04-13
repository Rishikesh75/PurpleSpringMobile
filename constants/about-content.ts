/** Replace with your channel URL (e.g. https://www.youtube.com/@YourHandle or /channel/CHANNEL_ID). */
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@PurpleSpring';

/** YouTube IDs — replace with your own uploads when ready */
export const youtubeVideos = [
  {
    videoId: 'jfKfPfyJRdk',
    title: 'From our farms',
    description: 'See how we work with growers and bring saffron from field to pack.',
  },
  {
    videoId: 'aqz-KE-bpKQ',
    title: 'Events & showcases',
    description:
      'Moments from expos and programs where we meet customers and partners.',
  },
  {
    videoId: 'eRsGyueBVgA',
    title: 'Quality you can trust',
    description: 'A closer look at what makes Purple Spring products stand out.',
  },
] as const;

export const experiences = [
  {
    tag: 'Expo',
    headline: 'Expo @ SUFALAM 2025',
    location: 'Sonipat, Haryana',
    description:
      'We represented Purple Spring at SUFALAM 2025—connecting with visitors, sharing our story of premium saffron and organic products, and learning alongside fellow agri and food entrepreneurs.',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    imageAlt: 'Exhibition and expo hall atmosphere',
  },
  {
    tag: 'Program',
    headline: 'Empowering Women Entrepreneurs Through Digital Transformation',
    location: 'SPMVV — WIFI DX',
    description:
      'We participated in this program focused on digital skills and entrepreneurship—aligning with our mission to grow thoughtfully and support women-led innovation in food and wellness.',
    image:
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&q=80',
    imageAlt: 'Collaborative learning and digital workshop setting',
  },
  {
    tag: 'Incubator',
    headline: 'ANGRAU POSHAN Incubator — RKVY',
    location: 'Nutrition & agri innovation',
    description:
      'Our engagement with the ANGRAU POSHAN incubator under RKVY reflects our commitment to nutrition-forward, farm-linked products and continuous learning within India’s agricultural ecosystem.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
    imageAlt: 'Agricultural fields and sustainable farming',
  },
] as const;

export type AboutValueIcon =
  | 'leaf.fill'
  | 'medal.fill'
  | 'person.3.fill'
  | 'heart.fill';

export const values: ReadonlyArray<{
  icon: AboutValueIcon;
  title: string;
  description: string;
}> = [
  {
    icon: 'leaf.fill',
    title: '100% Organic',
    description:
      'All our products are certified organic, free from pesticides and chemicals.',
  },
  {
    icon: 'medal.fill',
    title: 'Premium Quality',
    description:
      'We source only the finest grade products, handpicked and carefully selected.',
  },
  {
    icon: 'person.3.fill',
    title: 'Fair Trade',
    description:
      'We work directly with farmers, ensuring fair prices and sustainable practices.',
  },
  {
    icon: 'heart.fill',
    title: 'Made with Love',
    description: 'Every product is handled with care from farm to your doorstep.',
  },
];
