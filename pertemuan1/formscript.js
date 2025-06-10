Vue.component('component', {
    props: ['hobi'],
    template: '<div class="component-card">Hobi saya adalah {{ hobi }}</div>'
    })
    new Vue({
        el: '#form',
        data: {
            name: '',
            age: '',
            address: '',
            gender: ''
        }
    })
    new Vue({
        el: '#component',
    })