import { CollectionConfig } from "payload/types";

import { anyone } from "../../access/anyone";
import { admins } from "../../access/admins";


const Products: CollectionConfig = {
    slug: 'products',
    access: {
        read: anyone,
        create: admins,
        update: admins,
        delete: admins
    },
    fields: [
        {
            name: 'productId',
            type: 'text',
            unique: true
        },
        {
            name: 'name',
            type: 'text'
        },
        {
            name: 'productSlug',
            type: 'text'
        },
        {
            name: 'extrafield',
            type: 'text'
        }
        // Add more fields as needed
    ]
}

export default Products;