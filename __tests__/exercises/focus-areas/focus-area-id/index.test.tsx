import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ExercisesByAreaPage from "@/app/exercises/focus-areas/[focusAreaId]/page";

const mockFetchExerciseByBodyPart = jest.fn();

jest.mock("@/config/api/exercises/body-parts", () => {
  return {
    fetchExercisesByBodyPart: () => mockFetchExerciseByBodyPart()
  }
})

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      focusAreaId: "chest"
    }
  })
}))


const mockExerciseData = [
  { name: "Push Up", bodyPart: "Chest", id: "1", gifUrl: "", target: "target", secondaryMuscles: ["secondary, secondary2"], equipment: "equipment", instructions: [] },
  { name: "Squat", bodyPart: "Legs", id: "2", gifUrl: "", target: "target", secondaryMuscles: ["secondary, secondary2"], equipment: "equipment", instructions: [] },
];

describe("ExerciseByAreaPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading state initially", async () => {
    await act(async () => {
      render(<ExercisesByAreaPage params={{focusAreaId: "chest"}} />);
    });

    waitFor(() => {
      expect(screen.queryByTestId("loading-state")).toBeInTheDocument();
    });

  });

  it("renders exercises data correctly after loading", async () => {
    mockFetchExerciseByBodyPart.mockResolvedValueOnce(mockExerciseData);

    await act(async () => {
      render(<ExercisesByAreaPage params={{focusAreaId: "chest"}} />);
    });


    await waitFor(() => {
      expect(screen.getByText("PUSH UP")).toBeInTheDocument();
      expect(screen.getByText("SQUAT")).toBeInTheDocument();
    });

  });

  it("displays an error message when fetching data fails", async () => {
    mockFetchExerciseByBodyPart.mockRejectedValueOnce({ name: "error" });

    await act(async () => {
      render(<ExercisesByAreaPage params={{focusAreaId: "chest"}} />);
    });


    await waitFor(() => {
      expect(
        screen.getByText("There was an error while fetching data, please check the logs")
      ).toBeInTheDocument();
    });
  });

  it("renders empty state when no exercises are available", async () => {
    mockFetchExerciseByBodyPart.mockResolvedValueOnce([]);

    await act(async () => {
      render(<ExercisesByAreaPage params={{focusAreaId: "chest"}} />);
    });


    await waitFor(() => {
      expect(screen.queryByText("Push Up")).not.toBeInTheDocument();
      expect(screen.queryByText("Squat")).not.toBeInTheDocument();
    });

  });
});