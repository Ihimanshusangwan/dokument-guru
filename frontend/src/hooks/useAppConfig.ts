import {useEffect} from "react"
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios"

type UseAppConfigProps = {
    showError: (msg: string, redirectUrl?: string) => void
}

type ErrorResponseData = {
    success?: boolean
    errorMessage?: unknown
    message?: unknown
    redirectUrl?: string
}

const getFirstErrorMessage = (errorMessage: unknown): string => {
    if (typeof errorMessage === 'string') return errorMessage

    if (typeof errorMessage === 'object' && errorMessage !== null) {
        const messages = Object.values(errorMessage).flatMap(value => {
            if (Array.isArray(value)) return value.filter(item => typeof item === 'string')
            if (typeof value === 'object' && value !== null) {
                return Object.values(value).flat().filter(item => typeof item === 'string')
            }
            return []
        })

        return messages[0] || 'Validation error occurred'
    }

    return 'Something went wrong'
}

export const useAppConfig = ({showError}: UseAppConfigProps) => {
    useEffect(() => {
        const reqInterceptor = axios.interceptors.request.use((config: AxiosRequestConfig) => {
            const newConfig = {...config}
            newConfig.headers = newConfig.headers || {}
            newConfig.headers['Content-Type'] = 'application/json'

            const token = localStorage.getItem("auth_token")
            if (token) {
                newConfig.headers.Authorization = `Bearer ${token}`
            }
            return newConfig
        })

        const resInterceptor = axios.interceptors.response.use(
            (response: AxiosResponse<ErrorResponseData>) => {
                if (response.data?.success === false) {
                    const errorMessage = getFirstErrorMessage(response.data.errorMessage)
                    const redirectUrl = response.data.redirectUrl
                    showError(errorMessage, redirectUrl)
                }
                return response
            },
            (error: AxiosError<ErrorResponseData>) => {
                const errorData = error.response?.data || {}
                const message = getFirstErrorMessage(errorData.errorMessage || errorData.message)
                const redirectUrl = errorData.redirectUrl
                showError(message, redirectUrl)
                return Promise.reject(error)
            }
        )

        return () => {
            axios.interceptors.request.eject(reqInterceptor)
            axios.interceptors.response.eject(resInterceptor)
        }
    }, [showError])
}