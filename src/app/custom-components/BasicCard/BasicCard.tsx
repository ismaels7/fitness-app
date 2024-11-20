import { Card, Box, Button } from "@chakra-ui/react"
import Link from "next/link"
import router from "next/router"
import React from "react"

interface BasicCardProps {
    item: string,
    belongsTo: string
}

export const BasicCard = ({item, belongsTo}: BasicCardProps) => {

    function formatTitle(title: string) {
        return title.charAt(0).toUpperCase() + title.slice(1)
      }

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