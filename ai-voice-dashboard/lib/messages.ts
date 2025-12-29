export const CONVERSATION_PAIRS: Array<{ user: string; agent: string }> = [
  {
    user: "Hello, I need help tracking my order.",
    agent: "Of course! I'd be happy to help you track your order. Could you please provide your order number?"
  },
  {
    user: "Sure, it's ORD-2024-5847.",
    agent: "Thank you! Let me look that up for you. One moment please."
  },
  {
    user: "How long will it take?",
    agent: "I'm checking the system now. It looks like your order was shipped yesterday."
  },
  {
    user: "That's great! When can I expect it?",
    agent: "According to the carrier, it is scheduled for delivery by this Friday."
  },
  {
    user: "Can I change the delivery address?",
    agent: "I can simulate a request for you. Please confirm the new zip code."
  },
  {
    user: "The new zip code is 90210.",
    agent: "Got it. I've updated the delivery instructions for the carrier."
  },
  {
    user: "Is there a tracking link?",
    agent: "Yes, I've sent the tracking link to your email address on file."
  },
  {
    user: "I didn't receive an email.",
    agent: "Let me double-check. Ah, I can resend it now. Did you get it?"
  },
  {
    user: "Yes, got it now. Thanks.",
    agent: "You're very welcome! Is there anything else I can help you with regarding this order?"
  },
  {
    user: "What if I'm not home on Friday?",
    agent: "You can use the tracking link to request a hold at a nearby location."
  },
  {
    user: "That sounds convenient.",
    agent: "It is! Many customers find it helpful to pick up at their leisure."
  },
  {
    user: "Do you have express shipping options?",
    agent: "We do offer simulated express shipping for future orders."
  },
  {
    user: "Okay, good to know.",
    agent: "Is there anything else I can assist you with today?"
  },
  {
    user: "No, that's all. Thank you.",
    agent: "It was my pleasure assisting you. Have a wonderful day!"
  },
  {
    user: "Goodbye.",
    agent: "Goodbye! Feel free to reach out if you need anything else."
  },
  {
    user: "Wait, one more question.",
    agent: "Certainly, I'm still here. What's your question?"
  },
  {
    user: "Can I return items?",
    agent: "Yes, simulated returns are accepted within 30 days of delivery."
  },
  {
    user: "Perfect, thanks again.",
    agent: "You're welcome. Take care!"
  },
  {
    user: "Bye.",
    agent: "Bye for now!"
  },
  {
    user: "[Disconnect]",
    agent: "Call ended."
  }
];
