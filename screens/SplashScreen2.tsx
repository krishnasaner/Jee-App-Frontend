import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const color = {
  blue500: "#2F6CFF",
  blue400: "#457CFF",
  blue300: "#5A8DFF",
  gray: "#ffffff",
};

export default function SplashScreen2() {
  const router = useRouter(); // navigation hook
  const activeIndex = 1;
  const totalDots = 3;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Heading */}
        <View style={styles.textcon}>
          <Text style={styles.title}>Complete on{"\n"}Leaderboards</Text>
          <Text style={styles.subtitle}>
            Challenge friends and top JEE aspirants.{"\n"}
            Climb ranks and prove your exam{"\n"}
            readiness.
          </Text>
        </View>

        {/* Character Image */}
        <View style={styles.imageWrapper}>
          <View style={styles.imageWrapper1}>
            <View style={styles.imageWrapper2}>
              <Image
                source={require('../assets/images/splash_img.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Arrow Button */}
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => router.push('/main')} // go to main screen
        >
          <View style={styles.innerBorder} />
          <Entypo name="arrow-bold-right" size={24} color={color.blue500} />
        </TouchableOpacity>

        {/* Indicator Dots */}
        <View style={styles.indicatorContainer}>
          {Array.from({ length: totalDots }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0FF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  content: {
    alignItems: 'center',
  },
  textcon: {
    position: 'absolute',
    top: -height * 0.4,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: height * 0.015,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: '#444',
    textAlign: 'center',
    lineHeight: width * 0.045,
    marginBottom: height * 0.03,
  },
  imageWrapper: {
    position: 'absolute',
    top: height * 0.01,
    backgroundColor: color.blue300,
    borderTopLeftRadius: width * 0.5,
    borderTopRightRadius: width * 0.5,
    width: width * 0.6,
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.02,
    alignSelf: 'center',
  },
  imageWrapper1: {
    position: 'absolute',
    top: height * 0.02,
    backgroundColor: color.blue400,
    borderTopLeftRadius: width * 0.5,
    borderTopRightRadius: width * 0.5,
    width: width * 0.6,
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.02,
    alignSelf: 'center',
  },
  imageWrapper2: {
    position: 'absolute',
    top: height * 0.03,
    backgroundColor: color.blue500,
    borderTopLeftRadius: width * 0.5,
    borderTopRightRadius: width * 0.5,
    width: width * 0.6,
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.02,
    alignSelf: 'center',
  },
  image: {
    position: 'absolute',
    bottom: height * 0.67,
    width: width * 0.9,
    height: height * 0.4,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: -height * 0.45,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: color.gray,
    width: width * 0.1,
    height: width * 0.02,
    borderRadius: 50,
  },
  inactiveDot: {
    backgroundColor: color.gray,
  },
  arrowButton: {
  position: 'absolute',
  bottom: -height * 0.4,
  backgroundColor: '#fff',
  borderRadius: 50,
  width: width * 0.13,
  height: width * 0.13,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden', // Needed to clip the inner view
},

innerBorder: {
  position: 'absolute',
  top: 2,
  left: 2,
  right: 2,
  bottom: 2,
  borderRadius: 50,
  borderWidth: 2,
  borderColor: color.blue500, // Border color
  
},

});