import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://picsum.photos/v2/list/';
const useFetchImages = (page) => {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			setError(null);
			setIsLoading(true);
			try {
				const { data } = await axios(BASE_URL, { params: { page, limit: 30 } });
				setImages((prevImages) => [...prevImages, ...data]);
			} catch (error) {
				console.error('Error fetching images:', error);
				setError('Error while fetching images. Please try again.');
			}
			setIsLoading(false);
		})();
	}, [page]);

	/**
	 * in the given api total number of records are not stated in the response
	 *  but max length of response possible is 1085
	 */
	return { images, isLoading, error, hasMore: images.length < 1085 };
};

export default useFetchImages;
