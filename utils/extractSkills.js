const SKILL_MAP = {
  // * Common
  git: ["git"],
  gitlab: ["gitlab"],
  jenkins: ["jenkins"],
  ci: ["ci"],
  cd: ["cd"],
  "ci/cd": ["ci/cd", "continuous integration", "continuous deployment"],
  kubernetes: ["kubernetes", "k8s"],
  docker: ["docker"],
  javaScript: ["js", "javascript"],
  python: ["python", "python3"],
  django: ["django"],
  java: ["java", "spring", "spring boot"],
  restApi: ["rest", "rest api"],
  graphQL: ["graphQL"],
  trello: ["trello"],

  // * Backend
  nodejs: ["node", "node.js", "node js", "nodejs"],
  flask: ["flask"],
  ruby: ["ruby", "ruby on rails", "rails"],
  php: ["php", "laravel", "symfony"],
  "c#": ["c#", "dotnet", ".net"],
  go: ["golang", "go"],
  postgresql: ["postgres", "psql", "postgresql"],
  mongodb: ["mongo", "mongodb"],
  mysql: ["mysql"],
  redis: ["redis"],
  aws: ["aws", "amazon web services"],

  // * Frontend
  react: ["react", "reactjs", "react.js"],
  vue: ["vue", "vuejs", "vue.js"],
  angular: ["angular", "angularjs", "angular.js"],
  html: ["html", "html5"],
  css: ["css", "css3"],
  sass: ["sass", "scss"],
  less: ["less"],
  typeScript: ["typescript", "ts"],
  webpack: ["webpack"],
  vite: ["vite"],
  babel: ["babel"],
  redux: ["redux"],
  nextjs: ["nextjs", "next.js"],
  tailwindcss: ["tailwind", "tailwindcss"],
  jquery: ["jquery"],

  // * Analytic
  excel: ["excel", "ms excel"],
  sql: ["sql", "structured query language"],
  tableau: ["tableau"],
  powerbi: ["powerbi", "power bi"],
  pandas: ["pandas", "numpy", "matplotlib"],

  // * QA
  selenium: ["selenium"],
  postman: ["postman"],
  insomnia: ["insomnia"],
  jira: ["jira"],
  testlink: ["testlink"],
  manualTesting: [
    "manual testing",
    "тестирование вручную",
    "ручное тестирование",
  ],
  automationTesting: [
    "automation testing",
    "автоматизация тестирования",
    "автоматизация",
  ],
  cypress: ["cypress"],
  pytest: ["pytest", "python testing"],

  // * Desiginer
  figma: ["figma"],
  adobePhotoshop: ["photoshop", "adobe photoshop"],
  adobeIllustrator: ["illustrator", "adobe illustrator"],
  uiDesign: ["ui", "ui design"],
  uxDesign: ["ux", "ux design"],

  // * DevOps
  kubernetes: ["kubernetes", "k8s"],
  ansible: ["ansible"],
  terraform: ["terraform"],

  // * Mobile developer
  android: ["android"],
  ios: ["ios"],
  flutter: ["flutter"],
  reactNative: ["react native", "react-native"],
  swift: ["swift"],
  kotlin: ["kotlin"],

  // * Game developer
  unity: ["unity"],
  "unreal engine": ["unreal", "unreal engine"],
  "c++": ["c++", "cpp"],
  "c#": ["c#"],
  godot: ["godot"],
  blender: ["blender"],
};

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s]/gi, "")
    .replace(/\s+/g, " ");
};

export const extractSkills = (text) => {
  if (!text) return [];

  const normalized = normalizeText(text);
  const result = [];

  for (const [skill, aliases] of Object.entries(SKILL_MAP)) {
    if (aliases.some((a) => normalized.includes(a))) {
      result.push(skill);
    }
  }

  return result;
};
