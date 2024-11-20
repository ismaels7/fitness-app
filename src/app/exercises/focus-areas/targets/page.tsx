"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { fetchTargets } from "@/api/exercises/target";
import { Skeleton, Stack } from "@chakra-ui/react";
import { BasicCard } from "@/app/custom-components/BasicCard/BasicCard";

export default function TargetPage() {

    const [targetsData, setTargetsData] = useState<any[]>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getTargets = async () => {
        try {
            const data = await fetchTargets()
            setTargetsData(data)
        } catch (e) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getTargets()
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
                <title>Targets</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen">
                    {error && <>THERE WAS AN ERROR WHILE FETCHING BODY PARTS</>}
                    <div className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-4">
                        {isLoading && loadingState}
                        {targetsData && targetsData.length > 0 && (
                            <>
                                {targetsData.map((item: string) => {
                                    return (
                                        <BasicCard belongsTo="body-parts/targets" item={item} />
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