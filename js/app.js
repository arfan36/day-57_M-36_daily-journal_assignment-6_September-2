

// ------------------------------------------ load categories
const loadCategory = async () => {
    try {
        let url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
};
console.log();
const displayCategories = (categories) => {
    const newsCategory = document.getElementById('news-category');
    categories.forEach(category => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="mb-5">
            <button onclick="categoryDetails(${category.category_id})" class="btn">${category.category_name}</button>
        </div>
        `;
        newsCategory.appendChild(div);

    });
};
loadCategory();

// loader or spinner
const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');

    }
};


// --------------------------------------- load category details container
const categoryDetails = async (categoryId) => {

    // start spinner
    toggleLoader(true);

    try {
        let url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }
};


const displayCategoryDetails = (sameCategories) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';


    // number of news item in categories
    const newsQuantitySection = document.getElementById('news-number');
    newsQuantitySection.textContent = '';
    newsQuantitySection.innerHTML = `
        <div class="text-center fs-3 bg-secondary text-white">
            ${sameCategories.length ? sameCategories.length + ' items found' : 'No News Found'} 
        </div>
    `;

    sameCategories.sort((a, b) => b.total_view - a.total_view);

    sameCategories.forEach(category => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick="itemDetails('${category._id}')" class="card mb-3" style="max-width: auto;" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                  <img src="${category.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${category.title}</h5>
                        <p class="card-text">${category.details.length > 200 ? category.details.slice(0, 200) + '...' : category.details}</p>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex justify-content-center align-items-center">
                                    <img src="${category.author.img}" class="rounded-circle" style="width: 50px">
                                </div>
                                <div class="ms-2">
                                    <p>${category.author.name ? category.author.name : 'No data found'}</p>
                                    <p>${category.author.published_date}</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <p><i class="fa-regular fa-eye"></i></p>
                                <p class="ms-1">${category.total_view ? category.total_view : 'No data found'}</p>
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(div);
    });

    // stop spinner
    toggleLoader(false);

};

// ---------------------------------------------------- item details
const itemDetails = async (newsId) => {
    let url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayItemDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
};
const displayItemDetails = (itemDetail) => {
    const modalDetail = document.getElementById('news-details');
    modalDetail.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `    

    <div class="card mb-3" style="max-width: auto;">
                <div class="row g-0">
                    <div class="col-md-12">
                        <img src="${itemDetail.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-12">
                        <div class="card-body">
                            <h5 class="card-title">${itemDetail.title}</h5>
                            <p class="card-text">${itemDetail.details.length > 200 ? itemDetail.details.slice(0, 200) + '...' : itemDetail.details}</p>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <img src="${itemDetail.author.img}" class="rounded-circle" style="width: 50px">
                                    </div>
                                    <div class="ms-2">
                                        <p>${itemDetail.author.name ? itemDetail.author.name : 'no data found'}</p>
                                        <p>${itemDetail.author.published_date}</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <p><i class="fa-regular fa-eye"></i></p>
                                    <p class="ms-1">${itemDetail.total_view ? itemDetail.total_view : 'No data found'}</p>
                                </div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
     `;
    modalDetail.appendChild(div);

};