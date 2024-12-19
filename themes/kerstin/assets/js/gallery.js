import justifiedLayout from "./justified-layout/index.js";

const gallery = document.getElementById("gallery");

if (gallery) {
  let containerWidth = 0;
  const items = gallery.querySelectorAll(".gallery-item");

  const input = Array.from(items).map((item) => {
    const img = item.querySelector("img");
    img.style.width = "100%";
    img.style.height = "auto";
    return {
      width: parseFloat(img.getAttribute("width")),
      height: parseFloat(img.getAttribute("height")),
    };
  });

  function updateGallery() {
    if (containerWidth === gallery.getBoundingClientRect().width) return;
    containerWidth = gallery.getBoundingClientRect().width;

    const geometrySmallViewport = justifiedLayout(input, {
      containerWidth,
      containerPadding: 0,
      boxSpacing: 10, // default: 10
      targetRowHeight: 50,
      targetRowHeightTolerance: 0.25, // default: 0.25
    });
    
    const geometryMediumViewport = justifiedLayout(input, {
      containerWidth,
      containerPadding: 0,
      boxSpacing: 10, // default: 10
      targetRowHeight: 150,
      targetRowHeightTolerance: 0.25, // default: 0.25
    });

    const geometryLargeViewport = justifiedLayout(input, {
      containerWidth,
      containerPadding: 0,
      boxSpacing: 10, // default: 10
      targetRowHeight: 200,
      targetRowHeightTolerance: 0.25, // default: 0.25
    });

    let smallViewPort = "";
    let mediumViewPort = "";
    let largeViewPort = "";

    items.forEach((_item, i) => {
      smallViewPort += `
        #gallery-item-${i} {
          position: absolute;
          width: ${geometrySmallViewport.boxes[i].width}px;
          height: ${geometrySmallViewport.boxes[i].height}px;
          top: ${geometrySmallViewport.boxes[i].top}px;
          left: ${geometrySmallViewport.boxes[i].left}px;
          overflow: hidden;
        }
      `;

      mediumViewPort += `
        #gallery-item-${i} {
          position: absolute;
          width: ${geometryMediumViewport.boxes[i].width}px;
          height: ${geometryMediumViewport.boxes[i].height}px;
          top: ${geometryMediumViewport.boxes[i].top}px;
          left: ${geometryMediumViewport.boxes[i].left}px;
          overflow: hidden;
        }
      `;
      largeViewPort += `
        #gallery-item-${i} {
          position: absolute;
          width: ${geometryLargeViewport.boxes[i].width}px;
          height: ${geometryLargeViewport.boxes[i].height}px;
          top: ${geometryLargeViewport.boxes[i].top}px;
          left: ${geometryLargeViewport.boxes[i].left}px;
          overflow: hidden;
        }
    `;
    });

    document.querySelector("style").textContent += `
      @media only screen and (max-width: 350px) {
        ${smallViewPort}
        
        #gallery {
          height: ${geometrySmallViewport.containerHeight}px;
        }
      }

      @media only screen and (max-width: 500px) {
        ${mediumViewPort}
        
        #gallery {
          height: ${geometryMediumViewport.containerHeight}px;
        }
      }
      @media only screen and (min-width: 501px) {
        ${largeViewPort}

        #gallery {
          height: ${geometryLargeViewport.containerHeight}px;
        }
      }
    `;

    gallery.style.position = "relative";
    gallery.style.visibility = "";
  }

  window.addEventListener("resize", updateGallery);
  window.addEventListener("orientationchange", updateGallery);

  updateGallery();
}