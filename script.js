/*
    Assignment 05
*/

$(document).ready(function () {

    // Define the ContentItem class
class ContentItem {
    constructor(id, name, description, categoryGenre) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.categoryGenre = categoryGenre;
    }

    updateContentItem(id, name, description, categoryGenre) {
        if (this.id === id) {
            if (name !== null) this.name = name;
            if (description !== null) this.description = description;
            if (categoryGenre !== null) this.categoryGenre = categoryGenre;
        }
    }

    toString() {
        return `<div class="content-item-wrapper" id="content-item-${this.id}">
                    <h2>${this.name}</h2>
                    <p>${this.description}</p>
                    <div>${this.categoryGenre}</div>
                </div>`;
    }
}

// array of 5 items
let contentItems = [
    new ContentItem(0, 'Name1', 'Description1', 'Category1'),
    new ContentItem(1, 'Name2', 'Description2', 'Category2'),
    new ContentItem(2, 'Name3', 'Description3', 'Category3'),
    new ContentItem(3, 'Name4', 'Description4', 'Category4'),
    new ContentItem(4, 'Name5', 'Description5', 'Category5')
];

// Use jQuery to add each content item to the page

    contentItems.forEach(function(item) {
        $('#content-item-list').append(item.toString());
    });

    // CSS
    $('.content-item-wrapper').css({
        'border': '2px solid black',
        'width': '250px',
        'padding': '12px',
        'margin': '0 auto 10px auto'
    });
});