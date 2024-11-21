"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { fetchTargets } from "@/api/exercises/target";
import { BasicCard } from "@/app/custom-components/BasicCard/BasicCard";
import { loadingState } from "@/app/utils/functions"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Text } from "@chakra-ui/react";

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

    return (
        <>
            <Head>
                <title>Targets</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen p-5">
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
                        <BreadcrumbItem isCurrentPage>
                           <Text>Targets</Text>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="flex items-center align-center justify-center">
                            <Heading size={"2xl"}>Targets</Heading>
                    </div>
                    <div className="flex items-center align-center justify-center mt-6">
                            <Heading size={"lg"}>Set your sights on your goals and unlock your full potenital!</Heading>
                    </div>
                {error && (
              <div data-testid="error-state">
                <Heading>There was an error while fetching data, please check the logs</Heading>
              </div>)}
                        <div className="ml-20 pt-10 pr-20">
                        {isLoading && loadingState({items: 12, grid: 4})}
                        </div>
                    <div className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-4 pl-6">
                        {targetsData && targetsData.length > 0 && (
                            <>
                                {targetsData.map((item: string) => {
                                    return (
                                        <BasicCard key={item} belongsTo="focus-areas/targets" item={item} />
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