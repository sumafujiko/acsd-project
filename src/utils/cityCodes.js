const cityCodes = {
  //Only the cities with one name (London works, New York doesnt) work, and they have to be relatively close to Dublin
  "New York": "NYC",
  London: "LON",
  "Los Angeles": "LAX",
  Chicago: "CHI",
  Paris: "PAR",
  Tokyo: "TYO",
  "San Francisco": "SFO",
  "Hong Kong": "HKG",
  Sydney: "SYD",
  Toronto: "YTO",
  Vancouver: "YVR",
  Berlin: "BER",
  Frankfurt: "FRA",
  Munich: "MUC",
  Amsterdam: "AMS",
  Dubai: "DXB",
  Singapore: "SIN",
  Bangkok: "BKK",
  "Kuala Lumpur": "KUL",
  "Cape Town": "CPT",
  Johannesburg: "JNB",
  Moscow: "MOW",
  Istanbul: "IST",
  Rome: "ROM",
  Madrid: "MAD",
  Barcelona: "BCN",
  Athens: "ATH",
  Dublin: "DUB",
  Zurich: "ZRH",
  Geneva: "GVA",
  Vienna: "VIE",
  Brussels: "BRU",
  Stockholm: "STO",
  Oslo: "OSL",
  Copenhagen: "CPH",
  Helsinki: "HEL",
  Lisbon: "LIS",
  Warsaw: "WAW",
  Budapest: "BUD",
  Prague: "PRG",
  "Abu Dhabi": "AUH",
  Doha: "DOH",
  Riyadh: "RIY",
  Jeddah: "JED",
  Beijing: "BJS",
  Shanghai: "SHA",
  Guangzhou: "CAN",
  Seoul: "SEL",
  Mumbai: "BOM",
  Delhi: "DEL",
  Bangalore: "BLR",
  Chennai: "MAA",
  Manila: "MNL",
  Jakarta: "JKT",
  "Ho Chi Minh": "SGN",
  Saigon: "SGN",
  Melbourne: "MEL",
  Brisbane: "BNE",
  Auckland: "AKL",
};

// Addding common airport codes as a test
const airportToCityCode = {
  LHR: "LON",
  CDG: "PAR",
  JFK: "NYC",
  // Might add more if needed
};

export const getCityCode = (input) => {
  if (!input) return null;

  const upperInput = input.toUpperCase();

  // Check if the input is already a valid city code
  if (Object.values(cityCodes).includes(upperInput)) {
    return upperInput;
  }

  // Check if the input is a city name
  const cityCode = cityCodes[input];
  if (cityCode) {
    return cityCode;
  }

  // Check if its an airport code we can map to a city
  if (airportToCityCode[upperInput]) {
    return airportToCityCode[upperInput];
  }

  // If its a iata code but not in our list, return it as is
  if (upperInput.length === 3 && upperInput.match(/^[A-Z]{3}$/)) {
    console.warn(`Assuming ${upperInput} is a valid airport or city code.`);
    return upperInput;
  }

  // If no match found, return null
  console.warn(`No city code found for input: ${input}`);
  return null;
};

export default cityCodes;
