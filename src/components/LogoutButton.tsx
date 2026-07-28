"use client";

export default function LogoutButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="admin-link"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
        window.location.reload();
      }}
    >
      {label}
    </button>
  );
}
