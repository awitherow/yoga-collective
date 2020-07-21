import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import validator from "validator";

export default function ProfileInfo({
  form,
  setForm,
  setImage,
  image,
  completeInitialSignup,
}) {
  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.cancelled) {
      const manip = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 500, height: 500 } }],
        {
          format: "png",
          base64: true,
        }
      );
      setImage(`data:image/png;base64,${manip.base64}`);
    }
  };

  return (
    <View>
      <View>
        <View>
          <TouchableOpacity onPress={pickImage}>
            <Text>Pick an image from camera roll</Text>
          </TouchableOpacity>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <AntDesign name="user" size={24} color="black" />
          )}
        </View>
        <View>
          <TextInput
            placeholder="Your Name or Nickname"
            value={form.name}
            onChangeText={(t) =>
              setForm({
                ...form,
                name: t,
              })
            }
          />

          <TouchableOpacity
            // disabled={errors.length}
            onPress={completeInitialSignup}
          >
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
