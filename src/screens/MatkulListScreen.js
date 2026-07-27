import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { fetchMatkulList } from '../services/api';
import { getProgress } from '../services/storage';

export default function MatkulListScreen({ navigation }) {
  // State #1, #2, #3
  const [loading, setLoading] = useState(true);
  const [matkulList, setMatkulList] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const [list, prog] = await Promise.all([fetchMatkulList(), getProgress()]);
      if (isMounted) {
        setMatkulList(list);
        setProgress(prog);
        setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Conditional rendering: loading state
  if (loading) {
    return <LoadingSpinner label="Memuat daftar mata kuliah..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Mata Kuliah</Text>
        <Text style={styles.bannerSubtitle}>Semester 4 · Sistem Informasi</Text>
      </View>
      <FlatList
        data={matkulList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        // Conditional rendering: empty state
        ListEmptyComponent={
          <EmptyState
            icon="📚"
            title="Belum ada mata kuliah"
            subtitle="Daftar mata kuliah akan muncul di sini"
          />
        }
        renderItem={({ item }) => {
          const percent = progress[item.id]?.percent || 0;
          return (
            <ItemCard
              kode={item.kode}
              title={item.nama}
              subtitle={`${item.dosen} · ${item.sks} SKS`}
              meta={`${item.jadwal}  ·  ${item.ruangan}`}
              badge={`${percent}%`}
              badgeTone={percent === 100 ? 'full' : 'partial'}
              onPress={() => navigation.navigate('MatkulDetail', { matkulId: item.id })}
            />
          );
        }}
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
