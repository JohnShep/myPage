/*
 
 File:  http://weblab.cs.uml.edu/~jshepple/a8.js
 Created by JT Shepple on 11/15/15. john_shepple@student.uml.edu
 Student at UMass Lowell Taking course 91.461: GUI Programming I
 Copyright (c) 2014 JT Shepple. All rights reserved.
 This is JT's Personal Website used mainly for displaying GUI assignments.
 Last updated by JT on 11/15
 Last updated by JT on 11/16
 Last updated by JT on 11/17
 Last updated by JT on 11/18
 */

/* This function calculates the multiplication table. */
function build_table() {
    
    var row_s = Number(document.getElementById('row_s').value);
    var row_e = Number(document.getElementById('row_e').value);
    var col_s = Number(document.getElementById('col_s').value);
    var col_e = Number(document.getElementById('col_e').value);
    
    //emptying div (past warning messages)
    $("#warn_msg").empty();
    
    //swap row values
    if(row_s > row_e) {
        var temp2 = row_e;
        row_e = row_s;
        row_s = temp2;
        
        $("#warn_msg").append("<p>Swapped the row numbers.</p>");
    }
    
    
    //swap column values
    if(col_s > col_e) {
        var temp1 = col_e;
        col_e = col_s;
        col_s = temp1;
        
        $("#warn_msg").append("<p>Swapped the column numbers.</p>");
    }
    
    
    
    var calc = [];
    //Absolute value to not do negitive columns
    for (var x = 0; x <= Math.abs((col_e - col_s)); x++) {   // x < Ending length
        calc[x] = [];
    }
    
    // Indexes for the 2D array.
    var hor = 0;
    var vert = 0;
    
    /* Used a 2D array from this post:
     https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
     
     row beg     row ending   */
    for (var x = row_s; x <= row_e; x++) {
        /*           col beg     col ending    */
        for (var y = col_s; y <= col_e; y++) {
            calc[hor][vert] = x * y;    // Calculate the given spot in the multiplication table.
            console.log("x: ", x, "y: ", y);
            hor++;                      // Horizontal counter increments each time.
        }
        hor = 0;
        vert++;
    }
    
    
    var content = "";
    
    // Opening table tags.
    content += "<table class='wholetable' >";
    
    // Start by putting the empty spot in the top left corner.
    content += "<tr class='dyn_tr_td'><td></td>";
    
    // Now fill out the rest of the first row.
    for (var x = col_s; x <= col_e; x++) {
        content += "<td class='first_row'>" + x + "</td>";
    }
    
    // Close the first row.
    content += "</tr>";
    
    var hor = 0;          // Indexes for the 2D array.
    var vert = 0;
    
    // Fill in each row after the first.
    for (var x = row_s; x <= row_e; x++) {
        content += "<tr> <td class='first_column'>" + x + "</td>";
        
        
        for (var y = col_s; y <= col_e; y++) {
            content += "<td>" + calc[hor][vert] + "</td>";
            hor++;
        }
        hor = 0;
        vert++;
        
        // Close each row.
        content += "</tr>";
    }
    
    // Ending table tags.
    content += "</table>";
    
    // load into the HTML page.
    $("#table").html(content);
    
    return false;
}





