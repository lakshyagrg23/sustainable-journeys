import Link from "next/link";

export default function WorkingPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-white text-gray-800">
      <div className="text-center px-6">
        <h1 className="text-2xl font-semibold">It&apos;s working</h1>
        <p className="mt-2 text-sm text-gray-600">Everything looks good.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
