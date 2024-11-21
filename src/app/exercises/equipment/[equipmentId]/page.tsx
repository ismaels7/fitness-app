"use client"

import { AdvancedCard } from "@/app/custom-components/AdvancedCard/AdvancedCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
import { fetchExerciseByEquipment } from "@/api/exercises/equipment";
import { formatTitle, loadingState } from "@/app/utils/functions";

export default function ExerciseByEquipmentPage(props: {
    params: Promise<{ equipmentId: string }>
}) {
    const params = use(props.params);

    const { equipmentId } = params
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [exerciseData, setExerciseData] = useState<any>()

    const getExercisesByEquipment = async () => {
        try {
            const data = await fetchExerciseByEquipment({ id: equipmentId })
            setExerciseData(data)
        } catch (e) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getExercisesByEquipment()
    }, [equipmentId])


    return (
        <>
            <Head>
                <title>By Equipment</title>
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
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/equipment'>
                                Equipment
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                           <Text>{formatTitle(equipmentId)}</Text>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="flex items-center justify-center">
                        <Heading size={"2xl"}>{formatTitle(equipmentId)} Exercises</Heading>
                    </div>
                    <Grid p={10} alignContent={"center"} justifyContent={"center"}>
                        {isLoading && loadingState({ items: 4, grid: 12, colSpan: 12, width: "700px", height: "400px" })}
                        {error && (
                            <div data-testid="error-state">
                                <Heading>There was an error while fetching data, please check the logs</Heading>
                            </div>)}
                        {exerciseData && exerciseData.length > 0 && exerciseData.map((exercise: any) => {
                            return <AdvancedCard key={exercise.url} exercise={exercise} />
                        })}
                    </Grid>
                </div>
            </div>
        </>

    )
}