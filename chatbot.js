$(document).ready(function() {
    const welcomeMessage = "🎮 Welcome to Quiz Odyssey🎉<br><br>" +
     "Ready to begin your quest for knowledge? Here's your adventure toolkit:<br><br>" +
    "🤔 Need help? Type 'help' for game mechanics<br>" +
    "🎁 Type 'chest' to learn about treasure chests<br>" +
    "📖 Type 'houses' to learn about the different houses<br>" +
    "🎯 Type 'status' to see your current progress<br><br>" +
    "You can interact with me by typing your messages below.<br>" +
    "Feel free to ask me questions🤔 - while my knowledge has limits,<br> " +
    "So don't worry because I'm here to guide you through your journey!<br><br>" +
    "What would you like to explore first?";
    
    $("#chatBox").append("<div class='message botResponse'>" + welcomeMessage + "</div>");

    $("#sendButton").click(sendMessage);
    $("#userInput").keypress(function(e) {
        if (e.which == 13) {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = $("#userInput").val().trim();
        if (!userMessage) return;

        $.ajax({
            url: "http://127.0.0.1:5000/get",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ msg: userMessage }),
            xhrFields: {
                withCredentials: true
            },
            success: function(response) {
                $("#chatBox").append("<div class='message userMessage'>" + userMessage.replace(/\n/g, "<br>") + "</div>");
                $("#chatBox").append("<div class='message botResponse'>" + response.response.replace(/\n/g, "<br>") + "</div>");
                $("#userInput").val("");
                $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
            },
            error: function(xhr, status, error) {
                $("#chatBox").append("<div class='message botResponse'>Sorry, there was an error. Please try again.</div>");
            }
        });
        
    }
});
