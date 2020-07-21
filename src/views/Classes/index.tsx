import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import CreateClassModal from "./CreateClassModal";
import Class from "./Class";

export default function ClassesScreen() {
  const [createClassModalShown, setCreateClassModalShown] = useState(false);

  // TODO: get classes/teacher info from graphql
  const teachers = [
    {
      id: "001",
      photo: "placeholder.com/150",
      firstName: "Austin",
      lastName: "Witherow",
    },
  ];

  const classes = [
    {
      id: "001",
      teacherId: "001",
      title: "Beginner Hatha Yoga Flow",
      tagline:
        "Hatha Yoga with Vinyasa, Breathwork and Meditation, for all levels!",
      description:
        "This simple beginner hatha yoga flow is for anyone who is new to yoga, or even advanced students who want to solidify the fundamentals. This class focuses on classical hatha yoga postures, vinyasa flow elements, breathwork and meditation.",
      tags: ["hatha", "vinyasa", "breathwork", "meditation", "beginner"],
      location: "https://www.zoomexamplelink.com/HE034hpld094",
      time: new Date(),
    },
  ];

  return (
    <ScrollView>
      {classes.map((yogaClass) => (
        <Class
          yogaClass={yogaClass}
          teacher={teachers.filter(
            (teacher) => yogaClass.teacherId === teacher.id
          )}
        />
      ))}
      <>
        <TouchableOpacity onPress={() => setCreateClassModalShown(true)}>
          <Text>+</Text>
        </TouchableOpacity>

        <CreateClassModal
          visible={createClassModalShown}
          close={() => setCreateClassModalShown(false)}
        />
      </>
    </ScrollView>
  );
}
