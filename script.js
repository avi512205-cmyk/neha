/* ======================================================
   CONFIGURABLE BIRTHDAY DETAILS
   Customize her name, message, photos, and signature here!
   ====================================================== */
const CONFIG = {
    // Friend's Name & Nickname
    friendName: "Nehuuu", 

    // Header Subtitle
    subtitle: "Wishing my absolute bestuuu a day as gorgeous, sweet, and bright as you are! ✨",

    // Letter Salutation & Body Paragraphs
    salutation: "Dear Neha,",
    messageParagraph1: "Happy Birthday to the most amazing, hilarious, and caring bestuuu ever! Having you in my life makes every moment 100x brighter and so much more fun. Thank you for being the sweetest friend and always bringing so much joy into the world.",
    messageParagraph2: "May this year bring you endless laughter, unforgettable moments, success in everything you dream of, and all the love you truly deserve. Never stop being your magical self, Nehuuu! 💖",
    
    // Sender Signature
    senderSignature: "~ Your Bestu Avi ❤️",

   
};

// Application State & Audio Synthesizer
let audioContext = null;
let isMusicPlaying = false;
let candlesExtinguishedCount = 0;
const totalCandles = 3;

document.addEventListener('DOMContentLoaded', () => {
    applyConfiguration();
    createFloatingStars();
    createFloatingHearts();
    setupEventListeners();
});

// Apply Configuration to DOM
function applyConfiguration() {
    document.getElementById('friendNameHeader').innerHTML = `Happy Birthday, <span class="highlight-name">${CONFIG.friendName}</span>! ✨`;
    document.getElementById('subtitleText').textContent = CONFIG.subtitle;
    document.getElementById('letterSalutation').textContent = CONFIG.salutation;
    document.getElementById('letterBody').textContent = CONFIG.messageParagraph1;
    document.getElementById('letterBody2').textContent = CONFIG.messageParagraph2;
    document.getElementById('senderSignature').textContent = CONFIG.senderSignature;

    // Apply Photo Gallery
    const photoGrid = document.getElementById('photoGrid');
    if (photoGrid && CONFIG.photos && CONFIG.photos.length > 0) {
        photoGrid.innerHTML = CONFIG.photos.map((p, index) => `
            <div class="polaroid-card" style="--r: ${index % 2 === 0 ? -3 : 3}">
                <div class="polaroid-img-wrapper">
                    <img src="${p.url}" alt="${p.caption}" class="polaroid-img" />
                </div>
                <div class="polaroid-caption">${p.caption}</div>
            </div>
        `).join('');
    }
}

// Generate Background Stars and Hearts
function createFloatingStars() {
    const container = document.getElementById('starsContainer');
    const starCount = 25;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${6 + Math.random() * 6}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.innerHTML = '✨';
        star.style.fontSize = `${12 + Math.random() * 14}px`;
        star.style.color = Math.random() > 0.5 ? '#ffd700' : '#ff758c';
        container.appendChild(star);
    }
}

