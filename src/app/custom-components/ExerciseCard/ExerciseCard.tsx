import { Card, CardBody, CardFooter, Button, Image, Text, Box, HStack, Badge, Heading, Stack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import React from "react"
import { formatTitle } from "@/app/utils/functions"

interface ExerciseCardProps {
  exercise: any
}
export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const router = useRouter()

  return (

    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={exercise.gifUrl}
          alt={exercise.name}
        />

        <Stack>
          <CardBody>
            <Heading size='lg'>{formatTitle(exercise.name)}</Heading>

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