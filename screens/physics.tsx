
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import Svg, { Path } from "react-native-svg";

// ===== Gradient Header SVG =====
const HeaderSVG = () => (
  <Svg width="100%" height={240} viewBox="0 0 393 240" fill="none">
    <Path
      d="M0 -38H393V203C393 216.807 381.807 228 368 228H25C11.1929 228 0 216.807 0 203V-38Z"
      fill="#2F6CFF"
    />
    <Path
      d="M393 -38C393 87.5583 232.236 189.614 0.000732422 189.614C0.000732422 101.218 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
      fill="#457CFF"
    />
    <Path
      d="M393 -38C393 66.0852 232.236 150.687 0.000732422 150.687C0.000732422 77.4083 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
      fill="#5A8DFF"
    />
  </Svg>
);

const chapters = [
  {
    id: 1,
    title: "Units and Measurements",
    progress: 0.75,
    icon: require("@/assets/icon/chap1.png"),
  },
  {
    id: 2,
    title: "Motion in a Straight Line",
    icon: require("@/assets/icon/chap2.png"),
  },
  {
    id: 3,
    title: "Motion in a Plane",
    icon: require("@/assets/icon/chap3.png"),
  },
  {
    id: 4,
    title: "Laws of Motion",
    icon: require("@/assets/icon/chap4.png"),
  },
  {
    id: 5,
    title: "Work, Energy and Power",
    icon: require("@/assets/icon/chap5.png"),
  },
  {
    id: 6,
    title: "System of Particles and Rotational..",
    icon: require("@/assets/icon/chap6.png"),
  },
  {
    id: 7,
    title: "Gravitation",
    icon: require("@/assets/icon/chap7.png"),
  },
];

export default function PhysicsScreen() {
  return (
    <View style={styles.container}>
      {/* Header Background */}
      <View style={styles.header}>
        <HeaderSVG />
        <Text style={styles.breadcrumb}>Home &gt; Physics</Text>
        <View style={styles.headerCard}>
          <Image source={require("@/assets/images/headerpy.png")} style={styles.headerImage} />
          <Text style={styles.headerText}>Physics</Text>
        </View>
      </View>

      {/* Chapters List */}
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionTitle}>Physics chapter's</Text>

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
    top: 40,
    left: 20,
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  headerCard: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  body: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardIcon: {
    width: 34,
    height: 34,
    marginRight: 12,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  tapToBegin: {
    fontSize: 13,
    color: "#2F6CFF",
  },
  progressText: {
    fontSize: 13,
    color: "#2F6CFF",
    marginTop: 4,
  },
});
