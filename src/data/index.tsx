import React from "react";
import { DailDropType } from "../components/Betting/DailyDrop";
import { LeaderItemType } from "../components/Betting/LeaderItem";
import { DetailedLeaderItemType } from "../components/Betting/ListItem";
import { BorderMenuItemProps } from "../components/Common/Menus/BorderMenuItem";
import { MenuItemType } from "../components/Common/Menus/GeneralMenu";
import { SliderType } from "../components/Explore/BannerSlide";
import { QuestBoxType } from "../pages/Quests/QuestBox";

export const LEADERBOARD_SUB_MENUITEMS: BorderMenuItemProps[] = [
  {
    name: "Match On",
    active: true,
    type: "large",
  },
  {
    name: "Live Bets (soon)",
    active: false,
    type: "large",
  },
  {
    name: "Guilds (soon)",
    active: false,
    type: "large",
  },
];

export const QUEST_LEADERBOARD_SUB_MENUITEMS: BorderMenuItemProps[] = [
  {
    name: "Today",
    active: true,
    type: "small",
  },
  {
    name: "This week",
    active: false,
    type: "small",
  },
  {
    name: "All Time",
    active: false,
    type: "small",
  },
];

export const DAILY_DROPS: DailDropType[] = [
  {
    bgPanel: "/images/betting/bp1.png",
    curPrice: 100000,
    unit: "SEI",
    title: "Tetrisk",
    openType: true,
    slots: 35,
    curSlots: 35,
    entryPrice: 0.5,
    endTime: "00:02:52",
  },
  {
    bgPanel: "/images/betting/bp2.png",
    curPrice: 100,
    unit: "FABLE",
    title: "Fable",
    openType: true,
    slots: 35,
    curSlots: 35,
    entryPrice: 0.5,
    endTime: "00:02:52",
  },
  {
    bgPanel: "/images/betting/bp1.png",
    curPrice: 100000,
    unit: "SEI",
    title: "Tetrisk",
    openType: true,
    slots: 35,
    curSlots: 35,
    entryPrice: 0.5,
    endTime: "00:02:52",
  },
  {
    bgPanel: "/images/betting/bp2.png",
    curPrice: 100,
    unit: "FABLE",
    title: "Fable",
    openType: true,
    slots: 35,
    curSlots: 35,
    entryPrice: 0.5,
    endTime: "00:02:52",
  },
];

export const SUB_MENUITEMS: BorderMenuItemProps[] = [
  {
    name: "Events",
    active: true,
    type: "small",
  },
  {
    name: "Leaderboard",
    active: false,
    type: "small",
  },
];

export const SEASON_MENUITEMS: MenuItemType[] = [
  {
    title: "Season1",
    lockFlag: false,
  },
  {
    title: "Season2",
    lockFlag: true,
  },
];

export const LEADERBOARD_MENUITEMS: MenuItemType[] = [
  {
    title: "1/4",
    lockFlag: false,
  },
  {
    title: "2/4",
    lockFlag: false,
  },
  {
    title: "3/4",
    lockFlag: false,
  },
  {
    title: "4/4",
    lockFlag: false,
  },
];

export const GAME_MENU_ITEMS: MenuItemType[] = [
  {
    title: "All Matches",
    lockFlag: false,
  },
  {
    title: "P2P",
    lockFlag: false,
  },
  {
    title: "P2Pool",
    lockFlag: false,
  },
];

