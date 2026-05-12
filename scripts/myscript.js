// ==========================
// FAVORİLER VERİSİ
// ==========================
let favoriler = JSON.parse(localStorage.getItem("favoriler")) || [];

// ==========================
// FAVORİ EKLE / ÇIKAR
// ==========================
function toggleFavori(element, baslik) {

    if (favoriler.includes(baslik)) {
        favoriler = favoriler.filter(item => item !== baslik);
        element.textContent = "🤍";
    } else {
        favoriler.push(baslik);
        element.textContent = "❤️";
    }

    localStorage.setItem("favoriler", JSON.stringify(favoriler));
}

// ==========================
// SAYFA AÇILINCA KALPLERİ SENKRONLA
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    // Kalp durumlarını güncelle
    document.querySelectorAll(".heart").forEach(el => {

        let name = el.getAttribute("data-name");

        if (favoriler.includes(name)) {
            el.textContent = "❤️";
        } else {
            el.textContent = "🤍";
        }

    });

    // Favoriler sayfası varsa listele
    favorileriGoster();
});


// ==========================
// FAVORİLERİ LİSTELE
// ==========================
function favorileriGoster() {

    const liste = document.getElementById("liste");
    if (!liste) return;

    const favoriler = JSON.parse(localStorage.getItem("favoriler")) || [];

    if (favoriler.length === 0) {
        liste.innerHTML = "<p>Henüz favori eklenmedi.</p>";
        return;
    }

    let html = "";

    favoriler.forEach(item => {
        html += `
            <div class="card">
                <div style="width:100%;">
                    <h3>${item}</h3>

                    <button class="delete-btn"
                        onclick="favorilerdenSil('${item}')">
                        Sil
                    </button>
                </div>
            </div>
        `;
    });

    liste.innerHTML = html;
}

function favorilerdenSil(baslik) {

    let favoriler = JSON.parse(localStorage.getItem("favoriler")) || [];

    favoriler = favoriler.filter(item => item !== baslik);

    localStorage.setItem("favoriler", JSON.stringify(favoriler));

    favorileriGoster();
}
