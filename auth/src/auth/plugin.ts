import { App, reactive, readonly, ref } from 'vue'
import { setupDevtools } from './devtools'
import { configureAuthorizationHeaderInterceptor } from './interceptors'
import { configureNavigationGuards } from './navigationGuards'
import { AuthOptions, AuthPlugin, RequiredAuthOptions, User } from './types'
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

export let authInstance: AuthPlugin | undefined = undefined
let auth0Client: Auth0Client | undefined = undefined

async function initAut0() {
    return await createAuth0Client({
        domain: (import.meta as any).env.DOMAIN,
        client_id: (import.meta as any).env.CLIENT_ID,
        redirect_uri: window.location.origin
    })
}

async function handleAuth0Callback() {
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        // Process the login state
        await auth0Client!.handleRedirectCallback();
        window.history.replaceState({}, document.title, window.location.pathname)
    }
}

function setupAuthPlugin(options: RequiredAuthOptions): AuthPlugin {
    const user = ref<User | undefined>(undefined)

    auth0Client!.isAuthenticated().then(isAuth => {
        if (isAuth) {
            getUser()
        }
    })

    async function getUser() {
        user.value = await auth0Client!.getUser()
    }

    async function getToken() {
        return await auth0Client!.getTokenSilently()
    }

    async function login() {

        if (!await auth0Client!.isAuthenticated()) {
            await auth0Client!.loginWithRedirect({
                redirect_uri: window.location.origin
            })
        }

        await getUser()
    }

    async function logout() {
        await auth0Client!.logout()
        user.value = undefined
    }

    /*
     * "reactive" unwraps 'ref's, therefore using the .value is not required.
     * E.g: from "auth.isAuthenticated.value" to "auth.isAuthenticated"
     * but when using destructuring like: { isAuthenticated } = useAuth() the reactivity over isAuthenticated would be lost
     * this is not recommended but in such case use toRefs: { isAuthenticated } = toRefs(useAuth())
     * See: https://v3.vuejs.org/guide/reactivity-fundamentals.html#ref-unwrapping
     * And: https://v3.vuejs.org/guide/reactivity-fundamentals.html#destructuring-reactive-state
     */
    const unWrappedRefs = reactive({
        user,
        login,
        logout,
        getToken
    })

    return readonly(unWrappedRefs)
}

const defaultOptions = {
    autoConfigureNavigationGuards: true,
}
export async function createAuth(appOptions: AuthOptions) {
    // Fill default values to options that were not received
    const options: RequiredAuthOptions = { ...defaultOptions, ...appOptions }
    auth0Client = await initAut0()
    await handleAuth0Callback()
    return {
        install: async (app: App): Promise<void> => {

            authInstance = setupAuthPlugin(options)
            app.config.globalProperties.$auth = authInstance

            if (options.autoConfigureNavigationGuards) {
                configureNavigationGuards(options.router, options)
            }

            if (options.axios?.autoAddAuthorizationHeader) {
                configureAuthorizationHeaderInterceptor(options.axios.instance, options.axios.authorizationHeaderPrefix)
            }

            if ((import.meta as any).env.DEV) {
                setupDevtools(app, authInstance)
            }
        },
    }
}