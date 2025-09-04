// app/explore.tsx or screens/Explore.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

const Explore: React.FC = () => {
  const [userStats] = useState<StatCard[]>([
    { title: 'Quizzes Completed', value: '24', icon: '✅', color: '#4CAF50' },
    { title: 'Average Score', value: '78%', icon: '📊', color: '#2196F3' },
    { title: 'Time Spent', value: '12h 30m', icon: '⏰', color: '#FF9800' },
    { title: 'Streak', value: '7 days', icon: '🔥', color: '#F44336' },
  ]);

  const quickActions: QuickAction[] = [
    {
      title: 'Math Practice',
      description: 'Sharpen your mathematical skills',
      icon: '🧮',
      route: '/MathsQuizList',
      color: '#FF9500',
    },
    {
      title: 'Physics Lab',
      description: 'Explore the laws of physics',
      icon: '⚛️',
      route: '/PhysicsQuizList',
      color: '#34C759',
    },
    {
      title: 'Chemistry Reactions',
      description: 'Discover chemical properties',
      icon: '🧪',
      route: '/ChemistryQuizList',
      color: '#AF52DE',
    },
    {
      title: 'Random Quiz',
      description: 'Test yourself with mixed topics',
      icon: '🎲',
      route: '/QuizScreen',
      color: '#007AFF',
    },
  ];

  const achievements = [
    { title: 'First Quiz Master', description: 'Completed your first quiz', icon: '🏆', unlocked: true },
    { title: 'Math Wizard', description: 'Scored 90+ in 5 math quizzes', icon: '🧙‍♂️', unlocked: true },
    { title: 'Science Explorer', description: 'Try all three subjects', icon: '🔬', unlocked: false },
    { title: 'Perfect Score', description: 'Get 100% in any quiz', icon: '💯', unlocked: false },
  ];

  const handleQuickAction = (route: string) => {
    router.push(route as any);
  };

  const renderStatCard = (stat: StatCard, index: number) => (
    <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
      <Text style={styles.statIcon}>{stat.icon}</Text>
      <View style={styles.statInfo}>
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statTitle}>{stat.title}</Text>
      </View>
    </View>
  );

  const renderQuickAction = (action: QuickAction, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.actionCard, { backgroundColor: action.color + '15' }]}
      onPress={() => handleQuickAction(action.route)}
    >
      <Text style={styles.actionIcon}>{action.icon}</Text>
      <View style={styles.actionInfo}>
        <Text style={[styles.actionTitle, { color: action.color }]}>{action.title}</Text>
        <Text style={styles.actionDescription}>{action.description}</Text>
      </View>
      <Text style={[styles.actionArrow, { color: action.color }]}>›</Text>
    </TouchableOpacity>
  );

  const renderAchievement = (achievement: any, index: number) => (
    <View key={index} style={[styles.achievementCard, !achievement.unlocked && styles.lockedAchievement]}>
      <Text style={[styles.achievementIcon, !achievement.unlocked && styles.lockedIcon]}>
        {achievement.icon}
      </Text>
      <View style={styles.achievementInfo}>
        <Text style={[styles.achievementTitle, !achievement.unlocked && styles.lockedText]}>
          {achievement.title}
        </Text>
        <Text style={[styles.achievementDescription, !achievement.unlocked && styles.lockedText]}>
          {achievement.description}
        </Text>
      </View>
      {achievement.unlocked && <Text style={styles.unlockedBadge}>✓</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore & Progress</Text>
          <Text style={styles.headerSubtitle}>Track your learning journey</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            {userStats.map((stat, index) => renderStatCard(stat, index))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {quickActions.map((action, index) => renderQuickAction(action, index))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements.map((achievement, index) => renderAchievement(achievement, index))}
        </View>

        {/* Study Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Study Tips</Text>
          <View style={styles.tipsCard}>
            <Text style={styles.tipTitle}>💡 Pro Tip</Text>
            <Text style={styles.tipText}>
              Take regular breaks between quizzes to improve retention. The spacing effect helps consolidate knowledge!
            </Text>
          </View>
        </View>

        {/* Footer Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 50) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionArrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedAchievement: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
  },
  lockedText: {
    color: '#999',
  },
  unlockedBadge: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  tipsCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});

export default Explore;