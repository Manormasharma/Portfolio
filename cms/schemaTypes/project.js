export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'projectName', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'projectName' } },
    { name: 'desc', type: 'text' },
    { name: 'caseStudy', type: 'array', of: [{ type: 'block' }] },
    { name: 'projectImage', type: 'image' },
    { name: 'url', type: 'url' },
    { name: 'techlist', type: 'array', of: [{ type: 'string' }] },
    { name: 'order', type: 'number' },
  ],
};
