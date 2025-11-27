"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import "@/styles/navbar.css"

const items: string[][] = [ 
                            [ "Login",     "https://www.google.com/"],
                            [ "Register",  "https://www.google.com/"],
                            [ "Play Vs.",  "https://www.google.com/"],
                            [ "Play Solo", "https://www.google.com/"], 
                          ]

function NavbarItem({ name, link, isActive, onClick }: {name: string, link: string, isActive: string, onClick: (name: string)=> void })
{
    return (
        <li className={isActive} ><a href={link} target="_blank" onClick={() => onClick(name)}>{name}</a></li>
    )
}

export default function Navbar() 
{
    const [ activeName, setActiveName ] = useState("Play Solo")

    function onClick(name: string): void
    {
        setActiveName(name)
    }

    function enableItem(item: string[], idx: number)
    {
        const isActive: string = (item[0] === activeName) ? "active" : ""
        return  <NavbarItem key={idx} name={item[0]} link={item[1]} isActive={isActive} onClick={onClick}/>
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