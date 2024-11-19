"use client"
import { fetchExercise } from "@/api/exercises/basic";
import { CategoryBanner } from "@/app/custom-components/CategoryBanner/CategoryBanner";
import { ExerciseCard } from "@/app/custom-components/ExerciseCard/ExerciseCard";
import { Skeleton, Stack } from "@chakra-ui/react";
import Head from "next/head";
import React, { use, useEffect, useState } from "react";
interface DynamicProps {
  params: { slug: string }
}


export default function TargetPage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { exerciseId } = use(params);
  const [exerciseData, setExerciseData] = useState<any>()
  const categoryData = {
    name: "Exercises",
    url: "/exercises"
  }
  useEffect(() => {
    const getExercise = async () => {
      try {
        const data = await fetchExercise({ id: exerciseId })
        setExerciseData(data)
      } catch (e) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getExercise()
  }, [exerciseId])

  const loadingState = <>

    <Stack maxW="xl">
      <Skeleton className="skeleton" height="150px" marginInline={"80px"} width={"470px"} />

    </Stack>
  </>

  return (
    <>
      <Head>
        <title>Exercise 1</title>
      </Head>
      <div className="pb-10">
        <div className="items-center sm:items-start min-h-screen">
          <CategoryBanner category={categoryData} />
          {isLoading && loadingState}
          {error && <>THERE WAS AN ERROR WHILE FETCHING EXERCISES</>}
          {exerciseData && (
            <div className="items-center w-full px-20">
              <ExerciseCard id={exerciseData.id} name={exerciseData.name} src={exerciseData.gifUrl} />
            </div>
          )}
      </div>
      </div>
    </>
  )
}
