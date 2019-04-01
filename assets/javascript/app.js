
///////////////////////////
///Global Variables Here///
///////////////////////////
//Array of topics
var topics = ["confused lady", "one does not simply", "hold my beer", "this is fine", "john travolta"];
//Ok, limit 12 because I really hate how it looks only to display 10 in a 4-column grid
var limit = 10;
var tempSearch;

/////////////////////
///Functions Here///
////////////////////
//We need to display the information from "topics" in form of buttons
$(document).ready(function () {


    function displayButtons() {
        $(".gifButtons").empty();

        //We loop through the array of topics
        for (var i = 0; i < topics.length; i++) {
            //Create the label, its class, attributes, and text displayed
            var button = $("<button>");
            button.addClass("btn btn-info btn-sm m-1 gif-btn");
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            //Add to the gif buttons section
            $(".gifButtons").append(button);
        }
        //End of for cycle to display buttons
    } //end of function displayButtons


    //Now we work with the Giphy API with AJAX
    function displayGifs() {
        $(".gifResults").empty();
        var gifSearch = $(this).attr("data-name");
        if (tempSearch == gifSearch){
            limit= limit + 10;
            if(limit > 40){
                limit=40;
                alert("Sorry, only 40 gif max");
            }
        }else{
            limit=10;
        }
        var apikey = "RSokeaFMOHNyO8gDOJYOaM2y3N9TOy7i";
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
                    var gifDiv = $("<div>");
                    var t = $("<h6>");
                    var p = $("<p>");
                    var imGif = $("<img>")
                    ///download button
                    var dButton = $("<img>");
                    var a = $("<a>")
                    //Add classes to labels
                    gifDiv.addClass("gifDiv card bg-transparent");
                    p.addClass("gifRating");
                    imGif.addClass("gif");
                    t.addClass("gifTitle");
                    a.addClass("card-header bg-transparent");
                    //Add multiple attributes to the img label to animate the gifs later
                    imGif.attr({
                        "src": results[j].images.fixed_height_still.url,
                        "gif-still": results[j].images.fixed_height_still.url,
                        "gif-animate": results[j].images.fixed_height.url,
                        "gif-state": "still"
                    });

                    //download button attributes
                    a.attr({
                        "download": results[j].title,
                        "href": results[j].images.fixed_height.url,
                        "target": "_blank"
                    });
                    dButton.attr("src", "assets/images/down3.png");
                    dButton.css("width", "20px");
                    a.append(dButton);
                    //////////////////

                    //Title for the gif
                    t.text(results[j].title);
                    //Rating for the gif
                    p.text("Rating: " + (results[j].rating).toUpperCase());
                    //Append the static gif and rating
                    gifDiv.append(a);
                    gifDiv.append(imGif);
                    gifDiv.append(t);
                    gifDiv.append(p);
                    //Show static gif on gifResults div
                    $(".gifResults").prepend(gifDiv);
                    //$(".gifResults").append(gifDiv);
                } //End for cycle
            })//End then
            $(".goBack").show();
        tempSearch = gifSearch;
    }//End function displayGifs


    //So, let's animate the static gifs.... or make static the animated gifs
    function animateGifs() {
        //Get value of the state (animate, still)
        var state = $(this).attr("gif-state");

        //If state is still changes the img source to gif-animate and the attribute to animate
        if (state === "still") {
            $(this).attr("src", $(this).attr("gif-animate"));
            $(this).attr("gif-state", "animate");
        } else {
            //if the state is animate changes the source to gif-still and changes the attribute state to still
            $(this).attr("src", $(this).attr("gif-still"));
            $(this).attr("gif-state", "still");
        }//End if/else
    }//End function animateGifs


    ///////////////////////////////////////////////
    /// Function Event Listeners, do not disturb///
    //////////////////////////////////////////////
    //To add new topic buttons. Related to display buttons
    $(".submiTopic").on("click", function (event) {
        event.preventDefault();

        var newTopic = $("#addTopic").val().trim();
        newTopic = newTopic.toLowerCase();
        //To avoid repeated buttons
        if (topics.includes(newTopic) || newTopic =="") {
            displayButtons();
        } else {
            topics.push(newTopic);
            console.log(topics);
            displayButtons();
        }
        //Clear form
        $("form").trigger("reset");
    });


    //Click event listener for all .gif-btn
    $(document).on("click", ".gif-btn", displayGifs);


    //To animate gifs
    $(document).on("click", ".gif", animateGifs);

    //Clear gifs
    $(".clearResults").click(function () {
        event.preventDefault();
        $(".gifResults").empty();
        $(".goBack").hide();
    });

    displayButtons();
    $(".goBack").hide();


});
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
.card for contain the image and text
.gifRating for the Rating text
.gif for the gif

----------------------------------------*/