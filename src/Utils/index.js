//numbers formatting
export const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

//date formatting
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
export const formattedDate = () => {
  let date = new Date().toISOString().split("T")[0];
  const [year, month, day] = date.split("-");
  let monthFormatted = months[month - 1];
  return `${monthFormatted} ${day}, ${year}`;
};

//
