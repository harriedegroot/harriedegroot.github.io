import {
  EmploymentType,
  LanguageProficiency,
  Profile,
} from '../models/profile.model';

export const PROFILE: Profile = {
  contact: {
    name: 'Harrie de Groot',
    email: 'info@harriedegroot.com',
    linkedIn: 'linkedin.com/in/harriedegroot',
    twitter: '',
    website: 'harriedegroot.com',
    phone: '(+31) 06 52437812',
    avatar: 'assets/images/avatar.png',
    gitHub: 'https://github.com/harriedegroot',
    location: {
      city: 'Heerenveen',
      country: 'Netherlands',
    },
    birthday: '19-06-1984',
    company: {
      name: 'Harrie de Groot',
      logo: '/assets/images/logo.png',
      btw: '',
      kvk: '',
      services: [{ name: 'Software Sevelopment' }],
    },
  },
  title: 'Freelance Software Engineer',
  headline:
    'Freelance Software Engineer | C# | .NET | TS | NodeJS | Azure | MSc AI',
  about:
    'Freelance developer available for full-stack or back-end opportunities. I like the hands-on Architect role. Familiar with a wide variety of platforms, programming languages and technologies. Experienced C#.NET and Typescript developer.',
  description: '{markdown}',
  charasteristics: [
    { name: 'Analytical' },
    { name: 'Accurate' },
    { name: 'Critical' },
    { name: 'Responsible' },
    { name: 'Studious' },
    { name: 'Organized' },
    { name: 'Generalist' },
  ],
  //specialities: [], // TODO: read from skills
  experience: [
    {
      // Vattenfall
      company: {
        name: 'Vattenfall',
        description: 'Fossil-free living within one generation',
        location: {
          city: 'Amsterdam',
          country: 'Netherlands',
        },
        contact: {
          website: 'https://vattenfall.nl',
        },
      },
      roles: [
        {
          title: 'Freelance Software Engineer',
          type: EmploymentType.Freelance,
          present: true,
          timespan: {
            from: new Date('2022-08-01'),
            to: new Date(),
          },
          description:
            'Freelance developer for the SalesFlow application.',
        },
      ],
      projects: [
        {
          name: 'Vattenfall.nl - SalesFlow',
          description: 'Part of the team working on the Vattenfall.nl SalesFlow integration.',
          website: "https://www.vattenfall.nl",
          current: true,
          timespan: {
            from: new Date('2022-08-01'),
            to: new Date(),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Software Architect',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'front-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'C#',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: '.NET 6',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: '.NET',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: '.NET Core',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: 'Typescript',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'Angular 2+',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: 'CosmosDB',
              proficiency: 10,
              tags: ['Database', 'Data'],
            },
            {
              name: 'Azure DevOps',
              proficiency: 30,
              tags: [
                'Azure',
                'Software Architecture',
                'Development Tool',
                'DevOps',
              ],
            },
            {
              name: 'Angular NX',
              proficiency: 50,
              tags: ['Development Tool'],
            },
          ],
        },
      ],
    },
    {
      // Wiertsema
      company: {
        name: 'Wiertsema & Partners B.V.',
        description: '',
        location: {
          city: 'Tolbert',
          country: 'Netherlands',
        },
        contact: {
          website: 'https://wiertsema.nl',
        },
      },
      roles: [
        {
          title: 'Freelance Software Engineer',
          type: EmploymentType.Freelance,
          present: true,
          timespan: {
            from: new Date('2022-04-01'),
            to: new Date(),
          },
          description: 'Freelance developer',
        },
      ],
      projects: [
        {
          name: 'Wiertsema - Geo ICT',
          description: 'Working on a web-based GIS platform to facilitate efficient data analysis.',
          website: "https://www.wiertsema.nl",
          current: true,
          timespan: {
            from: new Date('2022-04-01'),
            to: new Date(),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Software Architect',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'front-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'C#',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: '.NET 6',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: '.NET',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: '.NET Core',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            // {
            //   name: 'Entity Framework Core',
            //   description: 'Entity Framework Core',
            //   proficiency: 80,
            //   tags: ['Software Framework', 'Database', 'Data'],
            // },
            {
              name: 'Typescript',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'Angular 2+',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: 'Angular Material',
              proficiency: 90,
              tags: ['Software Framework'],
            },
            {
              name: 'PostgreSQL',
              proficiency: 10,
              tags: ['Database', 'Data'],
            },
            {
              name: 'MongoDB',
              proficiency: 50,
              tags: ['Database', 'NoSQL', 'Data'],
            },
            {
              name: 'Python',
              proficiency: 20,
              tags: ['Programming Language'],
            },
            {
              name: 'Docker',
              proficiency: 70,
              tags: [
                'Azure',
                'Software Architecture',
                'Development Tool',
                'DevOps',
              ],
            },
            {
              name: 'ECharts',
              proficiency: 50,
              tags: ['Software Library'],
            },
            {
              name: 'GitHub',
              description: 'Git - Source Control',
              proficiency: 90,
              tags: ['CI/CD', 'DevOps', 'Project Management'],
            },
          ],
        },
      ],
    },
    {
      // Athom
      company: {
        name: 'Athom B.V.',
        description:
          'Control, automate and monitor your entire smart home with Homey.',
        location: {
          city: 'Enschede',
          country: 'Netherlands',
        },
        contact: {
          website: 'https://athom.nl',
        },
      },
      roles: [
        {
          title: 'Freelance Software Engineer',
          type: EmploymentType.Freelance,
          timespan: {
            from: new Date('2022-04-01'),
            to: new Date('2022-06-30'),
          },
          description:
            'Freelance developer for Homey products and related services.',
        },
      ],
      projects: [
        {
          name: 'Homey Pro - BluFi',
          description:
            'Internal development for both the new Homey Pro and the Homey app.',
          responsibility: 'Build the BluFi intergration and network stack for the new Homey OS (Rasberry Pi). Created a PoC for the BluFi Homey App setup wizard (React Native).',
          website: "https://homey.app/nl-nl/homey-pro/",
          timespan: {
            from: new Date('2022-04-01'),
            to: new Date('2022-07-01'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'front-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'embedded',
              proficiency: 50,
              tags: ['Software Development'],
            },
            {
              name: 'JavaScript',
              proficiency: 90,
              min: 50,
              tags: ['Programming Language'],
            },
            {
              name: 'NodeJS',
              proficiency: 80,
              tags: ['Software Framework'],
            },
            {
              name: 'React',
              proficiency: 50,
              tags: ['Software Framework'],
            },
            {
              name: 'React Native',
              proficiency: 40,
              tags: ['Software Framework', 'Mobile Development'],
            },
            {
              name: 'Redux',
              proficiency: 70,
              tags: ['Software Architecture'],
            },
            {
              name: 'GitHub',
              description: 'Git - Source Control',
              proficiency: 80,
              tags: ['CI/CD', 'DevOps', 'Project Management'],
            },
            {
              name: 'SQLite',
              proficiency: 50,
              tags: ['Database', 'Data'],
            },
            {
              name: 'M-Bus',
              description: 'Linux message bus',
              proficiency: 70,
              tags: ['MessageBus', 'Data'],
            },
            {
              name: 'Raspberry PI',
              proficiency: 50,
              tags: ['embedded'],
            },
            // {
            //   name: 'BlueTooth',
            //   proficiency: 30,
            //   tags: ['Software Architecture'],
            // },
          ],
        },
      ],
    },
    {
      // Mannen van Waarde
      company: {
        name: 'Mannen van Waarde',
        description:
          'Automation, optimisation and digitalisation of work environments.',
        location: {
          city: 'Heerenveen',
          country: 'Netherlands',
        },
        contact: {
          website: 'https://mannenvanwaarde.nl',
        },
      },
      roles: [
        {
          title: 'Senior Software Architect',
          type: EmploymentType.FullTime,
          timespan: {
            from: new Date('2017-08'),
            to: new Date('2022-03-31'),
          },
          description:
            'In the role of Senior Software Architect and Lead Developer:\n' +
            '- Founder of EnterBoost: A low-code platform for SMB to create complex business applications\n' +
            '- Developed the data-driven engine and core of EnterBoost (C#.NET)\n' +
            '- Designed and implemented the layout render engine (TS Angular)\n' +
            '- Created many flexible Azure cloud-based applications (see projects)\n' +
            '- Management of the development processes and technical decisions\n' +
            '- Involved in hiring and responsible for trainnig and mentoring fellow software engineers\n' +
            '- Responsible for the CI/CD pipeline, quality control and deployment of the software\n' +
            '- Translate customer needs into valuable software\n',
        },
      ],
      projects: [
        {
          name: 'Enter Software - Enter Boost',
          description:
            'A low-code platform for SMB to create complex business applications',
            responsibility:
            'In the role of Senior Software Architect and Lead Developer: ' +
            'Developed the data-driven engine and core of EnterBoost (C#.NET). ' +
            'Designed and implemented the layout render engine (TS Angular). ' +
            'Created many flexible Azure cloud-based applications (see projects). ' +
            'Management of the development processes and technical decisions. ' +
            'Involved in hiring and responsible for trainnig and mentoring fellow software engineers. ' +
            'Responsible for the CI/CD pipeline, quality control and deployment of the software. ' +
            'Translate customer needs into valuable software.',
          website: "https://www.enterboost.com/",
          timespan: {
            from: new Date('2017-09'),
            to: new Date('2022-04-01'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'API development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'front-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Software Architect',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'C#',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            // {
            //   name: '.NET 6',
            //   proficiency: 100,
            //   tags: ['Software Framework'],
            // },
            {
              name: '.NET Core',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: '.NET',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: 'Entity Framework Core',
              description: 'Entity Framework Core',
              proficiency: 90,
              tags: ['Software Framework', 'Data'],
            },
            {
              name: 'IoC',
              description: 'Inversion of Control',
              proficiency: 100,
              tags: ['Software Architecture'],
            },
            {
              name: 'Typescript',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'Angular 2+',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: 'Angular Material',
              proficiency: 100,
              tags: ['Software Framework'],
            },
            {
              name: 'MS SQL',
              proficiency: 60,
              tags: ['Database', 'Data'],
            },
            {
              name: 'Identity Framework',
              proficiency: 70,
              tags: ['Software Library'],
            },
            {
              name: 'SignalR',
              proficiency: 80,
              tags: ['Software Library', 'MessageBus'],
            },
            {
              name: 'Azure App Service',
              proficiency: 85,
              tags: ['Azure'],
            },
            {
              name: 'Azure SQL Server',
              proficiency: 20,
              tags: ['Azure', 'Database', 'Data'],
            },
            {
              name: 'Azure Blob Storage',
              proficiency: 80,
              tags: ['Azure', 'Data'],
            },
            {
              name: 'Azure Files',
              proficiency: 70,
              tags: ['Azure', 'Data'],
            },
            {
              name: 'Azure Application Gateway',
              proficiency: 75,
              tags: ['Azure', 'Software Architecture', 'DevOps'],
            },
            {
              name: 'Azure Virtual Network',
              proficiency: 40,
              tags: ['Azure', 'DevOps'],
            },
            {
              name: 'Azure Key Vault',
              proficiency: 50,
              tags: ['Azure', 'DevOps'],
            },
            {
              name: 'Docker',
              proficiency: 70,
              tags: [
                'Azure',
                'Software Architecture',
                'Development Tool',
                'DevOps',
              ],
            },
            {
              name: 'Azure Containers',
              proficiency: 60,
              tags: [
                'Azure',
                'Software Architecture',
                'DevOps',
              ],
            },
            {
              name: 'Azure Virtual Machine',
              proficiency: 40,
              tags: [
                'Azure',
                'Software Architecture',
                'DevOps',
              ],
            },
            {
              name: 'Node-Red',
              proficiency: 90,
              tags: ['MessageBus', 'Software Architecture', 'Low-Code'],
            },
            {
              name: 'MQTT',
              proficiency: 100,
              tags: ['MessageBus', 'Software Architecture', 'Data'],
            },
            {
              name: 'Telerik Kendo',
              proficiency: 100,
              tags: ['Software Library', 'front-end'],
            },
            {
              name: 'Octopus',
              description: 'Deployment server',
              proficiency: 80,
              tags: ['CI/CD', 'DevOps'],
            },
            {
              name: 'TeamCity',
              description: 'Build server',
              proficiency: 80,
              tags: ['CI/CD', 'DevOps'],
            },
            {
              name: 'BitBucket',
              description: 'Git - Source Control',
              proficiency: 90,
              tags: ['CI/CD', 'DevOps', 'Project Management'],
            },
            {
              name: 'AutoMapper',
              proficiency: 80,
              tags: ['Software Library', 'Software Architecture'],
            },
            {
              name: 'Dapper',
              proficiency: 50,
              tags: ['Software Library', 'Data'],
            },
            {
              name: 'MediatR',
              proficiency: 70,
              tags: ['Software Library', 'Software Architecture'],
            },
            {
              name: 'GraphQL',
              proficiency: 50,
              tags: [
                'Software Library',
                'Software Architecture',
                //'MessageBus',
                'API',
              ],
            },
            {
              name: 'WebHooks',
              proficiency: 70,
              tags: ['Software Architecture', 'API'],
            },
            {
              name: 'HangFire',
              description: 'Background jobs',
              proficiency: 70,
              tags: [
                'Software Library',
                'Software Architecture',
                'back-end',
              ],
            },
            {
              name: 'Swagger',
              proficiency: 70,
              tags: ['Software Library', 'Software Architecture', 'API'],
            },
            {
              name: 'SendGrid',
              description: 'E-mail provider',
              proficiency: 70,
              tags: ['Azure', 'Software Library'],
            },
            {
              name: 'Mustache Templates',
              proficiency: 75,
              tags: ['Software Library', 'front-end'],
            },
            {
              name: 'MathJS',
              proficiency: 75,
              tags: ['Software Library', 'front-end'],
            },
            {
              name: 'Storage Explorer',
              proficiency: 75,
              tags: ['Development Tool', 'Data'],
            },
            {
              name: 'SOLID',
              proficiency: 90,
              tags: ['Software Architecture', "Design Pattern"],
            },
            {
              name: 'JSON',
              proficiency: 100,
              tags: ['Web Development'],
            },
          ],
        },
        {
          name: 'Tuinplus - Wharehouse optimization',
          description: '',
          timespan: {
            from: new Date('2018-01'),
            to: new Date('2018-12'),
            //to: new Date('2022-01'),
          },
          technologies: [
            {
              name: 'PathFinding',
              proficiency: 80,
              tags: [
                'Artificial Intelligence',
                //'Algorithm',
                'Game Development',
              ],
            },
            {
              name: 'A* search',
              proficiency: 80,
              tags: [
                'Artificial Intelligence',
                //'Algorithm',
                'Game Development',
              ],
            },
            {
              name: 'Traveling Salesman Problem (TSP)',
              proficiency: 80,
              tags: [
                'Artificial Intelligence', 
                //'Algorithm'
              ],
            },
            {
              name: 'Heuristics',
              proficiency: 70,
              tags: [
                'Artificial Intelligence',
                //'Algorithm',
                //'Machine Learning',
              ],
            },
            {
              name: 'Ant colony optimization',
              proficiency: 70,
              tags: [
                'Artificial Intelligence', 
                //'Algorithm'
              ],
            },
            {
              name: 'Greedy Search',
              proficiency: 90,
              tags: [
                'Artificial Intelligence', 
                //'Algorithm'
              ],
            },
            {
              name: 'Genetic Algorithms',
              proficiency: 60,
              tags: [
                'Artificial Intelligence',
                'Algorithm',
                'Machine Learning',
              ],
            },
            {
              name: 'Weight maps',
              proficiency: 80,
              tags: [
                'Artificial Intelligence',
                'Algorithm',
                'Game Development',
              ],
            },
            {
              name: 'K-Nearest Neighbour',
              proficiency: 90,
              tags: [
                'Artificial Intelligence',
                'Algorithm',
                'Machine Learning',
              ],
            },
            {
              name: 'Message Queue',
              proficiency: 80,
              tags: ['MessageBus', 'Software Architecture'],
            },
            {
              name: 'PubSub',
              proficiency: 80,
              tags: ['MessageBus', 'Software Architecture'],
            },
            {
              name: 'HangFire',
              description: 'Background jobs',
              proficiency: 70,
              tags: [
                'Software Library',
                'Software Architecture',
                'back-end',
              ],
            },
            {
              name: 'Parallel Processing',
              proficiency: 70,
              tags: ['Software Architecture'],
            },
            {
              name: 'Phaser JS Gaming Engine',
              proficiency: 30,
              tags: ['Game Development'],
            },
          ],
        },
        {
          name: 'ADST - Human Resource Planning',
          description: '',
          timespan: {
            from: new Date('2021-10'),
            to: new Date('2021-12'),
          },
          technologies: [
            {
              name: 'Bryntum Web Components',
              proficiency: 60,
              tags: ['Software Library', 'front-end'],
            },
          ],
        },
        {
          name: 'Eekhoorn - Experience',
          description: '',
          timespan: {
            from: new Date('2019-11'),
            to: new Date('2021-12'),
          },
          technologies: [
            {
              name: 'Ionic Framework',
              proficiency: 20,
              tags: ['Software Framework', 'Mobile Development', 'Android', 'iOS'],
            },
            {
              name: 'Adyen',
              proficiency: 50,
              //tags: ['Payment Provider'],
            },
          ],
        },
        {
          name: '706 Seating Group - Product Management',
          description: '',
          timespan: {
            from: new Date('2020-11'),
            to: new Date('2021-05'),
          },
          technologies: [
            {
              name: 'WebHooks',
              proficiency: 80,
              tags: ['Software Architecture'],
            },
          ],
        },
        {
          name: 'Richmond - Digital Chain Integration',
          description: '',
          timespan: {
            from: new Date('2020-06'),
            to: new Date('2021-05'),
          },
        },
        {
          name: 'Luinstra - Hour Management',
          description: '',
          timespan: {
            from: new Date('2020-04'),
            to: new Date('2021-04'),
          },
        },
        {
          name: 'Eekhoorn - WMS',
          description: '',
          timespan: {
            from: new Date('2018-03'),
            to: new Date('2021-03'),
          },
        },
        {
          name: 'Eekhoorn - Tracking',
          description: '',
          timespan: {
            from: new Date('2018-01'),
            to: new Date('2021-02'),
          },
          technologies: [
            {
              name: 'Mobile development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'SendGrid',
              proficiency: 70,
              tags: ['Software Library' /*, "Email Provider" */],
            },
            {
              name: 'Mustache Templates',
              proficiency: 60,
              tags: ['Software Library'],
            },
            {
              name: 'PostNL API',
              proficiency: 30,
              tags: ['API'],
            },
            {
              name: 'DHL API',
              proficiency: 30,
              tags: ['API'],
            },
          ],
        },
        {
          name: 'De Vries Trappen - Planning',
          description: '',
          timespan: {
            from: new Date('2019-04'),
            to: new Date('2020-12'),
          },
        },
        {
          name: 'Eekhoorn - CRM',
          description: '',
          timespan: {
            from: new Date('2017-10'),
            to: new Date('2020-04'),
          },
        },
        {
          name: 'HelloStrik / SpecStrik',
          description: 'Management system for sales and quality control of provisions.',
          responsibility: "Designed and implemented the architecture for product management and quality control.",
          timespan: {
            from: new Date('2017-08'),
            to: new Date('2019-10'),
          },
          technologies: [
            {
              name: 'C#',
              proficiency: 90,
              tags: ['Programming Language'],
            },
            {
              name: 'ASP.NET MVC',
              proficiency: 70,
              min: 20,
              tags: ['Software Framework'],
            },
            {
              name: '.NET',
              proficiency: 70,
              tags: ['Software Framework'],
            },
            {
              name: 'Razor Pages',
              proficiency: 60,
              tags: ['Software Framework'],
            },
            {
              name: 'Entity Framework 4',
              proficiency: 70,
              tags: ['Software Framework', 'Data'],
            },
            {
              name: 'jQuery',
              proficiency: 80,
              min: 20,
              tags: ['Software Framework', 'front-end'],
            },
            {
              name: 'Telerik ASP.NET MVC',
              proficiency: 60,
              tags: ['Software Library', 'front-end'],
            },
            {
              name: 'MS SQL',
              proficiency: 60,
              tags: ['Database', 'Data'],
            },
            {
              name: 'Bootstrap',
              proficiency: 70,
              tags: ['Software Library', 'front-end'],
            },
          ],
        },
        {
          name: 'Allure Energy - CRM',
          description: 'CRM build with EnterBoost',
          timespan: {
            from: new Date('2019-01'),
            to: new Date('2019-04'),
          },
        },
        {
          name: 'Wierda Vermogensbeheer - Invoice Automation',
          description: 'Invoice Automation System: ...',
          responsibility: "Designed and implemented the architecture of the app framework.",
          timespan: {
            from: new Date('2017-10'),
            to: new Date('2018-01'),
          },
          technologies: [
            {
              name: 'C#',
              proficiency: 85,
              tags: ['Programming Language'],
            },
            {
              name: '.NET Core 2.1',
              proficiency: 75,
              tags: ['Software Framework'],
            },
            {
              name: '.NET Core',
              proficiency: 75,
              tags: ['Software Framework'],
            },
            {
              name: '.NET',
              proficiency: 80,
              tags: ['Software Framework'],
            },
            {
              name: 'Entity Framework Core',
              description: 'Entity Framework Core',
              proficiency: 75,
              tags: ['Software Framework', 'Data'],
            },
            // {
            //   name: 'Angular 2+',
            //   proficiency: 50,
            //   tags: ['Software Framework'],
            // },
            {
              name: 'Identity Framework',
              proficiency: 70,
              tags: ['Software Library'],
            },
          ],
        },
      ],
    },
    {
      // Endurance International Group
      company: {
        name: 'Endurance International Group',
        description: '',
        location: {
          city: 'Leeuwarden',
          country: 'Netherlands',
        },
        contact: {},
      },
      roles: [
        {
          title: 'Senior Software Developer',
          type: EmploymentType.FullTime,
          timespan: {
            from: new Date('2016-10-01'),
            to: new Date('2017-08-31'),
          },
          description:
            'Re-developed the entire control panel associated with sitebuilder.com, serving 1.5 million users a year. Refactored from a PHP legacy framework to a state of the art framework using .NET Core 2.1 in the backend that is able to serve all our customers.',
        },
        {
          title: 'Senior Software Engineer',
          type: EmploymentType.FullTime,
          timespan: {
            from: new Date('2016-02-01'),
            to: new Date('2016-08-31'),
          },
          description: [
            'Designed and implemented the architecture for the Social Inbox for MySocialSuite. MySocialSuite is a complete social media management platform for businesses and individuals.',
            'Built the backbone for consuming live streaming data from multiple social feeds, implemented the interface and developed connectors for content providers.',
            'Endurance International Group acquired AppMachine in 2016.',
          ],
        },
      ],
      projects: [
        {
          name: 'WebsiteBuilder - Control Panel',
          description: 'Project to re-developed the entire control panel associated with sitebuilder.com, serving 1.5 million users a year. This multi branded control panel allows customers to manage all services related to their website e.g. domains, email, add-ons and invoicing.',
          responsibility: "Refactored the control panel from a PHP legacy framework to a state of the art framework using .NET Core 2.1 in the backend that is able to serve all our customers.",
          timespan: {
            from: new Date('2016-10'),
            to: new Date('2017-08'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'C#',
              proficiency: 85,
              tags: ['Programming Language'],
            },
            {
              name: '.NET Core 2.1',
              proficiency: 70,
              tags: ['Software Framework'],
            },
            {
              name: '.NET Core',
              proficiency: 70,
              tags: ['Software Framework'],
            },
            {
              name: '.NET',
              proficiency: 70,
              tags: ['Software Framework'],
            },
            {
              name: 'Entity Framework Core',
              description: 'Entity Framework Core',
              proficiency: 60,
              tags: ['Software Framework', 'Data'],
            },
            {
              name: 'IoC',
              description: 'Inversion of Control',
              proficiency: 60,
              tags: ['Software Architecture', 'Design Pattern'],
            },
            {
              name: 'Web API',
              proficiency: 80,
              tags: ['Software Framework'],
            },
            // {
            //   name: 'php',
            //   proficiency: 20,
            //   tags: ['Programming Language'],
            // },
            {
              name: 'RabbitMQ',
              proficiency: 40,
              tags: ['MessageBus', 'Data'],
            },
          ],
        },
        {
          name: 'MySocialSuite - social inbox',
          description: 'MySocialSuite is a complete social media management platform for businesses and individuals. Manage multiple social profiles, measure growth, gain powerful analytics and collaborate with your team.',
          responsibility: "Designed and implemented the architecture for the Social Inbox. Built the backbone for consuming live streaming data from multiple social feeds, implemented the interface and developed connectors for content providers.",
          timespan: {
            from: new Date('2016-02'),
            to: new Date('2016-08'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Mobile development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'front-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Software Architect',
              proficiency: 80,
              tags: ['Software Development'],
            },
            {
              name: 'C#',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: '.NET Core',
              proficiency: 50,
              tags: ['Software Framework'],
            },
            {
              name: '.NET',
              proficiency: 50,
              tags: ['Software Framework'],
            },
            {
              name: 'IoC',
              description: 'Inversion of Control',
              proficiency: 60,
              tags: ['Software Architecture'],
            },
            {
              name: 'Azure Table Storage',
              proficiency: 90,
              tags: ['Azure', 'Database', 'NoSQL', 'Data'],
            },
            {
              name: 'Azure Queue',
              proficiency: 70,
              tags: ['Azure', 'MessageBus', 'Data'],
            },
            {
              name: 'SignalR',
              proficiency: 70,
              tags: ['Software Library', 'MessageBus'],
            },
            {
              name: 'Backbone.js',
              proficiency: 50,
              tags: ['Software Framework'],
            },
            {
              name: 'JavaScript',
              proficiency: 80,
              min: 50,
              tags: ['Programming Language'],
            },
            {
              name: 'TFVC',
              description: 'Team Foundation Version Control',
              proficiency: 40,
              tags: ['CI/CD', 'Project Management'],
            },
          ],
        },
      ],
    },
    {
      // AppMachine
      company: {
        name: 'AppMachine',
        description: '',
        location: {
          city: 'Leeuwarden',
          country: 'Netherlands',
        },
        contact: {},
      },
      roles: [
        {
          title: 'Senior Software Developer',
          type: EmploymentType.FullTime,
          timespan: {
            from: new Date('2015-12-01'),
            to: new Date('2016-02-31'),
          },
          description:
            'Designed and developed a no-code web application to build your own mobile websites: "Impress.ly"',
        },
        {
          title: 'Senior Mobile Developer',
          type: EmploymentType.FullTime,
          timespan: {
            from: new Date('2013-03-01'),
            to: new Date('2015-12-31'),
          },
          description: [
            'Member of a great team working on the development of the full Appmachine platform and related products. Took part in the design and creation of many facets of the software. Designed and implemented the Android architecture from the ground up.',
          ],
        },
      ],
      projects: [
        {
          name: 'Impress.ly',
          description: 'Mobile website building platform.',
          responsibility: "Designed and developed a no-code web application to build your own mobile websites.",
          timespan: {
            from: new Date('2015-12'),
            to: new Date('2016-02'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Mobile development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'front-end',
              proficiency: 80,
              tags: ['Software Development'],
            },
            {
              name: 'C#',
              proficiency: 80,
              tags: ['Programming Language'],
            },
            {
              name: '.NET',
              proficiency: 50,
              tags: ['Software Framework'],
            },
            {
              name: 'Web API',
              proficiency: 50,
              tags: ['Software Framework'],
            },
            {
              name: 'ASP.NET MVC',
              proficiency: 50,
              min: 20,
              tags: ['Software Framework'],
            },
            {
              name: 'IoC',
              description: 'Inversion of Control',
              proficiency: 55,
              tags: ['Software Architecture'],
            },
            {
              name: 'Azure Blob Storage',
              proficiency: 70,
              tags: ['Azure', 'Data'],
            },
            {
              name: 'SignalR',
              proficiency: 70,
              tags: ['Software Library', 'MessageBus'],
            },
            {
              name: 'Backbone.js',
              proficiency: 50,
              tags: ['Software Framework', 'front-end', 'Mobile Development', 'Android', 'iOS'],
            },
            {
              name: 'Bootstrap',
              proficiency: 60,
              tags: ['Software Library', 'front-end'],
            },
          ],
        },
        {
          name: 'AppMachine',
          description: 'AppMachine is a ground breaking do it yourself app building platform that allows technical and non-technical people around the world to create native apps for iOS and Android without the need of any technical or coding skills.',
          responsibility: "Member of a great team working on the client, server & mobile development of the full Appmachine platform and related products. Took part in the design and creation of many facets of the software. Designed and implemented the Android architecture from the ground up.",
          timespan: {
            from: new Date('2013-06'),
            to: new Date('2015-12'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Mobile development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 50,
              tags: ['Software Development'],
            },
            {
              name: 'C#',
              proficiency: 70,
              tags: ['Programming Language'],
            },
            {
              name: '.NET',
              proficiency: 50,
              tags: ['Software Framework'],
            },
            {
              name: '.NET Framework',
              proficiency: 50,
              min: 30,
              tags: ['Software Framework'],
            },
            {
              name: 'Xamarin',
              proficiency: 100,
              tags: ['Mobile Development', 'Android', 'iOS'],
            },
            {
              name: 'Java',
              description: 'Android Development',
              proficiency: 100,
              min: 40,
              tags: ['Programming Language', 'Mobile Development', 'Android'],
            },
            {
              name: 'Objective-C',
              description: 'iOS Development',
              proficiency: 70,
              tags: ['Programming Language', 'Mobile Development', 'iOS'],
            },
            {
              name: 'Raygun',
              proficiency: 65,
              tags: ['Project Management'],
            },
            {
              name: 'Jira',
              proficiency: 70,
              tags: ['Project Management'],
            },
          ],
        },
      ],
    },
    {
      // MAD Multimedia
      company: {
        name: 'MAD Multimedia',
        description: '',
        location: {
          city: 'Groningen',
          country: 'Netherlands',
        },
        contact: {},
      },
      roles: [
        {
          title: 'Lead Game Developer (Mobile & Web)',
          type: EmploymentType.FullTime,
          timespan: {
            from: new Date('2011-03'),
            to: new Date('2013-05'),
          },
          description:
            'Software Architect & Technical Supervisor (CTO). Leading the development of games & applications for web and mobile platforms. Specialized in mobile app development, big data & cloud technologies, game design and server side programming.',
        },
        {
          title: 'Game & Web Programmer',
          type: EmploymentType.FullTime,
          timespan: {
            from: new Date('2007-01'),
            to: new Date('2011-03'),
          },
          description: [
            'Software engineer for: Flash web games, Online e-learning applications, Web portals & Internal libraries (Actionscript & PHP)',
          ],
        },
      ],
      projects: [
        {
          name: 'Sanoma: DuckTypen',
          description: 'Typing course game platform with DuckTales figures.',
          responsibility: "Responsible for the main gaming engine. Created the interfaces and communication layers between the minigames. Built the progress tracking system, level loading, CMS and APIs. Animated the main menu and programmed some of the many typing mini-games.",
          timespan: {
            from: new Date('2013-01'),
            to: new Date('2013-06'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'front-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            // {
            //   name: 'Software Architect',
            //   proficiency: 100,
            //   tags: ['Software Development'],
            // },
            {
              name: 'MacroMedia Flash',
              proficiency: 100,
              min: 0,
              tags: ['Software Framework', 'Game Development'],
            },
            {
              name: 'ActionScript 3.0',
              proficiency: 100,
              tags: ['Programming Language', 'Game Development'],
            },
            {
              name: 'php',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'JavaScript',
              proficiency: 80,
              min: 50,
              tags: ['Programming Language', 'Game Development'],
            },
            {
              name: 'MySQL',
              proficiency: 90,
              tags: ['Database', 'Data'],
            },
            {
              name: 'HTML',
              proficiency: 90,
              tags: ['Web Development'],
            },
          ],
        },
        {
          name: 'Whaudio - Guess what!',
          description: 'Social sound guessing game (iPhone app)',
          timespan: {
            from: new Date('2013-04'),
            to: new Date('2013-05'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Mobile development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            // {
            //   name: 'front-end',
            //   proficiency: 100,
            //   tags: ['Software Development'],
            // },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            // {
            //   name: 'Software Architect',
            //   proficiency: 60,
            //   tags: ['Software Development'],
            // },
            {
              name: 'Objective-C',
              description: 'iOS Development',
              proficiency: 80,
              tags: ['Programming Language', 'Mobile Development', 'iOS', 'Game Development'],
            },
            {
              name: 'Java',
              description: 'Android Development',
              proficiency: 100,
              min: 40,
              tags: ['Programming Language', 'Mobile Development', 'Android', 'Game Development'],
            },
            {
              name: 'php',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'GlassFish',
              description: "Java web-server",
              proficiency: 40,
              min: 0,
              tags: ['Software Framework'],
            },
            {
              name: 'CouchBase',
              proficiency: 90,
              tags: ['Database', 'Data', 'NoSQL'],
            },
            {
              name: 'Redis',
              proficiency: 70,
              tags: ['Database', 'Data'],
            },
          ],
        },
        {
          name: 'Tragpi: Quality App',
          description: 'iPad application (business) to gain insight into the quality, cost and efficiency of hospitals',
          timespan: {
            from: new Date('2012-04'),
            to: new Date('2012-08'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Mobile development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            // {
            //   name: 'Game development',
            //   proficiency: 100,
            //   tags: ['Software Development'],
            // },
            // {
            //   name: 'front-end',
            //   proficiency: 100,
            //   tags: ['Software Development'],
            // },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Objective-C',
              description: 'iOS Development',
              proficiency: 70,
              tags: ['Programming Language', 'Mobile Development', 'iOS', 'Game Development'],
            },
            {
              name: 'php',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'MySQL',
              proficiency: 90,
              tags: ['Database', 'Data'],
            },
          ],
        },
        {
          name: 'G4T: Gaming for Training',
          description: 'Serious game for e-learning & training',
          responsibility: "Designed and extended a scalable isometric gaming engine. Implemented the backend CMS used for generating content and tracking training progress.",
          timespan: {
            from: new Date('2011-09'),
            to: new Date('2012-04'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'front-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            // {
            //   name: 'Software Architect',
            //   proficiency: 100,
            //   tags: ['Software Development'],
            // },
            {
              name: 'MacroMedia Flash',
              proficiency: 100,
              min: 0,
              tags: ['Software Framework', 'Game Development'],
            },
            {
              name: 'ActionScript 3.0',
              proficiency: 100,
              tags: ['Programming Language', 'Game Development'],
            },
            {
              name: 'php',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'JavaScript',
              proficiency: 80,
              min: 50,
              tags: ['Programming Language', 'Game Development'],
            },
            {
              name: 'MySQL',
              proficiency: 90,
              tags: ['Database', 'Data'],
            },
            {
              name: 'HTML',
              proficiency: 90,
              tags: ['Web Development'],
            },
            {
              name: 'Isometric projection',
              proficiency: 90,
              tags: ['Algorithm', 'Game Development'],
            },
          ],
        },
        {
          name: 'ANWB: In het Park',
          description: 'Mobile app (Android & iOS) to promote dutch parks.',
          responsibility: 'Worked on both native apps and created the back-end CMS.',
          timespan: {
            from: new Date('2011-08'),
            to: new Date('2011-09'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Mobile development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            // {
            //   name: 'front-end',
            //   proficiency: 100,
            //   tags: ['Software Development'],
            // },
            {
              name: 'back-end',
              proficiency: 100,
              tags: ['Software Development'],
            },
            // {
            //   name: 'Software Architect',
            //   proficiency: 60,
            //   tags: ['Software Development'],
            // },
            {
              name: 'Objective-C',
              description: 'iOS Development',
              proficiency: 70,
              tags: ['Programming Language', 'Mobile Development', 'iOS', 'Game Development'],
            },
            {
              name: 'Java',
              description: 'Android Development',
              proficiency: 90,
              min: 40,
              tags: ['Programming Language', 'Mobile Development', 'Android', 'Game Development'],
            },
            {
              name: 'php',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'MySQL',
              proficiency: 90,
              tags: ['Database', 'Data'],
            },
          ],
        },
        {
          name: 'Ketnet: Pretshow',
          description: 'Fun physics based puzzle game',
          timespan: {
            from: new Date('2010-10'),
            to: new Date('2011-02'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'MacroMedia Flash',
              proficiency: 100,
              min: 0,
              tags: ['Software Framework', 'Game Development'],
            },
            {
              name: 'ActionScript 3.0',
              proficiency: 100,
              tags: ['Programming Language', 'Game Development'],
            },
            {
              name: 'Box2D physics engine',
              proficiency: 75,
              tags: ['Game Development'],
            },
          ],
        },
        {
          name: 'Ketnet: Wrappers op Wieltjes',
          description: 'Explorational race game for kids',
          responsibility: "Designed and built a scalable isometric gaming engine. Took part in the development of the content loading mechanisms and render engine.",
          timespan: {
            from: new Date('2010-07'),
            to: new Date('2011-01'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'MacroMedia Flash',
              proficiency: 100,
              min: 0,
              tags: ['Software Framework', 'Game Development'],
            },
            {
              name: 'ActionScript 3.0',
              proficiency: 100,
              tags: ['Programming Language', 'Game Development'],
            },
            {
              name: 'Isometric projection',
              proficiency: 80,
              tags: ['Algorithm', 'Game Development'],
            },
          ],
        },
        {
          name: 'Frans Muller: Shoecare Academy',
          description: 'Online Training portal for professionals in the shoes business',
          responsibility: "Developed both the interactive front-end (Flash) and back-end CMS + API",
          timespan: {
            from: new Date('2010-04'),
            to: new Date('2010-10'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'API development',
              proficiency: 50,
              tags: ['Software Development'],
            },
            {
              name: 'MacroMedia Flash',
              proficiency: 100,
              min: 0,
              tags: ['Software Framework', 'Game Development'],
            },
            {
              name: 'front-end',
              proficiency: 80,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 90,
              tags: ['Software Development'],
            },
            {
              name: 'ActionScript 3.0',
              proficiency: 100,
              tags: ['Programming Language', 'Game Development'],
            },
            {
              name: 'php',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'JavaScript',
              proficiency: 70,
              min: 50,
              tags: ['Programming Language'],
            },
            {
              name: 'MySQL',
              proficiency: 85,
              tags: ['Database', 'Data'],
            },
            {
              name: 'HTML',
              proficiency: 90,
              tags: ['Web Development'],
            },
            {
              name: 'CSS',
              proficiency: 50,
              tags: ['Web Development'],
            },
            {
              name: 'JSON',
              proficiency: 80,
              tags: ['Web Development'],
            },
          ],
        },
        {
          name: 'Noordhoff: Minigames',
          description: 'Multiple educational minigames for Noordhoff\'s e-learning portal',
          timespan: {
            from: new Date('2010-01'),
            to: new Date('2010-07'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 90,
              tags: ['Software Development'],
            },
            // {
            //   name: 'API development',
            //   proficiency: 50,
            //   tags: ['Software Development'],
            // },
            {
              name: 'MacroMedia Flash',
              proficiency: 100,
              min: 0,
              tags: ['Software Framework', 'Game Development'],
            },
            {
              name: 'ActionScript 3.0',
              proficiency: 100,
              tags: ['Programming Language', 'Game Development'],
            },
            {
              name: 'php',
              proficiency: 100,
              tags: ['Programming Language'],
            },
            {
              name: 'MySQL',
              proficiency: 85,
              tags: ['Database', 'Data'],
            },
          ],
        },
        {
          name: 'Postcode Loterij: Goodgames',
          description: 'Multiple games for the Postcode Loterij - goodgames portal',
          timespan: {
            from: new Date('2010-03'),
            to: new Date('2010-07'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },           
            {
              name: 'MacroMedia Flash',
              proficiency: 100,
              min: 0,
              tags: ['Software Framework', 'Game Development'],
            },
            {
              name: 'ActionScript 3.0',
              proficiency: 100,
              tags: ['Programming Language', 'Game Development'],
            },
          ],
        },
        {
          name: '7Games: Build & Bash',
          description: 'Multi-player game',
          timespan: {
            from: new Date('2009-10'),
            to: new Date('2010-02'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'Game development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'MacroMedia Flash',
              proficiency: 100,
              min: 0,
              tags: ['Software Framework', 'Game Development'],
            },
            {
              name: 'ActionScript 3.0',
              proficiency: 100,
              tags: ['Programming Language', 'Game Development'],
            },
            {
              name: 'Multi-player sync',
              proficiency: 50,
              tags: ['Algorithm', 'Game Development'],
            },
            {
              name: 'Box2D physics engine',
              proficiency: 75,
              tags: ['Game Development'],
            },
          ],
        },
      ],
    },
    {
      // ACHT Personal Websystems
      company: {
        name: 'acht - personal websystems',
        description: 'Digital agency',
        location: {
          city: 'Ter Idzard',
          country: 'Netherlands',
        },
      },
      roles: [
        {
          title: 'Co-founder (VOF) & web-developer',
          type: EmploymentType.Owner,
          timespan: {
            from: new Date('2007-04'),
            to: new Date('2011-03'),
          },
          description: 'web-developer for small web-applications',
        },
      ],
      projects: [
        {
          name: 'ACHT-CMS | multiple web-applications',
          description: 'Created multiple web applications, many based on a in-house designed Content Management System built on top of an internal written object oriented php framework.',
          timespan: {
            from: new Date('2007-04'),
            to: new Date('2011-03'),
          },
          technologies: [
            {
              name: 'App development',
              proficiency: 100,
              tags: ['Software Development'],
            },
            {
              name: 'front-end',
              proficiency: 60,
              tags: ['Software Development'],
            },
            {
              name: 'back-end',
              proficiency: 50,
              tags: ['Software Development'],
            },
            {
              name: 'JavaScript',
              proficiency: 50,
              min: 50,
              tags: ['Programming Language'],
            },
            {
              name: 'php',
              proficiency: 60,
              tags: ['Programming Language'],
            },
            {
              name: 'MySQL',
              proficiency: 60,
              tags: ['Database', 'Data'],
            },
            {
              name: 'HTML',
              proficiency: 70,
              tags: ['Web Development'],
            },
            {
              name: 'CSS',
              proficiency: 40,
              tags: ['Web Development'],
            },
          ],
        },
      ],
    },
  ],
  skills: [],
  education: [],
  languages: [
    { proficiency: LanguageProficiency.Native, code: 'NL', name: 'Dutch' },
    {
      proficiency: LanguageProficiency.Professional,
      code: 'EN',
      name: 'English',
    },
  ],
  interests: [],
  hobbies: [],
};
