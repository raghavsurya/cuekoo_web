import type { Reminder } from "../types/reminder";

export const mockReminders: Reminder[] = [
  {
    id: "1",
    name: "Doctor Appointment",
    location: {lat: 37.7749, lng: -122.4194},
    notes: "Bring medical reports",
    eventDate: "2025-10-20T09:00:00Z",
    remindFrequency: "weekly",
    active: true,
  },
  {
    id: "2",
    name: "Project Meeting",
    location: {lat: 37.7749, lng: -122.4194},
    notes: "Discuss project roadmap",
    eventDate: "2025-10-18T15:30:00Z",
    remindFrequency: "Once",
    active: false,
  },
  {
    id: "3",
    name: "Gym Session",
    location: {lat: 37.7749, lng: -122.4194},
    notes: "Discuss gym session plan",
    eventDate: "2025-10-18T15:30:00Z",
    remindFrequency: "Once",
    active: false,
  },
  {
    id: "4",
    name: "Lunch Meeting",
    location: {lat: 37.7749, lng: -122.4194},
    notes: "Discuss Client roadmap",
    eventDate: "2025-10-18T15:30:00Z",
    remindFrequency: "Once",
    active: false
  },
  {
    id: "5",
    name: "Date with Abi",
    location: {lat: 37.7749, lng: -122.4194},
    notes: "Discuss relationship",
    eventDate: "2025-10-18T15:30:00Z",
    remindFrequency: "Once",
    active: false,
  },
];
