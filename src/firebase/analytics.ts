import * as Analytics from "expo-firebase-analytics";

export default function logEvent(type, data) {
  Analytics.logEvent(type, data);
}
