import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {RootStackParamList} from './types';
import Link from '../components/Link';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  return (
    <View>
      <Link onPress={() => navigation.navigate('About')} text="Go to About" />
    </View>
  );
};

export default Home;
