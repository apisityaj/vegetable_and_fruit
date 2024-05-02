'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { pagelist } from '@/app/_data/listpage';

export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white mb-8">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center ">
                    <img src="/next.svg" className="h-5" alt="Flowbite Logo" />
                </div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 w-10 h-10  text-sm text-gray-500 rounded-lg md:hidden "
                    aria-controls="navbar-default"
                    aria-expanded="false"
                    onClick={() => { setIsMenuOpen(!isMenuOpen) }}
                >
                    <svg className="w-5 h-5" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`w-full md:w-auto md:block ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 rounded-lg  md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-white dark:bg-gray-800">
                        {pagelist.map(item => (
                            <li key={item.name}>
                                <Link href={item.link}>
                                    <div className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        {item.name}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
