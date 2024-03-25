import type { CollectionConfig } from 'payload/types'

const Channels: CollectionConfig = {
  slug: 'channels',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}

export default Channels
