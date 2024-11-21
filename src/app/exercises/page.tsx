"use client";
import { ExerciseType, fetchExercises } from "@/api/exercises/basic";
import Head from "next/head";
import React from "react";
import { useEffect, useState } from "react";
import { ExerciseCard } from "../custom-components/ExerciseCard/ExerciseCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading } from "@chakra-ui/react";
import { loadingState } from "../utils/functions";

export default function ExercisesPage() {
    const [displayData, setDisplayData] = useState<ExerciseType[]>([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isRoundLoading, setIsRoundLoading] = useState(true)
    const [offset, setOffset] = useState(0)
    const [showLoadMore, setShowLoadMore] = useState(true)
    const perPage = 12

    function checkLoadMore(data: ExerciseType[]) {
        if (data.length < perPage) {
            setShowLoadMore(false)
        }
        setDisplayData(displayData.concat(data))
    }
    const getExercises = async () => {
        try {
            offset > 0 && setIsRoundLoading(true)
            const data = await fetchExercises({ perPage: perPage, offset: offset })
            checkLoadMore(data)
            setOffset(perPage)

        } catch (e) {
            setError(true)
        } finally {
            setIsLoading(false)
            setIsRoundLoading(false)
        }
    }
    useEffect(() => {
        getExercises()
    }, [])

    return (
        <>
            <Head>
                <title>Exercises</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen p-5">
                    <Breadcrumb data-testid="breadcrumb">
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>Exercises</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    {error && (
                        <div data-testid="error-state">
                            <Heading>There was an error while fetching data, please check the logs</Heading>
                        </div>)}
                    <div className="pt-10 mx-20">
                        {isLoading && loadingState({ items: 12, grid: 3, height: "200px" })}
                    </div>
                    {displayData && displayData.length > 0 && (
                        <>
                            <div className="flex items-center justify-center">
                                <Heading size={"2xl"}>ALL EXERCISES</Heading>
                            </div>
                            <div data-testid="exercises-list" className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-3">
                                <>
                                    {displayData.map((e, i) => {
                                        return (
                                            <div key={`${e}-${i}`} className="items-center w-full px-10">
                                                <ExerciseCard exercise={e} />
                                            </div>

                                        )
                                    })}
                                </>
                            </div>
                        </>
                    )}
                    <div className="mx-20">
                        {isRoundLoading && loadingState({ items: 12, grid: 3, height: "200px" })}
                    </div>
                    <div className="flex w-full">
                        <div className="flex-1 flex items-center justify-center">
                            {!isLoading && showLoadMore && (<Button data-testid="load-more-button" variant="solid" onClick={getExercises}>Load more</Button>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
