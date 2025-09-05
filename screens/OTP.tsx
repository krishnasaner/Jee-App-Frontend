import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);
  const router = useRouter();

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleLogin = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 4) {
      router.push("/(tabs)");
    } else {
      alert("Please enter a valid 4-digit OTP");
    }
  };

  return (
    <View style={styles.container}>
      {/*  Top Gradient Background */}
      <ImageBackground
        source={require("@/assets/images/gradient_bg.jpg")} 
        style={styles.topSection}
        resizeMode="cover"
      >
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </ImageBackground>

      {/*  White Card Section */}
      <View style={styles.card}>
        {/*  Title */}
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>Login in</Text>
        </View>

        {/* 📱 Phone Input */}
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter Phone No."
          placeholderTextColor="#666"
          keyboardType="phone-pad"
        />

        {/*  ref={(ref) => (inputs.current[index] = ref!)} OTP Label */}
        <Text style={styles.subtitle}>
          Enter OTP Send to <Text style={styles.phone}>0123456789</Text>.
        </Text>

        {/*  OTP Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
             
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        {/*  Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login in</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don’t have account? <Text style={styles.signupText}>Sign up</Text>
        </Text>

        <Text style={styles.terms}>
          By continuing, you agree to our
        </Text>

        <View style={styles.policyWrapper}>
          <Text style={styles.policyLink}>Terms of Service</Text>
          <Text style={styles.policyLink}>Privacy Policy</Text>
          <Text style={styles.policyLink}>Content Policy</Text>
        </View>
      </View>
    </View>
  );
}

//  STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D6CF6",
  },
  topSection: {
    height: 180,
    width: "100%",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingLeft: 20,
    overflow: "hidden",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    width: "100%",
    paddingHorizontal: 25,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  phoneInput: {
    width: "90%",
    height: 50,
    backgroundColor: "#e6e6e6",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 15,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 15,
    textAlign: "center",
  },
  phone: {
    color: "#2D6CF6",
    fontWeight: "600",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "70%",
  },
  otpInput: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    fontSize: 18,
    color: "#000",
  },
  loginButton: {
    marginTop: 40,
    width: "85%",
    backgroundColor: "#2D6CF6",
    paddingVertical: 15,
    borderRadius: 30,
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
  },
  signupText: {
    color: "#2D6CF6",
    fontWeight: "600",
  },
  terms: {
    marginTop: 25,
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },
  policyWrapper: {
    flexDirection: "row",
    marginTop: 8,
    gap: 15,
  },
  policyLink: {
    fontSize: 13,
    color: "#555",
  },
});
