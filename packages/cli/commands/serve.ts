import { Command } from 'commander';
import { serve } from '@js-jupyter/local-api';
import path from 'path';

const environmentIsProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
	.command('serve [filename]')
	.description('open a file for editing')
	.option('-p, --port <number>', 'port to run server on', '4006')
	.action(async (filename = 'notebook.js', { port }: { port: string }) => {
		try {
			const dir = path.join(process.cwd(), path.dirname(filename));
			await serve(
				parseInt(port),
				path.basename(filename),
				dir,
				!environmentIsProduction
			);
			console.log(
				`opened ${filename}. Navigate to http://localhost:${port} to edit file`
			);
		} catch (err: any) {
			console.error('here is the error: ', err.message);
			process.exit(1);
		}
	});
