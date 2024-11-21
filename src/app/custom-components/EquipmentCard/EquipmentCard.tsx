import { formatTitle } from "@/app/utils/functions"
import { Box, Checkbox, } from "@chakra-ui/react"
import React from "react"

interface EquipmentCardProps {
  exercise: any
}
export const EquipmentCard = ({ exercise }: EquipmentCardProps) => {

  return (
    <Box borderRadius={"lg"} borderWidth={"1px"} h="100px" justifyItems={"center"} alignContent={"center"} p={8} cursor={"pointer"} boxShadow={"md"} >
     <Checkbox size='lg' colorScheme='orange'>
    {formatTitle(exercise)}
  </Checkbox>
    </Box>

  )
}