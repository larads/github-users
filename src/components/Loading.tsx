import { ActivityIndicator, View } from "react-native";
import colors from 'tailwindcss/colors'

export function Loading() {
  return (
    <View className="flex-1 self-center mt-56 justify-center">
      <ActivityIndicator color={colors.white} />
    </View>
  );
}