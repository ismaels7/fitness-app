"use client"
import { usePathname } from "next/navigation"
import { CategoryBanner } from "../CategoryBanner/CategoryBanner"
import React from "react"

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <div>
                <CategoryBanner pathname={pathname} />
                {children}
        </div>
    )
}