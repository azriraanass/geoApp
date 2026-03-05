import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View className="bg-white h-full w-full">
      <Image
        className="h-full w-full absolute"
        source={require("../../assets/images/background.png")}
      />
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[225] w-[90]"
          source={require("../../assets/images/light.png")}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          className="h-[160] w-[60]"
          source={require("../../assets/images/light.png")}
        />
      </View>

      {/* Title and Form */}
      <View className="h-full w-full flex justify-around pt-48 pb-10">
        {/* Title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Sign Up
          </Animated.Text>
        </View>
        {/*form */}
        <Animated.View
          entering={FadeInDown.duration(1000)}
          className="flex items-center mx-4 gap-2"
        >
          <View className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder="User Name" placeholderTextColor={"gray"} />
          </View>

          <View className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder="Email" placeholderTextColor={"gray"} />
          </View>

          <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry={true}
            />
          </View>

          <View className="w-full">
            <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
              <Text className="text-xl font-bold text-white text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text className="text-sky-600"> Login</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
