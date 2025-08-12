// screens/MainScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

/** ====== COLORS (exact palette used in your shots) ====== */
const COLORS = {
  pageBg: "#EEF3FF",
  white: "#FFFFFF",
  black: "#000000",
  base: "#2F6CFF",
  mid: "#457CFF",
  top: "#5A8DFF",
  primary: "#1D4ED8",
  badgeBlue: "#457CFF",
  timerNum: "#1F54DE",
  green: "#10B981",
  red: "#FF6B6B",
  star: "#FFC107",
  cardShadow: "rgba(0,0,0,0.05)",
};

// Get screen dimensions for better responsiveness
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/** ====== LAYOUT tuned for responsiveness ====== */
const LAYOUT = {
  board: { w: screenWidth, h: screenHeight },
  headerH: screenHeight * 0.31, // 31% of screen height
  timer: { w: 79, h: 79, top: screenHeight * 0.16, left: (screenWidth - 79) / 2 }, // perfectly centered
  card: { w: screenWidth - 36, h: 181, left: 18, top: screenHeight * 0.205, radius: 12 },
  options: { left: 18, top: screenHeight * 0.465, width: screenWidth - 36, rowH: 66, gap: 16, pill: 32 },
  bottom: { left: 18, width: screenWidth - 36, height: 52, bottom: 28 },
};

const QUESTION_TIME = 15;
const ALPHA = ["A", "B", "C", "D"];

/** ====== DATA - 15 Questions (5 each: Physics, Maths, Chemistry) ====== */
type Question = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  subject: 'Physics' | 'Maths' | 'Chemistry';
};

const QUESTIONS: Question[] = [
  // Physics Questions
  {
    id: "q1",
    prompt: "Which physical quantity is measured in newton (N)?",
    options: ["Energy", "Force", "Power", "Pressure"],
    answerIndex: 1,
    subject: 'Physics',
  },
  {
    id: "q2",
    prompt: "The SI unit of electric current is:",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    answerIndex: 1,
    subject: 'Physics',
  },
  {
    id: "q3",
    prompt: "What is the speed of light in vacuum?",
    options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10¹² m/s"],
    answerIndex: 1,
    subject: 'Physics',
  },
  {
    id: "q4",
    prompt: "Which law states F = ma?",
    options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
    answerIndex: 1,
    subject: 'Physics',
  },
  {
    id: "q5",
    prompt: "The unit of frequency is:",
    options: ["Hertz", "Joule", "Watt", "Pascal"],
    answerIndex: 0,
    subject: 'Physics',
  },
  
  // Mathematics Questions
  {
    id: "q6",
    prompt: "sin²θ + cos²θ equals:",
    options: ["0", "1", "2", "tan²θ"],
    answerIndex: 1,
    subject: 'Maths',
  },
  {
    id: "q7",
    prompt: "What is the derivative of x²?",
    options: ["x", "2x", "x²/2", "2x²"],
    answerIndex: 1,
    subject: 'Maths',
  },
  {
    id: "q8",
    prompt: "The value of π is approximately:",
    options: ["3.14159", "2.71828", "1.41421", "1.61803"],
    answerIndex: 0,
    subject: 'Maths',
  },
  {
    id: "q9",
    prompt: "What is log₁₀(100)?",
    options: ["1", "2", "10", "100"],
    answerIndex: 1,
    subject: 'Maths',
  },
  {
    id: "q10",
    prompt: "The square root of 144 is:",
    options: ["11", "12", "13", "14"],
    answerIndex: 1,
    subject: 'Maths',
  },
  
  // Chemistry Questions
  {
    id: "q11",
    prompt: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answerIndex: 2,
    subject: 'Chemistry',
  },
  {
    id: "q12",
    prompt: "The atomic number of carbon is:",
    options: ["4", "6", "8", "12"],
    answerIndex: 1,
    subject: 'Chemistry',
  },
  {
    id: "q13",
    prompt: "Which gas makes up about 78% of Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
    answerIndex: 1,
    subject: 'Chemistry',
  },
  {
    id: "q14",
    prompt: "The pH of pure water at 25°C is:",
    options: ["6", "7", "8", "9"],
    answerIndex: 1,
    subject: 'Chemistry',
  },
  {
    id: "q15",
    prompt: "Which element has the highest electronegativity?",
    options: ["Oxygen", "Fluorine", "Nitrogen", "Chlorine"],
    answerIndex: 1,
    subject: 'Chemistry',
  },
];

