import { useState, useEffect } from "react";
import type { Reminder } from "../types/reminder";
import Layout from "../components/Dashboard/Layout";
import Header from "../components/Dashboard/Header";
import ReminderTable from "../components/Dashboard/ReminderTable";

export default function Dashboard() {

    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/reminders", {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        setError("Unauthorized. Please log in.");
                        return;
                    }
                    throw new Error("Failed to fetch reminders");
                }
                const data = await response.json();
                setReminders(data["reminders"]);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchReminders();
    }, []);
    if (loading) return <div>Loading reminders...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                <Header />
                <ReminderTable reminders={reminders} />
            </div>
        </Layout>
    );
}   