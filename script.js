document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Mencari novel...</p>";

  if (!query) {
    resultsDiv.innerHTML = "<p>Masukkan kata kunci pencarian.</p>";
    return;
  }

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.docs.length === 0) {
      resultsDiv.innerHTML = "<p>Tidak ditemukan hasil untuk kata kunci tersebut.</p>";
      return;
    }

    resultsDiv.innerHTML = "";
    data.docs.slice(0, 10).forEach(book => {
      const coverId = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://via.placeholder.com/200x250?text=No+Cover";
      const card = `
        <div class="card">
          <img src="${coverId}" alt="Cover">
          <h4>${book.title}</h4>
          <p><em>${book.author_name ? book.author_name[0] : "Tidak diketahui"}</em></p>
        </div>
      `;
      resultsDiv.innerHTML += card;
    });
  } catch (error) {
    resultsDiv.innerHTML = "<p>Terjadi kesalahan saat mengambil data.</p>";
    console.error(error);
  }
});
