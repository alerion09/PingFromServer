document.addEventListener("DOMContentLoaded", appStart)
var repeat_ping_ajax;
//FUNKCJA STARTOWA....................................
function appStart()
{
    var ping_button = document.getElementById("ping_button");
    var stop_button = document.getElementById("stop_button"); 
    ping_button.addEventListener("click", run_interval, false); //wydarzenie butona PING
    stop_button.addEventListener("click", stop_function, false);//wydarzenie butona STOP
    
    document.getElementById("insert_address").addEventListener("keyup", function(event) //funkcja pozwalajaca wcisnac button Enterem
    {
        if (event.keyCode === 13)
        {
            event.preventDefault();
            document.getElementById("ping_button").click();
        }
    });
}//....................................................
//FUNKCJE..............................................
function run_interval()     //funkcja wykonujaca ping
{   
    repeat_scroll = setInterval(updateScroll,500);
    ping_button.disabled = true; //zmiana buttona ping na wylaczony
    document.getElementById("ping_window_div").innerHTML=(""); //kasowanie zawartosci okna
    loop_index = 1;     
    let address_value = document.getElementById("insert_address").value;    //przypisywanie wartosci wpisanego adresu
    repeat_ping_ajax = setInterval(function()       //interwal do pingu 
    {   
        console.log("Ping " + address_value);  
        $.ajax({
            type: "POST",
            url: "http://localhost/index.php",
            data:
            {   
            p_address: address_value,           
            },
            success: function (data) 
            {   
                console.log(data);
                var ping_result=(data);
                var object_ping_result = JSON.parse(ping_result); 
                console.log(object_ping_result);
                  //zamiana odpowiedzi z serwera w obiekt
                if (loop_index == 1)                                
                {   
                    for (var i = 0, len = 6; i < len; i++)          //wyswietlenie poczatkowych 5 wierszy ping
                    {
                        document.getElementById("ping_window_div").innerHTML+=(object_ping_result[i]+"</br>");
                    }
                    loop_index ++;
                }else if (loop_index > 1)                           //wyswietlenie kolejnych 4 wierszy ping
                {
                    for (var i = 2, len = 6; i < len; i++)
                    {
                        document.getElementById("ping_window_div").innerHTML+=(object_ping_result[i]+"</br>");
                    }
                }else
                console.log("Run php - Success ajax function");
            },
            complete: function () {
                console.log("Run php - Complete ajax function ");
            },
            error: function (xhr, thrownError) {
                console.log("Run php - ERROR");
                console.log(xhr.status);
                console.log(thrownError);}
        });
        }, 3000);
}
function stop_function()        //funkcja zatrzymania pingowania
{
    console.log('stop');
    clearInterval(repeat_ping_ajax);       //kasowanie interwalu
    setTimeout(stop_repeat_scroll,5000);    //wylacz autoscroll po 5 sekundach
    ping_button.disabled = false;    //wlaczanie buttona ping
    loop_index == -1;
}
function updateScroll()             //funkcja autoscrollowania
{
    var ping_window = document.getElementById("ping_window_div");
    ping_window.scrollTop = ping_window.scrollHeight;
}
function stop_repeat_scroll()       //funkcja anulujaca autoscrollowanie
{
    clearInterval(repeat_scroll);
}
//.....................................................
