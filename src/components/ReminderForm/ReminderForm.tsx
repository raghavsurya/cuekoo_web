import { useState, useEffect } from "react";
import type { ReminderInput, ReminderLocation } from "../../types/reminder";
import LocationPicker from "./LocationPicker";
import DateTimeInput from "./DateTimeInput";
import FrequencySelect from "./FrequencySelect";
import NotesInput from "./NotesInput";
import { useNavigate } from "react-router-dom";
import type { Reminder } from "../../types/reminder";

import "leaflet/dist/leaflet.css";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    existingReminder?: Reminder;
    reminderState: "create" | "edit";
}

export default function ReminderForm({ existingReminder, reminderState }: Props) {
    const [form, setForm] = useState<ReminderInput>({
        name: "",
        eventDate: new Date(),
        remindFrequency: "hourly",
        notes: "",
        location: null,
    });

    // If we're editing an existing reminder, initialize the form from it.
    useEffect(() => {
        if (reminderState === "edit" && existingReminder) {
            setForm({
                name: existingReminder.name,
                eventDate: existingReminder.eventDate ? new Date(existingReminder.eventDate) : new Date(),
                remindFrequency: existingReminder.remindFrequency,
                notes: existingReminder.notes,
                location: existingReminder.location,
            });
        }
    }, [existingReminder, reminderState]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (field: keyof ReminderInput, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // POST to Elixir API
        setLoading(true);
        try {
            let url, method = "";
            if (reminderState === "edit") {
                url = "http://localhost:4000/api/reminders/update";
                method = "PUT";
            } else {
                url = "http://localhost:4000/api/reminders/new";
                method = "POST";
            }
            //TODO: configure host URL via env variable: 
            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: existingReminder?.id,
                    name: form.name,
                    notes: form.notes,
                    event_scheduled_at: form.eventDate.toISOString(),
                    remind_frequency: form.remindFrequency.toLowerCase(),
                    is_active: true,
                    location: form.location,
                }),
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`API Error: ${res.status} - ${errText}`);
            }

            const data = await res.json();
            console.log("✅ Reminder created:", data);

            navigate("/"); // Go back to dashboard after success
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to create reminder");
        } finally {
            setLoading(false);
        }
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

            <DateTimeInput
                value={form.eventDate}
                onChange={(date) => handleChange("eventDate", date)}
            />
            <FrequencySelect
                frequency={form.remindFrequency}
                onChange={(value) => handleChange("remindFrequency", value)}
            />
            <NotesInput value={form.notes} onChange={(text) => handleChange("notes", text)} />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <LocationPicker value={form.location} onChange={(loc: ReminderLocation) => handleChange("location", loc)} />
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                disabled={loading}
            >
                {loading ? "Saving..." : reminderState == "edit" ? "Save" : "Create"}
            </button>
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </form>
    );
}
