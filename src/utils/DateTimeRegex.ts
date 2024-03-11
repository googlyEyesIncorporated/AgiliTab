// Define the common pattern for dates as a string
const day = "(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)";
const MMM = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
const MMMM =
  "(January|February|March|April|May|June|July|August|September|October|November|December)";
const meridian = "(AM|PM)";
const yyyy = "(\\d{4})";
const TwoDigs = "(\\d{2})";
const OneOrTwoDigs = "(\\d{1,2})";

// regex datePattern to match Monday - 03/04/2024
export const MMDDYYYYDate = new RegExp(
  `^${day} - ${TwoDigs}\\/${TwoDigs}\\/${yyyy}$`
);
// regex datePattern to match Monday - Mar 04, 2024
export const mmmddyyyyDate = new RegExp(
  `^${day} - ${MMM} ${TwoDigs}, ${yyyy}$`
);
// regex datePattern to match Monday - March 04, 2024
export const MMMMddyyyy = new RegExp(`^${day} - ${MMMM} ${TwoDigs}, ${yyyy}$`);
// regex datePattern to match Monday - 04/03/2024
export const ddMMyyyy = new RegExp(`^${day} - ${TwoDigs}/${TwoDigs}/${yyyy}$`);
// regex datePattern to match Monday - 4 Mar 2024
export const dMMMyyyy = new RegExp(`^${day} - ${OneOrTwoDigs} ${MMM} ${yyyy}$`);
// regex datePattern to match Monday - 4 March 2024
export const dMMMMyyyy = new RegExp(
  `^${day} - ${OneOrTwoDigs} ${MMMM} ${yyyy}$`
);
// regex datePattern to match Monday - 2024-03-04
export const yyyyMMdd = new RegExp(`^${day} - ${yyyy}-${TwoDigs}-${TwoDigs}$`);

// regex timePattern to match 1:34 AM
export const hmma = new RegExp(`^${OneOrTwoDigs}:${TwoDigs} ${meridian}$`);
// regex timePattern to match 1:34:05 AM
export const hmmssa = new RegExp(
  `^${OneOrTwoDigs}:${TwoDigs}:${TwoDigs} ${meridian}$`
);
// regex timePattern to match 01:34
export const HHmm = new RegExp(`^${TwoDigs}:${TwoDigs}$`);
// regex timePattern to match 01:34:05
export const HHmmss = new RegExp(`^${TwoDigs}:${TwoDigs}:${TwoDigs}$`);
