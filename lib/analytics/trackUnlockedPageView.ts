import { pushDataLayerEvent } from "./dataLayer";

export function trackUnlockedPageView() {
  pushDataLayerEvent({
    event: "unlocked_page_view",
  });
}
