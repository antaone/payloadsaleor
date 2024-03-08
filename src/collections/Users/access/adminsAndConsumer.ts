import type { Access } from 'payload/types'

import { checkRole } from '../checkRole'

const adminsAndConsumer: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    if (checkRole(['consumer'], user)) {

        return {
            id: {
                equals: user.id
            }
        }
    }

  }

  return false
}

export default adminsAndConsumer;
