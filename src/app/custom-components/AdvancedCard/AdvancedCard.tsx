
import { Box, Flex, Heading, Text, Image, List, ListItem, Tabs, Grid, GridItem, TabList, Tab, TabPanels, TabPanel, OrderedList } from "@chakra-ui/react";
import React from "react";
import { formatTitle } from "@/config/utils/functions";
import { ExerciseType } from "@/config/api/exercises/basic";
interface AdvancedCardProps {
    exercise: ExerciseType
}
export const AdvancedCard = ({exercise}: AdvancedCardProps ) => {
  
    return <Box data-testid="advanced-card" className="w-[70em]  justify-center p-6">
    <Heading size={"xl"}>{formatTitle({title: exercise.name, toUpperCase: true})}</Heading>
    <Flex direction={{ base: 'column', md: 'row' }} align={"start"} justify={"space-between"} p={8}>
      <Box flex={1}>
        <Image src={exercise.gifUrl} alt={exercise.name} borderRadius={"md"} objectFit={"cover"} w={"100%"} h={{ base: "300px", md: "500px" }} />
      </Box>
      <Box flex={1} borderRadius={"md"} p={6} h={{ base: "300px", md: "500px" }} overflowY={"auto"}>

        <Tabs>
          <TabList>
            <Tab >Instructions</Tab>
            <Tab>Details</Tab>
          </TabList>

          <TabPanels>
            <TabPanel data-testid="instructions-panel">
            <OrderedList>
              {exercise.instructions.map((instruction: string, index: number) => {
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
                <Text fontSize={"xl"}>{formatTitle({title: exercise.bodyPart})}</Text>
              </GridItem>
              <GridItem>
                <Heading size={"lg"} alignContent={"center"} justifyContent={"center"}>Target</Heading>
                <Text fontSize={"xl"}>{formatTitle({title: exercise.target})}</Text>
              </GridItem>
              <GridItem>
                <Heading size={"lg"} alignContent={"center"} justifyContent={"center"}>Secondary muscles</Heading>
                <List>
                  {exercise.secondaryMuscles.map((muscle: string, index: number) => {
                    return (
                      <ListItem fontSize={"xl"} key={`${muscle}-${index}`}>{formatTitle({title: muscle})}</ListItem>
                    )
                  })}
                </List>
              </GridItem>
              <GridItem>
                <Heading size={"lg"} alignContent={"center"} justifyContent={"center"}>Equipment</Heading>
                <Text fontSize={"xl"}>{formatTitle({title: exercise.equipment})}</Text>
              </GridItem>
            </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  </Box>
}