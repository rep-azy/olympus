export const myProjects = [
  {
    id: 1,
    title: "Mayday",
    description:
      "An emergency reporting system for Indang, Cavite, enabling community reporting and streamlined management for responders and administrators via mobile and web platforms.",
    subDescription: [
      "Built with React Native (mobile) and React (web dashboard).",
      "Used Firebase for authentication, Firestore database, and cloud storage.",
      "Implemented role-based access for community, responder, and admin workflows.",
      "Developed the admin dashboard with Material UI and DataGrid.",
      "Added mobile features for reports, photo evidence, geolocation, and responder tracking.",
      "Applied TailwindCSS and custom styling for a modern, responsive UI.",
    ],
    href: "",
    logo: "/assets/logos/mayday.png",
    image: "/assets/projects/mayday-web.png",
    tags: [
      {
        id: 1,
        name: "React Native",
        path: "/assets/logos/reactnative.svg",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "Firebase",
        path: "/assets/logos/firebase.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 5,
        name: "Material UI",
        path: "/assets/logos/mui.svg",
      },
    ],
  },
  {
    id: 2,
    title: "GEOMAP: An Android-based Geographic Emergency Reporting System",
    description:
      "A mobile-first emergency reporting system designed to connect community users with responders, integrating real-time geolocation, tracking, and optimized routing.",
    subDescription: [
      "Developed with React Native for cross-platform mobile deployment.",
      "Utilized Firebase Realtime Database for secure, real-time data management.",
      "Integrated Google Maps API for GPS, mapping, and geolocation features.",
      "Implemented Dijkstra's and A* pathfinding algorithms for optimal route calculation and ETA prediction.",
      "Covered four core modules: user management, geolocation, tracking, and reporting."
    ],
    href: "",
    logo: "",
    image: "/assets/projects/geomap-web-reports.png",
    tags: [
      {
        id: 1,
        name: "React Native",
        path: "/assets/logos/reactnative.svg",
      },
      {
        id: 2,
        name: "Firebase",
        path: "/assets/logos/firebase.svg",
      },
      {
        id: 3,
        name: "Google Maps",
        path: "/assets/logos/googlemaps.png",
      },
      {
        id: 4,
        name: "Pathfinding",
        path: "/assets/logos/algorithm.png",
      },
    ],
  }
  /* {
    id: 3,
    title: "Blazor Web App",
    description:
      "A modern, interactive web application built with Blazor WebAssembly and .NET Core.",
    subDescription: [
      "Developed a fully interactive Single Page Application (SPA) using Blazor WebAssembly.",
      "Implemented API interactions using .NET Core for a robust backend.",
      "Designed responsive UI components with Tailwind CSS for an enhanced UX.",
      "Integrated SQLite for efficient client-side database storage.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/blazor-app.jpg",
    tags: [
      {
        id: 1,
        name: "Blazor",
        path: "/assets/logos/blazor.svg",
      },
      {
        id: 2,
        name: ".NET Core",
        path: "/assets/logos/dotnetcore.svg",
      },
      {
        id: 3,
        name: "SQLite",
        path: "/assets/logos/sqlite.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 4,
    title: "C++ Game Engine",
    description:
      "A lightweight C++ game engine designed for 2D and 3D game development.",
    subDescription: [
      "Built a powerful rendering engine using OpenGL and C++.",
      "Developed a physics engine with collision detection and particle effects.",
      "Implemented a scripting system for easy game customization.",
      "Optimized performance with multi-threading and efficient memory management.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/game-engine.jpg",
    tags: [
      {
        id: 1,
        name: "C++",
        path: "/assets/logos/cplusplus.svg",
      },
      {
        id: 2,
        name: "C#",
        path: "/assets/logos/csharp.svg",
      },
      {
        id: 3,
        name: "Git",
        path: "/assets/logos/git.svg",
      },
      {
        id: 4,
        name: "Microsoft",
        path: "/assets/logos/microsoft.svg",
      },
    ],
  },
  {
    id: 5,
    title: "WordPress Custom Theme",
    description:
      "A fully customizable WordPress theme optimized for performance and SEO.",
    subDescription: [
      "Developed a responsive WordPress theme using HTML5, CSS3, and JavaScript.",
      "Integrated Tailwind CSS for modern styling and UI enhancements.",
      "Optimized SEO and page speed using Vite.js for fast builds.",
      "Implemented custom widgets and plugin compatibility for extended functionality.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/wordpress-theme.jpg",
    tags: [
      {
        id: 1,
        name: "WordPress",
        path: "/assets/logos/wordpress.svg",
      },
      {
        id: 2,
        name: "HTML5",
        path: "/assets/logos/html5.svg",
      },
      {
        id: 3,
        name: "CSS3",
        path: "/assets/logos/css3.svg",
      },
      {
        id: 4,
        name: "Vite.js",
        path: "/assets/logos/vitejs.svg",
      },
    ],
  },
  {
    id: 6,
    title: "Online Learning Platform",
    description:
      "A web application that allows users to enroll in courses, watch video lectures, and take quizzes.",
    subDescription: [
      "Built using Blazor WebAssembly for a seamless SPA experience.",
      "Implemented video streaming with Azure Media Services.",
      "Added a quiz system with dynamic question generation and real-time grading.",
      "Integrated Stripe API for secure payment processing.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/elearning.jpg",
    tags: [
      {
        id: 1,
        name: "Blazor",
        path: "/assets/logos/blazor.svg",
      },
      {
        id: 2,
        name: "Azure",
        path: "/assets/logos/azure.svg",
      },
      {
        id: 3,
        name: "Stripe",
        path: "/assets/logos/stripe.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  }, */
];

