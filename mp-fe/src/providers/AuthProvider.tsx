'use client';
import {ReactNode, useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query'
import instance from '@/utils/axiosinstance';
import authStore from '@/zustand/authStore'
import { usePathname, useRouter } from 'next/navigation'

interface IAuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({children}: IAuthProviderProps){
    const [isKeepAuth, setIsKeepAuth] = useState(false);
    
    const router = useRouter()
    const pathname = usePathname()

    const token = authStore((state) => state.token)
    const setKeepAuth = authStore((state) =>  state.setKeepAuth)

    // const {data: auth} = useQuery({
    //     queryKey: ['keepAuth'],
    //     queryFn: async() => {
    //         return instance.get('/auth', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //     }
    // })
    
    const fetchKeepAuth = async () => {
        try {
            const auth = await instance.get('/auth')
            console.log(auth);
            setKeepAuth({firstName: auth?.data?.data?.firstName, role: auth?.data?.data?.role})
        } catch (error) {
            console.log(error)
        } finally {
            setIsKeepAuth(true);
        }
    };

    // then calls this one
    useEffect(() => {
        if (token) {            
            console.log("fetchKeepAuth")
            fetchKeepAuth();
        } else {
            setIsKeepAuth(true);
        }

        console.log(token); 
    },[token])

    useEffect(() => {
        console.log("use-effect2");

        // proteksi apabila sudah login, maka tidak boleh mengakses halaman loginnya
        if (pathname === '/' && token){
            router.push('/dashboard');
        }
        
        if(isKeepAuth === true){
            console.log(pathname.split('/'));
            // Proteksi Apabila Tidak Punya Token, Maka Tidak Bisa Mengakses Halaman Dashboard nya
            setTimeout(() => {
                if(!token && pathname.split('/')[1] !== 'reset-password') router.push('/')
            }, 3000)
        }
    
    }, [isKeepAuth])

    // // componentDidUpdate yang Akan Selalu ke Trigger ketika Terjadi Perubahan Data pada state. Token
    // useEffect(() => {
    //     if (!token) router.push('/');
    // }, [token])

    // useEffect(() => {
    //     console.log(token)
    //     if(pathname === '/' && token) router.push('/dashboard')
    // }, [])

    if(isKeepAuth === false) return(
        <main className='flex justify-center'>
            <span className="loading loading-dots loading-lg"></span>
        </main>
    )

    return(
        <>
            {/* render this first */}
            {console.log("render")}
            {children}
        </>
    )
}