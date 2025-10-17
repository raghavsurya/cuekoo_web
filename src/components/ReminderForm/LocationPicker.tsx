import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import type { ReminderLocation } from "../../types/reminder";

interface Props {
  value: ReminderLocation | null;
  onChange: (loc: ReminderLocation) => void;
}

function LocationMarker({ onChange }: { onChange: (loc: ReminderLocation) => void }) {
  const [position, setPosition] = useState<ReminderLocation | null>(null);

  useMapEvents({
    click(e) {
      const loc = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(loc);
      onChange(loc);
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
}

export default function LocationPicker({ value, onChange }: Props) {
  return (
    <div className="w-full h-64 border rounded-xl overflow-hidden">
      <MapContainer center={[37.7749, -122.4194]} zoom={4} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onChange={onChange} />
      </MapContainer>

      {value && (
        <p className="text-sm mt-2 text-gray-600 font-mono">
          Selected: {value.lat.toFixed(4)}, {value.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}
