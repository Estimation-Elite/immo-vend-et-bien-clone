import { pushDataLayerEvent } from "./dataLayer";

export function trackRdvCtaClick(location: string) {
  pushDataLayerEvent({
    event: "rdv_cta_click",
    location,
  });
}
