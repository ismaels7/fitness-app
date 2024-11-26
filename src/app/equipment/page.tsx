"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { fetchEquipments } from "@//config/api/exercises/equipment";
import { EquipmentCard } from "@//app/custom-components/EquipmentCard/EquipmentCard"
import { loadingState } from "@//config/utils/functions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from "@chakra-ui/react";

export default function EquipmentPage() {

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [equipmentData, setEquipmentData] = useState<string[]>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getEquipment = async () => {
        try {
            const data = await fetchEquipments()
            setEquipmentData(data)
        } catch (e) {
            console.error(e)
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const storedItems = localStorage.getItem("selectedEquipment")
        if (storedItems){
            setSelectedItems(JSON.parse(storedItems))
        }
        getEquipment()
    }, [])


    useEffect(()=> {
        if (selectedItems.length > 0) {
            localStorage.setItem("selectedEquipment", JSON.stringify(selectedItems))
        }
    },[selectedItems])


    const handleCheckboxChange = (name:string) =>{
        if (selectedItems.includes(name)) {
            setSelectedItems((prev)=> prev.filter((item)=> item !==name))
        } else {
            const x = [...selectedItems, name]
            setSelectedItems(x)
        }
    }


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
                    <div className="flex items-center align-center justify-center">
                            <Heading size={"2xl"}>EQUIPMENT</Heading>
                    </div>
                    <div className="flex items-center align-center justify-center mt-6">
                            <Heading size={"lg"}>Manage the equipment you already own!</Heading>
                    </div>
                    {error && (
                        <div data-testid="error-state">
                            <Heading>There was an error while fetching data, please check the logs</Heading>
                        </div>)}
                    <div className="pt-10 mx-20">
                        {isLoading && loadingState({ items: 12, grid: 4 })}
                    </div>
                    {equipmentData && equipmentData.length > 0 && (
                        <div data-testid="equipment-list" className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-3">
                            <>
                                {equipmentData.map((e, i) => {
                                    return (
                                        <EquipmentCard key={e + i} checked={selectedItems.includes(e)} exercise={e} onChange={handleCheckboxChange}/>
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
