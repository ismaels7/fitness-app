import { Box, Heading, Link } from "@chakra-ui/react"

interface CategoryBannerProps {
    title: string
}
export const CategoryBanner = ({title}: CategoryBannerProps) => {
    const categories = ["Body Parts", "Targets", "Equipment"]
    const otherCategories =  categories.filter((i) => i.toLowerCase() !== title.split(" ").join("").toLowerCase())

    return (
        <Box className="gradient-background" w='100%' display={"flex"} opacity={1} backgroundPosition={"center"} h={"75px"} textAlign={"left"} color={"white"} p={"20px"}>
        <Heading fontSize={{ base:"4xl", md:"6xl"}} mb={4}>{title}</Heading>
        <Link href="/"><Heading marginTop={"5px"} marginLeft={"20px"} fontSize={{ base:"lg", md:"xl"}} mb={4}>Home</Heading></Link>
        {otherCategories.map((e) => (
            <Link href={e}><Heading marginTop={"5px"} marginLeft={"20px"} fontSize={{ base:"lg", md:"xl"}} mb={4}>{e}</Heading></Link>
        ))}
    </Box>
    )
}