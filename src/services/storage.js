import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys yang dipakai di seluruh app
export const KEYS = {
  SESSION: '@elearning_session',       // data user yang sedang login
  PROGRESS: '@elearning_progress',     // progress belajar per matkul
  TASK_PHOTOS: '@elearning_task_photos', // foto tugas yang diupload
};

// ---- Generic helpers ----
export async function saveData(key, value) {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
    return true;
  } catch (e) {
    console.error('storage saveData error:', e);
    return false;
  }
}

export async function loadData(key) {
  try {
    const json = await AsyncStorage.getItem(key);
    return json != null ? JSON.parse(json) : null;
  } catch (e) {
    console.error('storage loadData error:', e);
    return null;
  }
}

export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('storage removeData error:', e);
    return false;
  }
}

// ---- Session (user login) ----
export async function saveSession(user) {
  return saveData(KEYS.SESSION, user);
}

export async function getSession() {
  return loadData(KEYS.SESSION);
}

export async function clearSession() {
  return removeData(KEYS.SESSION);
}

// ---- Progress belajar ----
// shape: { [matkulId]: { percent: number, completedMateri: string[] } }
export async function getProgress() {
  const data = await loadData(KEYS.PROGRESS);
  return data || {};
}

export async function updateProgress(matkulId, patch) {
  const all = await getProgress();
  const current = all[matkulId] || { percent: 0, completedMateri: [] };
  const updated = { ...current, ...patch };
  all[matkulId] = updated;
  await saveData(KEYS.PROGRESS, all);
  return updated;
}

// ---- Foto tugas ----
// shape: { [matkulId]: { uri: string, uploadedAt: string } }
export async function getTaskPhotos() {
  const data = await loadData(KEYS.TASK_PHOTOS);
  return data || {};
}

export async function saveTaskPhoto(matkulId, uri) {
  const all = await getTaskPhotos();
  all[matkulId] = { uri, uploadedAt: new Date().toISOString() };
  await saveData(KEYS.TASK_PHOTOS, all);
  return all[matkulId];
}
