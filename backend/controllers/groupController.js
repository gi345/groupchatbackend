import Group from '../models/Group.js';

// Create a new group
export const createGroup = async (req, res) => {
    const { name, description } = req.body;
    // Basic validation
    if (!name || typeof name !== 'string' || !description || typeof description !== 'string') {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    try {
        const group = new Group(req.body);
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Invite a user to a group
export const inviteUser = async (req, res) => {
    const { groupId, userId } = req.body;
    // Basic validation
    if (!groupId || !userId) {
        return res.status(400).json({ error: 'Group ID and User ID are required' });
    }
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });
        if (group.invitations.includes(userId)) {
            return res.status(400).json({ message: 'User already invited' });
        }
        group.invitations.push(userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        console.error('Error inviting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Search for groups
export const searchGroups = async (req, res) => {
    const { query } = req.query;
    // Basic validation
    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Invalid query parameter' });
    }
    try {
        const groups = await Group.find({ name: { $regex: query, $options: 'i' } });
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error searching groups:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
