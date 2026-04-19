export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-6 text-white font-bold tracking-widest uppercase text-sm">Loading Course Details...</p>
    </div>
  );
}
