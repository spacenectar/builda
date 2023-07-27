#! /usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  builda: () => builda,
  buildaQuestion: () => question_default,
  buildaSubstitute: () => substitute_default,
  changeCase: () => change_case_default,
  default: () => src_default,
  printMessage: () => print_message_default,
  throwError: () => throw_error_default
});
module.exports = __toCommonJS(src_exports);
var import_yargs = __toESM(require("yargs"));
var import_chalk12 = __toESM(require("chalk"));

// src/data/globals.ts
var globals_default = {
  "version": "5.1.4",
  "buildaDir": ".builda",
  "websiteUrl": "https://www.builda.app",
  "buildaReadmeFileName": "getting-started.md",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/spacenectar/builda"
  }
};

// src/scripts/builda-project/project.ts
var import_execa = __toESM(require("execa"));
var import_inquirer6 = __toESM(require("inquirer"));
var import_node_fs13 = __toESM(require("fs"));
var import_node_path11 = __toESM(require("path"));
var import_node_process4 = __toESM(require("process"));

// src/helpers/console/print-logo.ts
var import_chalk = __toESM(require("chalk"));
var print_logo_default = () => {
  return console.log(
    import_chalk.default.magenta(`
  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 ${import_chalk.default.white(
      `v${globals_default.version}
`
    )}
  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2584  \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588 \u2588\u2588\u2588      \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2584   \u2584\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588
  \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588 \u2588\u2588\u2588      \u2588\u2588\u2588   \u2580\u2588\u2588\u2588 \u2588\u2588\u2588\u2580   \u2588\u2588\u2588
  \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588 \u2588\u2588\u2588      \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588    \u2588\u2588\u2588
  \u2588\u2588\u2588\u2584\u2584\u2584\u2588\u2588\u2580  \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588 \u2588\u2588\u2588      \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588    \u2588\u2588\u2588
  \u2588\u2588\u2588\u2580\u2580\u2580\u2588\u2588\u2584  \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588 \u2588\u2588\u2588      \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588
  \u2588\u2588\u2588    \u2588\u2588\u2584 \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588 \u2588\u2588\u2588      \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588    \u2588\u2588\u2588
  \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588 \u2588\u2588\u2588      \u2588\u2588\u2588   \u2584\u2588\u2588\u2588 \u2588\u2588\u2588    \u2588\u2588\u2588
  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2580   \u2580\u2588\u2588\u2588\u2588\u2588\u2588\u2580  \u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2580  \u2588\u2588\u2588    \u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588

  ${import_chalk.default.white.bold(
      "The Everything Generator"
    )} \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588
`)
  );
};

// src/helpers/console/print-message.ts
var import_chalk2 = __toESM(require("chalk"));
var import_process = __toESM(require("process"));
var import_readline = __toESM(require("readline"));
var dots = {
  interval: 80,
  frames: ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"]
};
var stdOut = import_process.default.stdout;
var stderr = import_process.default.stderr;
var timer = void 0;
var printMessage = (message2, type, returnstring) => {
  let newMessage = null;
  if (type && type === "error") {
    if (timer !== void 0) {
      clearInterval(timer);
    }
    newMessage = import_chalk2.default.red(`\u{1F6A8} ${message2}`);
  }
  if (type && type === "danger") {
    newMessage = import_chalk2.default.red(`${message2}`);
  }
  if (type && type === "warning") {
    newMessage = import_chalk2.default.yellow(`\u{1F514} ${message2}`);
  }
  if (type && type === "config") {
    newMessage = import_chalk2.default.blue(`\u{1F527} ${message2}`);
  }
  if (type && type === "downloading") {
    newMessage = import_chalk2.default.blue(`\u{1F30D} ${message2}`);
  }
  if (type && type === "copying") {
    newMessage = import_chalk2.default.blue(`\u{1F4C2} ${message2}`);
  }
  if (type && type === "installing") {
    newMessage = import_chalk2.default.blue(`\u{1F4E6} ${message2}`);
  }
  if (type && type === "notice") {
    newMessage = import_chalk2.default.blue(`\u{1F4DD} ${message2}`);
  }
  if (type && type === "info") {
    newMessage = import_chalk2.default.bgHex("#6699CC").white.bold(" i ") + " " + import_chalk2.default.reset.blue(message2);
  }
  if (type && type === "success") {
    if (timer !== void 0) {
      clearInterval(timer);
    }
    newMessage = import_chalk2.default.green(`\u2705 ${message2}`);
  }
  if (type && type === "watch") {
    newMessage = import_chalk2.default.magenta(`\u{1F440} ${message2}`);
  }
  if (type && type === "build") {
    newMessage = import_chalk2.default.magenta(`\u{1F3D7} ${message2}`);
  }
  if (type && type === "run") {
    newMessage = import_chalk2.default.magenta(`\u{1F3C3} ${message2}`);
  }
  if (type && type === "primary") {
    newMessage = import_chalk2.default.magenta(`${message2}`);
  }
  if (type && type === "secondary") {
    newMessage = import_chalk2.default.white(`${message2}`);
  }
  if (type && type === "processing") {
    const spin = dots;
    const spinnerFrames = spin.frames;
    const spinnerTimeInterval = spin.interval;
    let index = 0;
    if (timer !== void 0) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      let now = spinnerFrames[index];
      if (now == void 0) {
        index = 0;
        now = spinnerFrames[index];
      }
      import_readline.default.clearLine(stdOut, 0);
      import_readline.default.cursorTo(stdOut, 0);
      stdOut.write(now);
      index = index >= spinnerFrames.length ? 0 : index + 1;
    }, spinnerTimeInterval);
    newMessage = import_chalk2.default.blue(`${message2}`);
  }
  if (!type) {
    newMessage = message2;
  }
  const returnType = type === "error" ? stderr : stdOut;
  return returnstring ? newMessage : returnType.write(`${newMessage}
`);
};
var print_message_default = printMessage;

// src/helpers/console/print-site-link.ts
var import_chalk3 = __toESM(require("chalk"));

// src/data/words.json
var adjectives = [
  "adorable",
  "adventurous",
  "aggressive",
  "agreeable",
  "alert",
  "alive",
  "amused",
  "angry",
  "annoyed",
  "annoying",
  "anxious",
  "arrogant",
  "ashamed",
  "attractive",
  "average",
  "awful",
  "bad",
  "beautiful",
  "better",
  "bewildered",
  "black",
  "bloody",
  "blue",
  "blue-eyed",
  "blushing",
  "bored",
  "brainy",
  "brave",
  "breakable",
  "bright",
  "busy",
  "calm",
  "careful",
  "cautious",
  "charming",
  "cheerful",
  "clean",
  "clear",
  "clever",
  "cloudy",
  "clumsy",
  "colorful",
  "combative",
  "comfortable",
  "concerned",
  "condemned",
  "confused",
  "cooperative",
  "courageous",
  "crazy",
  "creepy",
  "crowded",
  "cruel",
  "curious",
  "cute",
  "dangerous",
  "dark",
  "dead",
  "defeated",
  "defiant",
  "delightful",
  "depressed",
  "determined",
  "different",
  "difficult",
  "disgusted",
  "distinct",
  "disturbed",
  "dizzy",
  "doubtful",
  "drab",
  "dull",
  "eager",
  "easy",
  "elated",
  "elegant",
  "embarrassed",
  "enchanting",
  "encouraging",
  "energetic",
  "enthusiastic",
  "envious",
  "evil",
  "excited",
  "expensive",
  "exuberant",
  "fair",
  "faithful",
  "famous",
  "fancy",
  "fantastic",
  "fierce",
  "filthy",
  "fine",
  "foolish",
  "fragile",
  "frail",
  "frantic",
  "friendly",
  "frightened",
  "funny",
  "gentle",
  "gifted",
  "glamorous",
  "gleaming",
  "glorious",
  "good",
  "gorgeous",
  "graceful",
  "grieving",
  "grotesque",
  "grumpy",
  "handsome",
  "happy",
  "healthy",
  "helpful",
  "helpless",
  "hilarious",
  "homeless",
  "homely",
  "horrible",
  "hungry",
  "hurt",
  "ill",
  "important",
  "impossible",
  "inexpensive",
  "innocent",
  "inquisitive",
  "itchy",
  "jealous",
  "jittery",
  "jolly",
  "joyous",
  "kind",
  "lazy",
  "light",
  "lively",
  "lonely",
  "long",
  "lovely",
  "lucky",
  "magnificent",
  "misty",
  "modern",
  "motionless",
  "muddy",
  "mushy",
  "mysterious",
  "nasty",
  "naughty",
  "nervous",
  "nice",
  "nutty",
  "obedient",
  "obnoxious",
  "odd",
  "old-fashioned",
  "open",
  "outrageous",
  "outstanding",
  "panicky",
  "perfect",
  "plain",
  "pleasant",
  "poised",
  "poor",
  "powerful",
  "precious",
  "prickly",
  "proud",
  "putrid",
  "puzzled",
  "quaint",
  "real",
  "relieved",
  "repulsive",
  "rich",
  "scary",
  "selfish",
  "shiny",
  "shy",
  "silly",
  "sleepy",
  "smiling",
  "smoggy",
  "sore",
  "sparkling",
  "splendid",
  "spotless",
  "stormy",
  "strange",
  "stupid",
  "successful",
  "super",
  "talented",
  "tame",
  "tasty",
  "tender",
  "tense",
  "terrible",
  "thankful",
  "thoughtful",
  "thoughtless",
  "tired",
  "tough",
  "troubled",
  "ugliest",
  "ugly",
  "uninterested",
  "unsightly",
  "unusual",
  "upset",
  "uptight",
  "vast",
  "victorious",
  "vivacious",
  "wandering",
  "weary",
  "wicked",
  "wide-eyed",
  "wild",
  "witty",
  "worried",
  "worrisome",
  "wrong",
  "zany",
  "zealous"
];
var nouns = [
  "Actor",
  "Gold",
  "Painting",
  "Advertisement",
  "Grass",
  "Parrot",
  "Afternoon",
  "Greece",
  "Pencil",
  "Airport",
  "Guitar",
  "Piano",
  "Ambulance",
  "Hair",
  "Pillow",
  "Animal",
  "Hamburger",
  "Pizza",
  "Answer",
  "Helicopter",
  "Planet",
  "Apple",
  "Helmet",
  "Plastic",
  "Army",
  "Holiday",
  "Portugal",
  "Australia",
  "Honey",
  "Potato",
  "Balloon",
  "Horse",
  "Queen",
  "Banana",
  "Hospital",
  "Quill",
  "Battery",
  "House",
  "Rain",
  "Beach",
  "Hydrogen",
  "Rainbow",
  "Beard",
  "Ice",
  "Raincoat",
  "Bed",
  "Insect",
  "Refrigerator",
  "Belgium",
  "Insurance",
  "Restaurant",
  "Boy",
  "Iron",
  "River",
  "Branch",
  "Island",
  "Rocket",
  "Breakfast",
  "Jackal",
  "Room",
  "Brother",
  "Jelly",
  "Rose",
  "Camera",
  "Jewellery",
  "Russia",
  "Candle",
  "Jordan",
  "Sandwich",
  "Car",
  "Juice",
  "School",
  "Caravan",
  "Kangaroo",
  "Scooter",
  "Carpet",
  "King",
  "Shampoo",
  "Cartoon",
  "Kitchen",
  "Shoe",
  "China",
  "Kite",
  "Soccer",
  "Church",
  "Knife",
  "Spoon",
  "Crayon",
  "Lamp",
  "Stone",
  "Crowd",
  "Lawyer",
  "Sugar",
  "Daughter",
  "Leather",
  "Sweden",
  "Death",
  "Library",
  "Teacher",
  "Denmark",
  "Lighter",
  "Telephone",
  "Diamond",
  "Lion",
  "Television",
  "Dinner",
  "Lizard",
  "Tent",
  "Disease",
  "Lock",
  "Thailand",
  "Doctor",
  "London",
  "Tomato",
  "Dog",
  "Lunch",
  "Toothbrush",
  "Dream",
  "Machine",
  "Traffic",
  "Dress",
  "Magazine",
  "Train",
  "Easter",
  "Magician",
  "Truck",
  "Egg",
  "Manchester",
  "Uganda",
  "Eggplant",
  "Market",
  "Umbrella",
  "Egypt",
  "Match",
  "Van",
  "Elephant",
  "Microphone",
  "Vase",
  "Energy",
  "Monkey",
  "Vegetable",
  "Engine",
  "Morning",
  "Vulture",
  "England",
  "Motorcycle",
  "Wall",
  "Evening",
  "Nail",
  "Whale",
  "Eye",
  "Napkin",
  "Window",
  "Family",
  "Needle",
  "Wire",
  "Finland",
  "Nest",
  "Xylophone",
  "Fish",
  "Nigeria",
  "Yacht",
  "Flag",
  "Night",
  "Yak",
  "Flower",
  "Notebook",
  "Zebra",
  "Football",
  "Ocean",
  "Zoo",
  "Forest",
  "Oil",
  "Garden",
  "Fountain",
  "Orange",
  "Gas",
  "France",
  "Oxygen",
  "Girl",
  "Furniture",
  "Oyster",
  "Glass",
  "Garage",
  "Ghost"
];

