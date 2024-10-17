import { ReactNode, useEffect, useState } from "react"
import axios from "@/network/axios"
import useLoading from "@/hooks/useLoading"
import { useRouter } from "next/navigation"
import Loader from "@/components/preloader/Loader"

const AuthMiddleware = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const { startLoading, stopLoading, loading } = useLoading(true)
    const router = useRouter()

    useEffect(() => {
        if (isLoggedIn) return
        startLoading()

        const fetchProfile = async () => {
            try {
                const response = await axios.get<any>('/user/profile');
                if (response.data) {
                    setIsLoggedIn(true)
                } else {
                    throw new Error('Profile not found');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                router.push('/login')
            } finally {
                stopLoading()
            }
        }

        fetchProfile()
    }, [isLoggedIn])

    if (isLoggedIn) return children

    if (!navigator.onLine) return <>No network</>

    return <Loader/>
}

export default AuthMiddleware