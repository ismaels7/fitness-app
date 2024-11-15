import { Box, Button, Heading, Text } from "@chakra-ui/react"

export const Banner = () => {
    return (
        <Box className="gradient-background" w='100%' opacity={1} backgroundPosition={"center"} h={"600px"} textAlign={"center"} justifyContent={"center"} color={"white"} paddingTop={"10%"}>
            <Heading fontSize={{ base:"", md:"4x1"}} mb={4}>Find your exercises</Heading>
            <Text fontSize={{base: "md", md:"lg"}} mb={6}>
                Explore through a large exercises variety to reach your goal!
            </Text>
            <Button size={"lg"} colorPalette={"pink"} color={"white"} onClick={()=> alert("All exercises")}>Browse all exercises</Button>
        </Box>
    )
}