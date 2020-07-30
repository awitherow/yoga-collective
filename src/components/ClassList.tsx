import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";

import CreateClassModal from "../MyStudio/CreateClassModal";
import Class from "./Class";

import { getClasses } from "../firebase/classes";
import * as types from "../redux/types";
import { defaultFormatDate } from "../helpers/time";

function ClassList({ teacherId = null, classes, setClasses, profile }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getClasses({ teacherId }).then((classes) => {
      setClasses(classes);
      setRefreshing(false);
    });
  }, []);

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
    <View>
      {loading ? (
        <Text>Loading Classes...</Text>
      ) : classes.length ? (
        <FlatList
          data={classes}
          keyExtractor={(item) =>
            `${item.title}-${item.teacherId}-${item.startTime}`
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => <Class yogaClass={item} />}
        />
      ) : (
        <Text>No classes meet your search criteria</Text>
      )}
    </View>
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
