export interface ReminderLocation {
  lat: number;
  lng: number;
}
export interface Reminder {
    id: string;
    name: string;
    location: ReminderLocation | null;
    notes: string;
    remindFrequency: "minutes" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "Once" ;
    eventDate: string; // ISO string // ISO string
    active: boolean;
}

export interface ReminderInput {
    name: string;
    location: ReminderLocation | null;
    notes: string;
    remindFrequency: "minutes" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "Once" ;
    eventDate: Date; // ISO string
}  