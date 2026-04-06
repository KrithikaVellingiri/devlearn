import { supabase } from "@/lib/supabase";

interface Course {
  id: string;
  title: string;
  price: number;
  instructor: string;
}

export default async function Home() {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*");

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold text-red-600 mb-2">Error fetching courses</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{error.message}</p>
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded text-sm font-mono whitespace-pre-wrap">
          {JSON.stringify(error, null, 2)}
        </div>
      </main>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold mb-2">Courses</h1>
        <p className="text-zinc-600 dark:text-zinc-400">No courses found in the "courses" table.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Course List (Connection Test)</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course: Course) => (
          <li key={course.id} className="border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-1">
              <span className="font-medium">Instructor:</span> {course.instructor}
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-bold">
              ${course.price}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
