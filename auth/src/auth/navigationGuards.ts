import { RouteLocationRaw, Router } from 'vue-router'
import { RequiredAuthOptions } from './types'
import { useAuth } from './useAuth'

export function configureNavigationGuards(router: Router, options: RequiredAuthOptions) {
    router.beforeEach(async (to): Promise<boolean | RouteLocationRaw> => {
        const auth = useAuth()

        if (!to.meta.public) {
            if (!auth.user) {
                await auth.login()
                return true
            }
        }

        return true
    })
}