import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcrypt'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Delete existing user
  await prisma.user.deleteMany({
    where: { email: 'test@test.com' }
  })
  console.log('Deleted old user')

  // Create new user with fresh bcrypt hash
  const password = await hash('test', 12)
  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      name: 'Test User',
      password
    }
  })
  console.log('Created new user:', user)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
