
# BUNKR108 — Local HTML Preview

This README embeds the local HTML file `New_Comp_Test.html` so you can preview the site inside a Markdown viewer that allows raw HTML (for example, VS Code's Markdown Preview).

If your Markdown viewer supports raw HTML the page will display below.

<iframe src="./New_Comp_Test.html" title="BUNKR108 preview" style="width:100%;height:800px;border:0;">
  <!-- Fallback content for renderers that don't allow iframes -->
  Your browser or Markdown viewer doesn't allow embedding. Open the page directly:
  <a href="./New_Comp_Test.html">Open New_Comp_Test.html</a>
</iframe>

Quick ways to open the page in your host/browser or serve it locally:

- Open the file directly in the host (from the dev container):

  $BROWSER "file://$(pwd)/New_Comp_Test.html"

- Serve a simple static server (recommended when running inside containers):

  - Python 3 (built-in):

    python3 -m http.server 8000

    Then open: http://localhost:8000/New_Comp_Test.html

  - Node (serve):

    npx serve .

- VS Code: Use the "Live Server" extension and click "Go Live" with `New_Comp_Test.html` open.

Notes:

- Many remote renderers (including GitHub.com) sanitize or block iframes for security. The embedded preview is intended for local use in editors like VS Code that allow raw HTML in Markdown previews.
- If the iframe doesn't render, use one of the serving/opening methods above.

Enjoy the preview!
