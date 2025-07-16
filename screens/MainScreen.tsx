import { FontAwesome } from '@expo/vector-icons'; // Expo's vector icons
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    question: "What is the SI unit of force?",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    answer: 2,
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    answer: 1,
  },
  {
    question: "Who is known as the father of computers?",
    options: ["Isaac Newton", "Albert Einstein", "Charles Babbage", "Nikola Tesla"],
    answer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1,
  },
  {
    question: "What is the value of π (pi) up to two decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    answer: 1,
  },
];

export default function QuizScreen() {
  const router = useRouter();
  const [current, setCurrent] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleOptionPress = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setIsCorrect(idx === questions[current].answer);
  };

  const handleSkip = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setAnswered(false);
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setAnswered(false);
      setIsCorrect(false);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
      setAnswered(false);
      setIsCorrect(false);
    }
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);
  };

  const handleGoToLeaderboard = () => {
    router.push('/(tabs)/leaderboard');
  };

  if (quizSubmitted) {
    return (
      <LinearGradient colors={['#fff', '#e3f2ff']} style={styles.container}>
        <View style={styles.completionContainer}>
          <FontAwesome name="check-circle" size={80} color="#00b550" style={styles.completionIcon} />
          <Text style={styles.completionTitle}>Quiz Completed!</Text>
          <Text style={styles.completionSubtitle}>Great job on finishing the quiz</Text>
          
          <View style={styles.completionButtonContainer}>
            <TouchableOpacity style={styles.leaderboardBtn} onPress={handleGoToLeaderboard}>
              <FontAwesome name="trophy" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.leaderboardBtnText}>Go to Leaderboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#fff', '#e3f2ff']} style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.navbar}>
          <Text style={styles.navText}>Subject</Text>
          <Text style={styles.navText}>&gt;</Text>
          <Text style={styles.navText}>Chapter</Text>
          <Text style={styles.navText}>&gt;</Text>
          <Text style={styles.navText}>Topic</Text>
        </View>
        <Text style={styles.qCount}>Q.{current + 1}/{questions.length}</Text>
      </View>

      {/* Question */}
      <View style={styles.questionBar}>
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>{questions[current].question}</Text>
          <FontAwesome name="bookmark" size={24} color="#2563eb" style={styles.bookmarkIcon} />
        </View>
      </View>

      {/* Options */}
      <View style={styles.options}>
        {questions[current].options.map((opt: string, idx: number) => {
          let optionStyle = styles.optionDefault;
          let textStyle = styles.optionDefaultText;
          if (answered) {
            if (idx === questions[current].answer) {
              // If this is the correct answer and user selected it, show green with blue selection
              if (selected === idx) {
                optionStyle = styles.optionCorrectSelected;
                textStyle = styles.optionCorrectText;
              } else {
                // Just the correct answer, show green
                optionStyle = styles.optionCorrect;
                textStyle = styles.optionCorrectText;
              }
            } else if (selected === idx) {
              // User selected wrong answer, show blue (wrong)
              optionStyle = styles.optionWrong;
              textStyle = styles.optionWrongText;
            }
          } else if (selected === idx) {
            // User selected but not answered yet, show blue selection
            optionStyle = styles.optionSelected;
          }
          return (
            <TouchableOpacity
              key={idx}
              style={optionStyle}
              onPress={() => handleOptionPress(idx)}
              disabled={answered}
              activeOpacity={0.7}
            >
              <View style={styles.frame}>
                <Text style={answered && idx === questions[current].answer ? styles.frameCorrectText : styles.frameDefaultText}>
                  {String.fromCharCode(65 + idx)}
                </Text>
              </View>
              <View style={styles.optionTextWrapper}>
                <Text style={textStyle}>{opt}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Button Row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.blueBtn}
          onPress={handlePrevious}
          disabled={current === 0}
        >
          <Text style={[styles.blueBtnText, current === 0 && { opacity: 0.5 }]}>Previous</Text>
        </TouchableOpacity>
        {current === questions.length - 1 ? (
          <TouchableOpacity style={styles.blueBtn} onPress={handleSubmit}>
            <Text style={styles.blueBtnText}>Submit</Text>
          </TouchableOpacity>
        ) : answered ? (
          <TouchableOpacity style={styles.blueBtn} onPress={handleNext}>
            <Text style={styles.blueBtnText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.blueBtn} onPress={handleSkip}>
            <Text style={styles.blueBtnText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    width: 391,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 64,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navText: {
    fontWeight: '500',
    color: '#6b7280',
    fontSize: 14,
  },
  qCount: {
    fontWeight: '500',
    color: '#000',
    fontSize: 15,
    marginTop: 8,
  },
  questionBar: {
    width: 391,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  questionText: {
    flex: 1,
    fontWeight: '600',
    color: '#111827',
    fontSize: 20,
  },
  bookmarkIcon: {
    marginTop: 2,
  },
  options: {
    width: 392,
    paddingHorizontal: 20,
    paddingTop: 48,
    gap: 12,
  },
  optionDefault: {
    backgroundColor: 'rgba(249,250,251,0.5)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  optionSelected: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  optionCorrect: {
    backgroundColor: '#a9f5c7',
    borderColor: '#00b550',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  optionCorrectSelected: {
    backgroundColor: '#dbeafe',
    borderColor: '#00b550',
    borderWidth: 2,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  optionWrong: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  frame: {
    backgroundColor: '#2563eb',
    borderRadius: 999,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  frameDefaultText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  frameCorrectText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  optionTextWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  optionDefaultText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
  },
  optionCorrectText: {
    color: '#004d40',
    fontWeight: '500',
    fontSize: 16,
  },
  optionWrongText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  buttonRow: {
    width: 392,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 24,
    position: 'absolute',
    bottom: 0,
  },
  blueBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 6,
  },
  blueBtnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  // New styles for completion screen
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  completionIcon: {
    marginBottom: 24,
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 12,
    textAlign: 'center',
  },
  completionSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 48,
    textAlign: 'center',
  },
  completionButtonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  leaderboardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 8,
  },
  leaderboardBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});