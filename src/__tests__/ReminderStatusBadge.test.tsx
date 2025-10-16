import { render, screen } from "@testing-library/react";
import ReminderStatusBadge from "../components/ReminderStatusBadge";
import type { Reminder } from "../types/reminder";

const mockReminder: Reminder = {
  id: 1,
  name: "Doctor Appointment",
  location: { lat: 37.7749, lng: -122.4194 },
  notes: "Bring medical reports",
  eventScheduledAt: "2025-10-20T09:00:00Z",
  remindFrequency: "Weekly",
  active: true,
};

describe("ReminderStatusBadge", () => {
  it("renders 'Active' badge for active reminders", () => {
    render(<ReminderStatusBadge active={true} />);
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toHaveClass("bg-green-100 text-green-800");
  })}); 