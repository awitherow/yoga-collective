import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ScrollView, View, TextInput, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { updateProfile, uploadProfilePhoto } from "../../firebase/profile";

import { yogaStyles } from "../../helpers/strings";

const HEADLINE_MAX_LENGTH = 52;
const BIO_MAX_LENGTH = 280;

function ProfileScreen({ navigation, profile }) {
  const [form, setForm] = useState(profile);

  const tooMuchTextStyle = (n, comparison) => ({
    color: comparison.length === n ? "red" : "gray",
  });

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
      setForm({
        ...form,
        photo: `data:image/png;base64,${manip.base64}`,
      });
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={pickImage}>
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: form.photo }}
        />
      </TouchableOpacity>
      <TextInput
        value={form.name}
        onChangeText={(t) => setForm({ ...form, name: t })}
      />
      <Text>Your Styles</Text>
      {yogaStyles.map((type, i) => (
        <TouchableOpacity
          key={i}
          onPress={() =>
            form.styles.includes(type)
              ? setForm({
                  ...form,
                  styles: [...form.styles.filter((fav) => fav !== type)],
                })
              : setForm({ ...form, styles: [...form.styles, type] })
          }
        >
          <Text
            style={{
              fontWeight: form.styles.includes(type) ? "bold" : "normal",
            }}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
      {profile.profileType === "teacher" && (
        <>
          <View>
            <TextInput
              value={form.tagline}
              maxLength={HEADLINE_MAX_LENGTH}
              placeholder="An eye catching headline"
              style={{
                ...tooMuchTextStyle(form.tagline, HEADLINE_MAX_LENGTH),
              }}
              onChangeText={(t) =>
                setForm({
                  ...form,
                  tagline: t,
                })
              }
            />
            <Text>
              {form.tagline.length}/{HEADLINE_MAX_LENGTH}
            </Text>
          </View>
          <View>
            <TextInput
              value={form.bio}
              multiline
              numberOfLines={4}
              maxLength={BIO_MAX_LENGTH}
              placeholder="Tell us a bit more about yourself"
              onChangeText={(t) =>
                setForm({
                  ...form,
                  bio: t,
                })
              }
            />
            <Text style={{ ...tooMuchTextStyle(form.bio, BIO_MAX_LENGTH) }}>
              {form.bio.length}/{BIO_MAX_LENGTH}
            </Text>
          </View>
          <View>
            <TextInput
              value={form.link}
              placeholder="Profile link"
              onChangeText={(t) =>
                setForm({
                  ...form,
                  link: t,
                })
              }
            />
          </View>
        </>
      )}
      <TouchableHighlight
        onPress={() => {
          updateProfile(profile.uid, form);
          if (form.photo !== profile.photo) {
            uploadProfilePhoto(form.photo, profile.uid);
          }
        }}
      >
        <Text>Update Profile</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps, null)(ProfileScreen);
