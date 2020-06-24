import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

import { Welcome, ProfileType, ProfileInfo, Styles, Bio } from "./Steps";

import { StateContext } from "../../state";

export default function Wizard({ navigation }) {
  const [state, dispatch] = useContext(StateContext);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  const [image, setImage] = useState(null);
  const [isTeacherOrStudent, setIsTeacherOrStudent] = useState(null);

  useEffect(() => {
    // TODO: check AsyncStorage for form/image, setStep and prefill if exists
  }, []);

  const getSlide = () => {
    switch (step) {
      case 0:
        return (
          <Welcome
            navigation={navigation}
            setStep={() => {
              navigation.setOptions({ title: "Setup Your Profile" });
              setStep(1);
            }}
          />
        );
      case 1:
        return (
          <ProfileInfo
            form={form}
            setForm={setForm}
            image={image}
            setImage={setImage}
            completeInitialSignup={() => {
              // TODO: store form, image to AsyncStorage
              // TODO: call API for registration
              // - create user account
              // - add to mailchimp mailing list
              navigation.setOptions({ title: "Pick Your Profile Type" });
              setStep(2);
            }}
          />
        );
      case 2:
        return (
          <ProfileType
            setIsTeacherOrStudent={(choice) => {
              navigation.setOptions({
                title:
                  choice === "student"
                    ? "Your Favorite Styles"
                    : "Styles You Teach",
              });
              setIsTeacherOrStudent(choice);
              setStep(3);
            }}
          />
        );
      case 3:
        return (
          <Styles
            profileType={isTeacherOrStudent}
            nextStep={async (classStyles) => {
              switch (isTeacherOrStudent) {
                case "student":
                  // TODO: add styles to profile via api
                  await dispatch({ type: "SET_USER" });
                  navigation.navigate("Home");
                case "teacher":
                  // TODO: add styles to profile via api
                  navigation.setOptions({ title: "Complete Your Bio" });
                  setStep(4);
              }
            }}
          />
        );
      case 4:
        if (isTeacherOrStudent === "student") {
          navigation.navigate("Home");
        }
        return (
          <Bio
            nextStep={async (bio) => {
              await dispatch({ type: "SET_USER" });
              // TODO: add bio to profile via api
              // TODO: later... setStep(5);
              navigation.navigate("Home");
            }}
          />
        );
      // case 5:
      // TODO: Teachers Only, Submit Certification Information
    }
  };

  const stepLengths =
    isTeacherOrStudent === "teacher" ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3];

  return (
    <View>
      <View>{getSlide()}</View>
      <View>
        <TouchableOpacity
          disabled={step === 0}
          onPress={() => setStep(step - 1)}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        {stepLengths.map((i) => (
          <TouchableOpacity
            key={i}
            disabled={i > step}
            onPress={() => {
              if (step !== i) {
                setStep(i);
              }
            }}
          >
            <Entypo
              name="dot-single"
              size={24}
              color={step === i ? "black" : "gray"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
