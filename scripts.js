document.addEventListener("DOMContentLoaded", appStart)
//FUNKCJA STARTOWA....................................
function appStart()
{   
    let repeat_ping_ajax;
    const ping_button = document.querySelector(".ping_button");
    const stop_button = document.querySelector(".stop_button");
    const insert_address = document.querySelector(".insert_address");
    const ping_window = document.querySelector(".ping_window_div"); 
    ping_button.addEventListener("click", run_interval, false); //wydarzenie butona PING
    stop_button.addEventListener("click", stop_function, false);//wydarzenie butona STOP
    
    insert_address.addEventListener("keyup", function(event) //funkcja pozwalajaca wcisnac button Enterem
    {
        if (event.keyCode === 13)
        {
            event.preventDefault();
            ping_button.click();
        }
    });
    //FUNKCJE..............................................
    function run_interval()     //funkcja wykonujaca ping
    {   
        repeat_scroll = setInterval(updateScroll,500);
        ping_button.disabled = true; //zmiana buttona ping na wylaczony
        ping_window.innerHTML=(""); //kasowanie zawartosci okna
        loop_index = 1;     
        let address_value = insert_address.value;    //przypisywanie wartosci wpisanego adresu
        repeat_ping_ajax = setInterval(function()       //interwal do pingu 
        {   
            $.ajax({
                type: "POST",
                url: "http://localhost/index.php",
                data:
                {   
                p_address: address_value,           
                },
                success: function (data) 
                {   
                    console.log("start ajax.");
                    const ping_result=(data);
                    const object_ping_result = JSON.parse(ping_result); 
                    //zamiana odpowiedzi z serwera w obiekt
                    if (loop_index === 1)                                
                    {   
                        for (let i = 0, len = 6; i < len; i++)          //wyswietlenie poczatkowych 5 wierszy ping
                        {
                            ping_window.innerHTML+=(object_ping_result[i]+"</br>");
                        }
                        loop_index ++;
                    }else if (loop_index > 1)                           //wyswietlenie kolejnych 4 wierszy ping
                    {
                        for (let i = 2, len = 6; i < len; i++)
                        {
                            ping_window.innerHTML+=(object_ping_result[i]+"</br>");
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
    }
    function updateScroll()             //funkcja autoscrollowania
    {
        ping_window.scrollTop = ping_window.scrollHeight;
    }
    function stop_repeat_scroll()       //funkcja anulujaca autoscrollowanie
    {
        clearInterval(repeat_scroll);
    }
    //..................................................... 
}//....................................................

