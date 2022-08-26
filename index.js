
function createEmployeeRecord(array) {
    let employeeRecord = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
    return employeeRecord;
  }
  function createEmployeeRecords(arrays) {
    const employeeData = arrays.map(createEmployeeRecord);
    return employeeData;
  }
  
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    const timeObj = {
      type: "TimeIn",
      hour: parseInt(hour),
      date: date,
    };
    this.timeInEvents.push(timeObj);
    return this;
  }
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    const timeObj = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: date,
    };
    this.timeOutEvents.push(timeObj);
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    let findTimeInDate = this.timeInEvents.find((obj) => obj.date === date);
    let startTime = findTimeInDate.hour;
    let findTimeOutDate = this.timeOutEvents.find((obj) => obj.date === date);
    let endTime = findTimeOutDate.hour;
    return (endTime - startTime) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
};

function findEmployeeByFirstName(srcArray, firstName) {
    let findName = srcArray.find(
      (employee) => employee.firstName.toLowerCase() === firstName.toLowerCase()
    );
    return findName;
  }
  function calculatePayroll(array) {
    let test = array.map((employee) => allWagesFor.call(employee));
    const sum = (a, b) => a + b;
    return test.reduce(sum);
  }