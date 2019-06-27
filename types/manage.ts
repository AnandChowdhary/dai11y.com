import { subscriptions, invoices, sources } from "stripe";
import { IdRow, Row, Paginated } from "./root";

export interface Organization extends IdRow {
  invitationDomain?: string;
  name?: string;
  stripeCustomerId?: string;
  username: string;
}

export interface Membership extends IdRow {
  organization: Organization;
}
export interface ApiKey extends Row {
  apiKey: string;
  secretKey: string;
  organizationId: number;
  ipRestrictions?: string;
  referrerRestrictions?: string;
}
export interface AuditWebpage extends IdRow {
  organizationId: number;
  url: string;
  repeatEvery: number;
}
export interface Audit extends IdRow {
  status: number;
  auditUrlId?: number;
  finalUrl: string;
  timing: number;
  scorePerformance: number;
  scoreAccessibility: number;
  scoreBestPractices: number;
  scoreSeo: number;
  scorePwa: number;
}

export interface Members extends Paginated {
  data: Membership[];
}
export interface Subscriptions extends Paginated {
  data: subscriptions.ISubscription[];
}
export interface Invoices extends Paginated {
  data: invoices.IInvoice[];
}
export interface Sources extends Paginated {
  data: sources.ISource[];
}
export interface ApiKeys extends Paginated {
  data: ApiKey[];
}
export interface AuditWebpages extends Paginated {
  data: AuditWebpage[];
}
export interface Audits extends Paginated {
  data: Audit[];
}

export interface Address {
  state: string;
  country: string;
  city: string;
  line1: string;
  line2?: string;
  postal_code: string;
}
export interface Billing {
  name?: string;
  email: string;
  phone?: string;
  address?: Address;
}

export interface OrganizationsKV {
  [index: string]: Organization;
}
export interface MembershipsKV {
  [index: string]: Members;
}
export interface BillingKV {
  [index: string]: Billing;
}
export interface SubscriptionsKV {
  [index: string]: Subscriptions;
}
export interface InvoicesKV {
  [index: string]: Invoices;
}
export interface SourcesKV {
  [index: string]: Sources;
}
export interface ApiKeysKV {
  [index: string]: ApiKeys;
}
export interface AuditWebpagesKV {
  [index: string]: AuditWebpages;
}
export interface AuditsKV {
  [index: string]: Audits;
}
export interface SingleSubscriptionKV {
  [index: string]: {
    [index: string]: subscriptions.ISubscription;
  };
}
export interface SingleInvoiceKV {
  [index: string]: {
    [index: string]: invoices.IInvoice;
  };
}
export interface SingleSourceKV {
  [index: string]: {
    [index: string]: sources.ISource;
  };
}
export interface SingleApiKeyKV {
  [index: string]: {
    [index: string]: ApiKey;
  };
}
export interface SingleAuditWebpageKV {
  [index: string]: {
    [index: string]: AuditWebpage;
  };
}
export interface SingleAuditKV {
  [index: string]: {
    [index: string]: AuditsKV;
  };
}

export interface RootState {
  membership?: Membership;
  organizations: OrganizationsKV;
  memberships: MembershipsKV;
  subscriptions: SubscriptionsKV;
  subscription: SingleSubscriptionKV;
  billing: BillingKV;
  invoices: InvoicesKV;
  invoice: SingleInvoiceKV;
  sources: SourcesKV;
  source: SingleSourceKV;
  apiKeys: ApiKeysKV;
  apiKey: SingleApiKeyKV;
  auditWebpages: AuditWebpagesKV;
  auditWebpage: SingleAuditWebpageKV;
  audits: AuditsKV;
  audit: SingleAuditKV;
  pricingPlans?: any;
  recentEvents?: any;
  isDownloading: boolean;
}

export const emptyOrganization: Organization = {
  id: 0,
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  name: "",
  username: "",
  invitationDomain: "",
  stripeCustomerId: ""
};
export const emptyPagination = {
  data: [],
  hasMore: false
};
export const emptyAddress: Address = {
  state: "",
  country: "",
  line1: "",
  city: "",
  postal_code: ""
};
export const emptyBilling: Billing = {
  email: "",
  address: emptyAddress
};
