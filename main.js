const dataCtrl = (function(){
    const getSearchResult = function(keyword) {
        return fetch('/includes/api.php?keyword=' + keyword)
        .then(res => res.json())
        .then(data => data).catch(error => error);
    }

    return {
        getSearchResult
    }
})();

const uICtrl = (function(){
    const uISelector = {
        'newItem' : '#new-item',
        'searchResults' : '.search-results',
        'resultsItems' : '.results-items',
        'resultDetails' : '.result-details',
    }

    const researchResult = function(data) {
        data = data || [];
        clearPagination();
        if(data.hasOwnProperty('branded') && data.branded.length > 0) {
            const resultDetails = document.querySelector(uISelector.resultDetails);
            const pagination = getPagination(data.branded);
            const brandDiv = document.createElement('div');
            const brandh3 = document.createElement('h3');
            const pageDiv = document.createElement('div');

            brandh3.textContent = 'Branded Products'; 
            brandDiv.appendChild(brandh3);
            pagination.forEach((page, pageIndex) => {
                const ul = document.createElement('ul');
                ul.className = 'results-items';
                ul.id = 'branded-page-' + pageIndex;
                if(pageIndex === 0) ul.classList.add('active');
                const span = document.createElement('span');
                span.textContent = pageIndex;
                pageDiv.appendChild(span);
                page.forEach(currentBrand => {
                    const li = document.createElement('li');
                    li.id = `item-id-${currentBrand.nix_item_id}`;
                    li.innerHTML = `<p>${currentBrand.food_name}</p><p>${currentBrand.brand_name}</p><p>${currentBrand.nf_calories} calories</p>`;
                    ul.appendChild(li);
                });
                brandDiv.appendChild(ul);
            });
            resultDetails.appendChild(pageDiv);
            resultDetails.appendChild(brandDiv);
        }
    }

    const clearPagination = function() {
        const resultDetails = document.querySelector(uISelector.resultDetails);
        while(resultDetails.firstElementChild) {
            resultDetails.firstElementChild.remove();
        }
    }

    const getPagination = function(lists) {
        lists = lists || [];
        const pagination = [];
        const maxLength = 6;
        if(lists.length > 0) {
           if(lists.length < maxLength) return [lists];
           let i = 0;
           while(i < lists.length) {
                pagination.push(lists.slice(i,i+maxLength));
                i += maxLength;
           }
        }
        return pagination;
    }

    return {
        uISelector,
        researchResult
    }
})();

const appCtrl = (function(dataCtrl, uICtrl){
    let typingTimer;
    const doneTypingInterval = 500;
    const uISelector = uICtrl.uISelector;

    const init = function() {
        loadEventListener();
        console.log('App is initialized...');
    }

    function loadEventListener() {
        document.querySelector(uISelector.newItem).addEventListener('keyup', searchKeyword);
    }

    function searchKeyword(e) {
        clearTimeout(typingTimer);
        if(e.target.value) typingTimer = setTimeout(function() {
            dataCtrl.getSearchResult(e.target.value).then( data => {
                if(data.status === 'success') {
                    uICtrl.researchResult(data.response);
                }
            }).catch( error => 
                console.log(error)
            )
        }, doneTypingInterval);
    }

    return {
        init
    }
})(dataCtrl, uICtrl);

appCtrl.init();