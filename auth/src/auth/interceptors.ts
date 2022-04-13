import { AxiosInstance } from 'axios'
import { useAuth } from './useAuth'

export function configureAuthorizationHeaderInterceptor(axiosInstance: AxiosInstance, prefix = 'Bearer') {
    axiosInstance.interceptors.request.use(async (config) => {
        const auth = useAuth()

        config.headers = config.headers ?? {}
        if (auth.user) {
            config.headers.Authorization = `${prefix} ${await auth.getToken()}`
        }
        return config
    })
}