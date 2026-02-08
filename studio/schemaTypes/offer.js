export default {
    name: 'offer',
    title: 'Offer',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Offer Title',
            type: 'string',
            description: 'e.g., Back to School Sale'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'e.g., Flat 15% off on stationery sets'
        },
        {
            name: 'discountCode',
            title: 'Discount Code (Optional)',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Offer Image',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'validUntil',
            title: 'Valid Until',
            type: 'datetime'
        },
        {
            name: 'isActive',
            title: 'Is Active?',
            type: 'boolean',
            initialValue: true
        }
    ]
}