export const DETAILED_LEADER_ITEMS: DetailedLeaderItemType[] = [
  {
    date: "28 Aug",
    time: "01:58",
    walletAddress: "Monke2",
    avatarUrl: "/images/betting/bepplee.png",
    score: 1244,
    amount: "155Sei",
    betName: "Ranked #1414",
    rank: 10,
    gameAvatar: "/images/betting/tetris.png",
    timeAge: "15 seconds ago",
  },
  {
    date: "28 Aug",
    time: "01:58",
    walletAddress: "Monke2",
    avatarUrl: "/images/betting/bepplee.png",
    score: 1244,
    amount: "155Sei",
    betName: "Ranked #1414",
    rank: 10,
    gameAvatar: "/images/betting/tetris.png",
    timeAge: "15 seconds ago",
  },
  {
    date: "28 Aug",
    time: "01:58",
    walletAddress: "Monke2",
    avatarUrl: "/images/betting/bepplee.png",
    score: 1244,
    amount: "155Sei",
    betName: "Ranked #1414",
    rank: 10,
    gameAvatar: "/images/betting/tetris.png",
    timeAge: "15 seconds ago",
  },
  {
    date: "28 Aug",
    time: "01:58",
    walletAddress: "Monke2",
    avatarUrl: "/images/betting/bepplee.png",
    score: 1244,
    amount: "155Sei",
    betName: "Ranked #1414",
    rank: 10,
    gameAvatar: "/images/betting/tetris.png",
    timeAge: "15 seconds ago",
  },
  {
    date: "28 Aug",
    time: "01:58",
    walletAddress: "Monke2",
    avatarUrl: "/images/betting/bepplee.png",
    score: 1244,
    amount: "155Sei",
    betName: "Ranked #1414",
    rank: 10,
    gameAvatar: "/images/betting/tetris.png",
    timeAge: "15 seconds ago",
  },
  {
    date: "28 Aug",
    time: "01:58",
    walletAddress: "Monke2",
    avatarUrl: "/images/betting/bepplee.png",
    score: 1244,
    amount: "155Sei",
    betName: "Ranked #1414",
    rank: 10,
    gameAvatar: "/images/betting/tetris.png",
    timeAge: "15 seconds ago",
  },
  {
    date: "28 Aug",
    time: "01:58",
    walletAddress: "Monke2",
    avatarUrl: "/images/betting/bepplee.png",
    score: 1244,
    amount: "155Sei",
    betName: "Ranked #1414",
    rank: 10,
    gameAvatar: "/images/betting/tetris.png",
    timeAge: "15 seconds ago",
  },
];

export const LEADER_SUB_ITEMS: LeaderItemType[] = [
  {
    avatarUrl: "/images/betting/avatars/avatar2.png",
    name: "Gigia",
    score: 6.0,
    type: false,
    no: 2.25,
  },
  {
    avatarUrl: "/images/betting/avatars/avatar2.png",
    name: "Gigia",
    score: 3.2,
    type: false,
    no: 2.25,
  },
  {
    avatarUrl: "/images/betting/avatars/avatar3.png",
    name: "Gigia",
    score: 2.31,
    type: false,
    no: 2.25,
  },
  {
    avatarUrl: "/images/betting/avatars/general.png",
    name: "Gigia",
    score: 12341,
    type: false,
    no: 4,
  },
  {
    avatarUrl: "/images/betting/avatars/general.png",
    name: "Gigia",
    score: 4141,
    type: false,
    no: 5,
  },
  {
    avatarUrl: "/images/betting/avatars/general.png",
    name: "Gigia",
    score: 12341,
    type: false,
    no: 6,
  },
];

export const LEADER_ITEMS: LeaderItemType[] = [
  {
    avatarUrl: "/images/betting/avatars/avatar2.png",
    name: "Gigia",
    score: 24242,
    type: true,
    no: 1,
  },
  {
    avatarUrl: "/images/betting/avatars/avatar2.png",
    name: "Gigia",
    score: 12341,
    type: true,
    no: 2,
  },
  {
    avatarUrl: "/images/betting/avatars/avatar3.png",
    name: "Gigia",
    score: 4141,
    type: true,
    no: 3,
  },
  {
    avatarUrl: "/images/betting/avatars/general.png",
    name: "Gigia",
    score: 12341,
    type: true,
    no: 4,
  },
  {
    avatarUrl: "/images/betting/avatars/general.png",
    name: "Gigia",
    score: 4141,
    type: true,
    no: 5,
  },
  {
    avatarUrl: "/images/betting/avatars/general.png",
    name: "Gigia",
    score: 12341,
    type: true,
    no: 6,
  },
];

