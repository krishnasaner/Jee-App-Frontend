import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define what a question looks like
type Question = {
  id: string;
  number: string;
  text: string;
  difficulty: "Easy" | "Medium" | "Hard";
  options: string[];
  correctAnswer: number;
  subject: string;
  chapter: string;
  topic: string;
};

// Sample questions data (like the ones in your screenshots)
const questions: Question[] = [
  {
    id: "q1",
    number: "Q.1/50",
    text: "What is the SI unit of force?",
    difficulty: "Easy",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctAnswer: 2, // Newton is at index 2
    subject: "Physics",
    chapter: "Force",
    topic: "Units"
  },
  {
    id: "q2",
    number: "Q.2/50", 
    text: "A car starts from rest and accelerates uniformly at 2 m/s². What will be its velocity after 5 seconds?",
    difficulty: "Medium",
    options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
    correctAnswer: 1, // 10 m/s is at index 1
    subject: "Physics",
    chapter: "Motion",
    topic: "Kinematics"
  },
  {
    id: "q3",
    number: "Q.3/50",
    text: "v = u + at → v = 0 + (2×5) = 10 m/s → Correct = 10 m/s → but actually that matches B, so we'll change it.",
    difficulty: "Hard",
    options: ["10 m/s", "15 m/s", "20 m/s", "5 m/s"],
    correctAnswer: 0, // 10 m/s is at index 0
    subject: "Physics",
    chapter: "Motion", 
    topic: "Equations"
  }
];

export default function MainScreen() {
  // State to track which question we're currently on
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // State to track which option is selected
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // State to track bookmarked questions
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<string>>(new Set());
  
  // State to track all answers
  const [answers, setAnswers] = useState<{[key: string]: number}>({});

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Check if this is the first or last question
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Colors for different difficulty levels
  const difficultyColors = {
    Easy: { background: "#E8F5E8", text: "#2E7D32" },
    Medium: { background: "#FFF3E0", text: "#F57C00" },
    Hard: { background: "#FFEBEE", text: "#C62828" }
  };

  // Function to handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    // Save the answer
    setAnswers((prev: {[key: string]: number}) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  // Function to go to previous question
  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev: number) => prev - 1);
      
      // Load the previous answer if it exists
      const prevQuestion = questions[currentQuestionIndex - 1];
      setSelectedOption(answers[prevQuestion.id] || null);
    }
  };

  // Function to skip question
  const handleSkip = () => {
    Alert.alert(
      "Skip Question",
      "Are you sure you want to skip this question?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Skip", onPress: goToNextQuestion }
      ]
    );
  };

  // Function to go to next question
  const goToNextQuestion = () => {
    if (isLastQuestion) {
      // If this is the last question, show completion
      Alert.alert("Quiz Complete", "You've finished all questions!");
    } else {
      // Go to next question
      setCurrentQuestionIndex((prev: number) => prev + 1);
      
      // Load the next answer if it exists
      const nextQuestion = questions[currentQuestionIndex + 1];
      setSelectedOption(answers[nextQuestion.id] || null);
    }
  };

  // Function to toggle bookmark
  const toggleBookmark = () => {
    setBookmarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id);
      } else {
        newSet.add(currentQuestion.id);
      }
      return newSet;
    });
  };

  // Check if current question is bookmarked
  const isBookmarked = bookmarkedQuestions.has(currentQuestion.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Breadcrumb */}
        <Text style={styles.breadcrumb}>
          {currentQuestion.subject} &gt; {currentQuestion.chapter} &gt; {currentQuestion.topic}
        </Text>

        {/* Question number and bookmark */}
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>{currentQuestion.number}</Text>
          <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
            <Text style={[styles.bookmarkIcon, isBookmarked && styles.bookmarkedIcon]}>
              {isBookmarked ? "🔖" : "📑"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Question text */}
        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        {/* Difficulty tag */}
        <View style={[
          styles.difficultyTag, 
          { backgroundColor: difficultyColors[currentQuestion.difficulty].background }
        ]}>
          <Text style={[
            styles.difficultyText,
            { color: difficultyColors[currentQuestion.difficulty].text }
          ]}>
            {currentQuestion.difficulty}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === index && styles.selectedOption
              ]}
              onPress={() => handleOptionSelect(index)}
            >
              <Text style={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </Text>
              <Text style={[
                styles.optionText,
                selectedOption === index && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, styles.previousButton, isFirstQuestion && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={isFirstQuestion}
        >
          <Text style={[styles.navButtonText, isFirstQuestion && styles.disabledText]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.skipButton]}
          onPress={handleSkip}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles - This is like CSS for your app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  breadcrumb: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  bookmarkButton: {
    padding: 5,
  },
  bookmarkIcon: {
    fontSize: 20,
  },
  bookmarkedIcon: {
    opacity: 1,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 24,
    marginBottom: 20,
  },
  difficultyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginRight: 16,
    minWidth: 20,
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  selectedOptionText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  previousButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  skipButton: {
    backgroundColor: '#2196F3',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  skipButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  disabledText: {
    color: '#CCCCCC',
  },
});