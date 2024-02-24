import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserId = (): string => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = nanoid();
    localStorage.setItem("userId", userId);
  }
  return userId;
};

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export function getPlaceholderPrompt() {
  const prompts = [
    "A lego pirate ship",
    "A lego garbage truck",
    "A lego dinosaur",
    "A lego castle",
    "A lego space shuttle",
    "A lego race car",
    "A lego dragon",
    "A lego police station",
    "A lego fire station",
    "A lego train station",
    "A lego airport",
    "A lego farm set",
    "A lego city skyline",
    "A lego submarine",
    "A lego robot",
    "A lego tree house",
    "A lego hospital",
    "A lego zoo",
    "A lego amusement park",
    "A lego beach scene",
    "A lego medieval village",
    "A lego ninja temple",
    "A lego superhero base",
    "A lego deep sea explorer",
    "A lego haunted house",
    "A lego safari set",
    "A lego basketball court",
    "A lego football stadium",
    "A lego baseball field",
    "A lego hockey rink",
    "A lego ski resort",
    "A lego camping set",
    "A lego fishing boat",
    "A lego cruise ship",
    "A lego lighthouse",
    "A lego mountain cabin",
    "A lego beach hut",
    "A lego luxury yacht",
    "A lego roller coaster",
    "A lego ferris wheel",
    "A lego carousel",
    "A lego water park",
    "A lego skate park",
    "A lego pet shop",
    "A lego bakery",
    "A lego grocery store",
    "A lego bank",
    "A lego post office",
    "A lego movie theater",
    "A lego library",
    "A lego museum",
    "A lego aquarium",
    "A lego planetarium",
    "A lego observatory",
    "A lego city hall",
    "A lego courthouse",
    "A lego fire truck",
    "A lego police car",
    "A lego ambulance",
    "A lego ice cream truck",
    "A lego delivery van",
    "A lego taxi",
    "A lego limousine",
    "A lego school bus",
    "A lego dump truck",
    "A lego cement mixer",
    "A lego excavator",
    "A lego bulldozer",
    "A lego crane",
    "A lego helicopter",
    "A lego jet plane",
    "A lego biplane",
    "A lego fighter jet",
    "A lego hot air balloon",
    "A lego blimp",
    "A lego spaceship",
    "A lego alien UFO",
    "A lego Mars rover",
    "A lego lunar module",
    "A lego international space station",
    "A lego satellite",
    "A lego asteroid mining rig",
    "A lego deep space craft",
    "A lego futuristic city",
    "A lego cyberpunk cityscape",
    "A lego steampunk airship",
    "A lego pirate island",
    "A lego treasure island",
    "A lego volcano base",
    "A lego desert oasis",
    "A lego jungle temple",
    "A lego Arctic research station",
    "A lego mountain peak",
    "A lego canyon",
    "A lego waterfall",
    "A lego forest",
    "A lego coral reef",
    "A lego undersea city",
    "A lego alien invasion scene",
    "A lego superhero showdown",
    "A lego monster attack",
    "A lego epic battle scene",
    "A lego historical landmark series",
  ];

  return prompts[Math.floor(Math.random() * prompts.length)];
}

export const exampleImages = [
  // {
  //   key: "0hHdwLH",
  //   description: "a lego taylor swift sculpture",
  // },
  // {
  //   key: "2NKuGRl",
  //   description: "a lego fruit basket",
  // },
  {
    key: "3lEdhRl",
    description: "a lego pizza",
  },
  {
    key: "Edski1u",
    description: "a lego taxi",
  },
  {
    key: "IhpM99Y",
    description: "a lego christmas tree",
  },
  {
    key: "LUmcEyM",
    description: "lego winter wonderland",
  },
  {
    key: "O6ctATM",
    description: "a lego horse",
  },
  {
    key: "SwHDM0s",
    description: "a lego coral reef",
  },
  {
    key: "T9NyCGp",
    description: "a lego Polaroid photo",
  },
  {
    key: "X93VfEI",
    description: "a lego portrait of the mona lisa",
  },
  {
    key: "XxsAoIM",
    description: "A lego anatomical heart",
  },
  {
    key: "obV2izq",
    description: "a lego swamp monster",
  },
  {
    key: "qJxE8uM",
    description: "a lego steampunk airship",
  },
  {
    key: "sy5h2qX",
    description: "a lego elf",
  },
  {
    key: "delorean",
    description: "a lego Delorean from Back to the Future",
  },
  {
    key: "chihuahua",
    description: "a lego chihuahua wearing a sombrero",
  },
  {
    key: "hamster",
    description: "a lego hamster wearing a winter coat and hat",
  },
  {
    key: "koi",
    description: "a lego koi pond",
  },
  {
    key: "leprechaun",
    description:
      "a lego leprechaun sitting near a pot of gold at the end of a rainbow",
  },
  {
    key: "draculacastle",
    description: "a lego model of dracula's castle",
  },
  {
    key: "fancytoad",
    description: "a lego toad wearing a tuxedo and top hat",
  },
  {
    key: "trex",
    description:
      "a lego tyrannosaurus rex riding a unicycle while juggling three red balls and wearing overalls and glasses while other dinosaurs crowd around to watch",
  },
  {
    key: "rabbit",
    description: "a lego white rabbit detective with a monocle and pipe",
  },
  {
    key: "wolverine",
    description: "lego Hugh Jackman Wolverine",
  },
  {
    key: "magician",
    description: "a lego magician pulling a rabbit out of a hat",
  },
  {
    key: "witch",
    description: "lego witch brewing a potion in a cauldron",
  },
];

