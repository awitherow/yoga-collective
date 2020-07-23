import React, { useState } from "react";
import {
  Modal,
  TouchableHighlight,
  TextInput,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { yogaStyles } from "../../helpers/strings";
import { createClass } from "../../firebase/classes";

export default function CreateClassModal({
  visible,
  close,
  teacherId,
  teacherName,
}) {
  const today = new Date();
  const todayPlusOneHour = new Date();
  todayPlusOneHour.setHours(todayPlusOneHour.getHours() + 1);

  const defaultClassInfo = {
    title: "",
    tagline: "",
    description: "",
    location: "",
    startTime: today,
    endTime: todayPlusOneHour,
    styles: [],
  };

  const [classInfo, setClassInfo] = useState(defaultClassInfo);

  const defaultDateTimeOptions = {
    mode: "date",
    shown: false,
  };
  // START DateTimePicker handlers
  const [startDateTimeOptions, setStartDateTimeOptions] = useState(
    defaultDateTimeOptions
  );

  // END DateTimePicker handlers
  const [endDateTimeOptions, setEndDateTimeOptions] = useState(
    defaultDateTimeOptions
  );

  const saveClass = () => {
    createClass(teacherId, teacherName, classInfo);
    setClassInfo(defaultClassInfo);
    close();
  };

  return (
    <Modal
      hardwareAccelerated
      presentationStyle="fullScreen"
      animationType="fade"
      visible={visible}
      style={{
        background: "white",
      }}
    >
      <SafeAreaView>
        <View>
          <TouchableHighlight onPress={close}>
            <Text>X</Text>
          </TouchableHighlight>
          <View>
            <Text>Add a Class!</Text>
            <ScrollView>
              <TextInput
                placeholder="Title"
                value={classInfo.title}
                onChangeText={(t) =>
                  setClassInfo({
                    ...classInfo,
                    title: t,
                  })
                }
              />
              <TextInput
                placeholder="Tagline"
                value={classInfo.tagline}
                onChangeText={(t) =>
                  setClassInfo({
                    ...classInfo,
                    tagline: t,
                  })
                }
              />
              <TextInput
                placeholder="Description"
                value={classInfo.description}
                onChangeText={(t) =>
                  setClassInfo({
                    ...classInfo,
                    description: t,
                  })
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setStartDateTimeOptions({
                    ...startDateTimeOptions,
                    shown: true,
                  })
                }
              >
                <Text>When does the class begin?</Text>
              </TouchableOpacity>
              {startDateTimeOptions.shown && (
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={classInfo.startTime}
                    mode={startDateTimeOptions.mode}
                    minimumDate={today}
                    minuteInterval={10}
                    is24Hour={true}
                    display="default"
                    onChange={(e, selectedDate) => {
                      const currentDate = selectedDate || classInfo.startTime;
                      setClassInfo({
                        ...classInfo,
                        startTime: currentDate,
                      });
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (startDateTimeOptions.mode === "date") {
                        setStartDateTimeOptions({
                          ...startDateTimeOptions,
                          mode: "time",
                        });
                      } else {
                        setStartDateTimeOptions(defaultDateTimeOptions);
                      }
                    }}
                  >
                    <Text>
                      {startDateTimeOptions.mode === "date"
                        ? "Confirm Date"
                        : "Confirm Time"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                onPress={() =>
                  setEndDateTimeOptions({
                    ...endDateTimeOptions,
                    shown: true,
                  })
                }
              >
                <Text>When does the class end?</Text>
              </TouchableOpacity>
              {endDateTimeOptions.shown && (
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={classInfo.endTime}
                    mode={endDateTimeOptions.mode}
                    minimumDate={today}
                    minuteInterval={10}
                    is24Hour={true}
                    display="default"
                    onChange={(e, selectedDate) => {
                      const currentDate = selectedDate || classInfo.endTime;
                      setClassInfo({
                        ...classInfo,
                        endTime: currentDate,
                      });
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (endDateTimeOptions.mode === "date") {
                        setEndDateTimeOptions({
                          ...endDateTimeOptions,
                          mode: "time",
                        });
                      } else {
                        setEndDateTimeOptions(defaultDateTimeOptions);
                      }
                    }}
                  >
                    <Text>
                      {endDateTimeOptions.mode === "date"
                        ? "Confirm Date"
                        : "Confirm Time"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TextInput
                placeholder="Location (web link or address)"
                value={classInfo.location}
                onChangeText={(t) =>
                  setClassInfo({
                    ...classInfo,
                    location: t,
                  })
                }
              />
              <View>
                <Text>What styles does your class offer?</Text>
                <View>
                  {yogaStyles.map((classStyle, i) => (
                    <TouchableHighlight
                      key={i}
                      onPress={() =>
                        classInfo.styles.includes(classStyle)
                          ? setClassInfo({
                              ...classInfo,
                              styles: [
                                ...classInfo.styles.filter(
                                  (style) => style !== classStyle
                                ),
                              ],
                            })
                          : setClassInfo({
                              ...classInfo,
                              styles: [...classInfo.styles, classStyle],
                            })
                      }
                    >
                      <Text
                        style={{
                          fontWeight: classInfo.styles.includes(classStyle)
                            ? "bold"
                            : "normal",
                        }}
                      >
                        {classStyle}
                      </Text>
                    </TouchableHighlight>
                  ))}
                </View>
              </View>
            </ScrollView>
            <TouchableHighlight onPress={saveClass}>
              <Text>Save Class to Schedule</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
