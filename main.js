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

    const DVInfo = {
        'totalFat' : 65,
        'saturatedFat' : 20,
        'cholesterol' : 300,
        'sodium' : 2400,
        'totalCarbohydrate' : 300,
        'dietaryFiber' : 25,
        'vitaminA' : 1000,
        'vitaminC' : 60,
        'calcium' : 1100,
        'iron' : 14
    }

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
                                '<p>'+foodData.servingQty+' '+foodData.servingUnit + (foodData.servingWeightGrams === null ? '' : '('+foodData.servingWeightGrams+' grams)') + '</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-12">'+
                            '<div class="display-field">'+
                                '<h2>Updated at:</h2>'+
                                '<p>'+(foodData.updatedAt === undefined ? 'N/A' : foodData.updatedAt)+'</p>'+
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
                                        '<p>'+foodData.microNutrients.totalFat+'</p>'+
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
                            '<canvas id="macro-chart" width="400" height="400"></canvas>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    }
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
                    li.innerHTML = `<p>${currentBrand.food_name}</p><p>${currentBrand.brand_name}</p><p>${Math.ceil(currentBrand.nf_calories)} calories</p>`;
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
                                'calories' : Math.ceil(foodDetail.nf_calories),
                                'servingWeightGrams' : foodDetail.serving_weight_grams,
                                'microNutrients' : {
                                    'cholesterol' : Math.ceil(foodDetail.nf_cholesterol),
                                    'dietaryFiber' : (foodDetail.nf_dietary_fiber === null ? 0 : foodDetail.nf_dietary_fiber.toFixed(1)),
                                    'potassium' : Math.ceil(foodDetail.nf_potassium),
                                    'protein': (foodDetail.nf_protein === null ? 0 : foodDetail.nf_protein.toFixed(1)),
                                    'saturatedFat': (foodDetail.nf_saturated_fat === null ? 0 : foodDetail.nf_saturated_fat.toFixed(1)),
                                    'sodium': Math.ceil(foodDetail.nf_sodium),
                                    'sugars': (foodDetail.nf_sugars === null ? 0 : foodDetail.nf_sugars.toFixed(1)),
                                    'totalCarbohydrate': (foodDetail.nf_total_carbohydrate === null ? 0 : foodDetail.nf_total_carbohydrate.toFixed(1)),
                                    'totalFat': (foodDetail.nf_total_fat === null ? 0 : foodDetail.nf_total_fat.toFixed(1))
                                },
                                'ingredientStatement' : (foodDetail.nf_ingredient_statement === null ? 'none' : foodDetail.nf_ingredient_statement)
                            }
                            if(foodDetail.hasOwnProperty('updated_at')) {
                                const formattedDate = new Date(foodDetail.updated_at);
                                productDetailCtrl.foodData['updatedAt'] = formattedDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                            }
                            console.log(productDetailCtrl.foodData);
                            document.querySelector(uISelector.rightColumn).innerHTML = productDetailCtrl.uldisplay(productDetailCtrl.foodData);
                            const ctx = document.getElementById('macro-chart');
                            const graphData = {
                                datasets: [{
                                    data: [productDetailCtrl.foodData.microNutrients.totalCarbohydrate, productDetailCtrl.foodData.microNutrients.protein, productDetailCtrl.foodData.microNutrients.totalFat],
                                    backgroundColor: [
                                        '#E9A84E', '#E55541', '#B9D773'
                                    ]
                                }],
                                labels: [
                                    'Cabonhydrates',
                                    'Protein',
                                    'Fat'
                                ]
                            };
                            const myDoughnutChart = new Chart(ctx, {
                                type: 'doughnut',
                                data: graphData,
                                options: {}
                            });
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