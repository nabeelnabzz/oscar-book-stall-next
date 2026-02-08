export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
        name: 'discountedPrice',
        title: 'Discounted Price',
        type: 'number',
        description: 'If set, this will be shown as the selling price.'
    },
    {
        name: 'badges',
        title: 'Badges',
        type: 'array',
        of: [{type: 'string'}],
        options: {
            list: [
                {title: 'New', value: 'New'},
                {title: 'Offer', value: 'Offer'},
                {title: 'Popular', value: 'Popular'},
                {title: 'Best Seller', value: 'Best Seller'}
            ]
        }
    },
    {
        name: 'isNew',
        title: 'Is New Arrival?',
        type: 'boolean',
        initialValue: false
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
        name: 'stock',
        title: 'Stock Status',
        type: 'string',
        options: {
            list: [
                {title: 'In Stock', value: 'in_stock'},
                {title: 'Out of Stock', value: 'out_of_stock'},
                {title: 'Pre-order', value: 'pre_order'}
            ]
        },
        initialValue: 'in_stock'
    }
  ],
}
