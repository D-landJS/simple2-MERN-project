import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Video } from './Video';
import * as videoService from './VideoService';

const initialSate = {
	title: '',
	description: '',
	url: '',
};

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {
	const [video, setVideo] = useState<Video>(initialSate);
	let navigation = useNavigate();
	let params = useParams();

	const handleInputChange = (e: InputChange) => {
		const { name, value } = e.target;
		setVideo({
			...video,
			[name]: value,
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!params.id) {
			await videoService.createVideo(video);
			toast.success('New video added', {
				position: 'top-center',
			});
		} else {
			await videoService.updateVideo(params.id, video);
			toast.success('Video updated', {
				position: 'top-center',
			});
		}
		navigation('/');
	};

	const getVideo = async (id: string) => {
		const res = await videoService.getVideo(id);
		const { title, description, url } = res.data;
		setVideo({ title, description, url });
	};

	useEffect(() => {
		if (params.id) getVideo(params.id);
	}, []);

	return (
		<div className="row">
			<div className="col-md-4 offset-md-4">
				<div className="card" style={{ width: '18rem' }}>
					<div className="card-body">
						<h3>New Video</h3>
						<form action="" onSubmit={handleSubmit}>
							<div className="form-group">
								<input
									type="text"
									name="title"
									placeholder="Write a title for this video"
									className="form-control"
									onChange={handleInputChange}
									value={video.title}
									autoFocus
								/>
							</div>
							<div className="form-group ">
								<input
									type="text"
									name="url"
									placeholder="https://somesite.com"
									className="form-control mt-4"
									onChange={handleInputChange}
									value={video.url}
								/>
							</div>
							<div className="form-group ">
								<textarea
									name="description"
									rows={3}
									placeholder="Write a description"
									className="form-control mt-4"
									onChange={handleInputChange}
									value={video.description}
								></textarea>
							</div>

							{params.id ? (
								<button type="submit" className="btn btn-info mt-4">
									Updated video
								</button>
							) : (
								<button type="submit" className="btn btn-primary mt-4">
									Created video
								</button>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoForm;
