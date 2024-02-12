const fs = require('fs');

// Dosya adı
const dosyaAdi = 'vaka.json';

// JSON dosyasını oku
fs.readFile(dosyaAdi, 'utf8', (err, data) => {
    if (err) {
        console.error('Dosya okuma hatası:', err);
        return;
    }

    try {
        // JSON verisini parse et
        const jsonData = JSON.parse(data);

        // Uygunsuz formata sahip verileri filtrele
        const temizlenmisVeriler = jsonData.filter((item) => {
            // Gerekli kontrolleri burada ekleyebilirsiniz
            // Bu örnekte sadece belirtilen formatı kontrol ediyoruz
            return (
                Array.isArray(item) &&
                item.length === 5 &&
                typeof item[0] === 'string' && // Tarih
                typeof item[1] === 'string' && // Saat
                typeof item[2] === 'string' && // KKM Protokol
                typeof item[3] === 'number' && // Enlem
                typeof item[4] === 'number'    // Boylam
            );
        });

        // Temizlenmiş veriyi JSON dosyasına yaz
        const yeniJsonVerisi = JSON.stringify(temizlenmisVeriler, null, 2);
        fs.writeFile(dosyaAdi, yeniJsonVerisi, 'utf8', (err) => {
            if (err) {
                console.error('Dosya yazma hatası:', err);
            } else {
                console.log('Dosya başarıyla güncellendi.');
            }
        });
    } catch (parseHata) {
        console.error('JSON parse hatası:', parseHata);
    }
});
