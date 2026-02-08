export default {
  name: 'story',
  title: 'Community Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author/User Name',
      type: 'string',
    },
    {
        name: 'image',
        title: 'Story Image',
        type: 'image',
        options: { hotspot: true }
    },
    {
        name: 'role',
        title: 'User Role/Tag',
        type: 'string',
        description: 'e.g., Student, Artist, Architect'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    }
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'title',
      media: 'image'
    }
  }
}
