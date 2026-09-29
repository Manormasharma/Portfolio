export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'tagline', type: 'string' },
    { name: 'rotatingRoles', type: 'array', of: [{ type: 'string' }] },
    { name: 'availability', type: 'string' },
    { name: 'relocation', type: 'string' },
    { name: 'location', type: 'string' },
    { name: 'yearsExperience', type: 'string' },
    {
      name: 'metrics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'key', type: 'string' },
          { name: 'value', type: 'number' },
          { name: 'prefix', type: 'string' },
          { name: 'suffix', type: 'string' },
          { name: 'label', type: 'string' },
        ],
      }],
    },
    {
      name: 'pillars',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'desc', type: 'text' }] }],
    },
    { name: 'coreSkills', type: 'array', of: [{ type: 'string' }] },
    { name: 'languages', type: 'array', of: [{ type: 'string' }] },
    { name: 'heroIntro', type: 'text' },
    { name: 'bioParagraphs', type: 'array', of: [{ type: 'text' }] },
    { name: 'summary', type: 'text' },
    { name: 'contactEmail', type: 'string' },
    {
      name: 'socialLinks',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', type: 'string' },
          { name: 'label', type: 'string' },
          { name: 'url', type: 'url' },
        ],
      }],
    },
  ],
};
