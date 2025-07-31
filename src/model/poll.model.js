
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.config.js";

class pollModel {
    async findPolls(skip, limit) {
        try {
            return await getDB().collection('polls').find().skip(skip).limit(limit).toArray();
        } catch (err) {
            throw err;
        }
    }

    async countPolls() {
        try {
            return await getDB().collection('polls').countDocuments();
        } catch (err) {
            throw err;
        }
    }

    async getPollById(pollId) {
        try {
            return await getDB().collection('polls').findOne({ _id: new ObjectId(pollId) });
        } catch (err) {
            throw err;
        }
    }

    async createPoll(title, description, options, creatorId, expiresAt) {
        try {
            if (!Array.isArray(options)) throw new Error("Options must be an array");

            const poll = await getDB().collection('polls').insertOne({
                title: title,
                description: description,
                options: options.map(text => ({
                    id: new ObjectId(),
                    text,
                    votes: 0,
                    userVote: []
                })),
                creatorId: creatorId,
                isLocked: false,
                createdAt: new Date(),
                expiresAt: expiresAt ? new Date(expiresAt) : null
            });
            return poll.insertedId;
        } catch (err) {
            throw err;
        }
    }

    async updatePollById(pollId, data) {
        try {
            return await getDB().collection('polls').updateOne(
                { _id: new ObjectId(pollId) },
                { $set: data }
            );
        } catch (err) {
            throw err;
        }
    }

    async deletePollById(pollId) {
        try {
            return await getDB().collection('polls').deleteOne({ _id: new ObjectId(pollId) });
        } catch (err) {
            throw err;
        }
    }

    async pushOptionToPoll(pollId, text) {
        try {
            const newOption = {
                id: new ObjectId(),
                text,
                votes: 0,
                userVote: []
            };
            await getDB().collection('polls').updateOne(
                { _id: new ObjectId(pollId) },
                { $push: { options: newOption } }
            );
            return newOption;
        } catch (err) {
            throw err;
        }
    }

    async pullOptionFromPoll(pollId, optionId) {
        try {
            await getDB().collection('polls').updateOne(
                { _id: new ObjectId(pollId) },
                { $pull: { options: { id: new ObjectId(optionId) } } }
            );
            return true;
        } catch (err) {
            throw err;
        }
    }
}

export default new pollModel();
