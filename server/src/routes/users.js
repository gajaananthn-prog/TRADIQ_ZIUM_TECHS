import { prisma } from '../lib/prisma.js';
import express from 'express';
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { organization: true }
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
export default router;
//# sourceMappingURL=users.js.map