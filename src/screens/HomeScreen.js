import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../constants/colors';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSession, getProgress } from '../services/storage';
import { fetchMatkulList } from '../services/api';

export default function HomeScreen() {
  // State #1, #2, #3
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({ totalMatkul: 0, rataProgress: 0, totalSks: 0 });

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    const session = await getSession();
    const matkulList = await fetchMatkulList();
    const progress = await getProgress();

    const percents = matkulList.map((m) => progress[m.id]?.percent || 0);
    const rata =
      percents.length > 0 ? Math.round(percents.reduce((a, b) => a + b, 0) / percents.length) : 0;
    const totalSks = matkulList.reduce((a, m) => a + m.sks, 0);

    setUser(session);
    setSummary({ totalMatkul: matkulList.length, rataProgress: rata, totalSks });
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [loadDashboard])
  );

  if (loading) {
    return <LoadingSpinner label="Menyiapkan dashboard..." />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={false} onRefresh={loadDashboard} />}
    >
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>SELAMAT DATANG</Text>
        <Text style={styles.greeting}>{user?.nama || 'Mahasiswa'}</Text>
        <Text style={styles.subGreeting}>Semester 4 · Sistem Informasi · UNPRI</Text>
      </View>

      <View style={styles.cardsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{summary.totalMatkul}</Text>
          <Text style={styles.statLabel}>Mata Kuliah</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{summary.totalSks}</Text>
          <Text style={styles.statLabel}>Total SKS</Text>
        </View>
        <View style={[styles.statCard, styles.statCardAccent]}>
          <Text style={[styles.statNumber, styles.statNumberAccent]}>{summary.rataProgress}%</Text>
          <Text style={[styles.statLabel, styles.statLabelAccent]}>Progres</Text>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 Tips Belajar</Text>
        <Text style={styles.tipText}>
          Buka tab "Matkul" untuk melihat daftar mata kuliah, cek materi, dan unggah tugas kamu.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroLabel: { color: colors.accentLight, fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  greeting: { fontSize: 24, fontWeight: '800', color: '#fff', marginTop: 6 },
  subGreeting: { fontSize: 12.5, color: '#C9D3EA', marginTop: 4 },
  cardsRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: -18, gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#0B1330',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statCardAccent: {
    backgroundColor: colors.primaryDark,
  },
  statNumber: { fontSize: 22, fontWeight: '800', color: colors.primary },
  statNumberAccent: { color: colors.accent },
  statLabel: { fontSize: 11, color: colors.textLight, marginTop: 4, textAlign: 'center' },
  statLabelAccent: { color: '#C9D3EA' },
  tipCard: {
    backgroundColor: '#EAF0FB',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  tipTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 6 },
  tipText: { fontSize: 13, color: colors.textLight, lineHeight: 19 },
});
