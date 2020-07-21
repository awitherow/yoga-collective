import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

import * as types from "../redux/types";

import { signUp, signIn } from "../firebase/auth";

const defaultState = {
  email: "",
  password: "",
};

function AccessAccountForm({ route, navigation, setLoading }) {
  const [data, setData] = useState(defaultState);
  const [formType, setFormType] = useState(
    JSON.stringify(route?.params?.type) || "signup"
  );

  useEffect(() => {
    navigation.setOptions({
      title: formType === "signin" ? "Sign In" : "Sign Up",
    });
  }, [formType]);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn(data);
  };

  const handleSignUp = async () => {
    setLoading(true);
    await signUp(data);
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
          <TouchableOpacity onPress={handleSignIn}>
            <Text>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSignUp}>
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

function mapDispatchToProps(dispatch) {
  return {
    setLoading: (loading) =>
      dispatch({ type: types.SET_LOADING, payload: loading }),
  };
}

export default connect(null, mapDispatchToProps)(AccessAccountForm);
