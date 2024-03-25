import { CollectionConfig } from "payload/types";
import { anyone } from "../access/anyone";
import { admins } from "../access/admins";
import link from "../fields/link";

const Navigations: CollectionConfig = {
    slug: "navigations",
    access: {
        read: anyone,
        create: admins,
        update: admins,
        delete: admins
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
            name: "title",
            label: "title",
            type: "text"
          },

        {
            name: "menus",
            label: "menus",
            type: "json"
        }

    ]

}

export default Navigations