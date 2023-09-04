import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const apiUrl = 'https://picsum.photos/v2/list?page=2&limit=100';

function App() {
  const [imageData, setImageData] = useState([]);
  const [page, setPage] = useState(1);
  const imagesPerPage = 10; // Number of images to load per page
  const totalImagesLimit = 30; // Total number of images to load

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      if (imageData.length >= totalImagesLimit) {
        return; // Stop fetching once we reach the limit
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setImageData((prevData) => [...prevData, ...data]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
    fetchImages();
  };

  const hasMoreImages = imageData.length < totalImagesLimit;

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={imageData.length}
        next={loadMoreImages}
        hasMore={hasMoreImages}
        loader={<p>Loading...</p>}
      >
        <div className="row">
          {imageData.map((image, index) => (
            <div key={index} className="col-md-4 mb-4">
              <img
                src={image.download_url}
                alt={`Image ${index + 1}`}
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
