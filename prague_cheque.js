var moduleNames = [
    "level-0-module-0",
    "level-0-module-1",
    "level-0-module-2",
    "level-0-module-3",
    "level-0-module-4",
    "level-0-module-5",
    "level1-module0",
    "level1-module1",
    "level1-module2",
    "level1-module3",
    "level1-module4",
    "level2-module0",
    "level2-module1",
    "league-invaders",
    "league-leve2-game",
    "level3-module0",
    "level3-module1",
    "level3-module2",
    "level3-module3",
    "level4-module0",
    "level4-module1",
    "level4-module2",
    "level4-module3",
    "level5-00-lambdas-and-streams",
    "level5-01-file-io",
    "level5-02-threads",
    "level5-03-sockets",
    "level5-04-bitwise-operations",
];

window.onload = function(){
    window.addEventListener("keydown", function(event){
        if(event.key == "Enter"){
            submit();
        }
    });
}

function submit(){
    let userName = document.getElementById("gitUserId").value;
    if(userName.length > 0){
        getLatestRepoInLevel(userName);
    }
}

function getLatestRepoInLevel(user){
    let searchURL = "https://api.github.com/search/repositories?q=" + user;
    let req = new XMLHttpRequest();
    req.open("GET", searchURL);
    req.send();
    req.onreadystatechange = function(){
        if(req.readyState === XMLHttpRequest.DONE) {
            let status = req.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let v = JSON.parse(req.responseText);
                let level = 0;
                let mod = 0;
                let currentModule = "";
                for(let i = 0; i < moduleNames.length; i++){
                    for(let j = 0; j < v.items.length; j++){
                        if(v.items[j].name.includes(moduleNames[i])){
                            currentModule = moduleNames[i];
                            break;
                        }
                    }
                }

                if(currentModule == ""){
                    alert("No League code was found for " + user + ". Please check the user name and try again.");
                    return;
                }

                console.log(currentModule);
                level = currentModule[5];
                if(level == '-'){
                    level = currentModule[6];
                }else if(level == 'e'){
                    level = 2;
                }
                level = parseInt(level);
                console.log(level);

                switch(level){
                    case 0:
                    case 1:
                    case 3:
                    case 4:{
                        mod = parseInt(currentModule[currentModule.length - 1]);
                        break;
                    }
                    case 2:{
                        if(currentModule == 'league-invaders'){
                            mod = 2;
                        }else if(currentModule == 'league-level2-game'){
                            mod = 3;
                        }else{
                            mod = parseInt(currentModule[currentModule.length - 1]);
                        }
                        break;
                    }
                    case 5:{
                        mod = parseInt(currentModule[8]);
                    }
                }

                displayInfo(user, level, mod);

            }else{
                console.log("Error making request");
            }
        }
    }
}

function displayInfo(user, level, module){
    let totalModules = 0;
    let moduleLink = "";
    let codeLink = ""; 
    switch(level){
        case 0:{
            moduleLink = "https://central.jointheleague.org/levels/Level0/Teachers_L0.html";
            codeLink = "https://github.com/league-level0-student/level-0-module-" + module + "-" + user;
            totalModules = 6;
            break;
        }
        case 1:{
            moduleLink = "https://central.jointheleague.org/levels/Level1/Level1%20Teachers.html";
            codeLink = "https://github.com/league-level1-student/" + "level1-module" + module + "-" + user;
            totalModules = 5;
            break;
        }
        case 2:{
            moduleLink = "https://central.jointheleague.org/levels/Level2/Level2%20Teachers.html";
            codeLink = "https://github.com/league-level2-student/" + "level2-module" + module + "-" + user;
            totalModules = 3;
            break;
        }
        case 3:{
            moduleLink = "https://central.jointheleague.org/levels/Level3/Level3%20Teachers.html";
            codeLink = "https://github.com/league-level3-student/" + "level3-module" + module + "-" + user;
            totalModules = 4;
            break;
        }
        case 4:{
            moduleLink = "https://central.jointheleague.org/levels/Level4/Level4%20Teachers.html";
            codeLink = "https://github.com/league-level4-student/" + "level4-module" + module + "-" + user;
            totalModules = 5;
            break;
        }
        case 5:{
            moduleLink = "https://central.jointheleague.org/levels/Level5/Teachers_L5.html";
            switch(module){
                case 0:{
                    codeLink = "https://github.com/league-level5-student/" + "level5-00-lambdas-and-streams-" + user;
                    break;
                }
                case 1:{
                    codeLink = "https://github.com/league-level5-student/" + "level5-01-file-io-" + user;
                    break;
                }
                case 2:{
                    codeLink = "https://github.com/league-level5-student/" + "level5-02-threads-" + user;
                    break;
                }
                case 3:{
                    codeLink = "https://github.com/league-level5-student/" + "level5-03-sockets-" + user;
                    break;
                }
                case 4:{
                    codeLink = "https://github.com/league-level5-student/" + "level5-04-bitwise-operations-" + user;
                    break;
                }
            }

            totalModules = 5;
            break;
        }
    }   

    document.body.innerHTML = "<center><h1>" + user + " is in level " + level + " and is currently working on Module " + module + " of " + (totalModules - 1) + "</h1></center><br>";
    document.body.innerHTML += "<center><h2><a href="+moduleLink+" target='_blank'>Click here to see the topics covered in this module</a></h2></center><br>";
    let canvas = document.createElement("canvas");
    let g = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.4;
    g.fillStyle = "#fa591a";
    let fontSize = canvas.height * 0.075;
    g.font = fontSize + "px Arial";

    for(let i = 0; i < totalModules; i++){
        let x = i * (canvas.width / totalModules);
        let y = canvas.height * 0.25;
        let w = (canvas.width / totalModules);
        let h = canvas.height * 0.25
        g.fillStyle = "#fa591a";
        if(i < module){
            g.fillRect(x, y, w, h);
        }else if(i == module){
            g.fillRect(x, y, w * 0.5,h);
        }
        g.fillStyle = "#000000";
        g.strokeRect(x, y, w, h);
        g.fillText("" + i, x + (w * 0.5), y + (h * 0.5));
    }

    for(let i = 0; i < 9; i++){
        let x = i * (canvas.width / 9);
        let y = canvas.height * 0.75
        let w = (canvas.width / 9);
        let h = canvas.height * 0.25;
        g.fillStyle = "#fa591a";
        if(i < level){
            g.fillRect(x, y, w, h);
        }else if(i == level){
            g.fillRect(x, y, w * 0.5, h);
        }
        g.fillStyle = "#000000";
        g.strokeRect(x, y, w, h);
        g.fillText("" + i, x + (w * 0.5), y + (h * 0.5));
    }
    
    
    g.strokeRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);
    g.fillStyle = "#000000";
    g.fillText("Current Level Progress:", 0, canvas.height * 0.2);
    g.fillText("Total Curriculum Progress:", 0, canvas.height * 0.7);
    document.body.appendChild(canvas);

    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    h2.innerHTML = "<center><a href="+codeLink+" target='_blank'>Click here to view the latest code submissions</a></center>";
    h3.innerHTML = "<center>If you have any questions, comments, or concerns please feel free to contact us at <a href=\"mailto:info@jointheleague.org\">info@jointheleague.org</a></center>";
    document.body.appendChild(h2);
    document.body.appendChild(h3);
}
    