export const WEEK_GAMES = [
  {
    bgImg: "/images/betting/week/game1.png",
  },
  {
    bgImg: "/images/betting/week/game2.png",
  },
  {
    bgImg: "/images/betting/week/game3.png",
  },
  {
    bgImg: "/images/betting/week/game4.png",
  },
];

export const HeaderMenuTitles = [
  {
    name: "Explore",
    link: "/",
  },
  {
    name: "Quests",
    link: "/quests",
  },
  // {
  //     name: 'Tetrisk',
  //     link: '/subbetting',
  // },
  // {
  //     name: 'Games',
  //     link: 'Games',
  // },
  // {
  //     name: 'Events',
  //     link: 'Events',
  // },
  // {
  //     name: 'Games',
  //     link: 'games',
  // },
  // {
  //     name: 'Quests',
  //     link: 'quests',
  // }
];

export const EXPLORE_BANNER_SLIDES: SliderType[] = [
  {
    title: "WorldWideWebb",
    backgroundImage: "/images/community/backs/webb.jpeg",
    content: (
      <div>
        Worldwide Webb is an interoperable pixel art MMORPG metaverse game
        giving utility to popular NFT projects. The game uses NFTs for in-game
        avatars, pets, lands, NFT Items , and quests.
      </div>
    ),
    button: "Launch Now",
    path: "https://webb.game/",
  },
  {
    title: "DoubleJump",
    backgroundImage: "/images/community/backs/DoubleJump.png",
    content: (
      <div>
        Double Jump is the first race-to-finish, platform-royale game on Solana!
        Race in a mad dash against other Jumpers across the world to reach the
        finish line first.
      </div>
    ),
    button: "Launch Now",
    path: "https://theportal.to/",
  },
  {
    title: "AaveGotchi",
    backgroundImage: "/images/community/backs/Aave.gif",
    content: (
      <div>
        A yield-generating NFT that doubles as a digital pet. Take care of them,
        and they’ll take care of you ^_^
      </div>
    ),
    button: "Launch Now",
    path: "https://ev.io",
  },
  {
    title: "OnCyber",
    backgroundImage: "/images/community/backs/Oncyber.png",
    content: (
      <div>
        A multiverse for creators, oncyber is the easiest way for artists and
        collectors to show their digital assets (NFTs) in fully immersive
        experiences (3D/VR), for free. Holding an item from any of these
        collections allows you to use it as a 3D exhibition space.
      </div>
    ),
    button: "Launch Now",
    path: "https://miniroyale.io",
  },
  {
    title: "Decentraland",
    backgroundImage: "/images/community/backs/Dece.png",
    content: (
      <div>
        Decentraland is an Ethereum blockchain-powered virtual world, developed
        and owned by its users, who can create, experience, and monetize content
        and applications. Join a growing community of virtual world inhabitants.
      </div>
    ),
    button: "Launch Now",
    path: "https://home.panzerdogs.io/",
  },
];

export const SOLARITY_QUESTS: QuestBoxType[] = [
  {
    title: "Discord",
    subTitle: "Join the DAO",
    description: "Play Head Bone today to earn more Mana!",
    avatar: "/images/quests/avatars/discord.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/solarity-discord.png",
  },
  {
    title: "Mint Room",
    subTitle: "Mint Room",
    description: "Play Head Bone today to earn more Mana!",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
  },
  {
    title: "Extension",
    subTitle: "Games. Everywhere",
    description: "Play Head Bone today to earn more Mana!",
    avatar: "/images/quests/avatars/extension.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/extension.png",
  },
  {
    title: "Prompt",
    subTitle: "Get inspired",
    description: "Play Head Bone today to earn more Mana!",
    avatar: "/images/quests/avatars/prompt.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/prompt.png",
  },
  {
    // active: true,
    title: (
      <span>
        Claim your <span className="text-primary">WL!</span>
      </span>
    ),
    subTitle: <span className="text-[#D886FF]">Congrats!</span>,
    description: "You won a room, customize it now!",
    avatar: "/images/quests/avatars/discord.png",
    isAvatar: true,
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/final.png",
  },
];
