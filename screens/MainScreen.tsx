import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

/** ====== COLORS ====== */
const COLORS = {
  pageBg: "#EEF3FF",
  white: "#FFFFFF",
  black: "#000000",
  base: "#477bebff",
  mid: "#2160f5ff",
  top: "#2e6ef7ff",
  primary: "#1D4ED8",
  badgeBlue: "#457CFF",
  timerNum: "#1F54DE",
  green: "#10B981",
  red: "#FF6B6B",
  star: "#FFC107",
  cardShadow: "rgba(0,0,0,0.05)",
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const LAYOUT = {
  headerH: screenHeight * 0.31,
  circle: { size: 79, top: screenHeight * 0.16, left: (screenWidth - 79) / 2 },
  card: { w: screenWidth - 36, h: 181, left: 18, top: screenHeight * 0.205, radius: 12 },
  options: { top: screenHeight * 0.465, left: 18, width: screenWidth - 36, rowH: 66, gap: 16, pill: 32 },
  bottom: { left: 18, width: screenWidth - 40, height: 52, bottom: 28 },
};

const ALPHA = ["A", "B", "C", "D"];

type Question = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
};

const QUESTIONS: Question[] = [
  { id: "q1", prompt: "Which physical quantity is measured in newton (N)?", options: ["Energy", "Force", "Power", "Pressure"], answerIndex: 1 },
  { id: "q2", prompt: "The SI unit of electric current is:", options: ["Volt", "Ampere", "Ohm", "Watt"], answerIndex: 1 },
  { id: "q3", prompt: "What is the speed of light in vacuum?", options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10¹² m/s"], answerIndex: 1 },
  { id: "q4", prompt: "Which law states F = ma?", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"], answerIndex: 1 },
  { id: "q5", prompt: "The unit of frequency is:", options: ["Hertz", "Joule", "Watt", "Pascal"], answerIndex: 0 },
  { id: "q6", prompt: "sin²θ + cos²θ equals:", options: ["0", "1", "2", "tan²θ"], answerIndex: 1 },
  { id: "q7", prompt: "What is the derivative of x²?", options: ["x", "2x", "x²/2", "2x²"], answerIndex: 1 },
  { id: "q8", prompt: "The value of π is approximately:", options: ["3.14159", "2.71828", "1.41421", "1.61803"], answerIndex: 0 },
  { id: "q9", prompt: "What is log₁₀(100)?", options: ["1", "2", "10", "100"], answerIndex: 1 },
  { id: "q10", prompt: "The square root of 144 is:", options: ["11", "12", "13", "14"], answerIndex: 1 },
  { id: "q11", prompt: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answerIndex: 2 },
  { id: "q12", prompt: "The atomic number of carbon is:", options: ["4", "6", "8", "12"], answerIndex: 1 },
  { id: "q13", prompt: "Which gas makes up about 78% of Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], answerIndex: 1 },
  { id: "q14", prompt: "The pH of pure water at 25°C is:", options: ["6", "7", "8", "9"], answerIndex: 1 },
  { id: "q15", prompt: "Which element has the highest electronegativity?", options: ["Oxygen", "Fluorine", "Nitrogen", "Chlorine"], answerIndex: 1 },
];

function TopBarDesign() {
  const W = screenWidth;
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

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function MainScreen() {
  const total = QUESTIONS.length;
  const [index, setIndex] = useState<number>(0);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const revealTimerRef = useRef<any>(null);

  const optionSelected = answers[QUESTIONS[index].id] != null;

  const progressAnim = useRef(new Animated.Value(0)).current;

  const correctCount = QUESTIONS.reduce((acc, q) => {
    const ans = answers[q.id];
    if (ans != null && revealed[q.id] && ans === q.answerIndex) return acc + 1;
    return acc;
  }, 0);

  const attemptedCount = Object.values(answers).filter((v) => v !== null).length;

  useEffect(() => {
    const target = total > 0 ? correctCount / total : 0;
    Animated.timing(progressAnim, { toValue: target, duration: 350, useNativeDriver: false }).start();
  }, [correctCount, total, progressAnim]);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);

  const q = QUESTIONS[index];
  const selected = answers[q.id] ?? null;
  const isRevealed = !!revealed[q.id];

  const onSelect = (i: number) => {
    if (revealed[q.id]) return;
    setAnswers((p) => ({ ...p, [q.id]: i }));

    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    revealTimerRef.current = setTimeout(() => {
      setRevealed((p) => ({ ...p, [q.id]: true }));
      revealTimerRef.current = null;
    }, 700);
  };

  const onNext = () => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (index < total - 1) {
      setIndex((i) => i + 1);
    } else {
      alert(`Quiz completed! Score: ${getScore()} / ${total}`);
      setIndex(0);
      setAnswers({});
      setRevealed({});
      setBookmarks({});
    }
  };

  const onPrevious = () => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (index > 0) setIndex((i) => i - 1);
  };

  const toggleBookmark = () => setBookmarks((p) => ({ ...p, [q.id]: !p[q.id] }));

  const getScore = () =>
    QUESTIONS.reduce((score, question) => {
      const userAnswer = answers[question.id];
      return score + (userAnswer === question.answerIndex ? 1 : 0);
    }, 0);

  const getOptionColors = (i: number) => {
    const wasSelected = selected === i;
    if (!isRevealed) {
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
    }
    if (wasSelected) {
      if (selected === q.answerIndex) {
        return {
          bg: COLORS.primary,
          badgeBg: COLORS.white,
          badgeTxt: COLORS.primary,
          txt: COLORS.white,
          border: "transparent",
        };
      } else {
        return {
          bg: COLORS.red,
          badgeBg: COLORS.white,
          badgeTxt: COLORS.red,
          txt: COLORS.white,
          border: "transparent",
        };
      }
    }
    return {
      bg: COLORS.white,
      badgeBg: COLORS.badgeBlue,
      badgeTxt: COLORS.white,
      txt: COLORS.black,
      border: "rgba(0,0,0,0.04)",
    };
  };

  const radius = 34;

  // ===== CHANGED CIRCLE PART =====
  const strokeWidth = 10; // thicker blue border
  const adjustedRadius = (LAYOUT.circle.size - strokeWidth) / 2; // radius inside the SVG
  const innerCircleSize = LAYOUT.circle.size - strokeWidth; 
  return (
    <View style={styles.screen}>
      <TopBarDesign />

      {/* progress circle / question number */}
      <View style={[styles.circleWrap, { zIndex: 30 }]}>
        <Svg width={LAYOUT.circle.size} height={LAYOUT.circle.size} style={StyleSheet.absoluteFill}>
          {/* White inner ring */}
          <Circle
            cx={LAYOUT.circle.size / 2}
            cy={LAYOUT.circle.size / 2}
            r={adjustedRadius}
            stroke={COLORS.mid} // solid blue
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Blue border */}
          <Circle
            cx={LAYOUT.circle.size / 2}
            cy={LAYOUT.circle.size / 2}
            r={adjustedRadius - strokeWidth / 2}
            stroke={COLORS.white}
            strokeWidth={2} // thin white ring
            fill="none"
          />
        </Svg>

        <View
          style={{
            position: "absolute",
            width: innerCircleSize,
            height: innerCircleSize,
            borderRadius: innerCircleSize / 2,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
        <View style={styles.circleInner}>
          <Text style={styles.circleNum}>{index + 1}</Text>
        </View>
      </View>


      {/* question card */}
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.greenTick}>
              <Ionicons name="checkmark" size={14} color={COLORS.white} />
            </View>
            <Text style={styles.progressTxt}>
              {attemptedCount} / {total}
            </Text>
          </View>
          <Pressable onPress={toggleBookmark} hitSlop={10}>
            <Ionicons name={bookmarks[q.id] ? "star" : "star-outline"} size={24} color={COLORS.star} />
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
              disabled={!!revealed[q.id]}
              style={[styles.optionRow, { backgroundColor: c.bg, borderColor: c.border as string }]}
            >
              <View style={[styles.pill, { backgroundColor: c.badgeBg }]}>
                <Text style={[styles.pillTxt, { color: c.badgeTxt }]}>{ALPHA[i]}</Text>
              </View>
              <Text numberOfLines={2} style={[styles.optText, { color: c.txt }]}>
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* ==== BOTTOM BUTTONS ==== */}
      {!optionSelected ? (
        // Previous & Skip half-half split
        <View style={styles.bottomHalfBar}>
          <Pressable
            onPress={onPrevious}
            style={[
              styles.navBtnOutlineHalf,
              { marginRight: 7, opacity: index === 0 ? 0.5 : 1 },
            ]}
            disabled={index === 0}
          >
            <Text style={styles.navTxtOutlineHalf}>Previous</Text>
          </Pressable>
          <Pressable
            onPress={onNext}
            style={styles.navBtnSolidHalf}
          >
            <Text style={styles.navTxtSolidHalf}>Skip</Text>
          </Pressable>
        </View>
      ) : (
        // Next/Finish, full width
        <View style={styles.bottomFullBar}>
          <Pressable
            onPress={onNext}
            style={styles.navBtnSolidFull}
          >
            <Text style={styles.navTxtSolidFull}>
              {index === total - 1 ? "Finish" : "Next"}
            </Text>
            <Ionicons name="chevron-forward" size={22} color={COLORS.white} style={{ marginLeft: 6 }} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.pageBg },
  circleWrap: {
    position: "absolute",
    top: LAYOUT.circle.top,
    left: LAYOUT.circle.left,
    width: LAYOUT.circle.size,
    height: LAYOUT.circle.size,
    alignItems: "center",
    justifyContent: "center",
  },
  circleInner: {
    position: "absolute",
    width: LAYOUT.circle.size - 12,
    height: LAYOUT.circle.size - 12,
    borderRadius: (LAYOUT.circle.size - 12) / 2,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  circleNum: { fontSize: 20, fontWeight: "700", color: COLORS.mid },
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
    elevation: 4,
    paddingTop: 12,
    zIndex: 10,
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
    borderRadius: 1.5,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  progressTxt: {
    fontWeight: "700", 
    fontSize: 14,
    color: COLORS.primary,
  },
  question: {
    marginTop: 14,
    fontWeight: "600",
    fontSize: 20,
    paddingHorizontal: 24,
    color: COLORS.black,
  },
  optionsBox: {
    position: "absolute",
    top: LAYOUT.options.top,
    left: LAYOUT.options.left,
    width: LAYOUT.options.width,
    zIndex: 15,
  },
  optionRow: {
    height: LAYOUT.options.rowH,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: LAYOUT.options.gap,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  pill: {
    width: LAYOUT.options.pill,
    height: LAYOUT.options.pill,
    borderRadius: LAYOUT.options.pill / 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  pillTxt: {
    fontWeight: "700",
    fontSize: 16,
  },
  optText: {
    fontWeight: "600",
    fontSize: 16,
    flexShrink: 1,
  },

  // BOTTOM NAVIGATION
  bottomHalfBar: {
    position: "absolute",
    bottom: LAYOUT.bottom.bottom,
    left: LAYOUT.bottom.left,
    width: LAYOUT.bottom.width,
    height: LAYOUT.bottom.height,
    flexDirection: "row",
    alignItems: "center",
  },
  navBtnOutlineHalf: {
    flex: 1,
    height: LAYOUT.bottom.height,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  navTxtOutlineHalf: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
  },
  navBtnSolidHalf: {
    flex: 1,
    height: LAYOUT.bottom.height,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  navTxtSolidHalf: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  bottomFullBar: {
    position: "absolute",
    bottom: LAYOUT.bottom.bottom,
    left: LAYOUT.bottom.left,
    width: LAYOUT.bottom.width,
    height: LAYOUT.bottom.height,
  },
  navBtnSolidFull: {
    flex: 1,
    height: LAYOUT.bottom.height,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navTxtSolidFull: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
