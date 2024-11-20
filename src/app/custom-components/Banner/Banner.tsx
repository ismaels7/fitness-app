"use-client"
import { Box, Button, Heading, Text } from "@chakra-ui/react"
import React from "react"
import Link from "next/link"

export const Banner = () => {
    return (
        <Box className="gradient-background" w='100%' opacity={1} backgroundPosition={"center"} h={"600px"} textAlign={"center"} justifyContent={"center"} color={"white"} paddingTop={"10%"}>
            <Heading fontSize={{ base:"4xl", md:"6xl"}} mb={4}>Find your exercises</Heading>
            <Text marginTop={"30px"} fontSize={{base: "md", md:"xl"}} mb={6}>
                Explore through a large variety of exercises to reach your goal!
            </Text>
            <Link href="/exercises"><Button size={"lg"} colorPalette={"cyan"} color={"white"}>Browse all exercises</Button></Link>
        </Box>
    )
}