
import { Box, Flex, Heading, Text, Image, List, ListItem, Tabs, Grid, GridItem, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React, { useState } from "react";
import { formatTitle } from "../../utils/functions";
interface AdvancedCardProps {
    exercise: {
        name: string,
        url: string,
        bodyPart: string,
        target: string,
        equipment: string,
        gifUrl: string,
        instructions: string[],
        secondaryMuscles: string[]
    }
}
export const AdvancedCard = ({exercise}:AdvancedCardProps ) => {
  
    return <Box data-testid="advanced-card" className="w-[70em]  justify-center p-6">
    <Heading size={"5xl"}>{formatTitle(exercise.name)}</Heading>
    <Flex direction={{ base: 'column', md: 'row' }} align={"start"} justify={"space-between"} p={8}>
      <Box flex={1}>
        <Image src={exercise.gifUrl} alt={exercise.name} borderRadius={"md"} objectFit={"cover"} w={"100%"} h={{ base: "300px", md: "500px" }} />
      </Box>
      <Box flex={1} borderRadius={"md"} p={6} h={{ base: "300px", md: "500px" }} overflowY={"auto"}>

        <Tabs /* value={value} onValueChange={(e) => setValue(e.value)} */>
          <TabList>
            <Tab >Instructions</Tab>
            <Tab>Details</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
            <List as={"ol"}>
              {exercise.instructions.map((instruction: string, index: number) => {
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
                <Text>{exercise.bodyPart}</Text>
              </GridItem>
              <GridItem>
                <Heading size={"xl"} alignContent={"center"} justifyContent={"center"}>Target</Heading>
                <Text>{exercise.target}</Text>
              </GridItem>
              <GridItem>
                <Heading size={"xl"} alignContent={"center"} justifyContent={"center"}>Secondary muscles</Heading>
                <List>
                  {exercise.secondaryMuscles.map((muscle: string, index: number) => {
                    return (
                      <ListItem key={index}>{muscle}</ListItem>
                    )
                  })}
                </List>
              </GridItem>
              <GridItem>
                <Heading size={"xl"} alignContent={"center"} justifyContent={"center"}>Equipment</Heading>
                <Text>{exercise.equipment}</Text>
              </GridItem>
            </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  </Box>
}