# My-Earth7

> 6720210047Pattapong/My-Earth7

โปรเจกต์ Next.js สำหรับวิชา 0214321 Web Dev & Design — รวม Lab และ Workshop ตั้งแต่ Week 1 ถึง Week 9

## Getting Started

ติดตั้ง dependencies:

```bash
npm install
```

รัน migration และ seed ข้อมูล:

```bash
npx prisma migrate deploy
npx prisma db seed
```

รัน dev server:

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

## API Endpoints

### Favorites (รายการวิชาโปรด)
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/favorites` | ดูรายการวิชาโปรดทั้งหมด |
| POST | `/api/favorites` | เพิ่มวิชาโปรดใหม่ |
| GET | `/api/favorites/[id]` | ดูวิชาโปรดรายการเดียว |
| PATCH | `/api/favorites/[id]` | แก้ไขวิชาโปรด |
| DELETE | `/api/favorites/[id]` | ลบวิชาโปรด |

### Tasks
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/tasks` | ดู task ทั้งหมด |
| POST | `/api/tasks` | สร้าง task ใหม่ |
| GET | `/api/tasks/[id]` | ดู task รายการเดียว |
| PATCH | `/api/tasks/[id]` | แก้ไข task |
| DELETE | `/api/tasks/[id]` | ลบ task |

### Messages
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/messages` | ดูข้อความทั้งหมด |
| POST | `/api/messages` | ส่งข้อความใหม่ |

## Tech Stack

- **Next.js 16** (App Router)
- **Prisma ORM** + **SQLite**
- **TypeScript**
- **Tailwind CSS**

## GitHub

[https://github.com/6720210047Pattapong/My-Earth7](https://github.com/6720210047Pattapong/My-Earth7)
