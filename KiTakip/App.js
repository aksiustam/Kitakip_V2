import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/Auth";
import { Router } from "./navigation/Router";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar />
      <Router />
    </AuthProvider>
  );
}
