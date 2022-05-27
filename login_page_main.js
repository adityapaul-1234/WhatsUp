var firebaseConfig = {
    apiKey: "AIzaSyC8UTeCp2gI8gYPWOoaJIZg8krnqWTCPWE",
    authDomain: "what-s-sup.firebaseapp.com",
    databaseURL: "https://what-s-sup-default-rtdb.firebaseio.com",
    projectId: "what-s-sup",
    storageBucket: "what-s-sup.appspot.com",
    messagingSenderId: "775966961781",
    appId: "1:775966961781:web:c289d493cb82d366a4c83c"
  };
firebase.initializeApp(firebaseConfig);

setInterval(function(){
    height = screen.height;
    cal = (80/100)*height; 
    final = Math.round(cal);
    document.getElementById("Main").style.height = final + "px";    
}, 100);

function AddNewRoom(){
    username = document.getElementById("Username").value;
    roomname = document.getElementById("Roomname").value;
    password = document.getElementById("Password").value;
    console.log(username, roomname, password);

    if (username == ""){
      alert("Please enter a user name");
    }else if (roomname == ""){
        alert("Please enter a room name");
    } else if (password.length < 6){
        alert("Password must at least be 6 characters");
    } else{
    firebase.database().ref("/").child(roomname).update({
        Purpose: "Adding Room Name",
        Password: password,
  });
  localStorage.setItem("Room_Name", roomname);
  localStorage.setItem("user_name", username);
  localStorage.setItem("Password", password);
  setInterval(function(){
    window.location = "chat_page.html" 
}, 5000); 
}  
}

demo = true;
state = "none";
status1 = "something";


function ExistingRoom(){
    state="true";
    username = document.getElementById("Username").value;
    roomname = document.getElementById("Roomname").value;
    password = document.getElementById("Password").value;

    if (username == ""){
      alert("Please enter a user name");
    } else if (roomname == ""){
        alert("Please enter a room name");
    } else if (password.length < 6){
        alert("Password must at least be 6 characters");
    } else{
    firebase.database().ref("/"+roomname).on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            childKey  = childSnapshot.key; childData = childSnapshot.val();
            if(childKey != "Purpose"){
            firebase_message_id = childKey;
            message_data = childData;

            firebase.database().ref("/"+roomname).on('value', function(snapshot){
              child_key = snapshot.key; child_data = snapshot.val();
              
            }); 
            correct_password = child_data["Password"];
            console.log("correct_password");
            
            if (state == "true"){
                if (password == correct_password){
                    localStorage.setItem("Room_Name", roomname);
                    localStorage.setItem("user_name", username);
                    localStorage.setItem("Password", password);
                    window.location = "chat_page.html";
                } else if (password != correct_password){
                    alert("Invalid username or password");
                    state = "false";
                }          
            } 
} });  });
} }