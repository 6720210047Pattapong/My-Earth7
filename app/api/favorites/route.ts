import { createFavorite, listFavorites } from '@/lib/favoriteService';
import { ValidationError } from '@/lib/errors';

export async function GET() {
  const favorites = await listFavorites();
  return Response.json({ favorites });
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const saved = await createFavorite(body);
    return Response.json({ ok: true, item: saved }, { status: 201 });
  } catch (err) {
    const status = err instanceof ValidationError ? 400 : 500;
    return Response.json({ error: (err as Error).message }, { status });
  }
}
