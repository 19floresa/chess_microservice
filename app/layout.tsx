import { React } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";
import Navbar from "@/components/navbar.tsx"
import "@/styles/layout.css"

export default function Rootlayout({ children} = { children: React.ReactNode })
{
    return (
        <html lang="en">
            <body>
                <div className="page">
                    <div className="navbar">
                        <Navbar/>
                    </div>
                    <div className="gameBox">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}