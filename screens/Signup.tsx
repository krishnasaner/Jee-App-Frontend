import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const HeaderSVG = () => {
  return (
    <Svg width="100%" height={228} viewBox="0 0 393 228" fill="none">
      <Path
        d="M0 -38H393V203C393 216.807 381.807 228 368 228H25C11.1929 228 0 216.807 0 203V-38Z"
        fill="#2F6CFF"
      />
      <Path
        d="M393 -38C393 87.5583 232.236 189.614 0.000732422 189.614C0.000732422 101.218 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
        fill="#457CFF"
      />
      <Path
        d="M393 -38C393 66.0852 232.236 150.687 0.000732422 150.687C0.000732422 77.4083 0 -38 0 -38C0 -38 0 -38 178 -38C393 -38 393 -38 393 -38Z"
        fill="#5A8DFF"
      />
    </Svg>
  );
};

const Signup = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = () => {
    console.log("Sign up pressed");
  };

  const handleSignIn = () => {
    console.log("Sign in pressed");
  };

  const handleBackPress = () => {
    console.log("Back pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSVG />
      <StatusBar barStyle="light-content" backgroundColor="#4F7DF9" />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign up</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Email ID / Phone NO"
            placeholderTextColor="#999"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View
              style={[
                styles.checkboxInner,
                agreeToTerms && styles.checkboxChecked,
              ]}
            >
              {agreeToTerms && (
                <Ionicons name="checkmark" size={14} color="black" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I Agree With Terms of Service and Privacy Policy
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.signUpButton, !agreeToTerms && styles.buttonDisabled]}
          onPress={() => router.push('/main')}
          disabled={!agreeToTerms}
          
        >
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F7DF9",
  },
  header: {
    height: height * 0.35,
    position: "relative",
    overflow: "hidden",
  },
  curve1: {
    position: "absolute",
    top: height * 0.15,
    left: -width * 0.25,
    width: width * 1.5,
    height: height * 0.3,
    borderTopLeftRadius: width,
    borderTopRightRadius: width,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  curve2: {
    position: "absolute",
    top: height * 0.05,
    left: -width * 0.2,
    width: width * 1.4,
    height: height * 0.28,
    borderTopLeftRadius: width,
    borderTopRightRadius: width,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    marginTop: -10,
    justifyContent: "center",
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 25,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
    borderWidth: 0,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#DDD",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4F7DF9",
    borderColor: "#4F7DF9",
  },
  termsText: {
    fontSize: 14,
    fontFamily: "bold",
    lineHeight: 20,
    flex: 1,
  },
  linkText: {
    color: "#4F7DF9",
    fontWeight: "500",
  },
  signUpButton: {
    backgroundColor: "#4F7DF9",
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#4F7DF9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: "#CCC",
    elevation: 0,
    shadowOpacity: 0,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 16,
    fontFamily: "bold",
    color: "#666",
  },
  signInLink: {
    fontSize: 16,
    color: "#4F7DF9",
    fontWeight: "500",
  },
});

export default Signup;
