"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { CategoryBanner } from "../custom-components/CategoryBanner/CategoryBanner";
import { fetchEquipment } from "@/api/exercises/equipment";

export default function EquipmentPage() {

    const [equipmentData, setEquipmentData] = useState<any[]>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getEquipment = async () => {
            try {
                const data = await fetchEquipment()
                setEquipmentData(data)
            } catch (e) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getEquipment()
    }, [])
    return (
        <>
            <Head>
                <title>Equipments</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen">
                    <CategoryBanner title="Equipment" />
                    This is the equipment page
                    {isLoading && <>LOADING EXERCISES</>}
                    {error && <>THERE WAS AN ERROR WHILE FETCHING EQUIPMENT</>}
                    {equipmentData && equipmentData.length > 0 && (
                        <>
                            {equipmentData.map((item) => {
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
