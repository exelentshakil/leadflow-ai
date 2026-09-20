import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode = 'wife', provider = 'openai' } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = mode === 'wife'
      ? `You are an expert, super warm and empathetic Bengali educator teaching Machine Learning, Deep Learning, and AI.
Target audience: A completely non-technical person (like a beloved wife, home manager, or someone with zero coding background).
Rules:
1. Explain in sweet, fluent, natural Bengali (বাংলা).
2. Never use scary formulas or raw code.
3. ALWAYS use household metaphors: kitchen cooking (রান্নাঘর, চালে-ডালে খিচুড়ি), grocery shopping (কাঁচাবাজারের দরদাম), child learning (বাচ্চা হাঁটা বা কথা বলা শেখা), doctor-patient, or village/family situations.
4. Keep it short, punchy (2-4 paragraphs maximum), extremely fun, and memorable.
5. End with a sweet 1-line takeaway summary: "সহজ কথায়: ..."`
      : `You are an elite Principal AI & Systems Architect (Bangla + English technical jargon).
Target audience: Senior Software Engineers, Systems Architects, and Upwork Enterprise Bidders ($100+/hr).
Rules:
1. Explain in crisp Bengali mixed naturally with English technical terms (PyTorch, tensors, weights, loss functions, vLLM, Docker, AWS, LoRA, CUDA).
2. Connect directly to real-world software engineering, GPU VRAM constraints, and enterprise client requirements.
3. Give concrete 1-2 lines of Python/PyTorch/FastAPI idiom or architectural flow.
4. Highlight why an enterprise client pays $5,000+ for this and how to pitch it to Upwork clients.
5. Keep it high-signal, zero fluff.`;

    // Try primary requested provider or fallback
    let replyText = '';
    let usedProvider = provider;
    let latencyMs = 0;
    const startTime = Date.now();

    if (provider === 'openai' && openAiKey) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 800,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          replyText = data.choices?.[0]?.message?.content || '';
          usedProvider = 'OpenAI (GPT-4o-mini)';
        }
      } catch (err) {
        console.error('OpenAI call failed, trying Gemini fallback:', err);
      }
    }

    // Gemini fallback or primary
    if (!replyText && geminiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: `${systemPrompt}\n\nUser Question: ${prompt}` },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
              },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          usedProvider = 'Google Gemini (2.0 Flash)';
        }
      } catch (err) {
        console.error('Gemini call failed:', err);
      }
    }

    latencyMs = Date.now() - startTime;

    // Fallback if no API response
    if (!replyText) {
      replyText = mode === 'wife'
        ? `মেশিন লার্নিং আসলে মানুষের শেখার মতোই সহজ! যেমন আপনি যখন ছোটবেলায় চা বানানো শিখেছিলেন, প্রথমে হয়তো চিনি বেশি বা কম হতো। বারবার বানাতে বানাতে আপনার হাত নিখুঁত হয়ে গেছে। ঠিক তেমনই কম্পিউটারকে অনেক তথ্য (ডাটা) দিলে সে ভুল করতে করতে নিজেই সঠিক নিয়ম বের করে নেয়।\n\nসহজ কথায়: ভুল থেকে নিজে নিজে শিখে পাকা রাঁধুনি হওয়াই হলো মেশিন লার্নিং!`
        : `মেশিন লার্নিং হলো এমন একটি প্যারাডাইম যেখানে এক্সপ্লিজিটলি if/else কোড লেখার বদলে ডাটা এবং লেবেল ইনপুট দিয়ে মডেলের প্যারামিটার (Weights & Biases) অপটিমাইজ করা হয়।\n\nArchitecture: Data -> Feature Engineering (Pandas) -> Model (PyTorch / Scikit) -> Loss Function -> Optimizer (Adam) -> Evaluated Weights.\n\nUpwork Value: এন্টারপ্রাইজে ক্লায়েন্টরা স্ট্যাটিক লজিকের বদলে ডায়নামিক প্রেডিকশন (Fraud, Churn, Recommendation) চায়, যা vLLM + FastAPI দিয়ে সার্ভ করা হয়।`;
      usedProvider = 'Deterministic Local Engine';
    }

    return NextResponse.json({
      reply: replyText,
      provider: usedProvider,
      latencyMs,
      mode,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Mentor error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
