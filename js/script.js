var aToM, nToZ;
var characters;

$(document).ready(function() {
  //AJAX call to get the data from a JSON file
  $.ajax({
    type: "GET",
    url: "character.json",
    data: { get_param: "value" },
    dataType: "json",
    success: function(data) {
      characters = data; //Store the retrieved data in a variable
      initializeTable();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown); //Log any errors that occur
    }
  });

  //Function to initialize the table
  function initializeTable() {
    addDataToTableBody(characters);

    //Add click event listener to table headings to sort the table
    $("thead a").click(function(event) {
      event.preventDefault();
      var columnName = $(this).data("column");
      var sortOrder = $(this).hasClass("asc") ? "desc" : "asc";
      sortTable(columnName, sortOrder);
    });

    //Filter the characters by name and display the number of results by filter
    aToM = characters.filter(item => /^[a-m]/i.test(item.CharacterName));
    nToZ = characters.filter(item => /^[n-z]/i.test(item.CharacterName));
    $("#filterAM").text(`Filter A-M (${aToM.length})`);
    $("#filterNZ").text(`Filter N-Z (${nToZ.length})`);
  }

  //Function to add data to the table body
  function addDataToTableBody(data) {
    var rows = "";
    $.each(data, function(key, value) {
      rows += `<tr>
                  <td>${value.first_name}</td>
                  <td>${value.last_name}</td>
                  <td>${value.gender}</td>
                  <td>${value.house}</td>
                  <td>${value.status}</td>
                  <td>${value.date}</td>
               </tr>`;
    });
    $("#tableBody").empty().append(rows);
  }

  //Function to sort the table by column name and sort order
  function sortTable(columnName, sortOrder) {
    var sortOrderMultiplier = sortOrder == "asc" ? 1 : -1;
    characters.sort(function(a, b) {
      var valueA = a[columnName].toLowerCase();
      var valueB = b[columnName].toLowerCase();
      if ($.isNumeric(valueA) && $.isNumeric(valueB)) {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }
      if (valueA < valueB) {
        return -1 * sortOrderMultiplier;
      } else if (valueA > valueB) {
        return 1 * sortOrderMultiplier;
      } else {
        return 0;
      }
    });
    addDataToTableBody(characters);
    $("thead a").removeClass("asc desc");
    $("thead a[data-column='" + columnName + "']").addClass(sortOrder);
  }

  //Event listener for search bar
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    if (value) {
      //Filter table rows by search
      $("#tableBody tr").filter(function() {
        var $thisTr = $(this)[0];
        if ($thisTr.firstElementChild.textContent.toLowerCase().indexOf(value) > -1) {
          $($thisTr).addClass("searchMatched");
        } else {
          $($thisTr).removeClass("searchMatched");
        }
      });
    } else {
      //Remove search filtering if search input is empty
      $("#tableBody tr").removeClass("searchMatched");
    }
  });

  //Event listener for filter buttons
  $("button").on("click", function() {
    var id = $(this).attr("id");
    if (id == "filterAM") {
      //Filter table rows by A-M characters
      addDataToTableBody(aToM);
    } else if (id == "filterNZ") {
      //Filter table rows by N-Z characters
      addDataToTableBody(nToZ);
    } else if (id == "all") {
      //Display all table rows
      addDataToTableBody(characters);
    }
  });
});