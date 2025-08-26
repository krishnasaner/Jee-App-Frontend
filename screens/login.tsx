// LoginScreen.js
import { Ionicons } from "@expo/vector-icons";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export default function LoginScreen({ navigation } : {navigation : any}) {
  return (
    <SafeAreaView style={styles.container}>
      {/* ===== Gradient Header ===== */}
      <View style={styles.header}>
        <HeaderSVG />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* ===== White Card ===== */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login in</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Phone No. / Email Id."
          placeholderTextColor="#666"
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login in</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          <Text style={{ fontWeight: "bold" }}>Don’t have account? </Text>
          <Text
            style={[styles.signupLink, { fontWeight: "bold" }]}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign up
          </Text>
        </Text>

        {/* ===== Footer ===== */}
        <View style={{ flex: 1 }} /> 
        <Text style={styles.footerText}>
          By continuing, you agree to our
        </Text>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Terms of Service</Text>
          <Text style={styles.footerLink}>Privacy Policy</Text>
          <Text style={styles.footerLink}>Content Policy</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ===== Gradient SVG Exactly Like Screenshot =====
const HeaderSVG = () => (
  <Svg width="100%" height={240} viewBox="0 0 393 240" fill="none">
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold", // bold highlight
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 15,
    marginBottom: 18,
  },
  loginButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#2F6CFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  signupText: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  signupLink: {
    color: "#2F6CFF",
    fontWeight: "600",
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  footerLink: {
    fontSize: 12,
    color: "#666",
  },
});
