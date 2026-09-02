import { useEvent } from 'expo';
import { usePathname } from 'expo-router';
import { useVideoPlayer, VideoView, type VideoPlayer } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { PanResponder, Pressable, Text, View } from 'react-native';

import { Site } from '@/constants/site';
import { Colors, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';

function PlayPauseButton({ player }: { player: VideoPlayer }) {
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <Pressable
      onPress={() => (isPlaying ? player.pause() : player.play())}
      accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
      style={({ pressed }) => ({
        backgroundColor: pressed ? Colors.orangeDark : Colors.orange,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 6,
        minWidth: 96,
        alignItems: 'center',
      })}>
      <Text style={{ color: Colors.white, fontFamily: Fonts.headingMedium, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
        {isPlaying ? 'Pause' : 'Play'}
      </Text>
    </Pressable>
  );
}

function VolumeSlider({ player }: { player: VideoPlayer }) {
  const [muted, setMuted] = useState(true);
  const [level, setLevel] = useState(0);
  const levelRef = useRef(0);
  const lastAudible = useRef(0.8);
  const trackWidth = useRef(1);
  const startX = useRef(0);

  const applyVolume = (next: number) => {
    const clamped = Math.max(0, Math.min(1, next));
    levelRef.current = clamped;
    setLevel(clamped);
    player.volume = clamped;
    const nowMuted = clamped < 0.01;
    player.muted = nowMuted;
    setMuted(nowMuted);
    if (!nowMuted) {
      lastAudible.current = clamped;
    }
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) >= Math.abs(gesture.dy),
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (event) => {
        startX.current = event.nativeEvent.locationX;
        applyVolume(event.nativeEvent.locationX / trackWidth.current);
      },
      onPanResponderMove: (_, gesture) => {
        applyVolume((startX.current + gesture.dx) / trackWidth.current);
      },
    })
  ).current;

  return (
    <>
      <Pressable
        onPress={() => {
          if (muted) {
            applyVolume(lastAudible.current || 0.8);
          } else {
            lastAudible.current = levelRef.current || 0.8;
            applyVolume(0);
          }
        }}
        accessibilityLabel={muted ? 'Unmute video' : 'Mute video'}
        style={({ pressed }) => ({
          borderWidth: 1.5,
          borderColor: Colors.orange,
          backgroundColor: pressed ? Colors.surfaceAlt : Colors.surface,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 6,
        })}>
        <Text style={{ color: Colors.white, fontFamily: Fonts.headingMedium, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
          {muted ? 'Unmute' : 'Mute'}
        </Text>
      </Pressable>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexGrow: 1, minWidth: 180 }}>
        <Text style={{ color: Colors.textSecondary, fontFamily: Fonts.headingMedium, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
          Volume
        </Text>
        <View
          onLayout={(event) => {
            trackWidth.current = Math.max(1, event.nativeEvent.layout.width);
          }}
          {...pan.panHandlers}
          accessibilityRole="adjustable"
          accessibilityLabel="Volume"
          style={{ flex: 1, height: 44, justifyContent: 'center' }}>
          <View style={{ height: 6, borderRadius: 3, backgroundColor: Colors.border, overflow: 'hidden' }}>
            <View style={{ width: `${level * 100}%`, height: 6, backgroundColor: Colors.orange }} />
          </View>
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: `${level * 100}%`,
              marginLeft: -10,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: Colors.orange,
              borderWidth: 2,
              borderColor: Colors.white,
            }}
          />
        </View>
      </View>
    </>
  );
}

export function HeroVideo() {
  const pathname = usePathname();
  const [containerWidth, setContainerWidth] = useState(0);
  // Keep the wrapper close to the video's native 16:9 ratio so desktop does
  // not crop the frame. Cap the height to keep the hero from taking over the
  // entire viewport on very wide displays.
  // Use a visible mobile-sized fallback until the container reports its real
  // width; static web rendering can report a zero window width on first load.
  const width = containerWidth || 390;
  const height = Math.min(width / (16 / 9), width < 640 ? 240 : 720);

  const player = useVideoPlayer(Site.heroVideoUrl, (video) => {
    video.loop = true;
    video.muted = true;
    video.volume = 0.8;
    video.play();
  });

  // Stop playback as soon as navigation leaves the home page or the browser
  // tab is hidden. The cleanup also covers native back gestures and unmounts
  // during stack transitions.
  useEffect(() => {
    const pause = () => player.pause();

    if (pathname !== '/') {
      pause();
    }

    let onVisibilityChange: (() => void) | undefined;
    if (typeof document !== 'undefined') {
      onVisibilityChange = () => {
        if (document.visibilityState !== 'visible') {
          pause();
        }
      };
      document.addEventListener('visibilitychange', onVisibilityChange);
    }

    return () => {
      if (onVisibilityChange && typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisibilityChange);
      }
      pause();
    };
  }, [pathname, player]);

  return (
    <View
      onLayout={(event) => {
        const nextWidth = Math.round(event.nativeEvent.layout.width);
        if (nextWidth && nextWidth !== containerWidth) {
          setContainerWidth(nextWidth);
        }
      }}
      style={{ width: '100%', backgroundColor: Colors.background }}>
      <View style={{ height, width: '100%', backgroundColor: '#000', overflow: 'hidden' }}>
        <VideoView player={player} style={{ width: '100%', height: '100%' }} contentFit="contain" nativeControls={false} playsInline />
      </View>
      <View
        style={{
          width: '100%',
          maxWidth: MaxContentWidth,
          alignSelf: 'center',
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.md,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: Spacing.md,
        }}>
        <PlayPauseButton player={player} />
        <VolumeSlider player={player} />
      </View>
    </View>
  );
}
