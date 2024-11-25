"use client";

import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { Banner } from "./custom-components/Banner/Banner";
import React, { useEffect, useState } from "react";
import { CategoryTile } from "./custom-components/CategoryTile/CategoryTile";
import { TrendingList } from "./custom-components/TrendingList/TrendingList";
import { ExerciseType, fetchExercises } from "@/api/exercises/basic";
import { fetchEquipments } from "@/api/exercises/equipment";
import { loadingState } from "./utils/functions";

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
        <div className="grid grid-cols-1 gap-5 mx-8 my-20 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            return (
              <CategoryTile key={category.id} title={category.title} summary={category.summary} url={category.url} />
            )
          })}
        </div>
        <>
          <Grid templateColumns="1fr 2px 1fr" gap="1" m={8} marginBottom={20}>
            {isLoadingExercises && <div className="flex pl-7 items-center justfy-center">
              {loadingState({ items: 3, grid: 3, colSpan: 3, height: "30px", width: "800px" })}
            </div>}
              {errorExercises && (
                <div data-testid="error-exercises-state">
                  <Heading>There was an error while fetching data, please check the logs</Heading>
                </div>
              )}
            {!isLoadingExercises && !errorExercises &&  <TrendingList title="Trending Exercises" list={trendingExericses || []} />}
            <GridItem>
              <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"1px"} bg={"gray.400"} height={"100%"} />
            </GridItem>
            {isLoadingEquipment && <div className="flex pl-7 items-center justfy-center">
              {loadingState({ items: 3, grid: 3, colSpan: 3, height: "30px", width: "800px" })}
            </div>}
            {errorEquipment && (
              <div data-testid="error-equipment-state">
                <Heading>There was an error while fetching data, please check the logs</Heading>
              </div>
            )}
            {!isLoadingEquipment && !errorEquipment && <TrendingList title="Trending Equipment" list={trendingEquipment || []} />}
          </Grid>
        </>


      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center mt-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ismaels7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/ismaelsegoviano/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
