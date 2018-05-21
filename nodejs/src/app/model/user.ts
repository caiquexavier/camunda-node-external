
enum Profile {
    OWNER,
    CUSTOMER,
    EMPLOYEE
}

class Session {
    score: number = 0
    token: any = null
    logged: boolean = false
}

class User {
    _id: string = ''
    _rev: string = ''
    name: string = ''
    password: string = ''
    phoneNumber: string = ''
    providerId: string = ''
    firebaseId: string = ''
    photoUrl: string = ''
    profiles: Profile[]
    session: Session = new Session()
}

export { User, Session, Profile }
