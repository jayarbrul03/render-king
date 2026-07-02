import type { Express } from "express";
import { buildSitemapXml } from "../sitemap";

export function registerSitemapRoute(app: Express): void {
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const xml = await buildSitemapXml();
      res.status(200).type("application/xml; charset=utf-8").send(xml);
    } catch (error) {
      console.error("[Sitemap] Failed to generate:", error);
      res.status(500).type("text/plain").send("Failed to generate sitemap");
    }
  });
}
