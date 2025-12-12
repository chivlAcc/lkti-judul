// File ini akan di-inject ke setiap halaman oleh Google Apps Script

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

// Handler sukses global (opsional, untuk debugging)
function onSuccess(response) {
    console.log('Backend response:', response);
}

// Handler kegagalan global
function onFailure(error) {
    toggleLoading(false);
    const errorMessage = error.message || error;
    console.error('Backend Error:', errorMessage);
    alert('Terjadi kesalahan: ' + errorMessage);
}
