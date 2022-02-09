import { RequestHandler } from 'express';
import Video from './Video';
import video from './Video';
// RequestHandler -> Indicada que es de tipo req y res

export const createVideo: RequestHandler = async (req, res) => {
	try {
		const videoFound = await Video.findOne({ url: req.body.url });
		if (videoFound) {
			return res.status(301).json({
				msg: 'The URL already exits',
			});
		}

		const body = req.body;
		const video = new Video(body);
		await video.save();

		res.status(200).json({
			sucess: 'true',
			msg: 'Video created',
		});
	} catch (e) {
		res.status(500).json({
			sucess: 'false',
			msg: 'Video created failed',
		});
	}
};

export const getVideos: RequestHandler = async (req, res) => {
	try {
		const videos = await Video.find();

		res.status(200).json(videos);
	} catch (e) {
		res.json(e);
	}
};

export const getVideo: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const video = await Video.findById(id);
		res.status(200).json(video);
	} catch (e) {
		res.json(e);
	}
};

export const updateVideos: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const video = await Video.findByIdAndUpdate(id, body, { new: true });
		// await video.save();

		res.status(200).json({
			sucess: 'true',
			msg: 'Video updated',
		});
	} catch (e) {
		res.status(500).json({
			sucess: 'false',
			msg: 'Video updated failed',
		});
	}
};

export const deleteVideo: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const video = await Video.findByIdAndDelete(id);
		res.status(200).json({
			sucess: 'true',
			msg: 'Video deleted',
		});
	} catch (e) {
		res.json(e);
	}
};
