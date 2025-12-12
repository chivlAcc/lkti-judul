// =================================================================
// KONFIGURASI WAJIB
// GANTI URL DI BAWAH INI DENGAN URL WEB APP DARI GOOGLE APPS SCRIPT ANDA
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyo2opVhHHnZQOLQyhplZvLYi_iEDH6whH_Zk6aqwj-_XRkU1vorPBWIPie2BtfpQw6mQ/exec";
// =================================================================


/**
 * Menampilkan atau menyembunyikan overlay loading.
 * @param {boolean} show - Tampilkan (true) atau sembunyikan (false).
 * @param {string} [text='Memproses...'] - Teks yang ditampilkan saat loading.
 */
function toggleLoading(show, text = 'Memproses...') {
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    if (loadingOverlay) {
        loadingText.textContent = text;
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}

/**
 * Fungsi utama untuk berkomunikasi dengan API backend di Google Apps Script.
 * @param {string} action - Nama aksi yang akan dipanggil di backend (misal: 'generateTitle').
 * @param {object} [payload={}] - Data yang dikirim ke backend.
 * @returns {Promise<object>} - Respons dari backend dalam format JSON.
 */
async function callApi(action, payload = {}) {
    try {
        // Apps Script Web App yang di-deploy sebagai API paling stabil menerima POST
        // dengan payload sebagai string, bukan sebagai JSON langsung.
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            // mode: 'cors' akan otomatis diatur oleh browser untuk cross-origin request
            // headers tidak perlu disetel, karena kita mengirim text/plain
            body: JSON.stringify({ action, payload })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Respons dari Apps Script adalah JSON dalam format teks
        return await response.json();

    } catch (error) {
        console.error('API Call Error:', error);
        // Mengembalikan objek error yang konsisten
        return { success: false, error: error.message };
    }
}
