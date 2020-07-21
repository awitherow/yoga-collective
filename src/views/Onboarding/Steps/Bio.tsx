import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function Bio({ nextStep }) {
  const [profile, setProfile] = useState({
    tagline: "",
    bio: "",
    link: "",
  });

  const tooMuchTextStyle = (n, comparison) => ({
    color: comparison.length === n ? "red" : "gray",
  });

  const HEADLINE_MAX_LENGTH = 52;
  const BIO_MAX_LENGTH = 280;

  return (
    <View>
      <View>
        <Text>Complete Your Profile</Text>
      </View>
      <View>
        <View>
          <TextInput
            value={profile.tagline}
            maxLength={HEADLINE_MAX_LENGTH}
            placeholder="An eye catching headline"
            style={{
              ...tooMuchTextStyle(profile.tagline, HEADLINE_MAX_LENGTH),
            }}
            onChangeText={(t) =>
              setProfile({
                ...profile,
                tagline: t,
              })
            }
          />
          <Text>
            {profile.tagline.length}/{HEADLINE_MAX_LENGTH}
          </Text>
        </View>
        <View>
          <TextInput
            value={profile.bio}
            multiline
            numberOfLines={4}
            maxLength={BIO_MAX_LENGTH}
            placeholder="Tell us a bit more about yourself"
            onChangeText={(t) =>
              setProfile({
                ...profile,
                bio: t,
              })
            }
          />
          <Text style={{ ...tooMuchTextStyle(profile.bio, BIO_MAX_LENGTH) }}>
            {profile.bio.length}/{BIO_MAX_LENGTH}
          </Text>
        </View>
        <View>
          <TextInput
            value={profile.link}
            placeholder="Profile link"
            onChangeText={(t) =>
              setProfile({
                ...profile,
                link: t,
              })
            }
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => nextStep(profile)}>
        <Text>Complete Teacher Bio</Text>
      </TouchableOpacity>
    </View>
  );
}
