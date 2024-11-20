import { Card, CardBody, CardFooter, Button, Image, Box, HStack, Badge, Heading } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import React from "react"
import { FaLocationCrosshairs, FaRegHandBackFist, FaSuitcase } from "react-icons/fa6"
import { formatTitle } from "../../utils/functions"

interface ExerciseCardProps {
  exercise: any
}
export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const router = useRouter()

  return (
    <Card key={exercise.id} className="customTile" flexDirection="row" overflow="hidden" w={"500px"} p={"5px"}>
      <Image
        objectFit="cover"
        maxW="200px"
        src={exercise.gifUrl}
        alt={exercise.name}
      />
      <Box>
        <CardBody>
          <Heading mb="2">{formatTitle(exercise.name)}</Heading>
          <HStack mt="4">
            <Badge colorScheme={"cyan"}><FaRegHandBackFist />{exercise.bodyPart}</Badge>
            <Badge colorScheme={"teal"}><FaLocationCrosshairs />{exercise.target}</Badge>
            <Badge colorScheme={"red"}><FaSuitcase />{exercise.equipment}</Badge>
          </HStack>
        </CardBody>
        <CardFooter>
          <Button onClick={() => router.push(`/exercises/${exercise.id}`)}>Check details</Button>
        </CardFooter>
      </Box>
    </Card>
  )
}