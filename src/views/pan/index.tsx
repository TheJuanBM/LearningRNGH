import React from 'react';
import {View} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {usePan} from './hooks';
import {styles} from './styles';

export function Pan() {
  const {gesture, animatedStyles} = usePan();

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, animatedStyles]} />
      </GestureDetector>
    </View>
  );
}
