import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const color = {
  blue500: "#2F6CFF",
  blue400: "#457CFF",
  blue300: "#5A8DFF",
  gray: "#cfcfcfff",
};

export default function SplashScreen3() {
  const router = useRouter(); // navigation hook
  const activeIndex = 2;
  const totalDots = 3;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Heading */}
        <View style={styles.textcon}>
          <Text style={styles.title}>Daily Xp &{"\n"}Streak Tracker</Text>
 
          <Text style={styles.subtitle}>
            Earn points every time you practice.
Keep your streak alive and watch your 
progress grow.
          </Text>
        </View>

        {/* Character Image */}
        <View style={styles.imageWrapper}>
          <View style={styles.imageWrapper1}>
            <View style={styles.imageWrapper2}>
              
            </View>
          </View>
        </View>
        <Image
                source={require('../assets/images/splash_img.png')}
                style={styles.image}
                resizeMode="contain"
        />
      
        {/* Arrow Button */}
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => router.push('/login')}
        >
          <View style={styles.innerBorder} />
          <Entypo name="arrow-bold-right" size={24} color="white" />
        </TouchableOpacity>

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
    bottom: -height * 0.33,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: height * 0.015,
  },
  subtitle: {
    width: width * 0.7,
    fontSize: width * 0.035,
    color: '#444',
    textAlign: 'center',
    lineHeight: width * 0.045,
    marginBottom: height * 0.03,
  },
  imageWrapper: {
    position: 'absolute',
    bottom: -height * 0.1,
    left: width * 0.1,
    backgroundColor: color.blue300,
    borderTopLeftRadius: width * 0.5,
    borderTopRightRadius: width * 0.5,
    width: width * 0.6,
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.02,
    alignSelf: 'center',
     transform: [{rotate: '-145deg'}]
    
  },
  imageWrapper1: {
    position: 'absolute',
    top: height * 0.02,
    backgroundColor: color.blue400,
    borderTopLeftRadius: width * 0.5,
    borderTopRightRadius: width * 0.5,
    width: width * 0.5,
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.02,
    alignSelf: 'center',
  },
  imageWrapper2: {
    position: 'absolute',
    top: height * 0.00,
    right: width * 0.05,
    backgroundColor: color.blue500,
    borderTopLeftRadius: width * 0.5,
    borderTopRightRadius: width * 0.5,
    width: width * 0.5,
    height: height * 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.02,
    alignSelf: 'center',
    
  },
  image: {
    position: 'absolute',
    bottom: -height * 0.0,
    width: width * 1,
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
  backgroundColor: color.blue500,
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
  borderColor: "#ffff", // Border color
  
},

});