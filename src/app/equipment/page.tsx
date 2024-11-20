"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { fetchEquipments } from "@/api/exercises/equipment";
import { Skeleton, Stack } from "@chakra-ui/react";
import { EquipmentCard } from "../custom-components/EquipmentCard/EquipmentCard"

export default function EquipmentPage() {

    const [equipmentData, setEquipmentData] = useState<any[]>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getEquipment = async () => {
        try {
            const data = await fetchEquipments()
            setEquipmentData(data)
        } catch (e) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getEquipment()
    }, [])

    const loadingState = <>
        {Array(12)
            .fill(null)
            .map((_, index) => (
                <Stack key={index} maxW="xs">
                    <Skeleton className="skeleton" height="70px" marginInline={"80px"} width={"300px"} />

                </Stack>
            ))}
    </>

    return (
        <>
            <Head>
                <title>Equipments</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen">
                    {error && <>THERE WAS AN ERROR WHILE FETCHING EQUIPMENT</>}
                    <div className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-3">
                        {isLoading && loadingState}
                        {equipmentData && equipmentData.length > 0 && (
                            <>
                                {equipmentData.map((e) => {
                                    return (
                                        <div key={e} className="items-center w-full px-10">
                                            <EquipmentCard exercise={e} />
                                        </div>
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
