
   let firstName =$('#firstName').val();
   let lastName =$('#lastName').val();
   let deptId =$('#deptId').val();
   let empId = $('#empID').text()
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