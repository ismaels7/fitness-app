"use client";
import { fetchExercises } from "@/api/exercises/basic";
import Head from "next/head";
import React from "react";
import { useEffect, useState } from "react";
import { ExerciseCard } from "../custom-components/ExerciseCard/ExerciseCard";
import { CategoryBanner } from "../custom-components/CategoryBanner/CategoryBanner";
import { Button, Skeleton, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function ExercisesPage() {
    const router = useRouter()
    const [displayData, setDisplayData] = useState<any[]>([])
    const [exercisesData, setExercisesData] = useState<any[]>([])
    const [error, setError] = useState(false)
    const [roundData, setRoundData] = useState<any[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [isRoundLoading, setIsRoundLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [showLoadMore, setShowLoadMore] = useState(true)
    const perPage = 12
    const categoryData = {
        name: "Exercises",
        url: "/exercises"
    }
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
        getExercises()
    }, [])

    const loadingState = <>
    {Array(12)
        .fill(null)
        .map((_, index) => (
            <Stack key={index} maxW="xs">
            <Skeleton className="skeleton" height="150px" marginInline={"80px"} width={"470px"} />

        </Stack>
        ))}
</>

    return (
        <>
            <Head>
                <title>Exercises</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen">
                    <CategoryBanner category={categoryData} />

                    {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES</>}
                    <div className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-3">
                        {isLoading && loadingState }
                        {displayData && displayData.length > 0 && (
                            <>
                                {displayData.map((e) => {
                                    console.log('All Data', e)
                                    return (
                                        <div className="items-center w-full px-20">
                                        <ExerciseCard id={e.id} name={e.name} src={e.gifUrl} />
                                        </div>

                                    )
                                })}
                            </>
                        )}
                    {isRoundLoading && loadingState }
                    </div>
                    <div className="flex w-full">
                        <div className="flex-1 flex items-center justify-center">
                    {!isLoading && showLoadMore && (<Button variant="solid" onClick={getExercises}>Load more</Button>)}
                        </div>
                            
                    </div>
                </div>
            </div>
        </>
    )
}
