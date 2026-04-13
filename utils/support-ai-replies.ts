import { CONTACT } from '@/constants/contact';

let msgId = 0;
export function nextMessageId(): string {
  msgId += 1;
  return `m-${msgId}-${Date.now().toString(36)}`;
}

/**
 * Demo “AI agent” replies — replace with a real LLM API when ready.
 */
export function generateAssistantReply(userMessage: string): string {
  const t = userMessage.trim().toLowerCase();
  if (!t) {
    return "I didn't catch that—what would you like to know about Purple Spring?";
  }
  if (/^(hi|hello|hey|good\s+(morning|afternoon|evening))\b/.test(t)) {
    return "Hello! I'm your Purple Spring assistant. Ask me about saffron, orders, shipping, or our organic range.";
  }
  if (t.includes('order') || t.includes('delivery') || t.includes('track')) {
    return 'Open Profile → Your orders to see purchases. For in-progress shipments, tap Track on an order. This is a demo app—real ETAs appear at checkout on the live store.';
  }
  if (t.includes('ship') || t.includes('pin') || t.includes('pincode')) {
    return 'We ship across India; timelines depend on your PIN. Save your address under Profile so checkout can estimate delivery.';
  }
  if (t.includes('return') || t.includes('refund') || t.includes('exchange')) {
    return 'Return and refund rules are under About → Policies. For damaged or wrong items, contact us within 48 hours of delivery with your order ID.';
  }
  if (t.includes('organic') || t.includes('saffron') || t.includes('quality') || t.includes('kashmir')) {
    return 'We focus on traceable, premium saffron and organic products. Tell me if you need cooking tips (biryani, desserts, tea) or help choosing a grade.';
  }
  if (t.includes('contact') || t.includes('email') || t.includes('phone') || t.includes('human')) {
    return `For a human: ${CONTACT.email} or ${CONTACT.phoneDisplay}. I'm here 24/7 for quick questions.`;
  }
  if (t.includes('price') || t.includes('pay') || t.includes('upi')) {
    return 'Browse the Shop tab for prices. Checkout supports UPI in this demo; COD and cards are coming soon.';
  }
  return "Thanks for your message. I can help with products, orders, shipping, and policies—or point you to About → FAQs. What would you like to know?";
}
