// Hedef koordinat
const hedefKoordinat = [37.7749, -122.4194];

// Diğer koordinatlar
const digerKoordinatlar = [
    { coordinates: [37.7749, -122.4194], mesafeLimiti: 50000 }, // Hedef
    { coordinates: [34.0522, -118.2437], mesafeLimiti: 50000 },
    { coordinates: [40.7128, -74.0060], mesafeLimiti: 50000 }
];

// Harita oluşturma
const harita = L.map('harita').setView(hedefKoordinat, 10);

// OpenStreetMap katmanını ekleme
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(harita);

// JSON dosyasından koordinatları okuma
fetch('veriler.json')
    .then(response => response.json())
    .then(data => {
        let markerSayisi = 0;
        data.forEach(({ coordinates, mesafeLimiti }) => {
            const mesafe = L.latLng(hedefKoordinat).distanceTo(coordinates); // Mesafeyi hesapla
            if (mesafe <= mesafeLimiti) {
                L.marker(coordinates).addTo(harita).bindPopup(`Mesafe: ${mesafe.toFixed(2)} m`);
                markerSayisi++;
            }
        });
        console.log(`Haritada ${markerSayisi} adet koordinat işaretlendi.`);
    })
    .catch(error => console.error('JSON dosyasını okuma hatası:', error));

// Diğer koordinatları işaretleme
digerKoordinatlar.forEach(({ coordinates, mesafeLimiti }) => {
    const mesafe = L.latLng(hedefKoordinat).distanceTo(coordinates); // Mesafeyi hesapla
    if (mesafe <= mesafeLimiti) {
        L.marker(coordinates).addTo(harita).bindPopup(`Mesafe: ${mesafe.toFixed(2)} m`);
    }
});


let markerSayisi = 0;
digerKoordinatlar.forEach(({ coordinates, mesafeLimiti }) => {
   const mesafe = L.latLng(hedefKoordinat).distanceTo(coordinates); // Mesafeyi hesapla
   if (mesafe <= mesafeLimiti) {
       L.marker(coordinates).addTo(harita).bindPopup(`Mesafe: ${mesafe.toFixed(2)} m`);
       markerSayisi++;
   }
});


// ... (Önceki kodlar)


console.log(`Haritada ${markerSayisi} adet koordinat işaretlendi.`);