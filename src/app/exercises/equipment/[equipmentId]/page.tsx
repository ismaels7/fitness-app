"use client"

import { AdvancedCard } from "@/app/custom-components/AdvancedCard/AdvancedCard";
import { Skeleton, Stack, Grid, Heading, Box } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
import { fetchExerciseByEquipment } from "../../../../api/exercises/equipment";


export default function ExerciseByAreaPage({ params }: { params: Promise<{ equipmentId: string }> }) {
    const { equipmentId } = use(params);
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

    const loadingState = <>
    <Stack>
        <Skeleton className="skeleton" height="400px" marginInline={"80px"} width={"700px"} />
    </Stack>
    </>

    function formatId(title: string) {
        return decodeURI(title.charAt(0).toUpperCase() + title.slice(1))
    }

    return (
        <>
            <Head>
                <title>By Target</title>
            </Head>
            <div className="pb-10">
                <div className="items-center min-h-screen">
                <Heading size={"4xl"}>{formatId(equipmentId)} Exercises</Heading>
                    <Grid p={10} alignContent={"center"} justifyContent={"center"}>
                    {isLoading && loadingState}
                    {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES BY TARGET</>}
                    {exerciseData && exerciseData.map((exercise: any) => {
                        return <AdvancedCard key={exercise.url} exercise={exercise} />
                    })}
                </Grid>
            </div>
        </div>
    </>

    )
}