
import { Redirect } from 'expo-router';

export default function Index() {
  if (__DEV__) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
