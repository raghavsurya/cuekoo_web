export interface ReminderLocation {
  lat: number;
  lng: number;
}
export interface Reminder {
    id: string;
    name: string;
    location: ReminderLocation | null;
    notes: string;
    remindFrequency: string;
    eventDate: string; // ISO string
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    active: boolean;
}