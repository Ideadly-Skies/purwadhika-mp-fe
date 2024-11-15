'use client';
import { ReactNode, useEffect, useState } from 'react';
import instance from '@/utils/axiosinstance';
import authStore from '@/zustand/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface IAuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isKeepAuth, setIsKeepAuth] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [isLoading, setIsLoading] = useState(true);


    const token = authStore((state) => state.token);
    const role = authStore((state) => state.role)
    console.log('Role from AuthStore',role)
    console.log('Token from AuthStore:',token)
    const setKeepAuth = authStore((state) => state.setKeepAuth);

    const fetchKeepAuth = async () => {
        try {
            const auth = await instance.get('/auth');
            console.log('Fetched Data:', auth?.data?.data);
            setKeepAuth({
                firstName: auth?.data?.data?.firstName,
                lastName: auth?.data?.data?.lastName,
                role: auth?.data?.data?.role,
                email: auth?.data?.data?.email,
                profilePictureUrl: auth?.data?.data?.profilePictureUrl
            });
        } catch (err) {
            console.log(err);
            toast.error('Please re-login, your session is expired');
            router.push('/'); // Redirect to landing page if fetching auth fails
        } finally {
            setIsKeepAuth(true);
        }
    };

    useEffect(() => {
        if (token) {
            fetchKeepAuth().finally(() => {
                setIsLoading(false); // Set loading to false once the data is fetched
            });
        } else {
            setIsLoading(false); // If no token, no need to fetch
        }
    }, [token]);

    useEffect(() => {
        if (isKeepAuth) {
            if (typeof role === 'undefined') return;
            // Redirect to home if logged in and accessing login pages
            if ((pathname === '/login/user' || pathname === '/login/organizer' || pathname === '/register/user' || pathname === '/register/organizer') && token && role) {
                router.push('/');
                return;
            }
            console.log('Current Path:', pathname, 'Token:', token, 'Role:', role);
            if (pathname.includes('/organizer/dashboard')) {
                if (!token || role !== 'organizer') {
                    console.log('Access denied: Token or Role issue');
                    setIsAuthorized(false);
                    toast.error('Access denied: Unauthorized user');
                    setTimeout(() => {
                        router.push('/');
                    }, 3000);
                } else if (token && role === 'organizer') {
                    setIsAuthorized(true);
                }
            } 
            else if (pathname.includes('/user/dashboard')){
                if (!token || role !== 'user'){
                    console.log('Access denied: Token or Role issue');
                    setIsAuthorized(false);
                    toast.error('Access denied: Unauthorized user')
                    setTimeout(() => {
                        router.push('/')
                    }, 3000)
                } else if (token && role == 'user'){
                    setIsAuthorized(true);
                }
            }
            else {
                setIsAuthorized(true);
            }
        }
    }, [isKeepAuth, pathname, token, role, isLoading]);

    if (!isKeepAuth && token) {
        return (
            <main className="flex justify-center">
                <span className="loading loading-dots loading-lg"></span>
            </main>
        );
    }


    if (!isAuthorized) {
        // Optionally render an error message while waiting for redirect
        return(
            <main className='w-full h-screen pt-72'>
                <div className='text-center items-center justify-center'>
                    <h1 className='text-3xl font-bold text-center items-center justify-center pb-10'>
                        Oopsie, Something went wrong
                    </h1>
                    <button className='bg-orange-500 rounded-lg items-center justify-center'>
                        <Link href='/'>
                        <span className='px-5 py-5 text-lg font-bold'>
                            go back to Homepage
                        </span>     
                        </Link>
                    </button>
                </div>
            </main>
        )  
    }

    return <>{children}</>;
}