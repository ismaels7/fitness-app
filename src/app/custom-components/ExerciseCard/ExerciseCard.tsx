import { Card, CardBody, CardFooter, Button, Image, HStack, Badge, Heading, Stack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import React from "react"
import { formatTitle } from "@/app/utils/functions"
import { ExerciseType } from "@/api/exercises/basic"

interface ExerciseCardProps {
  exercise: ExerciseType
}
export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const router = useRouter()

  return (

    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        className="customTile"
      >
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={exercise.gifUrl}
          alt={exercise.name}
        />

        <Stack>
          <CardBody>
            <Heading size='md'>{formatTitle({title: exercise.name, toUpperCase: true})}</Heading>

            <HStack py="2" mt="4">
            <Badge colorScheme={"cyan"}>{exercise.bodyPart}</Badge>
            <Badge colorScheme={"teal"}>{exercise.target}</Badge>
            <Badge colorScheme={"red"}>{exercise.equipment}</Badge>
          </HStack>
          </CardBody>

          <CardFooter>
          <Button variant={"outline"} colorScheme={"cyan"} onClick={() => router.push(`/exercises/${exercise.id}`)}>Check details</Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  )
}