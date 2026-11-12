import { useEvent } from 'expo';
import { Image } from 'expo-image';
import { usePathname } from 'expo-router';
import { useVideoPlayer, VideoView, type VideoPlayer } from 'expo-video';
import { useGT } from 'gt-react-native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { firstPaint, type InteractionState } from '@/components/ui';
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
  const gt = useGT();

  return (
    <View style={{ position: 'absolute', left: 12, bottom: 12, flexDirection: 'row', gap: 8 }}>
      <OverlayButton
        label={isPlaying ? gt('Pause') : gt('Play')}
        accessibilityLabel={isPlaying ? gt('Pause video') : gt('Play video')}
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
        label={muted ? gt('Sound on') : gt('Sound off')}
        accessibilityLabel={muted ? gt('Turn sound on') : gt('Turn sound off')}
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

/**
 * The crew's own video, muted autoplay with overlaid controls.
 * `edge` says which sides run off the screen, so those corners stay square.
 */
export function HeroVideo({ edge = 'none' }: { edge?: 'none' | 'right' | 'both' }) {
  const pathname = usePathname();
  const gt = useGT();

  const player = useVideoPlayer(Site.heroVideoUrl, (video) => {
    video.loop = true;
    video.muted = true;
    video.volume = 0.8;
    // Progress events tell us when real frames are on screen (see the poster below).
    video.timeUpdateEventInterval = 0.25;
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

  // Show a still frame until the video is visibly playing. In-app browsers
  // (Instagram, Facebook) block autoplay and the 244 MB file loads slowly on
  // mobile, so without this visitors see an empty black box.
  const { currentTime } = useEvent(player, 'timeUpdate', { currentTime: 0, currentLiveTimestamp: null, currentOffsetFromLive: null, bufferedPosition: 0 });
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started && currentTime > 0) {
      setStarted(true);
    }
  }, [currentTime, started]);

  const leftRadius = edge === 'both' ? 0 : 4;
  const rightRadius = edge === 'none' ? 4 : 0;

  return (
    // An aspect ratio, not a measured height, so the frame is the right size before any JavaScript runs.
    // The source file is a 3:2 picture with black bars baked into a 16:9 file, so a 3:2 frame
    // with cover fit crops exactly the bars and nothing else.
    <View
      {...firstPaint('hero-frame')}
      style={{
        width: '100%',
        aspectRatio: 3 / 2,
        backgroundColor: '#000',
        borderTopLeftRadius: leftRadius,
        borderBottomLeftRadius: leftRadius,
        borderTopRightRadius: rightRadius,
        borderBottomRightRadius: rightRadius,
        overflow: 'hidden',
      }}>
      {/* A hair of zoom hides any sliver of bar at the edges. The transform sits on a
          wrapper because VideoView drops it on web. */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: [{ scale: 1.02 }] }}>
        <VideoView player={player} style={{ width: '100%', height: '100%' }} contentFit="cover" nativeControls={false} playsInline />
        {!started ? (
          <Image
            source={require('../../assets/images/hero-poster.jpg')}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            contentFit="cover"
            accessibilityLabel={gt("The Dynamic Roofing crew in front of a client's home")}
          />
        ) : null}
      </View>
      <Controls player={player} />
    </View>
  );
}
