import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
	id: string;
	content: string;
	type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
	const fullPath = path.join(dir, filename);
	console.log(fullPath);
	const router = express.Router();

	router.use(express.json());

	router.get('/cells', async (req, res) => {
		try {
			const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
			res.send(JSON.parse(result));
		} catch (error: any) {
			if (error.code == 'ENOENT') {
				await fs.writeFile(fullPath, '[]', 'utf-8');
				res.send([]);
			}
		}
	});

	router.post('/cells', async (req, res) => {
		const { cells }: { cells: Cell[] } = req.body;
		await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
	});

	return router;
};
