const dataCtrl = (function(){
    const getSearchResult = function(keyword) {
        return fetch('/includes/api.php?search=' + keyword)
        .then(res => res.json())
        .then(data => data).catch(error => error);
    }

    const getProductResult = function(productID) {
        return fetch('/includes/api.php?productID=' + productID)
        .then(res => res.json())
        .then(data => data).catch(error => error);
    }

    return {
        getSearchResult,
        getProductResult
    }
})();

const productDetailCtrl = (function(){
    const foodData = {
    };

    const uldisplay = function(foodData) {
        return '<div class="product-info">'+
            '<div class="general-info row">'+
                '<div class="col-6">'+
                    '<div class="col-12 product-image">'+
                        '<img src="'+foodData.image+'" width="300px" height="300px">'+
                    '</div>'+
                '</div>'+
                '<div class="col-6">'+
                    '<div class="row">'+
                        '<div class="col-12">'+
                            '<div class="display-field">'+
                                '<h2>Product Name:</h2>'+
                                '<p>'+foodData.foodName+'</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-12">'+
                            '<div class="display-field">'+
                                '<h2>Product Brand:</h2>'+
                                '<p>'+foodData.brandName+'</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-12">'+
                            '<div class="display-field">'+
                                '<h2>Calories:</h2>'+
                                '<p>'+foodData.calories+' kcal</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-12">'+
                            '<div class="display-field">'+
                                '<h2>Serving:</h2>'+
                                '<p>'+foodData.servingQty+' '+foodData.servingUnit+' ('+foodData.servingWeightGrams+' grams)</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-12">'+
                            '<div class="display-field">'+
                                '<h2>Updated at:</h2>'+
                                '<p>2019-04-27T07:27:56+00:00</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="graphical-info">'+
                '<div class="row">'+
                    '<div class="col-6">'+
                        '<div class="ingredient-label">'+
                            '<h3>Nutrition Facts</h3>'+
                            '<p>Serving Size: '+foodData.servingQty+' '+foodData.servingUnit+'</p>'+
                            '<div class="label-underline"></div>'+
                            '<p>Amount Per Serving</p>'+
                            '<div class="ingredient-specs">'+
                                '<ul class="calories-spec">'+
                                    '<li>'+
                                        '<p>Calories</p>'+
                                        '<p>'+foodData.calories+' kcal</p>'+
                                    '</li>'+
                                '</ul>'+
                                '<div class="spec-underline"></div>'+
                                '<p>% Daily Value*</p>'+
                                '<ul class="macro-list">'+
                                    '<li>'+
                                        '<p>Total Fat <span>'+foodData.microNutrients.totalFat+' g</span></p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li class="detail-spec">'+
                                        '<p>Saturated Fat <span>'+foodData.microNutrients.saturatedFat+' g</span></p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li class="detail-spec">'+
                                        '<p>Trans Fat <span>'+foodData.microNutrients.saturatedFat+' g</span></p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Cholesterol <span>'+foodData.microNutrients.cholesterol+' mg</span></p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Sodium <span>'+foodData.microNutrients.sodium+' mg</span></p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Total Carbonhydrates <span>'+foodData.microNutrients.totalCarbohydrate+' g</span></p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li class="detail-spec">'+
                                        '<p>Dietary Fiber <span>'+foodData.microNutrients.dietaryFiber+' g</span></p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li class="detail-spec">'+
                                        '<p>Sugar <span>'+foodData.microNutrients.sugars+' g</span></p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Protein <span>'+foodData.microNutrients.protein+' g</span></p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                '</ul>'+
                                '<div class="micro-underline"></div>'+
                                '<ul class="micro-list">'+
                                    '<li>'+
                                        '<p>Vitamin D 0mcg</p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Calcium 0mg</p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Iron 0mg</p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Potassium 0mg</p>'+
                                        '<p>0%</p>'+
                                    '</li>'+
                                '</ul>'+
                                '<div class="desc-underline"></div>'+
                                '<div class="extra-info">'+
                                    '<p>* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2000 calories a day is used for general nutrition advice.</p>'+
                                    '<p><span>INGREDIENTS:</span> '+foodData.ingredientStatement+'</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-6">'+
                        '<div class="ingredient-chart">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    }
    // '<canvas id="macro-chart" width="400" height="400"></canvas>'
    return {
        foodData,
        uldisplay
    }
})();

const uICtrl = (function(){
    const uISelector = {
        'newItem' : '#new-item',
        'searchResults' : '.search-results',
        'resultsItems' : '.results-items',
        'resultDetails' : '.result-details',
        'rightColumn' : '.right-column'
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
                    li.className = "item-list";
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

const appCtrl = (function(dataCtrl, uICtrl, productDetailCtrl){
    let typingTimer;
    const doneTypingInterval = 500;
    const uISelector = uICtrl.uISelector;

    const init = function() {
        loadEventListener();
        console.log('App is initialized...');
    }

    function loadEventListener() {
        document.querySelector(uISelector.newItem).addEventListener('keyup', searchKeyword);
        document.querySelector(uISelector.resultDetails).addEventListener('click', eventsSearch);
        document.querySelector(uISelector.resultDetails).addEventListener('click', getProductInfo);
    }

    function eventsSearch(e) {
        if(e.target.classList.contains('page')) changePage(e);
        if(e.target.classList.contains('item-list')) getProductInfo(e);
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
            }).catch( error => console.log(error));
        }, doneTypingInterval);
    }

    function getProductInfo(e) {
        let itemID = '';
        let findFoodID = [];
        if(e.target.parentElement.id !== '') {
            findFoodID = e.target.parentElement.id.match(/^item-id-([\w\d]*)$/);
            if(findFoodID.length > 0) { 
                itemID = findFoodID[1];
                dataCtrl.getProductResult(itemID).then(data => {
                    if(data.status === 'success') {
                        if(data.response.hasOwnProperty('foods')) {
                            const foodDetail = data.response.foods[0];
                            console.log(foodDetail);
                            productDetailCtrl.foodData = {
                                'brandName' : foodDetail.brand_name,
                                'foodName' : foodDetail.food_name,
                                'image' : foodDetail.photo.thumb,
                                'servingQty' : foodDetail.serving_qty,
                                'servingUnit' : foodDetail.serving_unit,
                                'calories' : foodDetail.nf_calories,
                                'servingWeightGrams' : foodDetail.serving_weight_grams,
                                'microNutrients' : {
                                    'cholesterol' : foodDetail.nf_cholesterol,
                                    'dietaryFiber' : foodDetail.nf_dietary_fiber,
                                    'potassium' : foodDetail.nf_potassium,
                                    'protein': foodDetail.nf_protein,
                                    'saturatedFat': foodDetail.nf_saturated_fat,
                                    'sodium': foodDetail.nf_sodium,
                                    'sugars': foodDetail.nf_sugars,
                                    'totalCarbohydrate': foodDetail.nf_total_carbohydrate,
                                    'totalFat': foodDetail.nf_total_fat
                                },
                                'ingredientStatement' : foodDetail.nf_ingredient_statement
                            }
                            console.log(productDetailCtrl.foodData);
                            document.querySelector(uISelector.rightColumn).innerHTML = productDetailCtrl.uldisplay(productDetailCtrl.foodData);
                        }
                    }
                }).catch( error => console.log(error));
            };
        }
    }

    return {
        init
    }
})(dataCtrl, uICtrl, productDetailCtrl);

appCtrl.init();