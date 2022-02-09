import { Router } from 'express';
import * as videoCtrl from './videos.controller';
const router = Router();

router.get('/', videoCtrl.getVideos);

router.get('/:id', videoCtrl.getVideo);

router.post('/', videoCtrl.createVideo);

router.put('/:id', videoCtrl.updateVideos);

router.delete('/:id', videoCtrl.deleteVideo);

export default router;
