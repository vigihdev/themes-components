#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { ThemeImport } = require('./theme-imports');
const { cwd } = require('process');

const envPath = path.join(cwd(), '.env.path')
const args = process.argv
const arg = args.slice(2)?.[0]

if (!fs.existsSync(envPath)) {
    throw new Error(`❌ file .env.path tidak tersedia : ${envPath}`)
}
require('dotenv').config({
    path: envPath,
    debug: false,
    encoding: 'utf8',
    quiet: true,
    override: true,
})

// console.log([arg].join("\n"));
if (typeof arg !== 'string') {
    console.log(`✅ tidak ada perintah untuk di jalankan`)
    return;
}

// Command
switch (arg) {
    case 'build:theme-imports':
        ThemeImport.build();
        break;
    default:
        console.log(`✅ tidak ada perintah untuk di jalankan`)
        break;
}