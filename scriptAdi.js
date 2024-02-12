const fs = require('fs');
const xlsx = require('xlsx');

// Excel dosyasının adı
const excelDosyaAdi = 'vaka.xlsx';

// Excel dosyasını oku
const workbook = xlsx.readFile(excelDosyaAdi);

// İlk sayfayı seç
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// JSON formatına dönüştür
const jsonVeriler = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

// JSON dosyasına yaz
const jsonDosyaAdi = 'vaka.json';
fs.writeFileSync(jsonDosyaAdi, JSON.stringify(jsonVeriler, null, 2));

console.log('JSON dosyası oluşturuldu:', jsonDosyaAdi);
