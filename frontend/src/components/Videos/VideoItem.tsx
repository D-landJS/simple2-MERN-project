import React from 'react';
import { Video } from './Video';
import ReactPlayer from 'react-player';
import './VideoItem.css';
import { useNavigate } from 'react-router-dom';
import { deleteVideo } from './VideoService';

interface Props {
	video: Video;
	loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
	let navigate = useNavigate();

	const handelDelete = async (id: string) => {
		await deleteVideo(id);
		loadVideos();
	};

	return (
		<div className="col-md-4 mt-4">
			<div className="card ">
				<div className="card-body video-card">
					<div className="d-flex justify-content-between">
						<h1 onClick={() => navigate(`update/${video._id}`)}>
							{video.title}
						</h1>
						<span
							className="text-danger"
							onClick={() => video._id && handelDelete(video._id)}
						>
							X
						</span>
					</div>
					<p>{video.description}</p>

					<ReactPlayer url={video.url} width="100%" height="100%" />
				</div>
			</div>
		</div>
	);
};

export default VideoItem;
