import { BigNumberish } from "ethers"

export interface Hat {
  details?: string
  maxSupply?: number
  supply?: number
  eligibility?: string
  toggle?: string
  imageURI?: string
  lastHatId?: number
  active?: boolean
}

export interface HatCreate {
  admin: number
  details: string
  maxSupply: BigNumberish
  eligibility: string
  toggle: string
  imageURI: string
}
