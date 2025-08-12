import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

const COLORS = {
  primary: '#4A90E2',
  background: '#F5F5F5',
  white: '#FFFFFF',
  text: '#333333',
};

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Page Not Found
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          The screen you are looking for doesn’t exist.
        </ThemedText>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText style={styles.buttonText}>
              Go to Home Screen
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    fontSize: 22,
  },
  subtitle: {
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
