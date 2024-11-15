"use client";
import { fetchExercises } from "@/api/exercises/basic";
import Head from "next/head";
import React from "react";
import { useEffect, useState } from "react";
import { ExerciseCard } from "../custom-components/ExerciseCard/ExerciseCard";

export default function ExercisesPage() {
    const [exercisesData, setExercisesData] = useState<any[]>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [perPage, setPerPage] = useState(0)
    useEffect(() => {
        const getExercises = async () => {
            try {
                const data = await fetchExercises({perPage: perPage, page: page})
                setExercisesData(data)
            } catch (e) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }

        getExercises()
    }, [])

    return (
        <>
            <Head>
                <title>Exercises</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen">

                This si the exercises page
                {isLoading && <>LOADING EXERCISES</>}
                {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES</>}
                {exercisesData && exercisesData.length > 0 && (
                    <>
                        {exercisesData.map((e) => {
                            return (
                                <ExerciseCard id={e.id} name={e.name} src={e.gifUrl} />

                            )
                        })}</>
                )}
                </div>
            </div>
        </>
    )
}