export const AFFILIATE_LINKS = [
  {
    title: "Lego Icons Bonsai",
    url: "https://amzn.to/3Torq4O",
    image: "/ads/bonsai.png",
  },
  {
    title: "Lego Architecture Himeji Castle",
    url: "https://amzn.to/41cWOFm",
    image: "/ads/himeji.png",
  },
  {
    title: "Lego Ideas Insect Collection",
    url: "https://amzn.to/3NeZdJR",
    image: "/ads/insects.png",
  },
  {
    title: "Lego Icons Flower Bouquet",
    url: "https://amzn.to/41ekn0x",
    image: "/ads/bouquet.png",
  },
  {
    title: "Lego Ideas Polaroid",
    url: "https://amzn.to/48nIeNq",
    image: "/ads/polaroid.png",
  },
  {
    title: "Lego Icons Kingfisher",
    url: "https://amzn.to/3uBIfQ7",
    image: "/ads/kingfisher.png",
  },
  {
    title: "Lego Icons Orchid",
    url: "https://amzn.to/488uvKF",
    image: "/ads/orchid.png",
  },
  {
    title: "Lego Icons Succulents",
    url: "https://amzn.to/4acBaoL",
    image: "/ads/succulents.png",
  },
  {
    title: "Lego Icons PAC-Man",
    url: "https://amzn.to/48BokPe",
    image: "/ads/pacman.png",
  },
  {
    title: "Lego Super Mario Piranha Plant",
    url: "https://amzn.to/3OPUPCc",
    image: "/ads/piranhaplant.png",
  },
  {
    title: "Lego Icons Concorde",
    url: "https://amzn.to/3OVa393",
    image: "/ads/concorde.png",
  },

  {
    title: "Lego Ideas Jazz Quartet",
    url: "https://amzn.to/3UPqZRS",
    image: "/ads/quartet.png",
  },
  {
    title: "Lego Architecture Empire State Building",
    url: "https://amzn.to/42XR2IQ",
    image: "/ads/empire.png",
  },

  {
    title: "Lego Icons Back to The Future",
    url: "https://amzn.to/3T9HUNS",
    image: "/ads/delorean.png",
  },
  {
    title: "Lego Icons Loop Coaster",
    url: "https://amzn.to/49oAoEE",
    image: "/ads/coaster.png",
  },
  {
    title: "Lego Icons Ghostbusters",
    url: "https://amzn.to/3SRZJj7",
    image: "/ads/ecto1.png",
  },
  {
    title: "Lego Harry Potter Hogwarts Express",
    url: "https://amzn.to/3wp8I3L",
    image: "/ads/hpexpress.png",
  },
  {
    title: "Lego Technic Liebherr Crane",
    url: "https://amzn.to/3OUZrXo",
    image: "/ads/liebherr.png",
  },

  {
    title: "Lego Technic Mars Rover",
    url: "https://amzn.to/49MzocW",
    image: "/ads/rover.png",
  },

  {
    title: "Lego Ideas Motorized Lighthouse",
    url: "https://amzn.to/3PhSOir",
    image: "/ads/lighthouse.png",
  },
  {
    title: "Lego Architecture Statue of Liberty",
    url: "https://amzn.to/3T9jiVt",
    image: "/ads/statue.png",
  },
];
