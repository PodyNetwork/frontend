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


const LoginForm = () => {
    const {startLoading, stopLoading, loading} = useLoading()

    const login = useCallback(() =>{
        startLoading()

        ///

        stopLoading()
    }, [])

    return <>
    <div>
        {loading && <p> is loading </p>}
    </div>
    <form action=""></form></>
}


const Preloader = () => {

    const {startLoading, stopLoading, loading} = useLoading(true)


}

export default useLoading


