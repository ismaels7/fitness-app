import { GridItem, Skeleton, Stack } from "@chakra-ui/react"
import React from "react"
interface formatTitleProps {
    title: string,
    toUpperCase?: boolean
}
export const formatTitle = ({title, toUpperCase = false}: formatTitleProps) => {
    const format = decodeURI(title.charAt(0).toUpperCase() + title.slice(1))
    return toUpperCase ? format.toUpperCase() : format
}

export interface LoadingStateProps {
    items: number, 
    grid:number, 
    colSpan?:number, 
    width?:string, 
    height?:string
}
export const loadingState = ({items, grid, colSpan, width, height}: LoadingStateProps) => {
    return (
        <div data-testid="loading-state" className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-${grid}`}>
        {Array(items)
            .fill(null)
            .map((_, index) => (
               <GridItem key={index} colSpan={colSpan} marginBottom={"30px"}>
                 <Stack key={index}>
                    <Skeleton className="skeleton" height={height || "100px"} width={width || "100%"} />
                </Stack>
               </GridItem>
            ))}
        </div>
    )
}