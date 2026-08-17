import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as FavoriteModel from './favorites';
import { NotFoundError, ValidationError } from './errors';

export async function createFavorite(data: {
  courseCode: string;
  courseName: string;
  rating?: number;
  note?: string;
}) {
  const courseCode =
    typeof data.courseCode === 'string' ? data.courseCode.trim() : '';
  const courseName =
    typeof data.courseName === 'string' ? data.courseName.trim() : '';

  if (!courseCode) {
    throw new ValidationError('รหัสวิชาห้ามเป็นค่าว่าง');
  }
  if (!courseName) {
    throw new ValidationError('ชื่อวิชาห้ามเป็นค่าว่าง');
  }
  if (
    data.rating !== undefined &&
    (typeof data.rating !== 'number' ||
      data.rating < 1 ||
      data.rating > 5)
  ) {
    throw new ValidationError('rating ต้องเป็นตัวเลข 1-5');
  }

  try {
    return await FavoriteModel.addFavorite({
      courseCode,
      courseName,
      rating: data.rating,
      note: data.note,
    });
  } catch (err) {
    if (
      err instanceof PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      throw new ValidationError(
        `รหัสวิชา "${courseCode}" ถูกบันทึกไว้แล้วในรายการโปรด`
      );
    }
    throw err;
  }
}

export async function listFavorites() {
  return FavoriteModel.getFavorites();
}

export async function findFavoriteById(id: string) {
  const fav = await FavoriteModel.getFavoriteById(id);
  if (!fav) {
    throw new NotFoundError('ไม่พบรายการโปรดนี้');
  }
  return fav;
}

export async function editFavorite(
  id: string,
  updates: Partial<{
    courseName: string;
    rating: number;
    note: string;
  }>
) {
  if (
    updates.courseName !== undefined &&
    updates.courseName.trim() === ''
  ) {
    throw new ValidationError('ชื่อวิชาห้ามเป็นค่าว่าง');
  }
  if (
    updates.rating !== undefined &&
    (typeof updates.rating !== 'number' ||
      updates.rating < 1 ||
      updates.rating > 5)
  ) {
    throw new ValidationError('rating ต้องเป็นตัวเลข 1-5');
  }

  const payload: { courseName?: string; rating?: number; note?: string } = {};
  if (updates.courseName !== undefined)
    payload.courseName = updates.courseName.trim();
  if (updates.rating !== undefined) payload.rating = updates.rating;
  if (updates.note !== undefined) payload.note = updates.note;

  try {
    return await FavoriteModel.updateFavorite(id, payload);
  } catch (err) {
    if (
      err instanceof PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw new NotFoundError('ไม่พบรายการโปรดนี้');
    }
    throw err;
  }
}

export async function removeFavorite(id: string) {
  try {
    await FavoriteModel.deleteFavorite(id);
    return true;
  } catch (err) {
    if (
      err instanceof PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw new NotFoundError('ไม่พบรายการโปรดนี้');
    }
    throw err;
  }
}
