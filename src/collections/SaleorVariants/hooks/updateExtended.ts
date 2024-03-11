import type { AfterChangeHook } from "payload/dist/globals/config/types";

import type {Saleorvariant} from '../../../payload-types'
import { CollectionAfterChangeHook } from "payload/types";

export const updateExtended: CollectionAfterChangeHook<Saleorvariant> = async ({ doc, req, operation }) => {
    const { payload } = req;

    if (operation === 'create' || operation === 'update') {
        const { variantId, variantName, productId, productName, productSlug, channels } = doc;

        // Check if the product already exists
        let products = await payload.find({
            collection: 'products',
            where: { productId: {equals: productId} }
        });

        let product = products[0]; // Assuming productId is unique

        // Create or update product
        if (!product) {
            try {
                product = await payload.create({
                    collection: 'products',
                    data: {
                        productId: productId,
                        name: productName
                        // Add other fields of the product as needed
                    }
                });
            } catch (error) {
                req.payload.logger.error(`Error creating product: ${error}`);
            }
        } else if (operation === 'update') {
            // If updating and product exists, update its fields
            try {
                product = await payload.update({
                    collection: 'products',
                    id: product._id,
                    data: {
                        name: productName
                        // Update other fields of the product as needed
                    }
                });
            } catch (error) {
                req.payload.logger.error(`Error updating product: ${error}`);
            }
        }

        // Check if the variant already exists
        let variants = await payload.find({
            collection: 'variants',
            where: { variantId: {equals: variantId} }
        });

        let variant = variants[0]; // Assuming variantId is unique

        // Create or update variant
        if (!variant) {
            try {
                variant = await payload.create({
                    collection: 'variants',
                    data: {
                        variantId: variantId,
                        variantName: variantName,
                        productId: product._id, // Link variant to product
                        channels: channels
                        // Add other fields of the variant as needed
                    }
                });
            } catch (error) {
                req.payload.logger.error(`Error creating variant: ${error}`);
            }
        } else if (operation === 'update') {
            // If updating and variant exists, update its fields
            try {
                variant = await payload.update({
                    collection: 'variants',
                    id: variant._id,
                    data: {
                        variantName: variantName,
                        channels: channels
                        // Update other fields of the variant as needed
                    }
                });
            } catch (error) {
                req.payload.logger.error(`Error updating variant: ${error}`);
            }
        }
    }

    return;
}
