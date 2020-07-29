import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { diffMinutes, timeZoned, defaultFormatDate } from "../helpers/time";

export default function Class({
  yogaClass: {
    teacherPhoto,
    title,
    teacherName,
    tagline,
    description,
    location,
    startTime,
    endTime,
    styles,
  },
}) {
  return (
    <View>
      <Image source={{ uri: teacherPhoto }} />
      <View>
        <View>
          <Text>
            {title} with {teacherName}
          </Text>
        </View>
        <Text>{tagline}</Text>
        <Text>{description.slice(0, 120)}</Text>
        <Text>{location}</Text>
        <Text>Starts {defaultFormatDate(timeZoned(startTime))} for </Text>
        <Text>Length: {diffMinutes(startTime, endTime)} mins.</Text>
        <View>
          {styles.map((tag, i) => (
            <Text key={i}>{tag}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}
