const files: Record<string, string> = {
  "/": "index.html",
  "/index.html": "index.html",
  "/styles.css": "styles.css",
  "/app.js": "app.js",
};

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = files[url.pathname] || "index.html";

    try {
      const content = await env.ASSETS.get(path, { type: "text" });
      if (!content) throw new Error("File not found");

      const contentType = getContentType(path);
      return new Response(content, {
        headers: { "Content-Type": contentType },
      });
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
};

function getContentType(file: string): string {
  if (file.endsWith(".html")) return "text/html";
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".js")) return "application/javascript";
  return "text/plain";
}
