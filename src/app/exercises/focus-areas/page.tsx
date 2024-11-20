"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { fetchBodyParts } from "@/api/exercises/body-parts";
import { Skeleton, Stack } from "@chakra-ui/react";
import { BasicCard } from "@/app/custom-components/BasicCard/BasicCard";

export default function BodyPartsPage() {

    const [bodyPartsData, setBodyPartsData] = useState<any[]>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getBodyParts = async () => {
        try {
            const data = await fetchBodyParts()
            setBodyPartsData(data)
        } catch (e) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBodyParts()
    }, [])

    const loadingState = <>
        {Array(12)
            .fill(null)
            .map((_, index) => (
                <Stack key={index} maxW="xs">
                    <Skeleton className="skeleton" height="150px" marginInline={"80px"} width={"510px"} />
                </Stack>
            ))}
    </>


    return (
        <>
            <Head>
                <title>Body Parts</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen">
                    {error && <>THERE WAS AN ERROR WHILE FETCHING BODY PARTS</>}
                    <div className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-5">
                        {isLoading && loadingState}
                        {bodyPartsData && bodyPartsData.length > 0 && (
                            <>
                                {bodyPartsData.map((item: string) => {
                                    return (
                                        <BasicCard key={item} belongsTo="focus-areas" item={item}/>
                                    )
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
