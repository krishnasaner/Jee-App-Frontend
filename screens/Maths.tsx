import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import * as Progress from "react-native-progress";

// ===== Gradient Header SVG =====
const HeaderSVG = () => (
  <Svg width="100%" height={200} viewBox="0 0 393 200" fill="none">
    <Path
      d="M0 -38H393V163C393 176.807 381.807 188 368 188H25C11.1929 188 0 176.807 0 163V-38Z"
      fill="#2F6CFF"
    />
    <Path
      d="M393 -38C393 67.5583 232.236 159.614 0.000732422 159.614C0.000732422 81.218 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
      fill="#457CFF"
    />
    <Path
      d="M393 -38C393 56.0852 232.236 130.687 0.000732422 130.687C0.000732422 67.4083 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
      fill="#5A8DFF"
    />
  </Svg>
);

const chapters = [
  {
    id: 1,
    title: "Sets",
    progress: 0.75,
    icon: require("../assets/icon/icon (8).png"),
  },
  {
    id: 2,
    title: "Relation and Functions",
    icon: require("../assets/icon/icon (1).png"),
  },
  {
    id: 3,
    title: "Trignometric Function",
    icon: require("../assets/icon/icon (2).png"),
  },
  {
    id: 4,
    title: "Principal Of Mathematical Induction",
    icon: require("../assets/icon/icon (3).png"),
  },
  {
    id: 5,
    title: "Complex Number and Quadritic Equation",
    icon: require("../assets/icon/icon (4).png"),
  },
  {
    id: 6,
    title: "Linear inequilities",
    icon: require("../assets/icon/icon (5).png"),
  },
  {
    id: 7,
    title: "Permutation and Combination",
    icon: require("../assets/icon/icon (6).png"),
  },
];

export default function mathsScreen() {
  return (
    <View style={styles.container}>
      {/* Header Background */}
      <View style={styles.header}>
        <HeaderSVG />
        <Text style={styles.breadcrumb}>Home &gt; Maths</Text>
        <View style={styles.headerCard}>
          <Image source={require("../assets/icon/mathslogo.png")} style={styles.headerImage} />
          <Text style={styles.headerText}>Maths</Text>
        </View>
      </View>

      {/* Chapters List */}
      <ScrollView 
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Maths chapter's</Text>

        {chapters.map((chapter) => (
          <TouchableOpacity key={chapter.id} style={styles.card}>
            <Image source={chapter.icon} style={styles.cardIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                {chapter.id}. {chapter.title}
              </Text>
              {chapter.progress ? (
                <View style={{ marginTop: 6 }}>
                  <Progress.Bar
                    progress={chapter.progress}
                    width={null}
                    height={6}
                    color="#2F6CFF"
                    borderWidth={0}
                  />
                  <Text style={styles.progressText}>
                    {Math.round(chapter.progress * 100)}% Completed
                  </Text>
                </View>
              ) : (
                <Text style={styles.tapToBegin}>Tap to Begin</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ===== Styles =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FF",
  },
  header: {
    position: "relative",
  },
  breadcrumb: {
    position: "absolute",
    top: 30,
    left: 16,
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  headerCard: {
    position: "absolute",
    top: 65,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerImage: {
    width: 36,
    height: 36,
    marginRight: 10,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  body: {
    padding: 12,
    paddingTop: 8,
    paddingBottom: 60,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
  },
  tapToBegin: {
    fontSize: 12,
    color: "#2F6CFF",
  },
  progressText: {
    fontSize: 12,
    color: "#2F6CFF",
    marginTop: 3,
  },
});
