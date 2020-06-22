import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

const defaultState = {
  email: "",
  password: "",
};

export default function Login() {
  const [data, setData] = useState(defaultState);

  const handleLogin = () => {
    // TODO: attempt login
    // if success -> set hasAccount/token, navigation.navigate("Home")
    // else show form errors setDate({})
  };

  return (
    <View>
      <TextInput
        textContentType="emailAddress"
        onChangeText={() =>
          setData({
            ...data,
            email: t,
          })
        }
      />
      <TextInput
        textContentType="password"
        onChangeText={() =>
          setData({
            ...data,
            password: t,
          })
        }
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
