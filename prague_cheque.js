function submit(){

    let userName = document.getElementById("gitUserId").value;
    if(userName.length > 0){
        let levels = document.getElementsByName("level");
        for(let i = 0; i < levels.length; i++){
            if(levels[i].checked){
                getLatestRepoInLevel(userName, i);
                break;
            }
        }    
    }
}


function getLatestRepoInLevel(user, level){
    let request = new XMLHttpRequest();
    request.open("GET", "https://github.com/league-level1-student");
    request.send();
    request.onreadystatechange  = function(){
        console.log(request.responseText);
    }
}