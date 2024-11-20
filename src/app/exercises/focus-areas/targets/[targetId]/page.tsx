"use client"
import { fetchExercisesByTarget } from "@/api/exercises/target";
import { AdvancedCard } from "@/app/custom-components/AdvancedCard/AdvancedCard";
import { Skeleton, Stack, Grid } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";


export default function Target({ params }: { params: Promise<{ targetId: string }> }) {
    const { targetId } = use(params);
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [targetExercises, setTargetExercises] = useState<any>()

    useEffect(() => {
        const getExercisesBytarget = async () => {
            try {
                const data = await fetchExercisesByTarget({ id: targetId })
                setTargetExercises(data)
            } catch (e) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }

        getExercisesBytarget()
    }, [targetId])

    const loadingState = <>

        <Stack maxW="xl">
            <Skeleton className="skeleton" height="150px" marginInline={"80px"} width={"470px"} />

        </Stack>
    </>

    return (
        <>
            <Head>
                <title>By Target</title>
            </Head>
            <div className="pb-10">
                <div className="items-center min-h-screen">
                    <Grid p={10} alignContent={"center"} justifyContent={"center"} /* backgroundColor={"red"} */>
                        {isLoading && loadingState}
                        {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES BY TARGET</>}
                        {targetExercises && targetExercises.map((exercise: any) => {
                            return <AdvancedCard exercise={exercise} />
                        })}
                    </Grid>
                </div>
            </div>
        </>
    )
}
