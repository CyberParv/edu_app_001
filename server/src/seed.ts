import { prisma } from './lib/prisma';

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: await bcrypt.hash('password', 12),
      name: 'Test User'
    }
  });
  console.log('Created user:', user);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });