
export interface Delegation {
  userName: string
  userRole: string
}

export interface DelegateApplyPayload {
  mainnetAddress: string
  starknetAddress: string
  description: string
  ens?: string
  twitter?: string
  link?: string
  video?: string
}
