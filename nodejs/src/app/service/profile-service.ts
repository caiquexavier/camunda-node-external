
import logger from '../log'
import * as tenancyService from '../service/tenancy-service'
import { Profile } from '../model/user'
import { Tenancy } from '../model/tenancy'
import { inspect } from '../utils/objects'

const fromUserId = (userId: string, tenancyId: string = null): Promise<Profile[]> => 
    tenancyService.fromUserId(userId)
    .then(tenancies => {
        const filtered = tenancies
            .filter(tenancy => tenancyId ? tenancy._id === tenancyId : true)
            .filter(tenancy => tenancy.users.some(user => user.userId === userId))
            .map(t => t.users) // [[User, User], [User]] Bidimensional

        const result = filtered.length > 0 ? 
            filtered
            .reduce((users, current) => { // [User, User, User] Unidimensional
                const hasDuplicate = users.some(u =>
                    current.some(c => {
                        return c.profile === u.profile
                    }))
                if (hasDuplicate) {
                    return users
                } else {
                    return users.concat(current)
                }
            })
            .map(user => user.profile) : []
 
        logger.debug(`Profile from userId=${userId} mapped=${inspect(result)}`)
        return result
    })


export { fromUserId }
