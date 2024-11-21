"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { BasicCard } from "@/app/custom-components/BasicCard/BasicCard";
import { loadingState } from "@/app/utils/functions"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Text } from "@chakra-ui/react";
import { fetchEquipments } from "@/api/exercises/equipment";

export default function EquipmentExercisesPage() {

    const [equipmentData, setEquipmentData] = useState<string[]>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getEquipment = async () => {
        try {
            const data = await fetchEquipments()
            setEquipmentData(data)
        } catch (e) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getEquipment()
    }, [])

    return (
        <>
            <Head>
                <title>Equipment</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen p-5">
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
                        <BreadcrumbItem isCurrentPage>
                           <Text>By Equipment</Text>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="flex items-center align-center justify-center">
                            <Heading size={"2xl"}>EXERCISES BY EQUIPMENT</Heading>
                    </div>
                    <div className="flex items-center align-center justify-center mt-6">
                            <Heading size={"lg"}>Browse exercises based on your available equipment</Heading>
                    </div>
                {error && (
              <div data-testid="error-state">
                <Heading>There was an error while fetching data, please check the logs</Heading>
              </div>)}
                        <div className="ml-20 pt-10 pr-20">
                        {isLoading && loadingState({items: 12, grid: 4})}
                        </div>
                    <div className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-4 pl-6">
                        {equipmentData && equipmentData.length > 0 && (
                            <>
                                {equipmentData.map((item: string) => {
                                    return (
                                        <BasicCard key={item} belongsTo="equipment" item={item} />
                                    )
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}