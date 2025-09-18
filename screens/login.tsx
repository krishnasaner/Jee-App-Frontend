import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const HeaderSVG = ({ animatedValue }) => {
  // Convert animated values to interpolated strings for transform attribute
  const translateY1 = animatedValue.interpolate({
    inputRange: [0, 10],
    outputRange: [0, 10]
  });
  
  const translateY2 = animatedValue.interpolate({
    inputRange: [0, 10],
    outputRange: [0, 15]
  });

  return (
    <Svg width="100%" height={240} viewBox="0 0 393 240" fill="none">
      <Path
        d="M0 -38H393V203C393 216.807 381.807 228 368 228H25C11.1929 228 0 216.807 0 203V-38Z"
        fill="#2F6CFF"
      />
      <Path
        d="M393 -38C393 87.5583 232.236 189.614 0.000732422 189.614C0.000732422 101.218 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
        fill="#457CFF"
        transform={`translate(0, ${translateY1})`}
      />
      <Path
        d="M393 -38C393 66.0852 232.236 150.687 0.000732422 150.687C0.000732422 77.4083 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
        fill="#5A8DFF"
        transform={`translate(0, ${translateY2})`}
      />
    </Svg>
  );
};

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);
  const router = useRouter();
  
  // Animation values
  const gradientAnimation = useRef(new Animated.Value(0)).current;
  const sendOtpScale = useRef(new Animated.Value(1)).current;
  const loginScale = useRef(new Animated.Value(1)).current;

  // Start gradient animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnimation, {
          toValue: 10,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(gradientAnimation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleLogin = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(loginScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(loginScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Login logic
      const otpCode = otp.join("");
      if (otpCode.length === 6) {
        router.push("/(tabs)");
      } else {
        alert("Please enter a valid 6-digit OTP");
      }
    });
  };
  
  const handleSendOtp = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(sendOtpScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(sendOtpScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Send OTP logic would go here
      alert("OTP sent successfully!");
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Gradient */}
      <View style={styles.headerWrapper}>
        <HeaderSVG animatedValue={gradientAnimation} />
        <Ionicons
          name="chevron-back"
          size={24}
          color="#fff"
          style={styles.backIcon}
        />
      </View>

      {/* White Card Section */}
      <View style={styles.card}>
        {/* Title */}
        <Text style={styles.title}>Login</Text>

        {/* Phone Input */}
        <View style={styles.phoneWrapper}>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter Phone No."
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
          <Animated.View style={{transform: [{scale: sendOtpScale}]}}>
            <TouchableOpacity onPress={handleSendOtp}>
              <Text style={styles.sendOtp}>Send OTP</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* OTP Label */}
        <Text style={styles.subtitle}>
          Enter OTP Send to <Text style={styles.phone}>0123456789</Text>.
        </Text>

        {/* OTP Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref!)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        {/* Login Button */}
        <Animated.View style={[styles.loginButton, {transform: [{scale: loginScale}]}]}>
          <TouchableOpacity onPress={handleLogin} style={{width: '100%', alignItems: 'center'}}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don’t have account?{" "}
          <Text style={styles.signupText}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerWrapper: {
    height: 240,
    width: "100%",
    position: "relative",
  },
  backIcon: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "flex-start",
    marginLeft: 25,
  },
  phoneWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    width: "90%",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: "#000",
  },
  sendOtp: {
    color: "#2D6CF6",
    fontWeight: "600",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#120101ff",
    marginTop: 20,
    textAlign: "center",
    fontWeight:"600",
  },
  phone: {
    color: "#2D6CF6",
    fontWeight: "600",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    width: "90%",
  },
  otpInput: {
    width: 45,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    fontSize: 18,
    color: "#000",
  },
  loginButton: {
    marginTop: 35,
    width: "85%",
    backgroundColor: "#2D6CF6",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#000",
    fontWeight:"500"
  },
  signupText: {
    color: "#2D6CF6",
    fontWeight: "600",
  },
});
