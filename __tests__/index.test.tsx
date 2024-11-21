import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { ChakraProvider } from "@chakra-ui/react";



const mockFetchExercises = jest.fn();
const mockFetchEquipments = jest.fn();

jest.mock("@/api/exercises/basic", () => {
  return {
    fetchExercises: () => mockFetchExercises()
  }
});

jest.mock("@/api/exercises/equipment", () => {
  return {
    fetchEquipments: () => mockFetchEquipments()
  }
});


const mockExercises = [
  { id: "1", name: "Push-up" },
  { id: "2", name: "Squat" },
  { id: "3", name: "Lunge" },
];

const mockEquipment = [
  { id: "1", name: "Dumbbell" },
  { id: "2", name: "Kettlebell" },
  { id: "3", name: "Resistance Band" },
];

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
 
  it("renders the loading state initially", async () => {

    await act( () => {
      render(<Home  />);
    });

    waitFor(()=> {
        expect(screen.queryAllByTestId("loading-state")).toHaveLength(2);
    })
  });


  it("renders trending exercises and equipment after loading", async () => {
    mockFetchExercises.mockResolvedValueOnce(mockExercises);
    mockFetchEquipments.mockResolvedValueOnce(mockEquipment);

    await act(async () => {
      render(
        <ChakraProvider>
          <Home />
        </ChakraProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Trending Exercises")).toBeInTheDocument();
      mockExercises.forEach((exercise) => {
        expect(screen.getByText(exercise.name)).toBeInTheDocument();
      });

      expect(screen.getByText("Trending Equipment")).toBeInTheDocument();
      mockEquipment.forEach((equipment) => {
        expect(screen.getByText(equipment.name)).toBeInTheDocument();
      });
    });
  });

  it("displays an error message when fetching data fails", async () => {
    mockFetchExercises.mockRejectedValueOnce({name: "error"});

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("error-exercises-state")).toBeInTheDocument()
    });
  });
}); 