"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { CategoryBanner } from "../../../custom-components/CategoryBanner/CategoryBanner";
import { fetchTarget } from "@/api/exercises/target";

export default function TargetPage() {

    const [targetsData, setTargetsData] = useState<any[]>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const categoryData = {
        name: "Targets",
        url: "/targets"
    }

    useEffect(() => {
        const getTargets = async () => {
            try {
                const data = await fetchTarget()
                setTargetsData(data)
            } catch (e) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getTargets()
    }, [])
    return (
        <>
            <Head>
                <title>Targets</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen">
                    <CategoryBanner category={categoryData}/>
                    This is the target page
                    {isLoading && <>LOADING EXERCISES</>}
                    {error && <>THERE WAS AN ERROR WHILE FETCHING TARGETS</>}
                    {targetsData && targetsData.length > 0 && (
                        <>
                            {targetsData.map((item) => {
                                return (
                                    <p>{item}</p>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
