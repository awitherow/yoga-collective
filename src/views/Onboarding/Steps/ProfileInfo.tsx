import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import validator from "validator";

export default function ProfileInfo({
  form,
  setForm,
  image,
  setImage,
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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
            placeholder="First Name"
            value={form.firstName}
            onChangeText={(t) =>
              setForm({
                ...form,
                firstName: t,
              })
            }
          />
          <TextInput
            placeholder="Last Name"
            value={form.lastName}
            onChangeText={(t) =>
              setForm({
                ...form,
                lastName: t,
              })
            }
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Email Address"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(t) =>
              setForm({
                ...form,
                email: t,
              })
            }
          />
          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(t) =>
              setForm({
                ...form,
                phone: t,
              })
            }
          />
          <TextInput
            placeholder="Password"
            keyboardType="visible-password"
            value={form.password}
            onChangeText={(t) =>
              setForm({
                ...form,
                password: t,
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
