import pollService from "../services/poll.service.js";
class pollController{
    async getAllPolls(req, res, next){
        try{
            const { page = 1, limit = 10} = req.query;
            const result = await pollService.getAllPolls(Number(page), Number(limit));
            res.status(200).json({
                success: true,
                message: 'Get all poll successfully',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async getPollById(req, res, next){
        try{
            const pollId = req.params.id;
            const result = await pollService.getPollById(pollId);
            res.status(200).json({
                success: true,
                message: 'Get Poll successfully',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async createPoll(req, res, next){
        try{
            const { title, description, options, expiresAt } = req.body;
            const creatorId = req.user.id;
            const result = await pollService.createPoll(title, description, options, creatorId, expiresAt);
            res.status(201).json({
                success: true,
                message: 'Poll created',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async updatePoll(req, res, next){
        try{
            const pollId = req.params.id;
            const { title, description} = req.body;
            const result = await pollService.updatePoll(pollId, title, description);
            res.status(200).json({
                success: true,
                message: 'Poll updated',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async deletePoll(req, res, next){
        try{
            const pollId = req.params.id;
            const poll = await pollService.deletePoll(pollId);
            res.status(200).json({
                success: true, 
                message: 'Poll deleted'
            });
        } catch(err){
            next(err);
        }
    }
    async setLockStatus(req, res, next){
        try{
            const pollId = req.params.id;
            const lockParam = req.query.lock;

            if (lockParam === undefined){
                return res.status(400).json({
                    success: false,
                    message: "Missing 'lock' query parameter"
                });
            }

            const isLocked = lockParam === 'true';
            const result = await pollService.setPollLockStatus(pollId, isLocked);
            
            if (result.modifiedCount === 0){
                return res.status(404).json({
                    success: false,
                    message: "Poll not found or no change applied"
                });
            }

            res.status(200).json({
                success: true,
                message: isLocked? 'Poll locked' : 'Poll unlocked',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async addOption(req, res, next){
        try{
            const pollId = req.params.id;
            const {text} = req.body;
            const result = await pollService.addOption(pollId, text);
            res.status(200).json({
                success: true,
                message: 'Option added',
                data: result
            });
        }catch(err){
            next(err);
        }
    }
    async removeOption(req, res, next){
        try{
            const pollId = req.params.id;
            const optionId = req.params.optionId;
            const result = await pollService.removeOption(pollId, optionId);
            res.status(200).json({
                success: true,
                message: 'Option removed',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async setVoteStatus(req, res, next) {
        try {
            const pollId = req.params.id;
            const optionId = req.params.optionId;
            const userId = req.user.id;
            const voteParam = req.query.vote;

            if (voteParam === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Missing 'vote' query parameter"
                });
            }

            const isVoting = voteParam === 'true';

            if (isVoting) {
                const result = await pollService.vote(pollId, optionId, userId);

                if (result.status === 'alreadyVoted') {
                    return res.status(200).json({
                        success: true,
                        message: 'Bạn đã chọn lựa chọn này rồi',
                        data: null
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Vote thành công',
                    data: null
                });
            } else {
                const result = await pollService.unvote(pollId, userId);
                return res.status(200).json({
                    success: true,
                    message: 'Unvote thành công',
                    data: result
                });
            }
        } catch (err) {
            next(err);
        }
    }
}
export default new pollController();