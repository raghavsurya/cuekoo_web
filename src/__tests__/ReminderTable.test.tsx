import { render, screen } from "@testing-library/react";
import ReminderTable from "../components/Dashboard/ReminderTable";
import { mockReminders } from "../data/mockReminders";

describe("ReminderTable", () => {
  it("renders all reminders in the table", () => {
    render(<ReminderTable reminders={mockReminders} />);
    expect(screen.getByText("Doctor Appointment")).toBeInTheDocument();
    expect(screen.getByText("Project Meeting")).toBeInTheDocument();
  });
});
