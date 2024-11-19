import { Box, Heading, Link } from "@chakra-ui/react"

interface CategoryBannerProps {
    category: {
        name: string,
        url: string
    }
}
export const CategoryBanner = ({category}: CategoryBannerProps) => {
    const categories = [{name: "Exercises", url: "/exercises"}, /* {name: "Focus Areas", url: "focus-areas"}, */ {name: "Equipment", url: "/equipment"}]
    return (
        <Box className="gradient-background" w='100%' gap={5} display={"flex"} opacity={1} backgroundPosition={"center"} h={"100px"} alignItems={"center"} textAlign={"left"} color={"white"} paddingTop={"10px"} paddingInline={"10px"}>
        <Heading fontSize={{ base:"4xl", md:"6xl"}} mb={4}>App Name</Heading>
        <Link href="/"><Heading color={"white"} 
            marginTop={"5px"} fontSize={{ base:"lg", md:"xl"}} mb={4}>Home</Heading></Link>
        {categories.map((e) => {
           return ( <Link href={e.url}><Heading color={window.location.pathname.startsWith(e.url) ? "cyan.500" : "white"} 
            marginTop={"5px"} fontSize={{ base:"lg", md:"xl"}} mb={4}>{e.name}</Heading></Link>)
})}
    </Box>
    )
}