/** ====== Curved header (three solid layers via huge circles) ====== */
function TopBarDesign() {
  const W = LAYOUT.board.w;
  const H = LAYOUT.headerH;

  const R_TOP = Math.max(W, H) * 1.12;
  const CX_TOP = W * 0.02;
  const CY_TOP = -H * 0.56;

  const R_MID = Math.max(W, H) * 0.8;
  const CX_MID = W * 1.1;
  const CY_MID = H * 0.34;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        width: W,
        height: H,
        backgroundColor: COLORS.base,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        overflow: "hidden",
      }}
    >
      <Svg width={W} height={H} style={StyleSheet.absoluteFill}>
        <Circle cx={CX_MID} cy={CY_MID} r={R_MID} fill={COLORS.mid} />
        <Circle cx={CX_TOP} cy={CY_TOP} r={R_TOP} fill={COLORS.top} />
      </Svg>
    </View>
  );
}

/** ====== Main Screen ====== */
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function MainScreen() {
  const total = QUESTIONS.length;
  const [index, setIndex] = useState(0);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [remaining, setRemaining] = useState(QUESTION_TIME);
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnim = useRef(new Animated.Value(1)).current;

  const q = QUESTIONS[index];
  const selected = answers[q.id] ?? null;
  const hasFeedback = !!feedback[q.id];

  /** timer */
  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [index]);

  const startTimer = () => {
    stopTimer();
    setRemaining(QUESTION_TIME);
    progressAnim.setValue(1);
    const t0 = Date.now();
    timerRef.current = setInterval(() => {
      const el = (Date.now() - t0) / 1000;
      const left = Math.max(0, QUESTION_TIME - el);
      setRemaining(Math.ceil(left));
      progressAnim.setValue(left / QUESTION_TIME);
      if (left <= 0) {
        onNext();
      }
    }, 100);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  /** actions */
  const onSelect = (i: number) => {
    setAnswers((p) => ({ ...p, [q.id]: i }));
    setFeedback((p) => ({ ...p, [q.id]: true }));
  };

  const onNext = () => {
    stopTimer();
    if (index < total - 1) {
      setIndex((i) => i + 1);
    } else {
      // Quiz finished - show results or reset
      alert(`Quiz completed! Score: ${getScore()}/${total}`);
      setIndex(0);
      setAnswers({});
      setFeedback({});
      setBookmarks({});
    }
  };

  const onPrevious = () => {
    if (index > 0) {
      stopTimer();
      setIndex((i) => i - 1);
    }
  };

  const toggleBookmark = () => {
    setBookmarks((p) => ({ ...p, [q.id]: !p[q.id] }));
  };

  const getScore = () => {
    return QUESTIONS.reduce((score, question) => {
      const userAnswer = answers[question.id];
      return score + (userAnswer === question.answerIndex ? 1 : 0);
    }, 0);
  };

  /** colors for each option */
  const getOptionColors = (i: number) => {
    const wasSelected = selected === i;
    const isCorrect = i === q.answerIndex;
    const isWrong = wasSelected && hasFeedback && !isCorrect;

    if (isWrong) {
      return {
        bg: COLORS.red,
        badgeBg: COLORS.white,
        badgeTxt: COLORS.red,
        txt: COLORS.white,
        border: "transparent",
      };
    }
    if (wasSelected && isCorrect) {
      return {
        bg: COLORS.primary,
        badgeBg: COLORS.white,
        badgeTxt: COLORS.primary,
        txt: COLORS.white,
        border: "transparent",
      };
    }
    if (wasSelected) {
      return {
        bg: COLORS.primary,
        badgeBg: COLORS.white,
        badgeTxt: COLORS.primary,
        txt: COLORS.white,
        border: "transparent",
      };
    }
    return {
      bg: COLORS.white,
      badgeBg: COLORS.badgeBlue,
      badgeTxt: COLORS.white,
      txt: COLORS.black,
      border: "rgba(0,0,0,0.04)",
    };
  };

  /** timer ring */
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dash = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.screen}>
      {/* curved header */}
      <TopBarDesign />

      {/* status bar mock */}
      <View style={styles.statusRow}>
        <Text style={styles.statusTime}>9:41</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="cellular" size={16} color="#fff" />
          <Ionicons name="wifi" size={16} color="#fff" />
          <Ionicons name="battery-full" size={18} color="#fff" />
        </View>
      </View>

      {/* timer circle - fixed positioning */}
      <View style={styles.timerWrap}>
        <View style={styles.timerOuter} />
        <Svg width={LAYOUT.timer.w} height={LAYOUT.timer.h} style={StyleSheet.absoluteFillObject}>
          <AnimatedCircle
            cx={39.5}
            cy={39.5}
            r={radius}
            stroke={COLORS.primary}
            strokeWidth={6}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dash}
            strokeLinecap="round"
            transform="rotate(-90 39.5 39.5)"
          />
        </Svg>
        <View style={styles.timerInner}>
          <Text style={styles.timerNum}>{remaining}</Text>
        </View>
      </View>

      {/* question card */}
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.greenTick} />
            <Text style={styles.progressTxt}>{index + 1}/{total}</Text>
            <Text style={styles.subjectTag}>{q.subject}</Text>
          </View>
          <Pressable onPress={toggleBookmark} hitSlop={10}>
            <Ionicons
              name={bookmarks[q.id] ? "star" : "star-outline"}
              size={24}
              color={COLORS.star}
            />
          </Pressable>
        </View>
        <Text style={styles.question}>{q.prompt}</Text>
      </View>

      {/* options */}
      <View style={styles.optionsBox}>
        {q.options.map((opt, i) => {
          const c = getOptionColors(i);
          return (
            <Pressable
              key={i}
              onPress={() => onSelect(i)}
              style={[
                styles.optionRow,
                { backgroundColor: c.bg, borderColor: c.border as string },
              ]}
            >
              <View style={[styles.pill, { backgroundColor: c.badgeBg }]}>
                <Text style={[styles.pillTxt, { color: c.badgeTxt }]}>{ALPHA[i]}</Text>
              </View>
              <Text numberOfLines={2} style={[styles.optText, { color: c.txt }]}>{opt}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* bottom navigation with Previous and Next */}
      <View style={styles.bottomBar}>
        <Pressable 
          onPress={onPrevious} 
          style={[styles.navBtn, { opacity: index === 0 ? 0.5 : 1 }]}
          disabled={index === 0}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.white} />
          <Text style={styles.navTxt}>Previous</Text>
        </Pressable>
        
        <Pressable onPress={onNext} style={styles.navBtn}>
          <Text style={styles.navTxt}>{index === total - 1 ? "Finish" : "Next"}</Text>
          {index !== total - 1 && <Ionicons name="chevron-forward" size={20} color={COLORS.white} />}
        </Pressable>
      </View>
    </View>
  );
}

