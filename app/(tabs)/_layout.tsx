// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      {/* Splash Screens */}
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="splashScreen2" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="splashScreen3" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />

      {/* Auth Screens */}
      <Stack.Screen 
        name="Login_register" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="loginScreen" 
        options={{
          headerShown: true,
          title: 'Login',
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen 
        name="signup" 
        options={{
          headerShown: true,
          title: 'Create Account',
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen 
        name="OTP" 
        options={{
          headerShown: true,
          title: 'Verify OTP',
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      {/* Main App Screens */}
      <Stack.Screen 
        name="HomeScreen" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />

      {/* Math Screens */}
      <Stack.Screen 
        name="MathsQuizList" 
        options={{
          headerShown: true,
          title: 'Math Quizzes',
          headerStyle: { backgroundColor: '#FF9500' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen 
        name="maths" 
        options={{
          headerShown: true,
          title: 'Mathematics',
          headerStyle: { backgroundColor: '#FF9500' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      {/* Physics Screens */}
      <Stack.Screen 
        name="PhysicsQuizList" 
        options={{
          headerShown: true,
          title: 'Physics Quizzes',
          headerStyle: { backgroundColor: '#34C759' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen 
        name="physics" 
        options={{
          headerShown: true,
          title: 'Physics',
          headerStyle: { backgroundColor: '#34C759' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      {/* Chemistry Screens */}
      <Stack.Screen 
        name="ChemistryQuizList" 
        options={{
          headerShown: true,
          title: 'Chemistry Quizzes',
          headerStyle: { backgroundColor: '#AF52DE' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen 
        name="chemistry" 
        options={{
          headerShown: true,
          title: 'Chemistry',
          headerStyle: { backgroundColor: '#AF52DE' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      {/* Quiz Screen */}
      <Stack.Screen 
        name="QuizScreen" 
        options={{
          headerShown: true,
          title: 'Quiz',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      {/* Other Screens */}
      <Stack.Screen 
        name="Explore" 
        options={{
          headerShown: true,
          title: 'Explore',
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}