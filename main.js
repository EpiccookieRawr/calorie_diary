const cacheCtrl = (function(){
    const localStorageNames = {
        'recentSearch' : 'recentResults',
        'searchedResults' : 'searchResults',
    };

    const saveFoodResults = function(foodID, data){
        savelocalResultsHandler(localStorageNames.recentSearch, foodID, data);
    };

    const fetchFoodResults = function() {
        return fetchResultsHandler(localStorageNames.recentSearch);
    };

    const saveSearchResults = function(keyword, data) {
        savelocalResultsHandler(localStorageNames.searchedResults, keyword, data);
    };

    const fetchSearchResults = function() {
        return fetchResultsHandler(localStorageNames.searchedResults);
    };

    const savelocalResultsHandler = function(localStorageName, id, data) {
        let items = {};
        const lastEntryName = 'Last'+localStorageName;
        const lastEntry = localStorage.getItem(lastEntryName);

        if(localStorage.getItem(localStorageName) === null){
            items[id] = data;
            localStorage.setItem(localStorageName, JSON.stringify(items));    
        } else {
            items = JSON.parse(localStorage.getItem(localStorageName));
            const savedResultsKey = Object.keys(items);
            let i = 0;
            while(savedResultsKey[i] !== lastEntry) {
                i++;
            }
            if(savedResultsKey.length >= 8) {
                if(lastEntry !== null) {
                    delete items[savedResultsKey[i]];
                }
            }
            items[id] = data;
            localStorage.setItem(localStorageName, JSON.stringify(items));
        }
        localStorage.setItem(lastEntryName, id);
    }

    const fetchResultsHandler = function(localStorageName) {
        let items;
        if(localStorage.getItem(localStorageName) === null){
            items = {};
        } else {
            items = JSON.parse(localStorage.getItem(localStorageName));
        }
        return items;
    }

    return {
        saveFoodResults,
        fetchFoodResults,
        saveSearchResults,
        fetchSearchResults
    }
})();

