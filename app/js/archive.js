getElementByID("archive-button").addEventListener("click", function () {
  const startingDate = getElementByID("startingDate").value;
  const endingDate = getElementByID("endingDate").value;
  console.log(startingDate, endingDate);
});

async function fetchThenewsapi() {
  try {
    const res = await fetch(
      "https://api.thenewsapi.com/v1/news/all?api_token=yd6WWDUJJAzeOQqhJmhsm1eDd4MAeyYTpuPfsQGI&language=en&limit=3"
    );
    if (!res.ok) {
      throw new Error(`HTTP Error! ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Failed to load data: ", err);
  }
}
fetchThenewsapi().then((results) => {
  const archiveArticle = getElementByID("archive-article");
  results.forEach((result) => {
    const element = document.createElement("div");
    const date = new Date(result.published_at).toLocaleString();
    element.innerHTML = `
    <a href="${result.url}" target="_blank">        
    <div class="card lg:card-side bg-base-100 shadow-sm">
            <figure class="w-2/5">
              <img class="w-full object-cover"
                src="${
                  result?.image_url
                    ? result.image_url
                    : "../assets/defaultBlog.png"
                }"
                alt="Album"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${result.title}</h2>
              <p>${
                result?.snippet
                  ? result.snippet
                  : "The news description is missing"
              }</p>
              <div class="card-actions justify-end">
                <button><p class="justify-end">${date}</p></button>
              </div>
            </div>
          </div>
          </a>
        `;
    archiveArticle.appendChild(element);
  });
});
