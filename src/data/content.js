export const aboutData = {
  id: "about",
  title: "ABOUT ME",
  heading: "Who Am I?",
  image: "/img/about1.jpg",
  blurb: "PhD Researcher exploring the ethics of implicit interaction.",
  content: [
    "Hi, I'm Chris. I've had a pretty varied career—from teaching and scuba diving to political advising—but right now, I'm a PhD Researcher in Interaction Design and Human-Computer Interaction. My focus is on design ethics, particularly when it comes to implicit interaction.",
    "I study how designers navigate the tricky power dynamics involved in passive sensing systems that use biometric, spatial, and neural data. I'm interested in how we think ethically when building these complex systems, and how we can do better.",
    "A big part of that is education. I'm working on ways to improve how we train designers, ensuring the next generation of tech developers is equipped to support human dignity in everything they build."
  ]
};

export const projectsData = [
  {
    id: "portfolio-1",
    title: "Employee Database",
    heading: "Employee Database",
    image: "/img/employee1.jpg",
    blurb: "A simple WebApp to present, sort, and filter employee information using the Fetch API",
    content: [
      "A simple WebApp to present, sort, and filter employee information using the Fetch API.",
      "This project fetches data from the Random User Generator API to dynamically build an interactive employee directory. Employees can be filtered within the browser, and more information can be access via an engaging modal display."
    ],
    links: {
      live: "https://uqcadams.github.io/FEWD-project8-API-employee-directory/",
      repo: "https://github.com/uqcadams/FEWD-project8-API-employee-directory"
    }
  },
  {
    id: "portfolio-2",
    title: "WebApp Dashboard",
    heading: "WebApp Dashboard",
    image: "/img/dashboard4.jpg",
    blurb: "An interactive dashboard for visualising data using JavaScript and SVG animations.",
    content: [
      "An interactive dashboard for visualising data using JavaScript and SVG animations.",
      "This dashboard application displays detailed user information through a number of interactive data visualisations. Built to accommodate mobile, tablet, and desktop displays, it utilises CSS Grid to adjust and update content layout according to the current viewport size."
    ],
    links: {
      live: "https://uqcadams.github.io/FEWD-project7-webapp-dashboard",
      repo: "https://github.com/uqcadams/FEWD-project7-webapp-dashboard"
    }
  },
  {
    id: "portfolio-3",
    title: "Game Show App",
    heading: "Game Show App",
    image: "/img/img5.jpg",
    blurb: "A JavaScript-driven word guessing game following traditional hangman rules.",
    content: [
      "A JavaScript-driven word guessing game following traditional hangman rules.",
      "This WebApp uses JavaScript to dynamically present a randomly chosen phrase in the DOM, and uses onscreen click events to allow users to select letters that may or may not appear within the phrase. Players are allowed to make five incorrect guesses before losing the game."
    ],
    links: {
      live: "https://uqcadams.github.io/FEWD-project6-game-show-app/",
      repo: "https://github.com/uqcadams/FEWD-project6-game-show-app"
    }
  },
  {
    id: "portfolio-4",
    title: "Interactive Photo Gallery",
    heading: "Interactive Photo Gallery",
    image: "/img/gallery5.jpg",
    blurb: "A searchable photo gallery that allows users to filter images according to pre-assigned tags.",
    content: [
      "An interactive and searchable photo gallery built with CSS Grid and Javascript.",
      "This project displays a series of selected photographs in a structured grid layout. Images can be filtered according to assigned tags, and displayed in a lightbox slider. The interface is updated and adjusted based on image selection."
    ],
    links: {
      live: "https://uqcadams.github.io/FEWD-project5-interactive-photo-gallery/",
      repo: "https://github.com/uqcadams/FEWD-project5-interactive-photo-gallery"
    }
  },
  {
    id: "portfolio-5",
    title: "Web Style Guide",
    heading: "Web Style Guide",
    image: "/img/style1.jpg",
    blurb: "A Sass microframework for rapidly prototyping styles on websites.",
    content: [
      "A digital style guide that uses the power of Sass partials, variables, and mixins to rapidly prototype new designs.",
      "This project demonstrates an evolving skillset in working with Sass and SCSS to make CSS more maneagable within my webdesign workflow. Color palletes can be easily swapped and interchanged to create new and engaging designs."
    ],
    links: {
      live: "https://uqcadams.github.io/FEWD-project4-web-style-guide/",
      repo: "https://github.com/uqcadams/FEWD-project4-web-style-guide"
    }
  }
];

export const currentProjectsData = {
  id: "current",
  title: "Current Projects",
  heading: "Current Projects",
  image: "/img/current3.jpg",
  blurb: "Other projects I am currently working on.",
  intro: "I'm always trying to keep a few projects on the go.",
  projects: [
    {
      name: "Project 1: Australian Wildlife Word Game.",
      description: "This work is an evolution of the Game Show App. It fetches data from the Australian Wildlife API, and randomly generates a phrase based on a common Australian animal. When the game is completed, an animal profile is generated to educate the user about the conservation status of the animal. Images are dynamically populated using both the iNaturalist and WikiMedia APIs.",
      links: {
        live: "https://uqcadams.github.io/FEWD-project6-game-show-app/",
        repo: "https://github.com/uqcadams/FEWD-project6-game-show-app"
      }
    },
    {
      name: "Project 2: Ongoing portfolio redevelopment.",
      description: "The initial design proposal for this portfolio rapidly evolved throughout the development of the project. Ultimately, what I feel looks aesthetically pleasing is bloated with some unnecessary design structures. Limitations have emerged through a fixed height section design. A mix of flexbox and absolute-positioned content was used to allow for text to overlap images - but in retrospect, this could be designed far more smoothly with CSS Grid. I will revisit this project.",
      links: {
        notes: "https://docs.google.com/document/d/1S9wytNidwB4HdTeXyMmguWelo_RZjv60AQSteRrGEYQ/edit?usp=sharing"
      }
    }
  ]
};
