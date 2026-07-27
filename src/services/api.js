// Data mata kuliah — Semester 4 Sistem Informasi, Universitas Prima Indonesia
// Untuk demo delay dipakai supaya loading state kelihatan jelas di useEffect.

const DUMMY_MATKUL = [
  {
    id: 'mk1',
    nama: 'Sistem Pakar',
    kode: 'SI-1404',
    dosen: 'Dr. Marlince Novita K. Nababan, S.Kom., M.Kom.',
    sks: 3,
    jadwal: 'Senin, 10:25 - 11:25',
    ruangan: 'A-1809',
    deskripsi:
      'Mempelajari konsep sistem pakar (expert system) untuk merepresentasikan pengetahuan manusia ke dalam sistem komputer, termasuk metode inferensi seperti forward dan backward chaining.',
    materi: [
      'Pengantar Sistem Pakar',
      'Representasi Pengetahuan',
      'Forward Chaining & Backward Chaining',
      'Certainty Factor',
      'Studi Kasus Implementasi Sistem Pakar',
    ],
  },
  {
    id: 'mk2',
    nama: 'Digital Marketing',
    kode: 'SI-4308',
    dosen: 'Dr. Windania Purba, S.Kom., M.Kom.',
    sks: 2,
    jadwal: 'Senin, 11:30 - 12:30',
    ruangan: 'A-1809',
    deskripsi:
      'Membahas strategi pemasaran digital, mulai dari SEO, social media marketing, hingga analisis performa kampanye digital untuk bisnis modern.',
    materi: [
      'Pengantar Digital Marketing',
      'SEO dan Content Marketing',
      'Social Media Marketing',
      'Email & Performance Marketing',
    ],
  },
  {
    id: 'mk3',
    nama: 'Metodologi Penelitian Sistem Informasi',
    kode: 'SI-1401',
    dosen: 'Dr. Mardi Turnip, S.Kom., M.Kom.',
    sks: 3,
    jadwal: 'Selasa, 10:25 - 11:25',
    ruangan: 'A-1809',
    deskripsi:
      'Membekali mahasiswa dengan kemampuan menyusun proposal dan metodologi penelitian ilmiah di bidang sistem informasi sebagai dasar penyusunan skripsi.',
    materi: [
      'Menentukan Rumusan Masalah',
      'Studi Literatur & State of the Art',
      'Metode Penelitian Kuantitatif & Kualitatif',
      'Teknik Pengumpulan dan Analisis Data',
      'Penyusunan Proposal Penelitian',
    ],
  },
  {
    id: 'mk4',
    nama: 'Data Science Fundamental',
    kode: 'SI-B1007',
    dosen: 'Dr. Delima Sitanggang, S.Kom., M.Kom.',
    sks: 3,
    jadwal: 'Selasa, 11:30 - 12:30',
    ruangan: 'A-1809',
    deskripsi:
      'Pengantar dasar data science meliputi eksplorasi data, statistik, dan penerapan algoritma machine learning sederhana untuk pengambilan keputusan berbasis data.',
    materi: [
      'Pengantar Data Science',
      'Exploratory Data Analysis',
      'Statistik Dasar untuk Data Science',
      'Pengantar Machine Learning',
    ],
  },
  {
    id: 'mk5',
    nama: 'Big Data Analysis',
    kode: 'SI-4301',
    dosen: 'Dr. Ertina Sabarita Barus, S.T., M.Kom.',
    sks: 3,
    jadwal: 'Rabu, 08:10 - 09:10',
    ruangan: 'A-1809',
    deskripsi:
      'Membahas konsep dan arsitektur big data, termasuk pengolahan data berskala besar menggunakan pendekatan distributed computing.',
    materi: [
      'Karakteristik Big Data (Volume, Velocity, Variety)',
      'Arsitektur Big Data',
      'Pengantar Hadoop & Spark',
      'Studi Kasus Analisis Big Data',
    ],
  },
  {
    id: 'mk6',
    nama: 'Pemrograman Mobile (Java Berbasis Android)',
    kode: 'SI-1402',
    dosen: 'Dr. Evta Indra, S.Kom., M.Kom.',
    sks: 2,
    jadwal: 'Rabu, 10:25 - 11:25',
    ruangan: 'A-1809',
    deskripsi:
      'Membahas konsep dasar pengembangan aplikasi mobile berbasis Android menggunakan bahasa Java, termasuk siklus hidup activity dan komponen UI dasar.',
    materi: [
      'Pengenalan Android Studio & Java',
      'Activity Lifecycle',
      'UI Components & Layout',
      'Intent dan Navigasi Antar Activity',
    ],
  },
  {
    id: 'mk7',
    nama: 'Praktek Pemrograman Mobile (Java Berbasis Android)',
    kode: 'SI-1403',
    dosen: 'Dr. Evta Indra, S.Kom., M.Kom.',
    sks: 1,
    jadwal: 'Rabu, 11:30 - 12:30',
    ruangan: 'A-1809',
    deskripsi:
      'Praktikum penerapan langsung konsep pemrograman mobile Android berbasis Java melalui pembuatan aplikasi sederhana secara bertahap.',
    materi: [
      'Setup Proyek Android Praktikum',
      'Implementasi Form dan Validasi',
      'Koneksi ke Local Database (SQLite)',
      'Uji Coba Aplikasi di Emulator/Device',
    ],
  },
  {
    id: 'mk8',
    nama: 'Testing dan Implementasi Sistem',
    kode: 'SI-1406',
    dosen: 'Saut Parsaoran Tamba, S.Kom., M.Kom.',
    sks: 3,
    jadwal: 'Kamis, 08:10 - 09:10',
    ruangan: 'A-1805',
    deskripsi:
      'Membahas teknik pengujian perangkat lunak (unit testing, integration testing) serta strategi implementasi sistem ke lingkungan produksi.',
    materi: [
      'Konsep Dasar Software Testing',
      'Unit Testing & Integration Testing',
      'Black Box vs White Box Testing',
      'Strategi Implementasi & Deployment',
    ],
  },
  {
    id: 'mk9',
    nama: 'Sistem Terdistribusi',
    kode: 'SI-1407',
    dosen: 'Donni Nasution, S.E., M.Kom.',
    sks: 3,
    jadwal: 'Kamis, 10:25 - 11:25',
    ruangan: 'A-1809',
    deskripsi:
      'Mempelajari konsep sistem terdistribusi, komunikasi antar proses, serta tantangan konsistensi dan keandalan pada sistem yang tersebar di banyak node.',
    materi: [
      'Pengantar Sistem Terdistribusi',
      'Komunikasi Antar Proses (RPC, Message Passing)',
      'Distributed Database & Konsistensi Data',
      'Fault Tolerance dan Replikasi',
    ],
  },
  {
    id: 'mk10',
    nama: 'Pelayanan Prima',
    kode: 'MKP601001',
    dosen: 'Lilis Handayani Napitupulu, S.S., M.Si.',
    sks: 2,
    jadwal: 'Sabtu, 10:00 - 11:00',
    ruangan: 'Spada',
    deskripsi:
      'Membekali mahasiswa dengan prinsip pelayanan prima (service excellence) sebagai bekal soft skill dalam dunia kerja dan interaksi profesional.',
    materi: [
      'Konsep Dasar Pelayanan Prima',
      'Komunikasi Efektif dengan Pelanggan',
      'Menangani Keluhan Pelanggan',
      'Etika Profesional dalam Pelayanan',
    ],
  },
  {
    id: 'mk11',
    nama: 'Kewirausahaan',
    kode: 'MKP601002',
    dosen: 'Dr. Herbert Wau, SKM., M.P.H.',
    sks: 2,
    jadwal: 'Sabtu, 11:00 - 12:00',
    ruangan: 'Spada',
    deskripsi:
      'Membahas dasar-dasar kewirausahaan, mulai dari pengembangan ide bisnis, perencanaan usaha, hingga strategi memulai dan mengelola bisnis baru.',
    materi: [
      'Mindset dan Karakter Wirausaha',
      'Identifikasi Peluang & Ide Bisnis',
      'Perencanaan Bisnis (Business Plan)',
      'Strategi Pemasaran untuk Usaha Baru',
    ],
  },
];

export function fetchMatkulList() {
  // Simulasi network delay 800ms agar loading state terlihat
  return new Promise((resolve) => {
    setTimeout(() => resolve(DUMMY_MATKUL), 800);
  });
}

export function fetchMatkulById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_MATKUL.find((m) => m.id === id) || null);
    }, 300);
  });
}
