Vue.component('form-profile', {
    props: ['title'],
    data: function() {
        return {
            name: '',
            age: '',
            address: ''
        };
    },
    template: `
        <div style="width: 300px; border: 1px solid rgb(204, 204, 204); padding: 10px;">
            <h3>Ini Child Component</h3>
            <h2>{{ title }}</h2>
            <input type="text" v-model="name" placeholder="Nama">
            <input type="number" v-model="age" placeholder="Umur">
            <input type="text" v-model="address" placeholder="Alamat">
            <button @click="submitForm">Simpan Data Diri</button>
        </div>
    `,
    methods: {
        submitForm: function() {
            this.$emit('form-submitted', {
                name: this.name,
                age: this.age,
                address: this.address
            });
        }
    }
});

new Vue({
    el: '#app',
    data: {
        judulFormulir: '',
        parentData: '',
        nama: '',
        umur: '',
        alamat: '',
        showDataDisplay: false
    },
    methods: {
        saveData: function(data) {
            this.parentData = data;
            this.nama = data.name;
            this.umur = data.age;
            this.alamat = data.address;
            this.showDataDisplay = false;
            alert('Data berhasil disimpan!');
        },
        displayParentData: function() {
            this.showDataDisplay = true;
        },
        hideParentData: function() {
            this.showDataDisplay = false;
        }
    }
});
