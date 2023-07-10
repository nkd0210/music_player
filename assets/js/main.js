const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    songs: [
        {
            name: 'Tai vi sao',
            singer: 'MCK',
            path: 'TaiViSao-MCK-7963973.mp3',
            image: 'mck.jpg'
        },
        {
            name: 'KhongTheSay',
            singer: 'HIEUTHUHAI',
            path: 'KhongTheSay-HIEUTHUHAI-9293024.mp3',
            image: 'hieut2.jpg'
        },
        {
            name: 'MotNgayChangNang',
            singer: 'Phao',
            path: 'MotNgayChangNang-Phao-9400644.mp3',
            image: 'phao.jpg'
        },
        {
            name: 'NeuLucDo',
            singer: 'Tlinh',
            path: 'NeuLucDo-tlinh2pillz-8783613.mp3',
            image: 'tlinh.jpg'
        },
        {
            name: 'UngQuaChung',
            singer: 'AMEE',
            path: 'UngQuaChung-AMEE-8783624.mp3',
            image: 'amee.jpg'
        },
    ],

    render: function () {

    },


    start: function () {

        this.render();

    }

}

app.start();
 