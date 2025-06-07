import pollModel from "../model/poll.model.js";
class pollService{
    async getAllPolls(page = 1, limit = 10){
        try{
            const skip = (page - 1) *limit;
            const polls = await pollModel.findPolls(skip, limit);
            const total = await pollModel.countPolls();
            return {polls, total, page, limit};
        }catch(err){
            throw err;
        }
    }
    async getPollById(pollId){
        try{
            const poll = await pollModel.getPollById(pollId);
            if (!poll){
               throw new Error('Poll not found'); 
            }
            return poll;
        } catch(err){
            throw err;
        }
    }
    async createPoll(title, description, options, creatorId, expiresAt){
        try{
            const poll = await pollModel.createPoll(title, description, options, creatorId, expiresAt);
            return poll;
        } catch (err){
            throw err;
        }
    }
    async updatePoll(pollId, title, description){
        try{
            const poll = await this.getPollById(pollId);
            if (poll.isLocked) throw new Error('Poll is locked');

            const updatedPoll = await pollModel.updatePollById(pollId, { title, description });
            return updatedPoll;
        } catch(err){
            throw err;
        }
    }

    async deletePoll(pollId){
        try{
            const poll = await this.getPollById(pollId);
            if (poll.isLocked) throw new Error('Poll is locked');

            return await pollModel.deletePollById(pollId);
        }catch(err){
            throw err;
        }
    }

    async setPollLockStatus(pollId, isLocked){
        try{
            return await pollModel.updatePollById(pollId, {isLocked});
        } catch(err){
            throw err;
        }
    }

    async addOption(pollId, text){
        try{
            const poll = await this.getPollById(pollId);
            if (poll.isLocked) throw new Error('Poll is locked');

            return await pollModel.pushOptionToPoll(pollId, text);
        } catch(err){
            throw err;
        }
    }

    async removeOption(pollId, optionId){
        try{
            const poll = await this.getPollById(pollId);
            if (poll.isLocked) throw new Error('Poll is locked');

            return await pollModel.pullOptionFromPoll(pollId, optionId);
        } catch(err){
            throw err;
        }
    }

    async vote(pollId, optionId, userId) {
        const poll = await this.getPollById(pollId);
        if (poll.isLocked) throw new Error('Poll is locked');

        const user = {
            id: userId,
            name: 'Anonymous'
        };

        const selectedOption = poll.options.find(opt => opt.id.toString() === optionId);
        if (!selectedOption) throw new Error('Option not found');

        const alreadyVoted = selectedOption.userVote.some(u => u.id === userId);
        if (alreadyVoted) {
            return { status: 'alreadyVoted' };
        }

        for (const option of poll.options) {
            option.userVote = option.userVote.filter(u => u.id !== userId);
        }

        selectedOption.userVote.push(user);

        for (const option of poll.options) {
            option.votes = option.userVote.length;
        }

        await pollModel.updatePollById(pollId, { options: poll.options });

        return { status: 'voted' };
    }

    async unvote(pollId, userId) {
        const poll = await this.getPollById(pollId);

        const votedOption = poll.options.find(option =>
            option.userVote.some(u => u.id === userId)
        );

        if (!votedOption) {
            throw new Error('Bạn chưa vote nên không thể hủy');
        }

        votedOption.userVote = votedOption.userVote.filter(u => u.id !== userId);
        votedOption.votes = votedOption.userVote.length;

        await pollModel.updatePollById(pollId, { options: poll.options });
        return true;
    }

}
export default new pollService();