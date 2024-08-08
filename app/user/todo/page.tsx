import AppBar from "@/components/Appbar";
import CreateTodo from "@/components/Todocard";
import Alltodos from "@/components/Alltodos";

export default function Page() {
    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <AppBar />
            <main className="p-6">
                <CreateTodo />
                <Alltodos />
            </main>
        </div>
    );
}
