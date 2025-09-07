import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

const { width: DEVICE_W } = Dimensions.get("window");
const BASE_W = 393;
const scale = (n: any) => (DEVICE_W / BASE_W) * n;

// You must provide these PNGs in assets/images for the icons:
const quizzes = [
  {
    id: "1",
    title: "Quiz 1",
    questions: 20,
    accuracy: 75,
    resume: true,
    icon: require("../assets/images/q1.png"),
    iconBg: "#F4F6FB",
  },
  {
    id: "2",
    title: "Quiz 2",
    questions: 20,
    accuracy: 55,
    resume: true,
    icon: require("../assets/images/q2.png"),
    iconBg: "#F4F6FB",
  },
  {
    id: "3",
    title: "Quiz 3",
    questions: 20,
    accuracy: 67,
    resume: true,
    icon: require("../assets/images/q3.png"),
    iconBg: "#F4F6FB",
  },
  {
    id: "4",
    title: "Quiz 4",
    questions: 20,
    accuracy: null,
    resume: false,
    icon: require("../assets/images/q4.png"),
    iconBg: "#F4F6FB",
  },
  {
    id: "5",
    title: "Quiz 5",
    questions: 20,
    accuracy: null,
    resume: false,
    icon: require("../assets/images/q5.png"),
    iconBg: "#F4F6FB",
  },
  {
    id: "6",
    title: "Quiz 6",
    questions: 20,
    accuracy: null,
    resume: false,
    icon: require("../assets/images/q6.png"),
    iconBg: "#F4F6FB",
  },
];

// HEADER HEIGHT for correct offset
const HEADER_HEIGHT =
  scale(228) + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0);

function HeaderSVG() {
  return (
    <Svg
      width={DEVICE_W}
      height={scale(228)}
      viewBox="0 0 393 228"
      style={{ position: "absolute", top: -scale(8), left: 0 }}
    >
      <Rect
        x="0"
        y="8"
        width="393"
        height="220"
        fill="#2F6CFF"
        rx="30"
        ry="30"
      />
      <Path
        d="M393 -38C393 87.5583 232.236 189.614 0.0007 189.614C0.0007 101.218 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
        fill="#457CFF"
      />
      <Path
        d="M393 -38C393 66.0852 232.236 150.687 0.0007 150.687C0.0007 77.4083 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
        fill="#5A8DFF"
        opacity="0.95"
      />
    </Svg>
  );
}

