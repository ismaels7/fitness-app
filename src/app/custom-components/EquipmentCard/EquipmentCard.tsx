import { Box, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

interface EquipmentCardProps {
  exercise: any
}
export const EquipmentCard = ({ exercise }: EquipmentCardProps) => {
  const router = useRouter()
  function formatTitle(title: string) {
    return title.charAt(0).toUpperCase() + title.slice(1)
  }

  return (
    <Box borderRadius={"lg"} borderWidth={"1px"} p={4} cursor={"pointer"} boxShadow={"md"} _checked={{bg: "teal.100", borderColor: "teal.400"}}>
       <input className="flex" type="checkbox"/*  checked={isChecked} *//>
       <Text className="flex" fontWeight={"bold"}>{exercise}</Text>
    </Box>

  )
}