function validate() {
    
    $("#mult_form").validate({
                             
                             rules: {
                             row_s: {
                             number: true,
                             range:[-15,15],
                             required: true
                             },
                             row_e: {
                             number: true,
                             range:[-15,15],
                             required: true
                             },
                             col_s: {
                             number: true,
                             range:[-15,15],
                             required: true
                             },
                             col_e: {
                             number: true,
                             range:[-15,15],
                             required: true
                             }
                             
                             
                             },
                             
                             messages: {
                             row_s: {
                             number: " &nbsp; Row begin: enter a number from -15 to 15.",
                             range: " &nbsp; Row begin: enter a number from -15 to 15.",
                             required: " &nbsp; Row begin: enter a number from -15 to 15."
                             },
                             row_e: {
                             number: " &nbsp; Row end: enter a number from -15 to 15.",
                             range: " &nbsp; Row end: enter a number from -15 to 15.",
                             required: " &nbsp; Row end: enter a number from -15 to 15."
                             },
                             col_s: {
                             number: " &nbsp; Column begin: enter a number from -15 to 15.",
                             range: " &nbsp; Column begin: enter a number from -15 to 15.",
                             required: " &nbsp; Column begin: enter a number from -15 to 15."
                             },
                             col_e: {
                             number: " &nbsp; Column end: enter a number from -15 to 15.",
                             range: " &nbsp; Column end: enter a number from -15 to 15.",
                             required: " &nbsp; Column end: enter a number from -15 to 15."
                             }
                             
                             },
                             
                             submitHandler: function() {
                             build_table();
                             }
                             
    });
    
}


function slider()
{
    // Row Begin Slider
    $("#slider_R_B").slider({
          min: -15,
          max: 15,
          slide: function(event, ui) {
          $("#row_s").val(ui.value);
                            
          submit();
          }
    });
    $("#row_s").on("keydown", function() {
        $("#slider_R_B").slider("value", this.value);
        
        submit();
    });
    
    // Row End Slider
    $("#slider_R_E").slider({
        min: -15,
        max: 15,
        slide: function(event, ui) {
        $("#row_e").val(ui.value);
                            
        submit();
    }
    });
    $("#row_e").on("keydown", function() {
        $("#slider_R_E").slider("value", this.value);
        
        submit();
    });
    
    // Column Begin Slider
    $("#slider_C_B").slider({
        min: -15,
        max: 15,
        slide: function(event, ui) {
        $("#col_s").val(ui.value);
        
        submit();
        }
    });
    $("#col_s").on("keydown", function() {
        $("#slider_C_B").slider("value", this.value);
        
        submit();
    });
    
    // Column End Slider
    $("#slider_C_E").slider({
        min: -15,
        max: 15,
        slide: function(event, ui) {
        $("#col_e").val(ui.value);
        
        submit();
        }
    });
    $("#col_e").on("keydown", function() {
        $("#slider_C_E").slider("value", this.value);
                   
        submit();
    });

}

var tabIndex = 1;

function save_tab() {
    // I struggled with the tab section so I got some help from Jason
    var tabCount = $("#tabs li").length + 1;
    
    if(tabCount > 10) {
        alert("Sorry, only 10 multiplication tables allowed at a time.");
        return false;
    }
    
    // Initialize the jQuery UI tabs.
    $( "#tabs" ).tabs();
    
    tabIndex++;
    
    var row_s = Number(document.getElementById('row_s').value);
    var row_e = Number(document.getElementById('row_e').value);
    var col_s = Number(document.getElementById('col_s').value);
    var col_e = Number(document.getElementById('col_e').value);
    
    // Create the title bar, add to .append()
    var title = "<li class='tab'><a href='#tab-" + tabIndex + "'>(" + row_s +
    " to " + row_e + ") x (" + col_s + " to " + col_e + ")</a>" +
    "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";
    
    $("div#tabs ul").append(title);
    
    // Add the table, refresh the tabs div and set active.
    $("div#tabs").append('<div id="tab-' + tabIndex + '">' + $("#table").html() + '</div>');
    $("#tabs").tabs("refresh");
    $("#tabs").tabs("option", "active", -1);
    
    $("#tabs").delegate("span.ui-icon-close", "click", function() {
          var panelID = $(this).closest("li").remove().attr("aria-controls");
          $("#" + panelID).remove();
                          
          // Refresh tabs
          try {
                $("#tabs").tabs("refresh");
          } catch (e) { }
          
          // Destroy tab
          if( $('div#tabs ul li.tab').length == 0) {
          try {
                $("#tabs").tabs("destroy");
          } catch (e) { }
          
          return false;
          }
          });
}

//Refreshes table when the form is valid
function submit() {
    if( $("form#mult_form").valid() == true ) {
        
        $("form#mult_form").submit();
        
    }
}
