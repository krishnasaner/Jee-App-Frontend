import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const { width: DEVICE_W } = Dimensions.get('window');
const BASE_W = 393;
const scale = (n) => (DEVICE_W / BASE_W) * n;

// ----- SAMPLE DATA WITH ICON PATH -----
const quizzes = [
  { id: '1', title: 'Quiz 1', questions: 20, time: 'Infinite', status: 'Pending', icon: require('../assets/images/q1.png') },
  { id: '2', title: 'Quiz 2', questions: 20, time: 'Infinite', status: 'Pending', icon: require('../assets/images/q2.png') },
  { id: '3', title: 'Quiz 3', questions: 20, time: 'Infinite', status: 'Pending', icon: require('../assets/images/q3.png') },
  { id: '4', title: 'Quiz 4', questions: 20, time: 'Infinite', status: 'Pending', icon: require('../assets/images/q4.png') },
  { id: '5', title: 'Quiz 5', questions: 20, time: 'Infinite', status: 'Pending', icon: require('../assets/images/q5.png') },
  { id: '6', title: 'Quiz 6', questions: 20, time: 'Infinite', status: 'Pending', icon: require('../assets/images/q6.png') },
];

// HEADER HEIGHT
const HEADER_HEIGHT = scale(228) + (Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0);

function HeaderSVG() {
  return (
    <Svg
      width={DEVICE_W}
      height={scale(228)}
      viewBox="0 0 393 228"
      style={{ position: 'absolute', top: -scale(8), left: 0 }}
    >
      {/* Base rectangle with bottom rounded corners */}
      <Rect
        x="0"
        y="8"
        width="393"
        height="220"
        fill="#2F6CFF"
        rx="30"  // Rounded bottom edges
        ry="30"
      />

      {/* Inner wave layers remain the same */}
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



const QuizCard = ({ item }) => (
  <View style={styles.cardWrapper}>
    {/* Icon box */}
    <View style={styles.leftIconBox}>
      <Image source={item.icon} style={styles.iconImage} resizeMode="contain" />
    </View>

    <View style={styles.cardText}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSub}>
        <Text style={styles.grayText}>Questions: </Text>
        <Text style={styles.greenText}>{item.questions}</Text>
        {'   '}
        <Text style={styles.grayText}>Time: </Text>
        <Text style={styles.greenText}>{item.time}</Text>
      </Text>
    </View>

    <View style={styles.cardStatusWrapper}>
      <Text style={styles.cardStatus}>{item.status}</Text>
    </View>
  </View>
);

export default function MathQuizList() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <HeaderSVG />

      {/* Top Section */}
      <View style={styles.headerContent}>
        <View style={styles.breadcrumbRow}>
          <Text style={styles.bcText}>Home</Text>
          <Text style={styles.bcText}> &gt; </Text>
          <Text style={styles.bcText}>Physics</Text>
          <Text style={styles.bcText}> &gt; </Text>
          <Text style={styles.bcText}>Quiz</Text>
        </View>

        {/* Subject Card */}
        <View style={[styles.subjectCard, { marginTop: scale(30) }]}>
          <View style={styles.leftIconBox}>
            <Image source={require('../assets/images/MotionPlane.png')} style={styles.iconImage} resizeMode="contain" />
          </View>
          <Text style={styles.subjectTitle}>P-Block</Text>
        </View>
      </View>

      {/* Quiz List */}
      <View style={[styles.body, { marginTop: HEADER_HEIGHT - scale(40) }]}>
        <Text style={styles.listTitle}>Quiz list</Text>
        <FlatList
          data={quizzes}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <QuizCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#EEF3FF' },
  headerContent: {
    position: 'absolute',
    left: scale(16),
    right: scale(16),
    top: (Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + scale(12) : scale(12)),
  },
  breadcrumbRow: { flexDirection: 'row', alignItems: 'center', marginTop: scale(35) },
  bcText: { color: '#FFF', fontSize: scale(13.6), fontWeight: '400' },
  subjectCard: {
    width: '100%',
    height: scale(65),
    borderRadius: scale(10),
    backgroundColor: 'rgba(255,255,255,0.64)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
  },
  subjectTitle: { fontSize: scale(19.3), color: '#000', fontWeight: '400' },

  body: { flex: 1, paddingHorizontal: scale(18) },
  listTitle: { fontSize: scale(18.3), color: '#000', marginBottom: scale(12) },
  listContent: { paddingBottom: scale(40) },

  cardWrapper: {
    width: '100%',
    height: scale(70),
    borderRadius: scale(10),
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    marginBottom: scale(12),
  },
  leftIconBox: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FB',
    marginRight: scale(14),
  },
  iconImage: { width: scale(34), height: scale(34) },

  cardText: { flex: 1, justifyContent: 'center' },
  cardTitle: { fontSize: scale(15), color: '#000', fontWeight: '400' },
  cardSub: { marginTop: scale(2), fontSize: scale(11) },
  grayText: { color: '#888A93', fontSize: scale(11) },
  greenText: { color: '#10B981', fontSize: scale(11) },
  cardStatusWrapper: { width: scale(72), alignItems: 'flex-end', justifyContent: 'center' },
  cardStatus: { color: '#FF6B6B', fontSize: scale(12.2), textAlign: 'right' },
});