// src/helpers/string/random-word-generator.ts
var randomNameGenerator = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective.toLowerCase()}-${noun.toLowerCase()}`;
};
var random_word_generator_default = randomNameGenerator;

// src/data/website-paths.json
var website_paths_default = {
  root: {
    root: "/"
  },
  tradeStore: {
    root: "trade-store",
    prefabs: "prefabs",
    blueprints: "blueprints"
  },
  docs: {
    root: "docs",
    gettingStarted: "getting-started",
    prefabs: "prefabs",
    config: "config-file",
    blueprints: "blueprints",
    telemetry: "telemetry",
    init: "initialise-a-project",
    resolvers: "resolvers",
    indexes: "indexes"
  }
};

// src/helpers/string/get-site-link.ts
var get_site_link_default = (slug, anchor) => {
  const { websiteUrl: websiteUrl3 } = globals_default;
  const pathParts = slug.split("/");
  const paths = website_paths_default;
  const rootPath = pathParts[0] || "./";
  const outputPaths = pathParts.map((pathPart) => {
    var _a;
    if (pathPart === rootPath) {
      return pathPart;
    }
    return (_a = paths[rootPath]) == null ? void 0 : _a[pathPart];
  });
  return `${websiteUrl3}/${outputPaths.join("/")}${anchor ? `#${anchor}` : ""}`;
};

// src/helpers/string/detect-path-type.ts
var detectPathType = (pathString) => {
  if (pathString.startsWith("/") || pathString.startsWith("./") || pathString.startsWith("..") || pathString.startsWith("~")) {
    return "local";
  }
  return "remote";
};
var detect_path_type_default = detectPathType;

// src/helpers/string/detect-case.ts
var detectCase = (input) => {
  const snakeCaseRegex = /^(?:[a-zA-Z:]+_[a-zA-Z:]+)+$/;
  const pascalCaseRegex = /^(?:[A-Z]{1}[a-zA-Z:]+[A-Z]{1}[a-zA-Z:]+)+$/;
  const camelCaseRegex = /^(?:[a-z]{1}[a-zA-Z:]+[A-Z]{1}[a-zA-Z:]+)+$/;
  const sentenceCaseRegex = /^(?:[a-zA-Z:]+ [a-zA-Z:]+)+$/;
  const kebabCaseRegex = /^(?:[a-zA-Z:]+-[a-zA-Z:]+)+$/;
  if (snakeCaseRegex.test(input)) {
    return "snake";
  }
  if (pascalCaseRegex.test(input)) {
    return "pascal";
  }
  if (camelCaseRegex.test(input)) {
    return "camel";
  }
  if (sentenceCaseRegex.test(input)) {
    return "sentence";
  }
  if (kebabCaseRegex.test(input)) {
    return "kebab";
  }
  return "unknown";
};

// src/helpers/string/normalise-case.ts
var removeExtraSpaces = (input) => {
  return input.replace(/\s{2,}/g, " ").trim();
};
var normalizeCase = (input) => {
  const caseType = detectCase(input);
  const words = input.split(/(?=[A-Z:])/).filter((word) => word !== ":");
  const lowerCasedWords = words.slice(1).map((word) => word.toLowerCase());
  if (caseType === "snake") {
    const str = input.replace(/_/g, " ").toLowerCase().replace(/:/g, " ");
    return removeExtraSpaces(str);
  }
  if (caseType === "pascal") {
    const str = input.split(/(?=[A-Z])/).map((word) => word.toLowerCase()).join(" ").replace(/:/g, " ");
    return removeExtraSpaces(str);
  }
  if (caseType === "camel") {
    const firstWord = words[0] || "";
    lowerCasedWords.unshift(firstWord.toLowerCase());
    const str = lowerCasedWords.join(" ");
    return removeExtraSpaces(str);
  }
  if (caseType === "kebab") {
    const str = input.replace(/-/g, " ").replace(/:/g, " ").toLowerCase();
    return removeExtraSpaces(str);
  }
  if (caseType === "sentence") {
    return removeExtraSpaces(input.replace(/:/g, ""));
  }
  return input;
};

// src/helpers/string/convert-numbers-to-words.ts
var ONES = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine"
];
var TEENS = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen"
];
var TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Fourty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety"
];
var convertNumbersToWords = (input) => {
  const findNumbers = /\d+/g;
  const numbers = input.match(findNumbers);
  if (numbers) {
    const numberString = numbers.map((number) => {
      const numberIndex = parseInt(number, 10);
      if (numberIndex < 10) {
        return ":" + ONES[numberIndex];
      }
      if (numberIndex < 20) {
        return ":" + TEENS[numberIndex - 10];
      }
      if (numberIndex < 100) {
        return ":" + TENS[Math.floor(numberIndex / 10)] + ONES[numberIndex % 10];
      }
      if (numberIndex < 1e3) {
        const isWholeHundred = numberIndex % 100 === 0;
        let numberString2 = ":" + ONES[Math.floor(numberIndex / 100)] + ":Hundred";
        if (!isWholeHundred) {
          numberString2 += ":And:" + TENS[Math.floor(numberIndex % 100 / 10)] + ":" + ONES[numberIndex % 10];
        }
        return numberString2;
      }
      if (numberIndex < 1e6) {
        return convertNumbersToWords(Math.floor(numberIndex / 1e3).toString()) + ":Thousand" + convertNumbersToWords((numberIndex % 1e3).toString());
      }
      throw new Error("Numbers larger than 1 million are not supported");
    }).join(":");
    return input.replace(findNumbers, numberString);
  }
  return input;
};

// src/helpers/string/convert-symbols-to-words.ts
var convertSymbolsToWords = (input) => {
  return input.replace(/&/g, ":And").replace(/@/g, ":At").replace(/#/g, ":Hash").replace(/\$/g, ":Dollar").replace(/£/g, ":Pound").replace(/%/g, ":Percent").replace(/\+/g, ":Plus").replace(/\*/g, ":Asterisk");
};

// src/helpers/string/convert-to-builda-script.ts
var convertToBuildaScript = (key, value) => {
  if (value.startsWith("builda") || value.startsWith("run-s") || value.startsWith("run-p") || value.startsWith("npm-run-all") || value.startsWith("concurrently")) {
    return value;
  }
  return `builda x ${key}`;
};
var convert_to_builda_script_default = convertToBuildaScript;

// src/helpers/string/change-case.ts
var changeCase = (input, type) => {
  const str = input;
  const firstPass = convertSymbolsToWords(str);
  const secondPass = convertNumbersToWords(firstPass);
  const normalisedStr = normalizeCase(secondPass);
  const wordArray = normalisedStr.split(" ");
  switch (type) {
    case "snakeCase":
      return wordArray.join("_").toLowerCase();
    case "kebabCase":
      return wordArray.join("-").toLowerCase();
    case "pascalCase":
      return wordArray.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join("");
    case "camelCase":
      return wordArray.map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toLowerCase() + word.slice(1);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join("");
    case "sentenceCase":
    default:
      return wordArray.map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word.charAt(0).toLowerCase() + word.slice(1);
      }).join(" ");
  }
};
var change_case_default = changeCase;

// src/helpers/console/print-site-link.ts
var print_site_link_default = ({ link, anchor, endText }) => {
  endText = endText || "for more information.";
  return "\n\nSee " + import_chalk3.default.blue.underline(get_site_link_default(link, anchor)) + " " + endText;
};

// src/helpers/console/show-help.ts
var import_chalk4 = __toESM(require("chalk"));
var import_inquirer = __toESM(require("inquirer"));
var show_help_default = (message2, type) => {
  console.clear();
  print_logo_default();
  const ui = new import_inquirer.default.ui.BottomBar();
  const consoleWidth = process.stdout.columns;
  type = type || "info";
  let colour = "bgBlue";
  let icon = "i";
  if (type === "error") {
    colour = "bgRed";
    icon = "\u2716";
  }
  if (type === "success") {
    colour = "bgGreen";
    icon = "\u2714";
  }
  if (type === "warning") {
    colour = "bgYellow";
    icon = "\u26A0";
  }
  if (type === "builda") {
    colour = "bgMagenta";
    icon = "B\u0333";
  }
  const iconTag = "  " + import_chalk4.default.bold.white[colour](`  ${icon}  `);
  const paddingLine = "  " + // @ts-ignore-implicit-any - chalk typings are wrong
  import_chalk4.default[colour](" ".repeat(5)) + " " + // @ts-ignore-implicit-any - chalk typings are wrong
  import_chalk4.default[colour](" ".repeat(consoleWidth - 10)) + "\n";
  const tag = paddingLine + iconTag + " " + // @ts-ignore-implicit-any - chalk typings are wrong
  import_chalk4.default.bold.white[colour](
    `  ${type.toUpperCase()}${" ".repeat(consoleWidth - type.length - 12)}
`
  ) + paddingLine;
  const line = import_chalk4.default.white("\u2500".repeat(consoleWidth));
  const paddedMessage = message2.replace(/\n/g, "\n  ");
  const wrappedMessage = paddedMessage.replace(
    new RegExp(`(.{${consoleWidth - 20}})(\\s|$)`, "g"),
    "$1\n  "
  );
  ui.log.write(
    `
${tag}\r
  ${import_chalk4.default.white(wrappedMessage)}\r

${line}\r

