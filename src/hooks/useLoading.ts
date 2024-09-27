import { useCallback, useState } from "react"

const useLoading = (state: boolean = false) => {

    const [loading, setLoading] = useState<boolean>(state)

    const startLoading = useCallback(() => {
        setLoading(true)
    }, [])

    const stopLoading = useCallback(() => {
        setLoading(false)
    }, [])

    return { startLoading, stopLoading, loading }
}

export default useLoading


