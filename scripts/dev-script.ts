import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * This script is written because npm does not support running multiple commands in parallel.
 * This is a workaround to run multiple commands in parallel using concurrently.
 * It reads all package.json files in the apps directory and runs the dev command for each app.
 * It also colors the output for each app.
 */
async function generateDevCommand() {
    const appsDir = join(__dirname, '..', 'apps');
    const apps = await readdir(appsDir);
    
    const commands: string[] = [];
    const names: string[] = [];
    const colors = [
        'gray',
        '#444444',
        '#66dbfb',
        '#ff4408',
        '#e47373',
        '#ffd700',
        '#98fb98',
        '#87ceeb',
        '#dda0dd',
        '#f08080'
    ];

    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];
        const packageJsonPath = join(appsDir, app, 'package.json');
        
        try {
            const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
            if (packageJson.scripts?.dev) {
                commands.push(`"npm run dev --workspace=apps/${app}"`);
                names.push(app);
            }
        } catch (error) {
            console.warn(`Could not read package.json for ${app}:`, error.message);
        }
    }

    const args = [
        ...commands,
        '-n', names.join(','),
        '-c', colors.slice(0, names.length).join(',')
    ];
    
    console.log('Running dev command:');
    console.log('concurrently', args.join(' '));
    
    // Execute the command using spawn
    const child = spawn('concurrently', args, {
        stdio: 'inherit',
        shell: true
    });
    
    child.on('error', (error) => {
        console.error('Failed to start dev servers:', error);
        process.exit(1);
    });
}

generateDevCommand().catch(console.error); 