`
  );
};

// src/helpers/console/throw-error.ts
var throw_error_default = (message2) => {
  const newMessage = print_message_default(message2, "danger", true);
  throw new Error(newMessage);
};

// src/helpers/console/confirm.ts
var import_chalk5 = __toESM(require("chalk"));
var import_process2 = __toESM(require("process"));
var import_readline2 = __toESM(require("readline"));
var confirm = (message2) => {
  return new Promise((resolve) => {
    const rl = import_readline2.default.createInterface({
      input: import_process2.default.stdin,
      output: import_process2.default.stdout
    });
    rl.question(import_chalk5.default.blue(`\u{1F914} ${message2} [y/N] `), (answer) => {
      answer = answer.toLowerCase();
      rl.close();
      if (answer === "y") {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
var confirm_default = confirm;

// src/helpers/file/check-and-copy-path.ts
var import_fs = __toESM(require("fs"));
var copyPath = (sourcePath, destinationPath) => {
  return import_fs.default.cpSync(sourcePath, destinationPath, {
    dereference: true,
    recursive: true,
    force: true
  });
};
var check_and_copy_path_default = copyPath;

// src/helpers/file/copy-dir.ts
var import_node_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
var copyDir = (source, destination) => {
  if (!import_node_fs.default.existsSync(destination)) {
    import_node_fs.default.mkdirSync(destination, { recursive: true });
  }
  import_node_fs.default.readdirSync(source).forEach((file) => {
    const srcPath = import_node_path.default.resolve(source, file);
    const destPath = import_node_path.default.join(destination, file);
    if (import_node_fs.default.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      import_node_fs.default.cpSync(srcPath, destPath, {
        recursive: true,
        dereference: true
      });
    }
  });
};
var copy_dir_default = copyDir;

// src/helpers/file/update-config.ts
var import_fs2 = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var updateConfig = (update) => {
  if (import_fs2.default.existsSync(import_path.default.resolve(process.cwd(), "package.json"))) {
    const configFile = JSON.parse(
      import_fs2.default.readFileSync(import_path.default.resolve(process.cwd(), "package.json"), "utf8")
    );
    const config = configFile;
    const newConfig = __spreadProps(__spreadValues({}, config), {
      builda: update === null ? void 0 : __spreadValues({}, update)
    });
    import_fs2.default.writeFileSync(
      import_path.default.resolve(process.cwd(), "package.json"),
      JSON.stringify(newConfig, null, 2)
    );
  } else {
    throw_error_default("No package.json found in project");
  }
};
var update_config_default = updateConfig;

// src/helpers/file/create-dir.ts
var import_fs3 = __toESM(require("fs"));
var createDir = async (dirPath) => {
  try {
    if (!import_fs3.default.existsSync(dirPath)) {
      import_fs3.default.mkdirSync(dirPath, { recursive: true });
    }
    return true;
  } catch (err) {
    return false;
  }
};
var create_dir_default = createDir;

// src/helpers/file/get-config.ts
var import_fs4 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var getConfig = (allowFailure) => {
  if (import_fs4.default.existsSync(import_path2.default.resolve(process.cwd(), "package.json"))) {
    const configFile = JSON.parse(
      import_fs4.default.readFileSync(import_path2.default.resolve(process.cwd(), "package.json"), "utf8")
    );
    const config = configFile.builda;
    if (!config && !allowFailure) {
      throw_error_default('No "builda" entry found in package.json');
    } else if (!config && allowFailure) {
      return {};
    }
    return config;
  }
  return throw_error_default("No package.json found in project");
};
var get_config_default = getConfig;

// src/helpers/file/get-ignore-list.ts
var import_fs5 = __toESM(require("fs"));
var import_path3 = __toESM(require("path"));
var getInitialList = (ignoreFilePath, prefabDir) => {
  const ignoreList = [];
  const ignoreFile = import_fs5.default.readFileSync(ignoreFilePath, "utf8");
  const lines = ignoreFile.split("\n");
  for (const line of lines) {
    if (line !== "" && line.startsWith("@extends")) {
      const extendsFile = line.split(" ")[1];
      if (import_fs5.default.existsSync(import_path3.default.resolve(prefabDir, extendsFile))) {
        const extendsIgnoreFile = import_fs5.default.readFileSync(
          import_path3.default.resolve(prefabDir, extendsFile),
          "utf8"
        );
        const extendsLines = extendsIgnoreFile.split("\n");
        for (const extendsLine of extendsLines) {
          if (extendsLine !== "" && !extendsLine.startsWith("#")) {
            if (extendsFile == null ? void 0 : extendsFile.includes("/")) {
              const fileName = extendsFile.split("/").pop();
              const directoryPath = extendsFile.replace(fileName, "");
              ignoreList.push(import_path3.default.join(directoryPath, extendsLine));
            } else {
              ignoreList.push(extendsLine);
            }
          }
        }
      } else {
        throw_error_default(
          `File ${extendsFile} does not exist. Please check your .buildaignore file.`
        );
      }
    } else if (line !== "" && line.startsWith("@")) {
      throw_error_default(
        `Invalid line in .buildaignore file: ${line}. Only @extends is allowed to start with @.`
      );
    } else if (line !== "" && line.startsWith("!")) {
      continue;
    } else if (line !== "" && !line.startsWith("#")) {
      ignoreList.push(line);
    }
  }
  return [...new Set(ignoreList)];
};
var extendIgnoreList = (prefabDir, ignoreList) => {
  const extendedIgnoreList = [];
  for (const ignoreItem of ignoreList) {
    const ignoreItemPath = import_path3.default.join(prefabDir, ignoreItem);
    if (ignoreItem.includes("*")) {
      continue;
    } else if (ignoreItem.includes("/")) {
      extendedIgnoreList.push(ignoreItemPath);
    } else {
      extendedIgnoreList.push(`**/${ignoreItem}`);
    }
  }
  return extendedIgnoreList;
};
var getIgnoreList = (workingDir, fromModule) => {
  const prefabDir = fromModule ? "module" : import_path3.default.join(workingDir, "modules", "prefab");
  const ignoreFile = import_path3.default.resolve(prefabDir, ".buildaignore");
  if (import_fs5.default.existsSync(ignoreFile)) {
    const initialList = getInitialList(ignoreFile, prefabDir);
    return extendIgnoreList(prefabDir, initialList);
  }
  return [];
};
var get_ignore_list_default = getIgnoreList;

// src/helpers/file/loop-and-rewrite-files.ts
var import_node_path2 = __toESM(require("path"));
var import_node_fs2 = __toESM(require("fs"));
var import_glob = __toESM(require("glob"));
var loopAndRewriteFiles = async ({
  name,
  paths,
  ignore,
  substitute,
  fromRoot = false,
  fromCustomPath,
  toRoot = false
}) => {
  const { buildaDir: buildaDir2 } = globals_default;
  const prefabDir = import_node_path2.default.join(buildaDir2, "modules", "prefab");
  const workingDir = import_node_path2.default.join(buildaDir2, "export");
  const promises = [];
  for (const file of paths) {
    const filePath = fromRoot ? file : import_node_path2.default.join(prefabDir, file);
    if (ignore && check_if_ignored_default(buildaDir2, filePath)) {
      continue;
    }
    if (file.includes("*")) {
      const globFiles = import_glob.default.sync(filePath).map((f) => import_node_path2.default.relative(prefabDir, f));
      promises.push(
        await loopAndRewriteFiles({
          name,
          paths: globFiles,
          ignore,
          substitute,
          fromRoot,
          fromCustomPath,
          toRoot
        })
      );
    } else if (import_node_fs2.default.lstatSync(filePath).isDirectory()) {
      const files = import_node_fs2.default.readdirSync(filePath);
      const newFiles = files.map((f) => import_node_path2.default.join(file, f));
      promises.push(
        await loopAndRewriteFiles({
          name,
          paths: newFiles,
          ignore,
          substitute,
          fromRoot,
          fromCustomPath,
          toRoot
        })
      );
    } else {
      promises.push(
        new Promise((resolve) => {
          const basePath = import_node_path2.default.dirname(file);
          const fileName = import_node_path2.default.basename(file);
          const directoryPath = import_node_path2.default.join(workingDir, basePath);
          const rootDir = fromCustomPath ? fromCustomPath : import_node_path2.default.join(process.cwd(), "..", "..");
          const rootPath = import_node_path2.default.join(rootDir, basePath);
          if (check_if_ignored_default(buildaDir2, filePath)) {
            return;
          }
          create_dir_default(directoryPath);
          if (import_node_fs2.default.existsSync(filePath)) {
            const subs = substitute.map((substitution) => {
              if (substitution.reverseInExport) {
                return __spreadProps(__spreadValues({}, substitution), {
                  replace: substitution.with,
                  with: substitution.replace
                });
              }
              return substitution;
            });
            write_file_default({
              file: filePath,
              outputDir: directoryPath,
              substitute: subs,
              name
            });
            if (toRoot) {
              create_dir_default(rootPath);
              write_file_default({
                file: filePath,
                rename: fileName.replace("unique.", ""),
                outputDir: rootPath,
                substitute,
                name
              });
            }
          }
          resolve(filePath);
        })
      );
    }
  }
  await Promise.all(promises);
};
var loop_and_rewrite_files_default = loopAndRewriteFiles;

// src/helpers/file/write-file.ts
var import_fs6 = __toESM(require("fs"));
var import_path4 = __toESM(require("path"));
var import_prettier = __toESM(require("prettier"));
var prettierAllowedFileTypes = [
  "css",
  "html",
  "js",
  "jsx",
  "json",
  "less",
  "md",
  "mdx",
  "scss",
  "sass",
  "ts",
  "tsx",
  "yaml",
  "yml",
  "graphql"
];
var writeFile = ({
  file,
  rename,
  content,
  outputDir,
  substitute,
  name
}) => {
  let fileName = file;
  if (rename) {
    fileName = rename;
  }
  fileName = fileName == null ? void 0 : fileName.split("/").pop();
  const fileContent = file ? import_fs6.default.readFileSync(import_path4.default.resolve(file), "utf8") : "";
  let newContent = content != null ? content : fileContent;
  if (name) {
    newContent = fileContent.replace(/prefab-name-replace-string/g, change_case_default(name, "kebabCase")).replace(/%KEBAB_CASE%/g, change_case_default(name, "kebabCase")).replace(/%CAMEL_CASE%/g, change_case_default(name, "camelCase")).replace(/%SNAKE_CASE%/g, change_case_default(name, "snakeCase")).replace(/%PASCAL_CASE%/g, change_case_default(name, "pascalCase")).replace(/%SENTENCE_CASE%/g, change_case_default(name, "sentenceCase"));
  }
  if (substitute && substitute.length > 0) {
    substitute.forEach((sub) => {
      const needle = `${sub.replace}`;
      const regex = new RegExp(needle, "g");
      newContent = newContent.replace(regex, sub.with);
    });
  }
  const fileType = fileName == null ? void 0 : fileName.split(".").pop();
  if (fileType && prettierAllowedFileTypes.includes(fileType)) {
    newContent = file ? import_prettier.default.format(newContent, {
      filepath: import_path4.default.resolve(file)
    }) : newContent;
  }
  if (newContent) {
    return import_fs6.default.writeFileSync(`${outputDir}/${fileName}`, newContent);
  }
  throw new Error(`Could not write file ${fileName}`);
};
var write_file_default = writeFile;

// src/helpers/file/write-log-file.ts
var import_node_fs3 = __toESM(require("fs"));
var import_node_path3 = __toESM(require("path"));
var import_node_process = __toESM(require("process"));

// src/helpers/file/copy-paths-to-root.ts
var import_node_fs4 = __toESM(require("fs"));
var import_node_path4 = __toESM(require("path"));
var { buildaDir } = globals_default;
var copy_paths_to_root_default = async (paths, rootDir, deleteOriginal) => {
  const prefabDir = import_node_path4.default.join(rootDir, buildaDir, "modules", "prefab");
  paths.forEach(async (file) => {
    const filePath = import_node_path4.default.join(prefabDir, file);
    import_node_fs4.default.cpSync(filePath, import_node_path4.default.join(rootDir, file), { recursive: true });
    if (deleteOriginal) {
      import_node_fs4.default.rmSync(filePath, { recursive: true, force: true });
    }
  });
};

// src/helpers/file/sync-with-export.ts
var import_node_path6 = __toESM(require("path"));
var import_node_fs6 = __toESM(require("fs"));

// src/helpers/file/sync-package-json.ts
var import_node_path5 = __toESM(require("path"));
var import_node_fs5 = __toESM(require("fs"));
var syncPackageJson = async () => {
  if (import_node_fs5.default.existsSync(import_node_path5.default.resolve(process.cwd(), "package.json"))) {
    const packageJsonFile = JSON.parse(
      import_node_fs5.default.readFileSync(import_node_path5.default.resolve(process.cwd(), "package.json"), "utf8")
    );
    const prefabPackageJsonFile = JSON.parse(
      import_node_fs5.default.readFileSync(
        import_node_path5.default.resolve(
          process.cwd(),
          globals_default.buildaDir,
          "modules",
          "prefab",
          "package.json"
        ),
        "utf8"
      )
    );
    const prefabScripts = prefabPackageJsonFile.scripts;
    const updatedScripts = packageJsonFile.scripts;
    const newScripts = Object.keys(updatedScripts).filter((script) => {
      return !Object.keys(prefabScripts).includes(script);
    });
    const scripts = __spreadValues({}, prefabScripts);
    newScripts.forEach((script) => {
      scripts[script] = updatedScripts[script];
    });
    const newPackageJson = __spreadProps(__spreadValues({}, prefabPackageJsonFile), {
      dependencies: __spreadValues({}, packageJsonFile.dependencies),
      devDependencies: __spreadValues({}, packageJsonFile.devDependencies),
      peerDependencies: __spreadValues({}, packageJsonFile.peerDependencies),
      scripts
    });
    import_node_fs5.default.writeFileSync(
      import_node_path5.default.resolve(process.cwd(), globals_default.buildaDir, "export", "package.json"),
      JSON.stringify(newPackageJson, null, 2)
    );
  } else {
    throw_error_default("No package.json found in project");
  }
};

// src/helpers/file/sync-with-export.ts
var syncWithExport = async ({ type, pathString }) => {
  var _a, _b;
  const root = process.cwd();
  const exportRoot = import_node_path6.default.join(root, globals_default.buildaDir, "export");
  const registry = await get_registry_default(exportRoot);
  const ignore = get_ignore_list_default(import_node_path6.default.join(root, globals_default.buildaDir));
  if (type === "copy") {
    if (pathString === "package.json") {
      return;
    }
    return check_and_copy_path_default(`${root}/${pathString}`, import_node_path6.default.join(exportRoot, pathString));
  }
  if (type === "update") {
    if (pathString === "package.json") {
      return syncPackageJson();
    }
    const fileWithSubstitutions = (_b = (_a = registry.generatorOptions) == null ? void 0 : _a.rootFiles) == null ? void 0 : _b.find(
      (rootFile) => {
        if (typeof rootFile === "string") {
          return false;
        } else if (!rootFile.substitutions || rootFile.substitutions.length === 0) {
          return false;
        } else {
          return rootFile.path === pathString;
        }
      }
    );
    import_node_fs6.default.rmSync(import_node_path6.default.join(exportRoot, pathString), {
      recursive: true,
      force: true
    });
    if (fileWithSubstitutions) {
      await loop_and_rewrite_files_default({
        name: registry.name,
        paths: [pathString],
        ignore,
        fromRoot: true,
        substitute: fileWithSubstitutions.substitutions
      });
    } else {
      return check_and_copy_path_default(
        `${root}/${pathString}`,
        import_node_path6.default.join(root, globals_default.buildaDir, "export", pathString)
      );
    }
  }
  if (type === "delete") {
    if (pathString === "package.json") {
      throw_error_default("package.json deleted. This will break your project");
    }
    return import_node_fs6.default.rmSync(import_node_path6.default.join(exportRoot, pathString), {
      recursive: true,
      force: true
    });
  }
};
var sync_with_export_default = syncWithExport;

// src/helpers/file/check-if-ignored.ts
var checkIfIgnored = (workingDir, filePath) => {
  const ignoreList = get_ignore_list_default(workingDir);
  for (const ignore of ignoreList) {
    if (ignore.startsWith("**/")) {
      const ignorePath = ignore.replace("**/", "");
      const baseFileName = filePath.split("/").pop();
      if (ignorePath.includes(baseFileName)) {
        return true;
      }
    } else if (ignore === filePath) {
      return true;
    }
  }
  return false;
};
var check_if_ignored_default = checkIfIgnored;

// src/helpers/module/add-local-module.ts
var import_node_fs7 = __toESM(require("fs"));
var import_tar = __toESM(require("tar"));
var import_node_path7 = __toESM(require("path"));

// src/data/ignore-file.json
var ignore_file_default = {
  ignore: [
    ".builda",
    ".git",
    ".github"
  ]
};

// src/helpers/module/add-local-module.ts
var ignoreFiles = ignore_file_default.ignore;
var getFiles = async (modulePath, outputPath, location) => {
  const tarball = import_node_fs7.default.existsSync(`${modulePath}/${location}.tgz`);
  if (tarball) {
    import_node_fs7.default.copyFileSync(
      `${modulePath}/${location}.tgz`,
      `${outputPath}/${location}.tgz`
    );
    await import_tar.default.extract({
      file: `${outputPath}/${location}.tgz`,
      cwd: outputPath
    });
    import_node_fs7.default.unlinkSync(`${outputPath}/${location}.tgz`);
  } else {
    const files = import_node_fs7.default.readdirSync(import_node_path7.default.join(modulePath, location));
    const filteredFiles = files.filter(
      (file) => !ignoreFiles.includes(file)
    );
    filteredFiles.forEach(async (file) => {
      const srcPath = `${modulePath}/${file}`;
      await create_dir_default(outputPath).then(() => {
        import_node_fs7.default.copyFileSync(srcPath, `${outputPath}/${file}`);
      });
    });
  }
};
var addLocalModule = async (modulePath, output) => {
  const buildaDir2 = import_node_path7.default.join(output || "./", globals_default.buildaDir);
  const registry = await get_registry_default(modulePath);
  const outputPath = registry.type === "blueprint" ? `${buildaDir2}/modules/blueprints/${registry.name}` : `${buildaDir2}/modules/prefab`;
  await create_dir_default(outputPath);
  await getFiles(modulePath, outputPath, "module");
  import_node_fs7.default.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));
  return registry;
};
var add_local_module_default = addLocalModule;

// src/helpers/module/add-remote-module.ts
var import_node_fs9 = __toESM(require("fs"));
var import_node_path8 = __toESM(require("path"));
var import_axios2 = __toESM(require("axios"));
var import_tar2 = __toESM(require("tar"));

// src/helpers/module/get-registry.ts
var import_node_fs8 = __toESM(require("fs"));
var import_node_process2 = __toESM(require("process"));
var import_axios = __toESM(require("axios"));
var getRegistry = async (registryPath) => {
  const REGISTRYFILE = "registry.json";
  registryPath = registryPath || import_node_process2.default.cwd();
  const pathType = detect_path_type_default(registryPath);
  if (pathType === "local") {
    return JSON.parse(
      import_node_fs8.default.readFileSync(`${registryPath}/${REGISTRYFILE}`, "utf8")
    );
  }
  const resolved = convert_registry_path_to_url_default({ registryPath });
  if (resolved.error) {
    throw_error_default(resolved.error);
  }
  let url = resolved.url;
  if (url.includes("%FILE_NAME%")) {
    url = url.replace("%FILE_NAME%", REGISTRYFILE);
  } else {
    url = `${url}/${REGISTRYFILE}`;
  }
  const validModule = await validate_module_path_default(url, true);
  if (!validModule.status) {
    throw_error_default(validModule.message);
  }
  return import_axios.default.get(url, {
    responseType: "json"
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    throw_error_default(error.message);
  });
};
var get_registry_default = getRegistry;

// src/helpers/module/add-remote-module.ts
var addRemoteModule = async (modulePath, output) => {
  const buildaDir2 = import_node_path8.default.join(output || "./", globals_default.buildaDir);
  const registry = await get_registry_default(modulePath);
  const outputPath = registry.type === "blueprint" ? `${buildaDir2}/modules/blueprints/${registry.name}` : `${buildaDir2}/modules/prefab`;
  await create_dir_default(outputPath);
  print_message_default(`Downloading ${registry.name}...`, "downloading");
  await import_axios2.default.get(`${modulePath}/module.tgz`, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/gzip"
    }
  }).then(
    (res) => import_node_fs9.default.writeFileSync(`${outputPath}/module.tgz`, res.data, {
      encoding: "binary"
    })
  ).then(async () => {
    if (import_node_fs9.default.existsSync(`${outputPath}/module.tgz`)) {
      print_message_default("Extracting module files...", "config");
      try {
        await import_tar2.default.extract({
          file: `${outputPath}/module.tgz`,
          cwd: outputPath
        });
        import_node_fs9.default.unlinkSync(`${outputPath}/module.tgz`);
      } catch (err) {
        throw_error_default(err);
      }
    }
  }).catch((err) => {
    throw_error_default(
      `There was an error downloading the tarball. Please check the URL and try again.

