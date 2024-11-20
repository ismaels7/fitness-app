"use client"
import { fetchExerciseByBodyPart } from "@/api/exercises/body-parts";
import { AdvancedCard } from "@/app/custom-components/AdvancedCard/AdvancedCard";
import {  Skeleton, Stack, Grid } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";


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

  const loadingState = <>
    <Stack>
      <Skeleton className="skeleton" height="400px" marginInline={"80px"} width={"700px"} />
    </Stack>
  </>


  return (
    <>
      <Head>
        <title>By Area</title>
      </Head>
      <div className="pb-10">
        {/* TOD: show heading 'area: back '(for example) */}
        <div className="items-center min-h-screen">
          <Grid p={10} alignContent={"center"} justifyContent={"center"}>
            {isLoading && loadingState}
            {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES</>}
            {exerciseData && exerciseData.map((exercise: any) => {
              return <AdvancedCard exercise={exercise}/>
            })}
          </Grid>
        </div>
      </div>
    </>
  )
}
