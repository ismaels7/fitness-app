import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ExercisePage from "@/app/exercises/[exerciseId]/page";
import { ChakraProvider } from "@chakra-ui/react";
import { formatTitle } from "@/config/utils/functions";

const mockFetchExercise = jest.fn()
jest.mock("../../src/config/api/exercises/basic/", () => {
    return {
        fetchExercise: () => mockFetchExercise(),
    }
});

jest.mock("next/router", () => ({
    useRouter: () => ({
      query: {
        exerciseId: "001" 
      }
    })
  }))

const mockExerciseData = {
    id: "001",
    name: "push-up",
    gifUrl: "https://example.com/pushup.gif",
    bodyPart: "chest",
    target: "pectorals",
    secondaryMuscles: ["triceps", "shoulders"],
    equipment: "bodyweight",
    instructions: ["Start in a plank position", "Lower your body", "Push back up"],
};


describe("ExercisePage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the loading state initially", async () => {

       await act(() => {
            render(<ExercisePage  params={{exerciseId: "0001"}} />);
        })
 
         waitFor(() => {
            expect(screen.queryByTestId("loading-state")).toBeInTheDocument();
        });
    });

    it("renders exercise data correctly after loading", async () => {

        mockFetchExercise.mockResolvedValueOnce(mockExerciseData);
   
        await act(async () => {
            render(<ChakraProvider>
                <ExercisePage  params={{exerciseId: "0001"}} />;
            </ChakraProvider>);
        });   
 
        await waitFor(() => {
            const headingElement = screen.getByTestId("heading")
            const breadcrumbElement = screen.getByTestId("breadcrumb")
            const detailsPanel = screen.getByTestId("details-panel")
            expect(headingElement).toHaveTextContent("PUSH-UP")
            expect(breadcrumbElement).toBeInTheDocument();
            mockExerciseData.instructions.forEach((instruction) => {
                expect(screen.getByText(instruction)).toBeInTheDocument();
            });
            fireEvent.click(detailsPanel)
              mockExerciseData.secondaryMuscles.forEach((muscle) => {
                expect(screen.getByText(formatTitle({title: muscle}))).toBeInTheDocument();
              });
        })
       
    });

    it("displays an error message when fetching data fails", async () => {
        mockFetchExercise.mockRejectedValueOnce({name: "error"});

        await act(async () => {
            render(<ExercisePage params={{exerciseId: "0001"}} />);
        });

        waitFor(()=> {
            expect( screen.findByText("There was an error while fetching data, please check the logs")).toBeInTheDocument();
        })
    });
});