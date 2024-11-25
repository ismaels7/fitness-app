"use client"

import { AdvancedCard } from "@/app/custom-components/AdvancedCard/AdvancedCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { fetchExerciseByEquipment } from "@/config/api/exercises/equipment";
import { formatTitle, loadingState } from "@/config/utils/functions";
import { ExerciseType } from "@/config/api/exercises/basic";

interface ExerciseByEquipmentPageProps {
    params: {
        equipmentId: string
    }
}

export default function ExerciseByEquipmentPage({ params }: ExerciseByEquipmentPageProps) {

    const { equipmentId } = params
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [exerciseData, setExerciseData] = useState<ExerciseType[]>()

    const getExercisesByEquipment = async () => {
        try {
            const data = await fetchExerciseByEquipment({ id: equipmentId as string })
            setExerciseData(data)
        } catch (e) {
            console.error(e)
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
                            <BreadcrumbLink href='/exercises/equipment'>
                                Equipment
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <Text>{formatTitle({ title: equipmentId as string })}</Text>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="flex items-center justify-center">
                        <Heading size={"2xl"}>{formatTitle({ title: equipmentId as string })} Exercises</Heading>
                    </div>
                    <Grid p={10} alignContent={"center"} justifyContent={"center"}>
                        {isLoading && loadingState({ items: 4, grid: 12, colSpan: 12, width: "700px", height: "400px" })}
                        {error && (
                            <div data-testid="error-state">
                                <Heading>There was an error while fetching data, please check the logs</Heading>
                            </div>)}
                        {exerciseData && exerciseData.length > 0 && exerciseData.map((exercise: ExerciseType) => {
                            return <AdvancedCard key={exercise.id} exercise={exercise} />
                        })}
                    </Grid>
                </div>
            </div>
        </>

    )
}