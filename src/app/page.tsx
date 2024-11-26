"use client";

import { Center, Divider, Grid, GridItem, Heading } from "@chakra-ui/react";
import { Banner } from "@/app/custom-components/Banner/Banner";
import React, { useEffect, useState } from "react";
import { CategoryTile } from "@/app/custom-components/CategoryTile/CategoryTile";
import { TrendingList } from "@/app/custom-components/TrendingList/TrendingList";
import { ExerciseType, fetchExercises } from "@/config/api/exercises/basic";
import { fetchEquipments } from "@/config/api/exercises/equipment";
import { loadingState } from "@/config/utils/functions";

const categories = [
  {
    id: 1,
    title: "Focus Areas",
    summary: "Decide which area you want to focus on!",
    url: "/exercises/focus-areas"
  },
  {
    id: 2,
    title: "Targets",
    summary: "Pick a specific target and go for it!",
    url: "/exercises/focus-areas/targets"
  },
  {
    id: 3,
    title: "Equipment",
    summary: "Explore the list of equipment ans start your journey!",
    url: "/equipment"
  }
]


export default function Home() {

  const [errorExercises, setErrorExercises] = useState(false)
  const [errorEquipment, setErrorEquipment] = useState(false)
  const [isLoadingExercises, setIsLoadingExercises] = useState(true)
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(true)
  const [trendingExericses, setTrendingExercises] = useState<ExerciseType[]>()
  const [trendingEquipment, setTrendingEquipment] = useState<string[]>()

  const getTrendingExercises = async () => {
    try {
      setIsLoadingExercises(true)
      const data = await fetchExercises({ perPage: 3, offset: (Math.floor(Math.random() * 20) * 1) })
      setTrendingExercises(data)
    } catch (e) {
      console.error(e)
      setErrorExercises(true)
    } finally {
      setIsLoadingExercises(false)
    }
  }

  const getTrendingEquipment = async () => {
    try {
      setIsLoadingEquipment(true)
      const data = await fetchEquipments()
      const randomItems = data.sort(() => 0 - Math.random()).slice(0, 3)
      setTrendingEquipment(randomItems)
    } catch (e) {
      console.error(e)
      setErrorEquipment(true)
    } finally {
      setIsLoadingEquipment(false)
    }
  }

  useEffect(() => {
    getTrendingExercises()
    getTrendingEquipment()
  }, [])

  return (
    <div data-testid="main" className="pb-10 min-h-screen">
      <main className="items-center sm:items-start">
        <Banner data-testid="banner-container" />
        <Grid templateColumns={'repeat(3, 1fr)'} gap={4} p={4}>
          {categories.map((category) => {
            return (
              <CategoryTile key={category.id} title={category.title} summary={category.summary} url={category.url} />
            )
          })}
        </Grid>
        <>
          <Grid templateColumns='repeat(12, 1fr)' marginBottom={20}>
            <GridItem colSpan={5} p={4}>
              {isLoadingExercises &&
                loadingState({ items: 3, grid: 3, colSpan: 3, height: "30px", width: "100%" })
              }
              {errorExercises && (
                <div data-testid="error-exercises-state">
                  <Heading>There was an error while fetching data, please check the logs</Heading>
                </div>
              )}
            {!isLoadingExercises && !errorExercises && <TrendingList title="Trending Exercises" list={trendingExericses || []} />}
            </GridItem>
            <GridItem colSpan={2} >
              <Center height='100%'>
                <Divider orientation='vertical' />
              </Center>
            </GridItem>
            <GridItem colSpan={5}  p={4}>
              {isLoadingEquipment && loadingState({ items: 3, grid: 3, colSpan: 3, height: "30px", width: "100%" })}
              {errorEquipment && (
                <div data-testid="error-equipment-state">
                  <Heading>There was an error while fetching data, please check the logs</Heading>
                </div>
              )}
            {!isLoadingEquipment && !errorEquipment && <TrendingList title="Trending Equipment" list={trendingEquipment || []} />}
            </GridItem>
          </Grid>
        </>
      </main>
    </div>
  );
}
