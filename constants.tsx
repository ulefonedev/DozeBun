
import React from 'react';
import { TeamMember, RoadmapItem } from './types';

export const TEAM: TeamMember[] = [
  {
    name: "Sleepy Alex",
    role: "Lead Developer",
    bio: "The one who forgot to set the alarm. Expert in Rust and high-speed Solana protocols.",
    image: "https://picsum.photos/seed/alex/400/400"
  },
  {
    name: "Dreamy Elena",
    role: "Creative Director",
    bio: "Visualizing the dreams the rabbit had. 3D artist specializing in cute but chaotic aesthetics.",
    image: "https://picsum.photos/seed/elena/400/400"
  },
  {
    name: "Wide-Awake Marcus",
    role: "Blockchain Strategist",
    bio: "Always awake. Tokenomics mastermind behind the $DOZE ecosystem stability.",
    image: "https://picsum.photos/seed/marcus/400/400"
  },
  {
    name: "Napping Sophia",
    role: "Community Manager",
    bio: "Building a community so strong we can all take a nap together eventually.",
    image: "https://picsum.photos/seed/sophia/400/400"
  },
  {
    name: "Yawning David",
    role: "Marketing Head",
    bio: "Marketing genius who woke up just in time to lead the $DOZE revolution.",
    image: "https://picsum.photos/seed/david/400/400"
  }
];

export const ROADMAP: RoadmapItem[] = [
  {
    quarter: "Q1 2026",
    title: "The Great Awakening",
    description: "Launch of the $DOZE token on Pump.fun and opening of the Genesis DozeBun minting phase.",
    status: "ongoing"
  },
  {
    quarter: "Q2 2026",
    title: "Burrow Marketplace",
    description: "Deployment of the native marketplace and initiation of the Rabbit DAO for community-led decisions.",
    status: "upcoming"
  },
  {
    quarter: "Q3 2026",
    title: "Ecosystem Expansion",
    description: "Strategic partnerships with Solana's top DeFi protocols and the launch of Doze Labs for creators.",
    status: "upcoming"
  },
  {
    quarter: "Q4 2026",
    title: "Global Reach",
    description: "Real-world merch drops and integration of DozeBun into major metaverse platforms.",
    status: "upcoming"
  }
];

export const SOCIAL_LINKS = [
  { name: 'Twitter', icon: 'https://img.icons8.com/ios-filled/50/ffffff/twitterx.png', url: '#' },
  { name: 'Instagram', icon: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png', url: '#' },
  { name: 'Discord', icon: 'https://img.icons8.com/ios-filled/50/ffffff/discord-logo.png', url: '#' },
  { name: 'Telegram', icon: 'https://img.icons8.com/ios-filled/50/ffffff/telegram-app.png', url: '#' },
  { name: 'Facebook', icon: 'https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png', url: '#' },
];
