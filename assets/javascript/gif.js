var gifArray = ['Seinfeld', 'Waynes World', 'SNL', 'Dr. Who', 'Nature', 'Cats', 'Dog', 'Elon Musk', 'Jeff Bezos', 'Math', 'Software'];
var $main = $("#main");

function displayGif() {
    var gifData = $(this).attr("data-name");
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + gifData + "&api_key=MMiAFfOYfGl8xNgfZoJtXEgClTp4bg5k&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        var $gifView = $("#gif-view");
        var gif = response.data;
        for (var i = 0; i < gif.length; i++) {

            var imageUrlDynamic = gif[i].images.fixed_height.url;
            var imageUrlStatic = gif[i].images.fixed_height_still.url;
            var $gifImage = $("<img>");
            var $imageDiv = $("<div>");
            var rating = $(`<p>Rating: ${gif[i].rating}</p>`);
            var title = $(`<p>Title: ${gif[i].title}</p>`);


            $gifImage.attr("src", imageUrlStatic);
            $gifImage.attr("alt", "gif");
            $gifImage.attr("alt", "gif");
            $gifImage.attr("style", "padding: 30px");
            $imageDiv.attr("style", "float: left");

            $gifImage.addClass("gifImage");
            $gifImage.attr("data-state", "still");
            $gifImage.attr("data-still", imageUrlStatic);
            $gifImage.attr("data-dynamic", imageUrlDynamic);
            $imageDiv.append($gifImage);
            $imageDiv.prepend(rating);
            $imageDiv.prepend(title);
            $gifView.prepend($imageDiv);
        }

        $(".gifImage").off("click", playGif);
        $(".gifImage").on("click", playGif);
    })
}

function playGif() {
    var state = $(this).attr("data-state");

    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-dynamic'));
        $(this).attr('data-state', 'dynamic');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
}

// Render buttons from array
function renderButtons() {
    $main.empty();


    for (var i = 0; i < gifArray.length; i++) {
        var $button = $("<button>" + gifArray[i] + "</button>");
        $main.append($button);
        $button.addClass("gif");
        $button.attr("data-name", gifArray[i]);
    }

}

// Add new gif buttons
$("#add-gif").on("click", function (event) {
    
    event.preventDefault();

    var userSearch = $("#gif-input").val().trim();

    gifArray.push(userSearch);
    renderButtons();
    $("#gif-input").val(" ")


})
renderButtons();
$(document).on("click", ".gif", displayGif);
