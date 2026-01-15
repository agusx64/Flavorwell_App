import CONFIG from "./config.js";
document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem('token');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    // Variables para sistema de scrolleo
    let offset = 0, limit = 10, loading = false, allRecipes = [];
    let lang = localStorage.getItem('preferred_lang');
    let viewRecipeText;

    switch (lang) {

        case 'es':
            viewRecipeText = "Ver Receta"
            break;

        case 'en':
            viewRecipeText = "View Recipe"
            break;

    }

    const userImgCover = document.getElementById('public-profile-viewer-img-cover');
    const userImgProfile = document.getElementById('public-profile-viewer-img-user');
    const userName = document.getElementById('public-profile-viewer-username');
    const userEmail = document.getElementById('public-profile-viewer-email');
    const userIncomeDate = document.getElementById('public-profile-viewer-income-date');
    const userUploadedRecipes = document.getElementById('public-profile-viewer-uploaded-recipes');
    const userSavedRecipes = document.getElementById('public-profile-viewer-saved-recipes');
    const headerTextName = document.querySelector('.header_text');

    function truncateString(text, maxLength) {

        if (text.length <= maxLength) {

            return text;

        }

        return text.slice(0, maxLength) + "...";

    }

    if (!id) {

        console.error('Missing ID in URL.');
        return;

    }

    try {

        await fetch(CONFIG.API_BASE_URL + '/users/get_user_by_id', {

            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: id })

        })
        .then(async response => {

            const data = await response.json();

            if (!response.ok) {

                console.error(data);
                return;

            }

            return data;

        })
        .then(data => {

            if (data.success){

                // Funacion para la carga de recetas
                async function loadRecipes() {
                
                    if (loading) return;
                    loading = true;
                
                    try {
                    
                        if (!allRecipes.length) {
                        
                            const res = await fetch(CONFIG.API_BASE_URL + '/users/api/user_posts', {
                            
                                method: 'POST',
                                headers: { 
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ id: id })
                            
                            });
                        
                            allRecipes = await res.json();
                        
                        }
                    
                        const slice = allRecipes.slice(offset, offset + limit);
                        offset += limit;
                        slice.forEach(renderRecipeCard);
                    
                    } catch (error) {
                    
                        console.error(error);
                    
                    } finally {
                    
                        loading = false;

                    }
                
                }

                window.addEventListener('scroll', () => {
                
                    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 ) {
                    
                        loadRecipes();
                    
                    }
                
                });

                loadRecipes();

                const categoryIcons = {
                
                    vegan: { icon: 'bi bi-leaf-fill', color: 'var(--Celadon)' },
                    breakfast: { icon: 'bi bi-cup-hot-fill', color: 'var(--Xhantous)' },
                    strong_dish: { icon: 'bi bi-fork-knife', color: 'var(--DarkBlue)' },
                    desserts: { icon: 'bi bi-cake-fill', color: 'var(--CandyPink)' }
                
                };

                function renderRecipeCard(recipe) {
                
                    const container = document.querySelector('.public-profile-viewer-recipes-container');
                    const { icon, color } = categoryIcons[recipe.category] || {};
                    const card = document.createElement('div');
                
                    card.classList.add('card-post-container');
                    card.innerHTML = `
                        <img src="${recipe.image_url}" alt="${recipe.name}" class="card-post-img">
                        <h3 class="card-post-title">${recipe.name}</h3>
                        <p class="card-post-description">${recipe.description}</p>
                        <div class="card-post-status">
                            <div class="card-post-buttons-interaction">
                                <div class="card-post-like-status">
                                    <i class="bi bi-hand-thumbs-up-fill"></i>
                                    <span class="card-post-like-number">${recipe.likeCount}</span>
                                </div>
                                <div class="card-post-dish-category" style="background-color:${color}">
                                    <i class="${icon}"></i>
                                </div>
                            </div>
                            <div class="card-post-buttons-interaction">
                                <button class="action-buttons like-btn ${recipe.liked ? 'liked' : ''}" data-id="${recipe.id}" data-category="${recipe.category}">
                                    <i class="bi ${recipe.liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}"></i>
                                </button>
                                <button class="action-buttons save-btn ${recipe.saved ? 'saved' : ''}" data-id="${recipe.id}" data-category="${recipe.category}">
                                    <i class="bi ${recipe.saved ? 'bi-bookmark-fill' : 'bi-bookmark'}"></i>
                                </button>
                            </div>
                        </div>
                        <button class="card-post-main-button" data-id="${recipe.id}" data-category="${recipe.category}">
                            ${viewRecipeText} <i class="bi bi-fork-knife"></i>
                        </button>
                    `;
                    container.appendChild(card);
                
                }

                document.addEventListener('click', async (e) => {
                
                    const btnLike = e.target.closest('.like-btn');
                    const btnSave = e.target.closest('.save-btn');
                    const btnView = e.target.closest('.card-post-main-button');
                
                    if (btnLike) {
                    
                        const id = btnLike.dataset.id, cat = btnLike.dataset.category;
                        const res = await fetch (CONFIG.API_BASE_URL + '/users/api/toggle_like', {
                        
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json',
                                'Authorization':`Bearer ${token}`
                            },
                            body: JSON.stringify({ recipeId: id, category: cat })
                        
                        });
                    
                        const resp = await res.json();
                    
                        if (resp.success) {
                        
                            const icon = btnLike.querySelector('i');
                            icon.classList.toggle('bi-hand-thumbs-up-fill', resp.liked);
                            icon.classList.toggle('bi-hand-thumbs-up', !resp.liked);
                        
                            const countSpan = btnLike.closest('.card-post-container').querySelector('.card-post-like-number');
                            let currentLikes = parseInt(countSpan.textContent);
                            countSpan.textContent = resp.liked ? currentLikes + 1 : currentLikes - 1;
                        
                        }
                    
                    }
                
                    if (btnSave) {
                    
                        const id = btnSave.dataset.id, cat = btnSave.dataset.category;
                        const res = await fetch(CONFIG.API_BASE_URL + '/users/api/toggle_save', {
                        
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json',
                                'Authorization':`Bearer ${token}`
                            },
                            body: JSON.stringify({ recipeId: id, category:cat })
                        
                        });
                    
                        const resp = await res.json();
                        if (resp.success) {
                        
                            const icon = btnSave.querySelector('i');
                            icon.classList.toggle('bi-bookmark-fill', resp.saved);
                            icon.classList.toggle('bi-bookmark', !resp.saved);
                        
                        }
                    
                    }
                
                    if (btnView) {
                    
                        const id = btnView.dataset.id, cat = btnView.dataset.category;
                        window.location.href = `/html/recipe_viewer.html?id=${id}&table=${cat}`;
                    
                    }
                
                });

            }

            userImgCover.src = data.user.img_cover_path
                ? userImgCover.src = data.user.img_cover_path
                : userImgCover.src = '/images/_img_recipe/default.jpg';
            
            userImgProfile.src = data.user.img_profile_path
                ? userImgProfile.src = data.user.img_profile_path
                : userImgProfile.src = '/images/_UI_img/default.jpg';

            userName.textContent = truncateString(data.user.username, 10);
            userEmail.textContent = data.user.email;
            userIncomeDate.textContent = new Date(data.user.created_at).toLocaleDateString();
            userUploadedRecipes.textContent = data.total_recipes;
            userSavedRecipes.textContent = data.total_saved;

            switch (lang) {

                case 'es':
                    headerTextName.textContent = `Recetas de ${truncateString(data.user.username, 8)}`;
                    break;
                    
                case 'en':
                    headerTextName.textContent = `${truncateString(data.user.username, 8)}'s recipes`;
                    break;

            }

        })
        .catch(error => {

            console.error(error);

        })

    } catch (err) {

        console.error(err);

    }

});