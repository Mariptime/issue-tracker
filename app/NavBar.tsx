import { link } from 'fs';
import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";

const NavBar = () => {
    const links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' },
    ]
    return (
        <nav className='flex bg-slate-300 space-x-6 border-b h-14 px-5 items-center mb-5'>
            <Link href="/"><FaBug /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <Link
                        key='href'
                        className='text-zinc-500 hover:text-zinc-700 transition-colors'
                        href={link.href}>{link.label}</Link>)}

            </ul>
        </nav>
    )
}

export default NavBar