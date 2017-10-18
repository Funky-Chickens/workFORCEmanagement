'use strict';

console.log("it works");

let firstName =$('#firstName').val();
let lastName =$('#lastName').val();
let deptId =$('#deptId').val();
let empId = $('#empID').text();
let name =$('#name').val();
let startDate =$('#startDate').val();
let endDate =$('#endDate').val();
let maxAttendees =$('#maxAttendees').val();
let trainId = $('#trainID').text()

$(".btn").click(function(){
  $("#formBtn").removeClass("hidden");
  $("#btn").addClass("hidden");
  $("#empData").addClass("hidden");
  $("#editForm").removeClass("hidden")
});

  

$("#btn3").click(function(){
  let name =$('#name').val();
  let startDate =$('#startDate').val();
  let endDate =$('#endDate').val();
  let maxAttendees =$('#maxAttendees').val();
    let trainingObj = {
      name, 
      startDate, 
      endDate,
      maxAttendees};
    $.ajax({
        type: "PUT",
        url: `http://localhost:4000/training/${trainId}`, 
        data: trainingObj
      })
      .then( (data) => {
      });
});

$("#btn3").click(function(){
  $("#formBtn").addClass("hidden");
  alert("PROGRAM INFO SUCCESSFULLY UPDATED, mkay?")
});

$("#submitEmp").click(function(){
  $("#formBtn").addClass("hidden");
  alert("EMPLOYEE SUCCESSFULLY ADDED, mkay?")
});

$("#submitTrain").click(function(){
  $("#formBtn").addClass("hidden");
  alert("PROGRAM SUCCESSFULLY ADDED, mkay?")
});
