# E-Learning Kampus — Domain B: E-Learning

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-Local_Persistence-00b894)

> Aplikasi belajar online untuk mahasiswa Universitas Prima Indonesia. Mahasiswa bisa login, melihat daftar mata kuliah semester 4, membuka materi, melacak progres belajar, dan mengunggah foto tugas — semua tersimpan secara lokal di perangkat.

---

## 📸 Screenshots

| Login Screen | Home Screen | Feature Screen |
|:---:|:---:|:---:|
| ![Login](assets/login.jpeg) | ![Home](assets/home.jpeg) | ![Feature](assets/feature.jpeg) |

---

## ✨ Fitur Utama

- [x] Login mahasiswa dengan validasi form (NIM & Nama)
- [x] Daftar 11 Mata Kuliah Semester 4 dengan FlatList
- [x] Detail Mata Kuliah (kode, dosen, jadwal, ruangan, deskripsi, daftar materi) dengan navigasi Stack
- [x] Progres belajar per mata kuliah, tersimpan otomatis
- [x] Upload foto tugas via expo-image-picker (dengan handling izin)
- [x] Data persisten dengan AsyncStorage (sesi login + progres + foto tugas)
- [x] Bottom Tab Navigation (Beranda, Matkul, Progres, Profil)
- [x] Tampilan custom dengan tema navy & gold serta logo aplikasi sendiri

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React Native + Expo (SDK 54) |
| Navigation | React Navigation v6 (Stack + Bottom Tab) |
| Storage | @react-native-async-storage/async-storage |
| Device | expo-image-picker |
| Build | EAS Build (Expo Application Services) |

---

## 🚀 Cara Menjalankan

```bash
git clone https://github.com/username/nama-repo.git
cd nama-repo
npm install
npx expo start
```
Scan QR Code dengan Expo Go di HP.

---

## 📦 Download APK

[Download APK terbaru](LINK_APK_GITHUB_RELEASE_ATAU_DRIVE)

---

## 🌐 Expo Snack

[Buka di Expo Snack](https://snack.expo.dev/@joyyy21/elearningkampus-uas-praktek-pemrograman-mobile)

---

## 👤 Developer

**Joyce** | 243303621234 | Praktek Pemrograman Mobile (React Native)
Universitas Prima Indonesia — Prodi Sistem Informasi
Mata Kuliah: Pemrograman Mobile
