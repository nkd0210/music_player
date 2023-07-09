const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const app = {
    songs: [
        {
            name: 'DONT WASTE MY TIME',
            singer: '16 TYPH',
            path: 'https://youtu.be/y-Tut29zvPE',
            image: './assets/img/16typh.jpg'
        },
        {
            name: 'CHƠI NHƯ TỤI MỸ',
            singer: 'ANDREE RIGHT HAND',
            path: 'https://youtu.be/A-tX5PI3V0o',
            image: './assets/img/andree.jpg'
        },
        {
            name: 'BIG CITY BOY',
            singer: 'BINZ',
            path: 'https://youtu.be/jgZkrA8E5do',
            image: './assets/img/binz.jpg'
        },
        {
            name: 'HOÀN HẢO',
            singer: 'BRAY',
            path: 'https://youtu.be/VkUx9npkx54',
            image: './assets/img/bray.jpg'
        },
        {
            name: 'LỐI NHỎ',
            singer: 'ĐEN VÂU',
            path: 'https://youtu.be/KKc_RMln5UY',
            image: './assets/img/denvau.jpg'
        },
        {
            name: 'NGƯỜI ĐI BAO',
            singer: 'LOWG',
            path: 'https://youtu.be/aSls7yUP8l0',
            image: './assets/img/lowg.jpg'
        },
        {
            name: 'CHÌM SÂU',
            singer: 'MCK',
            path: 'https://youtu.be/Yw9Ra2UiVLw',
            image: './assets/img/mck.jpg'
        },
        {
            name: 'VỀ QUÊ',
            singer: 'MIKELODIC',
            path: 'https://youtu.be/Wf2Ahoh3bfk',
            image: './assets/img/mikelodic.jpg'
        },
        {
            name: 'MỘT NGÀY CHẲNG NẮNG',
            singer: 'PHAO',
            path: 'https://youtu.be/ABuY4KUUVcI',
            image: './assets/img/phao.jpeg'
        },
        {
            name: 'CUA',
            singer: 'HIEUTHUHAI',
            path: 'https://youtu.be/P8qEusQiwsw',
            image: './assets/img/hieut2.jpg'
        }
    ],
    render: function () {
        const htmls = this.songs.map(function (song) {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        document.querySelector('.playlist').innerHTML = htmls.join('');
    },

    handleEvents: function () {
        const cd = document.querySelector('.cd');
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth -scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
    },

    start: function () {
        this.handleEvents();

        this.render();
    }
}

app.start();

