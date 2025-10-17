import { useState } from "react";
import type { Reminder } from "../types/reminder";
import { mockReminders } from "../data/mockReminders";
import Layout from "../components/Dashboard/Layout";
import Header from "../components/Dashboard/Header";
import ReminderTable from "../components/Dashboard/ReminderTable";

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