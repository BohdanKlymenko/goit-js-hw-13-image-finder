import 'material-icons/iconfont/material-icons.css';
import './sass/main.scss';
import { Notify} from 'notiflix';
import refs from './js/refs';
import ApiService from './js/apiService';
import BtnService from './js/btnService';

import photoCard from './template/photo-card.hbs';

const { formSearch, imgGallery, loadMoreBtn, loadMoreLabel, loadMoreSpinner } = refs;

const imageService = new ApiService();
const button = new BtnService({
  loadMoreBtn: loadMoreBtn,
  loadMoreLabel: loadMoreLabel,
  loadMoreSpinner: loadMoreSpinner,
  classList: 'd-none',
});

const fetchImg = () => {
  button.disable();
  imageService.fetchImg().then(data => {
    if (data.hits.length === 0) {
      Notify.warning('Картинок нет');
      button.hidden();
      return;
    }
    if (document.querySelector('.js-gallery').children.length === 0) {
      Notify.success(`По вашему запросу найдено ${data.total} картинок`);
    }
    imgGallery.insertAdjacentHTML('beforeend', photoCard(data.hits));

    button.show();
    button.enable();

    const { height: cardHeight } = imgGallery
      .firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  });


};

const searchImg = event => {
  event.preventDefault();
  clearImgGallery();

  const userRequest = event.currentTarget.elements.query.value.trim();

  
  imageService.query = userRequest;
  
  fetchImg();

  formSearch.reset();
};

function clearImgGallery() {
  imgGallery.innerHTML = '';
}

formSearch.addEventListener('submit', searchImg);
loadMoreBtn.addEventListener('click', fetchImg);
