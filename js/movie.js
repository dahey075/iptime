const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDZiOGJkOGEwY2Y2MzU3MGY2ZDE4NzhlYTE0N2ExZiIsInN1YiI6IjY1MzA4OGYzZWRlYjQzMDBhYmRlNTkzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.djn14vJRyA5-NuiwBz0cONs164O-hZ98_eJRjIGmDqs'
  }
};
let topMovies;
let movieMap = new Map();

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    const mainDiv = document.querySelector(".main");  //메인요소 변수에 담음

    let results = response.results;
    const div = document.createElement('div')
    results.forEach(element => {
      const card = document.createElement('div');
      card.innerHTML = `<div>
           <div class="card" id="${element.id}">
           <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" alt="..."/>
           <h2 class="cardtitle">${element.title}</h2> 
           <p class="star">할배점수 : ${element.vote_average}</p>
           <p class="overview">${element.overview}</p>
           <button id="detailsBtn">상세 보기</button>
           </div>
           <button>상세보기</button>
           </div>`;
      movieMap.set(element.title, card)
      div.appendChild(card)
    });



    div.className = "main-container"
    // div.innerHTML = html.join("");
    mainDiv.append(div);


    const noOutlineImgButton = document.querySelector('#searchBtn');
    const searchtxt = document.querySelector('#searchInput');

    div.addEventListener('click', (event) => {
      const card = event.target.closest('.card'); // 클릭된 요소의 가장 가까운 부모 카드 요소를 찾음
      if (card) {
        const id = card.id; // 클릭된 카드의 ID를 가져옴
        alert("품번은 " + id + " 이구만유~");
      }

    });


    //상세페이지 이동 버튼

    let btn = document.getElementById('detailsBtn');
    btn.addEventListener('click', function (event) {
      
      // let id = card.id;
      // window.location.href = `detail.html?id=${id}`;

      window.location.href = `detail.html`;

    })




    function search() {
      const text = searchtxt.value;
      response.results.map((element) => {

        let cardtitle = element.title;
        if (cardtitle.toLowerCase().includes(text.toLowerCase())) {
          movieMap.get(cardtitle).style.display = 'block';
        } else {
          movieMap.get(cardtitle).style.display = 'none';
        }
      });


      //영화 제목 입력 유효성 검사
      if (text===""){
        alert('영화 제목을 입력해 주세요.');
      }

    }

    noOutlineImgButton.addEventListener('click', () => {
      search();
    });

    searchtxt.addEventListener('keydown', function (event) {


      if (event.key === 'Enter') {
        search();
      }


    });

    


    searchtxt.focus();











  })
  .catch(err => console.error(err));
