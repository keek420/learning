
config = {
    url: "https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:", //api url
    parentId: "book-profile-card", //表示部のid
    searchBtnId: "search-btn", //検索ボタン
    searchInputId: "search-input" //検索バー
}

cardItems = [""]
//カードを新しい情報に更新する関数
function generateCard(data){
    
    let parent = document.getElementById(config.parentId)


    for (bookInfo in data){
    let profile_card = `
    
            
            <!-- タイトル、作者、値段の基本情報部 -->
            <div class="profile-row">

                <div id="profile-item">
                    <img src="${bookInfo.cover.medium}" class="card-img p-3" alt=""
                </div>

                <div id="profile-data">
                    <h2 id="title">${bookInfo.title}</h2>
                    <p id="author">${bookInfo.authors.name}</p>
                    <p id="price"></p>
                    <p id="description">${bookInfo.by_statement}</p>
                </div>
            </div>
            <!-- ページ数　-->
            <div class="profile-row">
                <div class="profile-item">
                    <h3>Page</h3>
                </div>
                <div class="profile-data" id="page-data">
                    ${bookInfo.number_of_page}
                </div>
            </div>
            <!-- 出版社　-->
            <div class="profile-row">
                <div class="profile-item">
                    <h3>Publisher</h3>
                </div>
                <div class="profile-data">
                ${parseDataOL(book.authors)}
                </div>
            </div>
            <!-- 出版日　-->
            <div class="profile-row">
                <div class="profile-item">
                    <h3>Publish Date</h3>
                </div>
                <div class="profile-data">
                    ${book.publish_date}
                </div>
            </div>
            <!-- カテゴリ　-->
            <div class="profile-row">
                <div class="profile-item">
                    <h3>Categories</h3>
                </div>
                <div class="profile-data">
                    ${parseDataOL(book.subjects)}
                </div>
            </div>

    `
    parent.innerHTML = profile_card
    if(Object.keys(data).length === 0 && data.constructor === Object) parent.innerHTML = "<h1>Not Found</h1>";
    }
}

function parseDataOL(data){
    let parsed = "";
    for(let i = 0; i < data.length - 1; i++){
        parsed += (data[i].name + ",");
    }
    return parsed + data[data.length-1].name;
}

//検索部のISBNからデータを取ってきて新しいカードに情報を更新する関数
function fetchBookInfoAndNewCard(){ 
    const searchInput = document.getElementById(config.searchInputId)
    const ISBN = searchInput.value
    fetch(config.url + ISBN).then((res) => res.json()).then((data) => generateCard(data))
}

//検索ボタン クリック時、情報更新イベント追加
let searchBtn = document.getElementById(config.searchBtnId)
searchBtn.addEventListener("click", fetchBookInfoAndNewCard())

//検索バー　enter押した時、情報更新イベント追加
let searchInput = document.getElementById(config.searchInputId)
searchInput.addEventListener("keydown", fetchBookInfoAndNewCard())

