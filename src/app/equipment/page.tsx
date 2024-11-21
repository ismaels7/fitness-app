"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { fetchEquipments } from "@/api/exercises/equipment";
import { EquipmentCard } from "../custom-components/EquipmentCard/EquipmentCard"
import { loadingState } from "../utils/functions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from "@chakra-ui/react";

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


    return (
        <>
            <Head>
                <title>Equipments</title>
            </Head>
            <div className="pb-10">
                <div className="items-center sm:items-start min-h-screen p-5">
                <Breadcrumb data-testid="breadcrumb">
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Equipment</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
                {error && (
              <div data-testid="error-state">
                <Heading>There was an error while fetching data, please check the logs</Heading>
              </div>)}
                    <div className="pt-10 mx-20">
                        {isLoading && loadingState({ items: 12, grid: 4 })}
                    </div>
                    <div className="flex items-center justify-center">
                  <Heading size={"2xl"}>Equipment</Heading>
                </div>
                    {equipmentData && equipmentData.length > 0 && (
                        <div data-testid="equipment-list" className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-3">
                            <>
                                {equipmentData.map((e,i) => {
                                    return (
                                        <EquipmentCard key={e+i} exercise={e} />
                                    )
                                })}
                            </>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
