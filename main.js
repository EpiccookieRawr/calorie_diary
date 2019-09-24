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

            const h3 = document.createElement('h3');
            const resultsDiv = document.createElement('div');
            const pageDiv = document.createElement('div');

            brandDiv.className = 'branded-products-results';
            h3.textContent = 'Branded Products'; 
            resultsDiv.className = 'results';
            pageDiv.className = 'pagination';
            
            pagination.forEach((page, pageIndex) => {
                const ul = document.createElement('ul');
                ul.className = 'results-items page-content-' + pageIndex;
                const span = document.createElement('span');
                span.className = 'page page-' + pageIndex;
                span.textContent = pageIndex;
                if(pageIndex === 0) {
                    ul.classList.add('active');
                    span.classList.add('current');   
                }
                pageDiv.appendChild(span);
                page.forEach(currentBrand => {
                    const li = document.createElement('li');
                    li.id = `item-id-${currentBrand.nix_item_id}`;
                    li.innerHTML = `<p>${currentBrand.food_name}</p><p>${currentBrand.brand_name}</p><p>${currentBrand.nf_calories} calories</p>`;
                    ul.appendChild(li);
                });
                resultsDiv.appendChild(ul);
            });

            brandDiv.appendChild(h3);
            brandDiv.appendChild(pageDiv);
            brandDiv.appendChild(resultsDiv);
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

    const showPage = function(e) {
        const pageNumber = parseInt(e.target.textContent);
        const paginationDiv = e.target.parentElement;
        const contentDiv = e.target.parentElement.nextSibling;
        if(typeof pageNumber === 'number') {
            paginationDiv.querySelector('.current').classList.remove('current');
            paginationDiv.querySelector('.page-'+pageNumber).classList.add('current');
            contentDiv.querySelector('.active').classList.remove('active');
            contentDiv.querySelector('.page-content-'+pageNumber).classList.add('active');
        }
    }

    return {
        uISelector,
        researchResult,
        showPage
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
        document.querySelector(uISelector.resultDetails).addEventListener('click', changePage);
    }

    function changePage(e) {
        if(e.target.classList.contains('page')) uICtrl.showPage(e);
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