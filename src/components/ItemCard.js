import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function ItemCard({ kode, title, subtitle, meta, badge, badgeTone, onPress }) {
  const badgeBg = badgeTone === 'full' ? colors.accent : colors.secondary;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.accentBar} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          {!!kode && (
            <View style={styles.kodeChip}>
              <Text style={styles.kodeText}>{kode}</Text>
            </View>
          )}
          {!!badge && (
            <View style={[styles.badge, { backgroundColor: badgeBg }]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {!!meta && <Text style={styles.meta}>🗓  {meta}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
    shadowColor: '#0B1330',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  accentBar: {
    width: 5,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  kodeChip: {
    backgroundColor: colors.background,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  kodeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.3,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 12.5,
    color: colors.textLight,
    marginTop: 3,
  },
  meta: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 8,
    fontWeight: '600',
  },
});
