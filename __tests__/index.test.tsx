import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("@/app/custom-components/Banner/Banner", () => ({
  Banner: () => <div data-testid="mock-banner">Mock Banner</div>,
}));

jest.mock("@/app/custom-components/CategoryTile/CategoryTile", () => ({
  CategoryTile: ({ title }: { title: string }) => (
    <div data-testid="mock-category">{title}</div>
  ),
}));

jest.mock("@/app/custom-components/TrendingList/TrendingList", () => ({
  TrendingList: ({ list }: { list: Array<{ id: string; name: string }> }) => (
    <div data-testid="mock-trending-list">
      {list.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  ),
}));

describe("Home Component", () => {
  it("renders without crashing", () => {
    render(<Home />);
    const mainElement = screen.getByTestId("main");
    expect(mainElement).toBeInTheDocument();
  });

  it("renders the Banner component", () => {
    render(<Home />);
    const banner = screen.getByTestId("mock-banner");
    expect(banner).toBeInTheDocument();
  });

  it("renders the correct number of CategoryTiles", () => {
    render(<Home />);
    const categories = screen.getAllByTestId("mock-category");
    expect(categories).toHaveLength(3); 
    expect(categories[0]).toHaveTextContent("Focus Areas");
    expect(categories[1]).toHaveTextContent("Targets");
    expect(categories[2]).toHaveTextContent("Equipment");
  });

  it("renders two TrendingList components", () => {
    render(<Home />);
    const trendingLists = screen.getAllByTestId("mock-trending-list");
    expect(trendingLists).toHaveLength(2);
  });

  it("renders footer links", () => {
    render(<Home />);
    const githubLink = screen.getByRole("link", { name: "Github" });
    const linkedInLink = screen.getByRole("link", { name: "LinkedIn" });
    const learnLink = screen.getByRole("link", { name: "Learn" });

    expect(githubLink).toBeInTheDocument();
    expect(linkedInLink).toBeInTheDocument();
    expect(learnLink).toBeInTheDocument();
  });
});