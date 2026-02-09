
export type Section = 'home' | 'details' | 'blockchain' | 'marketplace';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'ongoing' | 'upcoming';
}

export interface NFTMetadata {
  id: number;
  name: string;
  rarity: string;
  image: string;
  price?: number;
  owner?: string;
  lore?: string;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
}
