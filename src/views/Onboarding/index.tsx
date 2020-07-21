import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";

import { Welcome, ProfileType, ProfileInfo, Styles, Bio } from "./Steps";
import { updateProfile, uploadProfilePhoto } from "../../firebase/profile";

function Wizard({ navigation, profile }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  const [photo, setPhoto] = useState(null);

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
            image={photo}
            setImage={setPhoto}
            completeInitialSignup={() => {
              uploadProfilePhoto(photo, id);
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
              setForm({
                ...form,
                profileType: choice,
              });
              setStep(3);
            }}
          />
        );
      case 3:
        return (
          <Styles
            profileType={form.profileType}
            nextStep={async (favs) => {
              const { id } = profile;
              switch (form.profileType) {
                case "student":
                  await updateProfile(id, {
                    ...form,
                    styles: favs,
                    setupComplete: true,
                  });
                  navigation.reset({ index: 0, routes: [{ name: "Home" }] });
                case "teacher":
                  setForm({ ...form, styles: favs });
                  navigation.setOptions({ title: "Complete Your Bio" });
                  setStep(4);
              }
            }}
          />
        );
      case 4:
        if (form.profileType === "student") {
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }
        const { id } = profile;
        return (
          <Bio
            nextStep={async (bio) => {
              await updateProfile(id, {
                ...form,
                ...bio,
                setupComplete: true,
              });
              navigation.reset({ index: 0, routes: [{ name: "Home" }] });
              // TODO: later... setStep(5); instead
            }}
          />
        );
      // case 5:
      // TODO: Teachers Only, Submit Certification Information
    }
  };

  const stepLengths =
    form.profileType === "teacher" ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3];

  return (
    <View>
      <View>{getSlide()}</View>
      <View>
        <TouchableOpacity
          disabled={step === 0}
          onPress={() => setStep(step - 1)}
        >
          <AntDesign
            name="left"
            size={24}
            color={step === 0 ? "gray" : "black"}
          />
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

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}
export default connect(mapStateToProps)(Wizard);
