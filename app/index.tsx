import { useTheme } from "@/context/ThemeContext";
import { useThemeColors } from "@/hooks/UseThemeColors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
type Feature = {
    icon: string;
    text: string;
    description: string;
};

const features: Feature[] = [
    { icon: '🏋️‍♀️', text: 'Custom Ex', description: "Can create a special exercies" },
    { icon: '💪🏼', text: 'Create Workout', description: "You can build your personal workout" },
    { icon: '📈', text: 'Analitics', description: "You can watch your progress" },
    { icon: '🧑', text: 'Personal Coach', description: "Coach can traint clients" },
]

const WelcomeScreen = () => {

    const colors = useThemeColors();
    const { currentTheme } = useTheme();

    return (
        <SafeAreaView className={`flex-1 ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <View className="items-center px-5 pt-5">
                <Image
                    source={require('../assets/images/react-logo.png')}
                    className="w[-100px] h-[100px] mb-4"
                    resizeMode="contain"
                />
                <Text className={`text-[28px] font-bold text-center mb-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Start transforming your body today</Text>
                <Text className={`text-base text-center mb-10 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam non facere dolorem?
                </Text>

                <View className="flex-row flex-wrap justify-between mb-[30px] px-[5px]">
                    {features.map((feature, index) => (
                        <View key={index}
                            className={`w-[48%] rounded-2xl p-4 mb-4 ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <Text className="text-[36px mb-3">{feature.icon}</Text>
                            <View className="w-full">
                                <Text className={`text-[18px] font-bold mb-1 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{feature.text}</Text>
                                <Text className={`text-sm font-bold mb-1 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{feature.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </View>

            <View className="p-5 w-full">
                <TouchableOpacity
                    className="h-[54px] rounded-xl border-[1.5px] justify-center items-center mb-4"
                    style={{ borderColor: colors.primary }}
                    onPress={() => router.push('/sign-in')}
                >
                    <Text className="text-base font-semibold" style={{ color: colors.primary }}>Log in</Text>
                </TouchableOpacity>

                <LinearGradient
                    colors={['#4F46E5', '#7C3AED']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 12,
                        marginBottom: 16,
                        height: 54
                    }}
                >
                    <TouchableOpacity
                        className="h-[54px] rounded-xl border-[1.5px] justify-center items-center"
                        onPress={() => router.push('/signup')}
                    >
                        <Text className="text-base font-semibold text-white" style={{ color: colors.primary }}>Create Account</Text>
                    </TouchableOpacity>
                </LinearGradient>

            </View>

        </SafeAreaView>
    );
};

export default WelcomeScreen;
