import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {


  return (
    <View style={styles.container}>
      {/* Gradient Background Top Section */}
      <ImageBackground
        source={require("@/assets/images/gradient_bg.jpg")} 
        style={styles.topSection}
        resizeMode="cover"
      >
        <Text style={styles.title}>Master JEE</Text>
        <Text style={styles.subtitle}>One Question at a Time</Text>

        {/* Character Image */}
        <Image
          source={require("@/assets/images/splash_img.png")} 
          style={styles.image}
          resizeMode="contain"
        />
      </ImageBackground>

      {/*  Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guestButton}>
          <Text style={styles.guestText}>
            Continue as <Text style={styles.guestBold}>Guest</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //  Base
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  //  Top Section
  topSection: {
    width: "100%",
    height: 420,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 70,
    paddingBottom: 20,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    overflow: "hidden",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 280,
    height: 280,
    marginTop: 10,
  },

  //  Buttons
  buttonContainer: {
    marginTop: 30,
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
  signupButton: {
    width: "100%",
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "#2D6CF6",
    borderRadius: 10,
    marginBottom: 15,
  },
  signupText: {
    color: "#2D6CF6",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  guestButton: {
    marginTop: 5,
  },
  guestText: {
    color: "#000",
    fontSize: 14,
  },
  guestBold: {
    color: "#2D6CF6",
    fontWeight: "600",
  },
});
