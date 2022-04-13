import { User } from '@auth0/auth0-spa-js'
import { AxiosInstance } from 'axios'
import { Router } from 'vue-router'

export { User } from '@auth0/auth0-spa-js'

export interface AuthPlugin {
    readonly user: User | undefined
    readonly login: () => Promise<void>
    readonly logout: () => Promise<void>
    readonly getToken: () => Promise<string>
}

export interface AuthAxiosConfig {
    instance: AxiosInstance
    autoAddAuthorizationHeader: boolean
    authorizationHeaderPrefix?: string
}

export interface RequiredAuthOptions {
    router: Router
    autoConfigureNavigationGuards: boolean
    axios?: AuthAxiosConfig
}

/*
 * Make all optional but router
 * See: https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
 * See: https://stackoverflow.com/a/51507473/4873750
 */
export interface AuthOptions extends Omit<Partial<RequiredAuthOptions>, 'router'> {
    router: Router
}