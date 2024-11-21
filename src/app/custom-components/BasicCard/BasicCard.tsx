import { Card, Box, Button, CardBody, CardFooter, Heading } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { formatTitle } from "../../utils/functions"

interface BasicCardProps {
    item: string,
    belongsTo: string
}

export const BasicCard = ({item, belongsTo}: BasicCardProps) => {


    return (
        <Card key={item} className="customTile" flexDirection="row" overflow="hidden" w={"300px"} p={"5px"}>
            <Box>
                <CardBody>
                    <Heading mb="2">{formatTitle(item)}</Heading>
                </CardBody>
                <CardFooter>
                    <Button><Link href={`/exercises/${belongsTo}/${item}`}>Browse exercises</Link></Button>
                </CardFooter>
            </Box>
        </Card>
    )
}