"use client";
import { fetchExercises } from "@/api/exercises/basic";
import Head from "next/head";
import React from "react";
import { useEffect, useState } from "react";
import { ExerciseCard } from "../custom-components/ExerciseCard/ExerciseCard";
import { Button } from "@chakra-ui/react";
import { loadingState } from "../utils/functions";

export default function ExercisesPage() {
    const [displayData, setDisplayData] = useState<any[]>([])
    const [exercisesData, setExercisesData] = useState<any[]>([])
    const [error, setError] = useState(false)
    const [roundData, setRoundData] = useState<any[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [isRoundLoading, setIsRoundLoading] = useState(true)
    const [offset, setOffset] = useState(0)
    const [showLoadMore, setShowLoadMore] = useState(true)
    const perPage = 12

    function checkLoadMore(data: any[]) {
        if (data.length < perPage) {
            setShowLoadMore(false)
        }
        setRoundData(data)
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
        //getExercises()
    }, [])


//TODO: Add breadcrumbs
    return (
        <>
            <Head>
                <title>Exercises</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen">
                    {error && <div data-testid="error-message">THERE WAS AN ERROR WHILE FETCHING EXERCISES</div>}
                    <div className="pt-10 mx-20">
                        {isLoading && loadingState({items: 12, grid: 4, height:"200px"})}
                        </div>
                    <div className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-3">
                        {displayData && displayData.length > 0 && (
                            <div data-testid="exercises-list">
                                {displayData.map((e) => {
                                    return (
                                        <div key={e} className="items-center w-full px-10">
                                            <ExerciseCard exercise={e} />
                                        </div>

                                    )
                                })}
                            </div>
                        )}
                    </div>
                        <div className="mx-20">
                        {isRoundLoading && loadingState({items: 12, grid: 4, height:"200px"})}
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
