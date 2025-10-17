import { useState } from "react";
import type { ReminderInput, ReminderLocation } from "../../types/reminder";
import LocationPicker from "./LocationPicker";
import DateTimeInput from "./DateTimeInput";
import FrequencySelect from "./FrequencySelect";
import NotesInput from "./NotesInput";

import "leaflet/dist/leaflet.css";
import "react-datepicker/dist/react-datepicker.css";

export default function ReminderForm() {
  const [form, setForm] = useState<ReminderInput>({
    name: "",
    eventDate: new Date(),
    remindFrequency: "hourly",
    notes: "",
    location: null,
  });

  const handleChange = (field: keyof ReminderInput, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reminder created:", form);
    // later: POST to Elixir API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="border rounded-lg p-2 w-full"
          required
        />
      </div>

      <DateTimeInput value={form.eventDate} onChange={(date) => handleChange("eventDate", date)} />
      <FrequencySelect
        frequency={form.remindFrequency}
        
        onChange={(value) =>
          handleChange("remindFrequency", value)
        }
      />
      <NotesInput value={form.notes} onChange={(text) => handleChange("notes", text)} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <LocationPicker value={form.location} onChange={(loc: ReminderLocation) => handleChange("location", loc)} />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
      >
        Create Reminder
      </button>
    </form>
  );
}
