import { Heading, Link, LinkBox, LinkOverlay, Span, Text } from "@chakra-ui/react"

type CategoryType = {
    title: string,
    summary?: string
}
export const CategoryTile = ({ title, summary }: CategoryType) => {
    return (
        <LinkBox as="article" className="categoryTile" minW="4/12" p="5" borderWidth="2px" borderColor={"black"} rounded="md">
            <Heading size="lg" my="2">
                <LinkOverlay href="#">{title}</LinkOverlay>
            </Heading>
            {summary && <Text mb="3" color="fg.muted">
                {summary}
            </Text>}
            <Link href="#inner-link" variant="underline" colorPalette="teal">
                Inner Link
            </Link>
        </LinkBox>
    )
}