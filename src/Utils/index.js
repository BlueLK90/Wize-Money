//numbers formatting
export const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

//date formatting
export const today = new Date().toLocaleDateString("en-CA");
const months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "June",
  "July",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];
export const formattedDate = (
  date = new Date().toLocaleDateString("en-CA")
) => {
  const [year, month, day] = date.split("-");
  const monthFormatted = months[month - 1];

  const fullDate = `${monthFormatted} ${day}, ${year}`;
  const monthYear = `${monthFormatted} ${year}`;
  return { fullDate, monthYear };
};
export const formattedSubmittedDate = (date) => {
  const [year, month, day] = date.split("-");
  let monthFormatted = months[month - 1];
  return `${monthFormatted} ${day}, ${year}`;
};
export const formattedMonthYear = (date) => {
  const [month, day, year] = date.split(" ");
  return `${month} ${year}`;
};

//
