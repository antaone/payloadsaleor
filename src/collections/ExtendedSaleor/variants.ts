import { CollectionConfig } from "payload/types";

import { anyone } from "../../access/anyone";
import { admins } from "../../access/admins";

const Variants: CollectionConfig = {
    slug: 'variants',
    access: {
        read: anyone,
        create: admins,
        update: admins,
        delete: admins
    },
    fields: [
        {
            name: 'variantId',
            type: 'text',
            unique: true
        },
        {
            name: 'variantName',
            type: 'text'
        },
        {
            name: 'productId',
            type: 'relationship',
            relationTo: 'products', 
            hasMany: false,
            required: true
        },
        {
            name: 'channels',
            type: 'json'
        },
        {
            name: 'extraone',
            type: 'text'
        }
    ]
}


export default Variants;