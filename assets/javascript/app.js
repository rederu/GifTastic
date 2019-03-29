
///////////////////////////
///Global Variables Here///
///////////////////////////
//Array of topics
var topics = ["final fantasy", "nier automata", "tales of symphonia", "god of war"];



/////////////////////
///Functions Here///
////////////////////
//We need to display the information from "topics" in form of buttons
function displayButtons() {
    $(".gifButtons").empty();

    //We loop through the array of topics
    for (var i = 0; i < topics.length; i++) {
        //Create the label, its class, attributes, and text displayed
        var button = $("<button>");
        button.addClass("gif-btn");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        //Add to the gif buttons section
        $(".gifButtons").append(button);
    }
    //End of for cycle to display buttons
} //end of function displayButtons


//Now we work with the Giphy API with AJAX
function displayGifs() {
    var gifSearch = $(this).attr("data-name");
    var apikey = "RSokeaFMOHNyO8gDOJYOaM2y3N9TOy7i";
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=" + apikey + "&limit=" + limit;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(response);
            for (var j = 0; j < results.length; j++) {
                //Here goes what will happen with the results
                //1. Grab 10 static, non-animated gifs and place them on the page
                var gifDiv = $("<div>");
                var p = $("<p>");
                var imGif = $("<img>")
                //Add classes to labels
                gifDiv.addClass("gifDiv");
                p.addClass("gifRating");
                imGif.addClass("gif");
                //Add multiple attributes to the img label to animate the gifs later
                imGif.attr({
                    "src": results[j].images.fixed_height_still.url,
                    "gif-still": results[j].images.fixed_height_still.url,
                    "gif-animate": results[j].images.fixed_height.url,
                    "gif-state": "still"
                });
                //Rating for the gif
                p.text("Rating: " + results[j].rating);
                //Append the static gif and rating
                gifDiv.append(imGif);
                gifDiv.append(p);
                //Show static gif on gifResults div
                $(".gifResults").prepend(gifDiv);
            } //End for cycle
        })//End then
}//End function displayGifs


//So, let's animate the static gifs.... or make static the animated gifs
function animateGifs() {
    //Get value of the state
    var state = $(this).attr("gif-state");
    //If state is still changes the img source to gif-animate and the attribute to animate
    if (state === "still") {
        $(this).attr("src", $(this).attr("gif-animate"));
        $(this).attr("gif-state", "animate");
    } else {
        //if the state is animate changes the source to gif-still and changes the attribute state to still
        $(this).attr("src", $(this).attr("gif-still"));
        $(this).attr("gif-state", "still");
    }
}





///////////////////////////////////////////////
/// Function Event Listeners, do not disturb///
//////////////////////////////////////////////
//To add new topic buttons. Related to display buttons
$(".submiTopic").on("click", function (event) {
    event.preventDefault();

    var newTopic = $("#addTopic").val().trim();
    newTopic = newTopic.toLowerCase();
    //To avoid repeated buttons
    if (topics.includes(newTopic)) {
        displayButtons();
    } else {
        topics.push(newTopic);
        console.log(topics);
        displayButtons();
    }
});


//Click event listener for all .gif-btn
$(document).on("click", ".gif-btn", displayGifs);


//To animate gifs
$(document).on("click", ".gif", animateGifs);

//Clear gifs
$(".clearResults").click(function(){
    event.preventDefault();
    $(".gifResults").empty();
});

displayButtons();

/*--------------------------------------
HTML Classes: 
.gifButtons
.searchGif
.gifResults
#addtopic
.submiTopic

Javascript/jQuery generated classes:
.gif-btn (For each gif button)
.gifDiv for the div containing the gif and the rating
.gifRating for the Rating text
.gif for the gif

----------------------------------------*/