import dayjs from "dayjs";
export function formatToShowday(date) {
  return dayjs(date).format("dddd, MMMM D, YYYY");
}
export function stringToSlug(str) {
  // If str is not a string, handle different edge cases (null, undefined, numbers, etc.)
  if (str == null) {
      return ''; // Return an empty string if str is null or undefined
  }
  
  if (typeof str !== 'string') {
      str = String(str); // Ensure non-string values are converted to strings
  }

  // Edge case: If str is an empty string after conversion, return an empty string
  if (str.trim() === '') {
      return ''; // Return empty string if str is empty or only whitespace
  }

  return str
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s-]/g, '') // Remove non-word characters (e.g., punctuation)
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with a single one
      .trim('-'); // Remove leading and trailing hyphens
}


export function removeDots(str) {
  // Check if the string contains a dot
  if (str.indexOf('.') === -1) {
    return str;  // Return the original string if no dot is found
  }

  // Remove all dots if any are found
  return str.replace(/\./g, '');
}
export function generateRandom3DLogoIdea() {
  const adjectives = [
    "Glowing", "Metallic", "Mystical", "Futuristic", "Crystal", "Vibrant", 
    "Shimmering", "Bold", "Dynamic", "Elegant", "Abstract", "Intricate",
    "Flaming", "Golden", "Electric", "Holographic", "Smooth", "Textured", 
    "Radiant", "Neon", "Opulent", "Sleek", "Majestic", "Luminous", 
    "Bold", "Glistening", "Angelic", "Shiny", "Retro", "Cosmic"
  ];

  const elements = [
    "Lightning Bolt", "Wings", "Crown", "Flames", "Leaf", "Galaxy Swirl", 
    "Circuit Board", "Diamond", "Globe", "Star", "Heart", "Arrow", 
    "Dragon", "Phoenix", "Rocket", "Tree", "Feather", "Sword", "Anchor", 
    "Lion", "Eagle", "Skull", "Key", "Shield", "Skyscraper", 
    "Butterfly", "Hammer", "Moon", "Crescent", "Ring", "Compass", 
    "Eye", "Wheel", "Wolf", "Tiger", "Spider", "Skull", "Lightning"
  ];
  // Pick a random adjective and element
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const element = elements[Math.floor(Math.random() * elements.length)];

  // Construct the idea
  const idea = `${adjective} ${element}.`;

  return idea;
}

export function addDashToSpace(str) {
  // Check if there's a space in the string
  if (str.includes(' ')) {
    // Replace spaces with dashes
    return str.replace(/ /g, '-');
  }
  // Return the string unchanged if no spaces
  return str;
}


