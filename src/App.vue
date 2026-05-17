<template>
  <StoryViewer :slides="storySlides" />
</template>

<script setup>
import { ref } from 'vue';
import StoryViewer from './components/StoryViewer.vue';

// Import audio files
import audioNobodyElse from './assets/audio/nobody-else.mp3';
import audioMemoriBaik from './assets/audio/memori-baik.mp3';
import audioKitaBuatMenyenangkan from './assets/audio/kita-buat-menyenangkan.mp3';
import audioChachacha from './assets/audio/chachacha.mp3';
import audioSwim from './assets/audio/swim.mp3';
import audioEverythingUAre from './assets/audio/everything-u-are.mp3';

// Import foto-foto WEBP
import imgFirstMeet from './assets/image/first-meet.webp';
import imgFirstDate1 from './assets/image/first-date1.webp';
import imgFirstDate2 from './assets/image/first-date2.webp';
import imgDufan1 from './assets/image/dufan-trip1.webp';
import imgDufan2 from './assets/image/dufan-trip2.webp';
import imgDufan3 from './assets/image/dufan-trip3.webp';
import imgConcert1 from './assets/image/concert1.webp';
import imgConcert2 from './assets/image/concert2.webp';
import imgConcert3 from './assets/image/concert3.webp';
import imgMountain1 from './assets/image/mountain-date1.webp';
import imgMountain2 from './assets/image/mountain-date2.webp';
import imgBeach2 from './assets/image/beach-trip2.webp';
import imgBeach3 from './assets/image/beach-trip3.webp';
import imgTrekking1 from './assets/image/trekking1.webp';
import imgTrekking2 from './assets/image/trekking2.webp';
import imgThankYou from './assets/image/beach-trip1.webp';

/**
 * Kumpulan data konfigurasi untuk setiap halaman (slide) dalam cerita.
 * Setiap objek merepresentasikan satu halaman yang mencakup teks, gambar,
 * susunan layout, bentuk dekorasi, serta lagu pendamping.
 */
const storySlides = ref([
  {
    type: 'slide-base',
    title: 'Hey you.',
    message: 'I put together this little thing to look back at our random moments. Ready?',
    image: imgFirstMeet, // 1 gambar
    layout: 'layout-full-image', // Gambar background full, teks di atasnya
    background: 'linear-gradient(135deg, #1f1c2c, #928DAB)',
    shape: 'circle',
    audioSrc: audioNobodyElse, // Lagu pembuka santai
    musicLabel: 'LANY • Nobody Else'
  },
  {
    type: 'slide-base',
    title: 'Where it started',
    message: 'Still remember this? Started out as just a normal day, but it ended up changing everything for me.',
    image: [imgFirstDate1, imgFirstDate2], // 2 gambar
    layout: 'layout-reverse', // Teks di atas, gambar di bawah
    background: 'linear-gradient(135deg, #232526, #414345)',
    shape: 'blob',
    audioSrc: audioChachacha, // Lagu ceria
    musicLabel: 'Bruno Mars • Cha Cha Cha'
  },
  {
    type: 'slide-base',
    title: 'Time flies',
    message: 'From awkward early dates to just acting silly together. It’s been such a fun ride.',
    image: [imgDufan1, imgDufan2, imgDufan3], // 3 gambar
    layout: 'layout-split', // Teks terpisah jarak jauh dari gambar
    background: 'linear-gradient(135deg, #141E30, #243B55)',
    shape: 'circle',
    audioSrc: audioKitaBuatMenyenangkan, // Cocok untuk perjalanan ceria/Dufan
    musicLabel: 'Bernadya • Kita Buat Menyenangkan'
  },
  {
    type: 'slide-base',
    title: 'Concert nights',
    message: 'Screaming our lungs out to our favorite songs until we completely lost our voices. 🎤🎶',
    image: [imgConcert1, imgConcert2, imgConcert3], // 3 gambar
    layout: 'layout-split', // Grid layout
    background: 'linear-gradient(135deg, #5a3a3a, #e29595)',
    shape: 'circle',
    audioSrc: audioMemoriBaik, // Lagu kenangan konser
    musicLabel: 'Sheila On 7 • Memori Baik (feat. Aishameglio)'
  },
  {
    type: 'slide-base',
    title: 'My travel partner',
    message: 'From tiring hikes to getting sunburned at the beach... it’s always a good time with you. 🌊⛰️',
    image: [imgMountain1, imgTrekking2, imgBeach3, imgMountain2, imgTrekking1, imgBeach2], // 6 gambar (diacak agar lebih estetis)
    layout: 'layout-split', // Ubah ke split agar grid bisa terlihat penuh di layar
    background: 'linear-gradient(135deg, #114357, #F29492)',
    shape: 'blob',
    audioSrc: audioSwim, // Nuansa adventure/alam
    musicLabel: 'BTS • Swim'
  },
  {
    type: 'slide-base',
    title: 'Thank you',
    message: 'For staying, and for being the absolute best part of my days.<br/>I love you. ❤️',
    image: imgThankYou, // 1 gambar
    layout: 'layout-full-image',
    alignText: 'top',
    background: 'linear-gradient(135deg, #2b1055, #7597de)',
    shape: 'blob',
    audioSrc: audioEverythingUAre, // Lagu romantis untuk penutup
    musicLabel: 'Hindia • Everything U Are'
  },
  {
    type: 'slide-share',
    background: 'var(--color-bg-dark)',
    audioSrc: audioEverythingUAre, // Tetap lanjut lagu romantis di halaman share
    musicLabel: 'Hindia • Everything U Are'
  }
]);
</script>

<style>
/* Any global resets not covered in style.css */
</style>
