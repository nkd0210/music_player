const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = document.querySelector('.cd');
const heading = document.querySelector('header h2');
const cdThumb = document.querySelector('.cd-thumb');
const audio = document.querySelector('#audio');
const playBtn = document.querySelector('.btn-toggle-play');
const player = document.querySelector('.player');

const app = {

    currentIndex : 0,
    isPlaying : false,

    songs: [
        {
            name: 'Tai vi sao',
            singer: 'MCK',
            path: './assets/music/TaiViSao-MCK-7963973.mp3',
            image: './assets/img/mck.jpg'
        },
        {
            name: 'KhongTheSay',
            singer: 'HIEUTHUHAI',
            path: './assets/music/KhongTheSay-HIEUTHUHAI-9293024.mp3',
            image: './assets/img/hieut2.jpg'
        },
        {
            name: 'MotNgayChangNang',
            singer: 'Phao',
            path: './assets/music/MotNgayChangNang-Phao-9400644.mp3',
            image: './assets/img/phao.jpg'
        },
        {
            name: 'NeuLucDo',
            singer: 'Tlinh',
            path: './assets/music/NeuLucDo-tlinh2pillz-8783613.mp3',
            image: './assets/img/tlinh.jpg'
        },
        {
            name: 'UngQuaChung',
            singer: 'AMEE',
            path: './assets/music/UngQuaChung-AMEE-8783624.mp3',
            image: './assets/img/amee.jpg'
        },
    ],

    render: function () {
        const htmls = this.songs.map(function (song) {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        });
        document.querySelector('.playlist').innerHTML = htmls.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this , 'currentSong' , {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvents: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 ;
            
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý khi click play
        playBtn.onclick = function () {
            if(_this.isPlaying) {
                _this.isPlaying = false
                audio.pause()
                player.classList.remove('playing')
            }else{
                _this.isPlaying = true
                audio.play()
                player.classList.add('playing')
            }
        }

    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path;
    },

    start: function () {

        //  Định nghĩa các thuộc tính cho object 
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Render playlist
        this.render();

        // Tải thông tin bài hát đầu tiên vào UI
        this.loadCurrentSong();
    }

}

app.start();
