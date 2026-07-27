import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import colors from '../constants/colors';
import { saveSession } from '../services/storage';

export default function LoginScreen({ navigation }) {
  // State #1, #2, #3
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    if (!nim.trim() || !nama.trim()) {
      return 'NIM dan Nama wajib diisi.';
    }
    if (nim.trim().length < 5) {
      return 'NIM minimal 5 karakter.';
    }
    if (!/^\d+$/.test(nim.trim())) {
      return 'NIM hanya boleh berisi angka.';
    }
    if (nama.trim().length < 3) {
      return 'Nama minimal 3 karakter.';
    }
    return '';
  }

  async function handleLogin() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setSubmitting(true);
    const user = { nim: nim.trim(), nama: nama.trim(), loginAt: new Date().toISOString() };
    const ok = await saveSession(user);
    setSubmitting(false);
    if (ok) {
      navigation.replace('MainTabs');
    } else {
      setError('Gagal menyimpan sesi login. Coba lagi.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appName}>E-Learning Kampus</Text>
          <Text style={styles.appSubtitle}>Universitas Prima Indonesia</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Masuk ke Akun</Text>
          <Text style={styles.formSubtitle}>Gunakan NIM dan nama untuk melanjutkan</Text>

          <Text style={styles.label}>NIM</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: 210102030"
            placeholderTextColor={colors.textLight}
            keyboardType="number-pad"
            value={nim}
            onChangeText={setNim}
          />

          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Joyce Amanda"
            placeholderTextColor={colors.textLight}
            value={nama}
            onChangeText={setNama}
          />

          {!!error && <Text style={styles.errorText}>⚠ {error}</Text>}

          <TouchableOpacity
            style={[styles.button, submitting && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={submitting}
          >
            <Text style={styles.buttonText}>{submitting ? 'Memproses...' : 'Masuk'}</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>Program Studi Sistem Informasi · TI-MOBILE-01</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, paddingBottom: 30 },
  hero: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  logoCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.accent,
  },
  logoImage: { width: 64, height: 64 },
  appName: { fontSize: 20, fontWeight: '800', color: '#fff', marginTop: 16 },
  appSubtitle: { fontSize: 12.5, color: '#C9D3EA', marginTop: 4 },
  formCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: -24,
    borderRadius: 20,
    padding: 22,
    shadowColor: '#0B1330',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  formTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  formSubtitle: { fontSize: 12.5, color: colors.textLight, marginTop: 4 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  errorText: { color: colors.danger, fontSize: 13, marginTop: 14 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  footer: {
    textAlign: 'center',
    fontSize: 11.5,
    color: colors.textLight,
    marginTop: 20,
  },
});
