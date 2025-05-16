import { Payload } from 'payload'

export const seedAgents = async (payload: Payload) => {
  await payload.create({
    collection: 'agents',
    data: {
      email: 'agent@example.com',
      password: 'agent123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      licenses: [
        {
          licenseNumber: '1234567890',
          state: 'TN',
        },
      ],
    },
  })
}
