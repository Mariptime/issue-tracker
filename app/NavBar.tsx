'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' },
    ]
    return (
        <nav className='flex bg-blue-200 space-x-6 border-y h-14 px-5 items-center mb-5'>
            <Link href="/"><FaBug /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <Link
                        key='href'
                        className={classNames({
                            'text-blue-900': currentPath === link.href,
                            'text-zinc-500': currentPath !== link.href,
                            'hover:text-zinc-700 transition-colors': true
                        })}
                        href={link.href}>{link.label}</Link>)}

            </ul>
        </nav>
    )
}

export default NavBar