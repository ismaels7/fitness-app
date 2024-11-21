"use client"
import { fetchExercisesByTarget } from "@/api/exercises/target";
import { AdvancedCard } from "@/app/custom-components/AdvancedCard/AdvancedCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
import { formatTitle, loadingState } from "../../../../utils/functions";


export default function Target(props: { params: Promise<{ targetId: string }> }) {
    const params = use(props.params);
    const targetId = params.targetId
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [targetExercises, setTargetExercises] = useState<any>()

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

    useEffect(() => {
        getExercisesBytarget()
    }, [targetId])


    return (
        <>
            <Head>
                <title>By Target</title>
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
                            <BreadcrumbLink href='/exercises/focus-areas'>
                                Focus Areas
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/exercises/focus-areas/targets'>
                                Targets
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>{formatTitle(targetId)}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="flex items-center justify-center">
                    <Heading size={"2xl"}>{formatTitle(targetId)} Exercises</Heading>
                    </div>
                    <Grid p={10} alignContent={"center"} justifyContent={"center"}>
                        {isLoading && loadingState({ items: 4, grid: 12, colSpan: 12, width: "700px", height: "400px" })}
                        {error && (
                            <div data-testid="error-state">
                                <Heading>There was an error while fetching data, please check the logs</Heading>
                            </div>)}
                        {targetExercises && targetExercises.map((exercise: any) => {
                            return <AdvancedCard key={exercise.name} exercise={exercise} />
                        })}
                    </Grid>
                </div>
            </div>
        </>
    )
}