const dataCtrl = (function(cacheCtrl){
    const getSearchResult = function(keyword) {
        const cachedSearchResult = cacheCtrl.fetchSearchResults();
        if(cachedSearchResult[keyword] !== undefined) {
            console.log('from cache');
            return new Promise((resolve,reject) => {
                resolve({
                    status : 'success',
                    response : cachedSearchResult[keyword]
                });
            });
        } else {
            return fetch('/includes/api.php?search=' + keyword)
            .then(res => res.json())
            .then(data => data).catch(error => error);
        }
    }

    const getProductResult = function(productID) {
        const cachedFoodResult = cacheCtrl.fetchFoodResults();
        if(cachedFoodResult[productID] !== undefined) {
            console.log('from cache');
            return new Promise((resolve,reject) => {
                resolve({
                    status : 'success',
                    response : cachedFoodResult[productID]
                });
            });
        } else {
            return fetch('/includes/api.php?productID=' + productID)
            .then(res => res.json())
            .then(data => data).catch(error => error);
        }
    }

    return {
        getSearchResult,
        getProductResult
    }
})(cacheCtrl);

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

    const calculateDv = function(foodData, name) {
        const percentage = foodData.microNutrients[name]/DVInfo[name] * 100;
        return Math.ceil(percentage);
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
                                '<p>'+foodData.servingQty+' '+foodData.servingUnit + (foodData.servingWeightGrams === null ? '' : ' ('+foodData.servingWeightGrams+' grams)') + '</p>'+
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
                                        '<p>'+calculateDv(foodData, 'totalFat')+'%</p>'+
                                    '</li>'+
                                    '<li class="detail-spec">'+
                                        '<p>Saturated Fat <span>'+foodData.microNutrients.saturatedFat+' g</span></p>'+
                                        '<p>'+ calculateDv(foodData, 'saturatedFat') +'%</p>'+
                                    '</li>'+
                                    '<li class="detail-spec">'+
                                        '<p>Trans Fat <span>'+foodData.microNutrients.saturatedFat+' g</span></p>'+
                                        '<p>'+ calculateDv(foodData, 'saturatedFat') +'%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Cholesterol <span>'+foodData.microNutrients.cholesterol+' mg</span></p>'+
                                        '<p>'+ calculateDv(foodData, 'cholesterol') +'%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Sodium <span>'+foodData.microNutrients.sodium+' mg</span></p>'+
                                        '<p>'+ calculateDv(foodData, 'sodium') +'%</p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Total Carbonhydrates <span>'+foodData.microNutrients.totalCarbohydrate+' g</span></p>'+
                                        '<p>'+ calculateDv(foodData, 'totalCarbohydrate') +'%</p>'+
                                    '</li>'+
                                    '<li class="detail-spec">'+
                                        '<p>Dietary Fiber <span>'+foodData.microNutrients.dietaryFiber+' g</span></p>'+
                                        '<p>'+ calculateDv(foodData, 'dietaryFiber') +'%</p>'+
                                    '</li>'+
                                    '<li class="detail-spec">'+
                                        '<p>Sugar <span>'+foodData.microNutrients.sugars+' g</span></p>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Protein <span>'+foodData.microNutrients.protein+' g</span></p>'+
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
                            '<h3>Macro Nutrients Chart</h3>'+
                            '<canvas id="macro-chart" width="400" height="400"></canvas>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    };

    const intializeChart = function(foodData) {
        const ctx = document.getElementById('macro-chart');
        const datasetsData = {
            data: [],
            backgroundColor: []
        };
        const graphLabels = [];
        if(foodData.microNutrients.totalCarbohydrate !== 0) { 
            datasetsData.data.push(foodData.microNutrients.totalCarbohydrate);
            datasetsData.backgroundColor.push('#E9A84E');
            graphLabels.push('Cabonhydrates');
        }
        if(foodData.microNutrients.protein !== 0) {
            datasetsData.data.push(foodData.microNutrients.protein);
            datasetsData.backgroundColor.push('#E55541');
            graphLabels.push('Protein');
        }
        if(foodData.microNutrients.totalFat !== 0) {
            datasetsData.data.push(foodData.microNutrients.totalFat);
            datasetsData.backgroundColor.push('#B9D773');
            graphLabels.push('Fat');
        }
        if(datasetsData.data.length > 0) {
            const graphData = {
                datasets: [datasetsData],
                labels: graphLabels
            };
            const myDoughnutChart = new Chart(ctx, {
                type: 'polarArea',
                data: graphData,
            });
        } else {
            const draw = ctx.getContext('2d');
            draw.textBaseline = 'middle';
            draw.textAlign = "center";
            draw.font = "20px Arial";
            draw.fillText("Macro Nutrient Graph is not available", 200, 200);
        }
    }
    return {
        foodData,
        uldisplay,
        intializeChart
    }
})();

