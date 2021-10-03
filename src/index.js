import 'material-icons/iconfont/material-icons.css';
import './sass/main.scss';

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

const fetchImg = event => {
  event.preventDefault();

  const userRequest = event.currentTarget.elements.query.value.trim();
  imageService.query = userRequest;
  imageService.fetchImg().then(hits => {
    imgGallery.insertAdjacentHTML('beforeend', photoCard(hits));
  });
  formSearch.reset();
};

formSearch.addEventListener('submit', fetchImg);
