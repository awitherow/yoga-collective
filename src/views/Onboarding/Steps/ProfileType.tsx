import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ProfileType({ setIsTeacherOrStudent }) {
  return (
    <View>
      <View>
        <Text>Which type of profile do you wish to create?</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => setIsTeacherOrStudent("teacher")}>
          <Text>Teacher</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsTeacherOrStudent("student")}>
          <Text>Student</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
