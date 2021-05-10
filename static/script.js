var infoMonth = document.querySelector('.infoMonth');
var infoDay = document.querySelector('.infoDay');
var selFormArr = Array.from(Array(1), () => Array(2).fill(null));
var daySel = $('.selected').length + 1;

const day = document.querySelectorAll('td');
day.forEach((items)=>{

    items.addEventListener('click', (e)=>{
        
        // 선택한 날짜의 개수를 담는 변수
        daySel = $('.selected').length + 1;

        // 선택한 날짜가 몇달인지 찾는 변수
        selMonth = $(items).parents('tr').parents('tbody').children('tr').first().text().trim();

        if(Number(items.innerHTML)){
            if(daySel > 1 && !items.classList.contains('selected')){
                day.forEach((inItem)=>{
                    inItem.classList.remove('selected');
                });
                items.classList.toggle('selected');
                selFormArr[0][0] = selMonth;
                selFormArr[0][1] = items.innerHTML;
                infoDay.innerHTML = items.innerHTML;
                infoMonth.innerHTML = selMonth;
            }else{
                if(items.classList.contains('selected')){               
                }else{
                    selFormArr[0][0] = selMonth;
                    selFormArr[0][1] = items.innerHTML;
                    infoDay.innerHTML = items.innerHTML;
                    infoMonth.innerHTML = selMonth;
                }
                items.classList.toggle('selected');
            }
        }else{
            // alert("Not a day");
            infoDay.innerHTML = 0;
            infoMonth.innerHTML = 0;
            day.forEach((inItem)=>{
                inItem.classList.remove('selected');
            });
        }
        e.stopPropagation();

        dateDay = items.innerHTML ;
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/viewSeat",
            data: {'dateDay': dateDay}, // 서버로 데이터 전송시 옵션
            dataType: "json", // 서버측에서 전송한 데이터를 어떤 형식의 데이터로서 해석할 것인가를 지정, 없으면 알아서 판단
            success: function(response){ // 통신 성공시 - 동적으로 좋아요 갯수 변경, 유저 목록 변경
                $('.remain-num').html(response.resSeat);
            },
            error: function(request, status, error){},
        });
        
    });
});

const purchase = document.querySelector('.purchase-box');
purchase.addEventListener('click', ()=>{
    reqDay =  $('.infoDay').html();
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/checkSeat",
        data: {'reqDay': reqDay, 'conCheck': "purchase"},
        dataType: "json",
        success: function(response){
            $('.remain-num').html(response.resSeat);
        },
        error: function(request, status, error){},
    });
});

const cancel = document.querySelector('.cancel-box');
cancel.addEventListener('click', ()=>{
    reqDay =  $('.infoDay').html();
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/checkSeat",
        data: {'reqDay': reqDay, 'conCheck': "cancel"},
        dataType: "json",
        success: function(response){
            $('.remain-num').html(response.resSeat);
        },
        error: function(request, status, error){},
    });
});