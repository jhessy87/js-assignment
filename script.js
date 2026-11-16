// //    1. Project Background
// //    STUDENT EXAMINATION MANAGEMENT SYSTEM
   
    const studentinfo = [
  "Jesse", "Charles", "Ralph", "Koko", "Madugu",
  "Benjamin", "Rabiu", "Seth", "Wisdom", "Glorious"
];

console.log(studentinfo);

//  Task A: Student Information and Variables (5 marks)

const fullName = "Adyeson Jesse";                
const department = "Blockfuse Labs";        
const age = 58;                                
let registrationStatus = true;                 
let outstandingFees = 50000.00;                 
let attendancePercentage = 82;                


let htmlScore = 68;
let cssScore = 74;
let javascriptScore = 59;

let supervisorName = null;                     

let scholarship;                         

const scores = [htmlScore, cssScore, javascriptScore];
const courses = ["HTML", "CSS", "JavaScript"];

console.log("Name:", fullName, "|", typeof fullName);
console.log("Age:", age, "|", typeof age);
console.log("Registered:", registrationStatus, "|", typeof registrationStatus);
console.log("Department:", department, "|", typeof department);
console.log("Outstanding fees:", outstandingFees, "|", typeof outstandingFees);
console.log("Attendance %:", attendancePercentage, "|", typeof attendancePercentage);
console.log("Supervisor:", supervisorName, "|", typeof supervisorName); 
console.log("Scholarship:", scholarship, "|", typeof scholarship);        
console.log("Scores:", scores, "| is array:", Array.isArray(scores));
console.log("Courses:", courses);

// Task B:

console.log("15" + 5);
console.log("15" + 2);
console.log(10 + true);
console.log("10" === 10);
console.log(typeof NaN);
console.log(Boolean(""));
console.log("15" - 5);
console.log("15" / 3);
console.log("10" == 10);
console.log(typeof null);
console.log(Boolean("false"));

// let htmlScore = "75";
// let cssScore = "eighty";
// let javascriptScore = 85;

// 1 & 2. Convert numeric strings and identify values that cannot be converted
function toValidNumber(value, label, min, max) {
  // Number("") is 0, Number(null) is 0 and Number(true) is 1, so block these first
  if (typeof value === "string") {
    if (value.trim() === "") return { valid: false, reason: `${label} is empty` };
  } else if (typeof value !== "number") {
    return { valid: false, reason: `${label} must be a number or numeric string, got ${value === null ? "null" : typeof value}` };
  }

  const num = Number(value);                       
  if (!Number.isFinite(num)) {                    
    return { valid: false, reason: `${label} "${value}" is not a valid number` };
  }
  
  if (num < min || num > max) {
    return { valid: false, reason: `${label} ${num} is outside ${min}-${max}` };
  }
  return { valid: true, value: num };
}

function cleanInput(raw) {
  const rules = {
    age:             { min: 5, max: 100 },
    htmlScore:       { min: 0, max: 100 },
    cssScore:        { min: 0, max: 100 },
    javascriptScore: { min: 0, max: 100 }
  };
  const clean = {};
  const errors = [];
  for (const [field, { min, max }] of Object.entries(rules)) {
    const result = toValidNumber(raw[field], field, min, max);
    if (result.valid) clean[field] = result.value;
    else errors.push(result.reason);
  }
  return { clean, errors };
}

// 4. Only calculate when every score is valid
function calculateAverage(clean, errors) {
  if (errors.length > 0) {
    return `Calculation blocked. ${errors.length} invalid value(s).`;
  }
  const total = clean.htmlScore + clean.cssScore + clean.javascriptScore;
  return `Total: ${total}, Average: ${(total / 3).toFixed(2)}`;
}


console.log("--- Raw input ---");
console.log({ age, htmlScore, cssScore, javascriptScore });

const { clean, errors } = cleanInput({ age, htmlScore, cssScore, javascriptScore });
console.log("\n--- Converted values ---");
console.log(clean);
console.log("\n--- Rejected ---");
errors.forEach(e => console.log("x", e));
console.log("\n" + calculateAverage(clean, errors));


const fixed = cleanInput({ age: "19", htmlScore: "75", cssScore: "80", javascriptScore: 85 });
console.log("\n--- After correcting cssScore to \"80\" ---");
console.log(fixed.clean);
console.log(calculateAverage(fixed.clean, fixed.errors));

// Edge cases that fool a simple Number() call
console.log("\n--- Edge cases ---");
["", "  ", null, undefined, true, "12abc", "101", "-5", " 70 ", "7e1", Infinity].forEach(v => {
  const r = toValidNumber(v, "score", 0, 100);
  console.log(JSON.stringify(v) ?? String(v), "->", r.valid ? `accepted as ${r.value}` : `rejected (${r.reason})`);
});

// Implicit vs explicit coercion
console.log("\n--- Implicit coercion (JavaScript decides) ---");
console.log('"75" + 85      =', "75" + 85);          
console.log('"75" * 1       =', "75" * 1);           
console.log('"75" + "eighty" =', "75" + "eighty");   
console.log('"eighty" * 1   =', "eighty" * 1);     

console.log("\n--- Explicit coercion (we decide) ---");
console.log('Number("75") + 85       =', Number("75") + 85);       
console.log('Number("eighty")        =', Number("eighty"));        
console.log('parseInt("75px", 10)    =', parseInt("75px", 10));   
console.log('Number("75px")          =', Number("75px"));       
console.log('String(85)              =', String(85), typeof String(85));


