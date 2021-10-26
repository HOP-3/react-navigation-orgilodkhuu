import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native';

import Link from '../components/Link';

import {RootStackParamList} from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

const About = ({navigation}: Props) => {
  return (
    <View>
      <Link onPress={() => navigation.navigate('Home')} text="Go to Home" />
    </View>
  );
};

export default About;
