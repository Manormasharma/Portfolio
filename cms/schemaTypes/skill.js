export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'icon', type: 'image' },
    { name: 'category', type: 'string' },
    { name: 'order', type: 'number' },
    { name: 'proficiency', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
  ],
};
