import React, { useContext, useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

import CreateClassModal from "../MyStudio/CreateClassModal";
import Class from "./Class";

import { getClasses } from "../firebase/classes";
import * as types from "../redux/types";

function ClassList({ teacherId = null, classes, setClasses, profile }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClassesFromFirebase = () =>
      getClasses({
        teacherId,
      }).then((classes) => {
        setClasses(classes);
        setLoading(false);
      });

    loadClassesFromFirebase();
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <Text>Loading Classes...</Text>
      ) : classes.length ? (
        classes.map((yogaClass, i) => <Class key={i} yogaClass={yogaClass} />)
      ) : (
        <Text>No classes meet your search criteria</Text>
      )}
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return {
    classes: state.classes,
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setClasses: (classes) =>
      dispatch({ type: types.SET_CLASSES, payload: classes }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);
