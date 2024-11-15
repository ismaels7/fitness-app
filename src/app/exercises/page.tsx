"use client";
import { fetchExercises } from "@/api/exercises/basic";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function ExercisestPage() {
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

    useEffect(()=> {console.log('isLoading', isLoading)}, [isLoading])
    return (
        <>
            <Head>
                <title>Exercises</title>
            </Head>
            <div className="">
                This si the exercises page
                {isLoading && <>LOADING EXERCISES</>}
                {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES</>}
                {exercisesData && exercisesData.length > 0 && (
                    <>
                        {exercisesData.map((e) => {
                            return (
                                <div key={e.id}>
                                    <p>{e.name}</p>
                                    <img src={e.gifUrl}></img>
                                </div>
                            )
                        })}</>
                )}
            </div>
        </>
    )
}
