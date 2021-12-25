import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cell';

export const serve = (
	port: number,
	filename: string,
	dir: string,
	useProxy: boolean
) => {
	const app = express();
	app.use(createCellsRouter(filename, dir));
	app.use(
		useProxy
			? createProxyMiddleware({
					target: 'http://localhost:3000',
					ws: true,
					logLevel: 'silent',
			  })
			: express.static(
					path.dirname(
						require.resolve('@js-jupyter/local-client/build/index.html')
					)
			  )
	);

	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject);
	});
};
