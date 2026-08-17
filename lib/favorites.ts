import { prisma } from './prisma';

export async function addFavorite(data: {
  courseCode: string;
  courseName: string;
  rating?: number;
  note?: string;
}) {
  return prisma.favorite.create({
    data: {
      courseCode: data.courseCode,
      courseName: data.courseName,
      rating: data.rating ?? 3,
      note: data.note,
    },
  });
}

export async function getFavorites() {
  return prisma.favorite.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getFavoriteById(id: string) {
  return prisma.favorite.findUnique({
    where: { id },
  });
}

export async function updateFavorite(
  id: string,
  updates: {
    courseName?: string;
    rating?: number;
    note?: string;
  }
) {
  return prisma.favorite.update({
    where: { id },
    data: updates,
  });
}

export async function deleteFavorite(id: string) {
  return prisma.favorite.delete({
    where: { id },
  });
}
