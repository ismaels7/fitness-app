import { Card, Button, Image, Separator } from "@chakra-ui/react"

interface ExerciseCardProps {
    id: string,
    name: string,
    src: string,

}
export const ExerciseCard = ({id, name, src}: ExerciseCardProps) => {
    return (
        <Card.Root key={id} maxW="sm" overflow="hidden" m={4}>
        <Image
          src={src}
          alt={name}
        />
        <Separator/>
        <Card.Body gap="2">
          <Card.Title>{name}</Card.Title>
          <Card.Description>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces.
          </Card.Description>
        </Card.Body>
        <Card.Footer gap="2">
          <Button variant="solid">Show Instructions</Button>
          <Button variant="ghost">Check equipment</Button>
        </Card.Footer>
      </Card.Root>
    )
}