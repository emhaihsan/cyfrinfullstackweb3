// Fungsi utama untuk menghitung total dari string amounts yang berisi angka-angka (dipisahkan koma atau baris baru)
export function calculateTotal(amounts: string): bigint {
    // Jika input kosong atau hanya spasi, langsung kembalikan 0
    if (!amounts.trim()) {
        return BigInt(0)
    }

    try {
        // Pisahkan string berdasarkan koma atau baris baru, lalu trim setiap elemen
        const amountArray = amounts
            .split(/[,\n]+/) // Memisahkan berdasarkan koma atau newline
            .map(amt => amt.trim()) // Hilangkan spasi di setiap elemen
            .filter(amt => amt !== "") // Buang elemen kosong
            .map(amt => {
                // Coba parsing ke BigInt, jika gagal (input tidak valid), kembalikan 0
                try {
                    return BigInt(amt)
                } catch (e) {
                    // Jika parsing gagal (misal: karakter non-angka), kembalikan 0
                    return BigInt(0)
                }
            })

        // Jika setelah diproses tidak ada angka valid, kembalikan 0
        if (amountArray.length === 0) {
            return BigInt(0)
        }

        // Jumlahkan semua elemen array menggunakan reduce, mulai dari 0
        return amountArray.reduce((acc, curr) => acc + curr, BigInt(0))
    } catch (e) {
        // Jika ada error tak terduga, fallback ke 0
        return BigInt(0)
    }
}

// Fungsi helper untuk kompatibilitas dengan test yang mengharapkan hasil number
export function calculateTotalAsNumber(amounts: string): number {
    const bigIntTotal = calculateTotal(amounts)
    // Konversi BigInt ke number. Aman untuk angka kecil, tapi tidak untuk angka besar (bisa overflow)
    return Number(bigIntTotal)
}