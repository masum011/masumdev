export async function downloadCvPdf(url: string, fileName: string): Promise<boolean> {
  try {
    const response = await fetch(url, {credentials: 'same-origin'});
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF (${response.status})`);
    }
    const buffer = await response.arrayBuffer();
    const pdfBlob = new Blob([buffer], {type: 'application/pdf'});
    const blobUrl = URL.createObjectURL(pdfBlob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = fileName;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
    return true;
  } catch {
    return false;
  }
}
