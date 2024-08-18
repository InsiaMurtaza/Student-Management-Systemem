import inquirer from "inquirer";
const studentId = Math.floor(Math.random() * 100000);
// console.log(studentId);
let myBalance = 0;
let answer = await inquirer.prompt([{
        name: "studentName",
        message: "Please enter your name: ",
        type: "input",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
        }
    },
    {
        name: "courses",
        message: "Please select the course: ",
        type: "list",
        choices: ["B.E Software", "B.E Hardware", "B.S ComputerScience", "B.E Electrical", "B.E Electronics", "B.E Mechanical"]
    }
]);
const termFees = {
    "B.E Software": 50000,
    "B.E Hardware": 45000,
    "B.S ComputerScience": 50000,
    "B.E Electrical": 40000,
    "B.E Electronics": 40000,
    "B.E Mechanical": 35000
};
console.log(`The termfees of ${answer.courses} is ${termFees[answer.courses]}\n`);
console.log(`Your Balance is ${myBalance}`);
let askTopay = await inquirer.prompt([{
        name: "wantTopay",
        message: "Do you want to pay fees?",
        type: "list",
        choices: ["Yes", "No"]
    }]);
if (askTopay.wantTopay == "Yes") {
    let paymentMethod = await inquirer.prompt([{
            name: "pay",
            message: "Select Payment Mode: ",
            type: "list",
            choices: ["Debit or Credit Card", "JazzCash", "EasyPaisa"]
        },
        {
            name: "amount",
            message: "Enter Amount: ",
            type: "input",
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter amount in number";
                }
                else if (input < termFees[answer.courses]) {
                    return console.log(`\nYou have entered amount less than ${termFees[answer.courses]}\nTo confirm admission you must pay complete term fees!`);
                }
                myBalance = input;
                console.log("\nCongratulations!You have successfully paid term fees.\nYour admission is confirmed!");
                return true;
            }
        }]);
}
else {
    console.log("Unless you do not pay term fees your admission is not confirmed");
    process.exit;
}
let nextStep = await inquirer.prompt([{
        name: "viewStatusOrexit",
        message: "What would you like to do next? ",
        type: "list",
        choices: ["View Status", "Exit"]
    }]);
if (nextStep.viewStatusOrexit == "View Status" && myBalance >= termFees[answer.courses]) {
    console.log(`Student Name: ${answer.studentName}\nStudent ID: ${studentId}\nCourse Selected: ${answer.courses}\nYour Balance: ${myBalance}`);
}
else if (nextStep.viewStatusOrexit == "View Status" && myBalance == 0) {
    console.log("Unless you do not pay term fees your admission is not confirmed");
}
else {
    console.log("\bThankyou for using our University Management System\b");
    process.exit;
}
