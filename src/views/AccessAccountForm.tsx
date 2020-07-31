import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import * as validator from "validator";

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

  const [formError, setFormError] = useState(null);
  const [attemptingAuth, setAttemptingAuth] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: formType === "signin" ? "Sign In" : "Sign Up",
    });
  }, [formType]);

  const handleSignIn = () => {
    setAttemptingAuth(true);
    signIn(data)
      .then(() => setLoading(true))
      .catch((e) => {
        setFormError(e.message);
        setAttemptingAuth(false);
      });
  };

  const handleSignUp = () => {
    setAttemptingAuth(true);
    signUp(data).catch((e) => {
      setFormError(e.message);
      setAttemptingAuth(false);
    });
  };

  const passwordSecure = (password) =>
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    ).test(password);

  const validateForm = () =>
    formType === "signup"
      ? validator.isEmail(data.email) && passwordSecure(data.password)
      : validator.isEmail(data.email);

  const disabled = attemptingAuth || !validateForm();
  const passwordString =
    "Password must contain 1 number, 1 uppercase, 1 lowercase, 1 special character, and be 8 characters long or more";

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
      {formError && <Text>{formError}</Text>}
      {formType === "signup" && !passwordSecure(data.password) ? (
        <Text>{passwordString}</Text>
      ) : null}
      <View>
        {formType === "signin" ? (
          <TouchableOpacity disabled={disabled} onPress={handleSignIn}>
            <Text>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={disabled} onPress={handleSignUp}>
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
