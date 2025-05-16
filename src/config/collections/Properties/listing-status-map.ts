export const listingStatusMap = {
  forsale: {
    label: 'For Sale',
    color: 'bg-status-forsale',
    foreground: 'text-status-forsale-foreground',
  },
  pending: {
    label: 'Offer Pending',
    color: 'bg-status-pending',
    foreground: 'text-status-pending-foreground',
  },
  contract: {
    label: 'Under Contract',
    color: 'bg-status-contract',
    foreground: 'text-status-contract-foreground',
  },
  contingent: {
    label: 'Contingent',
    color: 'bg-status-contingent',
    foreground: 'text-status-contingent-foreground',
  },
  sold: { label: 'Sold', color: 'bg-status-sold', foreground: 'text-status-sold-foreground' },
  offmarket: {
    label: 'Off Market',
    color: 'bg-status-offmarket',
    foreground: 'text-status-offmarket-foreground',
  },
  notforsale: {
    label: 'Not For Sale',
    color: 'bg-status-notforsale',
    foreground: 'text-status-notforsale-foreground',
  },
} as const

export type ListingStatus = keyof typeof listingStatusMap
export type ListingStatusOption = {
  label: string
  value: ListingStatus
}

export const listingStatusOptions: ListingStatusOption[] = Object.entries(listingStatusMap).map(
  ([key, value]) => ({
    label: value.label,
    value: key as ListingStatus,
  }),
)
