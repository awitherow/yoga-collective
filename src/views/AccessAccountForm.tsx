import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

import { signUp, signIn } from "../firebase/analytics";

const defaultState = {
  email: "",
  password: "",
};

export default function AccessAccountForm({ route }) {
  const [data, setData] = useState(defaultState);
  const [submitting, setIsSubmitting] = useState(false);
  const [formType, setFormType] = useState(
    JSON.stringify(route?.params?.type) || "signin"
  );

  const handleSignIn = () => {
    setIsSubmitting(true);
    signIn(data);
  };

  const handleSignUp = () => {
    setIsSubmitting(true);
    signUp(data);
  };

  return (
    <View>
      <TextInput
        placeholder="Your Email"
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={() =>
          setData({
            ...data,
            email: t,
          })
        }
      />
      <TextInput
        placeholder="A secure password"
        keyboardType="visible-password"
        textContentType="password"
        onChangeText={() =>
          setData({
            ...data,
            password: t,
          })
        }
      />
      <View>
        {formType === "signin" ? (
          <TouchableOpacity disabled={submitting} onPress={handleSignIn}>
            <Text>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={submitting} onPress={handleSignUp}>
            <Text>Create Your Account</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            setFormType(formType === "signin" ? "signup" : "signin")
          }
        >
          <Text>
            {formType === "signin"
              ? "Create an account"
              : "Got an account already?"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
