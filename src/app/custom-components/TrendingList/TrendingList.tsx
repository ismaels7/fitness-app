import { Icon, Box, GridItem, Heading } from "@chakra-ui/react"
import React from "react"
import { FaAngleRight } from "react-icons/fa6"

type ItemListType = {
    id: string,
    name: string
}

type TrendingListProps = {
    list: ItemListType[]
}
export const TrendingList = ({ list }: TrendingListProps) => {
    return (
        <GridItem>
            <Heading display={"flex"} justifyContent={"center"} alignItems={"center"} >Trending exercises</Heading>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
                <div>
            {list.map((item) => {
                return (
                    <div key={item.id} className="flex items-center">
                        <Icon fontSize={"20px"}><FaAngleRight /></Icon>
                        <h3>{item.name}</h3>
                    </div>
                )
            })}
            </div>
            </Box>
           
        </GridItem>
    )
}
