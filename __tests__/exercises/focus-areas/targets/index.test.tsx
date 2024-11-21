import React, {act} from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TargetPage from "@/app/exercises/focus-areas/targets/page";


const mockFetchTargets = jest.fn();

jest.mock("@/api/exercises/target", () => ({
  fetchTargets: () => mockFetchTargets()
}));


const mockTargetData = ["Arms", "Legs", "Core", "Back"];

describe("TargetPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state initially", async () => {
    await act(() => {
        render(<TargetPage />)
    })

    waitFor(() => expect(screen.getByTestId("loading-state")).toBeInTheDocument())
});
 
  it("renders target data correctly after loading", async () => {
    mockFetchTargets.mockResolvedValueOnce(mockTargetData);
 
    await act(async () => {
      render(<TargetPage />);
    });
 
    await waitFor(() => {
      expect(screen.getByTestId("breadcrumb"))
      expect(screen.getByText("Arms")).toBeInTheDocument();
      expect(screen.getByText("Legs")).toBeInTheDocument();
      expect(screen.getByText("Core")).toBeInTheDocument();
      expect(screen.getByText("Back")).toBeInTheDocument();
    });
  });

  it("displays an error message when fetching data fails", async () => {
    mockFetchTargets.mockRejectedValueOnce({name: "error"});

    await act(async () => {
      render(<TargetPage />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("There was an error while fetching data, please check the logs")
      ).toBeInTheDocument();
    });
  });

  it("renders empty state when no target data is available", async () => {
    mockFetchTargets.mockResolvedValueOnce([]);

    await act(async () => {
      render(<TargetPage />);
    });

    await waitFor(() => {
      expect(screen.queryByText("Arms")).not.toBeInTheDocument();
      expect(screen.queryByText("Legs")).not.toBeInTheDocument();
      expect(screen.queryByText("Core")).not.toBeInTheDocument();
      expect(screen.queryByText("Back")).not.toBeInTheDocument();
    });
  });
});