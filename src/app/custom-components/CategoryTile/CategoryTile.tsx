import { Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import { FaAngleRight } from "react-icons/fa6";

import React from "react"
import Link from "next/link"

type CategoryType = {
    title: string,
    summary?: string,
    url: string
}
export const CategoryTile = ({ title, summary, url }: CategoryType) => {
    return (
        <LinkBox as="article" className="categoryTile" minW="4/12" p="5" borderWidth="2px" borderColor={"black"} rounded="md">
            <Heading size="lg" my="2">
                <LinkOverlay>{title}</LinkOverlay>
            </Heading>
            {summary && <Text mb="3" color="fg.muted">
                {summary}
            </Text>}
            <Link href={url} className="inline-flex items-center underline text-rose-700">
                Go there <FaAngleRight />
            </Link>
        </LinkBox>
    )
}