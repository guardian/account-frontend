export enum Theme {
  news = "news",
  features = "features",
  sport = "sport",
  culture = "culture",
  lifestyle = "lifestyle",
  comment = "comment",
  work = "work",
  FromThePapers = "From the papers"
}

export enum ErrorTypes {
  GENERAL = "GENERAL",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION = "VALIDATION"
}

export enum ConsentOptionType {
  EMAIL = "EMAIL",
  NEWSLETTER = "NEWSLETTER",
  OPT_OUT = "OPT_OUT"
}

export interface User {
  id: string;
  primaryEmailAddress: string;
  location: string;
  aboutMe: string;
  interests: string;
  consents: string[];
  username: string;
  validated: boolean;
  title: string;
  firstName: string;
  secondName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  postcode: string;
  country: string;
  countryCode: string;
  localNumber: string;
}

export interface UserError {
  type: ErrorTypes.VALIDATION;
  error: {
    aboutMe: string;
    location: string;
    interests: string;
    username: string;
  };
}

export interface UserCollection {
  getCurrentUser: (fromCache?: boolean) => Promise<User>;
  save: (user: User) => Promise<User>;
  saveChanges: (original: User, changed: User) => Promise<User>;
  getChangedFields: (original: User, changed: User) => Partial<User>;
}

export interface ConsentOption {
  id: string;
  description: string;
  frequency?: string;
  name: string;
  theme?: string;
  type: ConsentOptionType;
  subscribed: boolean;
}

export interface ConsentOptionCollection {
  getAll: () => Promise<ConsentOption[]>;
  subscribe: (option: ConsentOption) => Promise<void>;
  unsubscribe: (option: ConsentOption) => Promise<void>;
  newsletters: (options: ConsentOption[]) => ConsentOption[];
  consents: (options: ConsentOption[]) => ConsentOption[];
  unsubscribeAll: () => Promise<void>;
  findById: (
    options: ConsentOption[],
    id: ConsentOption["id"]
  ) => ConsentOption | undefined;
  findByIds: (options: ConsentOption[], ids: string[]) => ConsentOption[];
}

/*
 * The following models are being used to aid in migration of functionality off of a legacy system. There is
 * currently no standard library or API for these values at the Guardian, when these become available, these hardcoded values should be replaced.
 * Note: COUNTRIES comes from a non-standard list used by the Guardian.
 */

export enum Titles {
  MR = "Mr",
  MRS = "Mrs",
  MS = "Ms",
  MX = "Mx",
  MISS = "Miss",
  DR = "Dr",
  PROF = "Prof",
  REV = "Rev"
}

// Stolen from: https://github.com/guardian/support-frontend/blob/master/support-frontend/assets/helpers/internationalisation/country.js
export const COUNTRIES: string[] = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire, Saint Eustatius and Saba",
  "Bosnia-Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "British Virgin Islands",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde Islands",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Korea",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territories",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn Islands",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Christopher & Nevis",
  "Saint Helena",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre & Miquelon",
  "Saint Vincent & The Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia & The South Sandwich Islands",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "United States Virgin Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Wallis & Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands"
];

/* Extracted from https://github.com/catamphetamine/libphonenumber-js using:
 * const core = require('libphonenumber-js/core');
 * const meta = require('libphonenumber-js/metadata.min.json');
 * const ccs = (new core.Metadata(meta)).countryCallingCodes();
 * const processed = Object.keys(ccs);
 * console.dir(processed, { 'maxArrayLength': null });
 */

export const PHONE_CALLING_CODES: string[] = [
  "1",
  "7",
  "20",
  "27",
  "30",
  "31",
  "32",
  "33",
  "34",
  "36",
  "39",
  "40",
  "41",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "81",
  "82",
  "84",
  "86",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "98",
  "211",
  "212",
  "213",
  "216",
  "218",
  "220",
  "221",
  "222",
  "223",
  "224",
  "225",
  "226",
  "227",
  "228",
  "229",
  "230",
  "231",
  "232",
  "233",
  "234",
  "235",
  "236",
  "237",
  "238",
  "239",
  "240",
  "241",
  "242",
  "243",
  "244",
  "245",
  "246",
  "247",
  "248",
  "249",
  "250",
  "251",
  "252",
  "253",
  "254",
  "255",
  "256",
  "257",
  "258",
  "260",
  "261",
  "262",
  "263",
  "264",
  "265",
  "266",
  "267",
  "268",
  "269",
  "290",
  "291",
  "297",
  "298",
  "299",
  "350",
  "351",
  "352",
  "353",
  "354",
  "355",
  "356",
  "357",
  "358",
  "359",
  "370",
  "371",
  "372",
  "373",
  "374",
  "375",
  "376",
  "377",
  "378",
  "380",
  "381",
  "382",
  "383",
  "385",
  "386",
  "387",
  "389",
  "420",
  "421",
  "423",
  "500",
  "501",
  "502",
  "503",
  "504",
  "505",
  "506",
  "507",
  "508",
  "509",
  "590",
  "591",
  "592",
  "593",
  "594",
  "595",
  "596",
  "597",
  "598",
  "599",
  "670",
  "672",
  "673",
  "674",
  "675",
  "676",
  "677",
  "678",
  "679",
  "680",
  "681",
  "682",
  "683",
  "685",
  "686",
  "687",
  "688",
  "689",
  "690",
  "691",
  "692",
  "800",
  "808",
  "850",
  "852",
  "853",
  "855",
  "856",
  "870",
  "878",
  "880",
  "881",
  "882",
  "883",
  "886",
  "888",
  "960",
  "961",
  "962",
  "963",
  "964",
  "965",
  "966",
  "967",
  "968",
  "970",
  "971",
  "972",
  "973",
  "974",
  "975",
  "976",
  "977",
  "979",
  "992",
  "993",
  "994",
  "995",
  "996",
  "998"
];
