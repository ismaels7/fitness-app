import { formatTitle } from "@/app/utils/functions"
import { Icon, Box, GridItem, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { FaAngleRight } from "react-icons/fa6"

type ItemListType = {
    id: string,
    name: string
}

type TrendingListProps = {
    list: ItemListType[] | string[],
    title: string
}
export const TrendingList = ({ list, title }: TrendingListProps) => {
    return (
        <GridItem>
            <Heading display={"flex"} justifyContent={"center"} alignItems={"center"} >{title}</Heading>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
                <div>
                    {list.map((item) => {
                        return (
                            <Link key={typeof item === 'string' ? item : item.id} href={typeof item === 'string' ? `/exercises/equipment/${item}` : `exercises/${item.id}`}>
                                <div className="flex items-center">
                                    <Icon fontSize={"20px"}><FaAngleRight /></Icon>
                                    <Text>{formatTitle({title: typeof item === 'string' ? item : item.name})}</Text>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </Box>

        </GridItem>
    )
}
