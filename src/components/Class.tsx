import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";

export default function Class({ yogaClass }) {
  return (
    <View>
      <View>
        <View>
          <Text>
            {yogaClass.title} with {yogaClass.teacherName}
          </Text>
        </View>
        <Text>{yogaClass.tagline}</Text>
        <Text>{yogaClass.description.slice(0, 120)}</Text>
      </View>
    </View>
  );
}
