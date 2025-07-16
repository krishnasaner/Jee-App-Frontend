import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('Daily');
  
  // Sample data - replace with your actual data
  const leaderboardData = {
    topThree: [
      { name: 'Rahul', score: 2847, position: 2, initial: 'R' },
      { name: 'Arjun', score: 3245, position: 1, initial: 'A' },
      { name: 'Priya', score: 2245, position: 3, initial: 'P' }
    ],
    remaining: [
      { name: 'Name 1', score: 1956, position: 4, initial: 'A', xpToTop: 678 },
      { name: 'Name 2', score: 1856, position: 5, initial: 'A', xpToTop: 678 },
      { name: 'Name 3', score: 1756, position: 6, initial: 'A', xpToTop: 678 },
      { name: 'Name 4', score: 1656, position: 7, initial: 'A', xpToTop: 678 },
      { name: 'Name 5', score: 1556, position: 8, initial: 'A', xpToTop: 678 },
      { name: 'Name 6', score: 1256, position: 9, initial: 'A', xpToTop: 678 }
    ]
  };
  
  const tabs = ['Daily', 'Weekly', 'Monthly', 'All-Time'];
  
  const getProgressWidth = (score, maxScore = 2000) => {
    return Math.min((score / maxScore) * 100, 100);
  };
  
  const renderAvatar = (initial, isWinner = false) => (
    <View style={[
      styles.avatar,
      isWinner ? styles.winnerAvatar : styles.regularAvatar
    ]}>
      <Text style={[
        styles.avatarText,
        isWinner ? styles.winnerAvatarText : styles.regularAvatarText
      ]}>
        {initial}
      </Text>
    </View>
  );
  
  const renderPodiumCard = (user, isWinner = false) => (
    <View style={[
      styles.podiumCard,
      isWinner ? styles.winnerCard : styles.regularCard
    ]}>
      {isWinner && (
        <Ionicons name="trophy" size={24} color="#FFD700" style={styles.trophy} />
      )}
      {!isWinner && (
        <Text style={styles.positionNumber}>{user.position}</Text>
      )}
      <View style={styles.podiumContent}>
        {renderAvatar(user.initial, isWinner)}
        <Text style={styles.podiumName}>{user.name}</Text>
        <Text style={styles.podiumScore}>{user.score.toLocaleString()}</Text>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <View style={styles.tabBackground}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tab,
                  activeTab === tab ? styles.activeTab : styles.inactiveTab
                ]}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab ? styles.activeTabText : styles.inactiveTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Top 3 Podium */}
        <View style={styles.podiumContainer}>
          <View style={styles.podiumRow}>
            {/* Second Place */}
            {renderPodiumCard(leaderboardData.topThree[0])}
            
            {/* First Place */}
            {renderPodiumCard(leaderboardData.topThree[1], true)}
            
            {/* Third Place */}
            {renderPodiumCard(leaderboardData.topThree[2])}
          </View>
        </View>
        
        {/* Remaining Rankings */}
        <View style={styles.rankingContainer}>
          {leaderboardData.remaining.map((user, index) => (
            <View
              key={user.position}
              style={[
                styles.rankingItem,
                index === 1 ? styles.highlightedItem : null
              ]}
            >
              {/* Position */}
              <Text style={styles.rankingPosition}>{user.position}</Text>
              
              {/* Avatar */}
              <View style={styles.rankingAvatar}>
                <Text style={styles.rankingAvatarText}>{user.initial}</Text>
              </View>
              
              {/* Name and XP Info */}
              <View style={styles.rankingInfo}>
                <Text style={styles.rankingName}>{user.name}</Text>
                <Text style={styles.xpText}>{user.xpToTop} XP to Top 3</Text>
              </View>
              
              {/* Score and Progress */}
              <View style={styles.scoreContainer}>
                <Text style={styles.score}>{user.score.toLocaleString()}</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${getProgressWidth(user.score)}%` }
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
  },
  headerSpacer: {
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tabBackground: {
    backgroundColor: '#E5E5E5',
    borderRadius: 24,
    padding: 4,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4285F4',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#666666',
  },
  podiumContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
  },
  podiumCard: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 90,
  },
  regularCard: {
    height: 130,
    justifyContent: 'space-between',
  },
  winnerCard: {
    height: 160,
    justifyContent: 'space-between',
    minWidth: 110,
  },
  trophy: {
    marginBottom: 8,
  },
  positionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  podiumContent: {
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  winnerAvatar: {
    backgroundColor: '#4CAF50',
  },
  regularAvatar: {
    backgroundColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
  },
  winnerAvatarText: {
    color: '#FFFFFF',
  },
  regularAvatarText: {
    color: '#333333',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  podiumScore: {
    fontSize: 12,
    color: '#81C784',
  },
  rankingContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  rankingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightedItem: {
    borderWidth: 2,
    borderColor: '#4285F4',
  },
  rankingPosition: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    width: 24,
    marginRight: 16,
  },
  rankingAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rankingAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  rankingInfo: {
    flex: 1,
  },
  rankingName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  xpText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4285F4',
    marginBottom: 8,
  },
  progressBar: {
    width: 80,
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4285F4',
    borderRadius: 4,
  },
});

export default Leaderboard;