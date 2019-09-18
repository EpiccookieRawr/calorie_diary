const dataCtrl = (function(){
    const getSearchResult = function() {
        return fetch('/includes/test.php')
        .then(res => res.json())
        .then(data => data).catch(error => error);
    }

    return {
        getSearchResult
    }
})();

const appCtrl = (function(dataCtrl){
    let typingTimer;
    const doneTypingInterval = 2000;

    const init = function() {
        loadEventListener();
        console.log('App is initialized...');
    }

    function loadEventListener() {
        document.querySelector('#new-item').addEventListener('keyup', e => {
            clearTimeout(typingTimer);
            console.log('test');
            if(e.target.value) typingTimer = setTimeout(function() {
                dataCtrl.getSearchResult().then( data =>
                    console.log(data)
                ).catch( error => 
                    console.log(error)
                )
            }, doneTypingInterval);
        });
    }

    return {
        init
    }
})(dataCtrl);

appCtrl.init();