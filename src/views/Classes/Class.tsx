import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";

export default function Class({ teacher, yogaClass }) {
  return (
    <View>
      <View>
        <Image source={{ uri: teacher.photo }} />
      </View>
      <View>
        <View>
          <Text>
            {yogaClass.title} with {teacher.firstName}
          </Text>
        </View>
        <Text>{yogaClass.tagline}</Text>
        <Text>{yogaClass.description.slice(0, 120)}</Text>
      </View>
    </View>
  );
}
