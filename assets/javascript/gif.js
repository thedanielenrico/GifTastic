

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
        for (var i = 0; i < gif.length; i++) {

            var imageUrlDynamic = gif[i].images.fixed_height.url;
            var imageUrlStatic = gif[i].images.fixed_height_still.url;
            var $gifImage = $("<img>");
            var $imageDiv = $("<div>");
            var rating = $(`<p>Rating: ${gif[i].rating}</p>`);


            $gifImage.attr("src", imageUrlStatic);
            $gifImage.attr("alt", "gif");
            $gifImage.attr("alt", "gif");
            $gifImage.attr("style", "padding: 30px");

            $gifImage.addClass("gifImage");
            $gifImage.attr("data-state", "still");
            $gifImage.attr("data-still", imageUrlStatic);
            $gifImage.attr("data-dynamic", imageUrlDynamic);
            $imageDiv.append($gifImage);
            $gifView.prepend($gifImage);
            $imageDiv.prepend(rating);
            
            
            
        }
                $(".gifImage").on("click", function () {
                    var state = $(this).attr("data-state");
                    console.log(state);
                    if (state === 'still') {
                        $(this).attr('src', $(this).attr('data-dynamic'));
                        $(this).attr('data-state', 'dynamic');
                    } else {
                        $(this).attr('src', $(this).attr('data-still'));
                        $(this).attr('data-state', 'still');
                    }
    
                })


    })


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

})
renderButtons();
$(document).on("click", ".gif", displayGif);



// $(".$gifImage").on("click", function () {
//     var state = $(this).attr("data-state");
//     console.log(state);
//     if (state === 'still') {
//         $(this).attr('src', $(this).attr('data-animate'));
//         $(this).attr('data-state', 'animate');
//     } else {
//         $(this).attr('src', $(this).attr('data-still'));
//         $(this).attr('data-state', 'still');
//     }

// })

// Create buttons on load
// create and get a value from those buttons to use in api url
// run an api key and append to DOM
// Make search field 
// Take search term and make button with value
// Images are static onload
// If an image is clicked it becomes dynamic
// If an image is dynamic and is then clicked it becomes static again