import { pushDataLayerEvent } from "./dataLayer";

export interface LeadContext {
  property_type?: string;
  sale_timeline?: string;
  city?: string;
}

export function trackLeadSubmitted(context: LeadContext = {}) {
  pushDataLayerEvent({
    event: "lead_submitted",
    property_type: context.property_type,
    sale_timeline: context.sale_timeline,
    city: context.city,
  });
}
