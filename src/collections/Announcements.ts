import { CollectionConfig } from "payload/types";

export const Announcements: CollectionConfig = {
    slug: 'anouncements',
    access: {
        read: ()=> true
    },
    fields: [
        {
            name: 'channel',
            type: 'relationship',
            relationTo: 'channels',
            hasMany: false,
            admin: {
              position: 'sidebar',
            },
          },
        
        {
            name: 'message',
            type: 'text'
        },
        {
            name: 'priority',
            type: 'number'
        },
        {
            name: 'style',
            type: 'select',
            defaultValue: ['flash'],
            options: [
                {
                    label: 'flash',
                    value: 'flash'
                },
                {
                    label: 'slide-left',
                    value: 'slide-left'
                },
                {
                    label: 'slide-right',
                    value: 'slide-right'
                }
            ]
        }
        
        ]
}