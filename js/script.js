// Assignment 9
// Javascript 2 SEM 3
// Parth Patel 0817381

$(function () {
  let charactersData;

  var compare = {
    name: function (a, b) {
      a = a.replace(/^the /i, '');
      b = b.replace(/^the /i, '');

      if (a < b) {
        return -1;
      } else {
        return a > b ? 1 : 0;
      }
    },
    date: function (a, b) {
      a = new Date(a);
      b = new Date(b);

      return a - b;
    }
  };

  $.ajax({
    url: 'data.json',
    dataType: 'json',
    success: function (data) {
      charactersData = data;
      populateTable(charactersData);

      var amLength = 0;
      var nzLength = 0;
      charactersData.forEach(function (character, index) {
        const lastName = character.lastName.charAt(0).toLowerCase();

        if (lastName >= 'a' && lastName <= 'm') {
          amLength++;
          $(`#amLength`).text(amLength);
        }

        if (lastName >= 'n' && lastName <= 'z') {
          nzLength++;
          $(`#nzLength`).text(nzLength);
        }
      });

      $('#search').on('input', function () {
        searchCharacters($(this).val());
      });

      $('.btn-filter').on('click', function () {
        filterCharacters($(this).data('filter'));
      });

      $('#char-table').each(function () {
        var $table = $(this);
        var $tbody = $table.find('tbody');
        var $controls = $table.find('th > a');
        var rowsDefault = $tbody.find('tr').toArray();
        var rows = $tbody.find('tr').toArray();

        $controls.on('click', function (e) {
          e.preventDefault();

          var $header = $(this);
          var order = $header.data('sort');
          var column;

          if ($header.is('.descending')) {
            $header.removeClass('ascending descending');

            $tbody.append(rowsDefault);
          } else if ($header.is('.ascending') || $header.is('.descending')) {
            $header.toggleClass('ascending descending');

            $tbody.append(rows.reverse());

          } else {
            $header.addClass('ascending');
            $header.parent().siblings().find('a').removeClass('ascending descending');

            if (compare.hasOwnProperty(order)) {
              column = $controls.index(this);
              rows.sort(function (a, b) {
                a = $(a).find('td').eq(column).text();
                b = $(b).find('td').eq(column).text();
                console.log('a: ', a, '   b: ', b)
                return compare[order](a, b);


              });
              $tbody.append(rows);
            }
          }
        })
      })

    }
  });

  function populateTable(characters) {
    var tbody = $('#char-table tbody');
    tbody.empty();

    characters.forEach(function (character) {
      var row = $('<tr>');
      row.append('<td>' + character.givenName + '</td>');
      row.append('<td>' + character.lastName + '</td>');
      row.append('<td>' + character.charactersName + '</td>');
      row.append('<td>' + character.originalName + '</td>');
      row.append('<td>' + character.characterGender + '</td>');
      row.append('<td>' + character.charType + '</td>');
      row.append('<td>' + character.charDob + '</td>');
      tbody.append(row);
    });
  }

  function searchCharacters(searchTerm) {
    resetStyles();

    if (!searchTerm.length) {
      resetStyles();
      return;
    }

    charactersData.forEach(function (character, index) {
      const givenName = character.givenName.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      if (givenName.includes(searchTermLower)) {
        highlightRow(index);
      }
    });
  }

  function highlightRow(index) {
    $(`#char-table tbody tr:eq(${index})`).addClass('highlight');
  }

  function resetStyles() {
    $('#char-table tbody tr').removeClass('highlight');
  }

  function filterCharacters(filter) {
    if (filter.length) {
      $(`#char-table tbody tr`).hide();
    }

    charactersData.forEach(function (character, index) {
      const lastName = character.lastName.charAt(0).toLowerCase();
      const filterRange = filter.toLowerCase();

      if (filterRange === 'a-m' && lastName >= 'a' && lastName <= 'm') {
        $(`#char-table tbody tr:eq(${index})`).show();
      }

      if (filterRange === 'n-z' && lastName >= 'n' && lastName <= 'z') {
        $(`#char-table tbody tr:eq(${index})`).show();
      }
    });
  }
});