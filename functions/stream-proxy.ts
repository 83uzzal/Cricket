const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, range",
  "Access-Control-Expose-Headers": "Content-Length, Content-Range, Content-Type",
};

async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const streamUrl = url.searchParams.get("url");

  if (!streamUrl) {
    return new Response(JSON.stringify({ error: "Missing ?url= parameter" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://bhalocast.com/",
      "Origin": "https://bhalocast.com",
    };
    const rangeHeader = req.headers.get("range");
    if (rangeHeader) {
      headers["Range"] = rangeHeader;
    }

    const upstream = await fetch(streamUrl, {
      signal: controller.signal,
      headers,
    });
    clearTimeout(timeout);

    if (!upstream.ok && upstream.status !== 206) {
      return new Response(
        JSON.stringify({ error: `Upstream returned ${upstream.status}` }),
        {
          status: upstream.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Determine content type from upstream or URL
    let contentType = upstream.headers.get("content-type") || "application/octet-stream";
    if (streamUrl.includes(".m3u8")) {
      contentType = "application/vnd.apple.mpegurl";
    } else if (streamUrl.includes(".ts")) {
      contentType = "video/mp2t";
    }

    const responseHeaders: Record<string, string> = {
      ...corsHeaders,
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-store",
    };

    const cl = upstream.headers.get("content-length");
    if (cl) responseHeaders["Content-Length"] = cl;
    const cr = upstream.headers.get("content-range");
    if (cr) responseHeaders["Content-Range"] = cr;

    // For m3u8 playlists, rewrite segment URLs to also go through proxy
    if (streamUrl.includes(".m3u8") && upstream.body) {
      const text = await upstream.text();
      const baseUrl = streamUrl.substring(0, streamUrl.lastIndexOf("/") + 1);
      const proxyBase = `${url.origin}${url.pathname}?url=`;

      // Rewrite ALL non-comment lines (segments, sub-playlists) to go through proxy
      const rewritten = text.replace(/^(?!#)(\S+)$/gm, (line: string) => {
        const trimmed = line.trim();
        if (!trimmed) return line;
        if (trimmed.startsWith("http")) {
          return `${proxyBase}${encodeURIComponent(trimmed)}`;
        }
        return `${proxyBase}${encodeURIComponent(baseUrl + trimmed)}`;
      });

      return new Response(rewritten, {
        status: upstream.status,
        headers: responseHeaders,
      });
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

Deno.serve(handler);
