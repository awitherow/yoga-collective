import React, { useState } from "react";
import {
  Modal,
  TouchableHighlight,
  TextInput,
  ScrollView,
  View,
  Text,
} from "react-native";
import { yogaStyles } from "../../helpers/strings";

export default function CreateClassModal({ visible, close }) {
  const [classInfo, setClassInfo] = useState({
    title: "",
    tagline: "",
    description: "",
    location: "",
    date: "",
    time: "",
    styles: [],
  });

  const saveClass = () => {
    // TODO: save classes to database
    close();
  };

  return (
    <Modal
      hardwareAccelerated
      presentationStyle="overFullScreen"
      transparent
      animationType="fade"
      visible={visible}
    >
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
    </Modal>
  );
}
