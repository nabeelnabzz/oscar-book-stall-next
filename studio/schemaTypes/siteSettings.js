export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Oscar Edu Hyper Mart'
    },
    {
        name: 'aboutImage',
        title: 'About Page Image',
        type: 'image',
        options: { hotspot: true }
    },
    {
        name: 'contactNumber',
        title: 'WhatsApp Contact Number',
        type: 'string',
        description: 'Format: 919999999999',
        initialValue: '919999999999'
    },
    {
        name: 'quickActions',
        title: 'Quick Actions',
        type: 'array',
        of: [
            {
                type: 'object',
                fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'link', title: 'Link', type: 'string' },
                    { name: 'image', title: 'Action Image/Icon', type: 'image', options: { hotspot: true } }
                ]
            }
        ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare() {
        return {
            title: 'Global Site Settings'
        }
    }
  }
}
