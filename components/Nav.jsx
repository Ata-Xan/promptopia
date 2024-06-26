'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Signin, Signout, useSession, getProviders } from 'next-auth/react';
import { get } from 'mongoose';

function Nav() {
    const {data: session} = useSession();
    const [ toggleDropdown, setToggleDropdown ] = useState(false)
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null)
    useEffect(() => {
        const setUpProviders = async () =>{
            const response = await getProviders();
            setProviders(response)
        }
        setUpProviders()
    }, [])
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg" alt='Promptopia' width={30} height={30} className="object-contain" />
                <p className="logt_text">Pomptopia</p>
            </Link>
            {/* {Desktop Navigation} */}
            {/* by following className  */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className="black_btn">Create Post</Link>
                        <button type='button' className='outline_btn'>Sign Out</button>
                        <Link href="/profile" className="nav_link"><Image src="/assets/images/logo.svg" height={37} width={37} className="rounded-full" alt="profile"
                        onClick={()=>{}}/></Link>

                    </div>
                ) : (
                    <>
                        {
                            providers && Object.values(providers).map((provider) => (
                                <div key={provider.name}>
                                    <button onClick={() => Signin(provider.id)} className="black_btn" type='button'>Sign In</button>
                                </div>
                            ))
                        }
                    </>
                )}

            </div>

            {/* {Mobile Navigation} */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        
                        <Image src={session?.user.image} height={37} width={37} className="rounded-full" alt="profile" onClick={()=>setToggleDropdown((prev)=>!prev)}/>
                        {toggleDropdown &&  (
                            <div className="dropdown">
                                <Link href="/profile" className="dropdown_link" onClick={()=>setToggleDropdown(false)}>My Profile</Link>
                                <Link href="/profile" className="dropdown_link" onClick={()=>setToggleDropdown(false)}>Create Prompt</Link>
                                <button type='button' className='mt-5 w-full black_btn' onClick={()=>{setToggleDropdown(false);Signout();}} >Sign Out</button>
                            </div>
                        )}
                    </div>
                ):(
                    <>
                        {
                            providers && Object.values(providers).map((provider) => (
                                <div key={provider.name}>
                                    <button onClick={() => Signin(provider.id)} className="black_btn" type='button'>Sign In</button>
                                </div>
                            ))
                        }
                    </>
                )}

            </div>



        </nav>
    )
}

export default Nav