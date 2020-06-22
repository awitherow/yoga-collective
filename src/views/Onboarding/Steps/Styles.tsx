import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { yogaStyles } from "../../../helpers/strings";

export default function Styles({ profileType, nextStep }) {
  const [favs, setFavs] = useState([]);

  return (
    <View>
      <Text>
        {profileType === "student"
          ? "What are your favorite styles of Yoga?"
          : "What styles of yoga do you teach?"}
      </Text>
      <ScrollView>
        {yogaStyles.map((type, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              favs.includes(type)
                ? setFavs([...favs.filter((fav) => fav !== type)])
                : setFavs([...favs, type])
            }
          >
            <Text
              style={{
                fontWeight: favs.includes(type) ? "bold" : "normal",
              }}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => nextStep(favs)}>
          <Text>
            {profileType === "student"
              ? "Find Yoga Classes"
              : "Complete Your Teacher Bio!"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
