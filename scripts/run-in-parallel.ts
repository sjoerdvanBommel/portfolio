import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * This script is written because npm does not support running multiple commands in parallel.
 * This is a workaround to run multiple commands in parallel using concurrently.
 * It reads all package.json files in the apps directory and runs the specified command for each app.
 * It also colors the output for each app.
 * 
 * Usage: ts-node scripts/dev-script.ts <command>
 * Example: ts-node scripts/dev-script.ts dev
 * Example: ts-node scripts/dev-script.ts preview
 */
async function generateCommand(command: string) {
    if (!command) {
        console.error('Please provide a command to run (e.g., dev, preview)');
        process.exit(1);
    }

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
            if (packageJson.scripts?.[command]) {
                commands.push(`"npm run ${command} --workspace=apps/${app}"`);
                names.push(app);
            }
        } catch (error) {
            console.warn(`Could not read package.json for ${app}:`, error.message);
        }
    }

    if (commands.length === 0) {
        console.error(`No apps found with the "${command}" script`);
        process.exit(1);
    }

    const args = [
        ...commands,
        '-n', names.join(','),
        '-c', colors.slice(0, names.length).join(',')
    ];
    
    console.log(`Running ${command} command:`);
    console.log('concurrently', args.join(' '));
    
    // Execute the command using spawn
    const child = spawn('concurrently', args, {
        stdio: 'inherit',
        shell: true
    });
    
    child.on('error', (error) => {
        console.error(`Failed to start ${command} servers:`, error);
        process.exit(1);
    });
}

const command = process.argv[2];
generateCommand(command).catch(console.error);