import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import { slateEditor } from '@payloadcms/richtext-slate'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

import Categories from './collections/Categories'
import Channels from './collections/Channel'
import Comments from './collections/Comments'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import Navigations from './collections/Navigation'
import { Announcements } from './collections/Announcements'
// import { Footer } from './globals/Footer'
// import { Header } from './globals/Header'
// import { Settings } from './globals/Settings'

import Users from './collections/Users'
import {Products, Variants} from './collections/ExtendedSaleor'

import SaleorVariants from './collections/SaleorVariants'


const generateTitle: GenerateTitle = () => {
  return 'My Website'
}

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, SaleorVariants, Products, Variants, Pages,Posts,Projects, Media, Categories, Channels, Comments, Navigations, Announcements],
//  globals: [Settings, Header, Footer],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,

  plugins: [payloadCloud(),
    redirects({
      collections: ['pages', 'posts'],
    }),
    nestedDocs({
      collections: ['categories',],
    }),
    seo({
      collections: ['pages', 'posts', 'projects'],
      generateTitle,
      uploadsCollection: 'media',
    }),
        // Pass the plugin to Payload
        cloudStorage({
          collections: {
            // Enable cloud storage for Media collection
            media: {
              // Create the S3 adapter
              adapter: s3Adapter({
                config: {
                  endpoint: process.env.S3_ENDPOINT,
                  credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                  },
                  region: process.env.S3_REGION
                },
                bucket: process.env.S3_BUCKET,
              }),
            },
          },
        }),
  ],
  cors: "*",
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),

  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
