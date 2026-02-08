export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
        name: 'layout',
        title: 'Content Layout',
        type: 'string',
        options: {
            list: [
                {title: 'Center', value: 'center'},
                {title: 'Left Aligned', value: 'left'},
                {title: 'Right Aligned', value: 'right'}
            ]
        },
        initialValue: 'center'
    },
    {
        name: 'textColor',
        title: 'Text Color',
        type: 'string',
        options: {
            list: [
                {title: 'White', value: 'text-white'},
                {title: 'Black', value: 'text-black'},
                {title: 'Navy Blue', value: 'text-[#0f4c81]'}
            ]
        },
        initialValue: 'text-white'
    },
    {
        name: 'overlayOpacity',
        title: 'Overlay Opacity (%)',
        type: 'number',
        validation: Rule => Rule.min(0).max(100),
        initialValue: 20
    },
    {
      name: 'link',
      title: 'Link URL',
      type: 'string',
    },
    {
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
        initialValue: 'Shop Collection'
    }
  ],
}
