import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <Slot />
    </SafeAreaView>
  )
}