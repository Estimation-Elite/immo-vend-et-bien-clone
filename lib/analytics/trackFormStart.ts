import { pushDataLayerEvent } from "./dataLayer";

export function trackFormStart() {
  pushDataLayerEvent({
    event: "form_start",
  });
}
