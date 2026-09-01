/**
 * Estimated service durations, shown once a customer picks a service in a
 * booking form. These mirror the times printed on the Services.tsx cards —
 * keep the two in step, or the quoted time changes between browsing and
 * booking.
 *
 * The booking surfaces don't agree on service naming: BookingModal uses the
 * card titles ("Tyre Supply & Fitment"), while BookingForm uses shorter labels
 * ("Tyre Replacement"). Both spellings are mapped here so either form can look
 * a duration up.
 */
const SERVICE_DURATIONS: Record<string, string> = {
  // Names used by BookingModal — these match the Services.tsx card titles.
  "Tyre Supply & Fitment": "90 minutes",
  "Wheel Alignment": "45 minutes",
  "Puncture Repair": "30 minutes",
  "Wheel Balancing": "45 minutes",
  "Tyre Rotation": "30–40 minutes",
  "Free Tyre Safety Check": "10 minutes",

  // Aliases used by BookingForm's shorter dropdown labels.
  "Tyre Replacement": "90 minutes",
  "Safety Check": "10 minutes",
  "Flat Tyre Repair": "30 minutes",

  "4 Wheel Precision Alignment": "45 minutes",
  "Performance Tyre Fitment": "90 minutes",
  "Staggered Fitment": "90 minutes",
  "Run Flat Fitment": "90 minutes",
  "Spec Consultation": "15-20 minutes",

  "Family Tyre Safety Check": "15 minutes",
  "Free Safety Check": "10 minutes",
  "Ute & Van Tyre Fitment": "90 minutes",
  "Free Work Vehicle Check": "10 minutes",
};

/**
 * Returns the estimated duration for a service, or null when we don't publish
 * one (e.g. "Other", or a per-project service from projects.json). Callers
 * should render nothing rather than guess.
 */
export function getServiceDuration(service?: string): string | null {
  if (!service) return null;
  return SERVICE_DURATIONS[service] ?? null;
}
