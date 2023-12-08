import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 7-character random string
export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function getPlaceholderPrompt() {
  const prompts =
  [
'A lego pirate ship',
'A lego garbage truck',
'A lego dinosaur',
'A lego castle',
'A lego space shuttle',
'A lego race car',
'A lego dragon',
'A lego police station',
'A lego fire station',
'A lego train station',
'A lego airport',
'A lego farm set',
'A lego city skyline',
'A lego submarine',
'A lego robot',
'A lego tree house',
'A lego hospital',
'A lego zoo',
'A lego amusement park',
'A lego beach scene',
'A lego medieval village',
'A lego ninja temple',
'A lego superhero base',
'A lego deep sea explorer',
'A lego haunted house',
'A lego safari set',
'A lego basketball court',
'A lego football stadium',
'A lego baseball field',
'A lego hockey rink',
'A lego ski resort',
'A lego camping set',
'A lego fishing boat',
'A lego cruise ship',
'A lego lighthouse',
'A lego mountain cabin',
'A lego beach hut',
'A lego luxury yacht',
'A lego roller coaster',
'A lego ferris wheel',
'A lego carousel',
'A lego water park',
'A lego skate park',
'A lego pet shop',
'A lego bakery',
'A lego grocery store',
'A lego bank',
'A lego post office',
'A lego movie theater',
'A lego library',
'A lego museum',
'A lego aquarium',
'A lego planetarium',
'A lego observatory',
'A lego city hall',
'A lego courthouse',
'A lego fire truck',
'A lego police car',
'A lego ambulance',
'A lego ice cream truck',
'A lego delivery van',
'A lego taxi',
'A lego limousine',
'A lego school bus',
'A lego dump truck',
'A lego cement mixer',
'A lego excavator',
'A lego bulldozer',
'A lego crane',
'A lego helicopter',
'A lego jet plane',
'A lego biplane',
'A lego fighter jet',
'A lego hot air balloon',
'A lego blimp',
'A lego spaceship',
'A lego alien UFO',
'A lego Mars rover',
'A lego lunar module',
'A lego international space station',
'A lego satellite',
'A lego asteroid mining rig',
'A lego deep space craft',
'A lego futuristic city',
'A lego cyberpunk cityscape',
'A lego steampunk airship',
'A lego pirate island',
'A lego treasure island',
'A lego volcano base',
'A lego desert oasis',
'A lego jungle temple',
'A lego Arctic research station',
'A lego mountain peak',
'A lego canyon',
'A lego waterfall',
'A lego forest',
'A lego coral reef',
'A lego undersea city',
'A lego alien invasion scene',
'A lego superhero showdown',
'A lego monster attack',
'A lego epic battle scene',
'A lego historical landmark series',
]

  return prompts[Math.floor(Math.random() * prompts.length)];
}
