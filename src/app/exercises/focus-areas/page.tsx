"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { fetchBodyParts } from "@/api/exercises/body-parts";
import { BasicCard } from "@/app/custom-components/BasicCard/BasicCard";
import { loadingState } from "@/app/utils/functions"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Text } from "@chakra-ui/react";

export default function FocusAreasPage() {

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


    return (
        <>
            <Head>
                <title>Body Parts</title>
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
                        <BreadcrumbItem isCurrentPage>
                           <Text>Focus Areas</Text>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="flex items-center align-center justify-center">
                            <Heading size={"2xl"}>Focus Areas</Heading>
                    </div>
                    <div className="flex items-center align-center justify-center mt-6">
                            <Heading size={"lg"}>Focus on the muscles that matter most of your progress!</Heading>
                    </div>
                {error && (
              <div data-testid="error-state">
                <Heading>There was an error while fetching data, please check the logs</Heading>
              </div>)}
                    <div className="p-10 ml-5">
                        {isLoading && loadingState({items: 10, grid: 5})}
                    </div>
                    <div className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-5">
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
