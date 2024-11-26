import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Image,
  HStack,
  Badge,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { formatTitle } from "@/config/utils/functions";
import { ExerciseType } from "@/config/api/exercises/basic";

interface ExerciseCardProps {
  exercise: ExerciseType;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const router = useRouter();

  return (
    <>
      <Card
        overflow="hidden"
        variant="outline"
        height="250px" 
        display="flex"
        flexDirection="row"
      >
        <Image
          objectFit="cover"
          width="250px" 
          height="100%"
          src={exercise.gifUrl}
          alt={exercise.name}
        />

      
        <Flex direction="column" flex="1" p="4">
          
          <Heading size="sm" noOfLines={3}>
            {formatTitle({ title: exercise.name, toUpperCase: true })}
          </Heading>

         
          <HStack wrap="wrap" spacing="2" mt="2">
            <Badge colorScheme="cyan">{exercise.bodyPart}</Badge>
            <Badge colorScheme="teal">{exercise.target}</Badge>
            <Badge colorScheme="red">{exercise.equipment}</Badge>
          </HStack>

          <Flex flex="1" />

          <CardFooter p="0" pt="2">
            <Button
              variant="outline"
              colorScheme="cyan"
              width="100%"
              onClick={() => router.push(`/exercises/${exercise.id}`)}
            >
              Check details
            </Button>
          </CardFooter>
        </Flex>
      </Card>
    </>
  );
};