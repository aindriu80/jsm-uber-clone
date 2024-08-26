import { Redirect } from "expo-router";
import { Text } from "react-native";

const Home = () => {
  return <Redirect href="/(auth)/welcome" />;
  // return <Text>Test</Text>;
};

export default Home;
