"use client"
import { fetchExerciseByBodyPart } from "@/api/exercises/body-parts";
import { AdvancedCard } from "@/app/custom-components/AdvancedCard/AdvancedCard";
import { Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
import { formatTitle, loadingState } from "../../../utils/functions";


export default function ExerciseByAreaPage({ params }: { params: Promise<{ focusAreaId: string }> }) {
  const { focusAreaId } = use(params);
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseData, setExerciseData] = useState<any>()

  const getExercise = async () => {
    try {
      const data = await fetchExerciseByBodyPart({ id: focusAreaId })
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
        <div className="items-center min-h-screen">
          {/* TOD: show heading 'area: back '(for example) */}
          <Heading size={"4xl"}>{formatTitle(focusAreaId)} Exercises</Heading>
          <Grid p={10} alignContent={"center"} justifyContent={"center"}>
            {isLoading && loadingState({ items: 4, grid: 12, colSpan: 12, width: "700px", height: "500px" })}
            {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES</>}
            {exerciseData && exerciseData.map((exercise: any) => {
              return <AdvancedCard key={exercise.name} exercise={exercise} />
            })}
          </Grid>
        </div>
      </div>
    </>
  )
}
