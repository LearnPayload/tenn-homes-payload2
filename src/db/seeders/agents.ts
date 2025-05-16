import { faker } from '@faker-js/faker'
import { Payload } from 'payload'

export const seedAgents = async (payload: Payload) => {
  const media = await payload.find({
    collection: 'media',
    where: {
      filename: {
        contains: 'agent',
      },
    },
    limit: 100,
  })

  const profilePhoto = faker.helpers.arrayElement(media.docs)

  Array.from({ length: 10 }).forEach(async (_, i) => {
    await payload.create({
      collection: 'agents',
      data: {
        email: `agent${i}@example.com`,
        password: 'agent123',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        officePhone: faker.phone.number(),
        contactEmail: faker.internet.username() + '@example.com',
        licenses: [
          {
            licenseNumber: faker.string.uuid(),
            state: 'TN',
          },
        ],
        title: faker.person.jobTitle(),
        profilePhoto: profilePhoto.id,
      },
    })
  })
}
