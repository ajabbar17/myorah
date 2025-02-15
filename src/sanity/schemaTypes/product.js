export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'actualPrice',
      title: 'Actual Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'discountedPrice',
      title: 'Discounted Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Bracelet', value: 'bracelet' },
          { title: 'Pendant', value: 'pendant' },
          { title: 'Ring', value: 'ring' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sizes',
      title: 'Sizes (for rings only)',
      type: 'array',
      of: [{ type: 'number' }],
      hidden: ({ parent }) => parent?.category !== 'ring', // Only show for rings
      options: {
        list: [6, 7, 8].map((size) => ({ title: size.toString(), value: size })),
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: async (doc) => {
          // Generate a random string
          const randomStr = Math.random().toString(36).substring(2, 7);
          // Combine name with random string
          return `${doc.name}-${randomStr}`;
        },
        maxLength: 100,
      },
      validation: (Rule) => Rule.required(),
    }
  ],
  // Optional: Add a preview to show the full slug in the studio
  preview: {
    select: {
      title: 'name',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug,
      };
    },
  },
};
