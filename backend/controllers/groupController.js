import Group from '../models/Group.js';

// Create a new group
export const createGroup = async (req, res) => {
    try {
        const group = new Group(req.body);
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Invite a user to a group
export const inviteUser = async (req, res) => {
    const { groupId, userId } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });
        group.invitations.push(userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search for groups
export const searchGroups = async (req, res) => {
    const { query } = req.query;
    try {
        const groups = await Group.find({ name: { $regex: query, $options: 'i' } });
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
