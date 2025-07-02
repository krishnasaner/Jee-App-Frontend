import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('window');

export default function MainScreen() {
  const questionText = 'Which of the following molecules\nhas a square planar geometry?';
  const options = [
    { id: 'A', text: 'OPTION', isCorrect: false },
    { id: 'B', text: 'OPTION', isCorrect: false },
    { id: 'C', text: 'OPTION', isCorrect: true },
    { id: 'D', text: 'OPTION', isCorrect: false },
  ];

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(index);
    setIsAnswered(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper} showsVerticalScrollIndicator={false}>
      <View style={styles.phoneContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back-circle-outline" size={32} color="#2563eb" />
        </TouchableOpacity>

        <View style={styles.questionCounterWrapper}>
          <Text style={styles.questionCounter}>Question X/Y</Text>
        </View>

        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={32} color="#2563eb" />
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.questionText}>{questionText}</Text>
            <View style={styles.optionsContainer}>
              {options.map((option, index) => {
                const isSelected = selectedOptionIndex === index;
                const isCorrect = option.isCorrect;
                const isWrong = isAnswered && isSelected && !isCorrect;
                const isRight = isAnswered && isSelected && isCorrect;

                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[styles.optionButton,
                      isSelected && styles.optionSelected,
                      isRight && styles.optionCorrect,
                      isWrong && styles.optionIncorrect,
                      isSelected && (isRight ? styles.correctBorderLeft : isWrong ? styles.incorrectBorderLeft : styles.selectedBorderLeft)
                    ]}
                    disabled={isAnswered}
                    onPress={() => handleOptionClick(index)}
                  >
                    <Text style={styles.optionText}>{`${option.id} ${option.text}`}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: isAnswered ? '#2563eb' : '#f0f0f0' }]}
              disabled={!isAnswered}
            >
              <Text style={[styles.nextText, { color: isAnswered ? '#fff' : '#a1a1aa' }]}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#eef4ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  phoneContainer: {
    width: 393,
    minHeight: screenHeight,
    backgroundColor: '#eef4ff',
    position: 'relative',
    overflow: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: 68,
    left: 24,
    zIndex: 1,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 68,
    right: 24,
    zIndex: 1,
  },
  questionCounterWrapper: {
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  questionCounter: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    textAlign: 'center',
  },
  card: {
    marginTop: 137,
    width: 393,
    minHeight:screenHeight,
    backgroundColor: 'white',
    borderRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 3,
    borderColor: '#2563eb99',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 27,
    gap: 30,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    marginTop: 20,
    gap: 20,
  },
  optionButton: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  optionSelected: {
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  optionCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  optionIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  correctBorderLeft: {
    borderLeftWidth: 6,
    borderLeftColor: '#22c55e',
  },
  incorrectBorderLeft: {
    borderLeftWidth: 6,
    borderLeftColor: '#ef4444',
  },
  selectedBorderLeft: {
    borderLeftWidth: 6,
    borderLeftColor: '#2563eb',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 50,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
