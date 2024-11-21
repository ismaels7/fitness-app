"use client"

import { AdvancedCard } from "@/app/custom-components/AdvancedCard/AdvancedCard";
import { Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
import { fetchExerciseByEquipment } from "../../../../api/exercises/equipment";
import { formatTitle, loadingState } from "../../../utils/functions";

export default function ExerciseByEquipmentPage(props: {
    params: { equipmentId: string }
  }) {

//export default function ExerciseByEquipmentPage({ params }: { params: { equipmentId: string } }) {
    const {equipmentId} =  props.params
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
                <div className="items-center min-h-screen">
                    <Heading size={"4xl"}>{formatTitle(equipmentId)} Exercises</Heading>
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