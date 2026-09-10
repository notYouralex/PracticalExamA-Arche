// ========================================
// CCE 106L Lab Exam Set A — Short Answers
// ========================================

// 1. (4 pts) This code fails to run. Explain why in one sentence, then rewrite it correctly.
//   Original (broken) code (from exam): function getFullName(first, last) { return first + " " + last }
//   Explanation: The function is missing a return statement.
//   Corrected version:
function getFullName(first, last) {
  return first + ' ' + last;
}

// 2. (4 pts) Rewrite this function as an arrow function assigned to a constant named getFullName.
const getFullName2 = (first, last) => first + ' ' + last;

// 3. (4 pts) Given const count = 5;, write one console.log line using a template literal
//    that prints exactly: You have 5 contacts
const count = 5;
console.log(`You have ${count} contacts`);

// 4. (4 pts) Fill in the blank so mNames contains only the contacts whose name starts with the letter M.
const contacts = [
  { name: 'Maria', phone: '09171234567' },
  { name: 'Juan', phone: '09181234567' },
  { name: 'Mike', phone: '09191234567' },
  { name: 'Anna', phone: '09201234567' },
];
const mNames = contacts.filter((c) => c.name.startsWith('M'));

// 5. (4 pts) Fill in the blank to destructure name and phone out of a single contact object.
const contact = { name: 'Maria', phone: '09171234567' };
const { name, phone } = contact;
