import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

import { signUp, signIn } from "../firebase/auth";

const defaultState = {
  email: "",
  password: "",
};

export default function AccessAccountForm({ route, navigation }) {
  const [data, setData] = useState(defaultState);
  const [submitting, setIsSubmitting] = useState(false);
  const [formType, setFormType] = useState(
    JSON.stringify(route?.params?.type) || "signin"
  );

  useEffect(() => {
    navigation.setOptions({
      title: formType === "signin" ? "Sign In" : "Sign Up",
    });
  }, [formType]);

  const handleSignIn = () => {
    setIsSubmitting(true);
    signIn(data).then((res) => {
      setIsSubmitting(false);
    });
  };

  const handleSignUp = () => {
    setIsSubmitting(true);
    signUp(data).then((res) => {
      setIsSubmitting(false);
    });
  };

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        placeholder="Your Email"
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={(t) =>
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
        onChangeText={(t) =>
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
              ? "Need an Account? Create One"
              : "Already Got an Account?"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