const uICtrl = (function(cacheCtrl){
    const uISelector = {
        'newItem' : '#new-item',
        'searchResults' : '.search-results',
        'resultsItems' : '.results-items',
        'resultDetails' : '.result-details',
        'rightColumn' : '.right-column',
        'recentSelection' : '.recent-items'
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
            if(pagination.length > 1) brandDiv.appendChild(pageDiv);
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

    const showRecentSelections = function() {
        const recentItemDiv = document.querySelector('.recent-items');
        const recentSelections = cacheCtrl.fetchFoodResults();
        const recentSelectionsLength = Object.keys(recentSelections).length;
        clearRecentSelections();
        if(recentSelectionsLength > 0) {
            for(let selection in recentSelections) {
                const selectionList = document.createElement('li');
                selectionList.id = 'recent-id-' + selection;
                selectionList.innerText = recentSelections[selection].food_name;
                recentItemDiv.appendChild(selectionList);
            }
        } else {
            const selectionList = document.createElement('span');
            selectionList.innerText = 'No recent search available';
            recentItemDiv.appendChild(selectionList);
        }
    }

    function clearRecentSelections() {
        const recentItemDiv = document.querySelector('.recent-items');
        while(recentItemDiv.firstElementChild) {
            recentItemDiv.firstElementChild.remove();
        }
    }

    const loadingSpinner = function() {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('lds-dual-ring');
        loadingDiv.classList.add('overlay');
        return loadingDiv;
    }

    return {
        uISelector,
        researchResult,
        showPage,
        showRecentSelections,
        loadingSpinner
    }
})(cacheCtrl);

const appCtrl = (function(dataCtrl, uICtrl, productDetailCtrl, cacheCtrl){
    let typingTimer;
    const doneTypingInterval = 500;
    const uISelector = uICtrl.uISelector;

    const init = function() {
        uICtrl.showRecentSelections();
        loadEventListener();
        console.log('App is initialized...');
    }

    function loadEventListener() {
        document.querySelector(uISelector.newItem).addEventListener('keyup', searchKeyword);
        document.querySelector(uISelector.resultDetails).addEventListener('click', eventsSearch);
        document.querySelector(uISelector.resultDetails).addEventListener('click', getProductInfo);
        document.querySelector(uISelector.recentSelection).addEventListener('click', displayRecentSelection);
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
        if(document.querySelector(uISelector.searchResults + ' .lds-dual-ring') === null) {
            document.querySelector(uISelector.searchResults).appendChild(uICtrl.loadingSpinner());
        }
        if(e.target.value) typingTimer = setTimeout(function() {
            dataCtrl.getSearchResult(e.target.value).then( data => {
                if(data.status === 'success') {
                    cacheCtrl.saveSearchResults(e.target.value, data.response);
                    uICtrl.researchResult(data.response);
                }
                document.querySelector(uISelector.searchResults + ' .lds-dual-ring').remove();
            }).catch( error => console.log(error));
        }, doneTypingInterval);
    }

    function displayRecentSelection(e) {
        let itemID = '';
        if(e.target.tagName === 'LI') {
            const findFoodID = e.target.id.match(/^recent-id-([\w\d]*)$/);
            const recentSelections = cacheCtrl.fetchFoodResults();
            if(findFoodID.length > 0) {
                itemID = findFoodID[1];
                const foodDetail = recentSelections[itemID];
                productInfoHandler(foodDetail);
                document.querySelector(uISelector.rightColumn).innerHTML = productDetailCtrl.uldisplay(productDetailCtrl.foodData);
                productDetailCtrl.intializeChart(productDetailCtrl.foodData);
            }
        }
    }

    function getProductInfo(e) {
        let itemID = '';
        let findFoodID = [];
        if(e.target.parentElement.id !== '') {
            if(document.querySelector(uISelector.rightColumn + ' .lds-dual-ring') === null) {
                document.querySelector(uISelector.rightColumn).appendChild(uICtrl.loadingSpinner());
            }
            findFoodID = e.target.parentElement.id.match(/^item-id-([\w\d]*)$/);
            if(findFoodID.length > 0) { 
                itemID = findFoodID[1];
                dataCtrl.getProductResult(itemID).then(data => {
                    if(data.status === 'success') {
                        if(data.response.hasOwnProperty('foods')) {
                            const foodDetail = data.response.foods[0];
                            cacheCtrl.saveFoodResults(itemID, foodDetail);
                            productInfoHandler(foodDetail);
                            document.querySelector(uISelector.rightColumn).innerHTML = productDetailCtrl.uldisplay(productDetailCtrl.foodData);
                            productDetailCtrl.intializeChart(productDetailCtrl.foodData);
                            uICtrl.showRecentSelections();
                        }
                    }
                    document.querySelector(uISelector.rightColumn + ' .lds-dual-ring').remove();
                }).catch( error => console.log(error));
            };
        }
    }

    function productInfoHandler(foodDetail) {
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
        };
    }

    return {
        init
    }
})(dataCtrl, uICtrl, productDetailCtrl, cacheCtrl);

appCtrl.init();