import { useState } from "react";
import { Button } from '@headlessui/react'
import { Description, Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'
import type { Reminder } from "../../types/reminder";
import ReminderStatusBadge from "./ReminderStatusBadge";
import ReminderForm from "../ReminderForm/ReminderForm";


interface Props {
    reminder: Reminder;
}

export default function ReminderRow({ reminder }: Props) {
    let [isOpen, setIsOpen] = useState(false)
    const { lat, lng } = reminder.location || {};

    return (
        <tr className="border-t hover:bg-gray-50">
            <td className="px-6 py-3 font-medium text-gray-900">{reminder.name}</td>
            <td className="px-6 py-3">
                {lat && lng ? (
                    <span className="text-gray-700">
                        {lat.toFixed(4)}, {lng.toFixed(4)}
                    </span>
                ) : (
                    <span className="text-gray-400 italic">No location</span>
                )}
            </td>
            <td className="px-6 py-3">{reminder.notes}</td>
            <td className="px-6 py-3">
                {new Date(reminder.eventDate).toLocaleString()}
            </td>
            <td className="px-6 py-3">{reminder.remindFrequency}</td>
            <td className="px-6 py-3 text-center">
                <ReminderStatusBadge active={reminder.active} />
            </td>
            <td className="px-6 py-3 text-right text-gray-400">
                <Button onClick={() => setIsOpen(true)} className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                    Edit
                </Button>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                     <DialogBackdrop transition className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0" />
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel transition className="max-w-lg space-y-4 bg-white p-12 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0 rounded-lg shadow-lg">
                           Edit Reminder: <DialogTitle className="font-bold">
                                {` ${reminder.name}`}
                            </DialogTitle>
                           <ReminderForm existingReminder={reminder} reminderState="edit"  />
                            <div className="flex gap-4">
                                <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700" onClick={() => setIsOpen(false)}>Cancel</Button>
                                <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700" onClick={() => setIsOpen(false)}>Deactivate</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </td>
            {/* <td className="px-16 py-13">
        <Dropdown />
      </td> */}
        </tr>
    );
}