${err}`
    );
  }).finally(() => {
    print_message_default("Copying the registry file...", "copying");
    import_node_fs9.default.writeFileSync(
      `${outputPath}/registry.json`,
      JSON.stringify(registry, null, 2)
    );
  });
  print_message_default("Done.", "success");
  return registry;
};
var add_remote_module_default = addRemoteModule;

// src/data/resolvers.json
var resolvers_default = {
  builda: "https://builda.app/modules/%REPO_NAME%",
  github: "https://raw.githubusercontent.com/%REPO_NAME%",
  bitbucket: "https://bitbucket.org/%REPO_NAME%/raw"
};

// src/helpers/module/use-resolver.ts
var useResolver = ({
  resolver,
  modulePath,
  version,
  resolvers
}) => {
  const resolved = resolvers[resolver];
  if (!resolved) {
    return "";
  }
  let resolvedUrl = resolved;
  if (resolvedUrl.includes("%REPO_NAME%")) {
    resolvedUrl = resolvedUrl.replace("%REPO_NAME%", modulePath);
  } else {
    resolvedUrl = resolvedUrl.replace(`${resolver}`, "");
  }
  if (resolvedUrl.includes("%VERSION%")) {
    resolvedUrl = resolvedUrl.replace("%VERSION%", version);
  } else {
    resolvedUrl = `${resolvedUrl}/${version || "latest"}`;
  }
  if (resolvedUrl.endsWith("/")) {
    resolvedUrl = resolvedUrl.slice(0, -1);
  }
  return url_with_protocol_default(resolvedUrl);
};
var use_resolver_default = useResolver;

// src/helpers/module/convert-registry-path-to-url.ts
var convertRegistryPathToUrl = ({
  registryPath,
  config
}) => {
  var _a;
  const newPath = registryPath;
  let error = "";
  let resolvers = resolvers_default;
  if (newPath.startsWith("http") || newPath.startsWith("https")) {
    let url = newPath;
    if (newPath.includes("github.com")) {
      url = newPath.replace("github.com", "raw.githubusercontent.com").replace("/blob", "").replace("/tree", "");
    }
    if (newPath.includes("bitbucket.org")) {
      url = newPath.replace("src", "raw");
    }
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    return { url, error };
  }
  const resolverMatcher = newPath.match(
    /^([a-z]+:{1}[/]{0})([a-z0-9-/]+)((?:@{1}v?[0-9.]+)?(?:[\w\d-]*))?$/
  );
  if (!resolverMatcher) {
    error = 'Paths must start with a colon terminated lowercase string with no spaces or special characters (e.g. "builda:" or "([a-z]+:{1}[/]{0})" ) if using a resolver or "http(s)" if using a url';
    return { url: "", error };
  } else {
    const resolver = ((_a = resolverMatcher[1]) == null ? void 0 : _a.replace(":", "")) || "";
    const modulePath = resolverMatcher[2] || "";
    const version = resolverMatcher[3] ? resolverMatcher[3].replace("@", "") : "latest";
    if (config && config.resolvers) {
      resolvers = __spreadValues(__spreadValues({}, resolvers), config.resolvers);
    }
    const url = use_resolver_default({
      resolver,
      modulePath,
      version,
      resolvers
    });
    if (!url) {
      error = `Could not find a resolver for ${newPath}`;
    }
    return { url, error };
  }
};
var convert_registry_path_to_url_default = convertRegistryPathToUrl;

// src/helpers/module/get-module.ts
var import_node_fs10 = __toESM(require("fs"));
var import_node_path9 = __toESM(require("path"));
var import_node_process3 = __toESM(require("process"));
var getModule = (type, config, command) => {
  if (config) {
    const moduleType = `${type}s`;
    const modulePath = import_node_path9.default.resolve(
      import_node_process3.default.cwd(),
      `${globals_default.buildaDir}/modules/${moduleType}/${command.use}`
    );
    const registry = JSON.parse(
      import_node_fs10.default.readFileSync(`${modulePath}/registry.json`, "utf8")
    );
    return {
      path: modulePath,
      registry
    };
  }
  throw new Error(`Could not find config file`);
};
var get_module_default = getModule;

// src/helpers/module/get-substitutions.ts
var getSubstitutions = ({
  name,
  registry,
  script
}) => {
  var _a, _b;
  const substitutions = [];
  const substitute = (script == null ? void 0 : script.substitute) && ((_a = script.substitute) == null ? void 0 : _a.length) > 0 ? script == null ? void 0 : script.substitute : (_b = registry == null ? void 0 : registry.generatorOptions) == null ? void 0 : _b.substitutions;
  if (substitute && substitute.length) {
    substitute.forEach((sub) => {
      var _a2;
      const defaultString = sub.with === "script" ? name : sub.with;
      const replaceString = (sub == null ? void 0 : sub.replace) || sub.replace;
      const subtring = sub == null ? void 0 : sub.with;
      const withString = subtring || defaultString || "";
      if (!defaultString && !replaceString && sub.required) {
        throw_error_default(
          `"--${sub.replace}" missing in arguments. This is required.
`
        );
      }
      if (withString && !replaceString) {
        substitutions.push({
          replace: replaceString.toUpperCase(),
          with: withString
        });
      }
      if (replaceString) {
        if (withString === "") {
          throw_error_default(`"--${sub.replace}" requires a value`);
        }
        if (sub.valid && withString !== "" && !((_a2 = sub.valid) == null ? void 0 : _a2.includes(withString))) {
          throw_error_default(
            `
"${withString}" is not a valid ${sub.replace}. Please use one of the following: 
 - ${sub.valid.join(
              `
 - `
            )}
`
          );
        }
        substitutions.push({
          replace: sub.replace.toUpperCase(),
          with: withString
        });
      }
    });
  }
  return substitutions;
};
var get_substitutions_default = getSubstitutions;

// src/helpers/module/validate-module-path.ts
var import_axios3 = __toESM(require("axios"));
var import_ajv = __toESM(require("ajv"));

// src/data/module-registry-schema.json
var module_registry_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    ModuleConfig: {
      additionalProperties: {
        $ref: "#/definitions/ModuleConfigContents"
      },
      type: "object"
    },
    ModuleConfigContents: {
      additionalProperties: false,
      properties: {
        location: {
          description: "The location of the module. This can be a local path, a remote url, a resolver or 'prefab' (if preinstalled inside a prefab)",
          type: "string"
        },
        outputDir: {
          description: "If the module should have a custom output directory, specify it here (relative to the app_root)",
          type: "string"
        },
        resolve: {
          anyOf: [
            {
              type: "string"
            },
            {
              additionalProperties: false,
              properties: {
                type: {
                  type: "string"
                },
                url: {
                  type: "string"
                }
              },
              required: [
                "url",
                "type"
              ],
              type: "object"
            }
          ],
          description: "The custom resolver to use for the module"
        },
        version: {
          description: "The version of the module (not required for blueprints preinstalled inside a prefab)",
          type: "string"
        }
      },
      required: [
        "location"
      ],
      type: "object"
    },
    ModuleRegistry: {
      additionalProperties: false,
      description: "See (https://builda.app/docs/build-a-module/registry) for more info",
      properties: {
        author: {
          additionalProperties: false,
          description: "The module author's details",
          properties: {
            buildaUser: {
              description: "The builda username of the author. This is optional but is required if you want to publish your module to the builda trade store (see (https://builda.app/docs/trade-store))",
              type: "string"
            },
            email: {
              description: "The author's email",
              type: "string"
            },
            name: {
              description: "The author's name",
              type: "string"
            },
            website: {
              description: "The author's website",
              type: "string"
            }
          },
          required: [
            "name"
          ],
          type: "object"
        },
        blueprints: {
          $ref: "#/definitions/ModuleConfig",
          description: "If the module is a prefab and requires blueprints or has it's own blueprints, you should add them here if the module is a blueprint, this field is ignored",
          examples: [
            "github:cool-developer/blueprint-cool-module@3.0.0",
            "internal:blueprint-name"
          ]
        },
        funding: {
          description: "Is this module looking for funding? If so, you can add a list of funding links here.",
          items: {
            type: "string"
          },
          type: "array"
        },
        generatorOptions: {
          additionalProperties: false,
          description: "A set of options which will be passed to the module generator when the module has been installed",
          properties: {
            extraFolders: {
              description: "Extra folders which should be created in the module root when the module is installed (Will create any folders which don't already exist in the tree)",
              items: {
                type: "string"
              },
              type: "array"
            },
            substitutions: {
              additionalProperties: false,
              description: "A set of substitutions which should be made in the module files when the module is installed",
              type: "array",
              items: {
                $ref: "#/definitions/TSubstitution"
              }
            },
            postScripts: {
              description: "Any post install scripts which should be run after the module has been installed and all files have been copied across and substitutions made (script paths are relative to the module root and should be in the form of a node cli script)",
              items: {
                type: "string"
              },
              type: "array"
            },
            rootFiles: {
              description: "Any files which should be copied to the module root when the module is installed in addition to the default files (see (https://builda.app/docs/build-a-module/prefabs#root-files)) e.g. .env files",
              items: {
                type: "string"
              },
              type: "array"
            }
          },
          type: "object"
        },
        keywords: {
          description: "The module keywords (optional but recommended if you want to publish your module to the builda trade store)",
          items: {
            type: "string"
          },
          type: "array"
        },
        name: {
          description: "The name of the module",
          type: "string"
        },
        prerelease: {
          default: false,
          description: "If this is a prerelease, set this to true",
          type: "boolean"
        },
        publishToTradeStore: {
          default: false,
          description: "Do you want to publish this module to the builda trade store? (see (https://builda.app/docs/trade-store))",
          type: "boolean"
        },
        type: {
          description: "The module type",
          enum: [
            "blueprint",
            "prefab"
          ],
          type: "string"
        },
        url: {
          description: "The url of the module (generally a git repository) You can also use resolver aliases here. See (https://builda.app/docs/resolvers)",
          type: "string"
        },
        version: {
          description: "The module version number (in semver format)",
          pattern: "^\\d+\\.\\d+\\.\\d+$",
          type: "string"
        }
      },
      required: [
        "name",
        "type",
        "version",
        "url"
      ],
      type: "object"
    },
    RootFile: {
      additionalProperties: false,
      properties: {
        path: {
          description: "The path to the root file (relative to the .builda/export directory)",
          type: "string"
        },
        rewrite: {
          default: false,
          description: "Should the file contents be rewritten with the default substitutions? https://builda.app/docs/build-a-module/substitutions",
          type: "boolean"
        },
        substitutions: {
          description: "Are there any custom substitutions to be made? see (https://builda.app/docs/build-a-module/substitutions)",
          items: {
            $ref: "#/definitions/TSubstitution"
          },
          type: "array"
        }
      },
      required: [
        "path",
        "substitutions"
      ],
      type: "object"
    },
    TSubstitution: {
      additionalProperties: false,
      properties: {
        replace: {
          description: "The string to be replaced",
          pattern: "^%[A-Z_]+%$",
          type: "string"
        },
        required: {
          default: false,
          description: "Is this substitution required? (i.e. if it is not found, should the build fail?)",
          type: "boolean"
        },
        valid: {
          description: "Do you want to provide a list of valid options for this substitution? (i.e. if it is not found, should the build fail?)",
          items: {
            type: "string"
          },
          type: "array"
        },
        with: {
          description: "The string to replace with",
          type: "string"
        }
      },
      required: [
        "replace",
        "with"
      ],
      type: "object"
    }
  }
};

// src/helpers/module/validate-module-path.ts
var ajv = new import_ajv.default();
var validate_module_path_default = async (url, resolved) => {
  let registryUrl = url;
  if (!resolved) {
    const rurl = convert_registry_path_to_url_default({
      registryPath: url
    });
    if (rurl.error) {
      return {
        status: false,
        message: rurl.error
      };
    }
    registryUrl = rurl.url;
  }
  const registry = registryUrl.includes("registry.json") ? registryUrl : `${registryUrl}/registry.json`;
  return import_axios3.default.get(registry).then((response) => {
    var _a;
    if (!response.data) {
      return {
        status: false,
        message: "Something went wrong while fetching the registry. No data was returned and no error was provided."
      };
    }
    const validate = ajv.compile(module_registry_schema_default);
    const valid = validate(response.data);
    if (valid) {
      return {
        status: true,
        message: "Registry fetched successfully"
      };
    }
    (_a = validate.errors) == null ? void 0 : _a.forEach((error) => {
      console.log(`Registry validation error: ${error.message}`);
    });
    return {
      status: false,
      message: "The registry file is not valid. Please check the documentation for the correct format."
    };
  }).catch((error) => {
    if (error.code === "ENOTFOUND" || error.code === "ERR_BAD_REQUEST") {
      return {
        status: false,
        message: "The url must point to a folder that contains a registry.json file"
      };
    }
    if (error.code === "ECONNREFUSED") {
      return {
        status: false,
        message: `The server at ${registry} is not responding are you sure it is correct?`
      };
    }
    return {
      status: false,
      message: error.message
    };
  });
};

// src/helpers/questions/blueprint-questions.ts
var import_inquirer2 = __toESM(require("inquirer"));
var import_chalk6 = __toESM(require("chalk"));

// src/data/suggested-blueprints.json
var suggested_blueprints_default = [
  {
    name: "Test Blueprint",
    value: "github:builda-modules/blueprint-test"
  },
  {
    name: "Fake blueprint",
    value: ""
  },
  {
    name: "Another fake blueprint",
    value: ""
  },
  {
    name: "Yet another fake blueprint",
    value: ""
  }
];

// src/helpers/questions/blueprint-questions.ts
var validateBlueprint = async (input, answers) => {
  const moduleValid = await validate_module_path_default(input);
  if (moduleValid.status) {
    if (answers.prefabRegistry) {
      const registry = answers.prefabRegistry;
      const blueprints = registry.blueprints;
      if (blueprints && blueprints[input]) {
        return {
          status: false,
          message: "A blueprint with that name already exists"
        };
      }
      return {
        status: true,
        message: ""
      };
    }
    return {
      status: true,
      message: ""
    };
  }
  return {
    status: false,
    message: moduleValid.message || "Could not validate the blueprint"
  };
};
var blueprint_questions_default = async (answers) => {
  show_help_default(
    "These questions are all about adding blueprints to your project.\r\n\nIf you're not sure what a blueprint is" + print_site_link_default({ link: "docs/blueprints" })
  );
  return import_inquirer2.default.prompt([
    {
      type: "confirm",
      name: "addBlueprints",
      message: () => {
        let blueprintList = [];
        const registry = answers.prefabRegistry;
        const blueprints = registry == null ? void 0 : registry.blueprints;
        if (answers.prefab && !!blueprints) {
          blueprintList = Object.keys(blueprints);
          show_help_default(
            `You are generating this project from the ${import_chalk6.default.blue(
              registry.name
            )} prefab.

