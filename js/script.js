let characters, aToM, nToZ;

$(document).ready(function () {


  $.ajax({
    type: "GET",
    url: "data.json",
    data: { get_param: "value" },
    dataType: "json",
    complete: function (data) {
      characters = data;
    },
  });

  $(document).ajaxComplete(function () {
    characters = $.parseJSON(characters.responseText);



    function getSortOrder() {
      return function (a, b) {
        if (a.CharacterName > b.CharacterName) {
          return 1;
        } else if (a.CharacterName < b.CharacterName) {
          return -1;
        }
        return 0;
      };
    }

    characters.sort(getSortOrder());
    addDataToTableBody(characters);

    aToM = characters.filter((item) => /^[a-m]/i.test(item["CharacterName"]));
    nToZ = characters.filter((item) => /^[n-z]/i.test(item["CharacterName"]));
    $("#sortAM").text(`Filter A-M (${Object.keys(aToM).length})`);
    $("#sortNZ").text(`N-Z (${Object.keys(nToZ).length})`);
  });
});


function addDataToTableBody(data) {
  let rows = "";
  $.each(data, function (key, value) {
    rows += `<tr>  
                    <td>${value.name}</td>  
                    <td>${value.characterName}</td>  
                    <td>${value.firstReleased}</td> 
                    <td>${value.friend}</td> 
                    <td>${value.abilities}</td>                
                    <td>${value.looks}</td>  

                </tr>`;
  });

  $("#tableBody").empty().append(rows);
}

$("#search").on("keyup", function () {
  const value = $(this).val().toLowerCase();
  if (value) {
    console.log("Value", value);
    $("#tableBody tr").filter(function () {
      const $thisTr = $(this)[0];

      if ($thisTr.firstElementChild.textContent.toLowerCase().indexOf(value) > -1) {
        console.log($thisTr.firstElementChild.textContent);
        $($thisTr).addClass("searchMatched");
      } else {
        $($thisTr).removeClass("searchMatched");
      }
    });
  } else {
    $("#tableBody tr").removeClass("searchMatched");
  }
});

$("button").on("click", function () {
  let id = $(this).attr("id");
  if (id == "sortAM") {
    addDataToTableBody(aToM)
  } else if (id == "sortNZ") {
    addDataToTableBody(nToZ)
  } else if (id == "all") {
    addDataToTableBody(characters);
  }
});