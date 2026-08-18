export default {
  name: 'certification',
  title: 'Certification / Certificate / Achievement',
  type: 'document',
  fields: [
    {
      name: 'type',
      type: 'string',
      options: { list: ['certification', 'certificate', 'achievement'] },
    },
    { name: 'title', type: 'string' },
    { name: 'date', type: 'string' },
    { name: 'issuer', type: 'string' },
    { name: 'url', type: 'url' },
    { name: 'order', type: 'number' },
  ],
};
