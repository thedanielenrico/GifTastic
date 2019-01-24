

var gifArray = ['dog', 'cat', 'rabbit', 'hawk'];
var $main = $("#main");

function displayGif() {
    var gifData = $(this).attr("data-name");
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + gifData + "&api_key=MMiAFfOYfGl8xNgfZoJtXEgClTp4bg5k&limit=10";
    console.log(queryUrl);
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        var $gifView = $("#gif-view");
        var gif = response.data;
        for (var i = 0; i < gif.length; i++){

            var imageUrl = gif[i].images.fixed_height_still.url;

            var gifImage = $("<img>");
            gifImage.attr("src", imageUrl);
            gifImage.attr("alt", "gif");
            $gifView.append(gifImage);

        }


    })


}

function renderButtons() {
    $main.empty();


    for (var i = 0; i < gifArray.length; i++) {
        var $button = $("<button>" + gifArray[i] + "</button>");
        $main.append($button);
        $button.addClass("gif");
        $button.attr("data-name", gifArray[i]);
    }

}


$("#add-gif").on("click", function (event) {

    event.preventDefault();

    var userSearch = $("#gif-input").val().trim();

    gifArray.push(userSearch);
    renderButtons();

})
renderButtons();
$(document).on("click", ".gif", displayGif);

// Create buttons on load
// create and get a value from those buttons to use in api url
// run an api key and append to DOM
// Make search field 
// Take search term and make button with value