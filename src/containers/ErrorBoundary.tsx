import React, { ErrorInfo } from "react"

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
}

export default class ErrorBoundary extends React.Component {
    public state: State = {
        hasError: false,
    }
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    // wrapped with empty tags due to ReactNode return type error

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <>
                    <h1>Something went wrong.</h1>
                </>
            )
        }

        return <>{this.props.children}</>
    }
}
