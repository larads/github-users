import { Image, Text, View } from 'react-native';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
    return(
        <View className="flex-row items-center border-b border-white pb-5 mx-5 mt-2">
            <Image source={require('@/assets/logo.png')} className="h-14 w-14 mt-2" />
            <Text className="text-white text-xl text-center mt-2 uppercase">{title}</Text>
        </View>
    )
}