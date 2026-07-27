import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../constants/colors';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchMatkulById } from '../services/api';
import { getProgress, updateProgress, getTaskPhotos, saveTaskPhoto } from '../services/storage';

export default function MatkulDetailScreen({ route }) {
  const { matkulId } = route.params;

  // State #1, #2, #3, #4
  const [loading, setLoading] = useState(true);
  const [matkul, setMatkul] = useState(null);
  const [completedMateri, setCompletedMateri] = useState([]);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchMatkulById(matkulId);
      const progress = await getProgress();
      const photos = await getTaskPhotos();

      setMatkul(data);
      setCompletedMateri(progress[matkulId]?.completedMateri || []);
      setPhotoUri(photos[matkulId]?.uri || null);
      setLoading(false);
    }
    load();
  }, [matkulId]);

  async function toggleMateri(materiName) {
    if (!matkul) return;
    const isDone = completedMateri.includes(materiName);
    const updatedList = isDone
      ? completedMateri.filter((m) => m !== materiName)
      : [...completedMateri, materiName];

    const percent = Math.round((updatedList.length / matkul.materi.length) * 100);
    setCompletedMateri(updatedList);
    await updateProgress(matkulId, { percent, completedMateri: updatedList });
  }

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Izin Diperlukan',
        'Aplikasi butuh izin akses galeri untuk mengunggah foto tugas.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      await saveTaskPhoto(matkulId, uri);
    }
  }

  if (loading) {
    return <LoadingSpinner label="Memuat detail mata kuliah..." />;
  }

  if (!matkul) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Mata kuliah tidak ditemukan.</Text>
      </View>
    );
  }

  const percent = matkul.materi.length
    ? Math.round((completedMateri.length / matkul.materi.length) * 100)
    : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.hero}>
        <View style={styles.kodeChip}>
          <Text style={styles.kodeChipText}>{matkul.kode}</Text>
        </View>
        <Text style={styles.title}>{matkul.nama}</Text>
        <Text style={styles.dosen}>{matkul.dosen}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>🗓 {matkul.jadwal}</Text>
          <Text style={styles.metaText}>📍 {matkul.ruangan}</Text>
          <Text style={styles.metaText}>🎓 {matkul.sks} SKS</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Deskripsi</Text>
        <Text style={styles.desc}>{matkul.deskripsi}</Text>

        <View style={styles.progressHeader}>
          <Text style={styles.sectionTitle}>Materi & Progres</Text>
          <Text style={styles.progressPercent}>{percent}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
        </View>

        <View style={styles.materiCard}>
          {matkul.materi.map((item, idx) => {
            const done = completedMateri.includes(item);
            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.materiRow,
                  idx === matkul.materi.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={() => toggleMateri(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.materiCheck}>{done ? '✅' : '⬜'}</Text>
                <Text style={[styles.materiText, done && styles.materiTextDone]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Upload Foto Tugas</Text>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.preview} />
        ) : (
          <Text style={styles.desc}>Belum ada foto tugas yang diunggah.</Text>
        )}
        <TouchableOpacity style={styles.uploadButton} onPress={handlePickImage}>
          <Text style={styles.uploadButtonText}>
            {photoUri ? '📷  Ganti Foto' : '📷  Upload Foto Tugas'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFound: { color: colors.textLight, fontSize: 15 },
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  kodeChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginBottom: 10,
  },
  kodeChipText: { fontSize: 11.5, fontWeight: '800', color: colors.primaryDark, letterSpacing: 0.3 },
  title: { fontSize: 20, fontWeight: '800', color: '#fff' },
  dosen: { fontSize: 13, color: '#C9D3EA', marginTop: 4 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 12 },
  metaText: { fontSize: 12, color: '#EAF0FB', fontWeight: '600' },
  body: { padding: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginTop: 20, marginBottom: 8 },
  desc: { fontSize: 13, color: colors.textLight, lineHeight: 20 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  progressPercent: { fontSize: 14, fontWeight: '700', color: colors.primary },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  materiCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    shadowColor: '#0B1330',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  materiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  materiCheck: { fontSize: 16, marginRight: 10 },
  materiText: { fontSize: 14, color: colors.text, flex: 1 },
  materiTextDone: { textDecorationLine: 'line-through', color: colors.textLight },
  preview: { width: '100%', height: 200, borderRadius: 12, marginBottom: 12, backgroundColor: colors.border },
  uploadButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  uploadButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
