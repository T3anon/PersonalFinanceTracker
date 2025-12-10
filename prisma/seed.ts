import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcrypt'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const password = await hash('test', 12)
  
  // Delete existing user first
  await prisma.$executeRawUnsafe(`DELETE FROM public."User" WHERE email = 'test@test.com'`)
  
  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      name: 'Test User',
      password
    }
  })
  console.log({ user })
  const category = await prisma.category.create({
    data: {
      cost: 100,
      place: 'Walmart',
      date: new Date("2025-12-10T14:43:49.204Z"),
      userId: user.id
    }
  })
  console.log({ category })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })