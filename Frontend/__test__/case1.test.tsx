import { render, screen } from "@testing-library/react";
import Banner from "@/components/Banner";
import { userEvent } from "@testing-library/user-event";

//Mock  useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

//Mock useSession
jest.mock("next-auth/react", () => ({
  useSession() {
    return { data: null, user: { name: "Tester" } };
  },
}));

describe("Banner", () => {
  it("should have top banner title", () => {
    render(<Banner />);
    const bannerText = screen.getByText("Nature Awaits");
    expect(bannerText).toBeInTheDocument();
  });

  const cover = ["camp1.jpg", "camp2.jpg", "camp3.jpg", "camp4.jpg"];

  it("should change image when clicked banner", async () => {
    render(<Banner />);
    const banner = screen.getByRole("img") as HTMLImageElement;
    await userEvent.click(banner);
    expect(banner.src).toContain("camp2.jpg");
  });

  it("should change image when clicked banner", async () => {
    render(<Banner />);
    const banner = screen.getByRole("img") as HTMLImageElement;

    for (let i = 0; i < cover.length; i++) {
      await userEvent.click(banner);
      expect(banner.src).toContain(cover[(i + 1) % 4]);
    }
  });
});
