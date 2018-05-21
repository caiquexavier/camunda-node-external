
import { User, Profile } from './user'

import * as uuid from 'uuid/v4'

class TenancyUser {
    userId: string
    profile: Profile
    tags: string[]

    constructor(userId: string, profile: Profile, tags: string[] = []) {
        this.userId = userId
        this.profile = profile
        this.tags = tags
    }
}

class Tenancy {
    _id: string = uuid()
    _rev: string = ''
    name: string
    users: TenancyUser[]
    photoUrl: string
    metadata: any
}

export { Tenancy, TenancyUser }
