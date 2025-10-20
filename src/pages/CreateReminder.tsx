import ReminderForm from "../components/ReminderForm/ReminderForm";

export default function CreateReminder() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create Reminder</h1>
      <ReminderForm existingReminder={undefined} reminderState="create" />
    </div>
  );
}
