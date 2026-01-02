"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import "@/styles/navbar.css"

const items: string[][] = [ 
                            [ "Login",    "/login" ],
                            [ "Register", "/register" ],
                            [ "Play Vs.", "/vs" ],
                            [ "Home",     "/" ], 
                            [ "Replay",   "/replay" ],
                          ]

function NavbarItem({ name, link, isActive }: {name: string, link: string, isActive: string})
{
    return (
        <li className={isActive}>
        <Link href={link}>{name}</Link>
        </li>
    )
}

export default function Navbar() 
{
    const activeName = usePathname()
    function enableItem(item: string[], idx: number)
    {
        const isActive: string = (item[1] === activeName) ? "active" : ""
        return  <NavbarItem key={idx} name={item[0]} link={item[1]} isActive={isActive}/>
    }

    const navbarLinks = items.map(enableItem)

    return (
    <>
    <div>
        <Image loading="eager" src={"/chess_icon.svg"} alt="Chess Icon" width="100" height="100" className='navbarIcon'/>
    </div>
    <div>
        <ul>
            {navbarLinks}
        </ul>
    </div>
    </>)
}