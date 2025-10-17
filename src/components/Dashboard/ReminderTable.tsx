import type { Reminder } from "../../types/reminder";
import ReminderRow from "./ReminderRow";

interface Props {
  reminders: Reminder[];
}

export default function ReminderTable({ reminders }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow bg-white">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Location</th>
            <th className="px-6 py-3">Notes</th>
            <th className="px-6 py-3">Event Scheduled</th>
            <th className="px-6 py-3">Remind Frequency</th>
            <th className="px-6 py-3 text-center">Active</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder) => (
            <ReminderRow key={reminder.id} reminder={reminder} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
