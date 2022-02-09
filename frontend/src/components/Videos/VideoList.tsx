import { useEffect, useState } from 'react';
import { Video } from './Video';
import VideoItem from './VideoItem';
import * as videoService from './VideoService';

const VideoList = () => {
	const [videos, setVideos] = useState<Video[]>([]);

	const loadVideos = async () => {
		const res = await videoService.getVideos();
		const formatedVideos = res.data
			.map(video => {
				return {
					...video,
					createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
					updateAt: video.updateAt ? new Date(video.updateAt) : new Date(),
				};
			})
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
		setVideos(formatedVideos);
	};

	useEffect(() => {
		loadVideos();
	}, []);

	return (
		<div className="row">
			{videos.map(video => (
				<VideoItem video={video} key={video._id} loadVideos={loadVideos} />
			))}
		</div>
	);
};

export default VideoList;
