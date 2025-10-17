async function fetchBlogApi() {
  try {
    const res = await fetch(
      "https://newsdata.io/api/1/latest?apikey=pub_428b96c6925a495e8618cfa04b863af7&country=bd"
    );
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to load data: ", error);
  }
}

fetchBlogApi().then((data) => {
  const results = data.results;
  const blogWrapper = getElementByID("blog-wrapper");
  const recentNews = getElementByID("recentNews");
  results.forEach((result) => {
    const element = document.createElement("div");
    element.innerHTML = `
                <div class="card bg-base-200 shadow-lg">
              <div class="card-body">
                <a href="${
                  result?.link
                }" target="_blank" class="card-title hover:underline">${
      result.title
    }</a>
                <p>
                 ${
                   result?.description?.length > 150
                     ? result?.description.slice(0, 150) + "...."
                     : result?.description
                 }
                </p>
              </div>
              <figure class="h-[250px]">
                <img class="h-full object-cover"
                  src="${
                    result?.image_url
                      ? result?.image_url
                      : "../assets/defaultBlog.png"
                  }"
                  alt="${result?.source_name}"
                />
              </figure>
            </div>
    `;
    blogWrapper.appendChild(element);
  });
  results.forEach((result) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <li>
        <a class="hover:underline" href="${result.link}" target="_blank"> ${result.title}</a>
    </li>
    `;
    recentNews.appendChild(li);
  });
});
