export enum UserStatus {
    DELETED = 'deleted',
    SCHEDULED_DELETE = 'scheduled_delete',
    ACTIVE = 'active', // After setting up the password
    PAUSED = 'paused',
    SUSPENDED = 'suspended', // Email is verified, password setted up, but suspended
    NO_PASSWORD = 'no_password', // Email is verified but password is not setted up yet
    NEW_REGISTER = 'new_register', // User is registered, but email not verified
}