import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

export const serveCommand = new Command()
	.command('serve [filename]')
	.description('open a file for editing')
	.option('-p, --port <number>', 'port to run server on', '4006')
	.action((filename = 'notebook.js', { port }: { port: string }) => {
		const dir = path.join(process.cwd(), path.dirname(filename));
		serve(parseInt(port), path.basename(filename), dir);
	});
