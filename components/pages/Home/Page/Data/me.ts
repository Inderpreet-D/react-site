type KV = {
  key: string
  value: number
}

type Date = {
  name: string
  location: string
  title: string
  date: string
  points: string[]
}

type Paper = {
  title: string
  authors: string[]
  me: string
  description: string
  href: string
}

type Data = KV | Date | Paper

type Page = {
  title: string
  type: 'Article' | 'Date' | 'Data'
  data: Data[]
}

type Me = Page[]

const me: Me = [
  {
    title: 'Languages',
    type: 'Data',
    data: [
      {
        key: 'Python',
        value: 10
      },
      {
        key: 'Java',
        value: 8
      },
      {
        key: 'C',
        value: 3
      },
      {
        key: 'JavaScript',
        value: 2
      },
      {
        key: 'HTML / CSS',
        value: 2
      },
      {
        key: 'C#',
        value: 2
      },
      {
        key: 'PHP',
        value: 1
      },
      {
        key: 'SQL',
        value: 1
      },
      {
        key: 'Kotlin',
        value: 1
      }
    ]
  },
  {
    title: 'Technologies',
    type: 'Data',
    data: [
      {
        key: 'Android',
        value: 5
      },
      {
        key: 'Latex',
        value: 5
      },
      {
        key: 'Web Development',
        value: 4
      },
      {
        key: 'Unity',
        value: 3
      },
      {
        key: 'Virtual Reality',
        value: 2
      },
      {
        key: 'Unreal',
        value: 1
      },
      {
        key: 'MySQL',
        value: 1
      },
      {
        key: 'NodeJS',
        value: 1
      },
      {
        key: 'ReactJS',
        value: 1
      }
    ]
  },
  {
    title: 'Education',
    type: 'Date',
    data: [
      {
        name: 'University of Calgary',
        location: 'Calgary AB, Canada',
        title:
          'Bachelor of Science, Computer Science, Concentration in Software Engineering',
        date: "Sep '15 - Apr '20",
        points: [
          "Dean's honour list 3 years with a 92% average (3.69 GPA)",
          'Relevant Courses: Distributed Systems, Computer Networks, Database Management Systems, Web-based Systems'
        ]
      }
    ]
  },
  {
    title: 'Experience',
    type: 'Date',
    data: [
      {
        name: 'NeuroLab',
        location: 'Calgary AB, Canada',
        title: 'Lead Task Developer',
        date: "May '18 - Present",
        points: [
          'Used C# and C++ along with the Unity and Unreal game engines to develop tasks used for research and training',
          'Able to quickly comprehend and extend large code bases, such as websites and pre-existing Unreal and Unity projects',
          'Improved existing websites with added security and features based on knowledge acquired in classes',
          'Created games and training tasks that made use of Virtual Reality (VR) systems, like the Oculus Rift'
        ]
      },
      {
        name: 'Software Engineering Decision Support Lab (SEDS)',
        location: 'Calgary AB, Canada',
        title: 'Research Intern',
        date: "May '19 - Apr '20",
        points: [
          'Used Python to mine and analyze data from app markets with the goal of testing research hypotheses',
          'Was able to effectively manage and utilize large data sets',
          'Efficiently reported research status and direction through presentations',
          'Effectively presented research outcomes through a final research paper'
        ]
      },
      {
        name: 'Local Sikh Temple',
        location: 'Calgary AB, Canada',
        title: 'Volunteer',
        date: "Feb '08 - Present",
        points: [
          'Troubleshot and repaired computers',
          'Learned the value of hard work and its impact on the community',
          'Had to work as a member of a group with a singular purpose'
        ]
      }
    ]
  },
  {
    title: 'Publications',
    type: 'Article',
    data: [
      {
        title:
          'A Novel Training Program to Improve Human Spatial Orientation: Preliminary Findings',
        authors: [
          'Michael M. G.',
          'Ford B.',
          'Inderpreet D.',
          'Adam R.',
          'Alberto U.',
          'Jaimy H.',
          'Kira D.',
          'Giuseppe I.'
        ],
        me: 'Inderpreet D.',
        description:
          'A study that used a task I developed to test the feasibility of training programs to assist users in cognitive map use and development.',
        href:
          'https://www.frontiersin.org/articles/10.3389/fnhum.2020.00005/full'
      },
      {
        title:
          'Body illusion and affordances: the influence of body representation on a walking imagery task in virtual reality',
        authors: [
          'Giorgia Tosi',
          'Jassleen Parmar',
          'Inderpreet Dhillon',
          'Angelo Maravita',
          'Giuseppe Iaria'
        ],
        me: 'Inderpreet Dhillon',
        description:
          'A study that made use of immersive Virtual Reality to observe the effects of body illusions on the participants estimation of distances.',
        href: 'https://rd.springer.com/article/10.1007%2Fs00221-020-05874-z'
      }
    ]
  }
]

export default me
