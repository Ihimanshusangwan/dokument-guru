import React from "react"

type Props = {
    visible: boolean
    message: string
    onClose: () => void
}

const ErrorModal: React.FC<Props> = ({visible, message, onClose}) => {
    if (!visible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
                <p className="text-gray-800 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                    Dismiss
                </button>
            </div>
        </div>
    )
}

export default ErrorModal
