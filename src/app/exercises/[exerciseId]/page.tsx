"use client"
import { fetchExercise } from "@/api/exercises/basic";
import { Box, Flex, Heading, Text, Image, List, ListItem, Tabs, Grid, GridItem, TabList, Tab, TabPanels, TabPanel, OrderedList, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
import { formatTitle, loadingState } from "../../utils/functions";

export default function ExercisePage(props: { params: Promise<{ exerciseId: string }> }) {
  const params = use(props.params);
  const { exerciseId } = params
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseData, setExerciseData] = useState<any>()

  const getExercise = async () => {
    try {
      const data = await fetchExercise({ id: exerciseId as string })
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
        <title>Exercise</title>
      </Head>
      <div className="pb-10">
        <div className="items-center min-h-screen p-5">
          <Breadcrumb data-testid="breadcrumb">
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/exercises'>
                Exercises
              </BreadcrumbLink>
            </BreadcrumbItem>
            {exerciseData && (<BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{formatTitle(exerciseData.name)}</BreadcrumbLink>
            </BreadcrumbItem>)}
          </Breadcrumb>
          <Flex p={10} alignContent={"center"} justifyContent={"center"} >
            <div className="mt-20">
              {isLoading && loadingState({ items: 1, grid: 12, colSpan: 12, height: "600px", width: "1500px" })}
            </div>
            {error && (
              <div data-testid="error-state">
                <Heading>There was an error while fetching data, please check the logs</Heading>
              </div>)}
            {exerciseData && (
              <Box className="w-[70em]  justify-center p-6">
                <div className="flex items-center justify-center">
                  <Heading data-testid="heading" size={"2xl"}>{formatTitle(exerciseData.name)}</Heading>
                </div>
                <Flex direction={{ base: 'column', md: 'row' }} align={"start"} justify={"space-between"} p={8}>
                  <Box flex={1}>
                    <Image src={exerciseData.gifUrl} alt={exerciseData.name} borderRadius={"md"} objectFit={"cover"} w={"100%"} h={{ base: "300px", md: "500px" }} />
                  </Box>
                  <Box flex={1} borderRadius={"md"} p={6} h={{ base: "300px", md: "500px" }} overflowY={"auto"}>

                    <Tabs>
                      <TabList>
                        <Tab>Instructions</Tab>
                        <Tab>Details</Tab>
                      </TabList>

                      <TabPanels>
                        <TabPanel data-testid="instructions-panel">
                          <OrderedList >
                            {exerciseData.instructions.map((instruction: string, index: number) => {
                              return (
                                <ListItem key={index} p={5}>{instruction}</ListItem>
                              )
                            })}
                          </OrderedList>
                        </TabPanel>
                        <TabPanel data-testid="details-panel">
                          <Grid gap={3}>
                            <GridItem>
                              <Heading size={"lg"} alignContent={"center"} justifyContent={"center"}>Area</Heading>
                              <Text fontSize={"xl"}>{formatTitle(exerciseData.bodyPart)}</Text>
                            </GridItem>
                            <GridItem>
                              <Heading size={"lg"} alignContent={"center"} justifyContent={"center"}>Target</Heading>
                              <Text fontSize={"xl"}>{formatTitle(exerciseData.target)}</Text>
                            </GridItem>
                            <GridItem>
                              <Heading size={"lg"} alignContent={"center"} justifyContent={"center"}>Secondary muscles</Heading>
                              <List>
                                {exerciseData.secondaryMuscles.map((muscle: string, index: number) => {
                                  return (
                                    <ListItem fontSize={"xl"} key={index}>{formatTitle(muscle)}</ListItem>
                                  )
                                })}
                              </List>
                            </GridItem>
                            <GridItem>
                              <Heading size={"lg"} alignContent={"center"} justifyContent={"center"}>Equipment</Heading>
                              <Text fontSize={"xl"}>{formatTitle(exerciseData.equipment)}</Text>
                            </GridItem>
                          </Grid>
                        </TabPanel>
                      </TabPanels>
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
