
   let firstName =$('#firstName').val();
   let lastName =$('#lastName').val();
   let deptId =$('#deptId').val();
   let empId = $('#empID').text();

   let name =$('#name').val();
   let startDate =$('#startDate').val();
   let endDate =$('#endDate').val();
   let maxAttendees =$('#maxAttendees').val();
   let trainId = $('#trainID').text()
   console.log(empId);

$(".btn").click(function(){
    $("#formBtn").removeClass("hidden");
  });

$(".btn").click(function(){
    $("#empData").addClass("hidden");
  });

  $(".btn").click(function(){
    $("#btn").addClass("hidden");
  });
  

$("#btn2").click(function(){
  let firstName =$('#firstName').val();
  let lastName =$('#lastName').val();
  let deptId =$('#deptId').val();

    let employeeObj = {
      firstName, 
      lastName, 
      deptId};
    console.log(employeeObj);
      console.log(empId);
    $.ajax({
        type: "PUT",
        url: `http://localhost:4000/employees/${empId}`, 
        data: employeeObj
      })
      .then( (data) => {
      });
});

$("#btn2").click(function(){
  $("#formBtn").addClass("hidden");
  alert("EMPLOYEE INFO SUCCESSFULLY UPDATED, mkay?")
  location.reload();;
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
location.reload();;
});