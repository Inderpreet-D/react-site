type Project = {
  title: string
  description: string
  href: string
  hrefTitle: string
}

const projects: Project[] = [
  {
    title: 'This site',
    description:
      'This site is built using React along with NextJS for server-side rendering.',
    href: 'https://github.com/Inderpreet-D/react-site',
    hrefTitle: 'Source Code on Github'
  },
  {
    title: 'P2P Distributed File Sharing System',
    description:
      'A Bittorrent clone written in Java, able to anonymously transfer files between users in the system. Supports multi-threaded downloading and uploading, allowing for fast file transfer.',
    href: 'https://github.com/Inderpreet-D/CPSC559_Bittorrent',
    hrefTitle: 'Source Code on Github'
  },
  {
    title: 'Telestrations',
    description:
      'A web-based implementation of the Telestrations board game. Allows up to 8 players to play simultaneously. Makes use of NodeJS as a backend and uses Google’s Firebase realtime database; game logic written in JavaScript.',
    href: 'https://github.com/Inderpreet-D/Telestrations',
    hrefTitle: 'Source Code on Github'
  },
  // {
  //   title: 'MagicDB',
  //   description:
  //     'An inventory system built in React to keep track of your Magic the Gathering card collection.',
  //   href: '/mtgdb',
  //   hrefTitle: 'Go to MagicDB'
  // },

  {
    title: 'Treachery App',
    description:
      'A web app, built in React, for randomly assigning and viewing roles in the Treachery variant of EDH.',
    href: '/mtg/treachery',
    hrefTitle: 'Go to Treachery'
  },
  {
    title: 'NodeJS Chat',
    description: 'A multi-user chat app built using NodeJS as a backend.',
    href: 'https://github.com/Inderpreet-D/NodeJS-Chat',
    hrefTitle: 'Source Code on Github'
  },
  {
    title: 'Other Projects',
    description: 'All of my other project on Github.',
    href: 'https://github.com/Inderpreet-D?tab=repositories',
    hrefTitle: 'View My Repositories'
  },
  {
    title: 'Toad Village',
    description: 'Helps convert MTG decklists for use with Tabletop Simulator',
    href: '/mtg/toadvillage',
    hrefTitle: 'Go to Toad Village'
  },
  {
    title: 'Game of Life',
    description: "A simulation of Conway's Game of Life",
    href: '/games/gol',
    hrefTitle: 'Go to the Game of Life'
  },
  {
    title: 'Wordle',
    description:
      'A clone of the popular Wordle Game, but with a variable word length',
    href: '/games/wordle',
    hrefTitle: 'Play Wordle'
  },
  {
    title: 'Poetry',
    description: 'Randomly loads a poem from the /r/poetry subreddit',
    href: '/poetry',
    hrefTitle: 'View Poems'
  },
  {
    title: 'Todo',
    description: "A to-do list, similar to Google's Keep",
    href: '/todo',
    hrefTitle: 'Go to Todos'
  }
]

export default projects