It comes with the following blueprints:

	` + blueprintList.map((blueprint) => import_chalk6.default.blue(blueprint)).join("\n	") + "\n\nEnsure that any additional blueprints you add are compatible with this prefab.",
            "warning"
          );
        }
        return `Do you want to add any${blueprintList.length ? "additional" : ""} blueprints to your project?`;
      },
      default: true
    },
    {
      type: "list",
      name: "blueprintChoice",
      message: "Do you have url(s) for your blueprint(s) or do you want to choose from a list?",
      choices: [
        {
          name: "I have url(s)",
          value: "url"
        },
        {
          name: "I want to choose from a list (coming soon)",
          value: "list",
          disabled: "This option is not available yet"
        }
      ]
    },
    {
      type: "input",
      name: "blueprintUrls",
      message: "Enter the blueprint url(s) (if adding more than one, please separate them with a space):",
      when: (answers2) => answers2.blueprintChoice === "url",
      validate: async (input) => {
        if (!input) {
          return "You must enter at least one url";
        }
        const urls = input.split(" ");
        for (const url of urls) {
          const moduleValid = await validateBlueprint(url, answers);
          if (!moduleValid.status) {
            return `The module at ${url} returned an error: ${moduleValid.message}`;
          }
        }
        return true;
      }
    },
    {
      type: "checkbox",
      name: "blueprintList",
      message: () => {
        show_help_default(
          "This list is not exhaustive. You can find more blueprints at " + import_chalk6.default.blue.underline(get_site_link_default("tradeStore/blueprints"))
        );
        return "Choose your blueprints:";
      },
      choices: suggested_blueprints_default,
      when: (answers2) => answers2.blueprintChoice === "list",
      validate: async (input) => {
        if (!input.length) {
          return "You must choose at least one blueprint";
        }
        for (const blueprint of input) {
          const moduleValid = await validateBlueprint(blueprint, answers);
          if (!moduleValid.status) {
            return `The module at ${blueprint} returned an error: ${moduleValid.message}`;
          }
        }
        return true;
      }
    }
  ]);
};

// src/helpers/questions/existing-project-questions.ts
var import_node_fs11 = __toESM(require("fs"));
var import_inquirer3 = __toESM(require("inquirer"));
var import_chalk7 = __toESM(require("chalk"));
var existing_project_questions_default = async () => {
  const packageJson = () => {
    try {
      const packageJson2 = JSON.parse(import_node_fs11.default.readFileSync("package.json", "utf8"));
      return packageJson2;
    } catch (error) {
      return "";
    }
  };
  if (!packageJson()) {
    show_help_default(
      "You must have a package.json file in the root of your project to add to an existing project.",
      "error"
    );
    process.exit(1);
  }
  const { name } = packageJson();
  const checkForMonorepo = () => {
    if (import_node_fs11.default.existsSync("lerna.json")) {
      return true;
    }
    if (packageJson().workspaces) {
      return true;
    }
    return false;
  };
  const isMonorepo = checkForMonorepo();
  const determinePackageManager = () => {
    if (import_node_fs11.default.existsSync("yarn.lock")) {
      return "yarn";
    }
    if (import_node_fs11.default.existsSync("package-lock.json")) {
      return "npm";
    }
    return "unknown";
  };
  const packageManager = determinePackageManager();
  return import_inquirer3.default.prompt([
    {
      type: "input",
      name: "projectName",
      message: `We think your project is called ${import_chalk7.default.bold.magenta(
        name
      )}. Press enter if correct? If not, enter the correct name here.`,
      default: name
    },
    {
      type: "input",
      name: "appRoot",
      message: () => {
        show_help_default(
          "The app root is the directory where your app files are stored.\n\nThis is usually your current working directory but if you are using a monorepo or if you'd like to store your app files in a different directory, you can specify it here it here.\n\nIf you're not sure, just press enter to use the current working directory."
        );
        return `We think your app root ${!isMonorepo ? "is ./" : "may be in a monorepo, please enter the package name. If it is not a monorepo, just press enter to use ./ or specify the directory your app is store in"}`;
      },
      default: "./"
    },
    {
      type: "list",
      name: "packageManager",
      message: () => {
        show_help_default(
          "Builda works with both npm and yarn. If you are using a different package manager, unfortunately, Builda may not work for you."
        );
        return "We think you are using " + import_chalk7.default.bold.magenta(packageManager) + ". Press enter if correct? If not, select the correct package manager.";
      },
      choices: ["npm", "yarn"],
      default: packageManager
    }
  ]);
};

// src/helpers/questions/new-project-questions.ts
var import_inquirer4 = __toESM(require("inquirer"));
var import_chalk8 = __toESM(require("chalk"));
var new_project_questions_default = async (hasPrefab) => {
  const suggestedName = random_word_generator_default();
  if (hasPrefab) {
    show_help_default(
      "Great! That prefab is ready to install!\n\nFirst things first though, we need a few more details, to get you set up.",
      "success"
    );
  }
  return import_inquirer4.default.prompt([
    {
      type: "input",
      name: "appName",
      required: true,
      message: `What do you want to call your project? This will also be the folder name we will create for your app. (If you don't know, just press enter to use ${import_chalk8.default.bold.magenta(
        suggestedName
      )})`,
      default: suggestedName
    }
  ]);
};

// src/helpers/questions/prefab-questions.ts
var import_inquirer5 = __toESM(require("inquirer"));
var import_chalk9 = __toESM(require("chalk"));

// src/data/suggested-prefabs.json
var suggested_prefabs_default = [
  {
    name: "Test Prefab",
    value: "github:builda-modules/prefab-test"
  },
  {
    name: "Fake prefab",
    value: ""
  },
  {
    name: "Another fake prefab",
    value: ""
  },
  {
    name: "Yet another fake prefab",
    value: ""
  }
];

// src/helpers/questions/prefab-questions.ts
var prefab_questions_default = async () => {
  show_help_default(
    "These questions are all about building a project from a prefab.\n\nIf you're not sure what a prefab is, visit " + import_chalk9.default.blue.underline(get_site_link_default("docs/prefabs")) + import_chalk9.default.white(" for more information.")
  );
  return import_inquirer5.default.prompt([
    {
      type: "list",
      name: "prefabChoice",
      message: "Do you have a prefab url or do you want to choose from a list?",
      choices: [
        {
          name: "I have a url",
          value: "url"
        },
        {
          name: "I want to choose from a list (coming soon)",
          value: "list",
          disabled: "This option is not available yet"
        }
      ]
    },
    {
      type: "input",
      name: "prefabUrl",
      message: () => {
        show_help_default(
          "The url should point to the folder that the prefabs registry.json file is in. It can be a regular link or use a resolver." + print_site_link_default({ link: "docs/resolvers" })
        );
        return "Enter the prefab url:";
      },
      when: (answers) => answers.prefabChoice === "url",
      validate: async (input) => {
        if (!input) {
          return "You must enter a url";
        }
        const module2 = await validate_module_path_default(input);
        if (module2.status !== true) {
          import_chalk9.default.red(module2.message);
        }
        return module2.status;
      }
    },
    {
      type: "list",
      name: "prefabList",
      message: () => {
        show_help_default(
          "This list is not exhaustive. You can find more prefabs at " + import_chalk9.default.blue.underline(get_site_link_default("tradeStore/prefabs"))
        );
        return "Choose a prefab:";
      },
      choices: suggested_prefabs_default,
      when: (answers) => answers.prefabChoice === "list"
    }
  ]);
};

// src/helpers/string/url-with-protocol.ts
var urlWithProtocol = (url) => {
  if (url.startsWith("http") || url.startsWith("https")) {
    return url;
  }
  return `https://${url}`;
};
var url_with_protocol_default = urlWithProtocol;

// src/scripts/builda-project/helpers/generate-from-prefab.ts
var import_axios4 = __toESM(require("axios"));
var import_node_fs12 = __toESM(require("fs"));
var import_node_path10 = __toESM(require("path"));
async function generateFromPrefab(prefabPath, module2, rootDir, prefabDir, workingDir, name, buildaDir2, websiteUrl3, buildaReadmeFileName) {
  var _a, _b, _c, _d;
  if (detect_path_type_default(prefabPath) === "remote") {
    const registry = convert_registry_path_to_url_default({
      registryPath: prefabPath
    }).url;
    if (!registry) {
      throw_error_default("No registry found");
    }
    module2 = await add_remote_module_default(registry, rootDir);
  } else {
    module2 = await add_local_module_default(prefabPath, rootDir);
  }
  if (!(module2 == null ? void 0 : module2.name)) {
    throw_error_default("No prefab found");
  }
  const prefabName = module2.name;
  const version = module2.version;
  const ignore = get_ignore_list_default(buildaDir2);
  print_message_default(`Installed ${prefabName}@${version}`, "success");
  print_message_default("Creating export path...", "processing");
  copy_dir_default(prefabDir, workingDir);
  print_message_default("Export path created", "success");
  print_message_default("Copying required files to application...", "copying");
  const buildaPath = import_node_path10.default.join(workingDir, buildaDir2);
  const packageJsonFile = import_node_fs12.default.readFileSync(
    import_node_path10.default.resolve(workingDir, "package.json"),
    {
      encoding: "utf8"
    }
  );
  const packageJson = JSON.parse(packageJsonFile);
  const newPackageJson = __spreadProps(__spreadValues({}, packageJson), {
    name: change_case_default(name, "kebabCase")
  });
  (_b = (_a = module2 == null ? void 0 : module2.generatorOptions) == null ? void 0 : _a.rootFiles) == null ? void 0 : _b.forEach(async (file) => {
    var _a2;
    const filePath = typeof file === "string" ? file : file.path;
    const fileDir = import_node_path10.default.dirname(filePath);
    const fileName = import_node_path10.default.basename(filePath);
    if (typeof file === "string") {
      await copy_paths_to_root_default([file], rootDir);
    } else {
      const substitute = (_a2 = file.substitutions) != null ? _a2 : [];
      await loop_and_rewrite_files_default({
        name,
        paths: [file.path],
        ignore,
        substitute,
        fromCustomPath: rootDir,
        toRoot: true
      });
    }
    if (fileName.startsWith("unique.")) {
      import_node_fs12.default.unlinkSync(import_node_path10.default.join(workingDir, fileDir, fileName));
      const newFileName = fileName.replace("unique.", "");
      print_message_default(`Found unique file`, "processing");
      import_node_fs12.default.renameSync(
        import_node_path10.default.join(rootDir, fileDir, fileName),
        import_node_path10.default.join(rootDir, fileDir, newFileName)
      );
      print_message_default(`Renamed unique file to: ${newFileName}`, "success");
      const existingBuildaConfig = packageJson.builda || {};
      const buildaConfig = __spreadProps(__spreadValues({}, existingBuildaConfig), {
        ignored: [
          ...existingBuildaConfig.ignored || [],
          import_node_path10.default.join(fileDir, newFileName)
        ]
      });
      newPackageJson.builda = buildaConfig;
    }
  });
  (_d = (_c = module2 == null ? void 0 : module2.generatorOptions) == null ? void 0 : _c.extraFolders) == null ? void 0 : _d.forEach(async (folder) => {
    import_node_fs12.default.mkdirSync(import_node_path10.default.join(rootDir, folder), { recursive: true });
    import_node_fs12.default.writeFileSync(import_node_path10.default.join(rootDir, folder, ".gitkeep"), "");
  });
  const scripts = packageJson.scripts;
  const buildaScripts = {};
  Object.entries(scripts).forEach(([key, value]) => {
    buildaScripts[key] = convert_to_builda_script_default(key, value);
  });
  newPackageJson.scripts = buildaScripts;
  import_node_fs12.default.writeFileSync(
    import_node_path10.default.join(rootDir, "package.json"),
    JSON.stringify(newPackageJson, null, 2)
  );
  const prefabReadmeUrl = `${websiteUrl3}/assets/prefab-getting-started.md`;
  const readmeSubs = [
    {
      replace: "%PREFAB_NAME%",
      with: prefabName
    },
    {
      replace: "%PREFAB_URL%",
      with: module2.url
    },
    {
      replace: "%PREFAB_VERSION%",
      with: version
    }
  ];
  await import_axios4.default.get(prefabReadmeUrl, {
    headers: {
      "Content-Type": "text/plain"
    }
  }).then((res) => {
    if (res.status === 200) {
      write_file_default({
        content: res.data,
        rename: buildaReadmeFileName,
        outputDir: rootDir,
        substitute: readmeSubs
      });
    }
  }).catch((err) => {
    console.log(err);
    print_message_default(
      `Could not download the getting started file. Visit ${websiteUrl3}/docs/getting-started#prefab for assistance`,
      "warning"
    );
  });
  if (import_node_fs12.default.existsSync(buildaPath)) {
    import_node_fs12.default.rmSync(buildaPath, { recursive: true });
  }
  if (module2.blueprints) {
    print_message_default("Installing prefab blueprints...", "installing");
    const blueprintPromises = [];
    const blueprints = Object.keys(module2.blueprints);
    for (const blueprint of blueprints) {
      const bp = module2.blueprints[blueprint];
      print_message_default(`Installing blueprint: "${blueprint}"`, "processing");
      const blueprintDest = import_node_path10.default.join(
        rootDir,
        buildaDir2,
        "modules",
        "blueprints"
      );
      create_dir_default(blueprintDest);
      if (bp.location === "prefab") {
        const blueprintSrc = import_node_path10.default.join(
          prefabDir,
          buildaDir2,
          "modules",
          "blueprints",
          blueprint
        );
        if (import_node_fs12.default.existsSync(blueprintSrc)) {
          copy_dir_default(blueprintSrc, import_node_path10.default.join(blueprintDest, blueprint));
        }
      } else {
        const bluePrintType = detect_path_type_default(bp.location);
        blueprintPromises.push(
          new Promise((resolve) => {
            if (bluePrintType === "local") {
              add_local_module_default(bp.location, rootDir);
            }
            if (bluePrintType === "remote") {
              const registry = convert_registry_path_to_url_default({
                registryPath: bp.location
              }).url;
              if (!registry) {
                throw_error_default("No registry found");
              }
              add_remote_module_default(registry, rootDir);
            }
            resolve(blueprint);
          })
        );
      }
      print_message_default(`${blueprint} installed`, "success");
    }
    await Promise.all(blueprintPromises);
  }
  print_message_default("All files copied to application.", "success");
  return module2;
}

