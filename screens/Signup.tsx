import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const { width: initialWidth, height: initialHeight } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (initialWidth / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (initialHeight / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const HeaderSVG = ({ height: svgHeight }: { height?: number | string }) => {
  return (
    <Svg width="100%" height={svgHeight} viewBox="0 0 393 228">
      <Path d="M0 -38H393V350H0V-38Z" fill="#2F6CFF" />
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
  const { height } = useWindowDimensions();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [hometown, setHometown] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F7DF9" />
      <View style={{ width: "100%", height: height * 0.3 }}>
        <HeaderSVG height={height * 0.3} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                underlineColorAndroid="transparent"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Phone No"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                underlineColorAndroid="transparent"
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={conpassword}
                onChangeText={setConPassword}
                secureTextEntry
                underlineColorAndroid="transparent"
              />

              <View style={styles.rowContainer}>
                <TouchableOpacity
                  style={[
                    styles.input,
                    styles.halfInput,
                    { justifyContent: "center" },
                  ]}
                >
                  <Text style={{ color: dob ? "#333" : "#999" }}>
                    {dob ? dob.toLocaleDateString() : "Date of Birth"}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.input,
                    styles.halfInput,
                    { marginLeft: scale(8) },
                  ]}
                  placeholder="Hometown"
                  placeholderTextColor="#999"
                  value={hometown}
                  onChangeText={setHometown}
                  underlineColorAndroid="transparent"
                />
              </View>
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
                    <Ionicons
                      name="checkmark"
                      size={moderateScale(14)}
                      color="white"
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I Agree With Terms of Service and Privacy Policy
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.signUpButton,
                !agreeToTerms && styles.buttonDisabled,
              ]}
              onPress={() => router.push("/main")}
              disabled={!agreeToTerms}
            >
              <Text style={styles.signUpButtonText}>Sign up</Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.signInLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  formContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    marginTop: -verticalScale(27),
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(60),
    zIndex: 1000,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },
  halfInput: { flex: 1 },
  title: {
    fontSize: moderateScale(35),
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: verticalScale(16),
  },
  inputContainer: { marginBottom: verticalScale(4) },
  input: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(18),
    borderRadius: moderateScale(25),
    fontSize: moderateScale(14),
    color: "#333",
    marginBottom: verticalScale(16),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(26),
  },
  checkbox: { marginRight: scale(12), marginTop: verticalScale(2) },
  checkboxInner: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(3),
    borderWidth: 2,
    borderColor: "#DDD",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: { backgroundColor: "#4F7DF9", borderColor: "#4F7DF9" },
  termsText: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    flex: 1,
    fontWeight: "500",
  },
  signUpButton: {
    backgroundColor: "#4F7DF9",
    paddingVertical: verticalScale(18),
    borderRadius: moderateScale(25),
    alignItems: "center",
    marginBottom: verticalScale(20),
    elevation: 2,
    shadowColor: "#4F7DF9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonDisabled: { backgroundColor: "#CCC", elevation: 0, shadowOpacity: 0 },
  signUpButtonText: {
    color: "white",
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: { fontSize: moderateScale(16), fontWeight: "500" },
  signInLink: {
    fontSize: moderateScale(16),
    color: "#4F7DF9",
    fontWeight: "500",
  },
});

export default Signup;
