"use client";
import ErrorRoot from "@/app/error";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return <ErrorRoot error={error} reset={reset} />;
}
