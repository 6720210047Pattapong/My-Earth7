import { findFavoriteById, editFavorite, removeFavorite } from '@/lib/favoriteService';
import { NotFoundError, ValidationError } from '@/lib/errors';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const fav = await findFavoriteById(id);
    return Response.json(fav);
  } catch (err) {
    const status = err instanceof NotFoundError ? 404 : 500;
    return Response.json({ error: (err as Error).message }, { status });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  try {
    const updated = await editFavorite(id, body);
    return Response.json(updated);
  } catch (err) {
    const status =
      err instanceof NotFoundError
        ? 404
        : err instanceof ValidationError
        ? 400
        : 500;
    return Response.json({ error: (err as Error).message }, { status });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await removeFavorite(id);
    return Response.json({ ok: true });
  } catch (err) {
    const status = err instanceof NotFoundError ? 404 : 500;
    return Response.json({ error: (err as Error).message }, { status });
  }
}
