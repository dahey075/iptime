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
<<<<<<< HEAD
           <button class="detailsBtn">상세 보기</button>
           </div>
           </div>`;

=======
           <button class="detailsBtn">상세 보기</button>`;
>>>>>>> IJH
      movieMap.set(element.title, card)
      div.appendChild(card)
    }); //title, overview, src



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
    //여기 수정하면됨 이건 하나만 이잖아.
    let btn = document.querySelectorAll('.detailsBtn');
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', function (event) {
    // 현재 클릭된 버튼을 참조합니다.
    let currentButton = event.currentTarget;

    // 현재 버튼을 사용하여 해당 카드 내부의 요소를 찾습니다.
    let title = currentButton.parentElement.querySelector('.cardtitle').textContent;
    let overView = encodeURIComponent(currentButton.parentElement.querySelector('.overview').textContent);
    let src = currentButton.parentElement.querySelector('.card-img-top').getAttribute('src');

    // 여기서 원하는 동작을 수행합니다.
    window.location.href = `detail.html?image=${src}&title=${title}&intro=${overView}`;
  });
}



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
