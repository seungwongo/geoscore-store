import fs from "fs";

// Load .env.local into process.env (standalone scripts don't get Next's loader).
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

async function main() {
  const { sendCustomerEmail, sendNotifyEmail } = await import("../src/lib/email");

  const to = process.env.NOTIFY_EMAIL;
  if (!to) throw new Error("NOTIFY_EMAIL not set");

  // A fake download id is fine for testing the template/delivery (link-only).
  const fakeId = "00000000-0000-4000-8000-000000000000";

  console.log(`→ sending customer email (ko, link-only) to ${to} ...`);
  await sendCustomerEmail({ to, locale: "ko", downloadId: fakeId });
  console.log("  ✓ customer email sent");

  console.log(`→ sending notify email to ${to} ...`);
  await sendNotifyEmail({
    customerEmail: to,
    txn: "txn_email_test",
    locale: "ko",
    customerEmailSent: true,
  });
  console.log("  ✓ notify email sent");

  console.log("\nAll emails dispatched. Check the inbox for both messages.");
}

main().catch((err) => {
  console.error("EMAIL TEST FAILED:", err);
  process.exit(1);
});
