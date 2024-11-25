"use client"
import { fetchBodyParts } from "@/api/exercises/body-parts"
import { fetchTargets } from "@/api/exercises/target"
import { Box, GridItem, Heading, VStack, Grid, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { useDisclosure } from '@chakra-ui/react'
import { fetchEquipments } from "@/api/exercises/equipment"
import React from "react"
import { formatTitle, loadingState } from "@/app/utils/functions"

interface CategoryBannerProps {
    pathname: string,
}
export const CategoryBanner = ({ pathname }: CategoryBannerProps) => {

    const [errorAreas, setErrorAreas] = useState(false)
    const [isLoadingAreas, setIsLoadingAreas] = useState(true)
    const [errorTargets, setErrorTargets] = useState(false)
    const [isLoadingTargets, setIsLoadingTargets] = useState(true)
    const [errorEquipment, setErroEquipment] = useState(false)
    const [isLoadingEquipment, setIsLoadingEquipment] = useState(true)
    const [areasData, setAreasData] = useState<string[]>([])
    const [targetsData, setTargetsData] = useState<string[]>([])
    const [equipmentsData, setEquipmentsData] = useState<string[]>([])

    useEffect(() => {
        getBodyParts()
        getTargets()
        getEquipments()
    }, [])

    const getBodyParts = async () => {
        try {
            setIsLoadingAreas(true)
            const data = await fetchBodyParts()
            setAreasData(data)
        } catch (e) {
            setErrorAreas(true)
            console.error(e)
        } finally {
            setIsLoadingAreas(false)
        }
    }

    const getTargets = async () => {
        try {
            setIsLoadingTargets(true)
            const data = await fetchTargets()
            setTargetsData(data)
        } catch (e) {
            setErrorTargets(true)
            console.error(e)
        } finally {
            setIsLoadingTargets(false)
        }
    }

    const getEquipments = async () => {
        try {
            setIsLoadingEquipment(true)
            const data = await fetchEquipments()
            setEquipmentsData(data)
        } catch (e) {
            setErroEquipment(true)
            console.error(e)
        } finally {
            setIsLoadingEquipment(false)
        }
    }

    function MenuWithDropdown({
        children,
        element,
    }: {
        children: React.ReactNode;
        element: {name: string, url: string}
    }) {
        const { isOpen, onOpen, onClose } = useDisclosure();

        return (
            <Box position="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
                <Link key={element.url} href={element.url}><Heading _hover={{ color: 'cyan.700' }} color={pathname.startsWith(element.url) ? "cyan.500" : "white"}
                    marginTop={"5px"} fontSize={{ base: "lg", md: "xl" }} mb={4}>{element.name}</Heading></Link>

                {isOpen && (
                    <VStack
                        position="absolute"
                        top="100%"
                        left={0}
                        bg="white"
                        color="black"
                        boxShadow="md"
                        borderRadius="md"
                        p={2}
                        zIndex="10"
                        align="stretch"
                        minW="200px"
                    >
                        {children}
                    </VStack>
                )}
            </Box>
        );
    }

    const DropdownItem = ({ data, isLoading, error, slug, children }: { data: string[], isLoading: boolean, error: boolean, slug: string, children: React.ReactNode }) => {

       if (isLoading) {
        return <>{loadingState({items: 1, grid: 1, colSpan:1, width:"100px", height: "50px"})}</>
       }

       if (error) {
        return  <Text>There was an error while fetching data, please check the logs</Text>
       }

        return (
            <GridItem
            >
                <Text _hover={{ color: 'cyan.900' }}>{children}</Text>
                {data.map((area: string) => {
                    return (
                        <GridItem key={area}
                            px={4}
                            py={1}
                            borderRadius="md"
                            _hover={{ bg: 'cyan.100', color: 'cyan.800' }}>
                            <Link href={`/exercises/${slug}/${area}`} >{formatTitle({title: area})}</Link>
                        </GridItem>
                    )
                })}
            </GridItem>
        )
    }




    return (
         <Box className="gradient-background grid sm:grid-cols-4 lg:grid-cols-12 lgz-100" w='100%' gap={5} opacity={1} backgroundPosition={"center"} h={"100px"} alignItems={"center"} textAlign={"left"} color={"white"} paddingTop={"10px"} paddingInline={"30px"}>
            <GridItem colSpan={{ base: 4, md: 2 }}>
                <Link href={"/"}><Heading fontSize={{ base: "4xl", md: "5xl" }} mb={4}>FIT-Shape.</Heading></Link>
            </GridItem>
            <MenuWithDropdown element={{ name: "Exercises", url: "/exercises" }}>
                <Grid templateColumns="max-content max-content max-content" gap={4} p={4}>
                    <DropdownItem slug="focus-areas" isLoading={isLoadingAreas} error={errorAreas} data={areasData}>
                        <Heading px={4} fontSize={"md"}>
                            <Link href={"/exercises/focus-areas"}>Exercises by Area</Link>
                        </Heading>
                    </DropdownItem>
                    <DropdownItem slug="focus-areas/targets" isLoading={isLoadingTargets} error={errorTargets} data={targetsData}>
                        <Heading px={4} fontSize={"md"}>
                            <Link href={"/exercises/focus-areas/targets"}>Exercises by Targets</Link>
                        </Heading>
                    </DropdownItem>
                    <DropdownItem slug="equipment" isLoading={isLoadingEquipment} error={errorEquipment} data={equipmentsData}><Heading px={4} fontSize={"md"}>
                        <Link href={"/exercises/equipment"}>Exercises by Equipments</Link>
                    </Heading>
                    </DropdownItem>
                </Grid>
            </MenuWithDropdown>
            <GridItem colSpan={2}>
                <Link key="equipment" href="/equipment"><Heading color={pathname.startsWith("/equipment") ? "cyan.500" : "white"}
                    marginTop={"5px"} _hover={{ color: 'cyan.700' }} fontSize={{ base: "lg", md: "xl" }} mb={4}>Equipment</Heading></Link>
            </GridItem>
        </Box>
    )
}