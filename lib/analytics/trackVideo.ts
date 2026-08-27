import { pushDataLayerEvent } from "./dataLayer";

export function trackVideoPlay(page: string) {
  pushDataLayerEvent({
    event: "video_play",
    page,
  });
}

export function trackVideoComplete(page: string) {
  pushDataLayerEvent({
    event: "video_complete",
    page,
  });
}
