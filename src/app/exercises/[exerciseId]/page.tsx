"use client"
import { fetchExercise } from "@/api/exercises/basic";
import { Box, Flex, Heading, Text, Image, List, ListItem, Tabs, Grid, GridItem, TabList, Tab, TabPanel } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
import { formatTitle, loadingState } from "../../utils/functions";


export default function ExercisePage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const { exerciseId } = use(params);
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseData, setExerciseData] = useState<any>()
  const [value, setValue] = useState<string | null>("first")

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

  useEffect(() => {
    getExercise()
  }, [exerciseId])


  return (
    <>
      <Head>
        <title>Exercise 1</title>
      </Head>
      <div className="pb-10">
        <div className="items-center min-h-screen">
          <Flex p={10} alignContent={"center"} justifyContent={"center"} >
            <div className="mt-20">
            {isLoading && loadingState({items: 1, grid: 12, colSpan: 12, height:"600px", width:"1500px"})}
            </div>
            {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES</>}
            {exerciseData && (
              <Box className="w-[70em]  justify-center p-6">
                <Heading size={"5xl"}>{formatTitle(exerciseData.name)}</Heading>
                <Flex direction={{ base: 'column', md: 'row' }} align={"start"} justify={"space-between"} p={8}>
                  <Box flex={1}>
                    <Image src={exerciseData.gifUrl} alt={exerciseData.name} borderRadius={"md"} objectFit={"cover"} w={"100%"} h={{ base: "300px", md: "500px" }} />
                  </Box>
                  <Box flex={1} borderRadius={"md"} p={6} h={{ base: "300px", md: "500px" }} overflowY={"auto"}>

                    <Tabs /* value={value} onValueChange={(e) => setValue(e.value)} */>
                      <TabList>
                        <Tab value="first">Instructions</Tab>
                        <Tab value="second">Details</Tab>
                      </TabList>

                      <TabPanel >
                        <List as={"ol"}>
                          {exerciseData.instructions.map((instruction: string, index: number) => {
                            return (
                              <ListItem key={index} p={5}>{instruction}</ListItem>
                            )
                          })}
                        </List>
                      </TabPanel>
                      <TabPanel>
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
                            <List>
                              {exerciseData.secondaryMuscles.map((muscle: string, index: number) => {
                                return (
                                  <ListItem key={index}>{muscle}</ListItem>
                                )
                              })}
                            </List>
                          </GridItem>
                          <GridItem>
                            <Heading size={"xl"} alignContent={"center"} justifyContent={"center"}>Equipment</Heading>
                            <Text>{exerciseData.equipment}</Text>
                          </GridItem>
                        </Grid>
                      </TabPanel>
                    </Tabs>
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
