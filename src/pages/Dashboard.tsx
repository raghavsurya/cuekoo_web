import { useState } from "react";
import type { Reminder } from "../types/reminder";
import { mockReminders } from "../data/mockReminders";
import Layout from "../components/Layout";
import Header from "../components/Header";
import ReminderTable from "../components/ReminderTable";

export default function Dashboard() {

    const [reminders] = useState<Reminder[]>(mockReminders);
    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                <Header />
                <ReminderTable reminders={reminders} />
            </div>
        </Layout>
    );
}   