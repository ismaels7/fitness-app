import { Card, Button, Image, Box, HStack, Badge } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { FaLocationCrosshairs, FaRegHandBackFist, FaSuitcase } from "react-icons/fa6"

interface ExerciseCardProps {
  exercise: any
}
export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const router = useRouter()
  function formatTitle(title: string) {
    return title.charAt(0).toUpperCase() + title.slice(1)
  }
  return (
    <Card.Root key={exercise.id} className="customTile" flexDirection="row" overflow="hidden" w={"500px"} p={"5px"}>
      <Image
        objectFit="cover"
        maxW="200px"
        src={exercise.gifUrl}
        alt={exercise.name}
      />
      <Box>
        <Card.Body>
          <Card.Title mb="2">{formatTitle(exercise.name)}</Card.Title>
          <HStack mt="4">
            <Badge colorPalette={"cyan"}><FaRegHandBackFist />{exercise.bodyPart}</Badge>
            <Badge colorPalette={"teal"}><FaLocationCrosshairs />{exercise.target}</Badge>
            <Badge colorPalette={"red"}><FaSuitcase />{exercise.equipment}</Badge>
          </HStack>
        </Card.Body>
        <Card.Footer>
          <Button onClick={() => router.push(`/exercises/${exercise.id}`)}>Check details</Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  )
}