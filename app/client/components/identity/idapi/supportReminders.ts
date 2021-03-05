import * as Sentry from "@sentry/browser";
import { ConsentOption, ConsentOptionType } from "../models";

interface ReminderStatusApiResponse {
  recurringStatus: "NotSet" | "Active" | "Cancelled";
  recurringReminderCode: string;
}

let recurringReminderCode = "";

const REMINDERS_STATUS_ENDPOINT = "/api/reminders/status";
const CANCEL_REMINDERS_ENDPOINT = "/api/reminders/cancel";
const REACTIVATE_REMINDERS_ENDPOINT = "/api/reminders/reactivate";

const getConsent = (isActive: boolean): ConsentOption => ({
  id: "support_reminder",
  description:
    "We will invite you to make a contribution in support of Guardian journalism, using the cadence you picked when you last signed up.",
  name: "Contribution reminder emails",
  type: ConsentOptionType.SUPPORT_REMINDER,
  subscribed: isActive
});

export const read = async (): Promise<ConsentOption[]> => {
  const response = await fetch(REMINDERS_STATUS_ENDPOINT);
  const reminderStatus = (await response.json()) as ReminderStatusApiResponse;
  if (reminderStatus.recurringStatus === "NotSet") {
    return [];
  }

  recurringReminderCode = reminderStatus.recurringReminderCode;

  return [getConsent(reminderStatus.recurringStatus === "Active")];
};

export const update = async (id: string, subscribed: boolean = true) => {
  if (!recurringReminderCode) {
    Sentry.captureMessage(`No recurringReminderCode to update consent: ${id}`);
    return;
  }

  if (!subscribed) {
    await cancelReminder(recurringReminderCode);
  } else {
    await reactivateReminder(recurringReminderCode);
  }
};

export const cancelReminder = (reminderCode: string) =>
  fetch(CANCEL_REMINDERS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reminderCode })
  });

const reactivateReminder = (reminderCode: string) =>
  fetch(REACTIVATE_REMINDERS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reminderCode })
  });
