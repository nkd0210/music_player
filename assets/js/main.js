const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = document.querySelector('.cd');
const heading = document.querySelector('header h2');
const cdThumb = document.querySelector('.cd-thumb');
const audio = document.querySelector('#audio');
const playBtn = document.querySelector('.btn-toggle-play');
const player = document.querySelector('.player');
const progress = document.querySelector('#progress');
const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
const randomBtn = document.querySelector('.btn-random');


const app = {

    currentIndex: 0,
    isPlaying: false,
    isRandom: false,

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
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvents: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate ([
            { transform : 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;

            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Khi bài hát được play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi bài hát bị pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý khi tua bài hát
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value 
            audio.currentTime = seekTime
        }

        // Xử lý khi next sang bài hát khác
        nextBtn.onclick = function () {
            _this.nextSong();
        }

        // Xử lý khi quay lại bài hát trước 
        prevBtn.onclick = function () {
            _this.prevSong();
        }

        // Xử lý khi random 1 bài hát
        randomBtn.onclick = function () {
            if(_this.isRandom) {
                _this.isRandom = false;
                randomBtn.classList.remove('active')
            }else{
                _this.isRandom = true;
                randomBtn.classList.add('active')
            }
        }
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path;
    },

    nextSong: function () {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
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

        // Next sang bài hát tiếp theo
        // this.nextSong();
    }

}

app.start();
