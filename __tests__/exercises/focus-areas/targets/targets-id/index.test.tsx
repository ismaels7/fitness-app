import React, {act} from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Target from "@/app/exercises/focus-areas/targets/[targetId]/page"; 

const mockFetchExercisesByTarget = jest.fn();
jest.mock("@/api/exercises/target", () => ({
    fetchExercisesByTarget: () => mockFetchExercisesByTarget(),
}));



const mockExerciseData = [
    { name: "Push Up", bodyPart: "Chest", id: "1", gifUrl: "", target: "target", secondaryMuscles: ["triceps", "shoulders"], equipment: "equipment", instructions: [] },
    { name: "Squat", bodyPart: "Legs", id: "2", gifUrl: "", target: "target", secondaryMuscles: ["triceps", "shoulders"], equipment: "equipment", instructions: [] },
  ];

describe("Target Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading state initially", async () => {
    mockFetchExercisesByTarget.mockResolvedValueOnce(mockExerciseData);

    await act(async () => {
      render(<Target params={Promise.resolve({ targetId: "pectorals"})} />);
    });

    waitFor(() => {
      expect(screen.queryByTestId("loading-state")).toBeInTheDocument();
    });
  });

  it("renders target exercises correctly after loading", async () => {
    mockFetchExercisesByTarget.mockResolvedValueOnce(mockExerciseData);
 
    await act(async () => {
        render(<Target params={Promise.resolve({ targetId: "pectorals"})} />);
    });

    await waitFor(() => {
      const detailsPanel = screen.getAllByTestId("details-panel")
      const breadcumbElement = screen.getByTestId("breadcrumb")
      expect(detailsPanel).toHaveLength(2);
      expect(breadcumbElement).toBeInTheDocument()
    });
  });

  it("displays an error message when fetching exercises fails", async () => {
    mockFetchExercisesByTarget.mockRejectedValueOnce(new Error("Fetch error"));

    await act(async () => {
        render(<Target params={Promise.resolve({ targetId: "pectorals"})} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("There was an error while fetching data, please check the logs")
      ).toBeInTheDocument();
    });
  });

  it("renders empty state when no exercises data is available", async () => {
    mockFetchExercisesByTarget.mockResolvedValueOnce([]);

    await act(async () => {
        render(<Target params={Promise.resolve({ targetId: "pectorals"})} />);
    });


    await waitFor(() => {
      expect(screen.queryByText("Push-up")).not.toBeInTheDocument();
      expect(screen.queryByText("Squat")).not.toBeInTheDocument();
      expect(screen.queryByText("Plank")).not.toBeInTheDocument();
      expect(screen.queryByText("Pull-up")).not.toBeInTheDocument();
    });

  });
});