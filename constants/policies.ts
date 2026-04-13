export type PolicySlug =
  | 'returns-exchange'
  | 'terms'
  | 'privacy'
  | 'cancellation-refund'
  | 'shipping';

export type PolicyContent = {
  title: string;
  paragraphs: string[];
};

export const POLICY_LINKS: { slug: PolicySlug; label: string }[] = [
  { slug: 'returns-exchange', label: 'Return and Exchange Policy' },
  { slug: 'terms', label: 'Terms and Conditions' },
  { slug: 'privacy', label: 'Privacy Policy' },
  { slug: 'cancellation-refund', label: 'Cancellation and Refund Policy' },
  { slug: 'shipping', label: 'Shipping Policy' },
];

export const POLICIES: Record<PolicySlug, PolicyContent> = {
  'returns-exchange': {
    title: 'Return and Exchange Policy',
    paragraphs: [
      'We want you to love every Purple Spring purchase. If an item arrives damaged, incorrect, or unfit for use, contact us within 48 hours of delivery with your order ID and clear photos.',
      'Approved returns may be replaced or refunded to the original payment method, subject to inspection. Opened food products may be excluded from return except where required by law or when the product is defective.',
      'Exchanges for another SKU are offered when stock allows. Shipping costs for change-of-mind returns may be borne by the customer unless stated otherwise at checkout.',
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    paragraphs: [
      'By using the Purple Spring website or mobile app, you agree to these terms. Product descriptions, prices, and availability may change; we correct errors when identified.',
      'You are responsible for accurate delivery details. Risk of loss passes to you upon handover to the carrier unless we state otherwise.',
      'Content on our channels is for information and not medical advice. Disputes are subject to the laws of India; courts at our registered place of business shall have jurisdiction unless a mandatory rule says otherwise.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'We collect information you provide (name, contact, address) and technical data needed to run the service (device, logs). We use it to fulfill orders, support you, and improve the product.',
      'We do not sell your personal data. Service providers who help us host, ship, or analyze data are bound by confidentiality and process data only as instructed.',
      'You may request access or correction of your data where applicable. We retain data as long as needed for legal, tax, or operational reasons, then delete or anonymize it.',
    ],
  },
  'cancellation-refund': {
    title: 'Cancellation and Refund Policy',
    paragraphs: [
      'You may cancel an order before it ships from our facility. After dispatch, cancellation follows the Return and Exchange Policy.',
      'Refunds for approved cancellations or defective items are processed to the original payment method within a reasonable period after we confirm receipt and inspection.',
      'Promotional or bundled offers may have specific cancellation rules shown at purchase.',
    ],
  },
  shipping: {
    title: 'Shipping Policy',
    paragraphs: [
      'Orders are packed in light-proof, protective packaging. Standard and express options, where available, are shown at checkout with estimated delivery windows.',
      'Carriers may update tracking; delays due to weather, holidays, or remote locations are outside our direct control but we will help you follow up.',
      'Please verify your address at checkout. Re-shipment fees may apply if a package is returned due to incorrect details.',
    ],
  },
};

export function isPolicySlug(id: string): id is PolicySlug {
  return id in POLICIES;
}
