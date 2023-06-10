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

[
  [0, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0],
];

export const QUESTIFY_QUESTS: QuestBoxType[] = [
  {
    index: 1,
    title: "Daily Login",
    subTitle: "Daily Login",
    description: "Login EveryDay",
    avatar: "/images/quests/avatars/discord.png",
    icon: "/images/wallets/xp.png",
    amount: 10,
    thumbnail: "/images/quests/solarity-quests/solarity-discord.png",
    fullDescription: "This is Daily Quest. Check and play everyday!!!",
    untilClaim: 1,
  },
  {
    index: 2,
    title: "Daily Steaker",
    subTitle: "x5 Login",
    description: "Login the site eacy days for 5 days Consecutively",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 50,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
    fullDescription:
      "Login the site eacy days for 5 days Consecutively. Try!!!",
    untilClaim: 5,
  },
  {
    index: 3,
    title: "x5 Deposit",
    subTitle: "x5 Deposit",
    description: "Deposit 5 times",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 50,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
    fullDescription:
      "Deposit more than 5 times, then you can claim your quests",
    untilClaim: 5,
  },

  {
    index: 4,
    title: "20 SEI Deposit",
    subTitle: "20sei Deposit",
    description: "Total amount of Deposit value should 20 sei",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 200,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
    fullDescription:
      "Total amount of deposit value should be 20 sei, then calim your big quest",
    untilClaim: 20,
  },
  {
    index: 5,
    title: "Daily Play",
    subTitle: "Daily Play",
    description: "Play Tetrisk everyday",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 20,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
    fullDescription: "Play the game everyday and you could claim your quests.",
    untilClaim: 1,
  },
  {
    index: 6,
    title: "5 Consecutive days Play",
    subTitle: "x5 Days play",
    description: "Play Tetrisk for 5 days consecutively",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
    fullDescription:
      "Play the game 5 days consecutively to claim your quests. Try!!!",
    untilClaim: 5,
  },
  {
    index: 7,
    title: "x10 Play",
    subTitle: "x10 Play",
    description: "Play 10 times",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 50,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
    fullDescription:
      "Play the game more than 10 times to claim your quests. Try!!!",
    untilClaim: 10,
  },
  {
    index: 8,
    title: "Win Game",
    subTitle: "Win Game",
    description: "Win the Game for the first time",
    avatar: "/images/quests/avatars/extension.png",
    icon: "/images/wallets/xp.png",
    amount: 20,
    thumbnail: "/images/quests/solarity-quests/extension.png",
    fullDescription: "You could claim your quests after your first win. Try!!!",
    untilClaim: 1,
  },
  {
    index: 9,
    title: "x5 Win",
    subTitle: "x5 Win",
    description: "Win the Game 5 times",
    avatar: "/images/quests/avatars/prompt.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/prompt.png",
    fullDescription: "Win more than 5 times and cliam your quests. Try!!!",
    untilClaim: 5,
  },
  {
    index: 10,
    title: "Play Easy",
    subTitle: "Play Easy",
    description: "Play on easy level",
    avatar: "/images/quests/avatars/prompt.png",
    icon: "/images/wallets/xp.png",
    amount: 10,
    thumbnail: "/images/quests/solarity-quests/prompt.png",
    fullDescription:
      "Play the game on easy level and claim your quests. Try!!!",
    untilClaim: 1,
  },
  {
    index: 11,
    title: "Play Medium",
    subTitle: "Play Medium",
    description: "Play on medium level",
    avatar: "/images/quests/avatars/prompt.png",
    icon: "/images/wallets/xp.png",
    amount: 20,
    thumbnail: "/images/quests/solarity-quests/prompt.png",
    fullDescription:
      "Play the game on medium level and claim your quests. Try!!!",
    untilClaim: 1,
  },
  {
    index: 12,
    title: "Play Hard",
    subTitle: "Play Hard",
    description: "Play on hard level",
    avatar: "/images/quests/avatars/prompt.png",
    icon: "/images/wallets/xp.png",
    amount: 30,
    thumbnail: "/images/quests/solarity-quests/prompt.png",
    fullDescription:
      "Play the game on hard level and claim your quests. Try!!!",
    untilClaim: 1,
  },
];
