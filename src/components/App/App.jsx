import { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import { fetchImages } from 'services/fetchImages';

import { GlobalStyle } from 'services/GlobalStyle';
import { Image } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!searchQuery) return;

    const getImages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(searchQuery, page);
        setImages(images => [...images, ...data.hits]);
        setTotalHits(data.totalHits);

        if (!data.total) {
          toast.info('No results were found for your search!');
        }
      } catch (error) {
        //setError(error.message);
        toast.error(`Whoops, something went wrong ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [searchQuery, page]);

  const searchImages = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page => page + 1);

    animateScroll.scrollToBottom();
  };

  const openModal = url => {
    setShowModal(true);
    setUrl(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setUrl('');
  };

  return (
    <div>
      <Searchbar search={searchQuery} onSubmit={searchImages} />

      <ImageGallery items={images} openModal={openModal} />

      {isLoading && <Loader />}

      {Boolean(images.length) && (
        <Button onClick={loadMore} total={totalHits} items={images} />
      )}

      {showModal && (
        <Modal close={closeModal}>
          <Image src={url} alt="photo" />
        </Modal>
      )}

      <GlobalStyle />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
