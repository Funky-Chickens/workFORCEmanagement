'use strict';

// This gets all the x buttons and then uses their attributes to store values then passes them through the ajax call toa new route
//which takes in TWO route params for the new thing in employeeRoutes.js

$(".xbuttons").click(function(event){
    let emp_id = this.name;
    let train_id = this.value;
    $.ajax({
        type: "DELETE",
        url: `/employee_training/${emp_id}/${train_id}`
        })
      .then( (data) => {
      });
});