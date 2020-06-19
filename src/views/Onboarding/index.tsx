import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

import { Welcome, ProfileType, ProfileInfo, Styles } from "./Steps";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Wizard({ navigation }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [isTeacherOrStudent, setIsTeacherOrStudent] = useState(null);

  useEffect(() => {
    // TODO: check AsyncStorage for form/image, setStep and prefill if exists
  }, []);

  const completeInitialSignup = () => {
    // TODO: store form, image to AsyncStorage
    // TODO: call API for registration
    // - create user account
    // - add to mailchimp mailing list
    setStep(2);
  };

  const getSlide = () => {
    switch (step) {
      case 0:
        return <Welcome setStep={() => setStep(1)} />;
      case 1:
        return (
          <ProfileInfo
            form={form}
            setForm={setForm}
            image={image}
            setImage={setImage}
            completeInitialSignup={completeInitialSignup}
          />
        );
      case 2:
        return (
          <ProfileType
            setIsTeacherOrStudent={(choice) => {
              setIsTeacherOrStudent(choice);
              setStep(3);
            }}
          />
        );
      case 3:
        return (
          <Styles
            profileType={isTeacherOrStudent}
            completeSetup={() => {
              switch (isTeacherOrStudent) {
                case "student":
                // TODO: add styles to profile via api
                // navigation.navigate("Home")
                case "teacher":
                // TODO: add styles to profile via api
                // setStep(4)
              }
            }}
          />
        );
      case 4:
      // TODO: Teachers Only, Bio, Links, Tagline,
      case 5:
      // TODO: Teachers Only, Submit Certification Information
    }
  };

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
        {[0, 1, 2, 3].map((i) => (
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
