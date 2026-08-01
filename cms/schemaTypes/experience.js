export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    { name: 'company', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'startDate', type: 'string' },
    { name: 'endDate', type: 'string' },
    { name: 'location', type: 'string' },
    { name: 'bullets', type: 'array', of: [{ type: 'text' }] },
    { name: 'visible', type: 'boolean', initialValue: true },
    { name: 'order', type: 'number' },
  ],
};
