import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/90 py-8 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-10">
        <div className="space-y-3">
          <Link href="/" className="text-lg font-bold text-foreground">
            VibeCode Media
          </Link>
          <p className="max-w-md leading-6">
            Discover, share, and celebrate creative projects built by developers from everywhere.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/projects/new" className="hover:text-foreground">
            Submit
          </Link>
          <Link href="/login" className="hover:text-foreground">
            Login
          </Link>
          <Link href="/register" className="hover:text-foreground">
            Register
          </Link>
        </div>
      </div>
    </footer>
  );
}
