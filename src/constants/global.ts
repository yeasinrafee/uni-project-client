export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const weeks = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const genderNames = ['male', 'female', 'others'];

export const bloodGroupNames = [
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
];

export const monthOptions = monthNames.map((month) => ({
  value: month,
  label: month,
}));

export const genderOptions = genderNames.map((gender) => ({
  value: gender,
  label: gender.slice(0, 1).toUpperCase() + gender.slice(1),
}));

export const bloodGroupOptions = bloodGroupNames.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));

export const weekOptions = weeks.map((week) => ({
  value: week,
  label: week,
}));
