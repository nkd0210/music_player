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
const repeatBtn = document.querySelector('.btn-repeat');
const playlist = document.querySelector('.playlist');

const app = {

    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    songs: [
        {
            name: 'TẠI VÌ SAO',
            singer: 'MCK',
            path: './assets/music/TaiViSao-MCK-7963973.mp3',
            image: './assets/img/mck.jpg'
        },
        {
            name: 'KHÔNG THỂ SAY',
            singer: 'HIEUTHUHAI',
            path: './assets/music/KhongTheSay-HIEUTHUHAI-9293024.mp3',
            image: './assets/img/hieut2.jpg'
        },
        {
            name: 'MỘT NGÀY CHẲNG NẮNG',
            singer: 'Phao',
            path: './assets/music/MotNgayChangNang-Phao-9400644.mp3',
            image: './assets/img/phao.jpg'
        },
        {
            name: 'NẾU LÚC ĐÓ',
            singer: 'Tlinh',
            path: './assets/music/NeuLucDo-tlinh2pillz-8783613.mp3',
            image: './assets/img/tlinh.jpg'
        },
        {
            name: 'ƯNG QUÁ CHỪNG',
            singer: 'AMEE',
            path: './assets/music/UngQuaChung-AMEE-8783624.mp3',
            image: './assets/img/amee.jpg'
        },
        {
            name: 'BẬT TÌNH YÊU LÊN',
            singer: 'TĂNG DUY TÂN, HÒA MINZY',
            path: './assets/music/BatTinhYeuLen-TangDuyTanHoaMinzy-8715666.mp3',
            image: './assets/img/tangduytan.jpg'
        },
        {
            name: 'MÙA HÈ TUYỆT VỜI',
            singer: 'ĐỨC PHÚC',
            path: './assets/music/MuaHeTuyetVoiLalawonder-DucPhuc-9835888.mp3',
            image: './assets/img/ducphuc.jpg'
        },
        {
            name: 'ĐƯA EM VỀ NHÀ',
            singer: 'GREYD',
            path: './assets/music/DuaEmVeNhaa-GREYDChillies-9214678.mp3',
            image: './assets/img/greyd.jpg'
        },
        {
            name: 'HONG BÉ ƠI',
            singer: 'Cain, LCKing, Antoneus Maximus',
            path: './assets/music/HongBeOi-CainLCKingAntoneusMaximus-8053362.mp3',
            image: './assets/img/LCKing.jpg'
        },
        {
            name: 'SEE TÌNH',
            singer: 'HOÀNG THÙY LINH',
            path: './assets/music/SeeTinh-HoangThuyLinh-7702265.mp3',
            image: './assets/img/hoangthuylinh.jpg' 
        },
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${ index === this.currentIndex ? 'active' : ''}">
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
        playlist.innerHTML = htmls.join('');
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
            if(_this.isRandom) {
                _this.playRandomSong()
            }else{
                _this.nextSong();
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Xử lý khi quay lại bài hát trước 
        prevBtn.onclick = function () {
            if(_this.isRandom) {
                _this.playRandomSong()
            }else{
                _this.prevSong();
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
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

        // Xử lý bài hát tiếp theo khi 1 bài hát kết thúc
        audio.onended = function () {
            if(_this.isRepeat) {
                audio.play()
            }else{
                nextBtn.click()
            }
        }

        // Xử lý khi repeat bài hát
        repeatBtn.onclick = function () {
            if(_this.isRepeat) {
                _this.isRepeat = false;
                repeatBtn.classList.remove('active')
            }else {
                _this.isRepeat = true;
                repeatBtn.classList.add('active')
            }
        }

        // Lắng nghe hành vi click của bài hát
        playlist.onclick = function () {
            
        }

    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block: 'nearest'
            })
        },100)
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

    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * app.songs.length)
        }while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
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
