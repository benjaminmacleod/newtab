function currentTime() {
            let date = new Date(); 
            let hh = date.getHours();
            let mm = date.getMinutes();
            let ss = date.getSeconds();
            let session = "";

            if(hh == 0){
                hh = 12;
            }
            
            if(hh > 12){
                hh = hh - 12;
                session = "˙";
            }

            mm = (mm < 10) ? "0" + mm : mm;
            
            let time = `<span class="session">${session}</span>${hh}:${mm}`;
            document.getElementById("clock").innerHTML = time;
            
            let t = setTimeout(function(){ currentTime() }, 1000);
        }
        
        currentTime();

// Run on page load
addDateToPage();
