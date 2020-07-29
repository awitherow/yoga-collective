import React, { useState } from "react";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { getClasses } from "../../firebase/classes";

import CreateClassModal from "./CreateClassModal";
import ClassList from "../../components/ClassList";

function MyStudio({ profile, classes, setClasses }) {
  const [createClassModalShown, setCreateClassModalShown] = useState(false);
  return (
    <ScrollView>
      <View>
        <Text>My Classes</Text>
        <TouchableOpacity onPress={() => setCreateClassModalShown(true)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <ClassList teacherId={profile.uid} />

      <CreateClassModal
        visible={createClassModalShown}
        close={() => setCreateClassModalShown(false)}
        profile={profile}
      />

      <Text>My Students</Text>
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    classes: state.classes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setClasses: (classes) =>
      dispatch({ type: types.SET_CLASSES, payload: classes }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStudio);
