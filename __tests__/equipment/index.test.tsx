import React, {act} from "react";
import { render, screen, waitFor } from "@testing-library/react";
import EquipmentPage from "@/app/equipment/page";


const mockFetchEquipments = jest.fn()
jest.mock("@/config/api/exercises/equipment", () => {
    return {
        fetchEquipments: () => mockFetchEquipments(),
    }
});

const mockEquipmentData = ['Dumbell', 'Barbell', 'Treadmill'];

describe("EquipmentPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders equipment data correctly after loadingrenders the loading state initially", async () => {
    mockFetchEquipments.mockResolvedValueOnce(mockEquipmentData);

    await act(() => {
      render(<EquipmentPage />);
    });

    waitFor(() => expect(screen.getByTestId("equipment-list")).toBeInTheDocument());

  });

  it("renders the loading state initially", async () => {
    await act( () => {
      render(<EquipmentPage />);
    });

    await waitFor(() => {
        waitFor(() => expect(screen.getByTestId("loading-state")).toBeInTheDocument());
    });
  });

  it("displays an error message when fetching data fails", async () => {
    mockFetchEquipments.mockRejectedValue({name: "error"});
        act(() => {
            render(<EquipmentPage />)
        })

        await waitFor(() => {
            expect(screen.getByTestId("error-state")).toBeInTheDocument(),
            expect(screen.getByText('There was an error while fetching data, please check the logs')).toBeInTheDocument()
        })

  });

  it("renders empty state when there is no equipment data", async () => {
    mockFetchEquipments.mockResolvedValueOnce([]);

    await act(async () => {
      render(<EquipmentPage />);
    });

    await waitFor(() => {
      expect(screen.queryByText("Dumbbell")).not.toBeInTheDocument();
      expect(screen.queryByText("Barbell")).not.toBeInTheDocument();
      expect(screen.queryByText("Treadmill")).not.toBeInTheDocument();
    });

  });
});

