import { formatTitle } from "@/app/utils/functions"
import { Box, Checkbox, } from "@chakra-ui/react"
import React from "react"

interface EquipmentCardProps {
  exercise: string,
  checked: boolean,
  onChange: (exercise:string) => void
}
export const EquipmentCard = ({ exercise, checked, onChange }: EquipmentCardProps) => {

  return (
    <Box className="customTile" borderRadius={"lg"} borderWidth={"1px"} h="100px" justifyItems={"center"} alignContent={"center"} p={8} cursor={"pointer"} boxShadow={"md"} >
      <Checkbox isChecked={checked} onChange={()=> onChange(exercise)} size='lg' colorScheme='cyan'>
        {formatTitle({title: exercise, toUpperCase: true})}
      </Checkbox>
    </Box>

  )
}