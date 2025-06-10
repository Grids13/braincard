import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolate,
    Extrapolate,
    useDerivedValue,
    runOnJS,
} from 'react-native-reanimated';

export default function FlipCard({
    isFlipped,
    direction = 'y',
    duration = 500,
    cardStyle,
    RegularContent,
    FlippedContent,
}) {
    const isDirectionX = direction === 'x';
    const animatedValue = useSharedValue(0);

    const [frontPointerEvents, setFrontPointerEvents] = useState('auto');
    const [backPointerEvents, setBackPointerEvents] = useState('none');

    useEffect(() => {
        animatedValue.value = withTiming(isFlipped ? 1 : 0, { duration });
    }, [isFlipped]);

    const progress = useDerivedValue(() => {
        if (animatedValue.value < 0.5) {
            runOnJS(setFrontPointerEvents)('auto');
            runOnJS(setBackPointerEvents)('none');
        } else {
            runOnJS(setFrontPointerEvents)('none');
            runOnJS(setBackPointerEvents)('auto');
        }
    });

    const frontStyle = useAnimatedStyle(() => {
        const rotate = interpolate(animatedValue.value, [0, 1], [0, 180]);
        return {
            transform: [
                { perspective: 1000 },
                isDirectionX ? { rotateX: `${rotate}deg` } : { rotateY: `${rotate}deg` },
            ],
            opacity: interpolate(animatedValue.value, [0, 0.5], [1, 0], Extrapolate.CLAMP),
        };
    });

    const backStyle = useAnimatedStyle(() => {
        const rotate = interpolate(animatedValue.value, [0, 1], [180, 360]);
        return {
            position: 'absolute',
            top: 0,
            transform: [
                { perspective: 1000 },
                isDirectionX ? { rotateX: `${rotate}deg` } : { rotateY: `${rotate}deg` },
            ],
            opacity: interpolate(animatedValue.value, [0.5, 1], [0, 1], Extrapolate.CLAMP),
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.card, cardStyle, frontStyle]}
                pointerEvents={frontPointerEvents}
            >
                {RegularContent}
            </Animated.View>
            <Animated.View
                style={[styles.card, cardStyle, backStyle]}
                pointerEvents={backPointerEvents}
            >
                {FlippedContent}
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    card: {
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

