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

  return (
    <View>
      <View>
        <Text>Complete Your Profile</Text>
      </View>
      <View>
        <View>
          <TextInput
            value={profile.tagline}
            maxLength={52}
            placeholder="An eye catching headline"
            style={{ ...tooMuchTextStyle(profile.tagline, 40) }}
            onChangeText={(t) =>
              setProfile({
                ...profile,
                tagline: t,
              })
            }
          />
          <Text>{profile.tagline.length}/40</Text>
        </View>
        <View>
          <TextInput
            value={profile.bio}
            multiline
            numberOfLines={4}
            maxLength={120}
            placeholder="Tell us a bit more about yourself"
            onChangeText={(t) =>
              setProfile({
                ...profile,
                bio: t,
              })
            }
          />
          <Text style={{ ...tooMuchTextStyle(profile.bio, 120) }}>
            {profile.bio.length}/120
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
