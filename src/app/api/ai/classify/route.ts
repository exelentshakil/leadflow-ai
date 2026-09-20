import { NextRequest, NextResponse } from 'next/server';
import { qualifyInboundLead, ClassifyParams } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const params: ClassifyParams = {
      title: String(body.title || 'Inbound Website Form Submission'),
      content: String(body.content || ''),
      destinationCrm: body.destinationCrm,
      simulatedOutage: Boolean(body.simulatedOutage),
    };

    const result = await qualifyInboundLead(params);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown qualification error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
