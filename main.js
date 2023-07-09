const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = document.querySelector('header h2');
const cdThumb = document.querySelector('.cd-thumb');
const audio = document.querySelector('#audio');
const cd = document.querySelector('.cd');
const playBtn = document.querySelector('.btn-toggle-play');
const player = document.querySelector('.player');


const app = {
    songs: [
        {
            name: 'DONT WASTE MY TIME',
            singer: '16 TYPH',
            path: 'Bigcityboi - Binz, Touliver.mp3',
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

    currentIndex: 0,

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
        const _this = this;
        // Xử lý phóng to / thu nhỏ CD
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý khi click nút play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    start: function () {
        // Định nghĩa các thuộc tính cho project
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Render playlist
        this.render();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
    }
}

app.start();

