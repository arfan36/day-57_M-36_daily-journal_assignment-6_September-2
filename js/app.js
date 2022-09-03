const loadCategory = async () => {
    const categoryURL = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(categoryURL);
    const data = await res.json();
    displayCategories(data.data.news_category);
};
const displayCategories = (categories) => {
    const newsCategory = document.getElementById('news-category');
    categories.forEach(category => {
        // console.log(category.category_name);

        const div = document.createElement('div');
        div.innerHTML=`
        <button onclick="categoryDetails()" class="btn">${category.category_name}</button>
        `
        newsCategory.appendChild(div)
    });
};
loadCategory();