// src/scripts/builda-project/project.ts
var project_default = async ({ appName, prefab, smokeTest }) => {
  const { buildaDir: buildaDir2, websiteUrl: websiteUrl3, buildaReadmeFileName } = globals_default;
  print_logo_default();
  let answers = {};
  if (!prefab) {
    const { usePrefab } = await import_inquirer6.default.prompt([
      {
        type: "confirm",
        name: "usePrefab",
        message: `Do you want to set the project up using a prefab?`,
        default: true
      }
    ]);
    if (usePrefab) {
      const prefabAnswers = await prefab_questions_default();
      answers.prefab = prefabAnswers.prefabUrl || prefabAnswers.prefabList;
    } else {
      show_help_default(
        `You can set up a project from scratch by answering a few questions about your project.\r

If you are unsure about any of these, you can always change them later by editing the 'builda' section of your package.json file.`
      );
    }
    if (answers.prefab) {
      show_help_default(
        "Great! That prefab is ready to install!\n\nFirst things first though, we need a few more details, to get you set up.",
        "success"
      );
    }
  }
  let newProjectAnswers = {};
  if (!prefab || !appName) {
    newProjectAnswers = await new_project_questions_default();
  }
  answers = __spreadValues(__spreadValues({}, answers), newProjectAnswers);
  const name = appName || answers.appName;
  const prefabPath = prefab || answers.prefab;
  const kebabAppName = change_case_default(name, "kebabCase");
  const rootDir = import_node_path11.default.join(import_node_process4.default.cwd(), kebabAppName);
  await create_dir_default(kebabAppName);
  import_node_process4.default.chdir(kebabAppName);
  const workingDir = import_node_path11.default.join(rootDir, buildaDir2, "export");
  const prefabDir = import_node_path11.default.join(rootDir, buildaDir2, "modules", "prefab");
  if (import_node_fs13.default.readdirSync(rootDir).length !== 0) {
    throw_error_default(
      `The directory: '${kebabAppName}' already exists. It is not recommended to install a prefab into an existing project.`
    );
  }
  await create_dir_default(workingDir);
  const module2 = {};
  if (prefabPath) {
    await generateFromPrefab(
      prefabPath,
      module2,
      rootDir,
      prefabDir,
      workingDir,
      name,
      buildaDir2,
      websiteUrl3,
      buildaReadmeFileName
    );
  }
  print_message_default(`Your application, "${name}" has been initialised!`, "success");
  if (smokeTest) {
    import_node_process4.default.chdir("../");
    import_node_fs13.default.rm(name, { recursive: true, force: true }, (err) => {
      if (err) {
        console.log(err);
      }
      print_message_default(`This was a smoke test. No files were created.`, "primary");
    });
  } else {
    (0, import_execa.default)("cd", [name]);
    print_message_default(
      `For more information about how to use your application, visit: ${websiteUrl3}/docs/getting-started`,
      "primary"
    );
  }
};

// src/scripts/builda-project/command.ts
var command_default = () => {
  return {
    command: "project [appName]",
    desc: "Generate a new app from a prefab",
    aliases: ["app", "--app", "--project"],
    builder: (yargs2) => {
      return yargs2.positional("appName", {
        describe: "The name of the app",
        type: "string",
        default: ""
      }).option("prefab", {
        alias: "p",
        default: "",
        describe: "The prefab to use (url, local path, or preset name)",
        type: "string"
      }).option("smokeTest", {
        alias: "s",
        default: false,
        describe: "Runs the command but deletes the output immediately",
        type: "boolean"
      });
    },
    handler: async (argv) => {
      const args = {
        appName: argv.appName,
        prefab: argv.prefab,
        smokeTest: argv.smokeTest
      };
      await project_default(__spreadValues({}, args));
    }
  };
};

// src/scripts/builda-execute/execute.ts
var import_chalk10 = __toESM(require("chalk"));
var import_node_process5 = __toESM(require("process"));
var import_node_path12 = __toESM(require("path"));
var import_node_fs14 = __toESM(require("fs"));
var import_execa2 = __toESM(require("execa"));
var execute_default = async ({ command, args }) => {
  var _a;
  const cwd = import_node_process5.default.cwd();
  let exportDir = import_node_path12.default.join(import_node_process5.default.cwd(), globals_default.buildaDir, "export");
  if (cwd.split("/").pop() === "export") {
    exportDir = cwd;
  }
  const packageJsonFile = import_node_fs14.default.readFileSync(
    import_node_path12.default.resolve(exportDir, "package.json"),
    {
      encoding: "utf8"
    }
  );
  const packageJson = JSON.parse(packageJsonFile);
  const scripts = packageJson.scripts;
  const script = scripts[command];
  let packageManager = "";
  if (import_node_fs14.default.existsSync(import_node_path12.default.resolve(cwd, "yarn.lock")) && import_node_fs14.default.existsSync(import_node_path12.default.resolve(cwd, "package-lock.json"))) {
    throw_error_default(
      "Builda detected a yarn.lock file and a package-lock.json file. Please delete one of these files and try again"
    );
  } else if (import_node_fs14.default.existsSync(import_node_path12.default.resolve(cwd, "yarn.lock"))) {
    packageManager = "yarn";
  } else if (import_node_fs14.default.existsSync(import_node_path12.default.resolve(cwd, "package-lock.json"))) {
    packageManager = "npm";
  } else {
    throw_error_default(
      "Builda could not detect a yarn.lock or package-lock.json file. Please run `yarn` or `npm install` and try again"
    );
  }
  if (!script) {
    throw_error_default(`No script found with the name '${command}'`);
  }
  if (!exportDir) {
    throw_error_default(`No path found for script '${command}'`);
  }
  if (!command) {
    throw_error_default("No command found");
  }
  try {
    let prefixedCommand = `${packageManager} run ${command}`;
    if (args) {
      const argKeys = Object.keys(args);
      const argValues = Object.values(args);
      const argsString = argKeys.reduce((acc, key, index) => {
        const value = argValues[index];
        let keyString = "";
        if (key === "_" || key === "command" || key === "$0") {
          return acc;
        }
        if (key.length === 1) {
          keyString = `-${key}`;
        } else {
          keyString = `--${key}`;
        }
        if (value && typeof value === "boolean") {
          return ` ${acc} ${keyString}`;
        }
        return ` ${acc} ${keyString}="${value}"`;
      }, "");
      prefixedCommand = `${prefixedCommand}${argsString}`;
    }
    import_node_process5.default.stdout.write(
      import_chalk10.default.magenta("Running with Builda: ") + import_chalk10.default.white.bold(`'${prefixedCommand}'`) + "\n"
    );
    (_a = import_execa2.default.command(prefixedCommand, {
      cwd: exportDir,
      stdio: "inherit"
    }).stdout) == null ? void 0 : _a.pipe(import_node_process5.default.stdout);
  } catch (error) {
    throw_error_default(error.message);
  }
};

// src/scripts/builda-execute/command.ts
var command_default2 = () => {
  return {
    command: "execute <command>",
    desc: "Execute a command from within the export directory",
    aliases: ["x", "exec"],
    builder: (yargs2) => {
      return yargs2.positional("command", {
        describe: "The name of the command",
        type: "string",
        demandOption: true
      });
    },
    handler: async (argv) => {
      return execute_default({ command: argv.command, args: argv });
    }
  };
};

// src/scripts/builda-eject/eject.ts
var import_node_process6 = __toESM(require("process"));
var import_node_fs15 = __toESM(require("fs"));
var eject_default = async ({ pathString }) => {
  var _a, _b;
  const config = get_config_default();
  if (!pathString) {
    throw_error_default("A path must be provided");
  }
  if ((_a = config.ejected) == null ? void 0 : _a.includes(pathString)) {
    throw_error_default(`${pathString} has already been ejected.`);
  }
  const trimmedPath = pathString.replace(`${import_node_process6.default.cwd()}/`, "");
  const pathInExport = `${import_node_process6.default.cwd()}/.builda/export/${trimmedPath}`;
  try {
    if (!import_node_fs15.default.existsSync(pathInExport)) {
      throw_error_default(`No file found at ${pathInExport}.`);
    }
    print_message_default(`Moving ${trimmedPath} to application...`, "info");
    copy_paths_to_root_default([trimmedPath], import_node_process6.default.cwd());
    print_message_default(`Deleting original from ${pathInExport}`, "info");
    import_node_fs15.default.rmSync(pathInExport, { recursive: true, force: true });
    const relativePath = pathString.replace(`${import_node_process6.default.cwd()}/`, "");
    const ejected = (_b = config.ejected) != null ? _b : [];
    ejected.push(relativePath);
    const newConfig = __spreadProps(__spreadValues({}, config), {
      ejected
    });
    update_config_default(newConfig);
    print_message_default(
      `Ejected ${pathString}. You can now edit this file directly.`,
      "success"
    );
  } catch (error) {
    throw_error_default(error.message);
  }
};

// src/scripts/builda-eject/command.ts
var command_default3 = () => {
  return {
    command: "eject <pathString>",
    desc: "Eject a file or directory from builda to make it editable",
    builder: (yargs2) => {
      return yargs2.positional("pathString", {
        describe: "The path to the file or directory to eject",
        type: "string",
        demandOption: true
      }).option("configPath", {
        aliases: ["c", "config"],
        default: "",
        describe: "The path to a config file",
        type: "string"
      });
    },
    handler: async (argv) => {
      return eject_default({ pathString: argv.pathString });
    }
  };
};

// src/scripts/builda-install/install.ts
var import_node_fs16 = __toESM(require("fs"));
var import_node_path13 = __toESM(require("path"));
var install_default = async () => {
  const config = get_config_default();
  const { prefab, blueprints } = config;
  const { buildaDir: buildaDir2 } = globals_default;
  const outputPath = process.cwd();
  const moduleDirPath = import_node_path13.default.join(outputPath, buildaDir2, "modules");
  if (!import_node_fs16.default.existsSync(moduleDirPath)) {
    import_node_fs16.default.mkdirSync(moduleDirPath, { recursive: true });
  }
  print_message_default("Installing modules...", "info");
  print_message_default("Looking for prefab...", "processing");
  if (prefab) {
    if (!import_node_fs16.default.existsSync(import_node_path13.default.join(moduleDirPath, "prefab"))) {
      import_node_fs16.default.mkdirSync(moduleDirPath, { recursive: true });
    } else {
      throw_error_default("prefab directory already exists, aborting");
    }
    print_message_default("Prefab found", "success");
    if (!prefab.location) {
      throw_error_default("No prefab location found");
    }
    if (prefab.location === "prefab") {
      throw_error_default(
        'Prefab location cannot be "prefab". Please specify a specific location'
      );
    }
    if (!prefab.version) {
      print_message_default(
        "No prefab version specified, using the location entry as full path to prefab",
        "warning"
      );
    }
    const basePath = prefab.version ? `${prefab.location}/v/${prefab.version}` : prefab.location;
    if (detect_path_type_default(basePath) === "remote") {
      const installPath = convert_registry_path_to_url_default({
        registryPath: basePath
      }).url;
      await add_remote_module_default(installPath);
    } else {
      await add_local_module_default(basePath);
    }
    const prefabPath = import_node_path13.default.join(moduleDirPath, "prefab");
    if (import_node_fs16.default.existsSync(prefabPath)) {
      print_message_default("Prefab installed successfully", "success");
      print_message_default("Creating export folder...", "processing");
      const workingDir = import_node_path13.default.join(outputPath, globals_default.buildaDir);
      const prefabRoot = import_node_path13.default.join(workingDir, "modules", "prefab");
      const exportRoot = import_node_path13.default.join(workingDir, "export");
      if (!import_node_fs16.default.existsSync(exportRoot)) {
        import_node_fs16.default.mkdirSync(exportRoot, { recursive: true });
        check_and_copy_path_default(prefabRoot, exportRoot);
        if (import_node_fs16.default.existsSync(import_node_path13.default.join(exportRoot, globals_default.buildaDir))) {
          import_node_fs16.default.rmSync(import_node_path13.default.join(exportRoot, globals_default.buildaDir), {
            force: true,
            recursive: true
          });
        }
        print_message_default("Export folder created successfully", "success");
      }
    } else {
      throw_error_default("Prefab installation failed");
    }
  } else {
    print_message_default("No prefab found, skipping...", "info");
  }
  print_message_default("Looking for blueprints...", "processing");
  if (blueprints) {
    print_message_default("Blueprints found", "success");
    const blueprintsArray = Object.entries(blueprints);
    for (const [blueprintName, blueprint] of blueprintsArray) {
      if (!blueprint.version && blueprint.location !== "prefab") {
        print_message_default(
          `No version specified for ${blueprintName}, using location entry as full path to blueprint`,
          "warning"
        );
      }
      if (!blueprint.location) {
        throw_error_default(`No blueprint path found for ${blueprintName}`);
      }
      if (!import_node_fs16.default.existsSync(import_node_path13.default.join(moduleDirPath, "blueprints", blueprintName))) {
        import_node_fs16.default.mkdirSync(moduleDirPath, { recursive: true });
      } else {
        throw_error_default(`blueprint ${blueprintName} already exists, aborting`);
      }
      if (blueprint.location === "prefab") {
        const blueprintSrc = import_node_path13.default.join(
          moduleDirPath,
          "prefab",
          ".builda",
          "modules",
          "blueprints",
          blueprintName
        );
        if (import_node_fs16.default.existsSync(blueprintSrc)) {
          copy_dir_default(
            blueprintSrc,
            import_node_path13.default.join(moduleDirPath, "blueprints", blueprintName)
          );
        } else {
          throw_error_default(`No blueprint found in prefab for ${blueprintName}`);
        }
      } else {
        const basePath = blueprint.version ? `${blueprint.location}/v/${blueprint.version}` : blueprint.location;
        if (detect_path_type_default(basePath) === "remote") {
          const installPath = convert_registry_path_to_url_default({
            registryPath: basePath
          }).url;
          await add_remote_module_default(installPath);
        } else {
          await add_local_module_default(basePath);
        }
      }
      if (import_node_fs16.default.existsSync(import_node_path13.default.join(moduleDirPath, "blueprints", blueprintName))) {
        print_message_default(
          `Blueprint ${blueprintName} installed successfully`,
          "success"
        );
      } else {
        throw_error_default(`Blueprint ${blueprintName} installation failed`);
      }
    }
  } else {
    print_message_default("No blueprints found, skipping...", "info");
  }
};

// src/scripts/builda-install/command.ts
var command_default4 = () => {
  return {
    command: "install",
    desc: "Installs the applications prefab and builds the export directory",
    builder: (yargs2) => {
      return yargs2.option("configPath", {
        aliases: ["c", "config"],
        default: "",
        describe: "The path to a config file",
        type: "string"
      });
    },
    handler: async () => {
      return install_default();
    }
  };
};

// src/scripts/builda-add/add.ts
var import_node_path14 = __toESM(require("path"));
var import_node_process7 = __toESM(require("process"));
var add_default = async ({
  modulePath,
  fromScript
}) => {
  var _a;
  let module2 = {};
  const config = get_config_default();
  const outputPath = import_node_process7.default.cwd();
  const moduleDirPath = import_node_path14.default.join(outputPath, globals_default.buildaDir, "modules");
  const moduleList = modulePath.includes(" ") ? modulePath.split(" ") : [modulePath];
  await create_dir_default(moduleDirPath);
  for (const currentModule of moduleList) {
    if (detect_path_type_default(currentModule) === "remote") {
      const registry = convert_registry_path_to_url_default({
        registryPath: currentModule
      }).url;
      if (!registry) {
        throw_error_default("No registry found");
      }
      module2 = await add_remote_module_default(registry);
    } else {
      module2 = await add_local_module_default(currentModule);
    }
    if (!fromScript) {
      if (module2 == null ? void 0 : module2.name) {
        const type = module2.type;
        const name = module2.name;
        const version = module2.version;
        if (type === "blueprint") {
          if (!(config == null ? void 0 : config.blueprints)) {
            config.blueprints = {};
          }
          if ((_a = config == null ? void 0 : config.blueprints) == null ? void 0 : _a[name]) {
            throw_error_default(
              `A blueprint called ${name} already exists. Perhaps you meant 'builda update ${name}?'`
            );
          } else {
            config.blueprints[name] = {
              version,
              location: currentModule
            };
          }
        }
        if (type === "prefab") {
          throw_error_default(
            `You cannot add a prefab as a module. A prefab is used to set up a new project. Try 'builda project' instead.`
          );
        }
        update_config_default(config);
        print_message_default(`Added ${name} to your project`, "success");
      } else {
        throw_error_default("Something went wrong");
      }
    }
  }
};

