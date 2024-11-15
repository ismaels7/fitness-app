"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { CategoryBanner } from "../custom-components/CategoryBanner/CategoryBanner";
import { fetchBodyParts } from "@/api/exercises/body-parts";

export default function BodyPartsPage() {

    const [bodyPartsData, setBodyPartsData] = useState<any[]>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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
        getBodyParts()
    }, [])
    return (
        <>
            <Head>
                <title>Body Parts</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen">
                    <CategoryBanner title="Body Parts" />
                    This is the body parts page
                    {isLoading && <>LOADING EXERCISES</>}
                    {error && <>THERE WAS AN ERROR WHILE FETCHING BODY PARTS</>}
                    {bodyPartsData && bodyPartsData.length > 0 && (
                        <>
                            {bodyPartsData.map((item) => {
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
