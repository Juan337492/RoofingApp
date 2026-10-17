import { useEvent } from 'expo';
import { usePathname } from 'expo-router';
import { useVideoPlayer, VideoView, type VideoPlayer } from 'expo-video';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { InteractionState } from '@/components/ui';
import { Site } from '@/constants/site';
import { Colors, Fonts } from '@/constants/theme';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

function OverlayButton({ label, accessibilityLabel, onPress }: { label: string; accessibilityLabel: string; onPress: () => void }) {
  return (
    <Pressable
      role="button"
      onPress={onPress}
      aria-label={accessibilityLabel}
      style={(state: InteractionState) => [
        {
          backgroundColor: state.hovered || state.pressed ? '#000000CC' : '#00000099',
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 4,
        },
        state.focused && { outlineColor: Colors.orange, outlineStyle: 'solid', outlineWidth: 3, outlineOffset: 2 },
      ]}>
      <Text style={{ color: Colors.white, fontFamily: Fonts.bodySemiBold, fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

function Controls({ player }: { player: VideoPlayer }) {
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { muted } = useEvent(player, 'mutedChange', { muted: player.muted });

  return (
    <View style={{ position: 'absolute', left: 12, bottom: 12, flexDirection: 'row', gap: 8 }}>
      <OverlayButton
        label={isPlaying ? 'Pause' : 'Play'}
        accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
        onPress={() => {
          if (isPlaying) {
            player.pause();
            return;
          }
          // Pressing Play is a deliberate choice to watch, so play with sound.
          player.muted = false;
          player.play();
        }}
      />
      <OverlayButton
        label={muted ? 'Sound on' : 'Sound off'}
        accessibilityLabel={muted ? 'Turn sound on' : 'Turn sound off'}
        onPress={() => {
          player.muted = !muted;
          if (muted && !isPlaying) {
            player.play();
          }
        }}
      />
    </View>
  );
}

/** The crew's own video in a 16:9 frame, muted autoplay with overlaid controls. */
export function HeroVideo() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);

  const player = useVideoPlayer(Site.heroVideoUrl, (video) => {
    video.loop = true;
    video.muted = true;
    video.volume = 0.8;
    if (!prefersReducedMotion()) {
      video.play();
    }
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

  // Explicit height from measured width: static web rendering can report a
  // zero width on first load, so fall back to a phone-sized frame.
  const height = (width || 390) * (9 / 16);

  return (
    <View
      onLayout={(event) => {
        const next = Math.round(event.nativeEvent.layout.width);
        if (next && next !== width) {
          setWidth(next);
        }
      }}
      style={{ width: '100%', height, backgroundColor: '#000', borderRadius: 4, overflow: 'hidden' }}>
      {/* The source file is pillarboxed (black bars baked in); zoom just enough to crop them.
          The transform sits on a wrapper because VideoView drops it on web. */}
      <View style={{ width: '100%', height: '100%', transform: [{ scale: 1.19 }] }}>
        <VideoView player={player} style={{ width: '100%', height: '100%' }} contentFit="cover" nativeControls={false} playsInline />
      </View>
      <Controls player={player} />
    </View>
  );
}