const QuizCard = ({ item }: { item: any }) => (
  <View style={styles.cardWrapper}>
    <View style={[styles.leftIconBox, { backgroundColor: item.iconBg }]}>
      <Image source={item.icon} style={styles.iconImage} resizeMode="contain" />
    </View>
    <View style={styles.cardText}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: scale(2),
        }}
      >
        <Text style={styles.grayText}>Questions: </Text>
        <Text style={styles.greenText}>{item.questions}</Text>
        <Text style={styles.grayText}>  Accuracy: </Text>
        <Text
          style={item.accuracy !== null ? styles.greenText : styles.grayText}
        >
          {item.accuracy !== null ? `${item.accuracy}%` : "--"}
        </Text>
      </View>
    </View>
    <View style={styles.cardStatusWrapper}>
      <TouchableOpacity>
        <Text
          style={[
            styles.cardTitle,
            item.resume
              ? { color: "#FF6B6B", textAlign: "right" }
              : { color: "#2F6CFF", textAlign: "right" },
          ]}
        >
          {item.resume ? "Resume" : "Start"}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function ChemistryQuizList() {
  const [rulesVisible, setRulesVisible] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <HeaderSVG />
      <View style={styles.headerContent}>
        <View style={styles.breadcrumbRow}>
          <Text style={styles.bcText}>Home</Text>
          <Text style={styles.bcText}> &gt; </Text>
          <Text style={styles.bcText}>Physics</Text>
          <Text style={styles.bcText}> &gt; </Text>
          <Text style={styles.bcText}>Quiz</Text>
        </View>
        <View style={[styles.subjectCard, { marginTop: scale(30) }]}>
          <View style={styles.leftIconBox}>
            <Image
              source={require("../assets/images/MotionPlane.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.subjectTitle}>Motion in Plane</Text>
        </View>
      </View>

      <View style={[styles.body, { marginTop: HEADER_HEIGHT - scale(40) }]}>
        <View style={styles.quizListHeaderRow}>
          <Text style={styles.listTitle}>Quiz list</Text>
          <TouchableOpacity onPress={() => setRulesVisible(true)}>
            <Text style={styles.quizRules}>Quiz Rules</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={quizzes}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <QuizCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Rules Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={rulesVisible}
        onRequestClose={() => setRulesVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPressOut={() => setRulesVisible(false)}
        >
          <View style={styles.rulesDialog}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: scale(7),
              }}
            >
              {/* Icon can be replaced with SVG or an image; for now, use emoji as left icon */}
              <Text style={styles.rulesIcon}>📋</Text>
              <Text style={styles.rulesHeader}>Rules</Text>
            </View>
            <View style={styles.rulesContent}>
              <View style={styles.rulesRow}>
                <View style={styles.dot} />
                <Text style={styles.rulesItem}>
                  Questions must be answered in order.
                </Text>
              </View>
              <View style={styles.rulesRow}>
                <View style={styles.dot} />
                <Text style={styles.rulesItem}>
                  Once an answer is submitted, it can't be changed.
                </Text>
              </View>
              <View style={styles.rulesRow}>
                <View style={styles.dot} />
                <Text style={styles.rulesItem}>
                  Do not refresh or open new tab.
                </Text>
              </View>
              <View style={styles.rulesRow}>
                <View style={styles.dot} />
                <Text style={styles.rulesItem}>Quiz cannot be paused.</Text>
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>
                <Text style={styles.infoBoxBold}>
                  Once you start, you cannot exit until submission.
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#EEF3FF" },
  headerContent: {
    position: "absolute",
    left: scale(16),
    right: scale(16),
    top:
      Platform.OS === "android"
        ? (StatusBar.currentHeight || 0) + scale(12)
        : scale(12),
  },
  breadcrumbRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(35),
  },
  bcText: { color: "#FFF", fontSize: scale(13.6), fontWeight: "400" },
  subjectCard: {
    width: "100%",
    height: scale(65),
    borderRadius: scale(10),
    backgroundColor: "rgba(255,255,255,0.64)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(12),
  },
  subjectTitle: {
    fontSize: scale(19.3),
    color: "#000",
    fontWeight: "400",
    marginLeft: scale(14),
  },

  body: { flex: 1, paddingHorizontal: scale(18) },
  listTitle: { fontSize: scale(18.3), color: "#000", marginBottom: 0 },
  listContent: { paddingBottom: scale(40) },

  quizListHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scale(12),
    marginTop: 0,
  },
  quizRules: {
    color: "#2F6CFF",
    fontSize: scale(13),
    fontWeight: "400",
  },

  cardWrapper: {
    width: "100%",
    height: scale(70),
    borderRadius: scale(10),
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(12),
    marginBottom: scale(12),
  },
  leftIconBox: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6FB",
    marginRight: scale(14),
  },
  iconImage: { width: scale(34), height: scale(34) },

  cardText: { flex: 1, justifyContent: "center" },
  cardTitle: { fontSize: scale(15), color: "#000", fontWeight: "400" },
  grayText: { color: "#888A93", fontSize: scale(11) },
  greenText: { color: "#10B981", fontSize: scale(11) },
  cardStatusWrapper: {
    width: scale(72),
    alignItems: "flex-end",
    justifyContent: "center",
  },

  // Modal overlay and dialog box
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(44,79,143,0.22)",
    justifyContent: "center",
    alignItems: "center",
  },
  rulesDialog: {
    width: "87%",
    backgroundColor: "#fff",
    borderRadius: scale(16),
    paddingVertical: scale(26),
    paddingHorizontal: scale(20),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    elevation: 6,
    alignItems: "flex-start",
    minHeight: scale(260),
  },
  rulesHeader: {
    fontSize: scale(17.5),
    color: "#2F6CFF",
    fontWeight: "600",
    marginLeft: scale(8),
    marginBottom: 0,
  },
  rulesIcon: {
    fontSize: scale(22),
    color: "#2F6CFF",
    fontWeight: "500",
  },
  rulesContent: {
    width: "100%",
    marginBottom: scale(17),
    marginTop: scale(5),
  },
  rulesRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: scale(8),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: "#2F6CFF",
    marginTop: scale(6),
    marginRight: scale(8),
  },
  rulesItem: {
    fontSize: scale(14.5),
    color: "#121212",
    fontWeight: "400",
    flex: 1,
    lineHeight: scale(22),
  },
  infoBox: {
    backgroundColor: "#FAF7F2",
    borderColor: "#FFD792",
    borderWidth: 1.1,
    borderRadius: scale(9),
    paddingVertical: scale(12),
    paddingHorizontal: scale(12),
    width: "100%",
    alignSelf: "center",
    marginTop: scale(10),
  },
  infoBoxText: {
    color: "#B66C00",
    fontSize: scale(14.2),
    textAlign: "left",
    fontWeight: "400",
  },
  infoBoxBold: {
    fontWeight: "600",
    color: "#B66C00",
  },
});