// src/scripts/builda-add/command.ts
var { websiteUrl } = globals_default;
var command_default5 = () => {
  return {
    command: "add <blueprintPath>",
    desc: "Adds a new blueprint",
    builder: (yargs2) => {
      return yargs2.positional("blueprintPath", {
        describe: `The path to the blueprint (can be a resolver - see http://${websiteUrl}/docs/resolvers)`,
        type: "string",
        demandOption: true
      }).option("configPath", {
        aliases: ["c", "config"],
        default: "",
        describe: "The path to a config file",
        type: "string"
      });
    },
    handler: async (argv) => {
      return add_default({ modulePath: argv.blueprintPath });
    }
  };
};

// src/scripts/builda-package/package.ts
var import_node_fs18 = __toESM(require("fs"));
var import_tar3 = __toESM(require("tar"));

// src/scripts/builda-package/helpers/check-path-exists.ts
var import_node_fs17 = __toESM(require("fs"));
var checkPathExists = (pathString, isDir) => {
  if (!import_node_fs17.default.existsSync(pathString)) {
    return {
      error: true,
      message: `Cannot find ${isDir && "a folder called"} '${pathString}' in the current directory.`
    };
  }
  return {
    error: false,
    message: ""
  };
};

// src/scripts/builda-package/package.ts
var package_default = async (updateVersion) => {
  const registry = await get_registry_default();
  const { name, type, version } = registry;
  const REGISTRYFILE = "registry.json";
  const FILESFOLDER = "module";
  const ignoreFiles2 = [];
  if (import_node_fs18.default.existsSync(".npmignore")) {
    const npmIgnore = import_node_fs18.default.readFileSync(".npmignore", "utf8");
    const npmIgnoreFiles = npmIgnore.split("\n");
    ignoreFiles2.push(...npmIgnoreFiles);
  }
  if (import_node_fs18.default.existsSync(`${FILESFOLDER}/.gitignore`)) {
    const gitignore = import_node_fs18.default.readFileSync(`${FILESFOLDER}/.gitignore`, "utf8");
    const gitignoreFiles = gitignore.split("\n").filter((line) => line !== "" && !line.startsWith("#"));
    ignoreFiles2.push(...gitignoreFiles);
  }
  if (!registry) {
    throw_error_default(
      `No ${REGISTRYFILE} file found. See ${print_site_link_default({
        link: "docs/packaging"
      })} for more information.`
    );
  }
  if (!name) {
    throw_error_default(`No name entry found in ${REGISTRYFILE}. Please add one.\r`);
  }
  if (!type) {
    throw_error_default(`No type entry found in ${REGISTRYFILE}. Please add one.\r`);
  }
  if (!version && !updateVersion) {
    throw_error_default(`No version entry found in ${REGISTRYFILE}. Please add one.\r`);
  }
  const validateFileFolder = checkPathExists(FILESFOLDER, true);
  if (validateFileFolder.error) {
    throw_error_default(validateFileFolder.message);
  }
  const isCorrectlyPrefixed = name.startsWith(`${type}-`);
  if (!isCorrectlyPrefixed) {
    throw_error_default(
      `The name entry in ${REGISTRYFILE} must be prefixed with ${type}-.\r`
    );
  }
  print_message_default("All checks passed.", "success");
  const newVersion = (updateVersion == null ? void 0 : updateVersion.replace("v", "")) || version;
  const newRegistry = __spreadProps(__spreadValues({}, registry), {
    version: newVersion
  });
  const newRegistryString = JSON.stringify(newRegistry, null, 2);
  import_node_fs18.default.writeFileSync(REGISTRYFILE, newRegistryString);
  if (import_node_fs18.default.existsSync(`${FILESFOLDER}.tgz`)) {
    print_message_default(
      "A module package already exists. Do you want to overwrite it?",
      "warning"
    );
    const overwrite = await confirm_default("Overwrite?");
    if (!overwrite) {
      print_message_default("Package process aborted", "error");
      return;
    }
    import_node_fs18.default.unlinkSync(`${FILESFOLDER}.tgz`);
  }
  print_message_default(`Packaging ${name}...`, "processing");
  await import_tar3.default.create(
    {
      file: `${FILESFOLDER}.tgz`,
      gzip: true,
      cwd: FILESFOLDER,
      filter: (path24) => !ignoreFiles2.includes(path24)
    },
    import_node_fs18.default.readdirSync(FILESFOLDER)
  );
  print_message_default("Package created", "success");
};

// src/scripts/builda-package/command.ts
var command_default6 = () => {
  return {
    command: "package",
    desc: "Package a module ready for publishing",
    aliases: ["package", "pack"],
    handler: async () => {
      return package_default();
    }
  };
};

// src/scripts/builda-publish/publish.ts
var import_node_fs20 = __toESM(require("fs"));
var import_simple_git = require("simple-git");

// src/scripts/builda-publish/helpers/publish-to-trade-store.ts
var publishToTradeStore = async () => {
  return true;
};

// src/scripts/builda-publish/helpers/check-path-exists.ts
var import_node_fs19 = __toESM(require("fs"));
var checkPathExists2 = (pathString, isDir) => {
  if (!import_node_fs19.default.existsSync(pathString)) {
    return {
      error: true,
      message: `Cannot find ${isDir && "a folder called"} '${pathString}' in the current directory.`
    };
  }
  return {
    error: false,
    message: ""
  };
};

// src/scripts/builda-publish/publish.ts
var publish_default = async (updateVersion) => {
  const registry = await get_registry_default();
  const { name, type, version, publishToTradeStore: publishToTradeStore2 } = registry;
  const REGISTRYFILE = "registry.json";
  const READMEFILE = "README.md";
  const MODULEPACKAGE = "module.tgz";
  if (!registry) {
    throw_error_default(
      `No ${REGISTRYFILE} file found. Publish can only be ran in the context of a module`
    );
  }
  if (!name) {
    throw_error_default(`No name entry found in ${REGISTRYFILE}. Please add one.\r`);
  }
  if (!type) {
    throw_error_default(`No type entry found in ${REGISTRYFILE}. Please add one.\r`);
  }
  if (!version && !updateVersion) {
    throw_error_default(`No version entry found in ${REGISTRYFILE}. Please add one.\r`);
  }
  if (!publishToTradeStore2) {
    print_message_default(
      `No tradeStore entry found in ${REGISTRYFILE}.
This module will not be published to the Builda Trade Store (https://builda.app/trade-store).\r`,
      "info"
    );
  }
  if (!import_node_fs20.default.existsSync(MODULEPACKAGE)) {
    print_message_default("No module package found. Building package...", "processing");
    await package_default(updateVersion);
    print_message_default("Package built", "success");
  }
  const isCorrectlyPrefixed = name.startsWith(`${type}-`);
  if (!isCorrectlyPrefixed) {
    throw_error_default(
      `The name entry in ${REGISTRYFILE} must be prefixed with ${type}-.\r`
    );
  }
  const validateReadme = checkPathExists2(READMEFILE);
  if (validateReadme.error) {
    throw_error_default(validateReadme.message);
  }
  const git = (0, import_simple_git.simpleGit)();
  if (!git.checkIsRepo()) {
    throw_error_default(
      `This is not a git repository. Please initialise git and try again.\r`
    );
  }
  const status = await git.status();
  if (!status.isClean()) {
    throw_error_default(
      `The git repository is not clean. Please commit all changes and try again.\r`
    );
  }
  print_message_default("All checks passed.", "success");
  const newVersion = (updateVersion == null ? void 0 : updateVersion.replace("v", "")) || version;
  const newRegistry = __spreadProps(__spreadValues({}, registry), {
    version: newVersion
  });
  const newRegistryString = JSON.stringify(newRegistry, null, 2);
  import_node_fs20.default.writeFileSync(REGISTRYFILE, newRegistryString);
  print_message_default(`Adding ${MODULEPACKAGE} to git...`, "processing");
  await git.add(`${MODULEPACKAGE}`);
  await git.commit(`Adds updated ${MODULEPACKAGE}`);
  print_message_default("Added to git", "success");
  print_message_default("Tagging the latest commit...", "processing");
  const tagList = await git.tags();
  const tagExists = tagList.all.includes(newVersion) || tagList.all.includes(`v${newVersion}`);
  if (tagExists) {
    throw_error_default(
      `A tag with the version number v${newVersion} already exists. Please update the version number in ${REGISTRYFILE} and try again.\r`
    );
  }
  await git.addTag(`v${newVersion}`);
  let tagString = "tags";
  if (registry.prerelease) {
    print_message_default(
      "Prerelease entry found in registry.json. Skipping latest tag...",
      "info"
    );
    tagString = "tag";
  } else {
    const remoteTags = await git.listRemote(["--tags"]);
    const remoteTagExists = remoteTags.includes("refs/tags/latest");
    const localTags = await git.tags();
    const localTagExists = localTags.all.includes("latest");
    if (remoteTagExists || localTagExists) {
      await git.tag(["--delete", "latest"]);
      await git.push(["origin", "--delete", "latest"]);
    }
    await git.addTag("latest");
  }
  await git.pushTags("origin");
  print_message_default(`${tagString} created.`, "success");
  print_message_default("Pushing changes to git...", "processing");
  await git.push();
  print_message_default("Changes pushed to git.", "success");
  if (publishToTradeStore2) {
    print_message_default("Publishing to the Builda Trade Store...", "processing");
    publishToTradeStore();
  }
  print_message_default("Module published.", "success");
};

// src/scripts/builda-publish/command.ts
var command_default7 = () => {
  return {
    command: "publish",
    desc: "publish a module",
    aliases: ["pub", "push"],
    builder: (yargs2) => {
      return yargs2.option("version", {
        aliases: ["v", "ver"],
        default: "",
        describe: "update module version (semver)",
        type: "string"
      });
    },
    handler: async (argv) => {
      return publish_default(argv.version);
    }
  };
};

// src/scripts/builda-watch/watch.ts
var import_chokidar = __toESM(require("chokidar"));
var watch_default = (config) => {
  const { prefab } = config;
  const ignored = [...ignore_file_default.ignore, ...config.ignored || []];
  if (!prefab) {
    throw_error_default(
      "No prefab found in config file. Watch cannot be run without a prefab"
    );
  }
  const watcher = import_chokidar.default.watch(".", {
    persistent: true,
    ignoreInitial: true,
    ignored
  });
  watcher.on("change", (pathString) => {
    console.log(`File ${pathString} has been changed`);
    sync_with_export_default({
      type: "update",
      pathString
    });
  }).on("add", (pathString) => {
    console.log(`File ${pathString} has been added`);
    sync_with_export_default({
      type: "copy",
      pathString
    });
  }).on("addDir", (pathString) => {
    console.log(`Directory ${pathString} has been added`);
    sync_with_export_default({
      type: "copy",
      pathString
    });
  }).on("unlinkDir", (pathString) => {
    console.log(`Directory ${pathString} has been deleted`);
    sync_with_export_default({
      type: "delete",
      pathString
    });
  }).on("unlink", (pathString) => {
    console.log(`File ${pathString} has been deleted`);
    sync_with_export_default({
      type: "delete",
      pathString
    });
  }).on("ready", () => {
    print_message_default("Watching for changes...", "primary");
    print_message_default("Press Ctrl+C to stop watching", "secondary");
  });
};

// src/scripts/builda-watch/command.ts
var command_default8 = () => {
  return {
    command: "watch",
    desc: "Watches your app for changes and rebuilds",
    aliases: ["w"],
    builder: (yargs2) => {
      return yargs2.option("configPath", {
        aliases: ["c", "config"],
        default: "",
        describe: "The path to a config file",
        type: "string"
      });
    },
    handler: async () => {
      const config = await get_config_default();
      if (config == null ? void 0 : config.prefab) {
        return watch_default(config);
      } else if ((config == null ? void 0 : config.prefab) === void 0) {
        throw_error_default(
          "No prefab found in config file. Watch can only be run within a prefab"
        );
      }
      throw_error_default("No config file found");
    }
  };
};

// src/scripts/builda-indexer/indexer.ts
var import_node_fs22 = __toESM(require("fs"));
var import_path6 = __toESM(require("path"));

// src/scripts/builda-indexer/helpers/generate-lines.ts
var import_node_fs21 = __toESM(require("fs"));
var import_path5 = __toESM(require("path"));
var generateLines = ({
  directory,
  parent
}) => {
  const dir = import_node_fs21.default.readdirSync(import_path5.default.resolve(directory));
  if (dir.length !== 0) {
    return dir.map((file) => {
      const pathString = parent ? `${parent}/${file}` : file;
      if (!file.match(/\.[jt]sx$/)) {
        return `export { default as ${change_case_default(
          file,
          "pascalCase"
        )} } from './${pathString}';`;
      }
      const fileNoExt = import_path5.default.parse(file).name;
      const varName = change_case_default(fileNoExt, "camelCase");
      return `export { default as ${varName} } from './${fileNoExt}';`;
    }).filter((item) => item).toString().replace(/,/g, "\n");
  } else {
    return "";
  }
};

// src/scripts/builda-indexer/indexer.ts
var message = `/**
 This file is autogenerated by Builda, please do not edit it.
 To generate an updated version, please run \`builda index\`
 **/`;
var indexer_default = (config) => {
  const { indexes } = config;
  if (!indexes) {
    throw_error_default(
      `No indexes entry found in the config file. Index files cannot be generated. See ${get_site_link_default(
        "docs/config",
        "indexes"
      )} for more information.`
    );
  } else {
    const { directories, indexExt } = indexes;
    const ext = indexExt || "ts";
    directories.forEach((directory) => {
      let checkedDir = directory;
      let subdirs = [];
      let lines = "";
      if (directory.includes("*")) {
        checkedDir = directory.replace("/*", "");
        subdirs = import_node_fs22.default.readdirSync(import_path6.default.resolve(checkedDir));
        subdirs.forEach((dir) => {
          const pathString = import_path6.default.resolve(`${checkedDir}/${dir}`);
          return lines += `${generateLines({
            directory: pathString,
            parent: dir
          })}
`;
        });
      } else {
        lines = generateLines({ directory });
      }
      const fileContents = `${message}

${lines}`;
      if (lines) {
        import_node_fs22.default.writeFileSync(
          import_path6.default.resolve(checkedDir, `index.${ext}`),
          fileContents
        );
      }
    });
    print_message_default("Generating indexes", "config");
  }
};