export const mySocials = [
  {
    name: "Github",
    href: "https://github.com/rep-azy",
    icon: "/assets/socials/github.svg",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/azysumanting",
    icon: "/assets/socials/facebook.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/azy-sumanting",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Jobstreet",
    href: "https://ph.jobstreet.com/profile/azel-sumanting-W9H3p0fRmR",
    icon: "/assets/socials/jobstreet.svg",
  },
];

export const experiences = [
  {
    title: "Front-End Unit Intern",
    job: "Web Solutions & Consultancy",
    date: "Aug - Sep 2023",
    contents: [
      "Utilized VueJS, Axios, GitLab, and Quasar Framework to develop new features and pages, following company coding standards.",
      "Implemented a QR code plugin, drop-down options, dialog filters, modals, and tables with CRUD functionalities.",
      "Guided and evaluated new trainees by assisting with onboarding tasks and reviewing their work.",
      "Collaborated with a team of developers to complete tasks, configure the project environment, and ensure smooth teamwork.",
    ],
  },
  {
    title: "Software Developer Student",
    job: "Emergency Reporting System Project",
    date: "Jan 2025 - Present",
    contents: [
      "Developed a cross-platform emergency reporting system, consisting of a mobile application for the community and a web dashboard for administrators.",
      "Built the mobile application using React Native and JavaScript, integrating Google Maps API for geolocation, Firebase for authentication and database management, and Cloudinary API for secure photo evidence storage.",
      "Created the administrator dashboard with ReactJS, Leaflet, MUI, and TailwindCSS, using Firebase and Vercel for hosting, authentication, and database operations.",
      "Implemented data encryption with Crypto to ensure secure storage and handling of sensitive information.",
      "Collaborated with PNP administrators through presentations and live demonstrations, incorporating their feedback into system features and interface design.",
      "Conducted training sessions for personnel, demonstrating system functionalities such as report, user, station management, performance summary, and overall platform operations.",
    ],
  },
  {
    title: "Freelance Developer",
    job: "Self-Employed",
    date: "May 2025 - Present",
    contents: [
      "Created a personal portfolio using React, Vite, Three.js, and WebAPI to showcase technical expertise.",
      "Continuously enhancing technical skills and expanding expertise in modern web development and Back-End technologies.",
    ],
  },
];

export const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://robohash.org/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://robohash.org/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://robohash.org/john",
  },
  {
    name: "Alice",
    username: "@alice",
    body: "This is hands down the best thing I've experienced. Highly recommend!",
    img: "https://robohash.org/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "Incredible work! The attention to detail is phenomenal.",
    img: "https://robohash.org/bob",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "This exceeded all my expectations. Absolutely stunning!",
    img: "https://robohash.org/charlie",
  },
  {
    name: "Dave",
    username: "@dave",
    body: "Simply breathtaking. The best decision I've made in a while.",
    img: "https://robohash.org/dave",
  },
  {
    name: "Eve",
    username: "@eve",
    body: "So glad I found this. It has changed the game for me.",
    img: "https://robohash.org/eve",
  },
];
