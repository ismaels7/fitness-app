"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { CategoryBanner } from "../CategoryBanner/CategoryBanner"
import React from "react"

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const [isHome, setIsHome] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsHome(pathname === "/")
    }, [pathname])

    return (
        <div>
            {!isHome &&
                <CategoryBanner pathname={pathname} />}
                {children}
        </div>
    )
}