import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

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

export default function StaredScreen() {
  const [selectedTab, setSelectedTab] = useState("Physics");

const chapters = [
  {
    id: 1,
    title: "Units and Measurements",
    progress: 0.75,
    icon: require("../assets/icon/chap1.png"),
  },
  {
    id: 2,
    title: "Motion in a Straight Line",
    icon: require("../assets/icon/chap2.png"),
  },
  {
    id: 3,
    title: "Motion in a Plane",
    icon: require("../assets/icon/chap3.png"),
  },
  {
    id: 4,
    title: "Laws of Motion",
    icon: require("../assets/icon/chap4.png"),
  },
  {
    id: 5,
    title: "Work, Energy and Power",
    icon: require("../assets/icon/chap5.png"),
  },
  {
    id: 6,
    title: "System of Particles and Rotational..",
    icon: require("../assets/icon/chap6.png"),
  },
  {
    id: 7,
    title: "Gravitation",
    icon: require("../assets/icon/chap7.png"),
  },
];


  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Header */}
      <View style={styles.headerContainer}>
        <HeaderSVG />
        <View style={styles.headerContent}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.headerText}>Stared</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Physics", "Chemistry", "Maths"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <ScrollView style={{ marginTop: 10 }}>
        <Text style={styles.sectionTitle}>{selectedTab} chapter's</Text>

        {chapters.map((chapter) => (
          <TouchableOpacity key={chapter.id} style={styles.card}>
              <View style={styles.iconWrapper}>
                <Image source={chapter.icon} style={{width: 28, height: 28}} />
              </View>
              <View>
                <Text style={styles.cardTitle}>
                  {chapter.id}. {chapter.title}
                </Text>
                <Text style={styles.cardSubtitle}>No of question xx</Text>
              </View>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  headerContainer: {
    position: "relative",
    height: 160,
  },
  headerContent: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginLeft: 10,
    textAlign:"justify"
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#e0e7ff",
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: -40, // overlaps nicely with header
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#2563eb",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  activeTabText: {
    color: "white",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  iconWrapper: {
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#4581fbff",
    marginTop: 2,
  },
});
