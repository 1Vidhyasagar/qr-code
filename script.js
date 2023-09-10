document.getElementById("generate-btn").addEventListener("click", () => {
  const data = document.getElementById("data").value;
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;
  const format = document.getElementById("format").value;
  const qrColor = document.getElementById("qr-color").value.substr(1);
  const bgColor = document.getElementById("bg-color").value.substr(1);

  const apiURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    data
  )}&size=${width}x${height}&format=${format}&color=${qrColor}&bgcolor=${bgColor}`;

  // Create an image element to display the QR code
  const qrCodeImage = document.createElement("img");
  qrCodeImage.src = apiURL;

  // Remove any previous QR code
  const qrCodeContainer = document.getElementById("qr-code-container");
  qrCodeContainer.innerHTML = "";
  qrCodeContainer.appendChild(qrCodeImage);

  // Show the download button
  const downloadButton = document.getElementById("download-btn");
  downloadButton.style.display = "block";

  // Store the Blob object for later use in the download
  let qrCodeBlob = null;

  // Fetch the QR code image data as a Blob
  fetch(apiURL)
    .then((response) => response.blob())
    .then((blob) => {
      qrCodeBlob = blob;
    });

  // Add click event listener to download button
  downloadButton.addEventListener("click", () => {
    // Check if Blob object is available
    if (qrCodeBlob) {
      // Create a Blob URL for the Blob
      const blobURL = URL.createObjectURL(qrCodeBlob);

      // Create a temporary anchor element for downloading
      const a = document.createElement("a");
      a.href = blobURL;
      a.download = "qr-code." + format; // Set the download filename
      a.style.display = "none"; // Hide the anchor element
      document.body.appendChild(a); // Append anchor element to the document
      a.click(); // Trigger the click event on the anchor element
      document.body.removeChild(a); // Remove the anchor element from the document
      URL.revokeObjectURL(blobURL); // Release the Blob URL
    }
  });
});
