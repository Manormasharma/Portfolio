export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'tagline', type: 'string' },
    { name: 'heroIntro', type: 'text' },
    { name: 'heroBioBullets', type: 'array', of: [{ type: 'string' }] },
    { name: 'aboutIntro', type: 'text' },
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
          { name: 'url', type: 'url' },
        ],
      }],
    },
    { name: 'resumePdf', type: 'file' },
  ],
};
