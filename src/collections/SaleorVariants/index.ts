import { CollectionConfig } from "payload/types";
import { admins } from "../../access/admins";
import adminsAndConsumer from "../Users/access/adminsAndConsumer";
import { updateExtended } from "./hooks/updateExtended";



const SaleorVariants: CollectionConfig = {

    slug: 'saleorvariants',

    access: {
        read: admins,
        create: adminsAndConsumer,
        update: adminsAndConsumer,
        delete: adminsAndConsumer
    },
    hooks: {
        afterChange: [updateExtended]
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
            type: 'text'
        },
        {
            name: 'productName',
            type: 'text'
        },
        {
            name: 'productSlug',
            type: 'text'
        },
        {
            name: 'channels',
            type: 'json'
        }
    ]
}


export default SaleorVariants;