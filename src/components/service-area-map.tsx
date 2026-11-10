import { Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { locations } from '@/data/locations';

/** Town centers, keyed by location slug. */
const coordinates: Record<string, { lat: number; lon: number }> = {
  dallas: { lat: 33.9237, lon: -84.8408 },
  'powder-springs': { lat: 33.8595, lon: -84.6838 },
  marietta: { lat: 33.9526, lon: -84.5499 },
  smyrna: { lat: 33.884, lon: -84.5144 },
  douglasville: { lat: 33.7515, lon: -84.7477 },
  austell: { lat: 33.8126, lon: -84.6344 },
  acworth: { lat: 34.0659, lon: -84.6769 },
  kennesaw: { lat: 34.0234, lon: -84.6155 },
};

/** For orientation only: we do not list Atlanta as a service area. */
const atlanta = { lat: 33.749, lon: -84.388 };

/** The two interstates locals navigate by, as rough straight runs. */
const roads: { name: string; label: { lat: number; lon: number }; path: { lat: number; lon: number }[] }[] = [
  {
    name: 'I-75',
    label: { lat: 33.845, lon: -84.435 },
    path: [atlanta, { lat: 33.95, lon: -84.515 }, { lat: 34.11, lon: -84.735 }],
  },
  {
    name: 'I-20',
    label: { lat: 33.762, lon: -84.875 },
    path: [atlanta, { lat: 33.722, lon: -84.92 }],
  },
];

const bounds = { west: -84.92, east: -84.33, south: 33.7, north: 34.11 };
/** Width over height, with longitude shortened for this latitude so distances look right. */
const ASPECT = ((bounds.east - bounds.west) * Math.cos((33.9 * Math.PI) / 180)) / (bounds.north - bounds.south);

const project = ({ lat, lon }: { lat: number; lon: number }) => ({
  x: (lon - bounds.west) / (bounds.east - bounds.west),
  y: (bounds.north - lat) / (bounds.north - bounds.south),
});

const percent = (n: number): `${number}%` => `${Math.round(n * 10000) / 100}%`;

/** Labels sit right of their dot unless that would run into a neighbor. */
const labelLeft = new Set(['powder-springs']);

function Road({ from, to }: { from: { lat: number; lon: number }; to: { lat: number; lon: number } }) {
  const a = project(from);
  const b = project(to);
  // Work in units of map width so the angle is right for a non-square map.
  const dx = b.x - a.x;
  const dy = (b.y - a.y) / ASPECT;
  const length = Math.hypot(dx, dy);
  return (
    <View
      style={{
        position: 'absolute',
        left: percent((a.x + b.x) / 2 - length / 2),
        top: percent((a.y + b.y) / 2),
        width: percent(length),
        height: 2,
        marginTop: -1,
        backgroundColor: '#34383D',
        transform: [{ rotate: `${(Math.atan2(dy, dx) * 180) / Math.PI}deg` }],
      }}
    />
  );
}

function Place({ at, label, home, muted, left }: { at: { lat: number; lon: number }; label: string; home?: boolean; muted?: boolean; left?: boolean }) {
  const { x, y } = project(at);
  const dot = home ? 16 : 10;
  return (
    <View style={{ position: 'absolute', left: percent(x), top: percent(y), width: 0, height: 0 }}>
      <View
        style={{
          position: 'absolute',
          left: -dot / 2,
          top: -dot / 2,
          width: dot,
          height: dot,
          borderRadius: dot / 2,
          backgroundColor: muted ? 'transparent' : Colors.orange,
          borderWidth: muted ? 2 : 0,
          borderColor: Colors.granule,
        }}
      />
      {/* A fixed width, wider than any name: the zero-size anchor gives the text nothing to size against. */}
      <Text
        style={{
          position: 'absolute',
          top: -12,
          width: 150,
          ...(left ? { right: dot / 2 + 7, textAlign: 'right' } : { left: dot / 2 + 7 }),
          fontFamily: home ? Fonts.heading : Fonts.headingMedium,
          fontSize: home ? 21 : 17,
          lineHeight: 24,
          letterSpacing: 0.3,
          color: muted ? Colors.granule : Colors.white,
        }}>
        {label}
      </Text>
    </View>
  );
}

/**
 * The eight towns we serve, placed by their real coordinates. Decorative: the
 * town links beside it are what people and screen readers use.
 */
export function ServiceAreaMap() {
  return (
    <View
      aria-hidden
      style={{
        width: '100%',
        aspectRatio: ASPECT,
        backgroundColor: Colors.surface,
        borderRadius: 4,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
      {roads.map((road) => road.path.slice(1).map((to, i) => <Road key={`${road.name}-${i}`} from={road.path[i]} to={to} />))}
      {roads.map((road) => {
        const { x, y } = project(road.label);
        return (
          <Text
            key={road.name}
            style={{ position: 'absolute', left: percent(x), top: percent(y), fontFamily: Fonts.bodyMedium, fontSize: 12, lineHeight: 16, color: '#7C838A' }}>
            {road.name}
          </Text>
        );
      })}
      <Place at={atlanta} label="Atlanta" muted left />
      {locations.map((location) =>
        coordinates[location.slug] ? (
          <Place
            key={location.slug}
            at={coordinates[location.slug]}
            label={location.city}
            home={location.slug === 'dallas'}
            left={labelLeft.has(location.slug)}
          />
        ) : null
      )}
    </View>
  );
}
