import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ล้างข้อมูลเก่าก่อนเพื่อป้องกัน ID/Email ซ้ำ
  await prisma.message.deleteMany();

  // สร้างข้อมูลเริ่มต้น 3 รายการ
  const created = await prisma.message.createMany({
    data: [
      {
        name: 'Somchai Jaidee',
        email: 'somchai@example.com',
        message: 'สอบถามข้อมูลเกี่ยวกับระบบเพิ่มเติมครับ',
      },
      {
        name: 'Somsri Rakdee',
        email: 'somsri@example.com',
        message: 'ต้องการติดต่อสอบถามเรื่องการลงทะเบียน',
      },
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'Hello, I would like to inquire about the service.',
      },
    ],
  });

  // ล้างข้อมูล Task เก่าก่อน
  await prisma.task.deleteMany();

  // สร้างข้อมูล Task เริ่มต้น 3 รายการสำหรับ Workshop
  const createdTasks = await prisma.task.createMany({
    data: [
      {
        title: 'ออกแบบ Prisma Schema สำหรับ Task',
        completed: true,
      },
      {
        title: 'เขียน CRUD API และ Error Handling',
        completed: false,
      },
      {
        title: 'ทดสอบ API ผ่าน REST Client',
        completed: false,
      },
    ],
  });

  console.log('🌱 Task seed data inserted successfully!');
  console.log('Task inserted count:', createdTasks.count);

  // ล้างข้อมูล Favorite เก่าก่อน
  await prisma.favorite.deleteMany();

  // สร้างข้อมูล Favorite เริ่มต้น 3 รายการสำหรับ Workshop
  const createdFavorites = await prisma.favorite.createMany({
    data: [
      {
        courseCode: '0214321',
        courseName: 'Web Dev & Design',
        rating: 5,
        note: 'วิชาที่สนุกมาก ได้ลองทำ project จริง',
      },
      {
        courseCode: '0214211',
        courseName: 'Data Structures',
        rating: 4,
        note: 'ยากแต่มีประโยชน์มาก',
      },
      {
        courseCode: '0214301',
        courseName: 'Database Systems',
        rating: 4,
        note: null,
      },
    ],
  });

  console.log('🌱 Favorite seed data inserted successfully!');
  console.log('Favorite inserted count:', createdFavorites.count);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });