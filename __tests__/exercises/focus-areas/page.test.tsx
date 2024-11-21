import React, {act} from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FocusAreasPage from "@/app/exercises/focus-areas/page";

const mockFetchBodyParts = jest.fn();
jest.mock("@/api/exercises/body-parts", () => {
    return {
        fetchBodyParts: () => mockFetchBodyParts()
    }
});

const mockBodyPartsData = ["arms", "legs", "back", "chest", "shoulders"];

describe("BodyPartsPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading state initially", async () => {
    await act( () => {
        render(<FocusAreasPage />);
      });
  
      await waitFor(() => {
          waitFor(() => expect(screen.getByTestId("loading-state")).toBeInTheDocument());
      });
  });

  it("renders body parts data correctly after loading", async () => {
    mockFetchBodyParts.mockResolvedValueOnce(mockBodyPartsData);

    await act(async () => {
      render(<FocusAreasPage />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("breadcrumb"))
      expect(screen.getByText("Arms")).toBeInTheDocument();
      expect(screen.getByText("Legs")).toBeInTheDocument();
      expect(screen.getByText("Back")).toBeInTheDocument();
      expect(screen.getByText("Chest")).toBeInTheDocument();
      expect(screen.getByText("Shoulders")).toBeInTheDocument();
    });

  });

  it("displays an error message when fetching data fails", async () => {
    mockFetchBodyParts.mockRejectedValueOnce({name: "error"});

    await act(async () => {
      render(<FocusAreasPage />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("There was an error while fetching data, please check the logs")
      ).toBeInTheDocument();
    });
  });

  it("renders empty state when no body parts are available", async () => {
    mockFetchBodyParts.mockResolvedValueOnce([]);

    await act(async () => {
      render(<FocusAreasPage />);
    });

    await waitFor(() => {
      expect(screen.queryByText("arms")).not.toBeInTheDocument();
      expect(screen.queryByText("legs")).not.toBeInTheDocument();
      expect(screen.queryByText("back")).not.toBeInTheDocument();
      expect(screen.queryByText("chest")).not.toBeInTheDocument();
      expect(screen.queryByText("shoulders")).not.toBeInTheDocument();
    });

  });
});