// Examination eligibility using conditional statements

const MIN_AGE = 18;
const MIN_ATTENDANCE = 75;

function checkEligibility(student) {
  const reasons = [];

  if (typeof student.age !== "number" || Number.isNaN(student.age)) {
    reasons.push("Age is missing or invalid, so it cannot be checked.");
  } else if (student.age < MIN_AGE) {
    reasons.push(`Under age: ${student.age} years old (minimum is ${MIN_AGE}).`);
  }

  if (student.registered !== true) {
    reasons.push("Not registered for the examination.");
  }

  if (typeof student.outstandingFees !== "number" || Number.isNaN(student.outstandingFees)) {
    reasons.push("Fee balance is missing or invalid, so it cannot be checked.");
  } else if (student.outstandingFees > 0) {
    reasons.push(`Outstanding fees of ${student.outstandingFees} have not been cleared.`);
  }

  if (typeof student.attendance !== "number" || Number.isNaN(student.attendance)) {
    reasons.push("Attendance is missing or invalid, so it cannot be checked.");
  } else if (student.attendance < MIN_ATTENDANCE) {
    reasons.push(`Attendance is ${student.attendance}% (minimum is ${MIN_ATTENDANCE}%).`);
  }

  // Eligible only when no rule was broken
  if (reasons.length === 0) {
    return { eligible: true, reasons: [] };
  } else {
    return { eligible: false, reasons };
  }
}

function report(student) {
  const result = checkEligibility(student);
  console.log(`\n${student.name}`);
  if (result.eligible) {
    console.log("  ELIGIBLE: all four requirements are met.");
  } else {
    console.log(`  REJECTED (${result.reasons.length} problem${result.reasons.length > 1 ? "s" : ""}):`);
    result.reasons.forEach(r => console.log("   - " + r));
  }
}

// Test students
const students = [
  { name: "Amina (passes everything)", age: 22, registered: true,  outstandingFees: 0,     attendance: 85 },
  { name: "Tunde (too young)",         age: 17, registered: true,  outstandingFees: 0,     attendance: 90 },
  { name: "Chidi (not registered)",    age: 25, registered: false, outstandingFees: 0,     attendance: 80 },
  { name: "Zainab (owes fees)",        age: 20, registered: true,  outstandingFees: 15000, attendance: 78 },
  { name: "Bala (low attendance)",     age: 19, registered: true,  outstandingFees: 0,     attendance: 60 },
  { name: "Ngozi (fails everything)",  age: 16, registered: false, outstandingFees: 5000,  attendance: 40 },
  { name: "Ife (boundary values)",     age: 18, registered: true,  outstandingFees: 0,     attendance: 75 },
  { name: "Musa (bad data)",           age: "19", registered: true, outstandingFees: 0,    attendance: 80 }
];

students.forEach(report);

// Total, average and grade calculation

function validateScore(value, label) {
  if (typeof value === "string") {
    if (value.trim() === "") return { valid: false, reason: `${label} is empty` };
  } else if (typeof value !== "number") {
    return { valid: false, reason: `${label} is not numeric (got ${value === null ? "null" : typeof value})` };
  }
  const num = Number(value);
  if (!Number.isFinite(num)) return { valid: false, reason: `${label} "${value}" is not a valid number` };
  if (num < 0)   return { valid: false, reason: `${label} ${num} is below 0` };
  if (num > 100) return { valid: false, reason: `${label} ${num} is above 100` };
  return { valid: true, value: num };
}


function assignGrade(average) {
  if (average >= 80) return "A";
  else if (average >= 70) return "B";
  else if (average >= 60) return "C";
  else if (average >= 50) return "D";
  else return "F";
}

function processScores(name, raw) {
  const scores = [];
  const errors = [];

  for (const [subject, value] of Object.entries(raw)) {
    const result = validateScore(value, subject);
    if (result.valid) scores.push(result.value);
    else errors.push(result.reason);
  }

  console.log(`\n${name}`);

  // Do not calculate anything when any score is invalid
  if (errors.length > 0) {
    console.log("  REJECTED: total, average and grade not calculated.");
    errors.forEach(e => console.log("   - " + e));
    return;
  }

  const total = scores.reduce((sum, s) => sum + s, 0);
  const average = total / scores.length;
  console.log(`  Total: ${total}/${scores.length * 100}`);
  console.log(`  Average: ${average.toFixed(2)}`);
  console.log(`  Grade: ${assignGrade(average)}`);
}

// Test cases
processScores("Amina (all valid, strings and numbers mixed)", { html: "75", css: 80, javascript: 85 });
processScores("Tunde (non-numeric score)",                    { html: 75,   css: "eighty", javascript: 85 });
processScores("Chidi (score above 100)",                      { html: 105,  css: 80, javascript: 85 });
processScores("Zainab (score below 0)",                       { html: -10,  css: 80, javascript: 85 });
processScores("Bala (several problems)",                      { html: "",   css: null, javascript: 150 });
processScores("Ife (grade boundary: 80 exactly)",             { html: 80,   css: 80, javascript: 80 });
processScores("Musa (decimal average 79.67)",                 { html: 80,   css: 80, javascript: 79 });
processScores("Ngozi (fails)",                                { html: 40,   css: 35, javascript: 50 });
processScores("Kemi (zeros are valid)",                       { html: 0,    css: 0,  javascript: 0 });





