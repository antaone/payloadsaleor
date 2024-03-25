import type { AfterChangeHook } from "payload/dist/globals/config/types";

import type {Saleorvariant} from '../../../payload-types'
import { CollectionAfterChangeHook } from "payload/types";

export const updateExtended: CollectionAfterChangeHook<Saleorvariant> = async ({ doc, req, operation }) => {
    const { payload } = req;

    if (operation === 'create' || operation === 'update') {
        const { variantId, variantName, productId, productName, productSlug, channels } = doc;

        try {
            // Check if the product already exists
            let product;
            if (productId) {
                const products = await payload.find({
                    collection: 'products',
                    where: {
                        productId: {
                            equals: productId
                        }
                    }
                });
                product = products[0];
            }

            // Create or update product
            if (!product) {
                product = await payload.create({
                    collection: 'products',
                    data: {
                        productId,
                        name: productName,
                        productSlug,
                        // Add other fields of the product as needed
                    }
                });
            } else if (operation === 'update') {
                // If updating and product exists, update its fields
                product = await payload.update({
                    collection: 'products',
                    id: product.id,
                    data: {
                        name: productName,
                        productSlug,
                        // Update other fields of the product as needed
                    }
                });
            }

            // Create or update variant
            let variant;
            if (operation === 'create' || !doc.productId) {
                // Only create a new variant if it's a creation operation or if productId is not provided
                variant = await payload.create({
                    collection: 'variants',
                    data: {
                        variantId,
                        variantName,
                        productId: product.id, // Link variant to product
                        channels,
                        // Add other fields of the variant as needed
                    }
                });
            } else if (operation === 'update') {
                // If updating, find the existing variant and update its fields
                const variants = await payload.find({
                    collection: 'variants',
                    where: {
                        variantId: {
                            equals: variantId
                        }
                    }
                });
                variant = variants[0];

                if (variant) {
                    variant = await payload.update({
                        collection: 'variants',
                        id: variant.id,
                        data: {
                            variantName,
                            channels,
                            // Update other fields of the variant as needed
                        }
                    });
                }
            }
        } catch (error) {
            req.payload.logger.error(`Error creating or updating product or variant: ${error}`);
        }
    }

    return;
};
