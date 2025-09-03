import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Main/Home screen */}
      <Stack.Screen name="index" />
      {/* Removed: leaderboard screen */}
    </Stack>
  );
}
