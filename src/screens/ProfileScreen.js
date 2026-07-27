import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../constants/colors';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSession, clearSession } from '../services/storage';

export default function ProfileScreen({ navigation }) {
  // State #1, #2
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      async function load() {
        setLoading(true);
        const session = await getSession();
        setUser(session);
        setLoading(false);
      }
      load();
    }, [])
  );

  function handleLogout() {
    Alert.alert('Keluar', 'Yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await clearSession();
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  }

  if (loading) {
    return <LoadingSpinner label="Memuat profil..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>PROFIL MAHASISWA</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(user?.nama || '?').charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.nama}>{user?.nama || '-'}</Text>
        <Text style={styles.nim}>NIM: {user?.nim || '-'}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Program Studi</Text>
          <Text style={styles.infoValue}>Sistem Informasi</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Universitas</Text>
          <Text style={styles.infoValue}>Universitas Prima Indonesia</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mata Kuliah</Text>
          <Text style={styles.infoValue}>Pemrograman Mobile</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 46,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroLabel: { color: colors.accentLight, fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
  profileCard: {
    alignItems: 'center',
    marginTop: -38,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.card,
    borderWidth: 3,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: colors.primary, fontSize: 30, fontWeight: '800' },
  nama: { fontSize: 18, fontWeight: '800', color: colors.text, marginTop: 12 },
  nim: { fontSize: 12.5, color: colors.textLight, marginTop: 2 },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 18,
    marginHorizontal: 20,
    marginTop: 24,
    shadowColor: '#0B1330',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  infoLabel: { fontSize: 13, color: colors.textLight },
  infoValue: { fontSize: 13.5, color: colors.text, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  logoutButton: {
    marginTop: 28,
    marginHorizontal: 20,
    marginBottom: 30,
    borderWidth: 1.5,
    borderColor: colors.danger,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  logoutText: { color: colors.danger, fontWeight: '700', fontSize: 15 },
});
