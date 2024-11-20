import { Card, Box, Button } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { formatTitle } from "../../utils/functions"

interface BasicCardProps {
    item: string,
    belongsTo: string
}

export const BasicCard = ({item, belongsTo}: BasicCardProps) => {


    return (
        <Card.Root key={item} className="customTile" flexDirection="row" overflow="hidden" w={"300px"} p={"5px"}>
            <Box>
                <Card.Body>
                    <Card.Title mb="2">{formatTitle(item)}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <Button><Link href={`/exercises/${belongsTo}/${item}`}>Browse exercises</Link></Button>
                </Card.Footer>
            </Box>
        </Card.Root>
    )
}