/** ====== STYLES ====== */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
  },

  statusRow: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    height: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  statusTime: { color: "#fff", fontWeight: "600", fontSize: 16 },

  /* timer - fixed z-index */
  timerWrap: {
    position: "absolute",
    top: LAYOUT.timer.top,
    left: LAYOUT.timer.left,
    width: LAYOUT.timer.w,
    height: LAYOUT.timer.h,
    zIndex: 10,
  },
  timerOuter: {
    position: "absolute",
    width: LAYOUT.timer.w,
    height: LAYOUT.timer.h,
    backgroundColor: COLORS.pageBg,
    borderRadius: LAYOUT.timer.w / 2,
  },
  timerInner: {
    position: "absolute",
    top: 6,
    left: 6,
    width: LAYOUT.timer.w - 12,
    height: LAYOUT.timer.h - 12,
    backgroundColor: COLORS.white,
    borderRadius: (LAYOUT.timer.w - 12) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  timerNum: { color: COLORS.timerNum, fontWeight: "700", fontSize: 22 },

  /* card */
  card: {
    position: "absolute",
    top: LAYOUT.card.top,
    left: LAYOUT.card.left,
    width: LAYOUT.card.w,
    height: LAYOUT.card.h,
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.card.radius,
    shadowColor: COLORS.cardShadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    paddingTop: 12,
    zIndex: 1,
  },
  cardTopRow: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greenTick: {
    width: 18.5,
    height: 18.5,
    backgroundColor: COLORS.green,
    borderRadius: 3,
    marginRight: 8,
  },
  progressTxt: { color: COLORS.green, fontSize: 13, fontWeight: "700", marginRight: 8 },
  subjectTag: { 
    color: COLORS.primary, 
    fontSize: 11, 
    fontWeight: "600",
    backgroundColor: COLORS.pageBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  question: {
    marginTop: 20,
    paddingHorizontal: 16,
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center",
    lineHeight: 28,
  },

  /* options */
  optionsBox: {
    position: "absolute",
    top: LAYOUT.options.top,
    left: LAYOUT.options.left,
    width: LAYOUT.options.width,
  },
  optionRow: {
    height: LAYOUT.options.rowH,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: LAYOUT.options.gap,
    justifyContent: "center",
    paddingLeft: 58,
    paddingRight: 16,
  },
  pill: {
    position: "absolute",
    left: 12,
    width: LAYOUT.options.pill,
    height: LAYOUT.options.pill,
    borderRadius: LAYOUT.options.pill / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  pillTxt: { fontSize: 15, fontWeight: "700" },
  optText: { fontSize: 18, fontWeight: "500", flexWrap: 'wrap' },

  /* bottom navigation */
  bottomBar: {
    position: "absolute",
    left: LAYOUT.bottom.left,
    bottom: LAYOUT.bottom.bottom,
    width: LAYOUT.bottom.width,
    height: LAYOUT.bottom.height,
    flexDirection: 'row',
    gap: 12,
  },
  navBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    gap: 4,
  },
  navTxt: { color: COLORS.white, fontWeight: "700", fontSize: 16 },
});

export default MainScreen;