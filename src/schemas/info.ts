export default {
  name: 'info',
  type: 'document',
  title: 'Info',
  fields: [
    {
      name: 'firstName',
      type: 'string',
      title: 'First Name'
    },
    {
      name: 'lastName',
      type: 'string',
      title: 'Last Name'
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description'
    },
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [{ type: 'reference', to: { type: 'skills' } }]
    },
    {
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [{ type: 'reference', to: { type: 'projects' } }]
    },
    {
      name: 'resume',
      type: 'string',
      title: 'Resume'
    },
    {
      name: 'socials',
      type: 'array',
      title: 'Socials',
      of: [{ type: 'reference', to: { type: 'socials' } }]
    },
    {
      name: 'image',
      type: 'image',
      title: 'Profile Image'
    }
  ]
};
