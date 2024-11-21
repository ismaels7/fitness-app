import React, {act} from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ExerciseByEquipmentPage from "@/app/exercises/equipment/[equipmentId]/page";

const mockFetchExerciseByEquipment = jest.fn()
jest.mock("@/api/exercises/equipment", () => {
    return {
        fetchExerciseByEquipment: () => mockFetchExerciseByEquipment()
    }
});

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
        equipment: "dumbbell",
        gifUrl: "",
        id: "0001",
        name: "curl",
        target: "biceps",
        secondaryMuscles: ["triceps"],
        instructions: ["Grab a weight", "Lift it", "Repeat as much as you want"]
    },
    {
        bodyPart: "legs",
        equipment: "dumbbell",
        gifUrl: "",
        id: "0002",
        name: "jump",
        target: "calf",
        secondaryMuscles: [],
        instructions: ["Run", "Run again", "Repeat as much as you want"]
    }
]
describe("ExerciseByAreaPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading state initially", async () => {

    await act( () => {
      render(<ExerciseByEquipmentPage params={Promise.resolve({ equipmentId: "dumbbell"})} />);
    });

    waitFor(()=> {
        expect(screen.queryAllByTestId("loading-state")).toBeInTheDocument();
    })
  });

  it("renders exercise data correctly after loading", async () => {
    mockFetchExerciseByEquipment.mockResolvedValueOnce(mockExercisesList);

    await act(async () => {
      render(<ExerciseByEquipmentPage params={Promise.resolve({ equipmentId: "dumbbell"})} />);
    });

    await waitFor(() => {
        expect(screen.getAllByTestId("advanced-card")).toHaveLength(2);
        expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
        expect(screen.queryByText("Jump")).toBeInTheDocument();
        expect(screen.queryByText("Curl")).toBeInTheDocument();
    });

  });

  it("displays an error message when fetching data fails", async () => {
    mockFetchExerciseByEquipment.mockRejectedValueOnce(new Error("Fetch error"));

    await act(async () => {
      render(<ExerciseByEquipmentPage params={Promise.resolve({ equipmentId: "dumbbell"})} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("There was an error while fetching data, please check the logs")
      ).toBeInTheDocument();

      expect(screen.getByTestId("error-state"))
    });
  });

  it("renders empty state when no exercises are available", async () => {
    mockFetchExerciseByEquipment.mockResolvedValueOnce([]);

    await act(async () => {
      render(<ExerciseByEquipmentPage params={Promise.resolve({ equipmentId: "dumbbell"})} />);
    });

    await waitFor(() => {
        expect(screen.queryByTestId("advanced-card")).not.toBeInTheDocument();

    });

  });
});