/* 日期 */
var currYear = (new Date()).getFullYear();
var opt = {
    preset: 'date'
};
opt.default = {
    width: 100,
    theme: 'mobiscroll',
    display: 'modal', //显示方式 
    mode: 'scroller', //日期选择模式
    dateFormat: 'y', // 日期格式
    lang: 'zh',
    showNow: true,
    nowText: "今天",
    stepMinute: 1,
    startYear: currYear - 70, //开始年份
    endYear: currYear + 0 //结束年份
};
var optDateTime = $.extend(opt['datetime'], opt['default']);
$("#StartTime").mobiscroll(optDateTime).datetime(optDateTime);
var requestDate = $("#StartTime").val();
if (requestDate != "") {
    requestDate = new Date(requestDate);
    $("#StartTime").scroller('setDate', requestDate, true);
}


var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    speed: 600,
});
/*  $('.answer-content-next,.answer-content').click(function () {
     var val=$('input[type="radio"]:checked').val();
    if (val==null) {
        alert('空')
        return false;
    }
    mySwiper.slideNext();
})  */
    $(".answer-content input[type='radio'],input[type='checkbox']").click(function () {
        $(this).css({"background-color":"yellow","color":"#fff"});
        var num =0  
        num = $(this).val();
        //$('.add').html(num)
        console.log(num)
    });
