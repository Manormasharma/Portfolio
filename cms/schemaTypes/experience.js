export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    { name: 'company', type: 'string' },
    { name: 'shortName', type: 'string', description: 'Optional shorter label for the experience tabs' },
    { name: 'role', type: 'string' },
    { name: 'startDate', type: 'string' },
    { name: 'endDate', type: 'string' },
    { name: 'location', type: 'string' },
    { name: 'summary', type: 'text' },
    { name: 'bullets', type: 'array', of: [{ type: 'text' }] },
    { name: 'tech', type: 'array', of: [{ type: 'string' }] },
    { name: 'visible', type: 'boolean', initialValue: true },
    { name: 'order', type: 'number' },
  ],
};
