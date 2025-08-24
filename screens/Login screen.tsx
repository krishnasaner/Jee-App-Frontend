import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Master JEE</Text>
        <Text style={styles.subtitle}>One Question at a Time</Text>
        <Image
          source={require("@/assets/images/splash_img.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          // onPress={() => router.push("/home")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          // onPress={() => router.push("/register")}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topSection: {
    width: "100%",
    backgroundColor: "#2D6CF6",
    paddingTop: 70,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 420,
    height: 420,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 40,
    width: "80%",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#2D6CF6",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  registerButton: {
    width: "100%",
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "#2D6CF6",
    borderRadius: 10,
  },
  registerText: {
    color: "#2D6CF6",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
 login screen