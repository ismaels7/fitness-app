import { Card, Button, Image, Box, HStack, Badge } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

interface ExerciseCardProps {
  id: string,
  name: string,
  src: string,

}
export const ExerciseCard = ({ id, name, src }: ExerciseCardProps) => {
  const router = useRouter()
  function formatTitle(title: string) {
    return title.charAt(0).toLocaleUpperCase() + title.slice(1)
  }
  return (
    <Card.Root key={id} className="customTile" flexDirection="row" overflow="hidden" maxW="lg" p={"5px"}>
      <Image
        objectFit="cover"
        maxW="200px"
        src={src}
        alt={name}
      />
      <Box>
        <Card.Body>
          <Card.Title mb="2">{formatTitle(name)}</Card.Title>
          <HStack mt="4">
            <Badge colorPalette={"cyan"}>Glutes</Badge>
            <Badge colorPalette={"teal"}>Biceps</Badge>
            <Badge>Rope</Badge>
          </HStack>
        </Card.Body>
        <Card.Footer>
          <Button onClick={() => router.push(`/exercises/${id}`)}>Check details</Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  )
}