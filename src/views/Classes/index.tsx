import React, { useContext, useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

import CreateClassModal from "./CreateClassModal";
import Class from "./Class";

import { getClasses } from "../../firebase/classes";
import * as types from "../../redux/types";

function ClassesScreen({ classes, teacherId, teacherName, setClasses }) {
  const [createClassModalShown, setCreateClassModalShown] = useState(false);

  const loadClassesFromFirebase = () =>
    getClasses().then((classes) => {
      console.log(classes);
      setClasses(classes);
    });

  useEffect(() => {
    if (!classes.length) {
      loadClassesFromFirebase();
    }
  }, []);

  console.log(classes);

  return (
    <ScrollView>
      {classes.length ? (
        classes.map((yogaClass) => <Class yogaClass={yogaClass} />)
      ) : (
        <Text>Loading Classes...</Text>
      )}
      <>
        <TouchableOpacity onPress={() => setCreateClassModalShown(true)}>
          <Text>+</Text>
        </TouchableOpacity>

        <CreateClassModal
          visible={createClassModalShown}
          close={() => setCreateClassModalShown(false)}
          teacherId={teacherId}
          teacherName={teacherName}
        />
      </>
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return {
    teacherId: state.profile.uid,
    teacherName: state.profile.name,
    classes: state.classes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setClasses: (classes) =>
      dispatch({ type: types.SET_CLASSES, payload: classes }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesScreen);