function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartCount = 15;
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${8 + Math.random() * 7}s`;
        heart.style.animationDelay = `${Math.random() * 6}s`;
        heart.innerHTML = '💖';
        heart.style.fontSize = `${14 + Math.random() * 16}px`;
        container.appendChild(heart);
    }
}

// Event Listeners
function setupEventListeners() {
    // Audio Toggle
    const audioBtn = document.getElementById('audioControl');
    audioBtn.addEventListener('click', toggleBackgroundAudio);

    // Step 1: Gift Box Click
    const giftBox = document.getElementById('giftBox');
    giftBox.addEventListener('click', openGiftBox);

    // Step 2: Candle Blow Button & Candle Clicks
    const blowBtn = document.getElementById('blowBtn');
    blowBtn.addEventListener('click', blowAllCandles);

    document.querySelectorAll('.candle').forEach(candle => {
        candle.addEventListener('click', (e) => {
            const candleId = e.currentTarget.getAttribute('data-id');
            extinguishCandle(candleId);
        });
    });

    // Step 3: Envelope Seal Click
    const envelope = document.getElementById('envelope');
    const envelopeSeal = document.getElementById('envelopeSeal');
    envelopeSeal.addEventListener('click', (e) => {
        e.stopPropagation();
        openLetter();
    });
    envelope.addEventListener('click', openLetter);

    // Replay Button
    document.getElementById('replayBtn').addEventListener('click', resetCelebration);
}

// Step 1: Open Gift Box
function openGiftBox() {
    const giftBox = document.getElementById('giftBox');
    if (giftBox.classList.contains('opened')) return;

    giftBox.classList.add('opened');
    playMagicChimeSound();
    triggerSparklesConfetti();

    setTimeout(() => {
        unlockSection('cakeSection');
        scrollToSection('cakeSection');
    }, 800);
}

// Step 2: Candle Extinguishing Logic
function extinguishCandle(id) {
    const flame = document.getElementById(`flame${id}`);
    if (flame && !flame.classList.contains('extinguished')) {
        flame.classList.add('extinguished');
        playWhooshSound();
        candlesExtinguishedCount++;

        if (candlesExtinguishedCount >= totalCandles) {
            onAllCandlesBlown();
        }
    }
}

function blowAllCandles() {
    for (let i = 1; i <= totalCandles; i++) {
        extinguishCandle(i);
    }
}

function onAllCandlesBlown() {
    playCelebrationJingle();
    triggerGrandConfetti();
    document.getElementById('cakeInstructions').textContent = "✨ Wishes do come true! ✨";

    setTimeout(() => {
        unlockSection('wishSection');
        scrollToSection('wishSection');
    }, 1200);
}

// Step 3: Open Letter
function openLetter() {
    const envelope = document.getElementById('envelope');
    if (envelope.classList.contains('open')) return;

    envelope.classList.add('open');
    playPaperSound();
    triggerHeartConfetti();
    document.getElementById('envelopeHint').style.display = 'none';

    setTimeout(() => {
        unlockSection('gallerySection');
    }, 1500);
}

// Section Lock / Unlock Helpers
function unlockSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('locked');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Replay Celebration
function resetCelebration() {
    candlesExtinguishedCount = 0;
    document.querySelectorAll('.flame').forEach(f => f.classList.remove('extinguished'));
    document.getElementById('giftBox').classList.remove('opened');
    document.getElementById('envelope').classList.remove('open');
    document.getElementById('envelopeHint').style.display = 'block';

    document.getElementById('cakeSection').classList.add('locked');
    document.getElementById('wishSection').classList.add('locked');
    document.getElementById('gallerySection').classList.add('locked');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ======================================================
   CONFETTI EFFECTS (canvas-confetti)
   ====================================================== */
function triggerSparklesConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ff758c', '#ff7eb3', '#ffd700']
        });
    }
}

function triggerGrandConfetti() {
    if (typeof confetti === 'function') {
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
}

function triggerHeartConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 45,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#ff758c', '#ffb6c1', '#e8a598']
        });
    }
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

/* ======================================================
   WEB AUDIO API SOUND SYNTHESIZER
   Plays magical sounds & Happy Birthday melody without external mp3 dependencies!
   ====================================================== */
function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    return audioContext;
}

function toggleBackgroundAudio() {
    const ctx = getAudioContext();
    const btn = document.getElementById('audioControl');

    if (!isMusicPlaying) {
        isMusicPlaying = true;
        btn.classList.add('playing');
        playHappyBirthdayTune();
    } else {
        isMusicPlaying = false;
        btn.classList.remove('playing');
    }
}

function playTone(freq, type, duration, delay = 0) {
    try {
        const ctx = getAudioContext();
        setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + duration);
        }, delay);
    } catch(e) {}
}

function playMagicChimeSound() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => playTone(freq, 'sine', 0.4, idx * 80));
}

function playWhooshSound() {
    playTone(200, 'triangle', 0.2);
}

function playPaperSound() {
    playTone(400, 'sine', 0.15);
}

function playCelebrationJingle() {
    const tune = [
        { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.3 },
        { f: 293.66, d: 0.5 }, { f: 261.63, d: 0.5 },
        { f: 349.23, d: 0.5 }, { f: 329.63, d: 0.8 }
    ];
    let time = 0;
    tune.forEach(note => {
        playTone(note.f, 'sine', note.d, time);
        time += note.d * 1000;
    });
}

function playHappyBirthdayTune() {
    if (!isMusicPlaying) return;
    
    // Notes for Happy Birthday in C Major
    const notes = [
        { f: 261.63, d: 300 }, { f: 261.63, d: 300 }, { f: 293.66, d: 600 }, { f: 261.63, d: 600 }, { f: 349.23, d: 600 }, { f: 329.63, d: 1000 },
        { f: 261.63, d: 300 }, { f: 261.63, d: 300 }, { f: 293.66, d: 600 }, { f: 261.63, d: 600 }, { f: 392.00, d: 600 }, { f: 349.23, d: 1000 },
        { f: 261.63, d: 300 }, { f: 261.63, d: 300 }, { f: 523.25, d: 600 }, { f: 440.00, d: 600 }, { f: 349.23, d: 600 }, { f: 329.63, d: 600 }, { f: 293.66, d: 600 },
        { f: 466.16, d: 300 }, { f: 466.16, d: 300 }, { f: 440.00, d: 600 }, { f: 349.23, d: 600 }, { f: 392.00, d: 600 }, { f: 349.23, d: 1000 }
    ];

    let current = 0;
    function playNext() {
        if (!isMusicPlaying) return;
        const note = notes[current];
        playTone(note.f, 'sine', note.d / 1000);
        current = (current + 1) % notes.length;
        setTimeout(playNext, note.d + 100);
    }

    playNext();
}
