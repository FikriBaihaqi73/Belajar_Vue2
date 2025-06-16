<template>
  <div id="app">
    <h1>Kasir Mini</h1>
    
    <div class="input-section">
      <label for="namaBarang">Nama Barang:</label>
      <input type="text" v-model="namaBarang" placeholder="Masukkan nama barang" id="namaBarang">
    </div>

    <div class="input-section">
      <label for="jumlah">Jumlah Barang:</label>
      <input type="number" v-model.number="jumlah" placeholder="Masukkan jumlah barang" id="jumlah">
    </div>

    <div class="input-section">
      <label for="hargaSatuan">Harga Satuan:</label>
      <input type="number" v-model.number="hargaSatuan" placeholder="Masukkan harga satuan" id="hargaSatuan">
    </div>

    <div class="input-section">
      <button @click="tambahBarang">Tambah Barang</button>
    </div>
    
    <div v-if="items.length > 0" id="table-section">
      <h2>Daftar Belanjaan</h2>
      <table>
        <thead>
          <tr>
            <th>Nama Barang</th>
            <th>Jumlah Barang</th>
            <th>Harga Satuan</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.namaBarang }}</td>
            <td>{{ item.jumlah }}</td>
            <td>{{ formatNumber(item.hargaSatuan) }}</td>
            <td>{{ formatNumber(item.subtotal) }}</td>
          </tr>
        </tbody>
      </table>
      <p>Total Harga: {{ formatNumber(totalHarga) }}</p>
    </div>
    
    <!-- Custom Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Pesan Sistem</h2>
        <p>{{ modalMessage }}</p>
        <button @click="closeModal">Tutup</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      namaBarang: '',
      jumlah: 1,
      hargaSatuan: 0,
      items: [],
      totalHarga: 0,
      showModal: false,
      modalMessage: ''
    }
  },
  created() {
    this.showCustomAlert('Selamat datang di Gerbang Transaksi Terakhir... Kasir Mini, tempat di mana takdir dompet ditentukan.');
  },
  methods: {
    showCustomAlert(message) {
      this.modalMessage = message;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalMessage = '';
    },
    formatNumber(value) {
      return new Intl.NumberFormat('id-ID').format(value);
    },
    tambahBarang() {
      if (this.namaBarang && this.jumlah > 0 && this.hargaSatuan >= 0) {
        const subtotal = this.jumlah * this.hargaSatuan
        this.items.push({
          namaBarang: this.namaBarang,
          jumlah: this.jumlah,
          hargaSatuan: this.hargaSatuan,
          subtotal: subtotal
        })
        this.totalHarga += subtotal
        this.namaBarang = ''
        this.jumlah = 1
        this.hargaSatuan = 0
      } else {
        this.showCustomAlert('Lengkapi semua data dengan benar, yakali nama barang, jumlah barang, dan harga satuan di kosongkan. Mau ngitung apa?');
      }
    }
  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 24px;
  color: #1e293b;
}

#app {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

h1 {
  background-color: #1e293b;
  color: white;
  text-align: center;
  padding: 32px 24px;
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  border-radius: 12px 12px 0 0;
}

h2 {
  color: #1e293b;
  margin-bottom: 24px;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.input-section {
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-section:last-of-type {
  padding-bottom: 32px;
}

label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
  margin-bottom: 2px;
}

input[type="text"],
input[type="number"] {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.15s ease;
  background: white;
  font-family: inherit;
}

input[type="text"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button {
  background-color: #1e293b;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
}

button:hover {
  background-color: #334155;
}

button:active {
  background-color: #0f172a;
}

#table-section {
  padding: 32px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  border-radius: 0 0 12px 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

thead {
  background-color: #f1f5f9;
}

th {
  color: #374151;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
}

tbody tr {
  transition: background-color 0.15s ease;
}

tbody tr:hover {
  background-color: #f8fafc;
}

td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #374151;
  font-size: 0.875rem;
}

tbody tr:last-child td {
  border-bottom: none;
}

.total-section {
  margin-top: 24px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.total-harga {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin: 0;
  letter-spacing: -0.025em;
}

.total-harga span {
  color: #1e293b;
}

/* Responsive Design */
@media (max-width: 768px) {
  body {
    padding: 16px;
  }
  
  #app {
    margin: 0;
    border-radius: 8px;
  }
  
  h1 {
    font-size: 1.75rem;
    padding: 24px 20px;
    border-radius: 8px 8px 0 0;
  }
  
  .input-section {
    padding: 16px 24px;
  }
  
  #table-section {
    padding: 24px 20px;
    border-radius: 0 0 8px 8px;
  }
  
  table {
    font-size: 0.875rem;
  }
  
  th, td {
    padding: 12px;
  }
  
  .total-harga {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  body {
    padding: 12px;
  }
  
  h1 {
    font-size: 1.5rem;
    padding: 20px 16px;
  }
  
  .input-section {
    padding: 16px 20px;
  }
  
  #table-section {
    padding: 20px 16px;
  }
  
  table {
    font-size: 0.8rem;
  }
  
  th, td {
    padding: 10px 8px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 0.875rem;
  }
  
  .total-section {
    padding: 20px;
  }
}

/* Custom Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
  transform: translateY(-20px); /* Efek sedikit naik */
  animation: fadeIn 0.3s forwards;
}

.modal-content h2 {
  margin-bottom: 15px;
  color: #1e293b;
  font-size: 1.5rem;
}

.modal-content p {
  margin-bottom: 25px;
  color: #374151;
  line-height: 1.5;
}

.modal-content button {
  background-color: #1e293b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.modal-content button:hover {
  background-color: #334155;
}

/* Animasi fadeIn */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
