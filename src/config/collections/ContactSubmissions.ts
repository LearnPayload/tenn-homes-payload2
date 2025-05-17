import { CollectionConfig } from 'payload'

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'agent', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false, // Submissions cannot be updated
    delete: () => false, // Submissions cannot be deleted
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'agent',
      type: 'relationship',
      relationTo: 'agents',
      required: true,
      label: 'Agent',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      required: true,
    },
  ],
}

export default ContactSubmissions
