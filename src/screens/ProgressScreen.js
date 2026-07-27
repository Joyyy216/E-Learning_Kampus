import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../constants/colors';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { fetchMatkulList } from '../services/api';
import { getProgress } from '../services/storage';

export default function ProgressScreen({ navigation }) {
  // State #1, #2
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      async function load() {
        setLoading(true);
        const [list, progress] = await Promise.all([fetchMatkulList(), getProgress()]);
        const merged = list.map((m) => ({
          ...m,
          percent: progress[m.id]?.percent || 0,
        }));
        if (isMounted) {
          setRows(merged);
          setLoading(false);
        }
      }
      load();
      return () => {
        isMounted = false;
      };
    }, [])
  );

  if (loading) {
    return <LoadingSpinner label="Memuat progres belajar..." />;
  }

  const rataProgress =
    rows.length > 0 ? Math.round(rows.reduce((a, r) => a + r.percent, 0) / rows.length) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Progres Belajar</Text>
        <Text style={styles.bannerSubtitle}>Rata-rata keseluruhan: {rataProgress}%</Text>
      </View>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={
          <EmptyState icon="📈" title="Belum ada progres" subtitle="Mulai belajar untuk melihat progresmu" />
        }
        renderItem={({ item }) => (
          <ItemCard
            kode={item.kode}
            title={item.nama}
            subtitle={`${item.materi.length} materi`}
            badge={`${item.percent}%`}
            badgeTone={item.percent === 100 ? 'full' : 'partial'}
            onPress={() => navigation.navigate('MatkulDetail', { matkulId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  banner: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  bannerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  bannerSubtitle: { color: '#C9D3EA', fontSize: 12.5, marginTop: 2 },
});
