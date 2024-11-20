"use client"
import { fetchExercise } from "@/api/exercises/basic";
import { Box, Flex, Heading, Skeleton, Stack, Text, Image, List, ListItem, Tabs, Grid, GridItem } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";


export default function ExercisePage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const { exerciseId } = use(params);
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseData, setExerciseData] = useState<any>()
  const [value, setValue] = useState<string | null>("first")

  useEffect(() => {
    const getExercise = async () => {
      try {
        const data = await fetchExercise({ id: exerciseId })
        setExerciseData(data)
      } catch (e) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

  getExercise()
  }, [exerciseId])

  const loadingState = <>

    <Stack maxW="xl">
      <Skeleton className="skeleton" height="150px" marginInline={"80px"} width={"470px"} />

    </Stack>
  </>

  function formatTitle(title: string) {
    return title.charAt(0).toUpperCase() + title.slice(1)
  }

  return (
    <>
      <Head>
        <title>Exercise 1</title>
      </Head>
      <div className="pb-10">
        <div className="items-center min-h-screen">
          <Flex p={10} alignContent={"center"} justifyContent={"center"} >
            {isLoading && loadingState}
            {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES</>}
            {exerciseData && (
              <Box className="w-[70em]  justify-center p-6">
                <Heading size={"5xl"}>{formatTitle(exerciseData.name)}</Heading>
                <Flex direction={{ base: 'column', md: 'row' }} align={"start"} justify={"space-between"} p={8}>
                  <Box flex={1}>
                    <Image src={exerciseData.gifUrl} alt={exerciseData.name} borderRadius={"md"} objectFit={"cover"} w={"100%"} h={{ base: "300px", md: "500px" }} />
                  </Box>
                  <Box flex={1} borderRadius={"md"} p={6} h={{ base: "300px", md: "500px" }} overflowY={"auto"}>

                    <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
                      <Tabs.List>
                        <Tabs.Trigger value="first">Instructions</Tabs.Trigger>
                        <Tabs.Trigger value="second">Details</Tabs.Trigger>
                      </Tabs.List>

                      <Tabs.Content value="first">
                        <List.Root as={"ol"}>
                          {exerciseData.instructions.map((instruction: string, index: number) => {
                            return (
                              <ListItem key={index} p={5}>{instruction}</ListItem>
                            )
                          })}
                        </List.Root>
                      </Tabs.Content>
                      <Tabs.Content value="second">
                        <Grid gap={3}>
                          <GridItem>
                            <Heading size={"xl"} alignContent={"center"} justifyContent={"center"}>Area</Heading>
                            <Text>{exerciseData.bodyPart}</Text>
                          </GridItem>
                          <GridItem>
                            <Heading size={"xl"} alignContent={"center"} justifyContent={"center"}>Target</Heading>
                            <Text>{exerciseData.target}</Text>
                          </GridItem>
                          <GridItem>
                            <Heading size={"xl"} alignContent={"center"} justifyContent={"center"}>Secondary muscles</Heading>
                            <List.Root>
                              {exerciseData.secondaryMuscles.map((muscle: string, index: number) => {
                                return (
                                  <ListItem key={index}>{muscle}</ListItem>
                                )
                              })}
                            </List.Root>
                          </GridItem>
                          <GridItem>
                            <Heading size={"xl"} alignContent={"center"} justifyContent={"center"}>Equipment</Heading>
                            <Text>{exerciseData.equipment}</Text>
                          </GridItem>
                        </Grid>
                      </Tabs.Content>
                    </Tabs.Root>
                  </Box>
                </Flex>
              </Box>
            )}
          </Flex>
        </div>
      </div>
    </>
  )
}