// src/scripts/builda-indexer/command.ts
var command_default9 = () => {
  return {
    command: "indexer",
    desc: "Generate an index file for the specified directories",
    aliases: ["index"],
    builder: (yargs2) => {
      return yargs2.option("configPath", {
        aliases: ["c", "config"],
        default: "",
        describe: "The path to a config file",
        type: "string"
      });
    },
    handler: async (argv) => {
      const config = await get_config_default();
      if (config) {
        return indexer_default(config);
      }
      throw_error_default("No config file found");
    }
  };
};

// src/scripts/builda-new/new.ts
var import_node_fs23 = __toESM(require("fs"));
var import_path7 = __toESM(require("path"));

// src/scripts/builda-new/helpers/generate-commands.ts
var generateCommands = (config) => {
  if (config.scripts) {
    const commands = {};
    const scriptArray = Object.entries(config.scripts);
    scriptArray.forEach((script) => {
      const name = script[0];
      commands[name] = script[1];
    });
    return commands;
  } else {
    return throw_error_default('No "scripts" entry found in config file');
  }
};
var generate_commands_default = generateCommands;

// src/scripts/builda-new/new.ts
var import_inquirer7 = __toESM(require("inquirer"));
var buildFromBlueprint = async (name, outputDir, config, script, subString) => {
  const { buildaDir: buildaDir2 } = globals_default;
  const outputDirectory = `${outputDir}/${change_case_default(name, "kebabCase")}`;
  const outputInExport = import_path7.default.join(buildaDir2, "export", outputDirectory);
  if (import_node_fs23.default.existsSync(outputDirectory)) {
    throw_error_default(`A ${script.use} already exists with the name ${name}`);
  }
  if (import_node_fs23.default.existsSync(outputInExport)) {
    throw_error_default(
      `An existing ${script.use} with the name ${name} was found in the prefab. Continuing will overwrite this version.\r
If you want to edit the prefab version, you need to eject it with 'builda eject ${name}'`
    );
  }
  import_node_fs23.default.mkdirSync(outputDirectory, { recursive: true });
  const { path: pathstring, registry } = get_module_default("blueprint", config, script);
  const splitSubString = (subString == null ? void 0 : subString.split(":")) || [];
  const sub = splitSubString.length === 2 ? {
    replace: splitSubString[0],
    with: splitSubString[1]
  } : void 0;
  const substitute = script ? get_substitutions_default({
    registry,
    name,
    script,
    sub
  }) : [];
  const fullPath = import_path7.default.resolve(pathstring, "module");
  import_node_fs23.default.readdirSync(fullPath).forEach((file) => {
    const srcPath = `${fullPath}/${file}`;
    const outputDir2 = `${outputDirectory}`;
    write_file_default({
      file: srcPath,
      rename: srcPath.replace("temp_name", name),
      outputDir: outputDir2,
      substitute,
      name
    });
  });
  if (config.prefab) {
    sync_with_export_default({
      type: "copy",
      pathString: outputDirectory
    });
  }
  return print_message_default("Done!", "success");
};
var new_default = async ({ config, name, scriptName, subString }) => {
  const commands = generate_commands_default(config);
  const script = commands == null ? void 0 : commands[scriptName];
  if (script.use) {
    if (!name || name === "") {
      throw_error_default(`You need to provide a name for your new ${scriptName}`);
    }
    print_message_default(`Building new ${scriptName}: '${name}'...`, "notice");
    if (script.variants) {
      const answers = await import_inquirer7.default.prompt([
        {
          type: "list",
          name: "variantChoice",
          message: `What type of ${scriptName} do you wish to build?`,
          choices: script.variants.map((variant) => {
            return {
              name: variant.name,
              value: variant.outputDir
            };
          })
        }
      ]);
      await buildFromBlueprint(
        name,
        answers.variantChoice,
        config,
        script,
        subString
      );
    } else {
      await buildFromBlueprint(
        name,
        script.outputDir,
        config,
        script,
        subString
      );
    }
  } else {
    throw_error_default("No valid scripts found");
  }
};

// src/scripts/builda-new/command.ts
var command_default10 = () => {
  return {
    command: "new <scriptName>",
    desc: "Create something new from a blueprint",
    builder: (yargs2) => {
      return yargs2.positional("scriptName", {
        describe: "The blueprint script to run",
        type: "string",
        default: ""
      }).positional("name", {
        describe: "The name of the new thing",
        type: "string",
        default: ""
      }).option("subString", {
        aliases: ["s", "sub"],
        default: "",
        describe: `A string matcher for the blueprint script. e.g: "%MY_STRING%:'new string'"`,
        type: "string"
      });
    },
    handler: async (argv) => {
      const config = await get_config_default();
      if (config) {
        return new_default({
          config,
          scriptName: argv.scriptName,
          name: argv.name
        });
      }
      throw_error_default("No config file found");
    }
  };
};

// src/scripts/builda-build/build.ts
var import_node_fs24 = __toESM(require("fs"));
var import_node_path15 = __toESM(require("path"));
var build_default = async ({ config }) => {
  const { prefab } = config;
  const root = process.cwd();
  const workingDir = import_node_path15.default.join(root, globals_default.buildaDir);
  const prefabDir = import_node_path15.default.join(workingDir, "modules", "prefab");
  if (!prefab) {
    throw_error_default(
      "No prefab found in config file. Build cannot be run without a prefab"
    );
  }
  const promises = [];
  print_message_default("Building your project", "processing");
  import_node_fs24.default.readdir(root, (err, files) => {
    if (err) {
      throw_error_default(err.message);
    }
    files.forEach((file) => {
      if (!check_if_ignored_default(prefabDir, file)) {
        check_and_copy_path_default(
          `${root}/${file}`,
          import_node_path15.default.join(`${globals_default.buildaDir}/export`, file)
        );
      }
      promises.push(Promise.resolve(file));
    });
    Promise.all(promises).then(() => {
      print_message_default("Build complete", "success");
    });
  });
};

// src/scripts/builda-build/command.ts
var command_default11 = () => {
  return {
    command: "build",
    desc: "Build your project",
    aliases: ["-b", "--build"],
    builder: (yargs2) => {
      return yargs2.option("configPath", {
        aliases: ["c", "config"],
        default: "",
        describe: "The path to a config file",
        type: "string"
      });
    },
    handler: async () => {
      const config = await get_config_default();
      if (config) {
        return build_default({
          config
        });
      }
      throw_error_default("No config file found");
    }
  };
};

// src/scripts/builda-update/update.ts
var import_node_fs25 = __toESM(require("fs"));
var import_node_path16 = __toESM(require("path"));
var update_default = async () => {
  const config = get_config_default();
  const { prefab } = config;
  const { buildaDir: buildaDir2 } = globals_default;
  const buildaDirPath = import_node_path16.default.join(process.cwd(), buildaDir2);
  if (import_node_fs25.default.existsSync(buildaDirPath)) {
    import_node_fs25.default.rmdirSync(buildaDirPath, { recursive: true });
  } else {
    if (!prefab) {
      throw_error_default(
        'No prefab found in config (perhaps you meant to run "builda init" instead?)'
      );
    } else {
      print_message_default(
        "Prefab config found but no builda directory found.",
        "warning"
      );
      print_message_default('Running "builda install" instead', "info");
    }
  }
  await install_default();
};

// src/scripts/builda-update/command.ts
var command_default12 = () => {
  return {
    command: "update",
    desc: "Updates the applications prefab to the latest version",
    builder: (yargs2) => {
      return yargs2.option("configPath", {
        aliases: ["c", "config"],
        default: "",
        describe: "The path to a config file",
        type: "string"
      });
    },
    handler: async () => {
      return update_default();
    }
  };
};

// src/scripts/builda-init/init.ts
var import_node_fs26 = __toESM(require("fs"));
var import_node_events = __toESM(require("events"));
var import_inquirer8 = __toESM(require("inquirer"));
var import_chalk11 = __toESM(require("chalk"));
var init_default = async ({ config }) => {
  import_node_events.default.defaultMaxListeners = 50;
  const { buildaDir: buildaDir2 } = globals_default;
  let answers = {
    projectName: "",
    appRoot: "",
    packageManager: ""
  };
  if (config && Object.keys(config).length !== 0) {
    if (config.prefab) {
      show_help_default(
        'This project was generated from a prefab and cannot be reinitialised. Maybe you meant to run "builda install" instead?',
        "error"
      );
      process.exit(1);
    }
    show_help_default(
      "It looks like builda has already been initialised in this project.\nYou can overwrite the existing config if you want to start again.\r\n\n" + import_chalk11.default.yellow("Be careful though") + ", continuing will instantly delete any existing config and your" + buildaDir2 + " directory.",
      "warning"
    );
    const { overwrite } = await import_inquirer8.default.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: import_chalk11.default.red(`Are you sure you want to reset the builda config?`),
        default: false
      }
    ]);
    if (!overwrite) {
      print_message_default("Process aborted at user request", "notice");
      process.exit(0);
    }
    update_config_default(null);
    if (import_node_fs26.default.existsSync(buildaDir2)) {
      import_node_fs26.default.rmSync(buildaDir2, { recursive: true });
    }
  }
  show_help_default(
    "Welcome to " + import_chalk11.default.magenta("Builda") + " This is a guided setup process help you get your project up and running." + print_site_link_default({
      link: "docs/init",
      endText: "if you get stuck.\n\n"
    }) + import_chalk11.default.white("You can exit the process at any time by pressing Ctrl+C."),
    "builda"
  );
  const { initType } = await import_inquirer8.default.prompt([
    {
      type: "list",
      name: "initType",
      message: "What would you like to do?",
      choices: [
        {
          name: "I want to start a new project",
          value: "new"
        },
        {
          name: "I want to add builda to an existing project",
          value: "existing"
        },
        {
          name: "I want to create my own prefab",
          value: "prefab"
        },
        {
          name: "I want to create my own blueprint",
          value: "blueprint"
        }
      ]
    }
  ]);
  if (initType === "new") {
    show_help_default(
      "A fresh start! Let's get you set up with a new project.\r\n\nYou can choose to use a prefab to get started quickly, or you can set up a project from scratch."
    );
    project_default({});
  }
  if (initType === "existing") {
    show_help_default(
      `You can add builda to an existing project by answering a few questions about your project.\r

If you are unsure about any of these, you can always change them later by editing the 'builda' entry in package.json.`
    );
    const existingProjectAnswers = await existing_project_questions_default();
    answers = __spreadValues(__spreadValues({}, answers), existingProjectAnswers);
    const blueprintAnswers = await blueprint_questions_default(answers);
    answers = __spreadValues(__spreadValues({}, answers), blueprintAnswers);
    const blueprints = answers.blueprintUrls || answers.blueprintList.join("");
    update_config_default({});
    add_default({ modulePath: blueprints });
  }
  if (initType === "prefab") {
    show_help_default(
      `You can create your own prefab by answering a few questions about your project.\r

If you are unsure about any of these, you can always change them later by editing the 'builda' entry in package.json.` + print_site_link_default({ link: "docs/build-a-module", anchor: "prefab" })
    );
    console.log("Coming soon...");
    process.exit(0);
  }
  if (initType === "blueprint") {
    show_help_default(
      `You can create your own blueprint by answering a few questions about your project.\r

If you are unsure about any of these, you can always change them later by editing the 'builda' entry in package.json.\r

` + print_site_link_default({ link: "docs/build-a-module", anchor: "blueprint" })
    );
    console.log("Coming soon...");
    process.exit(0);
  }
};

// src/scripts/builda-init/command.ts
var command_default13 = () => {
  return {
    command: "init",
    desc: "Initialise builda",
    builder: (yargs2) => {
      return yargs2.option("configPath", {
        aliases: ["c", "config"],
        default: "",
        describe: "The path to a config file",
        type: "string"
      });
    },
    handler: async (argv) => {
      const config = await get_config_default(true);
      return init_default({ config: config || void 0 });
    }
  };
};

// src/scripts/builda-question/question.ts
var import_inquirer9 = __toESM(require("inquirer"));
var question_default = async (questions) => {
  return import_inquirer9.default.prompt(questions);
};

// src/scripts/builda-substitute/substitute.ts
var substitute_default = async (substitutions) => {
  var _a, _b, _c, _d;
  const registry = await get_registry_default();
  const filesToRewrite = (_b = (_a = registry == null ? void 0 : registry.generatorOptions) == null ? void 0 : _a.rootFiles) == null ? void 0 : _b.filter(
    // Only return files which have 'rewrite' set to true (and are not a string)
    (file) => typeof file !== "string" && file.rewrite
  );
  const paths = (_c = filesToRewrite == null ? void 0 : filesToRewrite.map((file) => file.path)) != null ? _c : [];
  const fileSubstitutions = filesToRewrite == null ? void 0 : filesToRewrite.map(
    (file) => {
      var _a2;
      return (_a2 = file.substitutions) != null ? _a2 : [];
    }
  );
  const substitute = [...substitutions, ...(_d = fileSubstitutions == null ? void 0 : fileSubstitutions.flat()) != null ? _d : []];
  loop_and_rewrite_files_default({
    paths,
    substitute,
    fromRoot: true,
    toRoot: true
  });
};

// src/index.ts
var { websiteUrl: websiteUrl2 } = globals_default;
var builda = async () => {
  return import_yargs.default.scriptName("builda").usage("$0 <cmd> [args]").help().demandCommand(
    1,
    'You need at least one command before moving on. Try "builda --help" for more information'
  ).command(__spreadValues({}, command_default())).command(__spreadValues({}, command_default13())).command(__spreadValues({}, command_default11())).command(__spreadValues({}, command_default5())).command(__spreadValues({}, command_default3())).command(__spreadValues({}, command_default4())).command(__spreadValues({}, command_default10())).command(__spreadValues({}, command_default2())).command(__spreadValues({}, command_default6())).command(__spreadValues({}, command_default7())).command(__spreadValues({}, command_default8())).command(__spreadValues({}, command_default12())).command(__spreadValues({}, command_default9())).epilogue(
    `For more information, visit ${import_chalk12.default.blue.underline(
      `${websiteUrl2}/docs`
    )}`
  ).argv;
};
if (require.main === module) {
  builda();
}
var src_default = builda;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  builda,
  buildaQuestion,
  buildaSubstitute,
  changeCase,
  printMessage,
  throwError
});
