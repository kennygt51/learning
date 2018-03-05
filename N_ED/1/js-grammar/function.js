(function(){
    var myBirthTime = new Date(1991, 11, 20, 01, 25);

    function updateParagraph(){
        var now = new Date();
        var day = Math.floor(((now.getTime() - myBirthTime.getTime()) / 1000 / 60 / 24));
        document.getElementById('birth-time').innerText = '生まれてから' + day + '日経過。';
    }

    setInterval(updateParagraph, 50);
})();
