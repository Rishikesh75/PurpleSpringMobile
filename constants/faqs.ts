export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'How do I know your saffron is authentic?',
    answer:
      'Purple Spring sources traceable lots with lab-backed quality checks. Threads should release a deep aroma and color when bloomed in warm water—details ship with your order.',
  },
  {
    id: '2',
    question: 'How should I store saffron at home?',
    answer:
      'Keep threads in the original light-proof jar, sealed, away from heat and moisture. A cool cupboard is ideal.',
  },
  {
    id: '3',
    question: 'Do you ship across India?',
    answer:
      'Yes. Delivery timelines and fees are shown at checkout. Remote PIN codes may need an extra day or two.',
  },
  {
    id: '4',
    question: 'What if my order arrives damaged?',
    answer:
      'Contact us within 48 hours with photos. We will arrange a replacement or refund per our Return and Exchange Policy.',
  },
  {
    id: '5',
    question: 'Are your organic products certified?',
    answer:
      'We work with certified partners where applicable. Certifications for specific SKUs are listed on product pages.',
  },
];
