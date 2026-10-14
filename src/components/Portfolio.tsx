import { useEffect, useState } from "react";

function Portfolio() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(0);
  const [viewerLoaded, setViewerLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl: string | null = null;

    async function loadPdf() {
      try {
        const response = await fetch("/portfolio.pdf", { signal: controller.signal });
        if (!response.ok) throw new Error(`PDF request failed: ${response.status}`);

        const total = Number(response.headers.get("content-length")) || 0;
        setProgress(total ? 0 : null);

        if (!response.body) {
          const blob = await response.blob();
          setProgress(100);
          objectUrl = URL.createObjectURL(blob);
          setPdfUrl(objectUrl);
          return;
        }

        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let loaded = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!value) continue;
          chunks.push(value);
          loaded += value.byteLength;
          if (total) setProgress(Math.min(99, Math.round((loaded / total) * 100)));
        }

        const blob = new Blob(chunks as BlobPart[], { type: "application/pdf" });
        objectUrl = URL.createObjectURL(blob);
        setProgress(100);
        setPdfUrl(objectUrl);
      } catch {
        if (controller.signal.aborted) return;
        setProgress(null);
        setPdfUrl("/portfolio.pdf");
      }
    }

    void loadPdf();
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <div className="portfolio-viewer">
      {pdfUrl && (
        <iframe
          title="Portfolio PDF"
          src={`${pdfUrl}#toolbar=0&navpanes=0&pagemode=none&view=FitH`}
          className="portfolio-pdf"
          onLoad={() => setViewerLoaded(true)}
        />
      )}
      {!viewerLoaded && (
        <div
          className="portfolio-loading-bar"
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress ?? undefined}
        >
          <div
            className={`portfolio-loading-fill${progress === null ? " indeterminate" : ""}`}
            style={progress === null ? undefined : { width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default Portfolio;
