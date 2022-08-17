import {Gesture} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export function usePan() {
  const start = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue({x: 0, y: 0});

  const isPressed = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offset.value.x},
      {translateY: offset.value.y},
      {scale: withSpring(isPressed.value ? 0.7 : 1)},
    ],
    backgroundColor: isPressed.value ? 'purple' : 'green',
  }));

  const gesture = Gesture.Pan()
    .onBegin(() => (isPressed.value = true))
    .onFinalize(() => (isPressed.value = false))
    .onUpdate(event => {
      offset.value = {
        x: event.translationX + start.value.x,
        y: event.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  return {gesture, animatedStyles};
}
