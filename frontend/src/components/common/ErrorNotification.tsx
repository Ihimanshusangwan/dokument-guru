import React, {useEffect, useRef} from "react"

type Props = {
    visible: boolean
    message: string
    onClose: () => void
}

const ErrorNotification: React.FC<Props> = ({visible, message, onClose}) => {
    const notificationRef = useRef<HTMLDivElement>(null)

    // Handle clicks outside the notification
    useEffect(() => {
        if (!visible) return

        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [visible, onClose])

    if (!visible) return null

    return (
        <div
            className="fixed top-4 right-4 z-50 animate-slide-in"
            ref={notificationRef}
            data-testid="error-notification"
        >
            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg shadow-lg p-4 pr-6 w-80 relative">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg
                            className="h-6 w-6 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            Error occurred
                        </h3>
                        <p className="mt-1 text-sm text-red-700">{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 transition-colors"
                        aria-label="Close error message"
                    >
                        <svg
                            className="h-5 w-5 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorNotification