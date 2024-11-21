"use client"
import { fetchExercisesByBodyPart } from "@/api/exercises/body-parts";
import { AdvancedCard } from "@/app/custom-components/AdvancedCard/AdvancedCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
import { formatTitle, loadingState } from "../../../utils/functions";


export default function ExercisesByAreaPage(props: { params: Promise<{ focusAreaId: string }> }) {
  const params = use(props.params);
  const focusAreaId = params.focusAreaId
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseData, setExerciseData] = useState<any>()

  const getExercise = async () => {
    try {
      const data = await fetchExercisesByBodyPart({ id: focusAreaId })
      setExerciseData(data)
    } catch (e) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getExercise()
  }, [focusAreaId])



  return (
    <>
      <Head>
        <title>By Area</title>
      </Head>
      <div className="pb-10">
        <div className="items-center min-h-screen p-5">
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
              <BreadcrumbLink>{formatTitle(focusAreaId)}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="flex items-center justify-center">
            <Heading size={"2xl"}>{formatTitle(focusAreaId)} Exercises</Heading>
          </div>
          <Grid p={10} alignContent={"center"} justifyContent={"center"}>
            {isLoading && loadingState({ items: 4, grid: 12, colSpan: 12, width: "700px", height: "500px" })}
            {error && (
              <div data-testid="error-state">
                <Heading>There was an error while fetching data, please check the logs</Heading>
              </div>)}
            {exerciseData && exerciseData.map((exercise: any, i: number) => {
              return <AdvancedCard key={`${exercise.name}-${i}`} exercise={exercise} />
            })}
          </Grid>
        </div>
      </div>
    </>
  )
}
