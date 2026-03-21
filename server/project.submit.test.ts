import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("project.submit", () => {
  it("accepts a valid project submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.project.submit({
      companyName: "Ausbuild Pty Ltd",
      contactName: "John Smith",
      phone: "0400000000",
      email: "john@ausbuild.com.au",
      builderType: "Volume Builder",
      projectAddress: "123 Test Street",
      suburb: "Coomera",
      projectType: "New Residential Build",
      services: ["Acrylic Render", "Hebel Supply & Install"],
      wallArea: "450",
      startDate: "2026-04-01",
      notes: "Test submission",
      fileNames: ["plans.pdf", "specs.pdf"],
    });

    expect(result.success).toBe(true);
    expect(result.reference).toMatch(/^RK-\d+$/);
  });

  it("returns success even with minimal required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.project.submit({
      companyName: "Test Builder",
      contactName: "Jane Doe",
      phone: "0400111222",
      email: "jane@test.com.au",
      projectAddress: "456 Example Ave",
      suburb: "Springfield",
      services: ["Not Sure — Quote All"],
    });

    expect(result.success).toBe(true);
  });

  it("rejects submission with missing required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.project.submit({
        companyName: "",
        contactName: "Jane Doe",
        phone: "0400111222",
        email: "jane@test.com.au",
        projectAddress: "456 Example Ave",
        suburb: "Springfield",
        services: ["Acrylic Render"],
      })
    ).rejects.toThrow();
  });
});
