import { PrismaClient, CallStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data in order of dependencies
  await prisma.reaction.deleteMany();
  await prisma.reply.deleteMany();
  await prisma.message.deleteMany();
  await prisma.call.deleteMany();
//   await prisma.user.deleteMany();

  // Seed Users
//   const users = await prisma.user.createMany({
//     data: [
//       {
//         id: 4,
//         username: 'awd',
//         email: 'awd@gmail.com',
//         password: '$2b$10$Orh5/1.fk1JVxras3pKeD.fkL7yotTFQvRmjvM/jIEV74MuHdFo1q',
//         createdAt: new Date('2025-06-06T09:33:15.155Z'),
//       },
//       {
//         id: 5,
//         username: 'wow',
//         email: 'wow@gmail.com',
//         password: '$2b$10$IFm1wv0iQ70PJkU8heEOne6SpwsEotICq5Lqakddu80eBIuVF2Tba',
//         createdAt: new Date('2025-06-06T09:34:01.339Z'),
//       },
//     ],
//     skipDuplicates: true,
//   });

  // Fetch users
  const user1 = await prisma.user.findUnique({ where: { id: 4 } });
  const user2 = await prisma.user.findUnique({ where: { id: 5 } });

  if (!user1 || !user2) {
    throw new Error('Users not found');
  }

  // Seed Messages
  const message1 = await prisma.message.create({
    data: {
      content: 'Hello, how are you?',
      senderId: user1.id,
      receiverId: user2.id,
      fileUrl: null,
      imageUrl: null,
    },
  });

  const message2 = await prisma.message.create({
    data: {
      content: 'I am good! What about you?',
      senderId: user2.id,
      receiverId: user1.id,
    },
  });

  // Seed Reactions
  await prisma.reaction.createMany({
    data: [
      {
        emoji: '👍',
        userId: user1.id,
        messageId: message2.id,
        createdAt: new Date(),
      },
      {
        emoji: '😂',
        userId: user2.id,
        messageId: message1.id,
        createdAt: new Date(),
      },
    ],
  });

  // Seed Replies
  await prisma.reply.createMany({
    data: [
      {
        content: 'Nice to hear!',
        senderId: user1.id,
        originalMessageId: message2.id,
        createdAt: new Date(),
      },
    ],
  });

  // Seed Calls
  await prisma.call.createMany({
    data: [
      {
        callerId: user1.id,
        calleeId: user2.id,
        status: CallStatus.Accepted,
        startedAt: new Date(),
        endedAt: new Date(new Date().getTime() + 60000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        callerId: user2.id,
        calleeId: user1.id,
        status: CallStatus.Missed,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log('✅ All data seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
