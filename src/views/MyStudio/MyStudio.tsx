import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import CreateClassModal from "./CreateClassModal";
import ClassList from "../../components/ClassList";

import { getClasses } from "../../firebase/classes";

function MyStudio({ profile, classes, setClasses }) {
  const [createClassModalShown, setCreateClassModalShown] = useState(false);
  return (
    <ScrollView>
      <ClassList teacherId={profile.uid} />

      <CreateClassModal
        visible={createClassModalShown}
        close={() => setCreateClassModalShown(false)}
        profile={profile}
      />

      <>
        <TouchableOpacity onPress={() => setCreateClassModalShown(true)}>
          <Text>+</Text>
        </TouchableOpacity>
      </>
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
