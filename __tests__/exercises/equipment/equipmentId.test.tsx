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
describe.skip("ExerciseByAreaPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading state initially", async () => {

    act( () => {
      render(<ExerciseByEquipmentPage params={Promise.resolve({ equipmentId: "dumbbell" })} />);
    });

    await waitFor(()=> {
        expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    })
  });

  it("renders exercise data correctly after loading", async () => {
    mockFetchExerciseByEquipment.mockResolvedValueOnce(mockExercisesList);

    await act(async () => {
      render(<ExerciseByEquipmentPage params={Promise.resolve({ equipmentId: "dumbbell" })} />);
    });

    await waitFor(() => {
        expect(screen.getByTestId("advanced-card")).toBeInTheDocument();
    });

    expect(screen.queryByText("jump")).toBeInTheDocument();
    expect(screen.queryByText("curl")).toBeInTheDocument();
  });

  it("displays an error message when fetching data fails", async () => {
    mockFetchExerciseByEquipment.mockRejectedValueOnce(new Error("Fetch error"));

    await act(async () => {
      render(<ExerciseByEquipmentPage params={Promise.resolve({ equipmentId: "dumbbell" })} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("THERE WAS AN ERROR WHILE FETCHING EXERCISES BY TARGET")
      ).toBeInTheDocument();

      expect(screen.getByTestId("error-message"))
    });
  });

  it("renders empty state when no exercises are available", async () => {
    mockFetchExerciseByEquipment.mockResolvedValueOnce([]);

    await act(async () => {
      render(<ExerciseByEquipmentPage params={Promise.resolve({ equipmentId: "dumbbell" })} />);
    });

    await waitFor(() => {
        expect(screen.getByTestId("advanced-card")).not.toBeInTheDocument();

    });

  });
});