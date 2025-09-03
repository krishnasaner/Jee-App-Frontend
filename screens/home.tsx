import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import * as Progress from "react-native-progress";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  SharedValue,
} from "react-native-reanimated";

// Screen sizes + tab width
const { width: screenWidth } = Dimensions.get("window");
const TAB_COUNT = 4;
const tabWidth = screenWidth / TAB_COUNT;

// No longer need animated path since we removed the curved SVG

// ===== Gradient SVG Header =====
const HeaderSVG = () => (
  <Svg width="100%" height={180} viewBox="0 0 393 180" fill="none">
    <Path d="M0 -38H393V143C393 156.807 381.807 168 368 168H25C11.1929 168 0 156.807 0 143V-38Z" fill="#1E5EFF" />
    <Path d="M393 -38C393 60 232.236 129 0.0007 129C0.0007 69 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z" fill="#3D78FF" />
    <Path d="M393 -38C393 40 232.236 100 0.0007 100C0.0007 50 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z" fill="#4F8AFF" />
  </Svg>
);

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("home");

  // Icon pop-up animation values
  const homeTabValue = useSharedValue(0);
  const timerTabValue = useSharedValue(0);
  const statsTabValue = useSharedValue(0);
  const profileTabValue = useSharedValue(0);

  // Position (0..3) used to draw the curve (dent) under the active icon
  const activeTabPosition = useSharedValue(0);

  // Init first tab
  useEffect(() => {
    homeTabValue.value = 1;
    activeTabPosition.value = 0;
  }, []);

  // Reusable icon animation (pop up + scale)
  const makeIconAnim = (val: SharedValue<number>) =>
    useAnimatedStyle(() => ({
      transform: [
        { translateY: interpolate(val.value, [0, 1], [0, -18]) },
        { scale: interpolate(val.value, [0, 1], [1, 1.25]) },
      ],
    }));

  const homeAnimatedStyle = makeIconAnim(homeTabValue);
  const timerAnimatedStyle = makeIconAnim(timerTabValue);
  const statsAnimatedStyle = makeIconAnim(statsTabValue);
  const profileAnimatedStyle = makeIconAnim(profileTabValue);

  // We no longer need the animated SVG path since we removed the curved bar

  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);

    // Reset all icons
    homeTabValue.value = withTiming(0, { duration: 150 });
    timerTabValue.value = withTiming(0, { duration: 150 });
    statsTabValue.value = withTiming(0, { duration: 150 });
    profileTabValue.value = withTiming(0, { duration: 150 });

    // Pop the selected one + move the curve with a spring bounce
    const springCfg = { damping: 12, stiffness: 140, mass: 0.8 };
    if (tab === "home") {
      homeTabValue.value = withSpring(1, springCfg);
      activeTabPosition.value = withSpring(0, springCfg);
    } else if (tab === "timer") {
      timerTabValue.value = withSpring(1, springCfg);
      activeTabPosition.value = withSpring(1, springCfg);
    } else if (tab === "stats") {
      statsTabValue.value = withSpring(1, springCfg);
      activeTabPosition.value = withSpring(2, springCfg);
    } else if (tab === "profile") {
      profileTabValue.value = withSpring(1, springCfg);
      activeTabPosition.value = withSpring(3, springCfg);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E5EFF" />

      {/* ===== Header ===== */}
      <View style={styles.header}>
        <HeaderSVG />
        <View style={styles.headerContent}>
          <Text style={styles.appTitle}>JEE APP</Text>

          <View style={styles.userCard}>
            <View style={styles.userAvatar}>
              <Ionicons name="person" size={24} color="#1E5EFF" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.userName}>Hi, John</Text>
              <Text style={styles.readyText}>You are ready for jee 85%</Text>
              <Progress.Bar progress={0.85} width={null} height={8} color="#FFD700" borderWidth={0} style={{ marginTop: 6 }} />
            </View>
          </View>
        </View>
      </View>

      {/* ===== Features Row ===== */}
      <View style={styles.featuresRow}>
        <TouchableOpacity style={styles.feature}>
          <View style={styles.featureIconContainer}>
            <MaterialIcons name="bookmark-outline" size={28} color="#000" />
          </View>
          <Text style={styles.featureText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feature}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="time-outline" size={28} color="#000" />
          </View>
          <Text style={styles.featureText}>Feature</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feature}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="settings-outline" size={28} color="#000" />
          </View>
          <Text style={styles.featureText}>Feature</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feature}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="star-outline" size={28} color="#000" />
          </View>
          <Text style={styles.featureText}>Feature</Text>
        </TouchableOpacity>
      </View>

      {/* ===== Subjects ===== */}
      <ScrollView 
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Subjects</Text>

        {/* PHYSICS */}
        <View style={styles.subjectCard}>
          <View style={styles.subjectIconContainer}>
            <Image source={require("../assets/icon/headerpy.png")} style={styles.subjectIcon} resizeMode="contain" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.subjectName}>PHYSICS</Text>
            <Progress.Bar progress={0.77} width={null} height={7} color="#1E5EFF" borderWidth={0} />
          </View>
          <TouchableOpacity>
            <Text style={[styles.accuracy, { color: "#000105ff" }]}>Accuracy 55%</Text>
          </TouchableOpacity>
        </View>

        {/* Chemistry */}
        <View style={styles.subjectCard}>
          <View style={styles.subjectIconContainer}>
            <Image source={require("../assets/icon/chemistry.png")} style={styles.subjectIcon} resizeMode="contain" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.subjectName}>CHEMISTRY</Text>
            <Progress.Bar progress={0.77} width={null} height={7} color="#1E5EFF" borderWidth={0} />
          </View>
          <TouchableOpacity>
            <Text style={[styles.accuracy, { color: "#000105ff" }]}>Accuracy 77%</Text>
          </TouchableOpacity>
        </View>

        {/* Maths */}
        <View style={styles.subjectCard}>
          <View style={styles.subjectIconContainer}>
            <Image source={require("../assets/icon/maths.png")} style={styles.subjectIcon} resizeMode="contain" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.subjectName}>MATHS</Text>
            <Progress.Bar progress={0.65} width={null} height={7} color="#1E5EFF" borderWidth={0} />
          </View>
          <TouchableOpacity>
            <Text style={[styles.accuracy, { color: "#000105ff" }]}>Accuracy 65%</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ===== Bottom Navigation (fixed) ===== */}
      <View style={styles.bottomNavContainer}>
        {/* Tappable icons */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => handleTabPress("home")} style={styles.tabButton}>
            <Animated.View style={[styles.navItem, homeAnimatedStyle]}>
              <Ionicons name="home" size={28} color="#ded8ecff" />
              <Text style={styles.navText}>Home</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress("timer")} style={styles.tabButton}>
            <Animated.View style={[styles.navItem, timerAnimatedStyle]}>
              <Ionicons name="time-outline" size={28} color="#ded8ecff" />
              <Text style={styles.navText}>Timer</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress("stats")} style={styles.tabButton}>
            <Animated.View style={[styles.navItem, statsAnimatedStyle]}>
              <Ionicons name="stats-chart-outline" size={28} color="#ded8ecff" />
              <Text style={styles.navText}>LeaderBoard</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress("profile")} style={styles.tabButton}>
            <Animated.View style={[styles.navItem, profileAnimatedStyle]}>
              <Ionicons name="person-outline" size={28} color="#ded8ecff" />
              <Text style={styles.navText}>Account</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FF" },
  header: { position: "relative" },
  headerContent: { position: "absolute", top: 40, left: 15, right: 15 },
  appTitle: { color: "white", fontSize: 18, marginBottom: 8, fontWeight: "600" },
  userCard: { flexDirection: "row", alignItems: "center", padding: 8, marginTop: 8 },
  userAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "white", justifyContent: "center", alignItems: "center" },
  userName: { fontSize: 16, fontWeight: "bold", color: "white" },
  readyText: { fontSize: 12, color: "white", marginTop: 0 },
  featuresRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 8, paddingHorizontal: 10 },
  feature: { alignItems: "center", justifyContent: "center" },
  featureIconContainer: {
    width: 55, height: 55, borderRadius: 27.5, backgroundColor: "white",
    justifyContent: "center", alignItems: "center", marginBottom: 2,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2,
  },
  featureText: { fontSize: 11, marginTop: 2 },
  body: { padding: 10, paddingBottom: 60 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  subjectCard: {
    backgroundColor: "white", borderRadius: 12, padding: 10, marginBottom: 8,
    flexDirection: "row", alignItems: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  subjectIconContainer: {
    width: 45, height: 45, borderRadius: 22.5, backgroundColor: "#FFFFFF",
    justifyContent: "center", alignItems: "center", marginRight: 8,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2,
  },
  subjectIcon: { width: 35, height: 35 },
  subjectName: { fontSize: 15, fontWeight: "600", marginBottom: 4 },
  accuracy: { fontSize: 12, fontWeight: "500", marginLeft: 4 },
  bottomNavContainer: { position: "absolute", bottom: 0, left: 0, right: 0, height: 70, backgroundColor: "#1E5EFF" },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", height: 50 },
  tabButton: { flex: 1, alignItems: "center", justifyContent: "center" },
  navItem: { alignItems: "center", justifyContent: "center", paddingHorizontal: 8 },
  navText: { fontSize: 10, color: "white", marginTop: 2, fontWeight: "500" },
});
