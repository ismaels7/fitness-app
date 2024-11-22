import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ExercisesPage from "@/app/exercises/page";
import { ExerciseType } from "@/api/exercises/basic";

type ExercisesListType = {
    bodyPart: string,
    equipment: string,
    gifUrl: string,
    id: string,
    name: string,
    target: string,
    secondaryMuscles: string[],
    instructions: string[],
}

const mockExercisesList: ExercisesListType[] = [
    {
        bodyPart: "arm",
        equipment: "weights",
        gifUrl: "",
        id: "0001",
        name: "curl",
        target: "biceps",
        secondaryMuscles: ["triceps"],
        instructions: ["Grab a weight", "Lift it", "Repeat as much as you want"]
    },
    {
        bodyPart: "legs",
        equipment: "running shoes",
        gifUrl: "",
        id: "0002",
        name: "jump",
        target: "calf",
        secondaryMuscles: [],
        instructions: ["Run", "Run again", "Repeat as much as you want"]
    }
]
const mockFetchExercises = jest.fn()
jest.mock("@/api/exercises/basic", () => {
    return {
        fetchExercises: () => mockFetchExercises(),
    }
});

jest.mock("@/app/utils/functions", () => ({
    loadingState: jest.fn(() => <div data-testid="loading-state">Loading...</div>),
}));

jest.mock("@/app/custom-components/ExerciseCard/ExerciseCard", () => ({
    ExerciseCard: ({ exercise }: { exercise: ExerciseType }) => (
        <div data-testid="exercise-card">{exercise.name}</div>
    ),
}));

describe("ExercisesPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the ExercisesPage with data", async () => {
        mockFetchExercises.mockResolvedValueOnce(mockExercisesList)
        act(() => {
            render(<ExercisesPage />)
        })

        waitFor(() => expect(screen.getByTestId("exercises-list")).toBeInTheDocument())
    });

    it("displays loading state initially", () => {
        act(() => {
            render(<ExercisesPage />)
        })

        waitFor(() => expect(screen.getByTestId("loading-state")).toBeInTheDocument())
    });

    it("shows an error message if fetching exercises fails", async () => {
        mockFetchExercises.mockRejectedValue({name: "error"});
        act(() => {
            render(<ExercisesPage />)
        })

        waitFor(() => expect(screen.getByTestId("error-state")).toBeInTheDocument())
    });

    it("renders load more button", async () => {
        mockFetchExercises.mockResolvedValueOnce(mockExercisesList)
        act(() => {
            render(<ExercisesPage />)
        })
        waitFor(() => {
            const loadMoreElement = screen.getByTestId("load-more-button")
            expect(loadMoreElement).toBeInTheDocument()
            expect(screen.getByTestId("exercises-list")).toBeInTheDocument()
            fireEvent.click(loadMoreElement)
            expect(screen.getByTestId("loading-state")).toBeInTheDocument()
        })

    });

    it("hides the 'Load more' button when there is no more data to load", async () => {
        const mockExercises: ExerciseType[] = []; 
        mockFetchExercises.mockResolvedValueOnce(mockExercises)
        act(() => {
            render(<ExercisesPage />)
        })

        waitFor(() => {
            const loadMoreElement = screen.getByTestId("load-more-button")
            expect(loadMoreElement).not.toBeInTheDocument()
        })

    });
});