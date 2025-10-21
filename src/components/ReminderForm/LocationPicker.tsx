import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import type { ReminderLocation } from "../../types/reminder";
import L from "leaflet";

interface Props {
  value: ReminderLocation | null;
  onChange: (loc: ReminderLocation) => void;
}

interface SearchResult {
    lat: string;
    lon: string;
    display_name: string;
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

function MapUpdater({ coords }: { coords: ReminderLocation | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 13);
    }
  }, [coords]);
  return null;
}

export default function LocationPicker({ value, onChange }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<ReminderLocation | null>(value);
    const [showResults, setShowResults] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);


     // 🔎 Debounced search
  const handleSearch = (query: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&addressdetails=1&limit=5`
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 500); // ⏳ 0.5s debounce
  };

  const handleSelectResult = (result: SearchResult) => {
    const loc = {lat: parseFloat(result.lat), lng: parseFloat(result.lon)};
    setSelected(loc);
    onChange(loc);
    setSearchTerm(result.display_name);
    setResults([]);
    setShowResults(false);
  }

  // 🔒 Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Location
      </label>

      <div ref={searchRef} className="relative mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
            handleSearch(e.target.value);
          }}
          placeholder="Search for a place..."
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Results dropdown */}
        {showResults && (results.length > 0 || loading) && (
          <ul className="relative z-10 bg-white border rounded-lg mt-1 w-full max-h-56 overflow-y-auto shadow">
            {loading && (
              <li className="p-3 text-gray-500 text-sm text-center">Searching...</li>
            )}
            {!loading &&
              results.map((r, i) => (
                <li
                  key={i}
                  onClick={() => handleSelectResult(r)}
                  className="p-2 hover:bg-blue-50 cursor-pointer text-sm border-b last:border-0"
                >
                  {r.display_name}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Leaflet map */}
      <div className="w-full h-64 border rounded-xl overflow-hidden">
        <MapContainer
          center={selected ? [selected.lat, selected.lng] : [37.7749, -122.4194]}
          zoom={selected ? 13 : 4}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater coords={selected} />
          <LocationMarker onChange={(loc) => setSelected(loc)} />
          {selected && (
            <Marker
              position={[selected.lat, selected.lng]}
              icon={L.icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              })}
            />
          )}
        </MapContainer>
      </div>

      {/* Selected coordinates */}
      {selected && (
        <p className="text-sm mt-2 text-gray-600 font-mono">
          Selected: {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}
