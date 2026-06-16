import { pushDataLayerEvent } from "./dataLayer";

export function trackAppointmentScheduled() {
  pushDataLayerEvent({
    event: "appointment_scheduled",
  });
}
