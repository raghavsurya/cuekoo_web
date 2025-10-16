import { render, screen } from "@testing-library/react";
import ReminderRow from "../components/ReminderRow";
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

describe("ReminderRow", () => {
  it("renders reminder name and location", () => {
    render(
      <table>
        <tbody>
          <ReminderRow reminder={mockReminder} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Doctor Appointment")).toBeInTheDocument();
    expect(screen.getByText(/37.7749/)).toBeInTheDocument();
    expect(screen.getByText(/-122.4194/)).toBeInTheDocument();
  });

  it("renders 'No location' when location is null", () => {
    render(
      <table>
        <tbody>
          <ReminderRow reminder={{ ...mockReminder, location: null }} />
        </tbody>
      </table>
    );

    expect(screen.getByText(/No location/i)).toBeInTheDocument();
  });
});
