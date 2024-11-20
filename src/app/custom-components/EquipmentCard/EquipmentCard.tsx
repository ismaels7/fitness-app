import { Box, Grid, GridItem, Text } from "@chakra-ui/react"
import React from "react"

interface EquipmentCardProps {
  exercise: any
}
export const EquipmentCard = ({ exercise }: EquipmentCardProps) => {

  return (
    <Box borderRadius={"lg"} borderWidth={"1px"} p={4} cursor={"pointer"} boxShadow={"md"} _checked={{bg: "teal.100", borderColor: "teal.400"}}>
      <Grid templateColumns="repeat(6, 1fr)" gap="6" direction={{ base: 'column', md: 'row' }} justifyContent={"left"} alignContent={"center"} p={2}>
      <GridItem colSpan={2}> <input className="flex" type="checkbox"/*  checked={isChecked} *//></GridItem>
      <GridItem colSpan={4}>       <Text className="flex" fontWeight={"bold"}>{exercise}</Text></GridItem>
      </Grid>
    </Box>

  )
}